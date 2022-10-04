import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import styles, {
  thumbnail,
} from '../../components/Customers/CustomersList.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import navbarStyles from '../../components/common/Navbar/Navbar.module.scss';
import Footer from '../../components/common/Footer/Footer';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import { Typography } from '../../components/common/Typography/Typography';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';

// Hides the page in production and renders it in dev. More info:
// https://linear.app/highlight/issue/HIG-2510/temporarily-update-customers-functionality
export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }

  return { props: {} };
};

const Customers: NextPage = () => {
  // Temporary list until this is fetched from cms
  const placeholderCompanies = [
    'pipe',
    'portal',
    'dripos',
    'knock',
    'hightouch',
    'impira',
    'mage',
    'airplane',
    'pipe',
    'portal',
    'dripos',
    'knock',
    'hightouch',
    'impira',
    'mage',
    'airplane',
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.caseListLayout}>
          <div className={styles.caseListTitle}>
            <span style={{ color: 'var(--color-selected-light)' }}>
              <Typography type="outline">Customer case studies</Typography>
            </span>
            <h1>
              What{' '}
              <span style={{ color: 'var(--color-selected-light)' }}>
                our customers
              </span>{' '}
              have to say.
            </h1>
            <PrimaryButton>Get started for free</PrimaryButton>
          </div>
          <div className={styles.caseList}>
            <CustomerCaseCard
              logo="/images/companies/impira.png"
              thumbnail="/images/avatars/secoda.jpg"
              quote="Suspendisse a pellentesque nulla, eu mattis erat. Aliquam erat volutpat. Donec non cursus velit."
              author="Harry Hurst"
              role="Co-founder"
              slug="case"
            />
            <CustomerCaseCard
              logo="/images/companies/portal.png"
              thumbnail="/images/avatars/secoda.jpg"
              quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu est nec sapien porta luctus. Aliquam magna risus, vulputate at laoreet sodales, laoreet eu ante."
              author="Harry Hurst"
              role="Co-founder"
              slug="case"
            />
            <CustomerCaseCard
              logo="/images/companies/pipe.png"
              thumbnail="/images/avatars/secoda.jpg"
              quote="Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I’d recommend Highlight to any team that wants to ship fast."
              author="Harry Hurst"
              role="Co-founder"
              slug="case"
            />
          </div>
          <h2>See all our customers</h2>
          <div className={styles.allCustomersGrid}>
            {placeholderCompanies.map((logo, i) => (
              <CompanyLogo companyImage={logo} key={i} />
            ))}
          </div>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

const CompanyLogo = ({ companyImage }: { companyImage: string }) => {
  return (
    <div className={styles.allCustomersLogo}>
      <Image
        src={`/images/companies/${companyImage}.png`}
        alt={`${companyImage} logo`}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

const CustomerCaseCard = ({
  thumbnail,
  logo,
  quote,
  author,
  role,
  slug,
}: {
  thumbnail: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  slug: string;
}) => {
  return (
    <div className={styles.caseCard}>
      <div className={styles.thumbnail}>
        <Image
          src={thumbnail}
          layout="fill"
          objectFit="cover"
          alt="Case thumbnail"
        />
      </div>
      <div className={styles.caseDetails}>
        <div className={styles.companyCaseLogo}>
          <Image
            src={logo}
            alt="Company logo"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>
        <div className={styles.caseCardQuote}>
          <blockquote>
            <h4 className={styles.leftQuote}>“</h4>
            <Typography type="copy2" onDark>
              {quote}
            </Typography>
            <h4 className={styles.rightQuote}>”</h4>
          </blockquote>
          <span>
            <Typography type="copy2" emphasis>
              {author},
            </Typography>{' '}
            <Typography type="copy2">{role}</Typography>
          </span>
        </div>
        <PrimaryButton
          href={`/customers/${slug}`}
          className={styles.cardReadCaseButton}
        >
          Read case study
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Customers;
