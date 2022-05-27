import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Blog/Blog.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { OPEN_ROLES } from '../../components/Careers/careers';
import Link from 'next/link';

const Careers = () => {
  return (
    <>
      <Head>
        <title>Highlight Careers</title>
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
            <h1>Highlight is Hiring</h1>
            <p className={homeStyles.bodyLarge}>
              {`At Highlight, we're building a platform for debugging apps with extremely high precision, with the goal of helping teams better understand how their app behaves.`}
            </p>
          </div>
        </Section>
        <div className={styles.blogContainer}>
          {Object.values(OPEN_ROLES).map((role, i: number) => (
            <Link href={`/careers/${role.slug}`} key={i} passHref>
              <div>{role.title}</div>
            </Link>
          ))}
        </div>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Careers;
