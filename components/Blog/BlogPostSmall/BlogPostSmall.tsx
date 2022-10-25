import styles from '../Blog.module.scss';
import Image from "next/legacy/image";
import Link from 'next/link';
import { Post } from '../BlogPost/BlogPost';
import { Typography } from '../../common/Typography/Typography';

export const BlogPostSmall = ({
  slug,
  image,
  metaImage,
  title,
  publishedAt,
  tags,
  readingTime,
}: Post) => {
  return (
    <div className={styles.blogPostSmall}>
      <Link href={`/blog/${slug}`}>
        <a style={{ textDecoration: 'none' }}>
          <div className={styles.cardImage}>
            {(image?.url || metaImage?.url) && (
              <Image
                src={image?.url || metaImage?.url || ''}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          {readingTime ? (
            <div className={styles.postDateDiv}>
              <p>{`${new Date(publishedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'short',
              })} • ${readingTime} min. read`}</p>
            </div>
          ) : null}

          <Typography type="copy1" emphasis>
            {title}
          </Typography>
          <div className={styles.tagDiv}>
            {tags.map((tag: string) => (
              <Link key={tag} href={`/blog?tag=${tag}`} passHref={true}>
                <div>
                  <Typography type="copy3">{tag}</Typography>
                </div>
              </Link>
            ))}
          </div>
        </a>
      </Link>
    </div>
  );
};
