import Image from 'next/image';
import Head from 'next/head';
import homeStyles from '../../../components/Home/Home.module.scss';
import styles from '../../../components/Blog/Blog.module.scss';
import { Section } from '../../../components/common/Section/Section';
import Footer from '../../../components/common/Footer/Footer';
import { gql } from 'graphql-request';
import { graphcms } from '..';
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { CallToAction } from '../../../components/common/CallToAction/CallToAction';
import Link from 'next/link';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { CodeBlock } from 'react-code-blocks';
import { Typography } from '../../../components/common/Typography/Typography';
import { ReactElement, useEffect, useRef, useState } from 'react';
import BlogNavbar from '../../../components/Blog/BlogNavbar/BlogNavbar';
import { SimpleCallToAction } from '../../../components/common/CallToAction/SimpleCallToAction';
import { SuggestedBlogPost } from '../../../components/Blog/SuggestedBlogPost/SuggestedBlogPost';
import { ElementNode } from '@graphcms/rich-text-types';
import highlightCodeTheme from '../../../components/common/CodeBlock/highlight-code-theme';

const blogTypographyRenderer = ({ children }: { children: any }) => {
  return (
    <div className={styles.postHeader}>
      <h5>{children?.props?.content[0].text}</h5>
    </div>
  );
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
        image {
          url
        }
        description
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
      suggestedPosts: posts.slice(
        currentPostIndex + 1,
        Math.min(currentPostIndex + 4, posts.length - 1)
      ),
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

const PostPage = ({
  post,
  suggestedPosts,
}: {
  post: any;
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
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
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
              })} • ${Math.floor(
                post.richcontent.markdown.split(' ').length / 200
              )} min read`}</p>
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
                <Image src={post.publishedBy.picture} alt="" layout="fill" />
              </div>
              <div>
                <Typography type="copy2" emphasis>
                  {post.publishedBy.name}
                </Typography>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className={classNames(styles.mainImage, homeStyles.anchorTitle)}>
            <Image
              src={post.image.url}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Section>
        <Section>
          <div className={classNames(homeStyles.anchorTitle, styles.postBody)}>
            {postSections?.map((p) => (
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
                    h1: blogTypographyRenderer,
                    h2: blogTypographyRenderer,
                    h3: blogTypographyRenderer,
                  }}
                />
                {p.footer}
              </>
            ))}
          </div>
        </Section>
        <Section>
          <div className={styles.postBodyDivider}></div>
        </Section>
        <Section>
          <div className={classNames(homeStyles.anchorTitle, styles.postBody)}>
            <h3>Other articles you may like</h3>
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
