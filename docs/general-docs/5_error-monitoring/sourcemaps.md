---
title: Sourcemaps
slug: sourcemaps
createdAt: 2021-09-13T23:56:14.000Z
updatedAt: 2022-08-03T19:08:25.000Z
---

```hint
## Should I continue reading?

If you publicly deploy sourcemaps with your application then you do not need this guide. This guide is for applications that don't ship sourcemaps with their application.
```

When debugging an error in Highlight, it might be useful to get a stack trace from the original file in your codebase (rather than a minified file) to help understand what is going wrong. In order to do this, Highlight needs access to the sourcemaps from your codebase. Sourcemaps can be sent to Highlight in your CI/CD process.

## Sending Sourcemaps to Highlight

The Highlight [sourcemap-uploader](https://www.npmjs.com/package/@highlight-run/sourcemap-uploader) can be used during your CI/CD process. Here's an example of using it:

```shell
#!/bin/sh

# Build the app
yarn build

# Upload sourcemaps to Highlight
# Add --appVersion "..." if you provide a version value in your H.init call.
npx --yes @highlight-run/sourcemap-uploader upload --apiKey ${YOUR_ORG_API_KEY} --path ./build

# Delete sourcemaps to prevent them from being deployed
find build -name '*.js.map' -type f -delete

# Deploy the app
./custom-deploy-script
```

## `Sourcemap-uploader Arguments`

### `apiKey`

The API key for your project. You can find this in the [project settings](https://app.highlight.run/settings/errors#sourcemaps).

## `path`

The path that Highlight will use to send `.map` files. The default value is `./build`.

## `appVersion`

The version of your current deployment. Please provide the same version value as the value you provide for `version` in [H.init()](/sdk/client#Hinit). This ensures that we're always using the same set of sourcemaps for your current bundle. If omitted, sourcemaps are uploaded as `unversioned` (make sure [H.init()](/sdk/client#Hinit) does not have a `version` option provided).

## Generating Sourcemaps

To use the Highlight [sourcemap-uploader](https://www.npmjs.com/package/@highlight-run/sourcemap-uploader) , you need to be generating [sourcemaps](https://developer.chrome.com/blog/sourcemaps/) for your project. Exactly how to do this depends on your target environment and javascript configuration. Bundlers like [babel](https://babeljs.io/docs/en/options#source-map-options), [webpack](https://webpack.js.org/configuration/devtool/), [esbuild](https://esbuild.github.io/api/#sourcemap), or [rollup](https://rollupjs.org/guide/en/#outputoptions-object) all provide different ways to enable sourcemap generation. Refer to documentation for your specific bundler to generate production-ready sourcemaps or reach out if you need more help!

### Electron App Sourcemaps

Although your electron app configuration may vary, many will chose to use webpack to generate sourcemaps. Refer to the [general webpack sourcemap documentation](https://webpack.js.org/configuration/devtool/) as well as [this useful reference](https://docs.sentry.io/platforms/javascript/guides/electron/sourcemaps/generating/) to configure your build.
