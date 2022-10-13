---
title: Web Vitals
slug: 1Xs5-web-vitals
createdAt: 2021-09-14T00:14:06.000Z
updatedAt: 2022-03-22T16:44:20.000Z
---

[Web Vitals](https://web.dev/vitals/) are a set of useful metrics with the goal of measuring the user experience of a web page.

Traditional tools like [Lighthouse](https://developers.google.com/web/tools/lighthouse) can tell you what your core web vitals are but the data collected is from a simulated environment, not from your actual users. Scoring well on Lighthouse does not mean your actual users are having a good experience.

By default, Highlight will record Web Vitals for all of your sessions. The metrics that we record are:

1.  [Largest Contentful Paint](https://web.dev/lcp/)

2.  [Cumulative Layout Shift](https://web.dev/cls/)

3.  [First Contentful Paint](https://web.dev/fcp/)

4.  [First Input Delay](https://web.dev/fid/)

5.  [Time to First Byte](https://web.dev/ttfb/)

Performance is a continuous challenge. For your app, you may see months of metrics improving but then suddenly some decrease dramatically. This is normal! With Highlight, you'll be able to see when that performance regression happened (down to the app version number).

## Dashboards

Seeing how your web vital metrics perform over time is important to make sure you're consistently deliverying a great experience for your users. We've made this easy by providing a dashboard with all your web vitals. [Check out your dashboard](https://app.highlight.run/dashboards/1) to see how your apps are doing!

## Metric Monitors

[](www.google.com)Metric monitor alerts can be added from the [Alerts](docId:0OM1OAgjJBP8lrJqqZ3Sv) page to warn you when any of your Web Vitals metrics exceed a certain threshold. You can configure both the aggregation function (average, p90, etc.) and threshold value.

