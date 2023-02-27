import { QuickStartContent, QuickStartStep } from '../QuickstartContent'
import {
  backendInstrumentationLink,
  configureSourcemapsCI,
  identifySnippet,
  initializeSnippet,
  setupBackendSnippet,
  verifySnippet,
} from './shared-snippets'

const ErrorBoundaryCodeSnippet = `import { ErrorBoundary } from '@highlight-run/react';

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
);`

const link = 'https://www.highlight.io/docs/getting-started/fullstack-frameworks/next-js/env-variables'
export const configureSourcemapsNext: QuickStartStep = {
  title: 'Configure sourcemaps in CI. (optional)',
  content: `To get properly enhanced stacktraces of your javascript app, we recommend instrumenting sourcemaps. If you deploy public sourcemaps, you can skip this step. Refer to our docs on [sourcemaps](${link}) to read more about this option.`,
  code: {
    text: `# Upload sourcemaps to Highlight
...
npx --yes @highlight-run/sourcemap-uploader upload --apiKey $\{YOUR_ORG_API_KEY\} --path ./build
...
        `,
    language: 'bash',
  },
}

export const NextContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io with your Next (frontend) application.',
  entries: [
    {
      title: 'Install the npm package & SDK.',
      content: 'Install the npm package `highlight.run` in your terminal.',
      code: {
        text: `# with npm 
npm install highlight.run @highlight-run/react

# with yarn
yarn add highlight.run @highlight-run/react`,
        language: 'bash',
      },
    },
    initializeSnippet,
    {
      title: 'Add the ErrorBoundary component. (optional)',
      content: `The ErrorBoundary component wraps your component tree and catches crashes/exceptions from your react app. When a crash happens, if \`showDialog\` is set, your users will be prompted with a modal to share details about what led up to the crash. Read more [here](https://google.com)`,
      code: {
        text: ErrorBoundaryCodeSnippet,
        language: 'js',
      },
    },
    identifySnippet,
    verifySnippet,
    configureSourcemapsNext,
    setupBackendSnippet,
  ],
}
