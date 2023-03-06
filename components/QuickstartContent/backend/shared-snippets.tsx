import { QuickStartStep } from '../QuickstartContent'

export const frontendInstallSnippet: QuickStartStep = {
  title: 'Set up your frontend Highlight snippet.',
  content:
    "This backend SDK requires one of the Highlight frontend SDKs to be installed, so please make sure you've followed the [fullstack mapping guide](../../../getting-started/frontend-backend-mapping#How-can-I-start-using-this) first.",
  code: {
    text: `H.init("<YOUR_PROJECT_ID>", {
  tracingOrigins: ['localhost', 'example.myapp.com/backend'],
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
  },
});`,
    language: 'js',
  },
}
