
title: Express Backend
slug: oNqi-express-backend
createdAt: 2022-04-01T20:28:14.000Z
updatedAt: 2022-04-15T02:07:22.000Z
---

Highlight ships  `@highlight-run/node` which can be installed alongside highlight.run for capturing backend errors in applications with Express backends.

## Usage

The usage of this Backend SDK requires one of our [Client SDK](docId:7uAC0lqxfaH3xH5IarVwf)s to be installed, so please follow the instructions there if you have not done so.

### The `@highlight-run/node` Package

First, import the package

```shell
yarn add @highlight-run/node

```

### Adding Highlight to Express

Pass configurations into the errorHandler and Highlight is ready to go!

```typescript
import { Highlight } from "@highlight-run/node";
// or like this with commonjs
const Highlight = require("@highlight-run/node");

const app = express();

// define any configurations needed
// <https://docs.highlight.run/api/hinit#w0-highlightoptions>
const highlightOptions = {}; 

// initialize the handler
const highlightHandler = Highlight.Handlers.errorHandler(highlightOptions);

// This should be before any other error middleware and after all controllers
app.use(highlightHandler);

app.use("/error", () => {
  throw new Error("a fake failure was thrown");
});

```

### Verify

To validate your Highlight backend setup, you'll need to setup up a testing route handler that throws an error. See the block above for an example. Add some code to your frontend to make an HTTP request
&#x20;to `/error`. You should be able to view your
frontend session making the request and find the error
&#x20;traceback in the errors page.

To view and resolve the recorded error, log into [app.highlight.run](http://app.highlight.run/) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.
