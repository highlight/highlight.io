import { promises as fsp } from 'fs';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import {
  createElement,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../../components/Docs/Docs.module.scss';
import remarkGfm from 'remark-gfm';
import yaml from 'js-yaml';
import ChevronDown from '../../public/images/ChevronDownIcon';
import Minus from '../../public/images/MinusIcon';
import { Collapse } from 'react-collapse';
import Highlighter from 'react-highlight-words';

import path from 'path';
import Navbar from '../../components/common/Navbar/Navbar';
import Link from 'next/link';
import CopyIcon from '../../public/images/document-duplicate.svg';
import PageIcon from '../../public/images/page.svg';
import { Typography } from '../../components/common/Typography/Typography';
import { CodeBlock } from 'react-code-blocks';
import highlightCodeTheme from '../../components/common/CodeBlock/highlight-code-theme';
import matter from 'gray-matter';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import removeMd from 'remove-markdown';
import { SearchResult } from '../api/docs/search/[searchValue]';
import {
  BiChevronLeft,
  BiChevronRight,
  BiLink,
  BiSearch,
} from 'react-icons/bi';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';

const DOCS_CONTENT_PATH = path.join(process.cwd(), 'docs_content');
const SEARCH_RESULT_BLURB_LENGTH = 100;

interface DocPath {
  // e.g. '[tips, sessions-search-deep-linking.md]'
  array_path: string[];
  // e.g. 'tips/sessions-search-deep-linking.md'
  simple_path: string;
  // e.g. '[/tips, /getting-started/client-sdk]'
  relative_links: string[];
  // e.g. /Users/jaykhatri/projects/highlight-landing/docs_content/tips/sessions-search-deep-linking.md
  total_path: string;
  // whether the path has an index.md file in it or a "homepage" of some sort for that directory.
  indexPath: boolean;
  // metadata stored at the top of each md file.
  metadata: any;
  // some parent pages are empty and should redirect to the first child page
  redirect?: string;
}

export interface Doc {
  content: string;
  data: { [key: string]: any };
  links: Set<string>;
}

const useHeadingsData = () => {
  const router = useRouter();
  const [nestedHeadings, setNestedHeadings] = useState<any>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h5'));
    setNestedHeadings(headingElements);
  }, [router.query]);

  return { nestedHeadings };
};

