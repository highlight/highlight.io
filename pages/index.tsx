import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { PrimaryButton } from '../components/common/Buttons/PrimaryButton';
import { SecondaryButton } from '../components/common/Buttons/SecondaryButton';
import Navbar from '../components/common/Navbar/Navbar';
import { Section } from '../components/common/Section/Section';
import styles from '../components/Home/Home.module.scss';

import BlueGradient from '../public/images/BgBlueGradient';
import PurpleGradient from '../public/images/BgPurpleGradient';
import CrossTeamCollaboration from '../public/images/CrossTeamCollaboration';
import ProductIllustration from '../public/images/ProductIllustration';
import ProductPlaceholder from '../public/images/ProductPlaceholder';
import ReactDemo from '../public/images/react_demo.png';
import Companies from '../public/images/Companies';
import Footer from '../components/common/Footer/Footer';
import { CallToAction } from '../components/common/CallToAction/CallToAction';

export const FeatureItem = ({
  children,
  ...props
}: React.PropsWithChildren<{}>) => {
  return (
    <div {...props} className={styles.featureItem}>
      {children}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Highlight</title>
        <meta name="description" content="Stop debugging in the dark. " />
        <link rel="icon" href="/favicon.ico" />
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
          <div className={styles.sectionText}>
            <h1>Stop debugging in the dark</h1>
            <p className={styles.bodySmall}>
              What if you could playback everything that led to an issue on your
              web app? Join hundreds of companies that use Highlight to keep
              their web app stable and their customers happy.
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
          <div className={styles.productIllustration}>
            <ProductIllustration />
          </div>
        </Section>
        <div className={styles.customerReel}>
          <div className={styles.sectionSubtitle}>
            Empowering Forward-Looking Companies
          </div>
          <Companies />
          <Companies />
        </div>
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

export default Home;
