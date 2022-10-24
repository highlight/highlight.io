import { Author, Post } from '../../components/Blog/BlogPost/BlogPost';
import { Typography } from '../../components/common/Typography/Typography';
import Image from 'next/image';
import Navbar from '../../components/common/Navbar/Navbar';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Footer from '../../components/common/Footer/Footer';
import { ReactElement } from 'react';
import Link from 'next/link';
import { SearchIcon20, SearchIcon24 } from '../../components/Blog/Icons';
import classNames from 'classnames';
import { gql, GraphQLClient } from 'graphql-request';
import { GetStaticProps } from 'next';

const placeholderPost: Partial<
  Omit<Post, 'author'> & { author: Partial<Post['author']> }
> = {
  title: 'How we Animate Product Updates at Highlight',
  slug: 'animate-product-updates',
  publishedAt: '2022-09-18',
  readingTime: 4,
  author: {
    title: 'Designer, Advisor',
    firstName: 'Clint',
    lastName: 'Kadera',
    linkedInLink: 'https://linkedin.com',
    profilePhoto: { url: '/images/avatars/portal.jpg' },
  },
  tags: ['Improve workflow', 'Tips & Tricks'],
};

const placeholderPosts: typeof placeholderPost[] = new Array(4).fill(
  placeholderPost
);

