---
title: Overview
slug: eAyE-nextjs-sdk
createdAt: 2022-04-01T20:28:06.000Z
updatedAt: 2022-10-18T22:40:13.000Z
---

The Highlight Next.js SDK adds additional features to Highlight, including:

*   server-side error monitoring and linking to Highlight sessions: [Highlight()](/getting-started/nextjs-sdk/highlight)&#x20;

*   automatic configuration of source map uploads: [withHighlightConfig()](/getting-started/nextjs-sdk/with-highlight-config)&#x20;

*   automatic proxying for Highlight requests using Next.js rewrites: [withHighlightConfig()](/getting-started/nextjs-sdk/with-highlight-config)&#x20;

## Getting Started

The features in this SDK require the Highlight client SDK to be installed, so please follow the [Next.js](/getting-started/client-sdk/nextjs) instructions if you have not yet done so.

For server-side linking to Highlight sessions, your call to `H.init` should include the `tracingOrigins` setting. If you're going to use `withHighlightConfig` and proxy your Highlight requests with a rewrite, you should set `backendUrl`. See [H.init()](/api/h-init) for more details.

```typescript
H.init('<YOUR_PROJECT_ID>', {
    ...
    tracingOrigins: true,
    backendUrl: '/highlight-events',
    ...
});
```

### Environment Variables

If you are running your Next.js app in [Vercel](https://vercel.app/), you can install [our integration](https://vercel.com/integrations/highlight) to make configuration easier. Add it to your project and configure it from the link above to inject the necessary environment variables.

If you are not using Vercel or would like to configure this manually, you can set an environment variable manually: `HIGHLIGHT_SOURCEMAP_UPLOAD_API_KEY = <your API key>`, where your API key can be found in the source map section of <https://app.highlight.run/settings/errors>.

### SDK Setup

Import the `@highlight-run/next` Package

```codeblocktabs
```shell
npm install @highlight-run/next
```

```shell
yarn add @highlight-run/next
```
```

### Wrapping your next.config.js

If you want to configure source map uploads during your production builds and enable the Next.js Highlight proxy rewrite, you can wrap your Next.js config with `withHighlightConfig`. See [withHighlightConfig()](/getting-started/nextjs-sdk/with-highlight-config) for more details.

```javascript
import { withHighlightConfig } from "@highlight-run/next";
export default withHighlightConfig({
	// your next.config.js options here
})
```

### Wrapping your API routes

If you want to monitor backend errors, this API wrapper will send your errors to Highlight and link them to the session where the network request was made. Define a `withHighlight` wrapper with any common options in a common function file. For example, you can create a `highlight.config.ts` file in the root of your next.js codebase. See [Highlight()](/getting-started/nextjs-sdk/highlight) for more details.

```typescript
import { Highlight } from "@highlight-run/next";

export const withHighlight = Highlight();
```

You can then wrap each of your handlers in the Next.js `api/` directory with the `withHighlight` function from the previous step.&#x20;

```typescript
import { withHighlight } from "../highlight.config";

const handler = async (req, res) => {
	res.status(200).json({ name: "Jay" });
};

export default withHighlight(handler);

```

