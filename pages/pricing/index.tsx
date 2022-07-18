import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import CheckMark from '../../public/images/checkmark.svg';
import Chat from '../../public/images/pricing-comment.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import styles from '../../components/Pricing/Pricing.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import SvgCheckmarkCircle from '../../public/images/CheckmarkCircle';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { Typography } from '../../components/common/Typography/Typography';
import { PrimaryLink } from '../../components/common/Buttons/SecondaryButton';
import { features } from 'process';
import { useState } from 'react';

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
  return (
    <div>
      <Head>
        <title>Highlight - Plans and Pricing</title>
        <meta name="description" content="Highlight - Plans and Pricing" />
      </Head>
      <Navbar />
      <main>
        <Section>
          <div className={styles.anchorFeature}>
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
        <Section className={styles.tierWrapper}>
          <div className={styles.configColumn}>
            <div className={styles.billingWidget}>
              <Typography type="copy3" className={styles.billingCopy}>
                Select billing cycle
              </Typography>
              <div className={styles.billingWidgetButtons}>
                <PrimaryButton
                  className={classNames(
                    styles.billingButton,
                    styles.leftButton,
                    {
                      [styles.selected]: monthly,
                    }
                  )}
                  onClick={() => setMonthly(true)}
                >
                  Monthly
                </PrimaryButton>
                <PrimaryButton
                  className={classNames(
                    styles.billingButton,
                    styles.rightButton,
                    {
                      [styles.selected]: !monthly,
                    }
                  )}
                  onClick={() => setMonthly(false)}
                >
                  Annual
                </PrimaryButton>
              </div>
            </div>
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
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

interface TierInfoObject {
  tierName: string;
  basePrice: number;
  seatPrice: number;
  buttonText: string;
}

const TierInfo = ({
  tierName,
  basePrice,
  seatPrice,
  buttonText,
}: TierInfoObject) => {
  return (
    <div>
      <div className={styles.tierInfo}>
        <span className={styles.tierName}>{tierName}</span>
        <div className={styles.tierPrice}>
          <span className={styles.priceNum}>{`$${basePrice + seatPrice}`}</span>
          <span className={classNames(styles.priceDuration, styles.tableBody)}>
            /month
          </span>
        </div>
        <PrimaryButton
          className={styles.startTrial}
          href="https://app.highlight.run/?sign_up=1"
        >
          {buttonText}
        </PrimaryButton>
        <div className={styles.pricingBreakdown}>
          <div className={styles.tierInfo}>
            <span>Base Price</span>
            <span className={styles.tableBody}>billed monthly</span>
          </div>
          <div>{`$${basePrice}`}</div>
        </div>
        <div className={styles.pricingBreakdown}>
          <div className={styles.tierInfo}>
            <span>Seat Pricing</span>
            <span className={styles.tableBody}>billed monthly</span>
          </div>
          <div>{`$${seatPrice}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
