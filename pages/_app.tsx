import Router from 'next/router';
import nProgress from 'nprogress';

import '../styles/globals.scss';
import '../styles/nprogress.css';
import '../styles/public.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';

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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
