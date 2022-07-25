import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { SVGProps, useCallback, useEffect, useRef } from 'react';
import CheckMark from '../../public/images/checkmark.svg';
import PcPlayMedia from '../../public/images/pc-play-media.svg';
import Chat from '../../public/images/pricing-comment.svg';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import styles from '../../components/Pricing/Pricing.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { Typography } from '../../components/common/Typography/Typography';
import { PrimaryLink } from '../../components/common/Buttons/SecondaryButton';
import { useState } from 'react';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

import Collapsible from 'react-collapsible';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import {
  BasicDetails,
  EnterpriseDetails,
  EssentialsDetails,
  PricingDetails,
  StartupDetails,
} from './plan_features';
import {
  BasicInfo,
  EnterpriseInfo,
  EssentialsInfo,
  PricingInfo,
  StartupInfo,
} from './plan_info';

// Plans and info used for both mobile and desktop views.
const planDetails: Array<PricingDetails> = [
  BasicDetails,
  EssentialsDetails,
  StartupDetails,
  EnterpriseDetails,
];
const planInfo: Array<PricingInfo> = [
  BasicInfo,
  EssentialsInfo,
  StartupInfo,
  EnterpriseInfo,
];

const TierSection = ({
  tierName,
  numSessionCredits,
  price,
  contactSales,
  features,
  mostPopular,
}: {
  mostPopular: boolean;
  tierName: string;
  numSessionCredits: number;
  price: number;
  contactSales: boolean;
  features: PricingDetails;
}) => {
  return (
    <div
      className={classNames(styles.tierColumn, {
        [styles.mostPopularTierColumn]: mostPopular,
      })}
    >
      {mostPopular && (
        <div className={styles.mostPopular}>
          <Typography type="outline">Most Popular</Typography>
        </div>
      )}
      <div className={styles.desktopTierSection}>
        <div className={styles.desktopTopTier}>
          <Typography type="copy1" emphasis className={styles.dekstopTierName}>
            {tierName}
          </Typography>
          {contactSales ? (
            <div className={styles.desktopSessionCreditsEnterprise}>
              <Typography type="copy3" emphasis>
                {'Custom'}
              </Typography>
              <Typography type="copy3">{` session credits`}</Typography>
            </div>
          ) : (
            <div className={styles.desktopSessionCredits}>
              <Typography type="copy3" emphasis>
                {numSessionCredits}
              </Typography>
              <Typography type="copy3">{` session credits`}</Typography>
            </div>
          )}
          <div className={styles.desktopPrice}>
            {contactSales ? (
              <Image height={24} width={24} src={Chat} alt="chat icon"></Image>
            ) : (
              <>
                <Typography type="copy3" emphasis className={styles.moneySign}>
                  {'$'}
                </Typography>
                <h3 className={styles.price}>{price}</h3>
                <div className={styles.timeIndicator}>
                  <Typography type="copy3">{'/ mo'}</Typography>
                </div>
              </>
            )}
          </div>
        </div>
        <PrimaryButton className={styles.pricingButton}>
          <Typography type="copy3" emphasis={true}>
            {contactSales ? 'Contact Sales' : 'Start Free Trial'}
          </Typography>
        </PrimaryButton>
      </div>

      {features &&
        Object.keys(features).map((headingKey) => {
          return (
            <div className={styles.desktopFeaturesSection} key={headingKey}>
              {Object.keys((features as any)[headingKey].items).map(
                (featureKey) => {
                  return (
                    <>
                      {(features as any)[headingKey].items[featureKey].value ? (
                        <Image src={CheckMark} alt="checkmark"></Image>
                      ) : (
                        <div>-</div>
                      )}
                      <hr className={styles.featureDivider} />
                    </>
                  );
                }
              )}
            </div>
          );
        })}
    </div>
  );
};

