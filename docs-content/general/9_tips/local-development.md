---
title: Local Development
slug: local-development
createdAt: 2021-09-14T00:13:05.000Z
updatedAt: 2022-03-21T18:23:57.000Z
---

## Disable Highlight

Highlight will not run if [`H.init()`](../../sdk/client.md#Hinit) is not called or `projectId` is `undefined`. For most people, you don't want to record sessions from `localhost`

Here's an example of disabling Highlight while developing locally with H.init():

```javascript
if (process.env.ENVIRONMENT !== 'dev') {
	H.init('<YOUR_PROJECT_ID')
}
```

Here's an example of disabling Highlight while developing locally with environment variables:

```javascript
H.init(process.env.HIGHLIGHT_PROJECT_ID) // process.env.HIGHLIGHT_PROJECT_ID is undefined.
```

## Console Log Messages

Highlight monkey patches the browser's `console` methods in order to record console messages. A side effect of this is that all the console messages' initiators will point to Highlight. This can make debugging hard because you can't see where console messages are coming from.

To prevent this from happening, you can:

1.  Don't run Highlight locally

2.  Disable console message recording locally

Here's an example of how you disable console message recording locally.

```typescript
H.init('<YOUR_PROJECT_ID', {
	disableConsoleRecording: process.env.ENVIRONMENT === 'dev',
})
```
