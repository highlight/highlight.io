
title: Next.js Backend
slug: eAyE-nextjs-backend
createdAt: 2022-04-01T20:28:06.000Z
updatedAt: 2022-04-01T20:40:19.000Z
---

Highlight ships `@highlight-run/next` which can be installed alongside `highlight.run` and `@highlight-run/react` for capturing backend errors and stack traces in Next.js applications.

## Usage

Under the hood this SDK relies on our Node SDK, which makes all features available there also available here. The usage of this backend SDK requires our Next.js client SDK to be installed, so please follow the instructions [Next.js](docId\:d3G0HZZ8r1u28kGfwC442)  if you have not done so.

### The `@highlight-run/next` Package

First, import the package

```shell
yarn add @highlight-run/next

```

### Configure

Define the Highlight backend package with intended options in a common function file

```typescript
import { Highlight } from "@highlight-run/next";

// define any configurations needed
// <https://docs.highlight.run/api/hinit#w0-highlightoptions>
const highlightOptions = {};

export const withHighlight = Highlight(highlightOptions);

```

### Adding withHighlight as a middleware

Wrap each of your route handlers in the NextJS /api/ directory with the withHighlight function we defined in the configuration step.

```typescript
import { withHighlight } from "./common";

const handler = async (req, res) => {
	// Throw an error to verify installation
	throw new Error("API throw error test");
  res.status(200).json({ name: "Jay" });
};

export default withHighlight(handler);

```

### Verify

To view and resolve the recorded error, log into [app.highlight.run](http://app.highlight.run/) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.
