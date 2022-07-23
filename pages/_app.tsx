import Router from 'next/router';
import nProgress from 'nprogress';

import '../styles/globals.scss';
import '../styles/nprogress.css';
import '../styles/public.css';

import type { AppProps } from 'next/app';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