const Pricing: NextPage = () => {
  const [monthly, setMonthly] = useState(true);
  const is800 = useMediaQuery(800);
  const is400 = useMediaQuery(400);
  const isMobile = is800 || is400;
  return (
    <div>
      <Head>
        <title>Highlight - Plans and Pricing</title>
        <meta name="description" content="Highlight - Plans and Pricing" />
      </Head>
      <Navbar />
      <main>
        <Section className={styles.titleSection}>
          <div className={styles.pricingTitle}>
            <div className={styles.anchorHead}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">Plans and Pricing</Typography>
              </div>
              <h1>
                Get the
                <span className={styles.yellowText}>{` visibility `}</span>
                you need today.
              </h1>
            </div>
          </div>
        </Section>

        {isMobile ? (
          <Section className={styles.mobileTierWrapper}>
            <div className={styles.mobileBillingWrapper}>
              <Typography type="copy3" className={styles.billingCycleText}>
                Select billing cycle
              </Typography>
              <BillingWidget
                onMonthlyChange={(m) => setMonthly(m)}
                monthly={monthly}
              />
            </div>
            <MobileTierCarousel />
          </Section>
        ) : (
          <Section className={styles.tierWrapper}>
            <div className={styles.configColumn}>
              <BillingWidget
                onMonthlyChange={(m) => setMonthly(m)}
                monthly={monthly}
                mobile={is400 ? '400' : is800 ? '800' : 'desktop'}
              />
              <div className={styles.featureKeys}>
                {Object.keys(BasicDetails).map((headingKey) => {
                  return (
                    <div key={headingKey} className={styles.featureSet}>
                      <Typography
                        className={styles.featureName}
                        type="copy3"
                        emphasis
                      >
                        {(BasicDetails as any)[headingKey].name}
                      </Typography>
                      {Object.keys((BasicDetails as any)[headingKey].items).map(
                        (featureKey) => {
                          return (
                            <>
                              <Typography
                                type="copy3"
                                key={featureKey}
                                className={styles.featureKey}
                              >
                                {
                                  (BasicDetails as any)[headingKey].items[
                                    featureKey
                                  ].name
                                }
                              </Typography>
                              <hr className={styles.featureKeyDivider} />
                            </>
                          );
                        }
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <TierSection
              mostPopular={false}
              tierName="Basic"
              numSessionCredits={500}
              price={120}
              contactSales={false}
              features={BasicDetails}
            />
            <TierSection
              mostPopular={false}
              tierName="Basic"
              numSessionCredits={500}
              price={120}
              contactSales={false}
              features={BasicDetails}
            />
            <TierSection
              mostPopular={true}
              tierName="Basic"
              numSessionCredits={500}
              price={120}
              contactSales={false}
              features={BasicDetails}
            />
            <TierSection
              mostPopular={false}
              tierName="Basic"
              numSessionCredits={500}
              price={120}
              contactSales={true}
              features={BasicDetails}
            />
          </Section>
        )}
        <Section>
          <CompaniesReel />
        </Section>
        <Section className={styles.faqSection}>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <h2>{`Frequently asked questions`}</h2>
            </div>
          </div>
          <div>
            <Question
              questionText="What counts as a session?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="How long does it take to set up Highlight?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="Do I need a credit card to sign up?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="How will you charge me?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="Can I deploy Highlight on-premise?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="Is Highlight secure? Where’s my data stored?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="Can I cancel at anytime?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
            <Question
              questionText="Do you offer a discount for non-profits?"
              questionDescription={`
                  We love supporting non-profits and offer a 75% discount for the 
                  lifetime of the account. To activate the discount, create a 
                  workplace on either the Standard or Pro plan. Then reach out to 
                  support and mention the discount.`}
              icon={PcPlayMedia}
            />
          </div>
        </Section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

const DownArrow = ({ fill }: { fill: string }) => (
  <svg width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        d="M11.625 3.375 6 9 .375 3.375"
        stroke={fill}
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={fill} d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
);

const Question = ({
  questionText,
  questionDescription,
  icon,
}: {
  questionText: string;
  questionDescription: string;
  icon: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.faqRowClickable}>
      <Collapsible
        onOpening={() => setExpanded(true)}
        onClosing={() => setExpanded(false)}
        transitionTime={200}
        trigger={
          <div className={styles.faqRow}>
            <div className={styles.faqLeftContent}>
              <Image src={icon} alt="pc icon"></Image>
              <Typography className={styles.question} type="copy2" emphasis>
                {questionText}
              </Typography>
            </div>
            <button
              className={classNames(styles.circleButton, {
                [styles.expanded]: expanded,
              })}
            >
              <DownArrow fill={expanded ? '#0D0225' : '#72E4FC'} />
            </button>
          </div>
        }
      >
        <div className={styles.collapseInner}>
          <Typography className={styles.questionDescription} type="copy3">
            {questionDescription}
          </Typography>
        </div>
      </Collapsible>
      <hr className={styles.faqDivider} />
    </div>
  );
};

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener('change', (e) => updateTarget(e));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e));
  }, [width, updateTarget]);

  return targetReached;
};

const BillingWidget = ({
  monthly,
  onMonthlyChange,
}: {
  monthly: boolean;
  onMonthlyChange: (monthly: boolean) => void;
}) => {
  return (
    <>
      <div className={styles.billingWidget}>
        <div className={styles.billingWidgetButtons}>
          <PrimaryButton
            className={classNames(styles.billingButton, styles.leftButton, {
              [styles.selected]: monthly,
            })}
            onClick={() => onMonthlyChange(true)}
          >
            Monthly
          </PrimaryButton>
          <PrimaryButton
            className={classNames(styles.billingButton, styles.rightButton, {
              [styles.selected]: !monthly,
            })}
            onClick={() => onMonthlyChange(false)}
          >
            Annual
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

const MobileTierCarousel = () => {
  const [planIndex, setPlanIndex] = useState(2);
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'center',
    skipSnaps: true,
    startIndex: planIndex,
  });

  useEffect(() => {
    if (embla && planIndex) {
      embla?.scrollTo(planIndex);
      embla.on('select', (e) => setPlanIndex(embla.selectedScrollSnap())); // Add event listener
    }
  }, [embla, planIndex]);

  return (
    <>
      <div className="embla">
        <div className="embla__container" ref={viewportRef}>
          <div className="embla__container">
            {planInfo.map((p: PricingInfo, i: number) => (
              <MobileTierSection
                selected={i == planIndex}
                key={i}
                mostPopular={p.mostPopular}
                tierName={p.tierName}
                numSessionCredits={p.numSessionCredits}
                price={p.price}
                contactSales={p.contactSales}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.mobileTierDots}>
        {planInfo.map((p: PricingInfo, i: number) => (
          <button
            key={i}
            onClick={() => {
              embla?.scrollTo(i, false);
            }}
            className={classNames(styles.mobileTierDot, {
              [styles.dotSelected]: i == planIndex,
            })}
          ></button>
        ))}
      </div>
      <div className={styles.mobileFeaturesWrapper}>
        <Typography type="copy3" emphasis>
          {Object.keys(planDetails[planIndex]).map((headingKey) => {
            let currentFeatureSection = (planDetails[planIndex] as any)[
              headingKey
            ];
            return (
              <div className={styles.mobileFeaturesSection} key={headingKey}>
                <div className={styles.mobileFeatureHeader}>
                  <Typography type="copy3" emphasis>
                    {currentFeatureSection.name}
                  </Typography>
                </div>
                {Object.keys(currentFeatureSection.items).map(
                  (featureKey: any, i: number) => {
                    let currentFeature =
                      currentFeatureSection.items[featureKey];
                    return (
                      <div key={i} className={styles.mobileFeatureRow}>
                        <div className={styles.mobileFeatureInner}>
                          <Typography
                            type="copy3"
                            className={styles.mobileFeatureName}
                          >
                            {currentFeature.name}
                          </Typography>
                          <Typography type="copy3">
                            {currentFeature.value == true ? (
                              <Image src={CheckMark} alt="checkmark"></Image>
                            ) : (
                              <div>-</div>
                            )}
                          </Typography>
                        </div>
                        <hr className={styles.mobileFeatureDivider} />
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </Typography>
      </div>
    </>
  );
};

const MobileTierSection = ({
  tierName,
  numSessionCredits,
  price,
  contactSales,
  mostPopular,
  selected,
}: {
  mostPopular: boolean;
  tierName: string;
  numSessionCredits: number;
  price: number;
  contactSales: boolean;
  selected: boolean;
}) => {
  return (
    <div
      className={classNames(styles.mobileTierSectionWrapper, 'embla__slide', {
        [styles.mobileNotSelectedPlan]: !selected,
      })}
    >
      {mostPopular && (
        <div className={styles.mostPopularMobile}>
          <Typography type="outline">Most Popular</Typography>
        </div>
      )}
      <div
        className={classNames(styles.mobileTier, {
          [styles.mostPopularTierColumnMobile]: mostPopular,
        })}
      >
        <div className={styles.mobileTierTop}>
          <Typography type="copy1" emphasis className={styles.mobileTierName}>
            {tierName}
          </Typography>
          <Typography type="copy3" className={styles.mobileSessionCredits}>
            {numSessionCredits} session credits
          </Typography>
          <div className={styles.desktopPrice}>
            {contactSales ? (
              <Image height={24} width={24} src={Chat} alt="chat icon"></Image>
            ) : (
              <>
                <Typography type="copy3" emphasis className={styles.moneySign}>
                  {'$'}
                </Typography>
                <h3 className={styles.price}>{price}</h3>
                <div className={styles.timeIndicator}>
                  <Typography type="copy3">{'/ mo'}</Typography>
                </div>
              </>
            )}
          </div>
        </div>
        <PrimaryButton
          className={classNames(
            styles.pricingButton,
            styles.mobilePricingButton
          )}
        >
          <Typography type="copy3" emphasis={true}>
            {contactSales ? 'Contact Sales' : 'Start Free Trial'}
          </Typography>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Pricing;
