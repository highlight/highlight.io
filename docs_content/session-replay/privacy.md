---
title: Privacy
slug: Nwmp-privacy
createdAt: 2021-09-14T17:47:33.000Z
updatedAt: 2022-08-03T23:29:08.000Z
---

Due to the nature of Highlight's core product, we keep privacy as our top priority. We've built a few ways to redact/mask certain DOM elements while still preserving the structure of your DOM recording. It is important to note that for both of the below solutions, all data is sanitized on the client, so sensitive data never reaches our servers/platform.

## Masking Elements

One way to sanitize your recordings is by adding the `highlight-block` CSS class to elements that should be ignored.

```html
<div class="highlight-block">
    Super secret sauce
</div>
```

The Highlight snippet will in-turn measure the dimensions of the ignored element, and when the recording is being replayed, an empty placeholder will replace the content.

![Elements with the highlight-block class will show up as redacted in your recordings](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/s3OAcyrUrqMsWXwDqT9Zj_aff29bb-kapture2021-03-25at140125.gif)

## Ignoring Input

For sensitive input fields that your team would like to ignore user input for, you can add a CSS class `highlight-ignore` that will preserve the styling of the input element, but ignore all user input.

```html
<input class="highlight-ignore" name="social security number" />
```

## Strict Privacy Mode

If you don't want to manually annotate what elements to not record then you can set `enableStrictPrivacy` to `true` when calling [`H.init()`](docId\:yo4FQx3odAtsQsbZOuG_m). Strict Privacy Mode will obfuscate all text and images. The text obfuscation is not reversible and is done on the client.

Here are some examples:

*   `<h1>Hello World</h1>` will be recorded as `<h1>1f0eqo jw02d</h1>`

*   `<img src="https://my-secrets.com/secret.png" />` will be recorded as `<img src="" />`

```html
<iframe height="500px" href="https://xenodochial-benz-c14354.netlify.app/" width="100%" border="none" src="https://xenodochial-benz-c14354.netlify.app/" style="border:none"><a href="https://xenodochial-benz-c14354.netlify.app/" target="" title="xenodochial-benz-c14354.netlify.app">null</a></iframe>
```

# Obfuscating a Specific Element

You can now obfuscate specific HTML elements by adding the `highlight-mask` CSS class. The effect is the same of setting `enableStrictPrivacy` but applies to the specific HTML element that you mask.

```html
<div class="highlight-mask">This is some sensitive data <button>Important Button</button></div>
```

