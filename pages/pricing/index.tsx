import { NextPage } from 'next';
import Image from 'next/legacy/image';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import CheckMark from '../../public/images/checkmark.svg';
import PcPlayMedia from '../../public/images/pc-play-media.svg';
import Wallet from '../../public/images/wallet.svg';
import Stopwatch from '../../public/images/stopwatch.svg';
import Globe from '../../public/images/globe.svg';
import Security from '../../public/images/security.svg';
import ReceiptList from '../../public/images/receipt-list.svg';
import CreditCard from '../../public/images/credit-card.svg';
import Delete from '../../public/images/delete.svg';
import TagLoyalty from '../../public/images/tag-loyalty.svg';
import Chat from '../../public/images/pricing-comment.svg';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import styles from '../../components/Pricing/Pricing.module.scss';
import productStyles from '../../components/Products/Products.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import { Typography } from '../../components/common/Typography/Typography';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';
import useEmblaCarousel from 'embla-carousel-react';

import Collapsible from 'react-collapsible';
import {
  BasicDetails,
  EnterpriseDetails,
  EssentialsDetails,
  PricingDetails,
  StartupDetails,
} from '../../components/Pricing/plan_features';
import {
  BasicInfo,
  EnterpriseInfo,
  EssentialsInfo,
  PricingInfo,
  StartupInfo,
} from '../../components/Pricing/plan_info';
import { Meta } from '../../components/common/Head/Meta';

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

const docsUrl = '/docs';

const FAQS = [
  {
    question: 'Do you offer a discount for non-profits?',
    answer: `We love supporting non-profits and offer a 75% discount for the lifetime of the account. To activate the discount, create a workplace on either the Standard or Pro plan. Then reach out to support and mention the discount. `,
    icon: TagLoyalty,
  },
  {
    question: 'How long does it take to setup Highlight?',
    answer: `It generally takes an engineer less than ten minutes to understand the concepts of Highlight and integrate the app into their workflow. For more information on setup, take a look at our <a href="${docsUrl}">docs</a>. `,
    icon: Stopwatch,
  },
  {
    question: 'Can I deploy Highlight on-premise?',
    answer: `Yes! To get a glimpse at how our deployment process looks, take a look <a href="${docsUrl}/on-premise">here</a> (its super simple!). We also support deployments for most cloud providers (Heroku, Render, AWS, etc..). To get a license key for a trial or a production deployment, contact <a href="mailto:sales@highlight.io">sales</a>. `,
    icon: Globe,
  },
  {
    question: "Is Highlight secure? Where's my data stored?",
    answer: `Highlight uses end-to-end encryption to keep your data safe while it’s in transit, and we also offer an on-prem solution if you want to keep customer data on your own servers. For more information, see our <a href="/#privacy">security section</a> and <a href="${docsUrl}" target="_blank">docs</a>. If we don't answer your question there, <a href="mailto:jay@highlight.io">let us know</a>. `,
    icon: Security,
  },
  {
    question: 'Do I need a credit card to sign up?',
    answer: `Absolutely not! We never ask for your credit card on sign up. If you start on a paid plan then 30 days after signing up you will be politely prompted to enter in your payment information. At anytime you can switch back to a free plan as long as your workplace has less than 6 seats. `,
    icon: CreditCard,
  },
  {
    question: 'How will you charge me?',
    answer: `We ask for a credit card. Your credit card information will never touch our servers as we use <a href="https://stripe.com/" target="_blank">Stripe</a> as our payments processor. For Enterprise customers we can do ACH and custom invoices if requested. `,
    icon: Wallet,
  },
  {
    question: 'How does billing work?',
    answer: `We charge by usage; or number of sessions collected per month. Our billing system uses prorated billing, meaning you only pay for what you use below each of our thresholds (see above). For example if you move to the Startup plan from the Basic plan in the middle of the month, then you will only be charged for the time you are on the paid plan. `,
    icon: ReceiptList,
  },
  {
    question: 'What counts as a session?',
    answer: `A session is contiguous instance of a user's presence on your app for less than 4 hours. That is, if a user is browsing your application for 3 minutes, then closes the tab, this counts as a single session. `,
    icon: PcPlayMedia,
  },
  {
    question: 'Can I cancel at anytime?',
    answer: `Definitely! You can cancel or downgrade your subscription at anytime. You can also delete your workplace in the settings page at anytime. `,
    icon: Delete,
  },
];

