---
title: Versioning Errors
slug: lXFv-versioning-errors
createdAt: 2021-09-14T00:14:40.000Z
updatedAt: 2022-03-22T15:27:47.000Z
---

When using Highlight, it can be useful to know which app version an error is introduced. Highlight helps you by letting you tag which app version an error was thrown in.

To tag your errors with a version, you can set the `version` field in the [`H.init()`](docId\:yo4FQx3odAtsQsbZOuG_m).

```typescript
import App from "./App";
import { H } from "highlight.run";

H.init("<YOUR_ORGANIZATION_ID>", {
  version: process.env.REACT_APP_VERSION,
});

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
```

## Versioning Sessions

`version` is used for sessions too, see [Versioning Sessions](docId:7IcWg2OqKtg2EIHzLGf23) for more information.

