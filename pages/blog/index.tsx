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
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import classNames from 'classnames';
import { BlogPostSmall } from '../../components/Blog/BlogPostSmall/BlogPostSmall';
import { Typography } from '../../components/common/Typography/Typography';

const ITEMS_PER_PAGE = 5;

export const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl2tzedef0o3p01yz7c7eetq8/master',
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const QUERY = gql`
    query GetPosts($tag: [String!]) {
      posts(orderBy: publishedAt_DESC, where: { tags_contains_all: $tag }) {
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
        richcontent {
          markdown
          raw
        }
        tags
      }
    }
  `;

  const { posts } = await graphcms.request(QUERY, {
    tag: query.tag ? [query.tag] : [],
  });
  const { posts: allPosts } = await graphcms.request(QUERY, {
    tag: [],
  });
  const allTags = allPosts.map((post: any) => post.tags);
  const uniqueTags = Array.from(new Set(allTags.flat()));

  return {
    props: {
      posts,
      tags: uniqueTags,
      currentTag: query.tag || '',
    },
  };
};

const Blog = ({
  posts,
  tags,
  currentTag,
}: {
  posts: Array<never>;
  tags: Array<string>;
  currentTag: string;
}) => {
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
      <Navbar />
      <main>
        <div className={styles.blogContainer}>
          <h4>Blog article of the week</h4>
          {currentItems.slice(0, 1).map((p: Post, i: number) => (
            <BlogPost {...p} key={i} />
          ))}
          <hr />
        </div>
        <Section>
          <div className={styles.tagHeader}>
            <h4>Sort by tag</h4>
            <div className={styles.tagDiv}>
              {tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={currentTag === tag ? '/blog' : `/blog?tag=${tag}`}
                  passHref={true}
                >
                  <div
                    className={classNames({
                      [styles.selectedTag]: currentTag === tag,
                    })}
                  >
                    <Typography type="copy3">{tag}</Typography>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
        <div className={styles.blogContainer}>
          {currentItems.map((p: Post, i: number) => (
            <BlogPostSmall {...p} key={i} />
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
