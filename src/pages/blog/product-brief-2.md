---
title: 'Product Brief #2: New Branding, Documentation & Improvements'
date: '2018-01-31'
---

## Website Refresh

![the new microlink.io swag logo!](https://cdn-images-1.medium.com/max/800/1*qnT4Rmic-FA4_Kf8LdZs_g.png)

<Figcaption children='the new shiny microlink brand.' />

We have a new fresh branding 🎉

When the project started, we invested the time in creating something small but efficiently working, so we didn’t really stop to think about creating a brand product.

Our design needed a little love and we knew it was a debt that we would pay in the future… Now, thanks to [Silvia Calavera](http://silviacalavera.es/) we have a better branding design and the website was according to it.

In addition, we took this opportunity to improve our payment process, you’ll now receive your [API credentials](/docs/api/#api-basics/authentication) *immediately* after payment.

![](https://cdn-images-1.medium.com/max/800/1*k7dpxXR6YBtpvHlnw3vrXw.png)

<Figcaption>
  {'Meet '}
  <Link href='https://tom.js.org' children='tom.js.org' />, a microservice for managing payment
  process.
</Figcaption>

## Unified Documentation

![](/images/tJxodpG.jpg)

<Figcaption>
  {'The only place for checking all the documentation is '}
  <Link href='/docs' children='/docs' />.
</Figcaption>

As we announced on [newsletter #1](https://medium.com/microlink/microlink-newsletter-1-13b8a055cd6c), we started shipping a set of front end libraries to make consuming the [Microlink API](/docs/api/getting-started/overview) as easy as possible.

We also want to provide examples, and ways to integrate it with popular frameworks, like WordPress, Jekyll, etc.

Maintaining documentation is laborious and requires effort. We needed to combine **all** the documentation associated with [microlink.io](https://microlink.io) into one place.

After comparing multiple approaches on the matter and seeing how other companies take on the challenge, we decided on [Vercel documentation](https://github.com/vercel/docs) portal.

<Microlink size='large' url={'https://x.com/Kikobeats/status/956221717319421952'} />

Although it required some laborious work, the final result is impressive. We are very grateful to [Vercel](https://vercel.com) for making it possible.

## Metascraper Improvements

![](https://cdn-images-1.medium.com/max/800/1*ns3f8OrzX3xOaPiS81Lc_w.png)

[metascraper](https://metascraper.js.org/) is our metadata extractor and we improve it every week.

Our current target is improving the data accuracy related with **video** content.

On this period, we did a lot of internal improvements and developed [metascraper-youtube](https://www.npmjs.com/package/metascraper-youtube) for enhancing the results when you want to get information from a YouTube url.

Under the hood, we’re testing something pretty exciting: Adding a new **video property** ([spoiler](https://api.microlink.io/?url=https://x.com/verge/status/957383241714970624)) into the [Microlink API](/docs/api).

It would return any video detected in the target URL. This also allowing us to build a richer content preview (with the [Microlink SDK](/docs/sdk/getting-started/overview/)).

We seem to be heading in the right direction, stay tuned for our next newsletters to see how it turns out 👀.

## Microlink SDK Improvements

![](https://cdn-images-1.medium.com/max/800/1*kCqm2r2HwPYMceWwj5cwbA.gif)

<Figcaption>
  {'A new '}
  <Link href='/docs/sdk/getting-started/overview/' children='Microlink SDK' /> demo at{' '}
  <Link href='https://microlink.io/' children='microlink.io' />.
</Figcaption>

First of all, we reached [100 stars 🌟 on GitHub](https://github.com/microlinkhq/microlinkjs)!

We wanted to be sure the cards responded properly to different viewports, so we put extra effort into improving the responsive aspect of things.

We’ve also added a new demo at [microlink.io](https://microlink.io) showing a quick look of what you can achieve with the [Microlink SDK](/docs/sdk/getting-started/overview/).

With the above-mentioned *documentation unification* we’ve also added more examples and API parameters that you can use to customize your previews.
