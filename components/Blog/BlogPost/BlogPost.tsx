import styles from '../Blog.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../../common/Typography/Typography';
import { Dispatch, SetStateAction } from 'react';

export interface Author {
  firstName: string;
  lastName: string;
  title: string;
  twitterLink: string;
  linkedInLink: string;
  githubLink: string;
  personalWebsiteLink: string;
  profilePhoto: { url: string };
}

export interface Post {
  slug: string;
  description: string;
  metaDescription?: string;
  image: {
    url: string;
  };
  title: string;
  metaTitle?: string;
  publishedAt: string;
  publishedBy: {
    name: string;
    picture: string;
  };
  richcontent: {
    markdown: string;
    raw: any;
  };
  tags: Array<string>;
  readingTime?: number;
  author?: Author;
}

export const BlogPost = ({
  slug,
  richcontent,
  image: { url },
  title,
  publishedAt,
  tags,
  readingTime,
}: Post) => {
  return (
    <Link href={`/blog/post/${slug}`}>
      <a style={{ textDecoration: 'none' }}>
        <div className={styles.blogPost}>
          <div className={styles.cardSection}>
            <div className={styles.cardImage}>
              <Image src={url} alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className={styles.cardSection}>
            <div className={styles.postDateDiv}>
              <p>{`${new Date(publishedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'short',
              })} • ${
                readingTime ||
                Math.floor(richcontent.markdown.split(' ').length / 200)
              } min. read`}</p>
            </div>
            <h3>{title}</h3>
            <div className={styles.tagDiv}>
              {tags.map((tag: string) => (
                <Link key={tag} href={`/blog?tag=${tag}`} passHref={true}>
                  <div>
                    <Typography type="copy3">{tag}</Typography>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
