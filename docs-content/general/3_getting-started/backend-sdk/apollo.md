---
title: Apollo Server
slug: apollo-server
createdAt: 2022-04-01T20:28:14.000Z
updatedAt: 2022-04-15T02:07:22.000Z
---

Highlight ships `@highlight-run/node` with a plugin `ApolloServerHighlightPlugin` specifically for the apollo server.
The plugin will trace graphql resolver errors and report them to Highlight.

## Usage

The usage of the Apollo plugin requires the [Node.js integration](../../../sdk/nodejs.md) to be configured.
Ensure that `@highlight-run/node` updated to version 2.2.0 or greater. Then, add `ApolloServerHighlightPlugin` to
your `ApolloServer` plugins definition.

```typescript
import {ApolloServerHighlightPlugin} from '@highlight-run/node';

// ...

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerHighlightPlugin({projectID: 'YOUR_PROJECT_ID'})]
});
```

### Verify

To validate your Highlight backend setup, you can have a graphql resolver throw an error and check that the
error is visible on [app.highlight.io](http://app.highlight.io/errors).
