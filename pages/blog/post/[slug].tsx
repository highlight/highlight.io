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
import Link from 'next/link';

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
  const POSTS_QUERY = gql`
query GetPosts() {
    posts(orderBy: publishedAt_DESC) {
      slug
      title
      description
    }
  }
`;
  const data = await graphcms.request(QUERY, { slug: slug });
  const { posts } = await graphcms.request(POSTS_QUERY);

  // Handle event slugs which don't exist in our CMS
  if (!data.post) {
    return {
      notFound: true,
    };
  }

  const currentPostIndex = posts.findIndex((post: any) => post.slug === slug);

  return {
    props: {
      post: data.post,
      next: currentPostIndex > 0 ? posts[currentPostIndex - 1] : {},
      prev:
        currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : {},
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const PostPage = ({
  post,
  prev,
  next,
}: {
  post: any;
  prev: any;
  next: any;
}) => {
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
            <div className={styles.tagDiv}>
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/blog?tag=${tag}`} passHref={true}>
                  <div>{tag}</div>
                </Link>
              ))}
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
          </div>
        </Section>
        <Section>
          <div className={styles.suggestedPostDiv}>
            {prev.title ? (
              <Link href={`/blog/post/${prev.slug}`} passHref>
                <div className={styles.suggestedPost}>
                  <div>{`<<`}</div>
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            {next.title ? (
              <Link href={`/blog/post/${next.slug}`} passHref>
                <div className={styles.suggestedPost}>
                  <div>{`>>`}</div>
                  {next.title}
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </Section>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
