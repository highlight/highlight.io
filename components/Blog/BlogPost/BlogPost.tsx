import styles from '../Blog.module.scss';
import Image from 'next/image';
import Avatar from '../../../public/images/jane.jpg';
import BigImage from '../../../public/images/product_placeholder.svg';

export const BlogPost = () => {
  return (
    <div className={styles.blogPost}>
      <div className={styles.cardSection}>
        <div className={styles.cardImage}>
          <Image src={BigImage} alt="" />
        </div>
      </div>
      <div className={styles.cardSection}>
        <h2>Post Title</h2>
        <p className={styles.bodyText}>Lorem ipsum dolor sin amet</p>
        <div className={styles.authorDiv}>
          <div
            className={styles.avatar}
            style={{ width: '36px', height: '36px' }}
          >
            <Image src={Avatar} alt="" />
          </div>
          <p>John Smith</p>
        </div>
      </div>
    </div>
  );
};
