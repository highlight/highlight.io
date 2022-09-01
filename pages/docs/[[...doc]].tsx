import { promises as fsp } from 'fs';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { createElement, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles, {
  chevronHover,
  docsText,
  tocChildren,
} from '../../components/Docs/Docs.module.scss';
import BlogNavbar from '../../components/Blog/BlogNavbar/BlogNavbar';
import { Post } from '../../components/Blog/BlogPost/BlogPost';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import Footer from '../../components/common/Footer/Footer';
import remarkGfm from 'remark-gfm';
import yaml from 'js-yaml';
import ChevronDown from '../../public/images/ChevronDownIcon';
import Minus from '../../public/images/MinusIcon';
import { Collapse } from 'react-collapse';

import path from 'path';
import Navbar from '../../components/common/Navbar/Navbar';
import Link from 'next/link';
import { Typography } from '../../components/common/Typography/Typography';
import { CodeBlock } from 'react-code-blocks';
import highlightCodeTheme from '../../components/common/CodeBlock/highlight-code-theme';
import matter from 'gray-matter';
import classNames from 'classnames';

const DOCS_CONTENT_PATH = path.join(process.cwd(), 'docs_content');

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
}

// we need to explicitly pass in 'fs_api' because webpack isn't smart enough to
// know that this is only being called in server-side functions.
const getDocsPaths = async (
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
      let simple_path = path.join(base, file_string);
      if (file_string === 'index.md') {
        // get rid of "index.md" at the end
        pp = simple_path.split('/').slice(0, -1).join('/');
      } else {
        // strip out any notion of ".md"
        pp = simple_path.replace('.md', '');
      }
      const { data } = await readMarkdown(fsp, path.join(total_path || ''));
      paths.push({
        simple_path: pp,
        array_path: pp.split('/'),
        total_path,
        indexPath: file_string === 'index.md',
        metadata: data,
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
    console.log('path', d.simple_path);
    console.log('doc path', d);
    for (var a of d.array_path) {
      // for each of the array parts:
      // 1. in the current TOC entry, check if a child exists that matches the current docpath
      // 2. if not, create it. if so, set the new current toc entry
      let foundEntry = currentEntry.children.find((t, ti) => {
        return t.tocSlug === a;
      });
      if (!foundEntry) {
        foundEntry = {
          tocSlug: a,
          // tocHeading: docPaths[docid].metadata.title,
          // docPathId: docid,
          children: [],
        };
        currentEntry.children.push(foundEntry);
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
      JSON.stringify(d.array_path) === JSON.stringify(context?.params?.doc)
    );
  });
  // console.log('path to read', path.join(currentDoc?.total_path || ''));
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
    },
  };
};

const readMarkdown = async (fs_api: any, filePath: string) => {
  const fileContents = await fs_api.readFile(path.join(filePath));
  const { content, data } = matter(fileContents, {
    delimiters: ['---', '---'],
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });
  return {
    content,
    data,
  };
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
  const hasChildren = toc.children.length ? true : false;

  const [isCurrentPage, setIsCurrentPage] = useState(false);

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
          <ChevronDown className={styles.tocIcon} />
        ) : (
          <Minus className={styles.tocIcon} />
        )}
        <Typography
          type="copy3"
          emphasis
          className={classNames(styles.tocItem, {
            [styles.tocItemOpen]: hasChildren && open,
            [styles.tocItemCurrent]: !hasChildren && open && isCurrentPage,
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
            {toc.children.map((t) => (
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

const DocPage = ({
  markdownText,
  slug,
  toc,
  docOptions,
  metadata,
}: {
  markdownText: string;
  slug: string;
  toc: TocEntry;
  docOptions: DocPath[];
  metadata: any;
}) => {
  const blogBody = useRef<HTMLDivElement>(null);
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={'TODO'} />
      </Head>
      <Navbar hideFreeTrialText />
      <main ref={blogBody} className={styles.mainWrapper}>
        <div className={styles.leftSection}>
          {toc.children.map((t) => (
            <TableOfContents key={t.docPathId} toc={t} docPaths={docOptions} />
          ))}
        </div>
        <div className={styles.centerSection}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={
              {
                // h1: getDocsTypographyRenderer('h4'),
                // h2: getDocsTypographyRenderer('h4'),
                // h3: getDocsTypographyRenderer('h5'),
                // h4: getDocsTypographyRenderer('h5'),
                // h5: getDocsTypographyRenderer('h5'),
                // code: getDocsTypographyRenderer('code'),
              }
            }
          >
            {markdownText}
          </ReactMarkdown>
        </div>
        <div className={styles.rightSection}></div>
      </main>
    </>
  );
};

const getDocsTypographyRenderer = (type: string) => {
  function ParagraphHeader({ ...props }) {
    return (
      <>
        {type === 'code' ? (
          props.inline ? (
            <code className={styles.inlineCodeBlock}>{props.children[0]}</code>
          ) : (
            <div className={styles.codeBlock}>
              <CodeBlock
                language={'js'}
                text={props.children[0]}
                showLineNumbers={false}
                theme={highlightCodeTheme}
              />
            </div>
          )
        ) : (
          createElement(
            type,
            {
              className: styles.docsText,
            },
            props?.children[0] || ''
          )
        )}
      </>
    );
  }
  return ParagraphHeader;
};

export default DocPage;
