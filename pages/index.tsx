import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { PrimaryButton } from '../components/common/Buttons/PrimaryButton';
import { SecondaryButton } from '../components/common/Buttons/SecondaryButton';
import Navbar from '../components/common/Navbar/Navbar';
import { Section } from '../components/common/Section/Section';
import styles from '../components/Home/Home.module.scss';

import DarkPlaceholder from '../public/images/dark.png';
import ReactImage from '../public/images/react.png';
import Footer from '../components/common/Footer/Footer';
import { CallToAction } from '../components/common/CallToAction/CallToAction';
import { CompaniesReel } from '../components/Home/CompaniesReel/CompaniesReel';
import classNames from 'classnames';
import { Review, REVIEWS } from '../components/Home/Reviews';
import { SnippetTab } from '../components/Home/SnippetTab/SnippetTab';

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

export const CustomerReview = ({ companyLogo, text, author }: Review) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.companyLogo}>
        <Image
          src={companyLogo}
          alt={author.name}
          layout={'fill'}
          objectFit={'contain'}
        />
      </div>
      <p>{text}</p>
      <div className={styles.author}>
        <div className={styles.authorImage}>
          <Image src={author.image} alt={author.name} />
        </div>
        <div>
          <b>{author.name}</b>
          {`, ${author.role}`}
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const SNIPPET_TABS = [
    {
      image: ReactImage,
      key: 'react',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>effortless setup</div>
            <h2>{`Start using Highlight in minutes`}</h2>
            <p className={styles.bodySmall}>
              {`Installing Highlight is a matter of selecting your frontend framework and adding three lines of code to your app. Highlight is built to be framework agnostic, so regardless of your stack, we have a solution that'll work for your team. You'll be off to the races in a matter of minutes!`}
            </p>
            <div className={styles.buttonContainer}>
              <SecondaryButton href="https://docs.highlight.run/getting-started">
                Read more about our backend integrations in beta
              </SecondaryButton>
            </div>
          </div>
        </Section>
      ),
    },
    {
      image: ReactImage,
      key: 'node',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>effortless setup</div>
            <h2>{`Start using Highlight in minutes`}</h2>
            <p className={styles.bodySmall}>
              {`Installing Highlight is a matter of selecting your frontend framework and adding three lines of code to your app. Highlight is built to be framework agnostic, so regardless of your stack, we have a solution that'll work for your team. You'll be off to the races in a matter of minutes!`}
            </p>
            <div className={styles.buttonContainer}>
              <SecondaryButton href="https://docs.highlight.run/getting-started">
                Read The Docs
              </SecondaryButton>
            </div>
          </div>
        </Section>
      ),
    },
  ];
  return (
    <div>
      <Head>
        <title>Highlight</title>
        <meta name="description" content="Stop debugging in the dark. " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <div className={styles.sectionSubtitle}>
                Stop debugging in the dark
              </div>
              <h1>{`Because a stack trace alone isn't enough`}</h1>
              <p className={styles.bodyLarge}>
                Stop wasting effort trying to track down and reproduce bugs.
                Through session replays, Highlight shows you exactly how and
                when your bugs happen. Highlight removes the mystery of
                debugging.
              </p>
            </div>
            <div
              className={classNames(styles.buttonContainer, styles.heroImage)}
            >
              <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                Get Started For Free
              </PrimaryButton>
            </div>
            <div
              className={classNames(
                styles.anchorImage,
                styles.heroImage,
                styles.imageInner
              )}
            >
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorTitle}>
              <h2>{`Highlight superpowers your team.`}</h2>
            </div>
            <div className={styles.featureContainer}>
              <FeatureItem>
                <h3>Playback of your app</h3>
                <div>Highlight powers forward-thinking companies.</div>
              </FeatureItem>
              <FeatureItem>
                <h3>Error stack traces</h3>
                <div>Highlight powers forward-thinking companies.</div>
              </FeatureItem>
              <FeatureItem>
                <h3>{`Console & network tabs`}</h3>
                <div>Highlight powers forward-thinking companies.</div>
              </FeatureItem>
              <FeatureItem>
                <h3>Precise timing</h3>
                <div>Highlight powers forward-thinking companies.</div>
              </FeatureItem>
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorTitle}>
              <h2>{`Highlight is the ultimate debugging solution.`}</h2>
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>
              cross-team collaboration
            </div>
            <h2>{`Collaborate on bugs, everyone is kept in the loop.`}</h2>
            <div className={styles.sectionInfo}>
              <h3
                className={styles.bodyLarge}
              >{`There's never one stakeholder on a bug.`}</h3>
              <p className={styles.bodySmall}>
                When something breaks on your web app, there are many teams that
                could get the first message about it. Highlight makes it easy to
                communicate and re-assign issues to make decisions on errors
                faster.
              </p>
            </div>
            <div className={styles.sectionInfo}>
              <h3 className={styles.bodyLarge}>
                Integrate with your favorite tools.
              </h3>
              <p className={styles.bodySmall}>
                {`We understand that Highlight isn't your issue tracking tool or your customer data platform. That’s why we integrate with tools like Slack, Clickup and Zapier to keep everyone in the loop.`}
              </p>
            </div>
          </div>
          <div className={styles.sectionImageRight}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>Powerful search</div>
            <h2>{`Easily search for a bug by session or specific property.`}</h2>
            <div className={styles.sectionInfo}>
              <h3
                className={styles.bodyLarge}
              >{`Get to the correct session instantly.`}</h3>
              <p className={styles.bodySmall}>
                What if you step in the shoes of your users and debug from their
                perspective? With our search console, you can instantly find the
                right session and debug with confidence.
              </p>
            </div>
            <div className={styles.sectionInfo}>
              <h3 className={styles.bodyLarge}>
                What is slowing down your users?
              </h3>
              <p className={styles.bodySmall}>
                Are users not using a new feature? Or is there a known drop off
                in a specific user flow? Our search console gives you the
                ability to search based on URL, number of errors, user
                properties and much more!
              </p>
            </div>
          </div>
          <div className={styles.sectionImageRight}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
        </Section>
        <Section>
          <div className={styles.sectionText}>
            <div className={styles.sectionSubtitle}>security-compliant</div>
            <h2>{`Highlight is built for privacy and security.`}</h2>
            <div className={styles.sectionInfo}>
              <h3 className={styles.bodyLarge}>{`Privacy-first API`}</h3>
              <p className={styles.bodySmall}>
                Highlight supports data redaction, obfuscation, masking and much
                more. The library also supports a Strict Privacy Mode which
                obfuscates all text nodes for very strict PII rules.
              </p>
            </div>
            <div className={styles.sectionInfo}>
              <h3 className={styles.bodyLarge}>
                Compliance/Trust at the forefront
              </h3>
              <p className={styles.bodySmall}>
                Highlight supports several wellknown compliance frameworks
                including GDPR, CCPA, and SOC2.
              </p>
            </div>
          </div>
          <div className={styles.sectionImageRight}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
        </Section>
        <SnippetTab tabs={SNIPPET_TABS} />
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <div className={styles.sectionSubtitle}>Product Feature</div>
              <h2>{`Our customers`}</h2>
              <p className={styles.bodySmall}>
                {`Highlight powers forward-thinking companies. `}
                <SecondaryButton href="/customers">
                  Find out about our customers
                </SecondaryButton>
              </p>
            </div>
            <CompaniesReel />
          </div>
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <p className={styles.bodySmall}>
                {`Don't take our word. `}
                <SecondaryButton href="/customers">
                  Read our customer review section
                </SecondaryButton>
              </p>
            </div>
          </div>
        </Section>
        <div className={styles.slider}>
          <div className={styles.slideTrack}>
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <CustomerReview
                key={i}
                companyLogo={review.companyLogo}
                text={review.text}
                author={review.author}
              />
            ))}
          </div>
        </div>
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
