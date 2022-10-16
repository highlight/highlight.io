import { promises as fsp } from 'fs';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { createElement, useEffect, useRef, useState } from 'react';
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
import { BiSearch } from 'react-icons/bi';

const DOCS_CONTENT_PATH = path.join(process.cwd(), 'docs_content');
const SEARCH_RESULT_BLURB_LENGTH = 500;

interface DocPath {
  // e.g. '[tips, sessions-search-deep-linking.md]'
  array_path: string[];
  // e.g. 'tips/sessions-search-deep-linking.md'
  simple_path: string;
  // e.g. /Users/jaykhatri/projects/highlight-landing/docs_content/tips/sessions-search-deep-linking.md
  total_path: string;
  // whether the path has an index.md file in it or a "homepage" of some sort for that directory.
  indexPath: boolean;
  // metadata stored at the top of each md file.
  metadata: any;
  // some parent pages are empty and should redirect to the first child page
  redirect?: string;
}

const useHeadingsData = () => {
  const router = useRouter();
  const [nestedHeadings, setNestedHeadings] = useState<any>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h4, h5'));
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
        setActiveId(visibleHeadings[visibleHeadings.length - 1].target.id);
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
    // if (file_string === 'index.md') {
    //   total_path = full_path;
    // }
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
      const { data } = await readMarkdown(fsp, path.join(total_path || ''));
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
  // TODO(jaykhatri) - gotta pass the open state to child doc paths below;
  // will require traversing up to all parents
  for (var d of docPaths) {
    let currentEntry = toc;
    // console.log('path', d.simple_path);
    // console.log('doc path', d);
    for (var a of d.array_path) {
      // for each of the array parts:
      // 1. in the current TOC entry, check if a child exists that matches the current docpath
      // 2. if not, create it. if so, set the new current toc entry
      let foundEntry = currentEntry?.children.find((t, ti) => {
        return t.tocSlug === a;
      });
      if (!foundEntry) {
        foundEntry = {
          tocSlug: a,
          // tocHeading: docPaths[docid].metadata.title,
          // docPathId: docid,
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
  // const traverse = (toc: TocEntry) => {
  //   for (var c of toc.children) {
  //     traverse(c);
  //   }
  // };
  // traverse(toc);

  const currentDoc = docPaths.find((d) => {
    // console.log(
    //   'hello',
    //   JSON.stringify(d.array_path),
    //   JSON.stringify(context?.params?.doc)
    // );
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
  const { content, data } = matter(fileContents, {
    delimiters: ['---', '---'],
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Object,
    },
  });
  return {
    content,
    data,
  };
};

const PageContents = ({ title }: { title: string }) => {
  const { nestedHeadings } = useHeadingsData();
  const [activeId, setActiveId] = useState<string>();
  useIntersectionObserver(setActiveId);

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
  const hasChildren = toc?.children.length ? true : false;

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
      <div className={styles.tocRow} onClick={() => setOpen((o) => !o)}>
        {hasChildren ? (
          <ChevronDown
            className={classNames(styles.tocIcon, {
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
          <Link
            href={path.join(
              '/docs',
              docPaths[toc.docPathId || 0]?.simple_path || ''
            )}
          >
            {toc?.tocHeading || 'nope'}
          </Link>
        </Typography>
      </div>
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

const DocSearchbar = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <div className={styles.docSearchbar}>
      <BiSearch />
      <input type="text" onChange={onChange} placeholder="Find anything" />
    </div>
  );
};

const DocPage = ({
  markdownText,
  slug,
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (redirect != null) {
      router.push(redirect);
    }
  }, [redirect, router]);

  const onSearchChange = async (e: any) => {
    if (e.target.value !== '') {
      const results = await (
        await fetch(`/api/docs/search/${e.target.value}`)
      ).json();
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
      <Navbar hideFreeTrialText hideOnScroll={false} />
      <main ref={blogBody} className={styles.mainWrapper}>
        <div className={styles.leftSection}>
          <DocSearchbar onChange={onSearchChange} />
          {toc?.children.map((t) => (
            <TableOfContents
              key={t.docPathId}
              toc={t}
              docPaths={docOptions}
              openParent={false}
            />
          ))}
        </div>
        {searchResults.length > 0 ? (
          <div className={styles.centerSection}>
            {searchResults.map((result: SearchResult, i) => (
              <Link href={result.path} key={i} passHref>
                <div
                  className={styles.searchResultCard}
                  onClick={() => {
                    setSearchResults([]);
                  }}
                >
                  <div>
                    <Typography type="copy3">{result.title}</Typography>
                  </div>
                  <div className={styles.content}>
                    <Highlighter
                      highlightClassName={styles.highlightedText}
                      searchWords={[searchValue]}
                      autoEscape={true}
                      textToHighlight={`${removeMd(
                        result.content.slice(0, SEARCH_RESULT_BLURB_LENGTH)
                      )}...`}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.centerSection}>
            <h4 className={styles.pageTitle}>
              {metadata ? metadata.title : ''}
            </h4>
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
              }}
            >
              {markdownText}
            </ReactMarkdown>
          </div>
        )}
        <div className={styles.rightSection}>
          {searchResults.length === 0 && (
            <PageContents title={metadata ? metadata.title : ''} />
          )}
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

const getDocsTypographyRenderer = (type: string) => {
  function ParagraphHeader({ ...props }) {
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
        ) : (
          createElement(
            type,
            {
              className: styles.contentRender,
              ...(['h4', 'h5'].includes(type)
                ? {
                    id: getIdFromHeaderProps(props),
                  }
                : {}),
            },
            props?.node?.children.map((c: any) =>
              c.tagName === 'code'
                ? createElement(c.tagName, {}, c?.children[0].value)
                : c.value
            ) || ''
          )
        )}
      </>
    );
  }
  return ParagraphHeader;
};

export default DocPage;
