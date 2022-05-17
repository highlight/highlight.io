import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Blog/Blog.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { BlogPost, Post } from '../../components/Blog/BlogPost/BlogPost';
import { GraphQLClient, gql } from 'graphql-request';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { useEffect, useState } from 'react';
import Paginate from '../../components/common/Paginate/Paginate';

const ITEMS_PER_PAGE = 5;

export const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl2tzedef0o3p01yz7c7eetq8/master',
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }
);

const QUERY = gql`
  {
    posts {
      slug
      image {
        url
      }
      title
      description
      publishedAt
      publishedBy {
        name
        picture
      }
      content
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);

  return {
    props: {
      posts: posts.reverse(),
    },
  };
}

const Blog = ({ posts }: { posts: Array<never> }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount] = useState(Math.ceil(posts.length / ITEMS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentItems(
      posts.slice(
        ITEMS_PER_PAGE * (currentPage - 1),
        Math.min(ITEMS_PER_PAGE * currentPage, posts.length)
      )
    );
  }, [currentPage, posts]);

  return (
    <>
      <Head>
        <title>Highlight Blog</title>
        <meta name="description" content="Stop debugging in the dark. " />
      </Head>
      <div className={homeStyles.bgPosition}>
        <div className={homeStyles.purpleDiv}>
          <Image src={PurpleGradient} alt="" />
        </div>
        <div className={homeStyles.blueDiv}>
          <Image src={BlueGradient} alt="" />
        </div>
      </div>
      <Navbar />
      <main>
        <Section>
          <div className={homeStyles.anchorTitle}>
            <h1>Highlight Blog</h1>
            <p className={homeStyles.bodyLarge}>
              {`Welcome to the Highlight Blog 👋`}
            </p>
          </div>
        </Section>
        <div className={styles.blogContainer}>
          {currentItems.map((p: Post, i: number) => (
            <BlogPost {...p} key={i} />
          ))}
          <Paginate
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageRangeDisplayed={5}
            pageCount={pageCount}
          />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
