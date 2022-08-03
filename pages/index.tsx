import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '../components/common/Buttons/PrimaryButton';
import { PrimaryLink } from '../components/common/Buttons/SecondaryButton';
import Navbar from '../components/common/Navbar/Navbar';
import { Section } from '../components/common/Section/Section';
import styles from '../components/Home/Home.module.scss';

import BigHeroSection from '../public/images/big-hero-section.svg';
import MobileHeroSection from '../public/images/mobile-insects.png';
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
import SearchImage from '../public/images/search.svg';
import Tablet1 from '../public/images/tablet1.svg';
import Tablet2 from '../public/images/tablet2.png';

import Footer from '../components/common/Footer/Footer';
import { CallToAction } from '../components/common/CallToAction/CallToAction';
import { CompaniesReel } from '../components/Home/CompaniesReel/CompaniesReel';
import classNames from 'classnames';
import { Review, REVIEWS } from '../components/Home/Reviews';
import { SnippetTab } from '../components/Home/SnippetTab/SnippetTab';
import { Typography } from '../components/common/Typography/Typography';
import { Collapse } from 'antd';
import { ObfuscationSlider } from '../components/Home/ObfuscationSlider/ObfuscationSlider';
import { HeroVideo } from '../components/Home/HeroVideo/HeroVideo';

const IMAGE_SHOW_OFFSET = 450;

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

