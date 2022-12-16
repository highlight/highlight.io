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
import { H } from 'highlight.run';
import { useEffect } from 'react';
import { rudderInitialize } from '../scripts/rudder-initialize';
import { SSRProvider } from 'react-aria';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', () => {
  if (window.rudderanalytics) {
    window.rudderanalytics?.page();
  }

  nProgress.done();
});

H.init('4d7k1xeo', {
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
  },
  tracingOrigins: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initialize = async () => {
      await rudderInitialize();
      window.rudderanalytics?.page();
      window.rudderanalytics?.identify();
    };

    initialize();
  }, []);

  return (
    <SSRProvider>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P4GK7XG');
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
    </SSRProvider>
  );
}

export default MyApp;
