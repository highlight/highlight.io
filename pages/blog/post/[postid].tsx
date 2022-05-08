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

const QUERY = gql`
  query GetPost($postId: ID!) {
    post(where: { id: $postId }) {
      id
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
    }
  }
`;

export async function getServerSideProps({ query }: any) {
  const { post } = await graphcms.request(QUERY, { postId: query.postid });

  return {
    props: {
      post,
    },
  };
}

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
                <p>{new Date(post.publishedAt).toLocaleDateString('en-US')}</p>
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
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
