import type { NextPage } from 'next';
import Image from 'next/legacy/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '../components/common/Buttons/PrimaryButton';
import Navbar from '../components/common/Navbar/Navbar';
import { Section } from '../components/common/Section/Section';
import styles from '../components/Home/Home.module.scss';
import productStyles from '../components/Products/Products.module.scss'

import MobileHeroSection from '../public/images/mobile-insects.png';
import HeroBugLeft from '../public/images/hero-bug-left.gif';
import HeroBugRight from '../public/images/hero-bug-right.gif';
import ProductsReplay from '../public/images/products-replay.svg';

import MultipleIcon from '../public/images/multiple.svg';
import PuzzleIcon from '../public/images/puzzle.svg';
import ChartbarIcon from '../public/images/chart-bar.svg';
import MagnifierIcon from '../public/images/magnifier.svg';
import VerifiedIcon from '../public/images/verified.svg';
import PlugIcon from '../public/images/plug.svg';
import InfoRow from '../components/Products/InfoRow';

import CollaborateImage from '../public/images/collaborate.png';
import SearchImage from '../public/images/search.svg';
import TwoHighlightersImage from '../public/images/two-highlighters.gif';
import Tablet1 from '../public/images/tablet1.svg';

import Footer from '../components/common/Footer/Footer';
import { FooterCallToAction } from '../components/common/CallToAction/FooterCallToAction';
import { CompaniesReel } from '../components/Home/CompaniesReel/CompaniesReel';
import classNames from 'classnames';
import { Review, REVIEWS } from '../components/Home/Reviews';
import { SnippetTab } from '../components/Home/SnippetTab/SnippetTab';
import { Typography } from '../components/common/Typography/Typography';
import { Collapse } from 'antd';
import { ObfuscationSlider } from '../components/Home/ObfuscationSlider/ObfuscationSlider';
import { HeroVideo } from '../components/Home/HeroVideo/HeroVideo';
import Link from 'next/link';
import { OSSCallToAction } from '../components/common/CallToAction/OSSCallToAction';

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
    // invoke the sitemap api to validate next metrics integration
    fetch('/sitemap.xml').then((r) => r.text());
  }, []);

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
            <h1 className={styles.landingAnchorHead}>The open source, fullstack <br /><span className="text-highlight-yellow">Monitoring Platform.</span></h1>
            <div className={styles.anchorHead}>
              <Typography type="copyHeader" onDark>A cohesive, open source toolset for monitoring your full-stack web application.</Typography>
            </div>
            <div className="flex justify-center mt-8 mb-32">
              <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-8 w-screen px-5 sm:w-auto"
              >
                <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>
                    Get started for free
                  </Typography>
                </PrimaryButton>
              </div>
            </div>
            <HeroVideo />
          </div>
        </Section>
        <Section>
          <div className={styles.anchorFeature} id="features">
            <div className={styles.anchorTitle}>
              <h2>
                The monitoring platform for{' '}
                <span className={styles.highlightedText}>fast-moving teams.</span>{' '}
              </h2>
            </div>
          </div>

        </Section>
        <div className={productStyles.infoContainer}>
          <InfoRow
            title={`Reproduce issues with high-fidelity session replay.`}
            desc={"Get an organic link between your errors & session replay to understand the “what”, “why” and “how” of your application."}
            link={"https://app.highlight.io/?sign_up=1"}
            imgSrc={ProductsReplay}
          />
          <div className={productStyles.divider} />
          <InfoRow
            title={`Reproduce issues with high-fidelity session replay.`}
            desc={"Get an organic link between your errors & session replay to understand the “what”, “why” and “how” of your application."}
            link={"https://app.highlight.io/?sign_up=1"}
            imgSrc={ProductsReplay}
            invert
          />
          <div className={productStyles.divider} />
          <InfoRow
            title={`Reproduce issues with high-fidelity session replay.`}
            desc={"Get an organic link between your errors & session replay to understand the “what”, “why” and “how” of your application."}
            link={"https://app.highlight.io/?sign_up=1"}
            imgSrc={ProductsReplay}
          />
          <div className={productStyles.divider} />
        </div>
        <div className={classNames(styles.bigHero, styles.hideMobile)}>
          <div className={classNames(styles.hero)}>
            <video playsInline autoPlay muted loop id="big-hero-video">
              <source src="/images/big-hero.mp4" type="video/mp4"></source>
            </video>
          </div>
        </div>
        <div className={classNames(styles.hero, styles.mobile)}>
          <Image src={MobileHeroSection} alt="hero" />
        </div>
        <OSSCallToAction />
        <Section>
          <CompaniesReel />
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <Typography type="copy2" onDark>
                Don&apos;t take our word.{' '}
                <Link href="/customers">
                  Read our customer review section →
                </Link>
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
        <FooterCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
