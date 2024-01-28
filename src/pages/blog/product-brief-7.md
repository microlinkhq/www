---
title: 'Product Brief #7: SDK v4, Documentation Portal & MQL'
date: '2019-05-01'
---

## Microlink SDK 4.0

> [See release notes on GitHub](https://github.com/microlinkhq/sdk/releases/tag/v4.0.0).

<Microlink url='https://microlink.io/docs/sdk/getting-started/overview/' media='logo' />

This new major release has had two things in mind: Simplify some specific connectors parameters and provide a more smart bundle system.

These changes were necessary since we are preparing the project for antoher big thing: leverage [audio](https://github.com/microlinkhq/sdk/issues/135) support (already supported on [API](/docs/api/parameters/audio)) at SDK level.

### API Surface

```jsx
/* before */
<Microlink reverse video />

/* after */
<Microlink direction='ltr' media='video' />
```

In the past, we added some specific connector parameters since [Microlink SDK](/docs/sdk/getting-started/overview/) is oriented to support different user case over any site on internet.

The things added are good, but now we have a more global vision of our API surface and we can simplify to express the same in a more unified way.

Specifically the changes has been:

- Renamed `image` into `media`.
- Removed `video`, use `media='video'` instead.
- Renamed `reverse` into `direction` where values can be `rtl` and `ltr`.
- Removed `noFetch`. Now, it will be deducted if you use `setData` passing an object.

### Better Build System

The build system is the way we bundle the library to be consumed in different ways.

The way we created the bundle has been totally **rewritten**.

We offer two officialy connectors: [React](/docs/sdk/integrations/react/) and [Vanilla](/docs/sdk/integrations/vanilla/).

The React connector is bundle to be consume in [CommonJS](https://github.com/microlinkhq/sdk/blob/master/packages/react/package.json#L6) and [ESM](https://github.com/microlinkhq/sdk/blob/master/packages/react/package.json#L7).

After these builds are created, we use the ESM bundle to create the Vanilla conector. This new build is exported to be consumed as Universal Module Definition (_UMD_).

## New Documentation Portal

The documentation portal is a big deal: We wanted to have an unified entry point to see all the things (formally documentation but also examples, code snippets) involved with Microlink.

Now, the documentation portal is integrated on the site. It uses the same visual elements than our [Design System](/design).

Also, we wanted to provide a way to anyone extend it, so every documentation section has **Edit This Page on GitHub** on the footer, making possible suggest changes quickly.

## Microlink Query Language

```jsx
import mql from '@microlink.io/mql'
const { status, data } = await 'https://microlink.io'
console.log(data)
```

Microlink Query Language (_MQL_) is the precessor of [Custom Rules](/blog/custom-rules) as we pointed in our [Master Plan for 2019](/blog/master-plan-2019/).

We are happy to say that **MQL is production ready** 🚀.

We provide [@microlink/mql](https://github.com/microlinkhq/mql) npm package that is a convenient JavaScript HTTP client on top of [Microlink API](/docs/api/getting-started/overview).

Also it's ready to be used directly on browser [since size is 4KB](https://bundlephobia.com/result?p=@microlink/mql).

We have started adding [MQL documentation](/docs/mql/getting-started/overview) and how rules need to be defined.

We are going to add, as soon as possible, documentation at the API layer, more practical examples, and a totally new site just for use it as a playground.
