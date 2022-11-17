import { promises as fsp } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../../components/Docs/Docs.module.scss';
import remarkGfm from 'remark-gfm';
import yaml from 'js-yaml';
import ChevronDown from '../../public/images/ChevronDownIcon';
import Minus from '../../public/images/MinusIcon';
import { Collapse } from 'react-collapse';

import path from 'path';
import Navbar from '../../components/common/Navbar/Navbar';
import Link from 'next/link';
import PageIcon from '../../public/images/page.svg';
import { Typography } from '../../components/common/Typography/Typography';
import matter from 'gray-matter';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import 'antd/lib/spin/style/index.css';
import { Meta } from '../../components/common/Head/Meta';
import { DOCS_REDIRECTS } from '../../middleware';
import DocSearchbar from '../../components/Docs/DocSearchbar/DocSearchbar';
import { IGNORED_DOCS_PATHS, processDocPath } from '../api/docs/github';
import { DocSection } from '../../components/Docs/DocLayout/DocLayout';
import { getDocsTypographyRenderer } from '../../components/Docs/DocsTypographyRenderer/DocsTypographyRenderer';
import DocSelect from '../../components/Docs/DocSelect/DocSelect';

const DOCS_CONTENT_PATH = path.join(process.cwd(), 'docs');

export interface DocPath {
  // e.g. '[tips, sessions-search-deep-linking.md]'
  array_path: string[];
  // e.g. 'tips/sessions-search-deep-linking.md'
  simple_path: string;
  // e.g. '[/tips, /getting-started/client-sdk]'
  relative_links: string[];
  // e.g. /Users/jaykhatri/projects/highlight-landing/docs/tips/sessions-search-deep-linking.md
  total_path: string;
  // e.g. 'tips/sessions-search-deep-linking.md'
  rel_path: string;
  // whether the path has an index.md file in it or a "homepage" of some sort for that directory.
  indexPath: boolean;
  // metadata stored at the top of each md file.
  metadata: any;
  content: string;
}

export interface Doc {
  content: string;
  data: { [key: string]: any };
  links: Set<string>;
}

const useHeadingsData = (headingTag: string) => {
  const router = useRouter();
  const [nestedHeadings, setNestedHeadings] = useState<any>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll(headingTag));
    setNestedHeadings(headingElements);
  }, [headingTag, router.query]);

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

const sortByFilePrefix = (a: string, b: string) => {
  const firstStringSplit = a.split('_');
  const secondStringSplit = b.split('_');
  const firstPrefix = Number(firstStringSplit[0]);
  const secondPrefix = Number(secondStringSplit[0]);
  if (firstPrefix && secondPrefix && firstPrefix != secondPrefix) {
    return firstPrefix - secondPrefix;
  } else if (firstPrefix && !secondPrefix) {
    return -1;
  } else if (!firstPrefix && secondPrefix) {
    return 1;
  }
  const firstFileString = firstStringSplit[firstStringSplit.length - 1];
  const secondFileString = secondStringSplit[secondStringSplit.length - 1];
  if (firstFileString > secondFileString) {
    return 1;
  }
  if (firstFileString < secondFileString) {
    return -1;
  }
  if (firstFileString === secondFileString) {
    return 0;
  }
};

const isValidDirectory = (files: string[]) => {
  return files.find((filename) => filename.includes('index.md')) != null;
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
    base = 'general-docs';
  }
  const full_path = path.join(DOCS_CONTENT_PATH, base);
  const read = await fs_api.readdir(full_path);
  if (!isValidDirectory(read)) {
    throw new Error(
      `${full_path} does not contain an index.md file. An index.md file is required for all documentation directories. `
    );
  }
  read.sort(sortByFilePrefix);
  let paths: DocPath[] = [];
  for (var i = 0; i < read.length; i++) {
    const file_string = read[i];
    if (IGNORED_DOCS_PATHS.has(file_string)) {
      continue;
    }
    let total_path = path.join(full_path, file_string);
    const file_path = await fs_api.stat(total_path);
    if (file_path.isDirectory()) {
      paths = paths.concat(
        await getDocsPaths(fs_api, path.join(base, file_string))
      );
    } else {
      const pp = processDocPath(base, file_string)
        .replaceAll('general-docs/', '')
        .replaceAll('general-docs', '');
      const { data, links, content } = await readMarkdown(
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
        rel_path: total_path.replace(DOCS_CONTENT_PATH, ''),
        indexPath: file_string.includes('index.md'),
        metadata: data,
        content: content,
      });
    }
  }
  return paths;
};

