import styles from '../Blog.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../../common/Typography/Typography';
import { Post } from '../BlogPost/BlogPost';
import classNames from 'classnames';

export const SuggestedBlogPost = ({
  slug,
  richcontent,
  image,
  metaImage,
  title,
  publishedAt,
  tags,
  readingTime,
}: Post) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a style={{ textDecoration: 'none' }}>
        <div className={classNames(styles.blogPost, styles.suggestedBlogPost)}>
          <div className={styles.cardSection}>
            <div className={styles.cardImage}>
              <Image
                src={image?.url || metaImage?.url || ''}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.cardSection}>
            <div className={styles.postDateDiv}>
              <Typography type="copy2">
                <p>{`${new Date(publishedAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'short',
                })} • ${
                  readingTime ||
                  Math.floor(richcontent.markdown.split(' ').length / 200)
                } min. read`}</p>
              </Typography>
            </div>
            <div className={styles.suggestedPostTitle}>
              <Typography type="copy1" emphasis>
                {title}
              </Typography>
            </div>
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
