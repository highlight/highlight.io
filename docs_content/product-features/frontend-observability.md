---
title: Frontend Observability
slug: p3DX-frontend-observability
createdAt: 2022-09-12T16:18:27.000Z
updatedAt: 2022-09-29T18:55:22.000Z
---

# Features

We’re excited to introduce Frontend Observability from Highlight — a growing suite of tools that let you analyze how your web app is performing.&#x20;

Frontend Observability augments two key features: [Web Vitals](/product-features/web-vitals)  and [Performance Data](/product-features/performance-data).

With the introduction of Frontend Observability in Highlight, Highlight users can now better monitor the performance of their web app, and react to any performance issues quickly. Web Vitals helps you track how quickly your app renders and measures the friction that your users experience on page load. Request Metrics gives you an idea of how quickly your front-end renders dynamic data throughout the lifecycle of your application, both for an individual session level or across users.

# Configuration

To start recording your application's Web Vitals, there's nothing extra you need to do! We'll be recording metrics for you to view on the [Web Vitals dashboard](https://app.highlight.run/dashboards/web-vitals) automatically!

To record metrics about your Frontend Network Requests, you'll need to configure your backend domains of interest. You can do this by [visiting your Project Setting page](https://app.highlight.run/settings) or by adding an extra configuration setting to your [H.init()](/api/client/h-init) call, like so:

```javascript
// Only network requests to the domains listed will have their metrics recorded
// for display in dashboards or for use in metric monitors.

H.init("YOUR_PROJECT_ID", {
    networkRecording: {
        destinationDomains: ['backend.example.com']
    }
})
```

With this feature, you'll immediately start tracking metrics about network requests to the listed domains from your Frontend. Visualize them from the Request Metrics dashboard and customize further to view valuable insights. You can then create [Recording Network Requests and Responses](/product-features/alerts)  to ensure your App performance metrics are kept in check, so that you can receive Slack / Email notifications as soon as a metric value goes out of the typical bounds.

### Filter by

Once you click Edit on a Dashboard, you'll be able to filter the metric based on further metadata about the request. For example, you can visualize [request latency](https://en.wikipedia.org/wiki/Latency_\(engineering\)) for a network request based on the URL or the graphql operation.

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/-9sNb6mRfuDN5Shb9VxzZ_screen-shot-2022-09-12-at-70648-pm.png)

### Group by

When you add a `Time Series / Bar` chart to your dashboard, you can turn it into a stacked bar chart by selecting a **Group by** key. This will stack data based on the grouping key into the value categories. This can be particularly useful to find outlier groups of a particular metric.

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/6bYPOoUaAYJLz9ORARYLu_screen-shot-2022-09-12-at-70917-pm.png)

### Session / Error Stats

Certain metadata about your app's sessions is available by grouping on the `sessions`  and `errors` metrics.

![Use the group or filter tag operators](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/9F7NPqTiq64aEyukuP7Ue_image.png)

Using the group operator can allow viewing the number of sessions your app has by the browser version, for example.

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/suzMx0NQOs_FIGFJnLWGG_image.png)

