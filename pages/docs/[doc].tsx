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
import fs from 'fs';

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO(vkorolik) loaded in from file system
  return {
    paths: ['/docs/performance'],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const doc = params?.doc as string;
  // TODO(vkorolik) read the md file

  let data;
  try {
    data = fs.readFileSync(
      '/home/vkorolik/work/highlight-landing/pages/docs/docs/performance.md',
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      markdown: data,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const DocPage = ({ markdown }: { markdown: string }) => {
  const blogBody = useRef<HTMLDivElement>(null);
  return (
    <>
      <Head>
        <title>{'TODO'}</title>
        <meta name="description" content={'TODO'} />
      </Head>
      <BlogNavbar title={'TODO'} endPosition={100} />
      <main ref={blogBody} className={styles.mainBlogPadding}>
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />,
      </main>
      <Footer />
    </>
  );
};

export default DocPage;
