---
title: HTML iframe Recording
slug: html-iframe-recording
createdAt: 2022-04-14T16:12:23.000Z
updatedAt: 2022-04-19T18:48:07.000Z
---

-   Highlight will recreate an `iframe` with the same src. The `iframe` will not load if the src's origin has a restrictive X-Frame-Options header.

-   Highlight only supports recording same-origin iframes because of browsers' same-origin policy. If it's possible to init Highlight within the
    `iframe `, you can record the events within as a separate session in your same project.

-   If your
    `iframe ` source becomes invalid after some time or will not render content when inserted in a different domain or website, the recording will not show the correct content that the user saw.

![<iframe> rendering in a session replay](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/UP4LVunHyPBCzRukQwoh4_image.png)
