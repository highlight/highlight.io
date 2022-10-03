import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { PrimaryLink } from '../../components/common/Buttons/SecondaryButton';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import classNames from 'classnames';
import styles from '../../components/Home/Home.module.scss';
import commentStyles from '../../components/Comments/Comments.module.scss';

import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import Footer from '../../components/common/Footer/Footer';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';
import { Meta } from '../../components/common/Head/Meta';

const Comments: NextPage = () => {
  return (
    <div>
      <Meta
        title={'Comments - Highlight'}
        description={'Comments by Highlight'}
      />
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
              <p className={styles.bodyLarge}>
                Now, in addition to session replay and monitoring, you can have
                free flowing conversations related to issues to ensure that your
                whole team is on the same page. Give Highlight a try and stay in
                the loop!
              </p>
              <div className={styles.buttonContainer}>
                <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                  Get Started For Free
                </PrimaryButton>
                <PrimaryLink href="https://calendly.com/jaykhatri/highlight-demo-call">
                  Request A Demo
                </PrimaryLink>
              </div>
            </div>
          </div>
        </Section>
        <div className={commentStyles.video}>
          <video autoPlay controls muted loop>
            <source src="/images/replies.mp4" type="video/mp4" />
          </video>
        </div>
        <CompaniesReel />
        <FooterCallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Comments;
