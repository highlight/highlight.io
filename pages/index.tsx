import type { NextPage } from 'next';
import Image from 'next/legacy/image';
import React, { useEffect } from 'react';
import { PrimaryButton } from '../components/common/Buttons/PrimaryButton';
import Navbar from '../components/common/Navbar/Navbar';
import { Section } from '../components/common/Section/Section';
import styles from '../components/Home/Home.module.scss';
import productStyles from '../components/Products/Products.module.scss'

import HeroBugLeft from '../public/images/hero-bug-left.gif';
import HeroBugRight from '../public/images/hero-bug-right.gif';
import LandingInfoRow1 from '../public/images/landingInfoRow1.png';
import LandingInfoRow2 from '../public/images/landingInfoRow2.png';
import LandingInfoRow3 from '../public/images/landingInfoRow3.png';
import LandingInfoRowSecurity from '../public/images/landingInfoRowSecurity.svg';

import Footer from '../components/common/Footer/Footer';
import { FooterCallToAction } from '../components/common/CallToAction/FooterCallToAction';
import { CompaniesReel } from '../components/Home/CompaniesReel/CompaniesReel';
import classNames from 'classnames';
import { Review } from '../components/Home/Reviews';
import { Typography } from '../components/common/Typography/Typography';
import { Collapse } from 'antd';
import { HeroVideo } from '../components/Home/HeroVideo/HeroVideo';
import Link from 'next/link';
import { OSSCallToAction } from '../components/common/CallToAction/OSSCallToAction';
import LandingInfoRow from '../components/Home/LandingInfoRow';
import InfoRow from '../components/Products/InfoRow';
import { CustomerReviewTrack } from '../components/Home/CustomerReviewTrack';
import { BigHeroArt } from '../components/Home/BigHeroArt';

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
  useEffect(() => {
    // invoke the sitemap api to validate next metrics integration
    fetch('/sitemap.xml').then((r) => r.text());
  }, []);

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
              <Typography type="copyHeader" onDark>A cohesive, open source toolset for monitoring your web application.</Typography>
            </div>
            <div className="flex justify-center mt-8 mb-32">
              <div className="flex flex-col justify-center w-screen gap-3 px-5 lg:flex-row lg:gap-8 sm:w-auto"
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
                Web application monitoring for {' '}
                <span className={styles.highlightedText}>today&#39;s developer.</span>{' '}
              </h2>
            </div>
          </div>

        </Section>
        <div className={styles.infoContainer}>
          <LandingInfoRow
            title={`A cohesive view of your entire stack.`}
            desc={'A natural pairing between your errors, session replay, logs and more. Understand the “what”, “why” and “how” of your full-stack web application.'}
            link={"https://app.highlight.io/?sign_up=1"}
            linkText={"Get started for free"}
            imgSrc={LandingInfoRow1}
            invert
          />
          <LandingInfoRow
            title={`Support for all the modern frameworks.`}
            desc={`We support all the fancy new frameworks and our platform is powered by open source, scalable technologies.`}
            link={"/docs/general/getting-started/getting-started-overview"}
            linkText={"Read the docs"}
            imgSrc={LandingInfoRow2}
          />
          <LandingInfoRow
            title={`Integrations with your favorite tools.`}
            desc="Connect your favorite issue tracker, support tool, or even analytics software and we’ll give you a way to push and pull data in the right places."
            link={"/docs/general/integrations/overview"}
            linkText={"Read the docs"}
            imgSrc={LandingInfoRow3}
            invert
          />
        </div>
        <div className={styles.infoContainer}>
          <InfoRow
            title={`Built with compliance and security.`}
            desc="Whether its SOC 2, HIPAA, or ISO, highlight.io can work with your stack. Contact us at security@highlight.io for more information."
            link={"/docs/general/company/compliance-and-security"}
            imgSrc={LandingInfoRowSecurity}
          />
        </div>
        <BigHeroArt />
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
        <CustomerReviewTrack />
        <FooterCallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