// Checks which header is currently in view, and highlights the table of content item on the right.
const useIntersectionObserver = (setActiveId: (s: string) => void) => {
  const router = useRouter();
  const headingElementsRef = useRef<any>({});
  useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = {};
      headingElementsRef.current = headings.reduce(
        (map: any, headingElement: any) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: any = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      if (visibleHeadings.length >= 1) {
        setActiveId(visibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h4, h5'));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId, router.query]);
};

// if index.md is empty, we want to default to the first child, unless that's the only page.
const getDefaultChildPath = (files: string[]) => {
  return files.find((filepath) => filepath !== 'index.md');
};

const isValidDirectory = (files: string[]) => {
  return files.find((filename) => filename === 'index.md') != null;
};

// we need to explicitly pass in 'fs_api' because webpack isn't smart enough to
// know that this is only being called in server-side functions.
export const getDocsPaths = async (
  fs_api: any,
  base: string | undefined
): Promise<DocPath[]> => {
  // each docpath needs to have some hierarchy (so we know if its nested, etc..)
  // each path can either be:
  // - parent w/o content
  // - parent w/ content
  if (!base) {
    base = '';
  }
  const full_path = path.join(DOCS_CONTENT_PATH, base);
  const read = await fs_api.readdir(full_path);
  if (!isValidDirectory(read)) {
    throw new Error(
      `${full_path} does not contain an index.md file. An index.md file is required for all documentation directories. `
    );
  }

  let paths: DocPath[] = [];
  for (var i = 0; i < read.length; i++) {
    const file_string = read[i];
    let total_path = path.join(full_path, file_string);
    const file_path = await fs_api.stat(total_path);
    if (file_path.isDirectory()) {
      paths = paths.concat(
        await getDocsPaths(fs_api, path.join(base, file_string))
      );
    } else {
      let pp = '';
      let redirect = '';
      let simple_path = path.join(base, file_string);
      if (file_string === 'index.md') {
        // get rid of "index.md" at the end
        pp = simple_path.split('/').slice(0, -1).join('/');
        const { content } = await readMarkdown(
          fsp,
          path.join(total_path || '')
        );
        if (content === '') {
          const firstChildPath = getDefaultChildPath(read);
          const redirectPath = firstChildPath
            ? path.join(base, firstChildPath)
            : '';
          redirect = redirectPath?.replace('.md', '');
        }
      } else {
        // strip out any notion of ".md"
        pp = simple_path.replace('.md', '');
      }
      const { data, links } = await readMarkdown(
        fsp,
        path.join(total_path || '')
      );
      const hasRequiredMetadata = ['title', 'slug'].every((item) =>
        data.hasOwnProperty(item)
      );
      if (!hasRequiredMetadata) {
        throw new Error(
          `${total_path} does not contain all required metadata fields. Fields "title", "slug" are required. `
        );
      }

      paths.push({
        simple_path: pp,
        array_path: pp.split('/'),
        relative_links: Array.from(links).filter((l) => l.startsWith('/')),
        total_path,
        indexPath: file_string === 'index.md',
        metadata: data,
        ...(redirect ? { redirect } : {}),
      });
    }
  }
  return paths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docPaths = await getDocsPaths(fsp, undefined);
  const staticPaths = docPaths.map((p) => {
    return path.join('/docs', p.simple_path);
  });
  return {
    paths: staticPaths,
    fallback: true,
  };
};

interface TocEntry {
  tocHeading?: string;
  tocSlug: string;
  docPathId?: number | null;
  children: TocEntry[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const docPaths = await getDocsPaths(fsp, undefined);
  let toc: TocEntry = {
    tocHeading: 'Home',
    tocSlug: 'home',
    docPathId: null,
    children: [],
  };

  let docid = 0;
  // for each document path, contains relative links used by that document
  const docRelLinks = new Map<string, Array<string>>();
  // TODO(jaykhatri) - gotta pass the open state to child doc paths below;
  // will require traversing up to all parents
  for (const d of docPaths) {
    docRelLinks.set(`/${d.simple_path}`, d.relative_links);
    let currentEntry = toc;
    for (const a of d.array_path) {
      // for each of the array parts:
      // 1. in the current TOC entry, check if a child exists that matches the current docpath
      // 2. if not, create it. if so, set the new current toc entry
      let foundEntry = currentEntry?.children.find((t) => {
        return t.tocSlug === a;
      });
      if (!foundEntry) {
        foundEntry = {
          tocSlug: a,
          children: [],
        };
        currentEntry?.children.push(foundEntry);
      }
      if (d.array_path.indexOf(a) == d.array_path.length - 1) {
        foundEntry.docPathId = docid;
        foundEntry.tocHeading = docPaths[docid].metadata.title || 'test';
      }
      currentEntry = foundEntry;
    }
    docid++;
  }

  // validate that any relative links referenced in md files actually exist.
  for (const [simplePath, relativeLinks] of docRelLinks.entries()) {
    for (const link of relativeLinks) {
      if (!docRelLinks.has(link)) {
        throw new Error(
          `Link ${link} used in ${simplePath} is not a valid relative link.`
        );
      }
    }
  }

  const currentDoc = docPaths.find((d) => {
    return (
      JSON.stringify(d.array_path) ===
      JSON.stringify(context?.params?.doc || [''])
    );
  });
  // the metadata in a file starts with "" and ends with "---" (this is the archbee format).
  const { content } = await readMarkdown(
    fsp,
    path.join(currentDoc?.total_path || '')
  );
  return {
    props: {
      metadata: currentDoc?.metadata,
      markdownText: content,
      slug: currentDoc?.simple_path,
      docOptions: docPaths,
      toc,
      ...(currentDoc?.redirect ? { redirect: currentDoc.redirect } : {}),
    },
  };
};

export const readMarkdown = async (fs_api: any, filePath: string) => {
  const fileContents = await fs_api.readFile(path.join(filePath));
  return parseMarkdown(fileContents);
};

export const parseMarkdown = (fileContents: string): Doc => {
  const { content, data } = matter(fileContents, {
    delimiters: ['---', '---'],
    engines: {
      yaml: (s: any) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Object,
    },
  });
  const links = new Set<string>(
    [...content.matchAll(/\[\S+]\(([\w/-]+)\)/gi)].map((m) => m[1])
  );
  return {
    content,
    data,
    links,
  };
};

const PageContents = ({ title }: { title: string }) => {
  const { nestedHeadings } = useHeadingsData();
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>();
  useIntersectionObserver(setActiveId);

  useEffect(() => {
    const selectedId = router.asPath.split('#');
    if (selectedId.length > 1) {
      document.querySelector(`#${selectedId[1]}`)?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [router.asPath]);

  return nestedHeadings.length > 0 ? (
    <div className={styles.pageContentTable}>
      <div className={styles.pageContentTitle}>
        <Image src={PageIcon} alt="" />
        <Typography type="copy3" emphasis>
          {title}
        </Typography>
      </div>
      <div className={styles.pageContentList}>
        <ul>
          {nestedHeadings.map((heading: HTMLHeadingElement) => (
            <li
              key={heading.id}
              className={heading.id === activeId ? styles.active : ''}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  const basePath = router.asPath.split('#')[0];
                  router.push(`${basePath}#${heading.id}`);
                }}
              >
                {heading.innerText}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
};

const TableOfContents = ({
  toc,
  docPaths,
  openParent,
}: {
  toc: TocEntry;
  openParent: boolean;
  docPaths: DocPath[];
}) => {
  const [open, setOpen] = useState(openParent);
  const hasChildren = !!toc?.children.length;

  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const isTopLevel =
    toc.tocSlug === docPaths[toc.docPathId || 0]?.array_path[0];

  useEffect(() => {
    const isCurrentPage =
      path.join('/docs', docPaths[toc.docPathId || 0]?.simple_path || '') ===
      window.location.pathname;
    setIsCurrentPage(isCurrentPage);
  }, [docPaths, toc.docPathId]);

  return (
    <div>
      <Link
        href={path.join(
          '/docs',
          docPaths[toc.docPathId || 0]?.simple_path || ''
        )}
      >
        <div className={styles.tocRow} onClick={() => setOpen((o) => !o)}>
          {hasChildren ? (
            <ChevronDown
              className={classNames(styles.tocIcon, {
                [styles.tocItemChevronClosed]: hasChildren && !open,
                [styles.tocItemOpen]: hasChildren && open,
                [styles.tocItemCurrent]: !hasChildren && open && isCurrentPage,
                [styles.tocChild]: !isTopLevel,
              })}
            />
          ) : (
            <Minus
              className={classNames(styles.tocIcon, {
                [styles.tocItemOpen]: hasChildren,
                [styles.tocItemCurrent]: !hasChildren && isCurrentPage,
                [styles.tocChild]: !isTopLevel,
              })}
            />
          )}
          <Typography
            type="copy3"
            emphasis={isTopLevel}
            className={classNames(styles.tocItem, {
              [styles.tocItemOpen]: hasChildren && open,
              [styles.tocItemCurrent]: !hasChildren && open && isCurrentPage,
              [styles.tocChild]: !isTopLevel,
            })}
          >
            {toc?.tocHeading || 'nope'}
          </Typography>
        </div>
      </Link>
      <Collapse isOpened={open}>
        <div className={styles.tocChildren}>
          <div className={styles.tocChildrenLineWrapper}>
            <div className={styles.tocChildrenLine}></div>
          </div>
          <div className={styles.tocChildrenContent}>
            {toc?.children.map((t) => (
              // TODO(jaykhatri) - this 'docPaths' concept has to be stateful 🤔.
              <TableOfContents
                openParent={open}
                docPaths={docPaths}
                key={t.docPathId}
                toc={t}
              />
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

const DocSearchbar = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <div className={styles.docSearchbar}>
      <BiSearch />
      <input {...props} type="text" placeholder="Find anything" />
    </div>
  );
};

const getBreadcrumbs = (metadata: any, docOptions: DocPath[]) => {
  const trail: { title: string; path: string }[] = [
    { title: 'Docs', path: '/docs' },
  ];
  if (metadata && docOptions) {
    const currentDocIndex = docOptions?.findIndex(
      (d) => d?.metadata?.slug === metadata?.slug
    );
    const currentDoc = docOptions[currentDocIndex];
    const pathToSearch: string[] = [];
    currentDoc.array_path.forEach((section) => {
      pathToSearch.push(section);
      const simplePath = pathToSearch.join('/');
      const nextBreadcrumb = docOptions.find(
        (d) => d?.simple_path === simplePath
      );
      trail.push({
        title: nextBreadcrumb?.metadata?.title,
        path: `/docs/${nextBreadcrumb?.simple_path}`,
      });
    });
  }
  return trail;
};

const DocPage = ({
  markdownText,
  toc,
  redirect,
  docOptions,
  metadata,
}: {
  markdownText: string;
  slug: string;
  toc: TocEntry;
  docOptions: DocPath[];
  metadata: any;
  redirect?: string;
}) => {
  const blogBody = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [hoveredResult, setHoveredResult] = useState(0);

  useEffect(() => {
    setCurrentPageIndex(
      docOptions.findIndex((d) => d?.metadata?.slug === metadata?.slug)
    );
  }, [docOptions, metadata?.slug]);

  useEffect(() => {
    if (redirect != null) {
      router.push(redirect);
    }
  }, [redirect, router]);

  const onSearchChange = async (e: any) => {
    if (e.target.value !== '') {
      setIsSearchLoading(true);
      const results = await (
        await fetch(`/api/docs/search/${e.target.value}`)
      ).json();
      setIsSearchLoading(false);
      setSearchResults(results);
      setSearchValue(e.target.value);
    } else {
      setSearchResults([]);
      setSearchValue('');
    }
  };

  return (
    <>
      <Head>
        <title>{metadata ? metadata.title : ''}</title>
        <meta name="description" content={'TODO'} />
      </Head>
      <Navbar hideFreeTrialText fixed />
      <main ref={blogBody} className={styles.mainWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.leftInner}>
            <DocSearchbar
              onChange={onSearchChange}
              onFocus={() => {
                setSearchOpen(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSearchOpen(false);
                }, 500);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  setHoveredResult((currHoveredResult) =>
                    Math.min(currHoveredResult + 1, searchResults.length)
                  );
                }
                if (e.key === 'ArrowUp') {
                  setHoveredResult((currHoveredResult) =>
                    Math.max(currHoveredResult - 1, 0)
                  );
                }
                if (e.key === 'Enter') {
                  router.push(`/docs/${searchResults[hoveredResult].path}`);
                  setSearchOpen(false);
                }
              }}
            />
            {searchValue !== '' && searchOpen && (
              <div className={styles.searchDiv}>
                {isSearchLoading ? (
                  <Spin className={styles.spinner} />
                ) : (
                  searchResults.map((result: SearchResult, i) => (
                    <Link href={`/docs/${result.path}`} key={i}>
                      <div
                        className={classNames(styles.searchResultCard, {
                          [styles.active]: i === hoveredResult,
                        })}
                        onMouseEnter={() => {
                          setHoveredResult(i);
                        }}
                      >
                        <div>
                          <Highlighter
                            className={styles.resultTitle}
                            highlightClassName={styles.highlightedText}
                            searchWords={[searchValue]}
                            autoEscape={true}
                            textToHighlight={result.title}
                          />
                        </div>
                        <div className={styles.content}>
                          <Highlighter
                            highlightClassName={styles.highlightedText}
                            searchWords={[searchValue]}
                            autoEscape={true}
                            textToHighlight={`${removeMd(
                              result.content.slice(
                                0,
                                SEARCH_RESULT_BLURB_LENGTH
                              )
                            )}...`}
                          />
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
          <div className={styles.tocMenuLarge}>
            {toc?.children.map((t) => (
              <TableOfContents
                key={t.docPathId}
                toc={t}
                docPaths={docOptions}
                openParent={false}
              />
            ))}
          </div>
          <div
            className={classNames(styles.tocRow, styles.tocMenu)}
            onClick={() => setOpen((o) => !o)}
          >
            <ChevronDown
              className={classNames(styles.tocIcon, {
                [styles.tocItemOpen]: open,
              })}
            />
            <Typography
              type="copy3"
              emphasis
              className={classNames(styles.tocItem, {
                [styles.tocItemOpen]: open,
              })}
            >
              Menu
            </Typography>
          </div>
          <Collapse isOpened={open}>
            <div className={classNames(styles.tocContents, styles.tocMenu)}>
              {toc?.children.map((t) => (
                <TableOfContents
                  key={t.docPathId}
                  toc={t}
                  docPaths={docOptions}
                  openParent={false}
                />
              ))}
            </div>
          </Collapse>
        </div>
        <div className={styles.centerSection}>
          <div className={styles.breadcrumb}>
            {getBreadcrumbs(metadata, docOptions).map((breadcrumb, i) =>
              i === 0 ? (
                <Link href={breadcrumb.path}>{breadcrumb.title}</Link>
              ) : (
                <>
                  {` / `}
                  <Link href={breadcrumb.path}>{breadcrumb.title}</Link>
                </>
              )
            )}
          </div>
          <h4 className={styles.pageTitle}>{metadata ? metadata.title : ''}</h4>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className={styles.contentRender}
            components={{
              h1: getDocsTypographyRenderer('h5'),
              h2: getDocsTypographyRenderer('h5'),
              h3: getDocsTypographyRenderer('h5'),
              h4: getDocsTypographyRenderer('h5'),
              h5: getDocsTypographyRenderer('h5'),
              code: getDocsTypographyRenderer('code'),
              a: getDocsTypographyRenderer('a'),
            }}
          >
            {markdownText}
          </ReactMarkdown>
          <div className={styles.pageNavigateRow}>
            {currentPageIndex > 0 ? (
              <Link
                href={docOptions[currentPageIndex - 1].simple_path}
                passHref
              >
                <a className={styles.pageNavigate}>
                  <BiChevronLeft />
                  <Typography type="copy2">
                    {docOptions[currentPageIndex - 1].metadata.title}
                  </Typography>
                </a>
              </Link>
            ) : (
              <div></div>
            )}
            {currentPageIndex < docOptions?.length - 1 ? (
              <Link
                href={docOptions[currentPageIndex + 1].simple_path}
                passHref
              >
                <a className={styles.pageNavigate}>
                  <Typography type="copy2">
                    {docOptions[currentPageIndex + 1].metadata.title}
                  </Typography>
                  <BiChevronRight />
                </a>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className={styles.rightSection}>
          <PageContents title={metadata ? metadata.title : ''} />
        </div>
      </main>
    </>
  );
};

const getIdFromHeaderProps = (props: any) => {
  return props?.node?.children
    .map((child: any) =>
      child.tagName === 'code' ? child?.children[0].value : child.value
    )
    .join('')
    .replace(/[^a-zA-Z ]/g, '')
    .trim()
    .split(' ')
    .join('-');
};

const copyHeadingIcon = (index: number) => {
  return (
    <span className={styles.headingCopyIcon} key={index}>
      <BiLink />
    </span>
  );
};

const resolveLink = (href: string): string => {
  if (href.startsWith('/')) {
    return `/docs${href}`;
  }
  return href;
};

const getDocsTypographyRenderer = (type: 'h5' | 'code' | 'a') => {
  function DocsTypography({ ...props }) {
    const router = useRouter();
    return (
      <>
        {type === 'code' ? (
          props && props.children && props.inline ? (
            <code className={styles.inlineCodeBlock}>{props.children[0]}</code>
          ) : (
            <div className={styles.codeBlock}>
              <CodeBlock
                language={'js'}
                text={props.children[0]}
                showLineNumbers={false}
                theme={highlightCodeTheme}
              />
              <div
                className={styles.codeCopyIcon}
                onClick={() => navigator.clipboard.writeText(props.children[0])}
              >
                <Image src={CopyIcon} alt="Copy" />
              </div>
            </div>
          )
        ) : type === 'a' ? (
          props.children?.length && (
            <Link href={resolveLink(props.href)}>{props.children[0]}</Link>
          )
        ) : (
          createElement(
            type,
            {
              className: styles.contentRender,
              ...(['h4', 'h5'].includes(type)
                ? {
                    id: getIdFromHeaderProps(props),
                    onClick: () => {
                      const basePath = router.asPath.split('#')[0];
                      router.push(`${basePath}#${getIdFromHeaderProps(props)}`);
                    },
                  }
                : {}),
            },
            [
              ...props?.node?.children.map((c: any, i: number) =>
                c.tagName === 'code'
                  ? createElement(c.tagName, { key: i }, c?.children[0].value)
                  : c.value
              ),
              copyHeadingIcon(props?.node?.children?.length ?? 0),
            ] || ''
          )
        )}
      </>
    );
  }
  return DocsTypography;
};

export default DocPage;
