import { QuickStartStep } from '../../QuickstartContent'

export const jsGetSnippet: (slug: string) => QuickStartStep = (slug) => ({
  title: 'Install the Highlight JS SDK.',
  content: `Install the @highlight-run/${slug} package with your package manager.`,
  code: {
    text: `# with yarn
yarn add @highlight-run/${slug}

# with pnpm
pnpm add @highlight-run/${slug}

# with npm 
npm install @highlight-run/${slug}`,
    language: 'bash',
  },
})

export const initializeNodeSDK: (slug: string) => QuickStartStep = (slug) => ({
  title: 'Initialize the Highlight JS SDK.',
  content: `Initialize the Highlight JS SDK with your project ID.`,
  code: {
    text: `import { H } from '@highlight-run/node'

H.init({projectID: 'YOUR_PROJECT_ID')`,
    language: 'js',
  },
})

export const verifyError: (name: string, code?: string) => QuickStartStep = (name, code) => ({
  title: 'Verify that your SDK is reporting errors.',
  content:
    `You'll want to throw an exception in one of your ${name} handlers. ` +
    `Access the API handler and make sure the error shows up in [Highlight](https://app.highlight.run/errors).`,
  ...(code
    ? {
        code: {
          text: code,
          language: `js`,
        },
      }
    : {}),
})

export const manualError = {
  title: 'Optionally, report manual errors in your app.',
  content: `If you need to report exceptions outside of a handler, use the Highlight SDK.`,
  code: {
    text: `const parsed = H.parseHeaders(request.headers)
	H.consumeError(error, parsed?.secureSessionId, parsed?.requestId)`,
    language: 'js',
  },
}

export const setupLogging: (slug: string) => QuickStartStep = (slug) => ({
  title: 'Set up logging.',
  content: `Start sending logs to Highlight! Follow the [logging setup guide](../../../getting-started/backend-logging/js/${slug}) to get started.`,
})
