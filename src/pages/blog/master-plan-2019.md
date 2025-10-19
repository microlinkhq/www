---
title: 'Master Plan for 2019'
date: '2019-01-18'
--- 

We launched our [initial product release on march 2018](https://www.indiehackers.com/forum/show-ih-microlink-io-beautiful-links-previews-for-any-website-8fee2613af) and months later we reached +[1000 upvotes on Product Hunt](https://www.producthunt.com/posts/microlink-2-0).

Since then we have been learning how you use the product and what benefit it brings to your business.

Based on that, and a lot of feedback you told us from our [community](/community), we elaborate a master plan of the roadmap we want to follow in the next months.


## Microlink Query Language ([RFC](https://github.com/microlinkhq/open/issues/5))

Although [Microlink API](/docs/api/getting-started/overview) works fine for getting generic metadata, most of the users need to get specific things from the content, like count, followers, hits, price variation, etc.

In the past, we launched [custom rules](/blog/custom-rules) for that purpose, but we feel it only usable if you have a tiny rules set.

The thing we want to do next is a totally developer friendly client API.

We called it **Microlink Query Language** (MQL) and you can see it as Custom Rules v2.0 iteration.

The **MQL** goal is build the most simple to use and developer friendly for scraping purposes.

This include the builtin types, caching and batching support and selectors declaration.
 
## GraphQL Endpoint ([RFC](https://github.com/microlinkhq/open/issues/14))

GraphQL is a technology introduced by Facebook in 2015 as REST API alternative.

The major benefit of GraphQL over REST API is how easy is to query and do data manipulations.

It has a lot of sense specially if your API is starting to grow and you are only interested into a payload portion from the response data: Technically here you can save bandwidth!

Because our [Microlink API](/docs/api/getting-started/overview) response tends to grow (especially after [MQL](https://github.com/microlinkhq/open/issues/5) support) that's definitely a worth it thing we can to support.

## Hover Preview ([RFC](https://github.com/microlinkhq/open/issues/18))

That's a thing we wanted to build from the beginning.

We have [Microlink SDK](/docs/sdk/getting-started/overview/) for creating link previews and add it into any online publication.

Although it's very powerful, when the target of your product is basically the whole internet, you need to support different ways for doing the same.

Under this aspect, on hover previews are very attractive: They add contextual information just under user interaction, doing a cleaner execution.



–––

That's the plan. How does it look? Please, you can answer, we are are going to read every reply.
