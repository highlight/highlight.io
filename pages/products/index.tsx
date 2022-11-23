import type { NextPage } from 'next';
import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import FeatureBox from '../../components/Products/FeatureBox';
import Image from 'next/image';

import { BsPlayCircleFill, BsBarChartFill, BsFillTerminalFill } from 'react-icons/bs'

import { Section } from '../../components/common/Section/Section';
import { Typography } from '../../components/common/Typography/Typography';
import landingStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Products/Products.module.scss'
import classNames from 'classnames';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';

import HeroBugLeft from '../../public/images/hero-bug-left.gif';
import HeroBugRight from '../../public/images/hero-bug-right.gif';
import Footer from '../../components/common/Footer/Footer';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';

const Products: NextPage = () => {

  return (
    <div>
      <Navbar />
      <main>
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
                  Highlight for Next.js
                </Typography>
              </div>
              <h1>
                The{' '}
                <span className={landingStyles.highlightedText}>{"Next.js"}</span><br />
                monitoring toolkit <br />
                you've been waiting <br />
                for.
              </h1>
              <Typography type="copy1" onDark>
                What if monitoring your Next.js app was as easy as deploying it?
                With session replay and error monitoring, 
                Highlight’s got you covered.
              </Typography>
              <div className={classNames(landingStyles.buttonContainer, landingStyles.heroImage)}>
                <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                  <Typography type="copy2" emphasis={true}>
                    Get started for free
                  </Typography>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Section>
        <div className="flex justify-center mb-[170px]">
          <div className="flex flex-col lg:flex-row px-12 justify-center gap-12">
            <FeatureBox
              title="Session Replay"
              desc="Investigate hard-to-crack bugs by playing through issues in a youtube-like UI.
                    With access to requests, console logs and more!"
              icon={<BsPlayCircleFill />}
            />
            <FeatureBox
              title="Error Monitoring"
              desc="Continuously monitor errors and exceptions on your Next.js application,
                    all the way from your frontend to your backend."
              icon={<BsFillTerminalFill />}
            />
            <FeatureBox
              title="Performance Metrics"
              desc="Monitor and set alerts for important performance metrics in Next.js
                    like Web Vitals, Request latency, and much more!"
              icon={<BsBarChartFill />}
            />
          </div>
        </div>
        <div className="flex justify-center">
          
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
      
    </div>
  )
}

export default Products;