export const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl2tzedef0o3p01yz7c7eetq8/master',
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }
);

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
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
        readingTime
        postedAt
      }
    }
  `;

  const data = (await graphcms.request(query)) as { posts: Post[] };

  return { props: { posts: data.posts } };
};

const Blog = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex mx-auto mt-32 max-w-fit">
          <div className="box-content flex-col hidden gap-6 border-0 border-r border-solid pr-14 w-72 border-divider-on-dark desktop:flex">
            {/* sidebar */}
            <div className="w-full px-2 h-[34px] border border-solid rounded-md text-copy-on-dark border-divider-on-dark items-center flex gap-1">
              <SearchIcon20 />
              <input
                type="text"
                placeholder="Search Posts..."
                className="box-border flex-1 w-1 font-sans text-sm leading-none bg-transparent border-none text-copy-on-dark"
              />
            </div>
            <div className="flex flex-col gap-2">
              <SidebarItem label="All posts" icon={<SearchIcon20 />} />
              <SidebarItem
                label="Frontend Monitoring"
                icon={<SearchIcon20 />}
              />
              <SidebarItem label="Observability" icon={<SearchIcon20 />} />
              <SidebarItem
                label="Highlight Engineering"
                icon={<SearchIcon20 />}
              />
            </div>
          </div>
          <div className="w-full max-w-4xl pb-32 ">
            <div className="flex flex-col w-full mb-[30px] desktop:mb-10 desktop:ml-11 px-12 desktop:px-0">
              <Typography type="outline" className="mb-2 text-highlight-yellow">
                The Highlight Blog
              </Typography>

              <h3 className="hidden mobile:inline">All posts</h3>
              <h1 className="inline mobile:hidden">All posts</h1>
              <Typography type="copy2" className="mt-5 text-copy-on-dark">
                Welcome to the Highlight Blog, where the Highlight team talks
                about frontend engineering, observability and more!
              </Typography>
            </div>

            {/* tablet and mobile filters */}
            <div className="px-12">
              <div className="flex desktop:hidden items-center w-full gap-2.5 px-3.5 border border-solid rounded-md h-14 text-copy-on-dark border-divider-on-dark box-border">
                <SearchIcon24 />
                <input
                  type="text"
                  placeholder="Search Posts..."
                  className="box-border flex-1 w-1 font-sans text-xl leading-none bg-transparent border-none text-copy-on-dark"
                />
              </div>
            </div>
            <div
              className="flex max-w-full gap-8 px-12 overflow-x-scroll desktop:hidden mt-[30px] scrollbar-hidden" /* */
            >
              <TabItem label="All" icon={<SearchIcon20 />} active />
              <TabItem label="Frontend Monitoring" icon={<SearchIcon20 />} />
              <TabItem label="Observability" icon={<SearchIcon20 />} />
              <TabItem label="Highlight Engineering" icon={<SearchIcon20 />} />
            </div>

            <div className="box-border flex flex-col items-center w-full gap-10 px-12 pt-10 border-0 border-t border-solid border-divider-on-dark desktop:pl-11">
              {posts.map((post) => (
                <>
                  <PostItem post={post} key={post.slug} />
                  <MobilePostItem post={post} key={post.slug} />
                </>
              ))}
              <button className="w-56 border border-solid bg-dark-background font-sans border-divider-on-dark text-copy-on-dark py-2.5 rounded-md text-center select-none hover:bg-divider-on-dark transition-colors active:transition-none active:bg-black/20 text-[18px] leading-[34px] cursor-pointer">
                Load More
              </button>
            </div>
          </div>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

const SidebarItem = ({
  label,
  icon,
}: {
  label: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex gap-[3px] items-center text-copy-on-dark opacity-70 h-[30px] select-none cursor-pointer hover:opacity-100 transition-opacity active:opacity-50 active:transition-none ">
      {icon} <Typography type="copy3">{label}</Typography>
    </div>
  );
};

const TabItem = ({
  label,
  icon,
  active,
}: {
  label: string;
  icon: ReactElement;
  active?: boolean;
}) => {
  const activeStyle = classNames(
    'border-b-2 border-0 border-solid border-highlight-yellow text-highlight-yellow '
  );

  return (
    <div
      className={classNames(
        'flex gap-2 flex-0 items-center text-copy-on-dark h-[30px] select-none box-content cursor-pointer hover:opacity-100 transition-opacity active:opacity-50 active:transition-none leading-none px-1 pb-2 group',
        active && activeStyle
      )}
    >
      <span
        className={classNames(
          active
            ? 'text-highlight-yellow'
            : 'opacity-70 group-hover:opacity-100 transition-opacity',
          'mt-1'
        )}
      >
        {icon}
      </span>
      {
        <Typography type="copy2" className="w-max" emphasis={active}>
          {label}
        </Typography>
      }
    </div>
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
  'relative w-full gap-3 transition-colors border border-solid rounded-lg cursor-pointer border-divider-on-dark p-7 hover:border-copy-on-light active:bg-black/40 active:transition-none'
);

const PostItem = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={classNames(postItemStyle, 'hidden mobile:block')}>
        <Typography type="copy4" className="text-copy-on-dark">
          {getDateAndReadingTime(post.publishedAt, post.readingTime ?? 0)}
        </Typography>

        <h5 className="mt-1">{post.title}</h5>
        <div className="mt-3">{post.author && <Author {...post.author} />}</div>
        <div className="flex gap-2.5 absolute right-7 bottom-7">
          {post.tags?.map((tag, i) => (
            <PostTag tag={tag} key={i} />
          ))}
        </div>
      </div>
    </Link>
  );
};

const MobilePostItem = ({ post }: { post: Post }) => {
  const tag: string | undefined = post.tags[post.tags.length - 1];

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={classNames(postItemStyle, 'mobile:hidden block')}>
        {tag && <PostTag tag={tag} />}
        <h3 className="mt-3">{post.title}</h3>
        <Typography type="copy4" className="mt-1 text-copy-on-dark">
          {getDateAndReadingTime(post.publishedAt, post.readingTime ?? 0)}
        </Typography>
        <div className="mt-6">
          {post.author && <Author {...post.author} hidePhoto />}
        </div>
      </div>
    </Link>
  );
};

function PostTag({ tag }: { tag: string }) {
  return (
    <div /* should be button, placeholder */
      className="rounded-full bg-divider-on-dark w-fit px-3 py-0.5 select-none cursor-pointer"
    >
      <Typography type="copy4">{tag}</Typography>
    </div>
  );
}

function Author({
  profilePhoto,
  firstName,
  lastName,
  title,
  hidePhoto,
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
        <Typography type="copy3" emphasis>
          {firstName} {lastName}
        </Typography>

        <Typography type="copy4" className="text-copy-on-dark">
          {title}
        </Typography>
      </div>
    </div>
  );
}

export default Blog;
