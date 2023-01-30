// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class HighlightDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					></link>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin
					></link>
					<link
						href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4GK7XG" height="0" width="0" style="display: none; visibility: hidden;" />`,
						}}
					/>
				</body>
			</Html>
		)
	}
}

export default HighlightDocument
