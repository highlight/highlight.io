import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/common/Buttons/SecondaryButton';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import classNames from 'classnames';
import styles from '../../components/Home/Home.module.scss';
import commentStyles from '../../components/Comments/Comments.module.scss';

import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import Footer from '../../components/common/Footer/Footer';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';

const Comments: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Comments - Highlight</title>
        <meta name="description" content="Stop debugging in the dark. " />
      </Head>
      <div className={styles.bgPosition}>
        <div className={styles.purpleDiv}>
          <Image src={PurpleGradient} alt="" />
        </div>
        <div className={styles.blueDiv}>
          <Image src={BlueGradient} alt="" />
        </div>
      </div>
      <Navbar />
      <main>
        <Section>
          <div className={styles.anchorTitle}>
            <div
              className={classNames(
                styles.sectionText,
                commentStyles.commentDiv
              )}
            >
              <h1>Introducing: Comments by Highlight</h1>
              <p className={styles.bodySmall}>
                What if you could playback everything that led to an issue on
                your web app? Join hundreds of companies that use Highlight to
                keep their web app stable and their customers happy.
              </p>
              <div className={styles.buttonContainer}>
                <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                  Get Started For Free
                </PrimaryButton>
                <SecondaryButton href="https://calendly.com/jaykhatri/highlight-demo-call">
                  Request A Demo
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Section>
        <div className={commentStyles.video}>
          <video autoPlay controls muted loop>
            <source src="/images/comments.mp4" type="video/mp4" />
          </video>
        </div>
        <CompaniesReel />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Comments;
