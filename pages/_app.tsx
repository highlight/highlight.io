import Router from 'next/router';
import nProgress from 'nprogress';

import '../styles/globals.scss';
import '../styles/nprogress.css';
import '../styles/public.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';
import MetaImage from '../public/images/meta-image.jpg';
import Head from 'next/head';
import { Meta } from '../components/common/Head/Meta';
export { reportWebVitals } from 'next-axiom';


Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="ga-1"
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-P2T64QS94S"
      ></Script>
      <Script id="ga-2" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-P2T64QS94S');
            `}
      </Script>
      <Head>
        <title>
          Highlight: The Ultimate Debugging Tool For Fast-Moving Teams
        </title>

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Meta
        title="Highlight: The Ultimate Debugging Tool For Fast-Moving Teams"
        description="Highlight removes the mystery of debugging through automatic session replay, error stack tracing, collaboration, and search. Never debug in the dark again."
        absoluteImageUrl={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}${MetaImage.src}`}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
