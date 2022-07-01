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
import BigHeroSection from '../public/images/big-hero-section.svg';
import HeroBugRight from '../public/images/hero-bug-right.svg';
import HeroBugLeft from '../public/images/hero-bug-left.svg';
import PlaybackIcon from '../public/images/pc-play-media.svg';
import ConsoleIcon from '../public/images/window-code.svg';
import TimingIcon from '../public/images/stopwatch.svg';
import StacktraceIcon from '../public/images/check-list.svg';

import MultipleIcon from '../public/images/multiple.svg';
import PuzzleIcon from '../public/images/puzzle.svg';
import ChartbarIcon from '../public/images/chart-bar.svg';
import MagnifierIcon from '../public/images/magnifier.svg';
import VerifiedIcon from '../public/images/verified.svg';
import PlugIcon from '../public/images/plug.svg';

import CollaborateImage from '../public/images/collaborate.png';
import SearchImage from '../public/images/search.png';
import ReactImage from '../public/images/language/ReactIcon';
import htmlImage from '../public/images/language/htmlIcon';
import VueImage from '../public/images/language/VueIcon';
import NodeImage from '../public/images/language/NodeIcon';
import NextjsImage from '../public/images/language/NextjsIcon';
import GoImage from '../public/images/language/GoIcon';
import Footer from '../components/common/Footer/Footer';
import { CallToAction } from '../components/common/CallToAction/CallToAction';
import { CompaniesReel } from '../components/Home/CompaniesReel/CompaniesReel';
import classNames from 'classnames';
import { Review, REVIEWS } from '../components/Home/Reviews';
import { SnippetTab } from '../components/Home/SnippetTab/SnippetTab';
import { Typography } from '../components/common/Typography/Typography';
import { Collapse } from 'antd';
import { ObfuscationSlider } from '../components/Home/ObfuscationSlider/ObfuscationSlider';

