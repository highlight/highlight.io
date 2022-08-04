import Router from 'next/router';
import nProgress from 'nprogress';

import '../styles/globals.scss';
import '../styles/nprogress.css';
import '../styles/public.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';
import MetaImage from '../public/images/meta-image.jpg';

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
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:site" content="https://www.highlight.io" />
      <meta name="twitter:creator" content="@highlightrun" />

      {/* Open Graph */}
      <meta property="og:url" content={'highlight.io'} key="ogurl" />
      <meta property="og:image" content={MetaImage.src} key="ogimage" />
      <meta property="og:site_name" content={'Highlight'} key="ogsitename" />
      <meta property="og:title" content={'Highlight: Homepage'} key="ogtitle" />
      <meta
        property="og:description"
        content={
          'Highlight removes the mystery of debugging through automatic session replay, error stack tracing, collaboration, and search. Never debug in the dark again.'
        }
        key="ogdesc"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