export const getSdkPaths = async (
  fs_api: any,
  base: string | undefined
): Promise<DocPath[]> => {
  if (!base) {
    base = 'sdk-docs';
  }
  const full_path = path.join(DOCS_CONTENT_PATH, base);
  const read = await fs_api.readdir(full_path);
  if (!isValidDirectory(read)) {
    throw new Error(
      `${full_path} does not contain an index.md file. An index.md file is required for all documentation directories. `
    );
  }
  read.sort(sortByFilePrefix);
  let paths: DocPath[] = [];
  for (var i = 0; i < read.length; i++) {
    const file_string = read[i];
    if (IGNORED_DOCS_PATHS.has(file_string)) {
      continue;
    }
    let total_path = path.join(full_path, file_string);
    const file_path = await fs_api.stat(total_path);
    if (file_path.isDirectory()) {
      paths = paths.concat(
        await getDocsPaths(fs_api, path.join(base, file_string))
      );
    } else {
      const pp = processDocPath(base, file_string)
        .replaceAll('sdk-docs/', 'sdk/')
        .replaceAll('sdk-docs', 'sdk');
      const { data, links, content } = await readMarkdown(
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
        rel_path: total_path.replace(DOCS_CONTENT_PATH, ''),
        indexPath: file_string.includes('index.md'),
        metadata: data,
        content: content,
      });
    }
  }
  return paths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docPaths = await getDocsPaths(fsp, undefined);
  const sdkPaths = await getSdkPaths(fsp, undefined);
  const staticPaths = [...docPaths, ...sdkPaths].map((p) => {
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
  const sdkPaths = await getSdkPaths(fsp, undefined);
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
  for (const d of sdkPaths) {
    docRelLinks.set(`/${d.simple_path}`, d.relative_links);
  }

  console.log('vadim', docRelLinks);

  // validate that any relative links referenced in md files actually exist.
  for (const [simplePath, relativeLinks] of docRelLinks.entries()) {
    for (const link of relativeLinks) {
      if (!docRelLinks.has(link.split('#')[0])) {
        throw new Error(
          `Link ${link} used in ${simplePath} is not a valid relative link.`
        );
      }
    }
  }

  // validate that any archbee redirect URLs are valid.
  for (const [oldLink, newLink] of Object.entries(DOCS_REDIRECTS)) {
    if (newLink.startsWith('/docs/')) {
      const doc = (newLink.split('/docs').pop() || '').split('#')[0];
      if (!docRelLinks.has(doc)) {
        throw new Error(
          `Redirect link ${doc} in middleware.ts from ${oldLink} is not valid.`
        );
      }
    }
  }

  const allPaths = [...docPaths, ...sdkPaths];
  const currentDoc = allPaths.find((d) => {
    return (
      JSON.stringify(d.array_path) ===
      JSON.stringify(context?.params?.doc || [''])
    );
  });
  const absPath = path.join(currentDoc?.total_path || '');
  // the metadata in a file starts with "" and ends with "---" (this is the archbee format).
  const { content } = await readMarkdown(fsp, absPath);
  return {
    props: {
      metadata: currentDoc?.metadata,
      markdownText: content,
      slug: currentDoc?.simple_path,
      relPath: currentDoc?.rel_path,
      docOptions: allPaths,
      toc,
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

const SdkTableOfContents = () => {
  const { nestedHeadings } = useHeadingsData('h4');
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

  return (
    <>
      {nestedHeadings.map((heading: HTMLHeadingElement, i: number) => (
        <Link href={`#${heading.id}`} key={i} legacyBehavior>
          <div
            className={styles.tocRow}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: 'smooth',
              });
              const basePath = router.asPath.split('#')[0];
              const newUrl = `${basePath}#${heading.id}`;
              window.history.replaceState(
                {
                  ...window.history.state,
                  as: newUrl,
                  url: newUrl,
                },
                '',
                newUrl
              );
            }}
          >
            <Minus
              className={classNames(styles.tocIcon, styles.tocChild, {
                [styles.tocItemCurrent]: heading.id === activeId,
              })}
            />
            <Typography
              type="copy3"
              className={classNames(styles.tocItem, styles.tocChild, {
                [styles.tocItemCurrent]: heading.id === activeId,
              })}
            >
              {heading.innerText || 'nope'}
            </Typography>
          </div>
        </Link>
      ))}
    </>
  );
};

