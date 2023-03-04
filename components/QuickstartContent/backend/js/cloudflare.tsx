import { QuickStartContent } from '../../QuickstartContent'
import { frontendInstallSnippet } from '../shared-snippets'
import { initializeNodeSDK, jsGetSnippet, setupLogging, verifyError } from './shared-snippets'

export const JSCloudflareContent: QuickStartContent = {
  subtitle: 'Learn how to set up highlight.io in Cloudflare Workers.',
  entries: [
    frontendInstallSnippet,
    jsGetSnippet('cloudflare'),
    initializeNodeSDK('cloudflare'),
    {
      title: `Add the Cloudflare Worker Highlight integration.`,
      content:
        'Use the Cloudflare Highlight SDK in your response handler. ' +
        'The `sendResponse` method traces successful requests while `consumeError` reports exceptions. ' +
        'All Highlight data submission uses [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/fetch-event/#waituntil) to make sure that we have no impact on request handling performance.',
      code: {
        text: `import { H } from '@highlight-run/cloudflare'

async function doRequest() {
  return new Response('hello!')
}

export default {
  async fetch(request: Request, env: {}, ctx: ExecutionContext) {
    const hEnv = { HIGHLIGHT_PROJECT_ID: 'YOUR_PROJECT_ID' }
    try {
      const response = await doRequest()
      H.sendResponse(request, hEnv, ctx, response)
      return response
    } catch (e: any) {
      H.consumeError(request, hEnv, ctx, e)
      throw e
    }
  },
}`,
        language: `js`,
      },
    },
    verifyError(
      'cloudflare',
      `export default {
  async fetch(request: Request, env: {}, ctx: ExecutionContext) {
    H.consumeError(request, { HIGHLIGHT_PROJECT_ID: 'YOUR_PROJECT_ID' }, ctx, new Error('example error!'))
  },
}`,
    ),
    setupLogging('cloudflare'),
  ],
}
