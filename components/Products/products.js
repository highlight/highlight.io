"use strict";
//all products and snippets are defined below for the product page
//referenced in ProductDropdown
exports.__esModule = true;
exports.PRODUCTS = void 0;
var defaultFrontendSnippet = "\n\nimport React from 'react'\nimport { H } from 'highlight.run'\nimport { ErrorBoundary } from '@highlight-run/react'\n\nH.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup\n\nReactDOM.render(\n\t<React.StrictMode>\n\t\t<ErrorBoundary>\n\t\t\t<App />\n\t\t</ErrorBoundary>\n\t</React.StrictMode>,\n\tdocument.getElementById('root'),\n)\n";
var expressSnippet = "\n\nimport { Highlight } from '@highlight-run/node'\n\nconst app = express()\n\n// define any configurations needed\n// <https://docs.highlight.run/api/hinit#w0-highlightoptions>\nconst highlightOptions = {}\nconst highlightHandler = Highlight.Handlers.errorHandler(highlightOptions)\napp.use(highlightHandler)\n\napp.use('/error', () => {\n  throw new Error('a fake failure was thrown')\n})\n\n";
var goSnippet = "\n\nimport (\n  \"github.com/highlight-run/highlight-go\"\n)\n\nfunc main() {\n  //...application logic...\n  highlight.Start()\n  defer highlight.Stop()\n  //...application logic...\n}\n\n\n\n\n";
var nodeSnippet = "\n\nimport { H } from '@highlight-run/node'\n\nconst highlightOptions = {}\nif (!H.isInitialized()) {\n  H.init(highlightOptions)\n}\n\nconst onError = (request, error) => {\n\tconst parsed = H.parseHeaders(request.headers)\n\tif (parsed !== undefined) {\n\t\tH.consumeError(error, parsed.secureSessionId, parsed.requestId)\n\t}\n}\n\n";
var nextBackendSnippet = "\n\nimport { withHighlight } from '../highlight.config'\n\nconst handler = async (req, res) => {\n  res.status(200).json({ name: 'Jay' })\n}\n\nexport default withHighlight(handler)\n\n\n\n\n\n\n\n";
var angularSnippet = "\n\n//main.ts\nimport { H } from 'highlight.run';\n\nH.init(\n    \"<YOUR_PROJECT_ID>\", // Get your project ID from https://app.highlight.run/setup\n    networkRecording: {\n        enabled: true,\n        recordHeadersAndBody: true,\n    },\n    tracingOrigins: true // Optional configuration of Highlight features\n);\n";
var gatsbySnippet = "\n\nmodule.exports = {\n\tplugins: [\n\t\t{\n\t\t\tresolve: '@highlight-run/gatsby-plugin-highlight',\n\t\t\toptions: {\n\t\t\t\torgID: '<YOUR_PROJECT_ID>', // Get your project ID from https://app.highlight.run/setup\n\t\t\t},\n\t\t},\n\t],\n}\n";
var htmlSnippet = "\n\n<html>\n\t<head>\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/highlight.run@latest\"></script>\n\t\t<script>\n\t\t\twindow.H.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup\n\t\t</script>\n\t</head>\n\t<body>\n\t\t<!-- Your Application -->\n\t</body>\n</html>\n";
var nextSnippet = "\n\nimport type { AppProps } from 'next/app'\nimport { H } from 'highlight.run'\nimport { ErrorBoundary } from '@highlight-run/react'\n\nH.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup\n\nfunction MyApp({ Component, pageProps }: AppProps) {\n\treturn (\n\t\t<ErrorBoundary>\n\t\t\t<Component {...pageProps} />\n\t\t</ErrorBoundary>\n\t)\n}\nexport default MyApp\n";
var reactSnippet = "\n\nimport React from 'react'\nimport { H } from 'highlight.run'\nimport { ErrorBoundary } from '@highlight-run/react'\n\nH.init('<YOUR_PROJECT_ID>') // Get your project ID from https://app.highlight.run/setup\n\nReactDOM.render(\n\t<React.StrictMode>\n\t\t<ErrorBoundary>\n\t\t\t<App />\n\t\t</ErrorBoundary>\n\t</React.StrictMode>,\n\tdocument.getElementById('root'),\n)\n";
var vueSnippet = "\n\nimport { H } from 'highlight.run'\nimport { createApp } from 'vue'\nimport App from './App.vue'\n\nH.init('9me23yd2') // Get your project ID from https://app.highlight.run/setup\n\ncreateApp(App).mount('#app')\n";
var svelteSnippet = "\n\n... %svelte.head%\n\n<script src=\"https://cdn.jsdelivr.net/npm/highlight.run@latest\"></script>\n<script>\n\twindow.H.init('<YOUR_PROJECT_ID>')\n</script>\n\n...\n";
exports.PRODUCTS = {
    'express': {
        isBackend: true,
        docsLink: "/docs/getting-started/backend-sdk/express",
        slug: 'express',
        title: "Express",
        types: ["Backend", "Frontend"],
        snippets: [expressSnippet, defaultFrontendSnippet]
    },
    'go': {
        isBackend: true,
        docsLink: "/docs/getting-started/backend-sdk/go",
        slug: 'go',
        title: "Golang",
        types: ["Backend", "Frontend"],
        snippets: [goSnippet, defaultFrontendSnippet]
    },
    'node': {
        isBackend: true,
        docsLink: "/docs/getting-started/backend-sdk/nodejs",
        slug: 'node',
        title: "Node.js",
        types: ["Backend", "Frontend"],
        snippets: [nodeSnippet, defaultFrontendSnippet]
    },
    'next-backend': {
        isBackend: true,
        docsLink: "/docs/getting-started/backend-sdk/nextjs",
        slug: 'next-backend',
        title: "Next.js",
        types: ["Backend", "Frontend"],
        snippets: [nextBackendSnippet, nextSnippet]
    },
    'angular': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/angular",
        slug: 'angular',
        title: "Angular",
        snippets: [angularSnippet]
    },
    'gatsby': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/gatsbyjs",
        slug: 'gatsby',
        title: "Gatsby.js",
        snippets: [angularSnippet]
    },
    'html': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/html",
        slug: 'html',
        title: "HTML",
        snippets: [htmlSnippet]
    },
    'next': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/nextjs",
        slug: 'next',
        title: "Next.js",
        types: ["Frontend", "Backend"],
        snippets: [nextSnippet, nextBackendSnippet]
    },
    'react': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/reactjs",
        slug: 'react',
        title: "React",
        snippets: [reactSnippet]
    },
    'svelte': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/sveltekit",
        slug: 'svelte',
        title: "Svelte.js",
        snippets: [svelteSnippet]
    },
    'vue': {
        isBackend: false,
        docsLink: "/docs/getting-started/client-sdk/vuejs",
        slug: 'vue',
        title: "Vue.js",
        snippets: [vueSnippet]
    }
};
