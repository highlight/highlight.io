---
title: withHighlightConfig()
slug: qhaF-withhighlightconfig
createdAt: 2022-10-13T18:11:25.000Z
updatedAt: 2022-10-18T21:48:45.000Z
---

```typescript
withHighlightConfig = (config: NextConfig, highlightOpts?: HighlightConfigOptions): NextConfig
```

## Purpose

You can wrap your `next.config.js` settings with this function to automatically configure source map uploading and creating a rewrite to proxy Highlight requests. This function:

*   Sets `productionBrowserSourceMaps=true`

*   Adds a rewrite rule to return HTTP 404 for any `.map`  files (to keep source map files private)

*   Uploads source maps to Highlight following any production build

*   Adds a rewrite rule from `/highlight-events`  to `pub.highlight.run` for Highlight request proxying

## Example Usage

```javascript
import { withHighlightConfig } from "@highlight-run/next";
export default withHighlightConfig({
	// your next.config.js options here
})
```

## Options

`uploadSourceMaps` : optional boolean

*   Explicitly enable or disable source map uploading during production builds. By default, source maps are uploaded if both:
    *   `NextConfig.productionBrowserSourceMaps
        ` is not true


    *   An API key is set through the&#x20;
        `apiKey
        ` option or&#x20;
        `HIGHLIGHT_SOURCEMAP_UPLOAD_API_KEY
        ` environment variable


`configureHighlightProxy` : optional boolean, default true

*   Configures a rewrite at `/highlight-events` for proxying Highlight requests.

`apiKey` : optional string

*   API key used to link to your Highlight project when uploading source maps. This can also be set through the `HIGHLIGHT_SOURCEMAP_UPLOAD_API_KEY` environment variable.

`appVersion` : optional string

*   App version used when uploading source maps.

`sourceMapsPath` : optional string, default '.next/'

*   File system root directory containing all your source map files.

`sourceMapsBasePath` : optional string default '\_next/'

*   Base path to append to your source map URLs when uploaded to Highlight.

