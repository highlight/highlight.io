import Image from 'next/image';
import Head from 'next/head';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Blog/Blog.module.scss';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { gql } from 'graphql-request';
import { graphcms } from '.';
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import Link from 'next/link';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { CodeBlock } from 'react-code-blocks';
import { Typography } from '../../components/common/Typography/Typography';
import {
  createElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import BlogNavbar from '../../components/Blog/BlogNavbar/BlogNavbar';
import { SimpleCallToAction } from '../../components/common/CallToAction/SimpleCallToAction';
import { SuggestedBlogPost } from '../../components/Blog/SuggestedBlogPost/SuggestedBlogPost';
import { ElementNode } from '@graphcms/rich-text-types';
import highlightCodeTheme from '../../components/common/CodeBlock/highlight-code-theme';
import { Post } from '../../components/Blog/BlogPost/BlogPost';
import Dribble from '../../public/images/logo-dribbble.svg';
import LinkedIn from '../../public/images/logo-linkedin.svg';

const NUM_SUGGESTED_POSTS = 3;

const getBlogTypographyRenderer = (type: string) => {
  function ParagraphHeader({ children }: { children: any }) {
    return (
      <div className={styles.postHeader}>
        {createElement(
          type,
          {
            className: styles.postHeaderText,
          },
          children?.props?.content[0].text
        )}
      </div>
    );
  }
  return ParagraphHeader;
};

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
        metaTitle
        image {
          url
        }
        description
        metaDescription
        publishedAt
        publishedBy {
          name
          picture
        }
        richcontent {
          raw
          markdown
        }
        tags
        readingTime
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
      }
    }
  `;
  const POSTS_QUERY = gql`
    query GetPosts() {
      posts(orderBy: publishedAt_DESC) {
        slug
        title
        image {
          url
        }
        richcontent {
          markdown
        }
        publishedAt
        tags
        readingTime
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

  const otherPosts = posts.filter((post: any) => post.slug !== slug);
  const suggestedPosts = [];
  // suggest N random posts that are not the current post
  for (let i = 0; i < Math.min(NUM_SUGGESTED_POSTS, posts.length - 1); i++) {
    suggestedPosts.push(
      otherPosts.splice(Math.floor(Math.random() * otherPosts.length), 1)[0]
    );
  }
  return {
    props: {
      suggestedPosts,
      post: data.post,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

interface PostSection {
  nodes: ElementNode[];
  footer: ReactElement | null;
}

// update here to support other tags
enum SectionType {
  CallToAction = '{{CALL_TO_ACTION}}',
}

const PostSection = ({ p }: { p: PostSection; idx: number }) => {
  return (
    <>
      <RichText
        content={{
          children: p.nodes,
        }}
        renderers={{
          code_block: ({ children }: { children: any }) => {
            return (
              <div className={styles.codeBlock}>
                <CodeBlock
                  language={'js'}
                  text={children?.props?.content[0].text}
                  showLineNumbers={false}
                  theme={highlightCodeTheme}
                />
              </div>
            );
          },
          h1: getBlogTypographyRenderer('h1'),
          h2: getBlogTypographyRenderer('h2'),
          h3: getBlogTypographyRenderer('h3'),
          h4: getBlogTypographyRenderer('h4'),
          h5: getBlogTypographyRenderer('h5'),
          h6: getBlogTypographyRenderer('h6'),
        }}
      />
      {p.footer}
    </>
  );
};

const PostPage = ({
  post,
  suggestedPosts,
}: {
  post: Post;
  suggestedPosts: any[];
}) => {
  const blogBody = useRef<HTMLDivElement>(null);
  const [endPosition, setEndPosition] = useState(0);
  const [postRaw, setPostRaw] = useState<ElementNode[]>(
    post.richcontent.raw.children
  );
  const [postSections, setPostSections] = useState<PostSection[]>();

  useEffect(() => {
    setEndPosition(blogBody.current?.offsetHeight || 0);
    // recalculate end position when blog sections are processed
    // because at that point the page height is finalized
  }, [postSections]);

  useEffect(() => {
    setPostRaw(post.richcontent.raw.children);
  }, [setPostRaw, post]);

  useEffect(() => {
    const processed: PostSection[] = [];
    let currentBlock: ElementNode[] = [];
    for (const r of postRaw) {
      let specialType: SectionType | undefined = undefined;
      for (const child of r.children) {
        // update here to support other tags
        if (child.text === SectionType.CallToAction) {
          specialType = SectionType.CallToAction;
          break;
        }
      }
      switch (specialType) {
        // update here to support other tags
        case SectionType.CallToAction:
          processed.push({
            nodes: currentBlock,
            footer: <SimpleCallToAction />,
          });
          currentBlock = [];
          break;
        default:
          currentBlock.push(r);
      }
    }
    if (currentBlock.length) {
      processed.push({
        nodes: currentBlock,
        footer: null,
      });
    }
    setPostSections(processed);
  }, [postRaw]);

  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title}</title>
        <meta
          name="description"
          content={post.metaDescription || post.description}
        />

        <meta property="og:image" content={post.image.url} key="ogimage" />
        <meta property="og:title" content={post.metaTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={post.metaDescription}
          key="ogdesc"
        />
      </Head>
      <BlogNavbar title={post.title} endPosition={endPosition} />
      <main ref={blogBody} className={styles.mainBlogPadding}>
        <Section>
          <div className={homeStyles.anchorTitle}>
            <Typography type="copy2">
              <p className={styles.dateDiv}>{`${new Date(
                post.publishedAt
              ).toLocaleDateString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'short',
              })} • ${
                post.readingTime ||
                Math.floor(post.richcontent.markdown.split(' ').length / 200)
              } min read`}</p>
            </Typography>
            <h2>{post.title}</h2>
            <div className={classNames(styles.tagDiv, styles.postTagDiv)}>
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/blog?tag=${tag}`} passHref={true}>
                  <div>{tag}</div>
                </Link>
              ))}
            </div>
            <div className={styles.authorDiv}>
              <div
                className={styles.avatar}
                style={{ width: '50px', height: '50px', position: 'relative' }}
              >
                <Image
                  src={
                    post.author?.profilePhoto.url || post.publishedBy.picture
                  }
                  alt=""
                  layout="fill"
                />
              </div>
              {post.author && (
                <div className={styles.authorDescription}>
                  <Typography type="copy2" emphasis>
                    <div className={styles.authorDetails}>
                      <span>
                        {post.author.firstName} {post.author.lastName}
                      </span>
                      {post.author.githubLink && (
                        <a href={post.author.githubLink}>
                          <Image src={Dribble} alt={'github icon'} />
                        </a>
                      )}
                      {post.author.linkedInLink && (
                        <a href={post.author.linkedInLink}>
                          <Image src={LinkedIn} alt={'linkedin icon'} />
                        </a>
                      )}
                    </div>
                  </Typography>
                  <Typography type="copy3">{post.author.title}</Typography>
                </div>
              )}
            </div>
          </div>
        </Section>
        <Section className={styles.headerSection}>
          <div className={classNames(styles.mainImage, homeStyles.anchorTitle)}>
            <Image
              src={post.image.url}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Section>
        <Section className={styles.headerSection}>
          <div
            className={classNames(
              homeStyles.anchorTitle,
              styles.postBody,
              styles.postBodyTop
            )}
          >
            {postSections?.map((p, idx) => (
              <PostSection key={idx} idx={idx} p={p} />
            ))}
          </div>
        </Section>
        <Section>
          <div className={styles.postBodyDivider}></div>
        </Section>
        <Section>
          <div className={classNames(homeStyles.anchorTitle, styles.postBody)}>
            <h3 className={styles.otherArticlesHeader}>
              Other articles you may like
            </h3>
            {suggestedPosts.map((p, i) => (
              <SuggestedBlogPost {...p} key={i} />
            ))}
          </div>
        </Section>
      </main>
      <CallToAction />
      <Footer />
    </>
  );
};

export default PostPage;
