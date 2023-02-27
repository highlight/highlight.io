---
title: Cloudflare Worker Backend
slug: cloudflare
createdAt: 2022-10-24T20:36:04.000Z
updatedAt: 2022-10-25T19:42:49.000Z
---

Highlight ships `@highlight-run/cloudflare` which tracks errors and forwards logs from your Cloudflare Workers.

## Getting Started

This backend SDK requires one of our [Client SDK](../1_overview.md#for-your-frontend)s to be installed, so please follow the instructions there if you have not done so.

For server-side linking to Highlight sessions, your client-side call to `H.init` should include the `tracingOrigins` setting. See [H.init()](../../sdk/client.md#Hinit) for more details.

```typescript
H.init('<YOUR_PROJECT_ID>', {
    ...
    tracingOrigins: true,
    ...
});
```

## Adding Highlight to your Cloudflare Worker Backend

First, import the package

```shell
# with npm
npm install @highlight-run/cloudflare

# with yarn
yarn add @highlight-run/cloudflare
```

### Handle errors

When your app throws a backend error, you can log that error to Highlight by calling [H.consumeError()](../../sdk/cloudflare.md#Hconsume-error). Your cloudflare worker code would look something like this:

```typescript
import { H } from '@highlight-run/cloudflare'

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
}
```

All Highlight data submission uses [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/fetch-event/#waituntil) to make sure that we have no impact on request handling performance.

### Verify

To view and resolve the recorded error, log into [app.highlight.io/errors](https://app.highlight.io/errors) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved. You can also view frontend sessions where the error was thrown, and see the individual request which caused the error.

For more details, check out the [SDK docs](../../sdk/cloudflare.md).
