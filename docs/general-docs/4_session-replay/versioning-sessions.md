---
title: Versioning Sessions
slug: versioning-sessions
createdAt: 2021-09-14T00:14:40.000Z
updatedAt: 2022-03-21T18:25:40.000Z
---

When using Highlight, it can be useful to know which app version a session is recorded on. Highlight helps you by letting you tag which app version a session was recorded on.

To tag your sessions with a version, you can set the `version` field in the [`H.init()`](/sdk/client#Hinit).

```typescript
import App from './App'
import { H } from 'highlight.run'

H.init('<YOUR_PROJECT_ID>', {
	version: process.env.REACT_APP_VERSION,
})

ReactDOM.render(<App />, document.getElementById('root'))
```

## Versioning Errors

`version` is used for errors too, see [Versioning Errors](/error-monitoring/versioning-errors) for more information.
