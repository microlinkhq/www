---
title: 'Our 2019 plan: MQL, a GraphQL endpoint, and hover previews'
description: 'Explore Microlinks 2019 roadmap, featuring the launch of Microlink Query Language (MQL) for advanced scraping, a GraphQL endpoint, and interactive hover previews.'
authors:
  - kiko
date: '2019-01-18'
---

Our roadmap for 2019 has three projects: the Microlink Query Language (MQL), a GraphQL endpoint for [Microlink API](/docs/api/getting-started/overview), and hover previews. Each one has a public RFC on GitHub where you can follow and shape the design.

**TL;DR**

- Our roadmap for 2019 has **three projects**, each with a public RFC on GitHub.
- The **Microlink Query Language** (MQL) is custom rules v2.0: built-in types, selectors declaration, and caching and batching support.
- A GraphQL endpoint for Microlink API returns only the fields you ask for.
- Hover previews render the same card only when the reader points at a link.

We launched the [initial product release in March 2018](https://www.indiehackers.com/forum/show-ih-microlink-io-beautiful-links-previews-for-any-website-8fee2613af), and months later [the launch passed 1000 upvotes on Product Hunt](https://www.producthunt.com/posts/microlink-2-0). Since then we have watched how you use the API for link previews, metadata, and scraping, and collected feedback in our [community](/community). This plan comes from that feedback.

## Custom rules need a query language

Microlink API returns generic metadata for any URL. Most users need specific values from the content instead, like a follower count, page hits, or a price variation.

We launched [custom rules](/blog/custom-rules) for that purpose, but in practice they only work if you have a tiny rules set. Next we are building a developer-friendly client API for scraping, called the **Microlink Query Language** (MQL). Think of it as custom rules v2.0. The [MQL RFC](https://github.com/microlinkhq/open/issues/5) covers the scope:

- **Built-in types:** each extracted value comes back with a declared type.
- **Selectors declaration:** declare the selectors for what you want to extract, in one place.
- **Caching and batching support:** built into the query layer, not left to the client.

## A GraphQL endpoint returns only the fields you ask for

GraphQL is a query language Facebook introduced in 2015 as an alternative to REST APIs. A client names the fields it wants, and the server returns only those fields.

That matters once an API response grows and you only need a portion of the payload. Asking for `title` and `logo` instead of the full response saves bandwidth on every call.

The Microlink API response keeps growing, and [MQL](https://github.com/microlinkhq/open/issues/5) will make it grow faster, since every custom field lands in the payload. A GraphQL endpoint lets you fetch exactly those fields. The [GraphQL RFC](https://github.com/microlinkhq/open/issues/14) tracks the design.

## Hover previews show context on demand

Hover previews are something we wanted to build from the beginning.

Today the [Microlink SDK](/docs/sdk-legacy/getting-started/overview/) turns a link into a preview card that you embed in any online publication. When your target is every website on the internet, one presentation does not fit every page, so the SDK needs more than one way to show the same data.

A hover preview renders the same card only when the reader points at a link. The page stays clean, and the extra context appears on user interaction. The [hover preview RFC](https://github.com/microlinkhq/open/issues/18) describes the first design.

## Comment on the RFCs

The three RFCs are open for comments: [MQL](https://github.com/microlinkhq/open/issues/5), [GraphQL endpoint](https://github.com/microlinkhq/open/issues/14), and [hover preview](https://github.com/microlinkhq/open/issues/18). Reply there or in the [community](/community); we read every reply.
