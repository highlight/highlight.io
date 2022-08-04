import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import styles from '../../components/Doc/Doc.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { DocPost, Post } from '../../components/Doc/DocPost/DocPost';
import { GraphQLClient, gql } from 'graphql-request';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import { useEffect, useState } from 'react';
import Paginate from '../../components/common/Paginate/Paginate';
import { GetServerSideProps, GetStaticProps } from 'next';
import Link from 'next/link';
import classNames from 'classnames';
import { DocPostSmall } from '../../components/Doc/DocPostSmall/DocPostSmall';
import { Typography } from '../../components/common/Typography/Typography';

const ITEMS_PER_PAGE = 5;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Doc = ({}: {}) => {
  return (
    <>
      <Head>
        <title>Docs</title>
        <meta name="description" content="TODO." />
      </Head>
      <Navbar />
      <main>hello world</main>
      <Footer />
    </>
  );
};

export default Doc;
