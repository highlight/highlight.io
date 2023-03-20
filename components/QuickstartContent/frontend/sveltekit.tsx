import { QuickStartContent } from '../QuickstartContent'
import {
  configureSourcemapsCI,
  identifySnippet,
  initializeSnippet,
  packageInstallSnippet,
  setupBackendSnippet,
  verifySnippet,
} from './shared-snippets'

const svelteKitInitCodeSnippet = `// hooks.client.ts
...

import { H } from 'highlight.run';

H.init('<YOUR_PROJECT_ID>', {
    environment: 'production',
    version: 'commit:abcdefg12345',
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
        urlBlocklist: [
            // insert urls you don't want to record here
        ],
	},
});
...
`

export const SvelteKitContent: QuickStartContent = {
  title: 'Svelte',
  subtitle: 'Learn how to set up highlight.io with your Svelte application.',
  entries: [
    packageInstallSnippet,
    {
      ...initializeSnippet,
      code: {
        ...initializeSnippet.code,
        text: svelteKitInitCodeSnippet,
        language: initializeSnippet.code?.language ?? 'js',
      },
    },
    identifySnippet,
    verifySnippet,
    configureSourcemapsCI(),
    setupBackendSnippet,
  ],
}
