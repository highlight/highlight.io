import { Author, Post } from '../../components/Blog/BlogPost/BlogPost';
import { Typography } from '../../components/common/Typography/Typography';
import Image from 'next/legacy/image'; // TODO(fabio) use next 13's Image
import Navbar from '../../components/common/Navbar/Navbar';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Footer from '../../components/common/Footer/Footer';
import { ReactElement, useState } from 'react';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import { HiGlobeAlt } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { PostTag, SidebarTag, Tag, TagTab } from '../../components/Blog/Tag';
import { GraphQLRequest } from '../../utils/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';

export const getStaticProps: GetStaticProps = async () => {
  const postsQuery = gql`
    query GetPosts() {
      posts(
        orderBy: postedAt_DESC
        where: { unlisted: false }
      ) {
        slug
        title
        metaTitle
        description
        metaDescription
        publishedAt
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
        tags
        tags_relations {
          name
          slug
        }
        readingTime
        postedAt
      }
    }
  `;

  const postsData = (await GraphQLRequest(postsQuery)) as { posts: Post[] };

  const tagsQuery = gql`
    query GetTags() {
      tags {
        name
        description
        slug
      }
    }
  `;

  const tags = (await GraphQLRequest(tagsQuery)).tags as Tag[];

  return {
    props: {
      posts: postsData.posts,
      tags,
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

const Blog = ({
  posts,
  tags,
}: {
  posts: Post[];
  tags: Omit<Tag, 'posts'>[];
}) => {
  const router = useRouter();
  const { tag } = router.query;
  const tagSlug = Array.isArray(tag) ? tag[0] : tag;
  const shownTags = [allTag, ...tags];
  const currentTag: Omit<Tag, 'posts'> =
    tags.find(({ slug }) => slug === tagSlug) ?? allTag;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 4;

  const filteredPosts = matchSorter(posts, searchQuery, {
    keys: [
      { key: 'tags_relations.name', maxRanking: matchSorter.rankings.CONTAINS },
      'title',
    ],
  });
  const paginatedPosts = filteredPosts.slice(0, itemsPerPage * page);
  const allPostsLoaded = paginatedPosts.length >= filteredPosts.length;

  return (
    <>
      <Navbar />
      <main>
        <div className="flex items-start mx-auto mt-[29px] mb-36 gap-3.5 max-w-fit">
          <div className="flex-col hidden gap-6 border border-solid rounded-lg border-divider-on-dark  px-9 py-7 w-[352px] desktop:flex sticky top-36">
            {/* sidebar */}
            <div
              className={classNames(searchBarBaseStyle, 'px-2 h-[34px] gap-1')}
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
            <div className="flex flex-col gap-2">
              {shownTags.map((tag) => (
                <SidebarTag
                  {...tag}
                  key={tag.slug}
                  current={currentTag.slug === tag.slug}
                />
              ))}
            </div>
          </div>
          <div className="w-full max-w-4xl px-[42px]">
            <div className="flex flex-col w-full mb-[30px] desktop:mb-10">
              <Typography type="outline" className="mb-2 text-highlight-yellow">
                The Highlight Blog
              </Typography>

              <h3 className="hidden mobile:inline">{currentTag.name}</h3>
              <h1 className="inline mobile:hidden">{currentTag.name}</h1>
              <Typography type="copy2" className="mt-5 text-copy-on-dark">
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

            <div className="box-border flex flex-col items-center w-full gap-10 pt-10 border-0 border-t border-solid border-divider-on-dark">
              {paginatedPosts.map((post) => (
                <>
                  <PostItem post={post} key={post.slug + 'desktop'} />
                  <MobilePostItem post={post} key={post.slug + 'mobile'} />
                </>
              ))}
              {!allPostsLoaded && (
                <button
                  className="w-56 border border-solid bg-dark-background font-sans border-divider-on-dark text-copy-on-dark py-2.5 rounded-md text-center select-none hover:bg-divider-on-dark transition-colors active:transition-none active:bg-black/20 text-[18px] leading-[34px] cursor-pointer"
                  onClick={() => setPage(page + 1)}
                >
                  Load More
                </button>
              )}
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
  'relative w-full gap-3 transition-colors border border-solid rounded-lg border-divider-on-dark p-7 hover:border-copy-on-light hover:bg-divider-on-dark'
);

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className={classNames(postItemStyle, 'hidden mobile:block')}>
      <Typography type="copy4" className="text-copy-on-dark">
        {getDateAndReadingTime(post.publishedAt, post.readingTime ?? 0)}
      </Typography>

      <Link href={`/blog/${post.slug}`}>
        <h5 className="mt-1">{post.title}</h5>
      </Link>
      <div className="mt-3">{post.author && <Author {...post.author} />}</div>
      <div className="flex gap-2.5 absolute right-7 bottom-7">
        {post.tags_relations?.map((tag) => (
          <PostTag {...tag} key={tag.slug} />
        ))}
      </div>
    </div>
  );
};

const MobilePostItem = ({ post }: { post: Post }) => {
  const tag: Tag | undefined = post.tags_relations[post.tags.length - 1];

  return (
    <div className={classNames(postItemStyle, 'mobile:hidden block')}>
      {tag && <PostTag {...tag} />}
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mt-3">{post.title}</h3>
      </Link>
      <Typography type="copy4" className="mt-1 text-copy-on-dark">
        {getDateAndReadingTime(post.publishedAt, post.readingTime ?? 0)}
      </Typography>
      <div className="mt-6">
        {post.author && <Author {...post.author} hidePhoto />}
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: ReactElement }) => (
  <a
    href={href}
    className="transition-colors text-copy-on-dark"
    target={'_blank'}
    rel="noreferrer"
  >
    {icon}
  </a>
);

function Author({
  profilePhoto,
  firstName,
  lastName,
  title,
  hidePhoto,
  personalWebsiteLink,
  twitterLink,
  githubLink,
  linkedInLink,
}: Author & { hidePhoto?: boolean }) {
  return (
    <div className="flex gap-3">
      {!hidePhoto && (
        <div className="overflow-hidden rounded-full w-12 h-12 border-solid border-[3px] border-divider-on-dark relative">
          <Image
            src={profilePhoto.url ?? ''}
            layout="fill"
            alt="author picture"
            objectFit="cover"
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Typography type="copy3" emphasis>
            {firstName} {lastName}
          </Typography>
          <div className="flex flex-wrap gap-2 mt-1">
            {personalWebsiteLink && (
              <SocialLink href={personalWebsiteLink} icon={<HiGlobeAlt />} />
            )}
            {twitterLink && (
              <SocialLink href={twitterLink} icon={<FaTwitter />} />
            )}
            {githubLink && <SocialLink href={githubLink} icon={<FaGithub />} />}
            {linkedInLink && (
              <SocialLink href={linkedInLink} icon={<FaLinkedin />} />
            )}
          </div>
        </div>

        <Typography type="copy4" className="text-copy-on-dark">
          {title}
        </Typography>
      </div>
    </div>
  );
}

export default Blog;
