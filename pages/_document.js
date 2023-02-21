// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class HighlightDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
          {/* From the "Highlight Main Site" gtag */}
          <NextScript async src="https://www.googletagmanager.com/gtag/js?id=G-P2T64QS94S"></NextScript>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('set', 'linker', {
              'domains': ['app.highlight.io']
            });
            gtag('js', new Date());

            gtag('config', 'G-P2T64QS94S');
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          gtag('config', 'AW-10833687189');
          `,
            }}
          ></script>
        </Head>
        <body style={{ overflowX: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default HighlightDocument
