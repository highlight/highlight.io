import { promises as fsp } from 'fs';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../../components/Docs/Docs.module.scss';
import BlogNavbar from '../../components/Blog/BlogNavbar/BlogNavbar';
import { Post } from '../../components/Blog/BlogPost/BlogPost';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import Footer from '../../components/common/Footer/Footer';
import remarkGfm from 'remark-gfm';

import path from 'path';
import Navbar from '../../components/common/Navbar/Navbar';
import Link from 'next/link';
import { Typography } from '../../components/common/Typography/Typography';

const DOCS_CONTENT_PATH = path.join(process.cwd(), 'docs_content');

interface DocPath {
  // heading under which the page will live.
  heading: string;
  // path from project root of the md file.
  path: string;
  // slug of the page that shows up after highlight.io/docs, e.g. /getting-started/performance.
  slug: string;
}

// we need to explicitly pass in 'fs_api' because webpack isn't smart enough to
// know that this is only being called in server-side functions.
const getDocsPaths = async (
  fs_api: any,
  base: string | undefined
): Promise<DocPath[]> => {
  if (!base) {
    base = '';
  }
  const full_path = path.join(DOCS_CONTENT_PATH, base);
  const read = await fs_api.readdir(full_path);

  let paths: DocPath[] = [];
  for (var i = 0; i < read.length; i++) {
    const file_string = read[i];
    const total_path = path.join(full_path, file_string);
    const file_path = await fs_api.stat(total_path);
    if (file_path.isDirectory()) {
      paths = paths.concat(await getDocsPaths(fs_api, file_string));
    } else {
      paths.push({
        heading: base,
        path: total_path,
        slug: file_string.split('.')[0],
      });
    }
  }
  return paths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docPaths = await getDocsPaths(fsp, undefined);
  const staticPaths = docPaths.map((p) =>
    path.join('/docs', p.slug.split('.')[0])
  );
  return {
    paths: staticPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const docPaths = await getDocsPaths(fsp, undefined);
  const currentDoc = docPaths.find((d) => d.slug === context?.params?.doc);
  const fileContents = await fsp.readFile(path.join(currentDoc?.path || ''));
  return {
    props: {
      markdownText: fileContents.toString(),
      slug: currentDoc?.slug,
      docOptions: docPaths,
    },
  };
};

const toSentenceCase = (word: string): string => {
  if (word.length < 1) {
    return '';
  }
  return word[0].toUpperCase() + word.slice(1);
};

const DocPage = ({
  markdownText,
  slug,
  docOptions,
}: {
  markdownText: string;
  slug: string;
  docOptions: DocPath[];
}) => {
  const blogBody = useRef<HTMLDivElement>(null);
  return (
    <>
      <Head>
        <title>
          {'Highlight Docs: '}
          {toSentenceCase(slug)}
        </title>
        <meta name="description" content={'TODO'} />
      </Head>
      <Navbar />
      <main ref={blogBody} className={styles.mainWrapper}>
        <div className={styles.leftSection}>
          {docOptions
            .map((d) => d.heading)
            .filter((d, i, a) => a.indexOf(d) === i && d.length)
            .map((heading, i) => {
              return (
                <div key={i} className={styles.headingSection}>
                  <Typography type="outline">
                    {heading.split('-').join(' ')}
                  </Typography>
                  {docOptions
                    .filter((o) => o.heading === heading)
                    .map((doc, i) => (
                      <Link passHref={true} href={doc.slug} key={i}>
                        <Typography type="copy3" className={styles.docLink}>
                          {doc.slug}
                        </Typography>
                      </Link>
                    ))}
                </div>
              );
            })}
        </div>
        <div className={styles.centerSection}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownText}
          </ReactMarkdown>
        </div>
        <div className={styles.rightSection}>hello</div>
      </main>
    </>
  );
};

export default DocPage;
