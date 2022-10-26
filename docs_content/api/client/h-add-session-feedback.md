---
title: H.addSessionFeedback()
slug: FEEt-haddsessionfeedback
createdAt: 2021-09-13T23:30:26.000Z
updatedAt: 2021-12-10T23:17:59.000Z
---

This method is used to add session feedback for the session. You can learn more [User Feedback](/product-features/user-feedback).

If you don't want to implement your own UI to collect feedback, you can use the UI that Highlight provides. See [H.toggleSessionFeedbackModal()](/api/client/h-toggle-session-feedback-modal).

```typescript
H.addSessionFeedback(feedbackOptions: SessionFeedbackOptions) => void;
```

## `feedbackOptions`* (SessionFeedbackOptions)*

### `verbatim` *(string)* Required

The feedback string that a user has inputted into your app.

### `userName` *(string)*

The user's name. This is only required if you have not called [H.identify()](/api/client/h-identify).

### `userEmail`* (string)*

The user's email. This is only required if you have not called [H.identify()](/api/client/h-identify).

## Example

```typescript
H.addSessionFeedback({
    verbatim: 'I L O V E the new feature that shows me cat gifs. Please keep shipping features like this!'
})
```

