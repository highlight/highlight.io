import { Post } from '../../components/Blog/BlogPost/BlogPost';
import { Typography } from '../../components/common/Typography/Typography';
import Navbar from '../../components/common/Navbar/Navbar';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Footer from '../../components/common/Footer/Footer';
import { useState } from 'react';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import {
  getTagUrl,
  PostTag,
  SidebarTag,
  Tag,
  TagTab,
} from '../../components/Blog/Tag';
import { GraphQLRequest } from '../../utils/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { PostAuthor } from '../../components/Blog/Author';

export async function loadPostsFromHygraph(tag?: string) {
  const QUERY = gql`
      query GetPosts() {
        posts(
          orderBy: postedAt_DESC
          where: { unlisted: false }
          ) {
            slug
            title
            publishedAt
            postedAt
            readingTime
            featured
            author {
              firstName
              lastName
              title
              twitterLink
              linkedInLink
              githubLink
              personalWebsiteLink
              profilePhoto {
                url
              }
            }
            tags_relations {
              name
              slug
            }
          }
      }
  `;

  const { posts } = (await GraphQLRequest(QUERY, {
    tag: tag ? [tag] : [],
  })) as { posts: Post[] };

  return posts
    .filter((p) => (tag ? p.tags_relations.some((t) => t.slug === tag) : true))
    .sort((a, b) => {
      // sort by postedAt if the publishedAt field is the same
      if (a.postedAt === b.postedAt) {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      }
      return 0;
    }) as Post[];
}

