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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Collapsible from 'react-collapsible';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

type PricingDetails = {
  features: {
    name: 'Features';
    key: 0;
    items: {
      publicSessionSharing: {
        key: 0;
        name: 'Public session sharing';
        value: boolean;
      };
      customDataExport: {
        key: 1;
        name: 'Custom data export';
        value: boolean;
      };
      enhancedUserProperties: {
        key: 2;
        name: 'Enhanced user properties';
        value: boolean;
      };
      sessionErrorCommenting: {
        key: 3;
        name: 'Session / error commenting';
        value: boolean;
      };
    };
  };
  teamManagement: {
    key: 1;
    name: 'Team Management';
    items: {
      publicSessionSharing: {
        key: 0;
        name: 'Public session sharing';
        value: boolean;
      };
      customDataExport: {
        key: 1;
        name: 'Custom data export';
        value: boolean;
      };
      enhancedUserProperties: {
        key: 2;
        name: 'Enhanced user properties';
        value: boolean;
      };
      sessionErrorCommenting: {
        key: 3;
        name: 'Session / error commenting';
        value: boolean;
      };
    };
  };
  support: {
    key: 2;
    name: 'Support';
    items: {
      publicSessionSharing: {
        key: 0;
        name: 'Public session sharing';
        value: boolean;
      };
      customDataExport: {
        key: 1;
        name: 'Custom data export';
        value: boolean;
      };
      enhancedUserProperties: {
        key: 2;
        name: 'Enhanced user properties';
        value: boolean;
      };
      sessionErrorCommenting: {
        key: 3;
        name: 'Session / error commenting';
        value: boolean;
      };
    };
  };
};
const BasicDetails: PricingDetails = {
  features: {
    name: 'Features',
    key: 0,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: false,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: false,
      },
    },
  },
  teamManagement: {
    name: 'Team Management',
    key: 1,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: true,
      },
    },
  },
  support: {
    name: 'Support',
    key: 2,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: true,
      },
    },
  },
};
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
        <Section className={styles.customerSection}>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <h2>{`Our customers`}</h2>
              <Typography type="copy2">
                {`Highlight powers forward-thinking companies. `}
                <PrimaryLink href="/customers">
                  Find out about our customers
                </PrimaryLink>
              </Typography>
            </div>
            <CompaniesReel />
          </div>
        </Section>
        {is800 ? (
          <div>hello</div>
        ) : (
          <Section className={styles.faqSection}>
            <div className={styles.anchorFeature}>
              <div className={styles.anchorHead}>
                <h2>{`Frequently Asked Questions`}</h2>
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
        )}
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
  const settings = {
    className: 'carousel-div',
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    centerPadding: '0px',
    dots: true,
    appendDots: (dots: any) => {
      return (
        <div
          style={{
            backgroundColor: 'transparent',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
        </div>
      );
    },
  };
  return (
    <div>
      <Slider {...settings}>
        <MobileTierSection
          mostPopular={false}
          tierName="Basic"
          numSessionCredits={500}
          price={120}
          contactSales={false}
        />
        <MobileTierSection
          mostPopular={true}
          tierName="Basic"
          numSessionCredits={500}
          price={120}
          contactSales={false}
        />
        <MobileTierSection
          mostPopular={false}
          tierName="Basic"
          numSessionCredits={500}
          price={120}
          contactSales={false}
        />
        <MobileTierSection
          mostPopular={false}
          tierName="Basic"
          numSessionCredits={500}
          price={120}
          contactSales={true}
        />
      </Slider>
    </div>
  );
};

const MobileTierSection = ({
  tierName,
  numSessionCredits,
  price,
  contactSales,
  mostPopular,
}: {
  mostPopular: boolean;
  tierName: string;
  numSessionCredits: number;
  price: number;
  contactSales: boolean;
}) => {
  return (
    <div className={styles.mobileTierSectionWrapper}>
      <div className={styles.mobileTier}>
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
