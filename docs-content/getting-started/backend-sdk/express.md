---
title: Express Backend
slug: express-backend
createdAt: 2022-04-01T20:28:14.000Z
updatedAt: 2022-04-15T02:07:22.000Z
---

Highlight ships `@highlight-run/node` which can be installed alongside highlight.run for capturing backend errors in applications with Express backends.

## Usage

The usage of this Backend SDK requires one of our [Client SDK](../1_overview.md#for-your-frontend)s to be installed, so please follow the instructions there if you have not done so.

### The `@highlight-run/node` Package

First, import the package

```typescript
yarn add @highlight-run/node
```

### Adding Highlight to Express

Pass configurations into the errorHandler and Highlight is ready to go!

```hint
Where you place the `app.use(highlightErrorHandler)` definition is important. It must be set
after route handler definitions (`app.get(...)`, etc) and before other error middleware.
```

```typescript
import * as Highlight from '@highlight-run/node'
// or like this with commonjs
// const Highlight = require('@highlight-run/node')

const app = express()

// define any configurations needed
// <https://docs.highlight.run/api/hinit#w0-highlightoptions>
const highlightOptions = { projectID: 'YOUR_PROJECT_ID' }
// initialize the handler
const highlightErrorHandler = Highlight.Handlers.errorHandler(highlightOptions)

app.get('/', (req, res) => {
  if (Math.random() < 0.1) {
    throw new Error(`random error ${Math.random()}`)
  }
  res.send(`Hello World! ${Math.random()}`)
})

// This should be before any other error middleware and after all controllers (route definitions)
app.use(highlightErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### Verify

To validate your Highlight backend setup, you'll need to setup up a testing route handler that throws an error. See the block above for an example. Add some code to your frontend to make an HTTP request
to `/error`. You should be able to view your
frontend session making the request and find the error
traceback in the errors page.

To view and resolve the recorded error, log into [app.highlight.io](http://app.highlight.io/) and open your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.
