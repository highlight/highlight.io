import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import styles from '../../components/Pricing/Pricing.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import SvgCheckmarkCircle from '../../public/images/CheckmarkCircle';

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

const Pricing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pricing - Highlight</title>
        <meta name="description" content="Stop debugging in the dark. " />
      </Head>
      <div className={homeStyles.bgPosition}>
        <div className={homeStyles.purpleDiv}>
          <Image src={PurpleGradient} alt="" />
        </div>
        <div className={homeStyles.blueDiv}>
          <Image src={BlueGradient} alt="" />
        </div>
      </div>
      <Navbar />
      <main>
        <Section>
          <div className={homeStyles.anchorTitle}>
            <h1>Pricing</h1>
            <p className={homeStyles.bodyLarge}>
              {`Highlight's plans scale for any organization—from startups to Fortune 500s.`}
            </p>
          </div>
        </Section>
        <Section>
          <div className={styles.mobileTiers}>
            <div className={styles.mobileTierCard}>
              <TierInfo
                tierName="Free"
                basePrice={0}
                seatPrice={0}
                buttonText="Get Started"
              />
            </div>
            <div className={styles.mobileTierCard}>
              <TierInfo
                tierName="Basic"
                basePrice={100}
                seatPrice={0}
                buttonText="Start Trial"
              />
            </div>
            <div className={styles.mobileTierCard}>
              <TierInfo
                tierName="Startup"
                basePrice={300}
                seatPrice={0}
                buttonText="Start Trial"
              />
            </div>
            <div className={styles.mobileTierCard}>
              <TierInfo
                tierName="Enterprise"
                basePrice={1000}
                seatPrice={0}
                buttonText="Schedule Demo"
              />
            </div>
          </div>
          <div className={styles.tableCard}>
            <div className={styles.pricingTable}>
              <div></div>
              <TierInfo
                tierName="Free"
                basePrice={0}
                seatPrice={0}
                buttonText="Get Started"
              />
              <TierInfo
                tierName="Basic"
                basePrice={100}
                seatPrice={0}
                buttonText="Start Trial"
              />
              <TierInfo
                tierName="Startup"
                basePrice={300}
                seatPrice={0}
                buttonText="Start Trial"
              />
              <TierInfo
                tierName="Enterprise"
                basePrice={1000}
                seatPrice={0}
                buttonText="Schedule Demo"
              />
              <span>Quotas</span>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <span className={styles.tableBody}>Session Credits</span>
              <span>500</span>
              <span>10,000</span>
              <span>80,000</span>
              <span>200,000+</span>
              <span className={styles.tableBody}>Included Seats</span>
              <span>Unlimited</span>
              <span>2</span>
              <span>8</span>
              <span>12</span>
              <span className={styles.tableBody}>Session Overage Rate</span>
              <span>$5 / 1k sessions / mo</span>
              <span>$5 / 1k sessions / mo</span>
              <span>$5 / 1k sessions / mo</span>
              <span>$5 / 1k sessions / mo</span>
              <span className={styles.tableBody}>Data Retention</span>
              <span>1 month</span>
              <span>Custom</span>
              <span>Custom</span>
              <span>Custom</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Features</span>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <span className={styles.tableBody}>Public Session Sharing</span>
              <span>-</span>
              <span>-</span>
              <span>
                <SvgCheckmarkCircle className={styles.checkmark} />
              </span>
              <span>
                <SvgCheckmarkCircle className={styles.checkmark} />
              </span>
              <span className={styles.tableBody}>Custom Data Export</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>Enhanced User Properties</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>
                Session / Error Commenting
              </span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Team Management</span>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <span className={styles.tableBody}>
                Role-Based Access Control
              </span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>Single Sign-On</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>
                Two-Factor Authentication
              </span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Support</span>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <span className={styles.tableBody}>Email</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>Intercom</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>Slack Connect</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span className={styles.tableBody}>24x7 Support with SLAs</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;
