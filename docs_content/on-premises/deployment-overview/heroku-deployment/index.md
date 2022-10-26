---
title: Heroku Deployment
slug: SV_3-heroku-deployment
createdAt: 2021-09-15T00:00:12.000Z
updatedAt: 2021-10-01T20:41:03.000Z
---

The Highlight deployment process on Heroku consists of a handful of steps:

1\. **Setting up dependencies (authentication and storage)**:
\- Highlight uses a third-party vendor for authentication for google sign-in, SSO, etc.. Creating an account with this vendor takes a minute or two.
\- For long-term storage, Highlight writes session payloads to object storage (S3, for example). Your team will have to create a bucket and point the Highlight binary to it.

2\. **Creating your Heroku deployment**:
One click deploy:

```html
<a href="https://heroku.com/deploy?template=https://github.com/highlight-run/highlight-onpremise" target="" title=""><span aria-label="Deploy" class="img" role="button" tabindex="0"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" align="" caption="" height="auto" title="" width="auto"><span autofocus="" class="lightbox" role="dialog" tabindex="0"></span></span></a>
```

Populate the config variables with the values from step \`1\`.

3\. **Enabling Optional Features**:
To use slack alerts, you'll need to send us your Highlight app url (such as \`https\://on-premise.herokuapp.com/\`).

