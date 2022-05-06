import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Blog/Blog.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { BlogPost } from '../../components/Blog/BlogPost/BlogPost';

const Customers: NextPage = () => {
  return (
    <>
      <Head>
        <title>Highlight Blog</title>
        <meta name="description" content="Stop debugging in the dark. " />
      </Head>
      <div className={homeStyles.bgPosition}>
        <div className={homeStyles.purpleDiv}>
          <Image src={PurpleGradient} alt="" />
        </div>
        <div className={homeStyles.blueDiv}>
          <Image src={BlueGradient} alt="" />
        </div>
      </div>
      <Navbar />
      <main>
        <Section>
          <div className={homeStyles.anchorTitle}>
            <h1>Highlight Blog</h1>
            <p className={homeStyles.bodyLarge}>
              {`Welcome to the Highlight Blog 👋`}
            </p>
          </div>
        </Section>
        <div className={styles.blogContainer}>
          <BlogPost />
          <BlogPost />
          <BlogPost />
          <BlogPost />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Customers;
