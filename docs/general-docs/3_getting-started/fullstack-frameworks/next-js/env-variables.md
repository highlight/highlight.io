---
title: Sourcemap Uploading
slug: nextjs-sdk
createdAt: 2022-04-01T20:28:06.000Z
updatedAt: 2022-10-18T22:40:13.000Z
---

## On Vercel
If you are running your Next.js app in [Vercel](https://vercel.app/), you can install [our integration](https://vercel.com/integrations/highlight) to automatically inject the `HIGHLIGHT_SOURCEMAP_UPLOAD_API_KEY` environment variable. Add it to your project and configure it from the link above to inject the necessary environment variables.

## Other Cloud Providers
If you are not using Vercel or would like to configure this manually, you can set an environment variable manually: `HIGHLIGHT_SOURCEMAP_UPLOAD_API_KEY = <your API key>`, where your API key can be found in the source map section of <https://app.highlight.run/settings/errors>.