export const CustomerReview = ({
  companyLogo,
  text,
  author,
  scale,
}: Review) => {
  return (
    <div className={styles.reviewCard}>
      <div
        className={styles.companyLogo}
        style={{
          width: `${120 * (scale || 1)}px`,
          objectFit: 'contain',
        }}
      >
        <Image
          src={companyLogo}
          alt={author.name}
          layout={'fill'}
          objectFit={'contain'}
          style={{
            transform: `scale(${scale || 1})`,
          }}
        />
      </div>
      <div className={styles.reviewText}>
        <Typography type="copy2">
          <p>{text}</p>
        </Typography>
      </div>
      <div className={styles.author}>
        <div className={styles.authorImage}>
          <Image src={author.image} alt={author.name} />
        </div>
        <div>
          <Typography type="copy2" emphasis>
            {author.name}
          </Typography>
          <Typography type="copy2">{`, ${author.role}`}</Typography>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollYPosition = useRef<number>(0);
  const [offsetPosition, setOffsetPosition] = useState(0);
  const [scrollReviews, setScrollReviews] = useState(false);
  const [featureImageIndex, setFeatureImageIndex] = useState(0);
  const [firstCollapseIndex, setFirstCollapseIndex] = useState('1');
  const [secondCollapseIndex, setSecondCollapseIndex] = useState('1');
  const [thirdCollapseIndex, setThirdCollapseIndex] = useState('1');

  const scrollListener = useCallback(() => {
    if (
      (section3?.current?.getBoundingClientRect().y || 0) < IMAGE_SHOW_OFFSET
    ) {
      setFeatureImageIndex(2);
    } else if (
      (section2?.current?.getBoundingClientRect().y || 0) < IMAGE_SHOW_OFFSET
    ) {
      setFeatureImageIndex(1);
    } else {
      setFeatureImageIndex(0);
    }

    if (!scrollReviews) {
      return;
    }

    if (reviewsRef.current) {
      const { scrollY } = window;
      const scrollingDown = scrollYPosition.current > scrollY;
      // Adjust this value to control scroll speed
      const scrollDistance = scrollingDown ? -3 : 3;
      reviewsRef.current.scrollLeft += scrollDistance;
      scrollYPosition.current = scrollY;
    }
  }, [scrollReviews]);

  useEffect(() => {
    window.removeEventListener('scroll', scrollListener);
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [scrollListener]);

  useEffect(() => {
    setOffsetPosition(section1.current?.offsetHeight || 0);
  }, [section1]);

  useEffect(() => {
    const reviewsElement = reviewsRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrollReviews(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0,
      }
    );

    if (reviewsElement) {
      observer.observe(reviewsElement);

      // Scroll to center on load
      reviewsElement.scrollLeft =
        (reviewsElement.scrollWidth - window.innerWidth) / 2;
    }

    return () => {
      if (reviewsElement) {
        observer.unobserve(reviewsElement);
      }
    };
  }, [reviewsRef]);

  return (
    <div>
      <Head>
        <title>
          Highlight: The Ultimate Debugging Tool For Fast-Moving Teams
        </title>
        <meta
          name="description"
          content="Highlight removes the mystery of debugging through automatic session replays, error stack tracing, collaboration, and search. Never debug in the dark again."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Section className={styles.heroVideoWrapper}>
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
              <Typography type="copy1" onDark>
                Stop wasting effort trying to track down and reproduce bugs.
                Through session replays, Highlight shows you exactly how and
                when your bugs happen. Highlight removes the mystery of
                debugging.
              </Typography>
            </div>
            <div
              className={classNames(styles.buttonContainer, styles.heroImage)}
            >
              <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                <Typography type="copy1" emphasis={true}>
                  Get started for free
                </Typography>
              </PrimaryButton>
            </div>
            <HeroVideo />
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
                <Typography type="copy2" onDark>
                  See exactly how users are impacted by errros.
                </Typography>
              </FeatureItem>
              <FeatureItem>
                <Image src={StacktraceIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  Error stack traces
                </Typography>
                <Typography type="copy2" onDark>
                  Access full, language-specific stack traces on your web app.
                </Typography>
              </FeatureItem>
              <FeatureItem>
                <Image src={ConsoleIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  {`Console & network tabs`}
                </Typography>
                <Typography type="copy2" onDark>
                  Debug with everything you get in the dev-tools console.
                </Typography>
              </FeatureItem>
              <FeatureItem>
                <Image src={TimingIcon} alt="" />
                <Typography type="copy1" emphasis={true}>
                  Precise timing
                </Typography>
                <Typography type="copy2" onDark>
                  Understand when bugs happen and eveything that leads to it.
                </Typography>
              </FeatureItem>
            </div>
          </div>
        </Section>
        <div className={classNames(styles.hero, styles.hideMobile)}>
          <Image src={BigHeroSection} alt="hero" />
        </div>
        <div className={classNames(styles.hero, styles.mobile)}>
          <Image src={MobileHeroSection} alt="hero" />
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
          <Section className={styles.hidePhone} noYBottomPadding>
            <div className={styles.featuresColumnContainer}>
              <div className={styles.featuresLeftColumn}>
                <div ref={section1} className={styles.featuresSection}>
                  <div>
                    <div className={styles.sectionSubtitle}>
                      <Typography type="outline">
                        cross-team collaboration
                      </Typography>
                    </div>
                    <h3>
                      <span className={styles.highlightedText}>
                        Collaborate
                      </span>{' '}
                      on bugs, everyone is kept in the loop.
                    </h3>
                    <Collapse
                      accordion
                      destroyInactivePanel={true}
                      activeKey={firstCollapseIndex}
                      className={styles.sectionCollapse}
                    >
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setFirstCollapseIndex('1')}
                          >
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
                            When something breaks on your web app, there are
                            many teams that could get the first message about
                            it. Highlight makes it easy to communicate and
                            re-assign issues to make decisions on errors faster.
                          </Typography>
                        </div>
                      </Panel>
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setFirstCollapseIndex('2')}
                          >
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
                </div>
                <div ref={section2} className={styles.featuresSection}>
                  <div>
                    <div className={styles.sectionSubtitle}>
                      <Typography type="outline">Powerful search</Typography>
                    </div>
                    <h3>
                      <span className={styles.highlightedText}>
                        Easily search
                      </span>{' '}
                      for a bug by session or specific property.
                    </h3>
                    <Collapse
                      accordion
                      destroyInactivePanel={true}
                      activeKey={secondCollapseIndex}
                      className={styles.sectionCollapse}
                    >
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setSecondCollapseIndex('1')}
                          >
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
                            What if you step in the shoes of your users and
                            debug from their perspective? With our search
                            console, you can instantly find the right session
                            and debug with confidence.
                          </Typography>
                        </div>
                      </Panel>
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setSecondCollapseIndex('2')}
                          >
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
                            Are users not using a new feature? Or is there a
                            known drop off in a specific user flow? Our search
                            console gives you the ability to search based on
                            URL, number of errors, user properties and much
                            more!
                          </Typography>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
                <div ref={section3} className={styles.featuresSection}>
                  <div>
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
                      accordion
                      destroyInactivePanel={true}
                      activeKey={thirdCollapseIndex}
                      className={styles.sectionCollapse}
                    >
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setThirdCollapseIndex('1')}
                          >
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
                            Highlight supports data redaction, obfuscation,
                            masking and much more. The library also supports a
                            Strict Privacy Mode which obfuscates all text nodes
                            for very strict PII rules.
                          </Typography>
                        </div>
                      </Panel>
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setThirdCollapseIndex('2')}
                          >
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
                            Highlight supports several wellknown compliance
                            frameworks including GDPR, CCPA, and SOC2.
                          </Typography>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
              <div
                className={styles.featuresRightColumn}
                style={{
                  marginTop: `calc(-1 * ${offsetPosition * 0.2}px)`,
                }}
              >
                <div
                  className={classNames({
                    [styles.hideImage]: featureImageIndex !== 0,
                  })}
                >
                  <div
                    className={classNames(styles.imageInner, styles.hideMobile)}
                  >
                    <Image src={CollaborateImage} alt="" />
                  </div>
                  <div
                    className={classNames(
                      styles.imageInner,
                      styles.tabletGraphic
                    )}
                  >
                    <Image src={Tablet1} alt="" />
                  </div>
                </div>
                <div
                  className={classNames({
                    [styles.hideImage]: featureImageIndex !== 1,
                  })}
                >
                  <div
                    className={classNames(styles.imageInner, styles.hideMobile)}
                  >
                    <Image src={SearchImage} alt="" />
                  </div>
                  <div
                    className={classNames(
                      styles.imageInner,
                      styles.tabletGraphic
                    )}
                  >
                    <Image src={Tablet2} alt="" />
                  </div>
                </div>
                <div
                  className={classNames({
                    [styles.hideImage]: featureImageIndex !== 2,
                  })}
                  style={{ width: 300 }}
                >
                  <div className={styles.imageInner} style={{ height: 300 }}>
                    <ObfuscationSlider />
                  </div>
                </div>
              </div>
            </div>
          </Section>
          <Section
            reverseMobile={true}
            className={classNames(styles.mobileOnly, styles.mobileSpacing)}
          >
            <div className={styles.sectionText}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">cross-team collaboration</Typography>
              </div>
              <h3>
                <span className={styles.highlightedText}>Collaborate</span> on
                bugs, everyone is kept in the loop.
              </h3>
              <Collapse
                accordion
                destroyInactivePanel={true}
                activeKey={firstCollapseIndex}
                className={styles.sectionCollapse}
              >
                <Panel
                  header={
                    <div
                      className={styles.collapseHeader}
                      onMouseEnter={() => setFirstCollapseIndex('1')}
                    >
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
                    <div
                      className={styles.collapseHeader}
                      onMouseEnter={() => setFirstCollapseIndex('2')}
                    >
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
              <div className={classNames(styles.imageInner, styles.hideMobile)}>
                <Image src={CollaborateImage} alt="" />
              </div>
              <div
                className={classNames(
                  styles.imageInner,
                  styles.tabletGraphic,
                  styles.collaborationGraphic
                )}
              >
                <Image src={Tablet1} alt="" />
              </div>
            </div>
          </Section>
          <Section reverseMobile={true} className={styles.mobileOnly}>
            <div className={styles.sectionText}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">Powerful search</Typography>
              </div>
              <h3>
                <span className={styles.highlightedText}>Easily search</span>{' '}
                for a bug by session or specific property.
              </h3>
              <Collapse
                accordion
                destroyInactivePanel={true}
                activeKey={secondCollapseIndex}
                className={styles.sectionCollapse}
              >
                <Panel
                  header={
                    <div
                      className={styles.collapseHeader}
                      onMouseEnter={() => setSecondCollapseIndex('1')}
                    >
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
                    <div
                      className={styles.collapseHeader}
                      onMouseEnter={() => setSecondCollapseIndex('2')}
                    >
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
              <div className={classNames(styles.imageInner, styles.hideMobile)}>
                <Image src={SearchImage} alt="" />
              </div>
              <div
                className={classNames(styles.imageInner, styles.tabletGraphic)}
              >
                <Image src={Tablet2} alt="" />
              </div>
            </div>
          </Section>
          <Section reverseMobile={true} className={styles.mobileOnly}>
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
                accordion
                destroyInactivePanel={true}
                activeKey={thirdCollapseIndex}
                className={styles.sectionCollapse}
              >
                <Panel
                  header={
                    <div
                      className={styles.collapseHeader}
                      onMouseEnter={() => setThirdCollapseIndex('1')}
                    >
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
                    <div
                      className={styles.collapseHeader}
                      onMouseEnter={() => setThirdCollapseIndex('2')}
                    >
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
        <SnippetTab />
        <Section>
          <CompaniesReel />
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <Typography type="copy2" onDark>
                Don&apos;t take our word for it. Here&apos;s what our customers
                have to say.
              </Typography>
            </div>
          </div>
        </Section>
        <div className={styles.slider} ref={reviewsRef}>
          <div className={styles.slideTrack}>
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <CustomerReview
                key={i}
                companyLogo={review.companyLogo}
                text={review.text}
                author={review.author}
                scale={review.scale}
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
