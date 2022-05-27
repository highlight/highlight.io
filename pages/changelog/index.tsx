import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Blog/Blog.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { gql } from 'graphql-request';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { useEffect, useState } from 'react';
import Paginate from '../../components/common/Paginate/Paginate';
import { GetServerSideProps } from 'next';
import { graphcms } from '../blog';
import {
  ChangelogEntry,
  Entry,
} from '../../components/Changelog/ChangelogEntry/ChangelogEntry';

const ITEMS_PER_PAGE = 25;

export const getServerSideProps: GetServerSideProps = async () => {
  const QUERY = gql`
    query GetChangelogs {
      changelogs(orderBy: createdAt_DESC) {
        slug
        title
        createdAt
        content
      }
    }
  `;

  const { changelogs } = await graphcms.request(QUERY);

  return {
    props: {
      changelogs,
    },
  };
};

const Changelog = ({ changelogs }: { changelogs: Array<never> }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount] = useState(Math.ceil(changelogs.length / ITEMS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentItems(
      changelogs.slice(
        ITEMS_PER_PAGE * (currentPage - 1),
        Math.min(ITEMS_PER_PAGE * currentPage, changelogs.length)
      )
    );
  }, [currentPage, changelogs]);

  return (
    <>
      <Head>
        <title>Highlight Changelog</title>
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
            <h1>Changelog</h1>
          </div>
        </Section>
        <div className={styles.blogContainer}>
          {currentItems.map((p: Entry, i: number) => (
            <ChangelogEntry {...p} key={i} />
          ))}
          <Paginate
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageRangeDisplayed={5}
            pageCount={pageCount}
          />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Changelog;
