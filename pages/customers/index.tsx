import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Customers/Customers.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { CUSTOMER_REVIEWS } from '../../components/Customers/Customers';
import { CustomerCard } from '../../components/Customers/CustomerCard/CustomerCard';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';

// Hides the page in production and renders it in dev. More info:
// https://linear.app/highlight/issue/HIG-2510/temporarily-update-customers-functionality
export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }

  return { props: {} };
};

const Customers: NextPage = () => {
  return (
    <>
      <Head>
        <title>Highlight: See Customer Stories And Case Studies.</title>
        <meta
          name="description"
          content="Highlight powers forward-thinking companies. Don't take our word for it. Learn straight from the people we help. Here's what our customers have to say:"
        />
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
            <h1>Customers</h1>
            <p className={homeStyles.bodyLarge}>
              {`From startups to enterprises, the most forward-thinking companies use Highlight. `}
            </p>
          </div>
        </Section>
        <Section>
          <div className={styles.reviewGrid}>
            {CUSTOMER_REVIEWS.map((r, i) => {
              return <CustomerCard {...r} key={i} />;
            })}
          </div>
        </Section>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Customers;
