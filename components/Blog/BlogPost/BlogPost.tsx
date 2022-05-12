import styles from '../Blog.module.scss';
import Image from 'next/image';
import Link from 'next/link';

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
  content: string;
}

export const BlogPost = ({
  slug,
  description,
  content,
  image: { url },
  title,
  publishedAt,
  publishedBy,
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
            <h2>{title}</h2>
            <p className={styles.bodyText}>{description}</p>
            <div className={styles.authorDiv}>
              <div
                className={styles.avatar}
                style={{ width: '36px', height: '36px', position: 'relative' }}
              >
                <Image src={publishedBy.picture} alt="" layout="fill" />
              </div>
              <div>
                <p className={styles.authorName}>{publishedBy.name}</p>
                <p>{`${new Date(publishedAt).toLocaleDateString(
                  'en-US'
                )} • ${Math.floor(
                  content.split(' ').length / 200
                )} min read`}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