const PageContents = ({ title }: { title: string }) => {
  const { nestedHeadings } = useHeadingsData('h5');
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
                  const newUrl = `${basePath}#${heading.id}`;
                  window.history.replaceState(
                    {
                      ...window.history.state,
                      as: newUrl,
                      url: newUrl,
                    },
                    '',
                    newUrl
                  );
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
  openTopLevel = false,
}: {
  toc: TocEntry;
  openParent: boolean;
  openTopLevel?: boolean;
  docPaths: DocPath[];
}) => {
  const [open, setOpen] = useState(openTopLevel || openParent);
  const hasChildren = !!toc?.children.length;

  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const isTopLevel =
    toc.tocSlug === docPaths[toc.docPathId || 0]?.array_path[0];

  useEffect(() => {
    setOpen(isTopLevel && openTopLevel);
  }, [isTopLevel, openTopLevel]);

  useEffect(() => {
    const isCurrentPage =
      path.join('/docs', docPaths[toc.docPathId || 0]?.simple_path || '') ===
      window.location.pathname;
    setIsCurrentPage(isCurrentPage);
  }, [docPaths, toc.docPathId]);

  return (
    <div>
      {hasChildren ? (
        <div className={styles.tocRow} onClick={() => setOpen((o) => !o)}>
          <ChevronDown
            className={classNames(styles.tocIcon, {
              [styles.tocItemChevronClosed]: hasChildren && !open,
              [styles.tocItemOpen]: hasChildren && open,
              [styles.tocItemCurrent]: !hasChildren && open && isCurrentPage,
              [styles.tocChild]: !isTopLevel,
            })}
          />
          <Typography
            type="copy3"
            emphasis={isTopLevel}
            className={classNames(styles.tocItem, {
              [styles.tocItemOpen]: hasChildren && open,
              [styles.tocItemCurrent]: (!hasChildren || open) && isCurrentPage,
              [styles.tocChild]: !isTopLevel,
            })}
          >
            {toc?.tocHeading || 'nope'}
          </Typography>
        </div>
      ) : (
        <Link
          href={path.join(
            '/docs',
            docPaths[toc.docPathId || 0]?.simple_path || ''
          )}
          legacyBehavior
        >
          <div
            className={styles.tocRow}
            onClick={() => {
              setOpen((o) => !o);
              if (window.scrollY >= 124) {
                sessionStorage.setItem('scrollPosition', '124');
              } else {
                sessionStorage.setItem('scrollPosition', '0');
              }
            }}
          >
            <Minus
              className={classNames(styles.tocIcon, {
                [styles.tocItemOpen]: hasChildren,
                [styles.tocItemCurrent]: !hasChildren && isCurrentPage,
                [styles.tocChild]: !isTopLevel,
              })}
            />
            <Typography
              type="copy3"
              emphasis={isTopLevel}
              className={classNames(styles.tocItem, {
                [styles.tocItemOpen]: hasChildren && open,
                [styles.tocItemCurrent]:
                  (!hasChildren || open) && isCurrentPage,
                [styles.tocChild]: !isTopLevel,
              })}
            >
              {toc?.tocHeading || 'nope'}
            </Typography>
          </div>
        </Link>
      )}
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
  relPath,
  slug,
  toc,
  redirect,
  docOptions,
  metadata,
}: {
  markdownText?: string;
  relPath?: string;
  slug: string;
  toc: TocEntry;
  docOptions: DocPath[];
  metadata?: { title: string; slug: string };
  redirect?: string;
}) => {
  const blogBody = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);

  const docOptionsWithContent = useMemo(() => {
    return docOptions?.filter((doc) => !doc.indexPath);
  }, [docOptions]);

  const description = (markdownText || '')
    .replaceAll(/[`[(]+.+[`\])]+/gi, '')
    .replaceAll(/#+/gi, '')
    .split('\n')
    .join(' ');

  useEffect(() => {
    setCurrentPageIndex(
      docOptionsWithContent?.findIndex(
        (d) => d?.metadata?.slug === metadata?.slug
      )
    );
  }, [docOptionsWithContent, metadata?.slug]);

  useEffect(() => {
    if (redirect != null) {
      router.push(redirect);
    }
  }, [redirect, router]);

  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition));
    }
  }, [router]);

  const isSdkDocs = useMemo(() => {
    return (
      currentPageIndex != -1 &&
      docOptionsWithContent[currentPageIndex] &&
      docOptionsWithContent[currentPageIndex].array_path.includes('sdk')
    );
  }, [currentPageIndex, docOptionsWithContent]);

  return (
    <>
      <Meta
        title={metadata?.title || ''}
        description={description}
        absoluteImageUrl={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/og/doc${relPath?.replace('.md', '')}`}
        canonical={`/docs/${slug}`}
      />
      <Navbar title="Docs" hideBanner hideNavButtons fixed />
      <div className={styles.contentInnerBar}>
        <div className={styles.leftInner}>
          <DocSelect />
        </div>
        <div className={styles.centerInner}>
          <DocSearchbar docPaths={docOptions} />
        </div>
      </div>
      <main ref={blogBody} className={styles.mainWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.tocMenuLarge}>
            {isSdkDocs ? (
              <SdkTableOfContents />
            ) : (
              toc?.children.map((t) => (
                <TableOfContents
                  key={t.docPathId}
                  toc={t}
                  docPaths={docOptions}
                  openParent={false}
                  openTopLevel={true}
                />
              ))
            )}
          </div>
          <div
            className={classNames(styles.tocRow, styles.tocMenu)}
            onClick={() => setOpen((o) => !o)}
          >
            <div className={styles.tocMenuLabel}>
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
          </div>
          <Collapse isOpened={open}>
            <div className={classNames(styles.tocContents, styles.tocMenu)}>
              {isSdkDocs ? (
                <SdkTableOfContents />
              ) : (
                toc?.children.map((t) => (
                  <TableOfContents
                    key={t.docPathId}
                    toc={t}
                    docPaths={docOptions}
                    openParent={false}
                    openTopLevel={false}
                  />
                ))
              )}
            </div>
          </Collapse>
        </div>
        <div className={styles.contentSection}>
          <div
            className={classNames(styles.centerSection, {
              [styles.sdkCenterSection]: isSdkDocs,
            })}
          >
            <div className={styles.breadcrumb}>
              {!isSdkDocs &&
                getBreadcrumbs(metadata, docOptions).map((breadcrumb, i) =>
                  i === 0 ? (
                    <Link href={breadcrumb.path} legacyBehavior>
                      {breadcrumb.title}
                    </Link>
                  ) : (
                    <>
                      {` / `}
                      <Link href={breadcrumb.path} legacyBehavior>
                        {breadcrumb.title}
                      </Link>
                    </>
                  )
                )}
            </div>
            <h3 className={styles.pageTitle}>
              {metadata ? metadata.title : ''}
            </h3>
            {isSdkDocs ? (
              <DocSection content={markdownText || ''} />
            ) : (
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
                {markdownText || ''}
              </ReactMarkdown>
            )}
            <div className={styles.pageNavigateRow}>
              {currentPageIndex > 0 ? (
                <Link
                  href={docOptionsWithContent[currentPageIndex - 1].simple_path}
                  passHref
                  className={styles.pageNavigate}
                >
                  <BiChevronLeft />
                  <Typography type="copy2">
                    {docOptionsWithContent[currentPageIndex - 1].metadata.title}
                  </Typography>
                </Link>
              ) : (
                <div></div>
              )}
              {currentPageIndex < docOptionsWithContent?.length - 1 ? (
                <Link
                  href={docOptionsWithContent[currentPageIndex + 1].simple_path}
                  passHref
                  className={styles.pageNavigate}
                >
                  <Typography type="copy2">
                    {docOptionsWithContent[currentPageIndex + 1].metadata.title}
                  </Typography>
                  <BiChevronRight />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {!isSdkDocs && (
            <div className={styles.rightSection}>
              <PageContents title={metadata ? metadata.title : ''} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DocPage;
