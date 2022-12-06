import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import FeatureBox from '../../components/Products/FeatureBox';
import Image from 'next/image';
import Link from 'next/link';

import { BsPlayCircleFill, BsBarChartFill, BsFillTerminalFill } from 'react-icons/bs'
import { PRODUCTS, iProduct } from '../../components/Products/products';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Section } from '../../components/common/Section/Section';
import { Typography } from '../../components/common/Typography/Typography';
import landingStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Products/Products.module.scss'
import navStyles from '../../components/common/Navbar/Navbar.module.scss'
import classNames from 'classnames';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { HighlightCodeBlock } from '../../components/Docs/HighlightCodeBlock/HighlightCodeBlock';
import ProductsReplay from '../../public/images/products-replay.svg'
import ProductsErrors from '../../public/images/products-errors.svg'
import ProductsGraph from '../../public/images/products-graph.svg'

import HeroBugLeft from '../../public/images/hero-bug-left.gif';
import HeroBugRight from '../../public/images/hero-bug-right.gif';
import Footer from '../../components/common/Footer/Footer';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Banner from '../../components/common/Banner/Banner';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(PRODUCTS).map((k: string) => ({
      params: { slug: k },
    })),
    fallback: 'blocking',
  };
};


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

  return (
    <div>
      <Banner>
        <div className={navStyles.bannerContainer}>
          <p>Want 1 month of free Highlight? </p>
          <a
            href="http://app.highlight.run/"
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
                <span className={landingStyles.highlightedText}>{product.title}</span><br />
                monitoring toolkit <br className="hidden sm:flex" />
                you&apos;ve been waiting <br className="hidden sm:flex" />
                for.
              </h1>
              <Typography type="copy1" onDark>
                What if monitoring your {product.title} app was as easy as deploying it?
                With session replay and error monitoring,
                Highlight’s got you covered.
              </Typography>
              <div className={classNames(styles.buttonContainer, landingStyles.heroImage)}>
                <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>
                    Get started for free
                  </Typography>
                </PrimaryButton>
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
                  Badge Text
                </Typography>
              </div>
              <div className="px-8">
                <h2>
                  Get started in your <br className="hidden sm:flex" />
                  {product.title} app <br />
                  today.
                </h2>
                <Typography type="copy1" onDark>
                  What if monitoring your {product.title} app was as easy as deploying it?
                  With session replay and error monitoring, Highlight&apos;s got you covered.
                  This should be around 3-4 lines long.
                </Typography>
              </div>

              <div className={classNames(landingStyles.buttonContainer, landingStyles.heroImage)}>
                <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>
                    Get started for free
                  </Typography>
                </PrimaryButton>
                <PrimaryButton href="/docs" className={navStyles.signUpButton}>
                  <Typography type="copy2" emphasis={true}>
                    Read our docs
                  </Typography>
                </PrimaryButton>
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
          <div className="flex flex-col lg:flex-row justify-center gap-16 lg:mt-32 xl:gap-32">
            <div className="flex justify-center">
              <Image src={ProductsReplay} alt="" />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3>
                Reproduce issues with <br />
                high-fidelity session <br />
                replay.
              </h3>
              <Typography type="copy2" onDark >
                <p className="text-color-darker-copy-on-dark">
                  What if monitoring your {product.title} app was as easy as deploying it?
                  With session replay and error monitoring, Highlight&apos;s got you covered.
                </p>
              </Typography>
              <Link href="/docs">
                Go to Docs →
              </Link>
            </div>
          </div>

          <div className={styles.divider} />

          <div className="flex flex-col lg:flex-row justify-center gap-16 lg:mt-32 xl:gap-32">
            <div className="flex justify-center lg:hidden">
              <Image src={ProductsErrors} alt="" />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3>
                Get a ping when exceptions or error logs are thrown.
              </h3>
              <Typography type="copy2" onDark >
                <p className="text-color-darker-copy-on-dark">
                  What if monitoring your {product.title} app was as easy as deploying it?
                  With session replay and error monitoring, Highlight&apos;s got you covered.
                </p>
              </Typography>
              <Link href="/docs">
                Go to Docs →
              </Link>
            </div>
            <div className="hidden justify-center lg:flex">
              <Image src={ProductsErrors} alt="" />
            </div>
          </div>

          <div className={styles.divider} />

          <div className="flex flex-col lg:flex-row justify-center gap-16 lg:mt-32 xl:gap-32">
            <div className="flex justify-center">
              <Image src={ProductsGraph} alt="" />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3>
                Monitor the metrics that keep your customers around.
              </h3>
              <Typography type="copy2" onDark >
                <p className="text-color-darker-copy-on-dark">
                  What if monitoring your {product.title} app was as easy as deploying it?
                  With session replay and error monitoring, Highlight&apos;s got you covered.
                </p>
              </Typography>
              <Link href="/docs">
                Go to Docs →
              </Link>
            </div>
          </div>
        </div>
        <Section>
          <CompaniesReel />
        </Section>
        <FooterCallToAction />
      </div>
      <Footer />
    </div >
  )
}

export default Products;