export async function loadTagsFromHygraph() {
  const tagsQuery = gql`
    query GetTags() {
      tags {
        name
        description
        slug
      }
    }
  `;

  return (await GraphQLRequest(tagsQuery)).tags as Tag[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await loadPostsFromHygraph();
  const tags = await loadTagsFromHygraph();
  return {
    props: {
      posts,
      tags,
      currentTagSlug: '',
    },

    revalidate: 60 * 60,
  };
};

const searchBarBaseStyle = classNames(
  'border border-solid rounded-md w-full text-copy-on-dark border-divider-on-dark items-center flex focus-within:border-copy-on-light transition-colors'
);

const searchBarInputBaseStyle = classNames(
  'box-border h-full w-0 flex-1 font-sans leading-none bg-transparent border-none outline-none text-copy-on-dark'
);

const allTag: Omit<Tag, 'posts'> = {
  name: 'All posts',
  slug: 'all',
  description:
    'Welcome to the Highlight Blog, where the Highlight team talks about frontend engineering, observability and more!',
};

export const Blog = ({
  posts,
  tags,
  currentTagSlug,
}: {
  posts: Post[];
  tags: Omit<Tag, 'posts'>[];
  currentTagSlug: string;
}) => {
  const pageQuery = useRouter().query.page ?? '1';

  let page = 1;
  if (Array.isArray(pageQuery)) page = parseInt(pageQuery[0]);
  else page = parseInt(pageQuery);

  const shownTags = [allTag, ...tags];
  const currentTag: Omit<Tag, 'posts'> =
    tags.find(({ slug }) => slug === currentTagSlug) ?? allTag;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const itemsPerPage = 4;

  const featuredPosts = posts.filter((p) => p.featured);
  const unfeaturedPosts = posts.filter((p) => !p.featured);

  const filteredPosts = matchSorter(unfeaturedPosts, searchQuery, {
    keys: [
      { key: 'tags_relations.name', maxRanking: matchSorter.rankings.CONTAINS },
      'title',
    ],
  });
  const displayedPosts = filteredPosts.slice(
    itemsPerPage * (page - 1),
    itemsPerPage * page
  );
  const isLastPage = itemsPerPage * page >= filteredPosts.length;

  return (
    <>
      <Navbar />
      <main>
        <div className="flex items-start mx-auto mt-[29px] mb-36 gap-3.5 max-w-4xl desktop:max-w-7xl">
          <div className="sticky w-[352px] hidden pb-[300px] -mb-[300px] h-screen desktop:inline-block overflow-y-scroll top-[153px] box-border">
            <div className="flex flex-col max-h-full gap-6 border border-solid rounded-lg border-divider-on-dark px-9 py-7">
              {/* sidebar */}
              <div
                className={classNames(
                  searchBarBaseStyle,
                  'px-2 h-[34px] gap-1 flex-none'
                )}
              >
                <HiMagnifyingGlass />
                <input
                  type="text"
                  placeholder="Search Posts..."
                  value={searchQuery}
                  onChange={(ev) => setSearchQuery(ev.currentTarget.value)}
                  className={classNames(searchBarInputBaseStyle, 'text-sm')}
                />
              </div>
              <div className="flex flex-col flex-1 max-h-full gap-2 overflow-y-scroll">
                {shownTags.map((tag) => (
                  <SidebarTag
                    {...tag}
                    key={tag.slug}
                    current={currentTag.slug === tag.slug}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl px-[42px]">
            <div className="flex flex-col w-full mb-[30px] desktop:mb-10">
              <Typography type="outline" className="mb-2 text-highlight-yellow">
                The Highlight Blog
              </Typography>

              <h3 className="hidden mobile:inline">{currentTag.name}</h3>
              <h1 className="inline mobile:hidden">{currentTag.name}</h1>
              <Typography
                type="copy2"
                className="w-full mt-5 text-copy-on-dark"
              >
                {currentTag.description}
              </Typography>
            </div>

            {/* tablet and mobile filters */}
            <div className="flex desktop:hidden">
              <div
                className={classNames(
                  searchBarBaseStyle,
                  'h-14 gap-2.5 px-3.5 box-border'
                )}
              >
                <HiMagnifyingGlass className="w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search Posts..."
                  value={searchQuery}
                  onChange={(ev) => setSearchQuery(ev.currentTarget.value)}
                  className={classNames(searchBarInputBaseStyle, 'text-xl')}
                />
              </div>
            </div>
            <div className="flex max-w-full gap-8 overflow-x-scroll desktop:hidden mt-[30px] scrollbar-hidden">
              {shownTags.map((tag) => (
                <TagTab
                  {...tag}
                  key={tag.slug}
                  current={currentTag.slug === tag.slug}
                />
              ))}
            </div>

            <div className="box-border flex flex-col items-center w-full max-w-[904px] gap-10 pt-10 border-0 border-t border-solid border-divider-on-dark">
              {featuredPosts.length > 0 && (
                <div className="w-full pb-6 border-0 border-b border-solid border-divider-on-dark">
                  <h5 className="text-copy-on-light">Featured Post</h5>
                  <div className="flex flex-col gap-6 mt-5">
                    {featuredPosts.map((post) => (
                      <>
                        <PostItem
                          post={post}
                          key={post.slug + 'featured desktop'}
                        />
                        <MobilePostItem
                          post={post}
                          key={post.slug + 'featured mobile'}
                        />
                      </>
                    ))}
                  </div>
                </div>
              )}
              {displayedPosts.map((post) => (
                <>
                  <PostItem post={post} key={post.slug + 'desktop'} />
                  <MobilePostItem post={post} key={post.slug + 'mobile'} />
                </>
              ))}
              {displayedPosts.length === 0 && (
                <Typography
                  type="copy2"
                  className="w-full max-w-[904px] text-center inline-block text-copy-on-light"
                >
                  No posts found
                </Typography>
              )}
              <div className="flex w-full gap-4 place-content-center">
                {page !== 1 && (
                  <Link
                    className="w-56 border border-solid bg-dark-background font-sans border-divider-on-dark text-copy-on-dark py-2.5 rounded-md text-center select-none hover:bg-divider-on-dark transition-colors active:transition-none active:bg-black/20 text-[18px] leading-[34px] cursor-pointer font-normal hover:text-copy-on-dark"
                    href={getTagUrl(currentTagSlug) + `?page=${page - 1 || 1}`}
                  >
                    Previous Page
                  </Link>
                )}
                {!isLastPage && (
                  <Link
                    className="w-56 border border-solid bg-dark-background font-sans border-divider-on-dark text-copy-on-dark py-2.5 rounded-md text-center select-none hover:bg-divider-on-dark transition-colors active:transition-none active:bg-black/20 text-[18px] leading-[34px] cursor-pointer font-normal hover:text-copy-on-dark"
                    href={getTagUrl(currentTagSlug) + `?page=${page + 1}`}
                  >
                    Next Page
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

function getDateAndReadingTime(publishedAt: string, readingMinutes: number) {
  const publishedDate = new Date(publishedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${publishedDate} • ${readingMinutes} min. read`;
}

const postItemStyle = classNames(
  'relative w-full gap-3 transition-colors border border-solid rounded-lg border-divider-on-dark p-7 hover:bg-divider-on-dark'
);

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div
      className={classNames(
        postItemStyle,
        post.featured
          ? 'border-highlight-yellow'
          : 'border-divider-on-dark p-7 hover:border-copy-on-light',
        'hidden mobile:block'
      )}
    >
      <Typography type="copy4" className="text-copy-on-dark">
        {getDateAndReadingTime(post.publishedAt, post.readingTime ?? 0)}
      </Typography>

      <Link href={`/blog/${post.slug}`}>
        <h5 className="mt-1">{post.title}</h5>
      </Link>
      <div className="mt-3">
        {post.author && <PostAuthor {...post.author} />}
      </div>
      <div className="flex gap-2.5 absolute right-7 bottom-7">
        {post.tags_relations?.map((tag) => (
          <PostTag {...tag} key={tag.slug} />
        ))}
      </div>
    </div>
  );
};

const MobilePostItem = ({ post }: { post: Post }) => {
  const tag: Tag | undefined =
    post.tags_relations[post.tags_relations.length - 1];

  return (
    <div
      className={classNames(
        postItemStyle,
        post.featured
          ? 'border-highlight-yellow'
          : 'border-divider-on-dark p-7 hover:border-copy-on-light',
        'mobile:hidden block'
      )}
    >
      {tag && <PostTag {...tag} />}
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mt-3">{post.title}</h3>
      </Link>
      <Typography type="copy4" className="mt-1 text-copy-on-dark">
        {getDateAndReadingTime(post.publishedAt, post.readingTime ?? 0)}
      </Typography>
      <div className="mt-6">
        {post.author && <PostAuthor {...post.author} hidePhoto />}
      </div>
    </div>
  );
};

export default Blog;
