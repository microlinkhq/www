---
title: 'Overview'
---

**Microlink SDK** is the way to consume [Microlink API](/docs/api/getting-started/overview) directly from your UI, enabling beauty link previews for any link, designed with three things in mind:

- **Common surface**: Although they may have different interface API, every specific integration has the same functionalities.
- **Lightweight & fast**: The bundle size tends to be equal or less than 10KB (no polyfills included).
- **Customizable style**: At least you can customize style using universal CSS classes present on the markup.

You can convert any link present in your markup

[instagram.com/p/BvDTdWdnzkj](https://www.instagram.com/p/BvDTdWdnzkj/)

into a beautiful preview

<Microlink url='https://www.instagram.com/p/BvDTdWdnzkj/' />

**Microlink SDK** can detect video, audio or image automagically. Also, it supports some customizable things, like [size](/docs/sdk/parameters/size/).

<Microlink url='https://www.instagram.com/p/BvDTdWdnzkj/' media='video' size='large' />

Even better, you can get the native embed!

<Microlink url='https://www.instagram.com/p/BvDTdWdnzkj/' media='iframe' />

The following steps show you how to integrate **Microlink SDK** in your site, no matter what web stack you have.
