---
title: H.consumeError()
slug: ljQK-hconsumeerror
createdAt: 2021-09-13T23:29:10.000Z
updatedAt: 2022-10-03T19:34:45.000Z
---

This method is used to send Highlight a custom error.

```typescript
H.consumeError(error: Error, message?: string, payload: { [key: string]: string }) => void;
```

## `error`* (Error) *Required

A Javascript error that you have created or have access to.

## `message` *(string)*

An additional message you'd like to add to the error to give the error more context.

## `payload`

Additional metadata that you'd like to attach to the error to give the error more context.

### Example

```typescript
// error is provided to you from your Javascript framework or something like https://github.com/stacktracejs/stacktrace.js/
H.consumeError(error, 'Error in Highlight custom boundary!', {
  component: 'JustThroughAnError.tsx',
});
```
