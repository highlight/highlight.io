import styles from '../Blog.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../../common/Typography/Typography';

export interface Post {
  slug: string;
  description: string;
  image: {
    url: string;
  };
  title: string;
  publishedAt: string;
  publishedBy: {
    name: string;
    picture: string;
  };
  richcontent: {
    markdown: string;
  };
  tags: Array<string>;
}

export const BlogPost = ({
  slug,
  richcontent,
  image: { url },
  title,
  publishedAt,
  tags,
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
            <div className={styles.authorDiv}>
              <p>{`${new Date(publishedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'short',
              })} • ${Math.floor(
                richcontent.markdown.split(' ').length / 200
              )} min. read`}</p>
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
