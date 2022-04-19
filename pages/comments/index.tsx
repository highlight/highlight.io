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

import BlueGradient from '../../public/images/BgBlueGradient';
import PurpleGradient from '../../public/images/BgPurpleGradient';
import Footer from '../../components/common/Footer/Footer';
import Companies from '../../public/images/Companies';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import ProductPlaceholder from '../../public/images/ProductPlaceholder';
import CrossTeamCollaboration from '../../public/images/CrossTeamCollaboration';
import { FeatureItem } from '..';
import ReactDemo from '../../public/images/react_demo.png';

const Comments: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Comments - Highlight</title>
        <meta name="description" content="Stop debugging in the dark. " />
      </Head>

      <div className={styles.bgPosition}>
        <div className={styles.purpleDiv}>
          <PurpleGradient />
        </div>
        <div className={styles.blueDiv}>
          <BlueGradient />
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
        <div className={styles.customerReel}>
          <div className={styles.sectionSubtitle}>
            Empowering Forward-Looking Companies
          </div>
          <Companies />
          <Companies />
        </div>
        <Section>
          <div className={styles.anchorTitle}>
            <h2>Wanna learn more about Highlight?</h2>
            <p className={classNames(styles.bodyLarge, styles.anchorSmall)}>
              {`Scroll down to learn more about Highlight's feature set and value prop!`}
            </p>
          </div>
        </Section>
        <Section>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>Product Feature</div>
            <h2>{`A few lines of code and you're gold`}</h2>
            <p className={styles.bodySmall}>
              Highlight is built to be framework agnostic, so regardless of your
              stack, we have a solution{` that'll work for your team.`}
            </p>
            <div className={styles.buttonContainer}>
              <SecondaryButton href="https://docs.highlight.run/getting-started">
                Read The Docs →
              </SecondaryButton>
            </div>
          </div>
          <div className={styles.sectionImage}>
            <Image src={ReactDemo} alt="" width={1215} height={746} />
          </div>
        </Section>
        <Section>
          <div className={styles.sectionImage}>
            <CrossTeamCollaboration />
          </div>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>Product Feature</div>
            <h2>{`Cross-team collaboration`}</h2>
            <p className={styles.bodySmall}>
              Stakeholders on customer issues can change. Highlight makes
              cross-team communication painless.
            </p>
            <div className={styles.buttonContainer}>
              <SecondaryButton href="https://docs.highlight.run/comments">
                Read The Docs →
              </SecondaryButton>
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>Product Feature</div>
            <h2>Access dense developer tooling</h2>
            <p className={styles.bodySmall}>
              Highlight is built to be framework agnostic, so regardless of your
              stack, we have a solution{` that'll work for your team.`}
            </p>
            <div className={styles.buttonContainer}>
              <SecondaryButton href="https://docs.highlight.run/">
                Read The Docs →
              </SecondaryButton>
            </div>
          </div>
          <div className={styles.sectionImage}>
            <ProductPlaceholder />
          </div>
        </Section>
        <Section>
          <div className={styles.sectionImage}>
            <ProductPlaceholder />
          </div>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>Product Feature</div>
            <h2>{`Learn from your users' interactions`}</h2>
            <p className={styles.bodySmall}>
              Stakeholders on customer issues can change. Highlight makes
              cross-team communication painless.
            </p>
            <div className={styles.buttonContainer}>
              <SecondaryButton href="https://docs.highlight.run/">
                Read The Docs →
              </SecondaryButton>
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.anchorTitle}>
            <div className={styles.sectionSubtitle}>Product Feature</div>
            <h2>
              Highlight is built with privacy and security at the forefront
            </h2>
          </div>
        </Section>
        <Section>
          <div className={styles.sectionImage}>
            <ProductPlaceholder />
          </div>
          <div className={styles.sectionText}>
            <FeatureItem>
              <h3>Privacy-Forward API</h3>
              <p className={styles.bodySmall}>
                Highlight supports data redaction, obfuscation, masking and much
                more. The library also supports a Strict Privacy Mode which
                obfuscates all text nodes for very strict PII rules.
              </p>
            </FeatureItem>
            <FeatureItem>
              <h3>Self-Hosted Deployment</h3>
              <p className={styles.bodySmall}>
                Deploy Highlight in a cloud provider of your choice. We support
                {` "one-click" `} deployments on a select set of cloud providers
                as well as a docker image for custom deployments.
              </p>
            </FeatureItem>
          </div>
        </Section>
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Comments;
