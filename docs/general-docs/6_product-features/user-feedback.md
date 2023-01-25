---
title: User Feedback
slug: user-feedback
createdAt: 2021-09-14T00:14:06.000Z
updatedAt: 2021-12-10T23:18:41.000Z
---

Feedback from your user can come at anytime and anywhere in your app. We've made it easy for you to collect feedback that retains context of what the user was doing up until giving feedback.

If you'd like to send Highlight your user's feedback that is shown during the session replay, you can implement your own UI using [H.addSessionFeedback()](/sdk/client#Hadd-session-feedback) or use the Highlight-provided UI with [H.toggleSessionFeedbackModal()](/sdk/client#Htoggle-session-feedback-modal).

## Example Use Case

You've just shipped a new feature, a button that when clicked, shows a random gif. You want to know what users think about the new feature. After the user clicks the button, you show the user a form to collect the feedback. After the feedback is collected, you can send it to Highlight.

```typescript
H.addSessionFeedback({
	verbatim: 'WOW! I really liked the gif I was shown',
})

H.addSessionFeedback({
	verbatim: 'the gif was meh',
	userEmail: 'alice@corp.com',
})

H.addSessionFeedback({
	verbatim: 'i need more gifs!!!!',
	userEmail: 'bob@corp.com',
	userName: 'Bob Hyle',
})
```
