import styles from '../../components/Blog/Blog.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import { BlogPost, Post } from '../../components/Blog/BlogPost/BlogPost';
import { gql, GraphQLClient } from 'graphql-request';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import { useState } from 'react';
import Paginate from '../../components/common/Paginate/Paginate';
import Link from 'next/link';
import classNames from 'classnames';
import { BlogPostSmall } from '../../components/Blog/BlogPostSmall/BlogPostSmall';
import { Typography } from '../../components/common/Typography/Typography';
import { Meta } from '../../components/common/Head/Meta';

const ITEMS_PER_PAGE = 6;

export const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl2tzedef0o3p01yz7c7eetq8/master',
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
    fetch,
  }
);

export async function getStaticProps() {
  const { posts, tags } = await loadPosts(undefined);

  return {
    props: {
      posts,
      tags,
      currentTag: '',
    },
    revalidate: 60,
  };
}

const loadPosts = async (tag: string | undefined) => {
  const tagProp = tag ? '$tag: [String!]' : '';
  const tagFilter = tag ? 'tags_contains_all: $tag' : '';
  const QUERY = gql`
    query GetPosts(${tagProp}) {
      posts(
        orderBy: postedAt_DESC
        where: { ${tagFilter}, unlisted: false }
      ) {
        slug
        image {
          url
        }
        metaImage {
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
        postedAt
      }
    }
  `;
  const TAGS_QUERY = gql`
  query GetPosts(${tagProp}) {
    posts(
    ) {
      tags
    }
  }
`;

  const filteredRequest = graphcms.request(QUERY, {
    tag: tag ? [tag] : [],
  });
  const allTagsRequest = graphcms.request(TAGS_QUERY, {
    tag: [],
  });

  let requests = [filteredRequest];
  if (tag) {
    requests.push(allTagsRequest);
  } else {
    requests.push(filteredRequest);
  }
  const [{ posts }, { posts: allPosts }] = await Promise.all(requests);

  const filteredPosts = posts.sort((a: any, b: any) => {
    // sort by postedAt if the publishedAt field is the same
    if (a.postedAt === b.postedAt) {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
  });
  const allTags = allPosts.map((post: any) => post.tags);
  const uniqueTags = Array.from(new Set(allTags.flat()));

  return {
    posts: filteredPosts,
    tags: uniqueTags,
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
      <Meta
        title="Debugging Blog: Best Practices From The Highlight Team"
        description="Get debugging best practices, read customer stories, and get general dev tips. Learn to stop debugging in the dark with Highlight's blog and featured articles."
      />
      <Navbar />
      <main>
        <div className={styles.blogContainer}>
          <h4>Blog article of the week</h4>
          <BlogPost {...posts[0]} />
          <hr />
        </div>
        <div className={styles.tagContainer}>
          <div className={styles.tagHeader}>
            <h4 className={styles.tagSortTitle}>Sort by tag</h4>
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
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
