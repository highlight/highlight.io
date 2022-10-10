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
import { gql } from 'graphql-request';
import { Author } from '../../components/Blog/BlogPost/BlogPost';
import { graphcms } from '../blog';

interface Customer {
  slug: string;
  image?: {
    url: string;
  };
  primaryQuote: {
    id: string;
    body: string;
    author: Author;
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const QUERY = gql`
    query GetCustomers() {
      customers() {
        slug
        image {
          url
        }
        primaryQuote {
          body
          author {
            firstName
            lastName
            title
            profilePhoto {
              url
            }
          }
        }
      }
    }
  `;

  const data = await graphcms.request(QUERY);

  return {
    props: {
      customers: data.customers,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const Customers = ({ customers }: { customers: Customer[] }) => {
  const expandedCustomers = customers.slice(0, 6);

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.caseListLayout}>
          <div className={styles.caseListTitle}>
            <span className={styles.limeAccent}>
              <Typography type="outline">Customer case studies</Typography>
            </span>
            <h1>
              What <span className={styles.limeAccent}>our customers</span> have
              to say.
            </h1>
            <PrimaryButton>Get started for free</PrimaryButton>
          </div>
          <div className={styles.caseList}>
            {expandedCustomers.map((c) => (
              <CustomerCaseCard
                logo={`/images/companies/${c.slug}.png`}
                author={`${c.primaryQuote.author.firstName} ${c.primaryQuote.author.lastName}`}
                quote={c.primaryQuote.body}
                role={c.primaryQuote.author.title}
                slug={c.slug}
                thumbnail={c.image?.url ?? ''}
                key={c.slug}
              />
            ))}
          </div>
          <h2>See all our customers</h2>
          <div className={styles.allCustomersGrid}>
            {customers.map(({ slug }, i) => (
              <CompanyLogo slug={slug} key={i} />
            ))}
          </div>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

const CompanyLogo = ({ slug }: { slug: string }) => {
  return (
    <div className={styles.allCustomersLogo}>
      <Image
        src={`/images/companies/${slug}.png`}
        alt={`${slug} logo`}
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
