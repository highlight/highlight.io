import { promises as fsp } from 'fs';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../../components/Blog/Blog.module.scss';
import BlogNavbar from '../../components/Blog/BlogNavbar/BlogNavbar';
import { Post } from '../../components/Blog/BlogPost/BlogPost';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import Footer from '../../components/common/Footer/Footer';
import remarkGfm from 'remark-gfm';

import path from 'path';

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
  console.log(staticPaths);
  return {
    paths: ['/docs/performance'],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const docPaths = await getDocsPaths(fsp, undefined);
  const currentDoc = docPaths.find((d) => d.slug === context?.params?.doc);
  const fileContents = await fsp.readFile(path.join(currentDoc?.path || ''));
  console.log('contents', fileContents.toString());
  return {
    props: { markdownText: fileContents.toString(), slug: currentDoc?.slug },
  };
  return { props: { markdownText: 'hello' } };
};

const DocPage = ({ markdownText }: { markdownText: string }) => {
  const blogBody = useRef<HTMLDivElement>(null);
  return (
    <>
      <Head>
        <title>{'TODO'}</title>
        <meta name="description" content={'TODO'} />
      </Head>
      <BlogNavbar title={'TODO'} endPosition={100} />
      <main ref={blogBody} className={styles.mainBlogPadding}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownText}
        </ReactMarkdown>
      </main>
      <Footer />
    </>
  );
};

export default DocPage;
