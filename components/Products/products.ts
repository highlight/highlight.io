//all products and snippets are defined below for the product page
//referenced in ProductDropdown

export interface iProduct {
  isBackend: boolean;
  slug: string;
  title: string;
  types?: string[];
  snippets: string[];
}

const defaultFrontendSnippet: string = `
import React from 'react'
import { H } from 'highlight.run'
import { ErrorBoundary } from '@highlight-run/react'

H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root'),
)
`

const expressSnippet: string =  `
import { Highlight } from '@highlight-run/node'
// or like this with commonjs
const Highlight = require('@highlight-run/node')

const app = express()

// define any configurations needed
// <https://docs.highlight.run/api/hinit#w0-highlightoptions>
const highlightOptions = {}

// initialize the handler
const highlightHandler = Highlight.Handlers.errorHandler(highlightOptions)

// This should be before any other error middleware and after all controllers
app.use(highlightHandler)

app.use('/error', () => {
  throw new Error('a fake failure was thrown')
})
`

const goSnippet: string = `
import (
  "github.com/highlight-run/highlight-go"
)

func main() {
  //...application logic...
  highlight.Start()
  defer highlight.Stop()
  //...application logic...
}
`

const nodeSnippet: string = `
import { H } from '@highlight-run/node'

const highlightOptions = {}
if (!H.isInitialized()) {
  H.init(highlightOptions)
}
`

const nextBackendSnippet: string = `
import { withHighlight } from '../highlight.config'

const handler = async (req, res) => {
  res.status(200).json({ name: 'Jay' })
}

export default withHighlight(handler)
`

const angularSnippet: string = `
//main.ts
import { H } from 'highlight.run';

H.init(
    "<YOUR_PROJECT_ID>", // Get your project ID from https://app.highlight.run/setup
    networkRecording: {
        enabled: true,
        recordHeadersAndBody: true,
    },
    tracingOrigins: true // Optional configuration of Highlight features
);
`

const gatsbySnippet: string = `
module.exports = {
	plugins: [
		{
			resolve: '@highlight-run/gatsby-plugin-highlight',
			options: {
				orgID: '<YOUR_PROJECT_ID>', // Get your project ID from https://app.highlight.run/setup
			},
		},
	],
}
`

const htmlSnippet: string = `
<html>
	<head>
		<script src="https://cdn.jsdelivr.net/npm/highlight.run@latest"></script>
		<script>
			window.H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup
		</script>
	</head>
	<body>
		<!-- Your Application -->
	</body>
</html>
`

const nextSnippet: string = `
import type { AppProps } from 'next/app'
import { H } from 'highlight.run'
import { ErrorBoundary } from '@highlight-run/react'

H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<Component {...pageProps} />
		</ErrorBoundary>
	)
}
export default MyApp
`

const reactSnippet: string = `
import React from 'react'
import { H } from 'highlight.run'
import { ErrorBoundary } from '@highlight-run/react'

H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root'),
)
`

const vueSnippet: string = `
import { H } from 'highlight.run'
import { createApp } from 'vue'
import App from './App.vue'

H.init('9me23yd2') // Get your project ID from https://app.highlight.run/setup

createApp(App).mount('#app')
`

const svelteSnippet: string = `
... %svelte.head%

<script src="https://cdn.jsdelivr.net/npm/highlight.run@latest"></script>
<script>
	window.H.init('<YOUR_PROJECT_ID>')
</script>

...
`


export const PRODUCTS: { [k: string]: iProduct } = {
  'express': {
    isBackend: true, 
    slug: 'express',
    title: "Express",
    types: ["Backend", "Frontend"],
    snippets: [expressSnippet, defaultFrontendSnippet],
  },

  'go': {
    isBackend: true, 
    slug: 'go',
    title: "Golang",
    types: ["Backend", "Frontend"],
    snippets: [goSnippet, defaultFrontendSnippet],
  },

  'node': {
    isBackend: true, 
    slug: 'node',
    title: "Node.js",
    types: ["Backend", "Frontend"],
    snippets: [nodeSnippet, defaultFrontendSnippet],
  },

  'next-backend': {
    isBackend: true, 
    slug: 'next-backend',
    title: "Next.js",
    types: ["Backend", "Frontend"],
    snippets: [nextBackendSnippet, nextSnippet],
  }, 

  'angular': {
    isBackend: false, 
    slug: 'angular',
    title: "Angular",
    snippets: [angularSnippet],
  }, 

  'gatsby': {
    isBackend: false, 
    slug: 'gatsby',
    title: "Gatsby.js",
    snippets: [angularSnippet],
  }, 

  'html': {
    isBackend: false, 
    slug: 'html',
    title: "HTML",
    snippets: [htmlSnippet],
  }, 

  'next': {
    isBackend: false, 
    slug: 'next',
    title: "Next.js",
    types: ["Frontend", "Backend"],
    snippets: [nextSnippet, nextBackendSnippet],
  }, 

  'react': {
    isBackend: false, 
    slug: 'react',
    title: "React",
    snippets: [reactSnippet],
  }, 

  'svelte': {
    isBackend: false, 
    slug: 'svelte',
    title: "Svelte.js",
    snippets: [svelteSnippet],
  }, 

  'vue': {
    isBackend: false, 
    slug: 'vue',
    title: "Vue.js",
    snippets: [vueSnippet],
  }, 



};


