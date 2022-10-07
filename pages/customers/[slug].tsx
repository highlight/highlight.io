import { RichText } from '@graphcms/rich-text-react-renderer';
import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { Author } from '../../components/Blog/BlogPost/BlogPost';
import { CustomerQuote } from '../../components/Customers/CustomerQuote/CustomerQuote';
import { graphcms } from '../blog';
import style from '../../components/Customers/Customers.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '../../components/common/Typography/Typography';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Footer from '../../components/common/Footer/Footer';
import Navbar from '../../components/common/Navbar/Navbar';
import ReturnIcon from '../../public/images/ReturnIcon';
import basedashLogo from '../../public/images/companies/basedash.png'; // placeholder

interface Customer {
  slug: string;
  image?: {
    url: string;
  };
  name: string;
  caseStudy: {
    markdown: string;
    raw: { children: any[] };
    references: {
      id: string;
      body: string;
      author: Author;
    }[];
  };
  quote: {
    id: string;
    body: string;
    author: Author;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const QUERY = gql`
    {
      customers {
        slug
      }
    }
  `;
  const { customers } = await graphcms.request(QUERY);

  return {
    paths: customers.map((p: { slug: string }) => ({
      params: { slug: p.slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const QUERY = gql`
    query GetCustomer($slug: String!) {
      customer(where: { slug: $slug }) {
        id
        slug
        image {
          url
        }
        name
        caseStudy {
          raw
          markdown
          references {
            ... on Quote {
              id
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
        primaryQuote {
          body
          author {
            firstName
            lastName
            title
            twitterLink
            linkedInLink
            githubLink
            personalWebsiteLink
            profilePhoto {
              url
            }
          }
        }
      }
    }
  `;

  const data = await graphcms.request(QUERY, { slug: slug });

  // Handle event slugs which don't exist in our CMS
  if (!data.customer) {
    return {
      notFound: true,
    };
  }

  // Pagination
  const PAGES_QUERY = gql`
    query GetPages($id: String!) {
      previousCase: customers(last: 1, before: $id) {
        slug
      }
      nextCase: customers(first: 1, after: $id) {
        slug
      }
    }
  `;

  const pageData = await graphcms.request(PAGES_QUERY, {
    id: data.customer.id,
  });

  return {
    props: {
      customer: data.customer,
      previousCase: pageData.previousCase.shift() ?? null,
      nextCase: pageData.nextCase.shift() ?? null,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const CustomerPage = ({
  customer,
  previousCase,
  nextCase,
}: {
  customer: Customer;
  previousCase: { slug: string } | null;
  nextCase: { slug: string } | null;
}) => {
  return (
    <>
      <Navbar />
      <main>
        <div className={style.detailsLayout}>
          <div className={style.caseBackLink}>
            <Link href="/customers">
              <a>
                <ReturnIcon />
                All customers
              </a>
            </Link>
          </div>
          <div className={style.caseContent}>
            <div className={style.caseTitle}>
              <span className={style.caseOverline}>Customer Case Study</span>
              <h2>{customer.name}</h2>
            </div>
            <RichText
              content={customer.caseStudy.raw}
              references={customer.caseStudy.references} // placeholder
              renderers={{
                embed: {
                  Quote(props) {
                    const { id, body, author } = props as Customer['quote'];
                    return (
                      <CustomerQuote
                        key={id}
                        content={body}
                        author={`${author.firstName} ${author.lastName}`}
                        role={author.title}
                        authorAvatar={author.profilePhoto.url}
                      />
                    );
                  },
                },
              }}
            />

            <div className={style.casePageLinks}>
              {previousCase?.slug ? (
                <PageLink label="Previous Customer" slug={previousCase.slug} />
              ) : (
                <div />
              )}
              {nextCase?.slug && (
                <PageLink label="Next Customer" slug={nextCase.slug} />
              )}
            </div>
          </div>
          <div className={style.caseCustomerDetails}>
            <div className={style.caseDetailsLogo}>
              <Image
                src={`/images/companies/${customer.slug}.png`}
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                alt="Company Logo"
              />
            </div>
            <div className={style.caseDetailsBody}>
              <CustomerDetailsSection
                label="About the company"
                body="placeholder"
              />
              <CustomerDetailsSection label="Founded" body="9999" />
              <CustomerDetailsSection
                label="Using Highlight since"
                body="placeholder"
              />
            </div>
          </div>
        </div>
      </main>
      <FooterCallToAction />
      <Footer />
    </>
  );
};

const PageLink = ({ label, slug }: { label: string; slug: string }) => (
  <Link href={`/customers/${slug}`}>
    <a>
      <div className={style.casePageLink}>
        <Typography type="copy2" emphasis>
          {label}
        </Typography>

        <Image
          src={`/images/companies/${slug}.png`}
          width="187px"
          height="32px"
          objectFit="contain"
          objectPosition="left"
          alt={`${slug} logo`}
        />
      </div>
    </a>
  </Link>
);

const CustomerDetailsSection = ({
  label,
  body,
}: {
  label: string;
  body: string;
}) => (
  <div className={style.caseDetailsBlock}>
    <Typography type="copy3" emphasis>
      {label}
    </Typography>
    <Typography type="copy3">
      <span className={style.caseDetailsSecitonText}>{body}</span>
    </Typography>
  </div>
);

export default CustomerPage;
