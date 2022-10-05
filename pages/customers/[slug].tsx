import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { Author } from '../../components/Blog/BlogPost/BlogPost';
import { graphcms } from '../blog';

interface Customer {
  slug: string;
  image?: {
    url: string;
  };
  name: string;
  caseStudy: {
    markdown: string;
    raw: any;
  };
  quote: {
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
        slug
        image {
          url
        }
        name
        caseStudy {
          raw
          markdown
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

  return {
    props: { customer: data.customer },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const CustomerPage = ({ customer }: { customer: Customer }) => {
  return <div>{JSON.stringify(customer)}</div>;
};

export default CustomerPage;
