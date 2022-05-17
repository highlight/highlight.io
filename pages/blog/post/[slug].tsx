import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../../components/Home/Home.module.scss';
import styles from '../../../components/Blog/Blog.module.scss';
import Navbar from '../../../components/common/Navbar/Navbar';
import { Section } from '../../../components/common/Section/Section';
import Footer from '../../../components/common/Footer/Footer';
import { gql } from 'graphql-request';
import { graphcms } from '..';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { CallToAction } from '../../../components/common/CallToAction/CallToAction';

export const getStaticPaths: GetStaticPaths = async () => {
  const QUERY = gql`
    {
      posts {
        slug
      }
    }
  `;
  const { posts } = await graphcms.request(QUERY);

  return {
    paths: posts.map((p: { slug: string }) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const QUERY = gql`
    query GetPost($slug: String!) {
      post(where: { slug: $slug }) {
        title
        image {
          url
        }
        description
        publishedAt
        publishedBy {
          name
          picture
        }
        content
        tags
      }
    }
  `;
  const data = await graphcms.request(QUERY, { slug: slug });

  // Handle event slugs which don't exist in our CMS
  if (!data.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data.post,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const PostPage = ({ post }: { post: any }) => {
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
          <div className={classNames(homeStyles.anchorTitle, styles.postDiv)}>
            <h1>{post.title}</h1>
            <p className={homeStyles.bodyLarge}>{post.description}</p>
            <div className={styles.authorDiv}>
              <div
                className={styles.avatar}
                style={{ width: '36px', height: '36px', position: 'relative' }}
              >
                <Image src={post.publishedBy.picture} alt="" layout="fill" />
              </div>
              <div>
                <p className={styles.authorName}>{post.publishedBy.name}</p>
                <p>{`${new Date(post.publishedAt).toLocaleDateString(
                  'en-US'
                )} • ${Math.floor(
                  post.content.split(' ').length / 200
                )} min read`}</p>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.mainImage}>
            <Image
              src={post.image.url}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Section>
        <Section>
          <div
            className={classNames(
              homeStyles.anchorTitle,
              styles.postDiv,
              styles.postBody
            )}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <div className={styles.tagDiv}>
              {post.tags.map((tag: string) => (
                <div key={tag}>{tag}</div>
              ))}
            </div>
          </div>
        </Section>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
