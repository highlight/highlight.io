---
title: Amplitude Integration
slug: amplitude-integration
createdAt: 2021-09-13T23:57:13.000Z
updatedAt: 2021-09-17T21:52:19.000Z
---

We've made it easy to use Amplitude with Highlight. When you initialize Highlight, you can set your Amplitude API Key.

```typescript
H.init('<YOUR_ORGANIZATION_ID>', {
	integrations: {
		amplitude: {
			apiKey: '<AMPLITUDE_API_KEY>',
		},
	},
})
```

## API

### `logEvent()`

Calling [`H.track()`](/sdk/client#Htrack) will forward the data to Amplitude's [`logEvent()`](https://amplitude.github.io/Amplitude-JavaScript/#amplitudeclientlogevent).

```typescript
H.track('signup_button_clicked', {
	firstTime: true,
	impressions: 10,
})

// The Highlight track call is equivalent to this logEvent call
amplitudeClient.logEvent('signup_button_clicked', {
	firstTime: true,
	impressions: 10,
	// This property is added by Highlight. This shows you the session where this event happened.
	highlightSessionURL: 'https://app.highlight.run/sessions/123',
})
```

### `setUserId()` and `identify()`

Calling [`H.identify()`](/sdk/client#Hidentify) will forward the data to Amplitude's [`setUserId()`](https://amplitude.github.io/Amplitude-JavaScript/#amplitudeclientlogevent) and [`identify()`](https://amplitude.github.io/Amplitude-JavaScript/Identify/).

```typescript
H.identify('eliza@corp.com', {
	planType: 'premium',
	verified: false,
})

// The Highlight identify call is equivalent to setUserId and identify.
amplitudeClient.setUserId('eliza@corp.com')
amplitudeClient.identify(
	new amplitude.Identify().set('planType', 'premium').set('verified', false),
)
```
