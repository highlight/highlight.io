---
heading: Getting Started - highlight.io
title: Get Started
slug: getting-started
createdAt: 2021-09-13T22:07:04.000Z
updatedAt: 2022-04-01T19:52:59.000Z
---

We've written up several guides on getting started with highlight.io in your framework of choice. If there's a guide missing for your framework, feel free to [create an issue](https://github.com/highlight/highlight/issues/new?assignees=&labels=external+bug+%2F+request&template=feature_request.md&title=) or message us on [discord](https://highlight.io/community).

## For your Frontend

Installing highlight.io in javascript will automatically instrument frontend error collection and session replay. highlight.io supports any framework that uses the [dom](https://www.w3schools.com/js/js_htmldom.asp) under the hood, and we support all modern browsers to date. Take a look at our guides for the following frameworks:

<DocsCardGroup>
    <DocsCard title="React" href="./client-sdk/reactjs.md">
        {"Get started in your React.js app"}
    </DocsCard>
    <DocsCard title="Angular"  href="./client-sdk/angular.md">
        {"Get started in your Angular.js app"}
    </DocsCard>
    <DocsCard title="Gatsby"  href="./client-sdk/gatsbyjs.md">
        {"Get started in your Gatsby app"}
    </DocsCard>
    <DocsCard title="NextJS"  href="./client-sdk/nextjs.md">
        {"Get started in your NextJS app"}
    </DocsCard>
    <DocsCard title="VueJS"  href="./client-sdk/vuejs.md">
        {"Get started in your VueJS app"}
    </DocsCard>
</DocsCardGroup>

Don't see your framework? Shoot us a [message](https://highlight.io/community) and we're happy to add one. You can also import highlight.io via a [script tag](3_client-sdk/6_other.md).

## For your Backend

Highlight also supports reporting errors from your backend and mapping these to corresponding sessions. This gives you and your team a full picture of your application's state. Support frameworks / tech below:

- [Firebase](./backend-sdk/firebase.md)

- [Express](./backend-sdk/express.md)

- [Go](./backend-sdk/go.md)

- [Next.js](./backend-sdk/nextjs.md)

- [Node.js](./backend-sdk/nodejs.md)

- For requesting other backend frameworks, shoot us a message at [support@highlight.io](mailto:support@highlight.io) or share in our [community](https://discord.gg/yxaXEAqgwN)

For in-depth instructions, follow the [Backend SDK](./backend-sdk/backend-sdk-overview.md) guide.