const TierSection = ({
  tierName,
  numSessionCredits,
  price,
  discount,
  features,
  mostPopular,
  monthly,
}: PricingInfo & {
  features: PricingDetails;
  monthly: boolean;
}) => {
  const contactSales = price === undefined;
  return (
    <div>
      {mostPopular && (
        <div className={styles.mostPopular}>
          <Typography type="outline">Most Popular</Typography>
        </div>
      )}
      <div
        className={classNames(styles.tierColumn, {
          [styles.mostPopularTierColumn]: mostPopular,
        })}
      >
        <div className={styles.desktopTierSection}>
          <div className={styles.desktopTopTier}>
            <div className={styles.tierHeader}>
              <Typography type="copy1" emphasis>
                {tierName}
              </Typography>
              <div
                className={classNames(styles.discountPill, {
                  [styles.discountPillVisible]: !monthly && discount,
                })}
              >
                - {discount}%
              </div>
            </div>
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
                  {numSessionCredits.toLocaleString()}
                </Typography>
                <Typography type="copy3">{` session credits`}</Typography>
              </div>
            )}
            <div className={styles.desktopPrice}>
              {contactSales ? (
                <Image
                  height={24}
                  width={24}
                  src={Chat}
                  alt="chat icon"
                ></Image>
              ) : (
                <>
                  <Typography
                    type="copy3"
                    emphasis
                    className={styles.moneySign}
                  >
                    {'$'}
                  </Typography>
                  <h3 className={styles.price}>
                    {monthly || !discount
                      ? price
                      : Math.round((1 - discount / 100) * price)}
                  </h3>
                  <div className={styles.timeIndicator}>
                    <Typography type="copy3">{'/ mo'}</Typography>
                  </div>
                </>
              )}
            </div>
          </div>
          <PrimaryButton
            href={
              contactSales
                ? 'mailto:sales@highlight.io'
                : 'https://app.highlight.io/?sign_up=1'
            }
            className={styles.pricingButton}
          >
            <Typography type="copy2" emphasis={true}>
              {contactSales ? 'Contact Sales' : 'Start Free Trial'}
            </Typography>
          </PrimaryButton>
        </div>

        {features &&
          Object.keys(features).map((headingKey) => {
            return (
              <div className={styles.desktopFeaturesSection} key={headingKey}>
                {(features as any)[headingKey].items.map((item: any) => {
                  return (
                    <>
                      {item.value ? (
                        <Image src={CheckMark} alt="checkmark"></Image>
                      ) : (
                        <div>-</div>
                      )}
                      <hr className={styles.featureDivider} />
                    </>
                  );
                })}
              </div>
            );
          })}
      </div>
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
        <title>
          Highlight: Plans And Pricing For Any Team. Get Started Free.
        </title>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity":
              ${JSON.stringify(
            FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            }))
          )}
          }`}
        </script>
      </Head>
      <Meta
        title="Highlight: Plans And Pricing For Any Team. Get Started Free."
        description="Highlight's developer friendly pricing makes sure any team can afford to get the visibility into bugs they need. See plans, features, FAQs and more here:"
      />
      <Navbar />
      <main>
        <Section className={styles.titleSection}>
          <div className={styles.pricingTitle}>
            <div className={styles.anchorHead}>
              <div className={productStyles.subtleBadge}>
                <Typography type="copy4" emphasis>
                  Plans and Pricing
                </Typography>
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
            <MobileTierCarousel monthly={monthly} />
          </Section>
        ) : (
          <Section className={styles.tierWrapper}>
            <div className={styles.configColumn}>
              <BillingWidget
                onMonthlyChange={(m) => setMonthly(m)}
                monthly={monthly}
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
                      {(BasicDetails as any)[headingKey].items.map(
                        (item: any, key: number) => {
                          return (
                            <>
                              <Typography
                                type="copy3"
                                key={key}
                                className={styles.featureKey}
                                onDark
                              >
                                {item.name}
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
            {planInfo.map((p: PricingInfo, idx: number) => (
              <TierSection
                key={idx}
                features={planDetails[idx]}
                monthly={monthly}
                {...p}
              />
            ))}
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
            {FAQS.map((faq, index) => (
              <Question
                key={index}
                question={faq.question}
                answer={faq.answer}
                icon={faq.icon}
              />
            ))}
          </div>
        </Section>
        <FooterCallToAction />
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
  question,
  answer,
  icon,
}: {
  question: string;
  answer: string;
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
                {question}
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
          <Typography
            className={styles.questionDescription}
            type="copy3"
            onDark
          >
            <div dangerouslySetInnerHTML={{ __html: answer }}></div>
          </Typography>
        </div>
      </Collapsible>
      <hr className={styles.faqDivider} />
    </div>
  );
};

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: any) => {
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

const MobileTierCarousel = ({ monthly }: { monthly: boolean }) => {
  const { width } = useWindowDimensions();
  const [planIndex, setPlanIndex] = useState(2);
  const [viewportRef, embla] = useEmblaCarousel({
    startIndex: planIndex,
    align: 'center',
  });

  useEffect(() => {
    if (embla && planIndex) {
      embla.scrollTo(planIndex);

      embla.on('select', () => {
        setPlanIndex(embla.selectedScrollSnap());
      });
    }
  }, [embla, planIndex]);

  return (
    <>
      <div className="embla" ref={viewportRef}>
        <div className="embla__container">
          {planInfo.map((p: PricingInfo, i: number) => (
            <MobileTierSection
              key={i}
              width={width <= 800 ? 248 : 332}
              selected={i == planIndex}
              monthly={monthly}
              {...p}
            />
          ))}
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
  mostPopular,
  selected,
  width,
  discount,
  monthly,
}: {
  monthly: boolean;
  selected: boolean;
  width: number;
} & PricingInfo) => {
  const contactSales = price === undefined;
  return (
    <div
      style={{ minWidth: width }}
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
          <div className={styles.tierHeader}>
            <Typography type="copy1" emphasis>
              {tierName}
            </Typography>
            <div
              className={classNames(styles.discountPill, {
                [styles.discountPillVisible]: !monthly && discount,
              })}
            >
              - {discount}%
            </div>
          </div>
          <Typography type="copy3" className={styles.mobileSessionCredits}>
            {numSessionCredits ? numSessionCredits.toLocaleString() : 'Custom'}{' '}
            session credits
          </Typography>
          <div className={styles.desktopPrice}>
            {contactSales ? (
              <Image height={24} width={24} src={Chat} alt="chat icon"></Image>
            ) : (
              <>
                <Typography type="copy3" emphasis className={styles.moneySign}>
                  {'$'}
                </Typography>
                <h3 className={styles.price}>
                  {monthly || !discount
                    ? price
                    : Math.round((1 - discount / 100) * price)}
                </h3>
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
          <Typography type="copy2" emphasis={true}>
            {contactSales ? 'Contact Sales' : 'Start Free Trial'}
          </Typography>
        </PrimaryButton>
      </div>
    </div>
  );
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default Pricing;
