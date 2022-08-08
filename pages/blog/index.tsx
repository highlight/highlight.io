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
        metaTitle
        description
        metaDescription
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
        readingTime
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
  posts: Array<Post>;
  tags: Array<string>;
  currentTag: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const currentItems = posts.slice(
    ITEMS_PER_PAGE * (currentPage - 1),
    Math.min(ITEMS_PER_PAGE * currentPage, posts.length)
  );

  return (
    <>
      <Head>
        <title>Debugging Blog: Best Practices From The Highlight Team</title>
        <meta
          name="description"
          content="Get debugging best practices, read customer stories, and get general dev tips. Learn to stop debugging in the dark with Highlight's blog and featured articles."
        />

        <meta
          property="og:title"
          content="Debugging Blog: Best Practices From The Highlight Team"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Get debugging best practices, read customer stories, and get general dev tips. Learn to stop debugging in the dark with Highlight's blog and featured articles."
          key="ogdesc"
        />
      </Head>
      <Navbar />
      <main>
        <div className={styles.blogContainer}>
          <h4>Blog article of the week</h4>
          <BlogPost {...posts[0]} />
          <hr />
        </div>
        <div className={styles.tagContainer}>
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
        </div>
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
