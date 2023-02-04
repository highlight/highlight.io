import React, { useRef, useEffect, useState, useCallback } from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import FeatureBox from '../../components/Products/FeatureBox';
import Image from 'next/image';
import Link from 'next/link';

import {
  BsPlayCircleFill,
  BsBarChartFill,
  BsFillTerminalFill,
} from 'react-icons/bs';
import { PRODUCTS, iProduct } from '../../components/Products/products';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Section } from '../../components/common/Section/Section';
import { Typography } from '../../components/common/Typography/Typography';
import landingStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Products/Products.module.scss';
import navStyles from '../../components/common/Navbar/Navbar.module.scss';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { HighlightCodeBlock } from '../../components/Docs/HighlightCodeBlock/HighlightCodeBlock';
import ProductsReplay from '../../public/images/products-replay.svg';
import ProductsErrors from '../../public/images/products-errors.svg';
import ProductsGraph from '../../public/images/products-graph.svg';

import HeroBugLeft from '../../public/images/hero-bug-left.gif';
import HeroBugRight from '../../public/images/hero-bug-right.gif';
import Footer from '../../components/common/Footer/Footer';
import { REVIEWS } from '../../components/Home/Reviews';
import { CustomerReview } from '..';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Banner from '../../components/common/Banner/Banner';
import InfoRow from '../../components/Products/InfoRow';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(PRODUCTS).map((k: string) => ({
      params: { slug: k },
    })),
    fallback: 'blocking',
  };
};

//Gets list of products from products.ts
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Handle event slugs which don't exist
  if (!PRODUCTS[slug]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: PRODUCTS[slug],
    },
  };
};

const Products = ({ product }: { product: iProduct }) => {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollYPosition = useRef<number>(0);
  const [scrollReviews, setScrollReviews] = useState(false);

  const scrollListener = useCallback(() => {

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
      <Banner>
        <div className={navStyles.bannerContainer}>
          <p>Want 2 weeks of free Highlight? </p>
          <a
            href="http://app.highlight.io/"
            className={navStyles.callToAction}
          >
            Register Here →
          </a>
        </div>
      </Banner>
      <Navbar hideBanner />
      <div>
        <Section className={landingStyles.heroVideoWrapper}>
          <div className={landingStyles.heroBugLeft}>
            <Image src={HeroBugLeft} alt="bug left" />
          </div>
          <div className={landingStyles.heroBugRight}>
            <Image src={HeroBugRight} alt="bug right" />
          </div>
          <div className={landingStyles.anchorFeature}>
            <div className={landingStyles.anchorHead}>
              <div className={styles.highlightedBadge}>
                <Typography type="copy4" emphasis>
                  Highlight for {product.title}
                </Typography>
              </div>
              <h1>
                The{' '}
                <span className={landingStyles.highlightedText}>
                  {product.title}
                </span>
                <br />
                monitoring toolkit <br className="hidden sm:flex" />
                you&apos;ve been waiting <br className="hidden sm:flex" />
                for.
              </h1>
              <Typography type="copy1" onDark>
                What if monitoring your {product.title} app was as easy as
                deploying it? With session replay and error monitoring,
                Highlight’s got you covered.
              </Typography>
              <div className="flex justify-center my-14">
                <div className="flex flex-col lg:flex-row justify-center gap-4"
                >
                  <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                    <Typography type="copy2" emphasis={true}>
                      Get started for free
                    </Typography>
                  </PrimaryButton>
                  <PrimaryButton href={product.docsLink} className={styles.hollowButton}>
                    <Typography type="copy2" emphasis={true}>
                      Read our docs
                    </Typography>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <div className="flex justify-center mb-20 md:mb-[160px]">
          <div className="flex flex-col lg:flex-row justify-center gap-4 px-4 lg:gap-12 lg:px-12">
            <FeatureBox
              title="Session Replay"
              desc="Investigate hard-to-crack bugs by playing through issues in a youtube-like UI.
                    With access to requests, console logs and more!"
              icon={<BsPlayCircleFill />}
            />
            <FeatureBox
              title="Error Monitoring"
              desc={`Continuously monitor errors and exceptions in your ${product.title} application,
                    all the way from your frontend to your backend.`}
              icon={<BsFillTerminalFill />}
            />
            <FeatureBox
              title="Performance Metrics"
              desc={`Monitor and set alerts for important performance metrics in ${product.title}
                    like Web Vitals, Request latency, and much more!`}
              icon={<BsBarChartFill />}
            />
          </div>
        </div>
        <div className="flex justify-center bg-color-primary-200">
          <div className={styles.anchorFeature}>
            <div className={landingStyles.anchorHead}>
              <div className={styles.subtleBadge}>
                <Typography type="copy4" emphasis>
                  Highlight for {product.title}
                </Typography>
              </div>
              <div className="px-8">
                <h2>
                  Get started in your <br className="hidden sm:flex" />
                  {product.title} app <br />
                  today.
                </h2>
              </div>

              <div className="flex justify-center my-14">
                <div className="flex flex-col lg:flex-row justify-center gap-4"
                >
                  <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                    <Typography type="copy2" emphasis={true}>
                      Get started for free
                    </Typography>
                  </PrimaryButton>
                  <PrimaryButton href={product.docsLink} className={styles.hollowButton}>
                    <Typography type="copy2" emphasis={true}>
                      Read our docs
                    </Typography>
                  </PrimaryButton>
                </div>
              </div>
            </div>
            <div className="w-4/5 mb-20 md:mb-40">
              <HighlightCodeBlock
                language={'js'}
                product={product}
                showLineNumbers={false}
                topbar={true}
              />
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <InfoRow
            title={`Reproduce issues with high-fidelity session replay.`}
            desc={`With our pixel-perfect replays of your ${product.title} app,
            you'll get to the bottom of issues in no time and better
            understand how your app is being used.`}
            link={product.docsLink}
            imgSrc={ProductsReplay}
          />

          <div className={styles.divider} />

          <InfoRow
            title={`Get a ping when exceptions or errors are thrown.`}
            desc={`Our alerting infrastructure can take abnormal metrics or
            errors raised in your ${product.title} app and notify your
            engineering team over Slack, Discord, and more!`}
            link={product.docsLink}
            imgSrc={ProductsErrors}
            invert={true}
          />

          <div className={styles.divider} />

          <InfoRow
            title={`Monitor the metrics that keep your customers around.`}
            desc={`Highlight allows you to track performance, request timings, and several other metrics
            in your ${product.title} application.`}
            link={product.docsLink}
            imgSrc={ProductsGraph}
          />

        </div>
        <Section>
          <CompaniesReel />
        </Section>
        <Section>
          <div className={landingStyles.anchorFeature}>
            <div className={landingStyles.anchorHead}>
              <Typography type="copy2" onDark>
                Don&apos;t take our word.{' '}
                <Link href="/customers">
                  What our customers have to say →
                </Link>
              </Typography>
            </div>
          </div>
        </Section>
        <div className={landingStyles.slider} ref={reviewsRef}>
          <div className={landingStyles.slideTrack}>
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
      </div>
      <Footer />
    </div>
  );
};

export default Products;
