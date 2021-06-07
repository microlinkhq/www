---
title: 'Microlink Proxy: How it works'
image: 'https://i.imgur.com/Ckf9Tau.png'
date: '2021-06-07'
---

All [Microlink Pro](#pricing) plans come with a built-in proxy layer called that does automatic proxy resolution & rotation based on the input URL.

## What's wrong with URLs

Internet is wild place, where every URL is different. That's specially an issue when you are doing things at scale.

![](https://i.imgur.com/pVPDpao.png)

<Figcaption>
  {'A '}
  <Link href='https://github.com/microlinkhq/metascraper/issues/417' children='metascraper issue' /> facing with fetching problems.
</Figcaption>

When you are surfing the net and visit a website, there are situations you can't handle at all:

- The are geographic location restrictions (e.g., visiting a site from China).
- Your IP address is blacklisted (e.g., performing request from a data center).
- You have to validate your identity (e.g., filling a CAPTCHA).

You can quickly face with these problems when you send enough traffic to popular sites, like Instagram or Bloomberg, making it indeterministic to get a successful response in a consistent way.

## Resolving URLs gracefully

Wouldn't it be nice if every time you want to retrieve data from any URL, the Microlink API just returns the data, all while handling any of the above problems transparently?

![](https://i.imgur.com/8uvahxZ.png)

<Figcaption>No additional setup needed, just a Microlink Pro plan.</Figcaption>

That's exactly what **Microlink Proxy** layer does. No failures. No maintaince. You don't need to do nothing additional. It just works™️. 

The **Microlink Proxy** is enabled for all [Microlink Pro](/#pricing) plans and it will handle all the situations for the [Top 500](https://github.com/Kikobeats/top-sites) most popular worldwide websites, in a transparent way, by default.

Just for informational purpose, you can check if a specific request was resolved using the proxy layer checking `x-fetch-mode` response header.

```bash
$ microlink https://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance

 SUCCESS  3.64 kB in 329ms

 cache HIT (19h 20m 54.8s left)
  mode prerender-proxy (8.5s)
   uri https://pro.microlink.io/?url=https%3A%2F%2Fwww.bloomberg.com%2Fnews%2Farticles%2F2016-05-24%2Fas-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance&filter=statusCode
    id iad:paw98q36bHEIlAgsFBzy5
```

<Figcaption>
  If the value there is prefixed by <code children='`proxy`'/> then it was handled by the proxy layer.
</Figcaption>

As you can see, the proxy layer respects other query parameters, such as [prerender](/docs/api/parameters/prerender) or [ttl](/docs/api/parameters/ttl).

Also, you can always provide your own [proxy](/docs/api/parameters/proxy), being HTTP, HTTPS or SOCKS (v4 and v5) protocols supported.

Lastly but not least, **Microlink Proxy** is a **cross-feature**: It's available for all the Microlink products.
