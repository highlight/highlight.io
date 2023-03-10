import { QuickStartContent } from '../QuickstartContent'
import {
  configureSourcemapsCI,
  identifySnippet,
  initializeSnippet,
  packageInstallSnippet,
  sessionReplayFeaturesLink,
  setupBackendSnippet,
  verifySnippet,
} from './shared-snippets'

const angularInitCodeSnippet = `// app.module.ts
    import { NgModule } from '@angular/core';
...

import { H } from 'highlight.run';

H.init('<YOUR_PROJECT_ID>', {
    environment: 'production',
    appVersion: 'commit:abcdefg12345',
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
        urlBlocklist: [
            // insert urls you don't want to record here
        ],
	},
});

@NgModule({
    ...
})
export class AppModule { }
`

export const AngularContent: QuickStartContent = {
  title: 'Angular',
  subtitle: 'Learn how to set up highlight.io with your Angular application.',
  entries: [
    packageInstallSnippet,
    {
      ...initializeSnippet,
      code: {
        ...initializeSnippet.code,
        text: angularInitCodeSnippet,
        language: initializeSnippet.code?.language ?? 'js',
      },
    },
    {
      title: 'Initialize the SDK in your frontend.',
      content: `Grab your project ID from [app.highlight.io/setup](https://app.highlight.io/setup) and insert it in place of \`<YOUR_PROJECT_ID>\`.  
                        To get started, we recommend setting \`environment\`, \`appVersion\`, and \`networkReco: inrding\`. Refer to our docs on [SDK configuration](${sessionReplayFeaturesLink}) to read more about these options. `,
      code: {
        text: angularInitCodeSnippet,
        language: 'js',
      },
    },
    identifySnippet,
    verifySnippet,
    configureSourcemapsCI(),
    setupBackendSnippet,
  ],
}
