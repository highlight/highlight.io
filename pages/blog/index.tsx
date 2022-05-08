import { NextPage } from 'next';
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
      id
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

const Blog = ({ posts }: { posts: any }) => {
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
          {posts.map((p: Post, i: number) => (
            <BlogPost {...p} key={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
