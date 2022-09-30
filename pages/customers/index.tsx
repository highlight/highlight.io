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
  // if (process.env.NODE_ENV === 'production') {
  //   return { notFound: true };
  // }

  return { props: {} };
};

const Customers: NextPage = () => {
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
              logo=""
              thumbnail="/images/avatars/secoda.jpg"
              quote="Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I’d recommend Highlight to any team that wants to ship fast."
              author="Harry Hurst"
              role="Co-founder"
              slug="case"
            />
            <CustomerCaseCard
              logo=""
              thumbnail="/images/avatars/secoda.jpg"
              quote="Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I’d recommend Highlight to any team that wants to ship fast."
              author="Harry Hurst"
              role="Co-founder"
              slug="case"
            />
            <CustomerCaseCard
              logo=""
              thumbnail="/images/avatars/secoda.jpg"
              quote="Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I’d recommend Highlight to any team that wants to ship fast."
              author="Harry Hurst"
              role="Co-founder"
              slug="case"
            />
          </div>
          <h2>See all our customers</h2>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

const CustomerCaseCard = ({
  quote,
  thumbnail,
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
        <div className={styles.caseCardQuote}>
          <blockquote>
            <Typography type="copy2" onDark>
              {quote}
            </Typography>
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
          className={navbarStyles.signUpButton}
        >
          Read case study
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Customers;