const { Panel } = Collapse;

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
  const SetupDescription = (
    <div className={classNames(styles.sectionText, styles.codeSection)}>
      <div className={styles.sectionSubtitle}>
        <Typography type="outline">effortless setup</Typography>
      </div>
      <h2>
        Start using Highlight{' '}
        <span className={styles.highlightedText}>within minutes</span>
      </h2>
      <Typography type="copy2">
        {`Installing Highlight is a matter of selecting your frontend framework and adding three lines of code to your app. Highlight is built to be framework agnostic, so regardless of your stack, we have a solution that'll work for your team. You'll be off to the races in a matter of minutes!`}
      </Typography>
      <div className={styles.buttonContainer}>
        <SecondaryButton href="https://docs.highlight.run/getting-started">
          Read more about our backend integrations in beta
        </SecondaryButton>
      </div>
    </div>
  );
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
          {SetupDescription}
        </Section>
      ),
    },
    {
      image: VueImage,
      key: 'vue',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          {SetupDescription}
        </Section>
      ),
    },
    {
      image: NextjsImage,
      key: 'nextjs',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          {SetupDescription}
        </Section>
      ),
    },
    {
      image: htmlImage,
      key: 'html',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          {SetupDescription}
        </Section>
      ),
    },
    {
      image: GoImage,
      key: 'go',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          {SetupDescription}
        </Section>
      ),
    },
    {
      image: NodeImage,
      key: 'node',
      content: (
        <Section>
          <div className={styles.sectionImageLeft}>
            <div className={styles.imageInner}>
              <Image src={DarkPlaceholder} alt="" />
            </div>
          </div>
          {SetupDescription}
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
          <div className={styles.heroBugLeft}>
            <Image src={HeroBugLeft} alt="bug left" />
          </div>
          <div className={styles.heroBugRight}>
            <Image src={HeroBugRight} alt="bug right" />
          </div>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">
                  Stop debugging in the dark
                </Typography>
              </div>
              <h1>{`Because a stack trace alone isn't enough`}</h1>
              <Typography type="copy1">
                Stop wasting effort trying to track down and reproduce bugs.
                Through session replays, Highlight shows you exactly how and
                when your bugs happen. Highlight removes the mystery of
                debugging.
              </Typography>
            </div>
            <div
              className={classNames(styles.buttonContainer, styles.heroImage)}
            >
              <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                <Typography type="copy1" emphasis={true}>
                  Get started for free
                </Typography>
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
              <h2>
                Highlight{' '}
                <span className={styles.highlightedText}>supercharges</span>{' '}
                your team.
              </h2>
            </div>
            <div className={styles.featureContainer}>
              <FeatureItem>
                <Image src={PlaybackIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  Playback of your app
                </Typography>
                <Typography type="copy2">
                  Highlight powers forward-thinking companies.
                </Typography>
              </FeatureItem>
              <FeatureItem>
                <Image src={StacktraceIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  Error stack traces
                </Typography>
                <Typography type="copy2">
                  Highlight powers forward-thinking companies.
                </Typography>
              </FeatureItem>
              <FeatureItem>
                <Image src={ConsoleIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  {`Console & network tabs`}
                </Typography>
                <Typography type="copy2">
                  Highlight powers forward-thinking companies.
                </Typography>
              </FeatureItem>
              <FeatureItem>
                <Image src={TimingIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  Precise timing
                </Typography>
                <Typography type="copy2">
                  Highlight powers forward-thinking companies.
                </Typography>
              </FeatureItem>
            </div>
          </div>
        </Section>
        <div className={styles.hero}>
          <Image src={BigHeroSection} alt="hero" />
        </div>
        <div className={styles.secondaryBackground}>
          <Section>
            <div className={styles.anchorFeature}>
              <div
                className={classNames(
                  styles.anchorTitle,
                  styles.secondaryAnchor
                )}
              >
                <h2>
                  Highlight is the{' '}
                  <span className={styles.highlightedText}>ultimate</span>{' '}
                  debugging solution.
                </h2>
              </div>
            </div>
          </Section>
          <Section>
            <div className={styles.sectionText}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">cross-team collaboration</Typography>
              </div>
              <h3>
                <span className={styles.highlightedText}>Collaborate</span> on
                bugs, everyone is kept in the loop.
              </h3>
              <Collapse
                destroyInactivePanel={true}
                defaultActiveKey={['1']}
                className={styles.sectionCollapse}
              >
                <Panel
                  header={
                    <div className={styles.collapseHeader}>
                      <Image src={MultipleIcon} alt="" />
                      <Typography
                        type="copy1"
                        emphasis={true}
                      >{`There's never one stakeholder on a bug.`}</Typography>
                    </div>
                  }
                  className={styles.sectionInfo}
                  key="1"
                  showArrow={false}
                >
                  <div className={styles.sectionBody}>
                    <Typography type="copy2">
                      When something breaks on your web app, there are many
                      teams that could get the first message about it. Highlight
                      makes it easy to communicate and re-assign issues to make
                      decisions on errors faster.
                    </Typography>
                  </div>
                </Panel>
                <Panel
                  header={
                    <div className={styles.collapseHeader}>
                      <Image src={PuzzleIcon} alt="" />
                      <Typography
                        type="copy1"
                        emphasis={true}
                      >{`Integrate with your favorite tools.`}</Typography>
                    </div>
                  }
                  className={styles.sectionInfo}
                  key="2"
                  showArrow={false}
                >
                  <div className={styles.sectionBody}>
                    <Typography type="copy2">{`We understand that Highlight isn't your issue tracking tool or your customer data platform. That's why we integrate with tools like Slack, Clickup and Zapier to keep everyone in the loop.`}</Typography>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <div className={styles.sectionImageRight}>
              <div className={styles.imageInner}>
                <Image src={CollaborateImage} alt="" />
              </div>
            </div>
          </Section>
          <Section>
            <div className={styles.sectionText}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">Powerful search</Typography>
              </div>
              <h3>
                <span className={styles.highlightedText}>Easily search</span>{' '}
                for a bug by session or specific property.
              </h3>
              <Collapse
                destroyInactivePanel={true}
                defaultActiveKey={['1']}
                className={styles.sectionCollapse}
              >
                <Panel
                  header={
                    <div className={styles.collapseHeader}>
                      <Image src={MagnifierIcon} alt="" />
                      <Typography
                        type="copy1"
                        emphasis={true}
                      >{`Get to the correct session instantly.`}</Typography>
                    </div>
                  }
                  className={styles.sectionInfo}
                  key="1"
                  showArrow={false}
                >
                  <div className={styles.sectionBody}>
                    <Typography type="copy2">
                      What if you step in the shoes of your users and debug from
                      their perspective? With our search console, you can
                      instantly find the right session and debug with
                      confidence.
                    </Typography>
                  </div>
                </Panel>
                <Panel
                  header={
                    <div className={styles.collapseHeader}>
                      <Image src={ChartbarIcon} alt="" />
                      <Typography type="copy1" emphasis={true}>{`
                    What is slowing down your users?`}</Typography>
                    </div>
                  }
                  className={styles.sectionInfo}
                  key="2"
                  showArrow={false}
                >
                  <div className={styles.sectionBody}>
                    <Typography type="copy2">
                      Are users not using a new feature? Or is there a known
                      drop off in a specific user flow? Our search console gives
                      you the ability to search based on URL, number of errors,
                      user properties and much more!
                    </Typography>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <div className={styles.sectionImageRight}>
              <div className={styles.imageInner}>
                <Image src={SearchImage} alt="" />
              </div>
            </div>
          </Section>
          <Section>
            <div className={styles.sectionText}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">security-compliant</Typography>
              </div>
              <h3>
                Highlight is built for{' '}
                <span className={styles.highlightedText}>
                  privacy and security.
                </span>
              </h3>
              <Collapse
                destroyInactivePanel={true}
                defaultActiveKey={['1']}
                className={styles.sectionCollapse}
              >
                <Panel
                  header={
                    <div className={styles.collapseHeader}>
                      <Image src={PlugIcon} alt="" />
                      <Typography type="copy1" emphasis={true}>
                        Leverage our privacy-first API.
                      </Typography>
                    </div>
                  }
                  className={styles.sectionInfo}
                  key="1"
                  showArrow={false}
                >
                  <div className={styles.sectionBody}>
                    <Typography type="copy2">
                      Highlight supports data redaction, obfuscation, masking
                      and much more. The library also supports a Strict Privacy
                      Mode which obfuscates all text nodes for very strict PII
                      rules.
                    </Typography>
                  </div>
                </Panel>
                <Panel
                  header={
                    <div className={styles.collapseHeader}>
                      <Image src={VerifiedIcon} alt="" />
                      <Typography type="copy1" emphasis={true}>
                        {`We put compliance & trust at the forefront.`}
                      </Typography>
                    </div>
                  }
                  className={styles.sectionInfo}
                  key="2"
                  showArrow={false}
                >
                  <div className={styles.sectionBody}>
                    <Typography type="copy2">
                      Highlight supports several wellknown compliance frameworks
                      including GDPR, CCPA, and SOC2.
                    </Typography>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <div className={styles.sectionImageRight}>
              <div className={styles.imageInner}>
                <ObfuscationSlider />
              </div>
            </div>
          </Section>
        </div>
        <SnippetTab tabs={SNIPPET_TABS} />
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <h2>{`Our customers`}</h2>
              <Typography type="copy2">
                {`Highlight powers forward-thinking companies. `}
                <SecondaryButton href="/customers">
                  Find out about our customers
                </SecondaryButton>
              </Typography>
            </div>
            <CompaniesReel />
          </div>
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <Typography type="copy2">
                {`Don't take our word. `}
                <SecondaryButton href="/customers">
                  Read our customer review section
                </SecondaryButton>
              </Typography>
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
