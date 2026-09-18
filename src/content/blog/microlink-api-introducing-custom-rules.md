---
title: 'Extract any field from a website with custom rules'
subtitle: 'Three properties turn a CSS selector into a new API field'
description: 'Learn how to use Microlink Custom Rules to extract specific data from any website by defining jQuery-like selectors, attributes, and data types via API parameters.'
authors:
  - kiko
date: '2018-05-31'
---

import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'

The [Microlink API](/docs/api/getting-started/overview) now supports **Custom Rules**: you declare a `selector`, an `attr`, and a `type` as query parameters, and the API returns that value as a new field in the response. The rules ride on the same request that already returns the metadata.

Until now, the API returned the generic information a page exposes, normalized from its metadata by [metascraper](https://metascraper.js.org/#/). That covers `title`, `description`, `image`, and `logo`, but not the data specific to one site, such as the avatar on a profile page.

## The default response stops at metadata

Take an Instagram profile, like [@elonmusk](https://x.com/elonmusk)'s. The page shows an avatar, a follower count, and a grid of photos.

![](/images/subDjQ1.png)

<Figcaption>A website is just an interface for a database, let's convert the web into real data 🤘.</Figcaption>

Pass the profile URL to the [Microlink API](/docs/api/getting-started/overview) and you get normalized data back:

```bash
curl https://api.microlink.io/?url=https://instagram.com/elonmusk
```

The response contains the fields metascraper resolves for every URL, including `title`, `publisher`, `image`, and `logo`:

```json
{
  "status": "success",
  "data": {
    "lang": "en",
    "author": null,
    "title": "Elon Musk (@elonmusk) • Instagram photos and videos",
    "publisher": "Instagram",
    "image": {
      "width": 150,
      "height": 150,
      "type": "jpg",
      "url": "https://scontent-iad3-1.cdninstagram.com/vp/b3d0c296df87fe4b1de4b01639d001ae/5BB89A41/t51.2885-19/s150x150/28429097_208691389878371_4706100807026606080_n.jpg"
    },
    "description": "7.7m Followers, 39 Following, 210 Posts - See Instagram photos and videos from Elon Musk (@elonmusk)",
    "video": null,
    "date": null,
    "logo": {
      "width": 192,
      "height": 192,
      "type": "png",
      "url": "https://instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
    },
    "url": "https://instagram.com/elonmusk/"
  }
}
```

That is enough to understand what a link points to, or to render a preview with the [SDK](/docs/sdk-legacy/getting-started/overview/). The profile avatar is not in it, because an avatar is not a generic field. A custom rule adds it.

## A rule is a selector, an attribute, and a type

A **rule** tells the API which data to extract through three **properties**: `selector`, `attr`, and `type`.

### selector picks the HTML element

`selector` defines which element of the target page's HTML to read, for example `img` for an image tag or `.avatar` for a class.

![](/images/3yy4kDD.png)

<Figcaption>A simple way to get the selector could be copy it directly from DevTools.</Figcaption>

Selectors are jQuery-like, so you can write:

- An HTML tag, such as `img`.
- A CSS class, pseudo class, id, or data-attribute, such as `.avatar`.
- A combination of both, such as `first:img`.

### attr picks the property of the element

`attr` defines which property of the matched element the API returns. For an `img`, that is usually `src`.

### type validates the value

`type` runs a **check validator** against the value that `selector` and `attr` extract. It accepts every [basic](/docs/api/getting-started/overview) property the API extracts:

- `author`
- `date`
- `description`
- `image`
- `description`
- `video`
- `lang`
- `logo`
- `publisher`
- `title`
- `url`

Each `type` applies its own set of mutations to the extracted value. With `type` set to `image`, the value is guaranteed to be an image-compatible URL that a browser can render. With `type` set to `author`, the value is capitalized.

## Rules travel as query parameters

Custom rules go into the [API](https://api.microlink.io/) request as **query parameters**, written in **dot notation** under `data.<field>`. This rule defines a new field called `avatar`, read from the `src` of the first `img`:

```json
{
  "data.avatar.selector": "img:first",
  "data.avatar.attr": "src",
  "data.avatar.type": "image"
}
```

<Figcaption>Defining a new custom rule for 'avatar' field.</Figcaption>

Encoded into the request URL, next to `prerender` and `video=false`, it looks like this:

```bash
curl https://api.microlink.io/?url=https%3A%2F%2Fwww.instagram.com%2Felonmusk&data.avatar.selector=img%3Afirst&data.avatar.type=image&data.avatar.attr=src&prerender&video=false
```

<Figcaption>Encoding the custom rule as query paramter in the API request.</Figcaption>

The response now includes `avatar` next to the basic fields:

```json
{
  "status": "success",
  "data": {
    "lang": "en",
    "author": null,
    "title": "Elon Musk (@elonmusk) • Instagram photos and videos",
    "publisher": "Instagram",
    "image": {
      "width": 150,
      "height": 150,
      "type": "jpg",
      "url": "https://scontent-iad3-1.cdninstagram.com/vp/b3d0c296df87fe4b1de4b01639d001ae/5BB89A41/t51.2885-19/s150x150/28429097_208691389878371_4706100807026606080_n.jpg"
    },
    "description": "7.7m Followers, 39 Following, 210 Posts - See Instagram photos and videos from Elon Musk (@elonmusk)",
    "video": null,
    "date": null,
    "logo": {
      "width": 192,
      "height": 192,
      "type": "png",
      "url": "https://instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
    },
    "url": "https://instagram.com/elonmusk/",
    "avatar": {
      "width": 150,
      "height": 150,
      "type": "jpg",
      "url": "https://scontent-iad3-1.cdninstagram.com/vp/b3d0c296df87fe4b1de4b01639d001ae/5BB89A41/t51.2885-19/s150x150/28429097_208691389878371_4706100807026606080_n.jpg"
    }
  }
}
```

<Figcaption>The payload now have a new 'avatar' field.</Figcaption>

Because the rule sets `type` to `image`, the API treats `avatar` as an image and adds its `width`, `height`, and `type` to the value, not just the `url`.

## Several rules per field handle changing markup

HTML markup changes, and the `selector` you pick decides how well a rule survives it:

- **A specific selector** (`.avatar`) is more accurate, but the element is not guaranteed to be present.
- **A generic selector** (`img`) is found more often, but it does not always hold the expected value.

You can use both in the same API request. Give each rule of the field its own index after the field name, from the most specific selector to the most generic:

```json
{
  "data.avatar.0.selector": ".avatar",
  "data.avatar.0.attr": "src",
  "data.avatar.0.type": "image",
  "data.avatar.1.selector": "img:first",
  "data.avatar.1.attr": "src",
  "data.avatar.1.type": "image"
}
```

<Figcaption>Adding more than one rule per data field.</Figcaption>

**Order matters**: the field takes the value of the first rule that resolves successfully. Here `.avatar` is tried first, and `img:first` is the fallback.

## A selector with several matches returns a collection

A `selector` like `article img` matches more than one element on a profile page:

```json
{
  "data.photos.selector": "article img",
  "data.photos.attr": "src",
  "data.photos.type": "image"
}
```

<Figcaption>Declaring a custom rule for detecting all images.</Figcaption>

```bash
curl https://api.microlink.io/?url=https%3A%2F%2Fwww.instagram.com%2Felonmusk&data.avatar.selector=img&data.avatar.type=image&data.avatar.attr=src&prerender&video=false
```

The API extracts every match:

```json
{
  "status": "success",
  "data": {
    "lang": "en",
    "author": null,
    "title": "Elon Musk (@elonmusk) • Instagram photos and videos",
    "publisher": "Instagram",
    "image": {
      "width": 150,
      "height": 150,
      "type": "jpg",
      "url": "https://scontent-iad3-1.cdninstagram.com/vp/b3d0c296df87fe4b1de4b01639d001ae/5BB89A41/t51.2885-19/s150x150/28429097_208691389878371_4706100807026606080_n.jpg"
    },
    "description": "7.7m Followers, 39 Following, 210 Posts - See Instagram photos and videos from Elon Musk (@elonmusk)",
    "video": null,
    "date": null,
    "logo": {
      "width": 192,
      "height": 192,
      "type": "png",
      "url": "https://instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
    },
    "url": "https://instagram.com/elonmusk/",
    "avatar": [
      "https://scontent-iad3-1.cdninstagram.com/vp/1ffb38c951c16879d354091a0e80c836/5BA4CE48/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/32039832_1818999621729707_2373182444238012416_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/9caae3887f4b707122a909ba18be9a17/5B167C40/t51.2885-15/s640x640/e15/31386504_411011476032232_463607480123916288_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/4fca495d133a478de0c63069761ff061/5BB36DC1/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/31310672_249632775610280_7873472706304278528_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/e29f9a4d023d86b8ababa9d9991ae311/5BC2252B/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/31463407_209037936363460_7225796096243531776_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/76f95b5147452dd937441ca05ffb797c/5BA75F40/t51.2885-15/e35/c167.0.620.620/31070327_164427757566288_2666001116772171776_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/0f30cdcd2fa57864966c36f6dd6b1755/5BA26788/t51.2885-15/s640x640/sh0.08/e35/30086931_229916390892091_3747042018648391680_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/3ea8b95d0d5129cb88bedd5baf5e321e/5B9EAE06/t51.2885-15/s640x640/sh0.08/e35/c0.0.1079.1079/30085730_1657613874332856_5430454433135722496_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/33ccb38ad541fbdcd9fb6322f5767b5e/5BAB1CCD/t51.2885-15/e35/c75.0.358.358/29738552_2099263200285553_2919404320380157952_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/8af59e7ec6c4fd34955e127ff79693a4/5BC49E68/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/29718069_662668550574944_3003405522683559936_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/d75424916f00cf8a6357f79c54f70812/5BC09704/t51.2885-15/s640x640/sh0.08/e35/c0.125.1080.1080/29738021_445961452525265_1824961269409513472_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/981aea1c5f2366827ad2875b995b2808/5B167EDE/t51.2885-15/e15/c236.0.607.607/29418227_611168632571297_6056208306052005888_n.jpg",
      "https://scontent-iad3-1.cdninstagram.com/vp/0659175d64fc417dfe5a3a5e5428eb59/5BAE44B0/t51.2885-15/s640x640/sh0.08/e35/29739298_2051786191528079_7343938294230548480_n.jpg"
    ]
  }
}
```

<Figcaption>The new 'photos' field is a collection.</Figcaption>

The only difference from a single match is the shape: the field holds an array of image URLs instead of one value.

## Custom rules fill the gaps in basic fields

A `null` in the API response means the API could not resolve that field. For Instagram profile URLs, `author` comes back `null`.

A custom rule with the same name as a basic field acts as its fallback. This one reads the text of the last `h1` inside a `section` and validates it as an `author`:

```json
{
  "data.author.selector": "section h1:last",
  "data.author.attr": "text",
  "data.author.type": "author"
}
```

<Figcaption>Declaring a custom rule for fallback a basic rule.</Figcaption>

```bash
curl https://api.microlink.io/?url=https%3A%2F%2Fwww.instagram.com%2Felonmusk&prerender&video=false&data.author.selector=section%20h1%3Alast&data.author.type=author&data.author.attr=text
```

```json
{
  "status": "success",
  "data": {
    "lang": "en",
    "author": "Elon Musk",
    "title": "Elon Musk (@elonmusk) • Instagram photos and videos",
    "publisher": "Instagram",
    "image": {
      "width": 150,
      "height": 150,
      "type": "jpg",
      "url": "https://scontent-iad3-1.cdninstagram.com/vp/b3d0c296df87fe4b1de4b01639d001ae/5BB89A41/t51.2885-19/s150x150/28429097_208691389878371_4706100807026606080_n.jpg"
    },
    "description": "7.7m Followers, 39 Following, 210 Posts - See Instagram photos and videos from Elon Musk (@elonmusk)",
    "video": null,
    "date": null,
    "logo": {
      "width": 192,
      "height": 192,
      "type": "png",
      "url": "https://instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
    },
    "url": "https://instagram.com/elonmusk/"
  }
}
```

`author` now resolves to `"Elon Musk"` instead of `null`.

## Custom rules combine with every API parameter

Every [API Parameter](/docs/api/getting-started/overview) of the [Microlink API](/docs/api/getting-started/overview) works together with custom rules. This request adds `palette` to extract the colors of the image and `filter` to return only the `avatar` field:

```json
{
  "data.photos.selector": "img:first",
  "data.photos.attr": "src",
  "data.photos.type": "image",
  "filter": "avatar",
  "palette": true
}
```

<Figcaption>
  {'Custom rule + '}
  <Link
    href='/docs/api/parameters/palette'
    children='palette'
  />
  {' + '}
  <Link
    href='/docs/api/parameters/filter'
    children='filter'
  />
  .
</Figcaption>

```bash
curl https://api.microlink.io/?url=https%3A%2F%2Fwww.instagram.com%2Felonmusk&data.avatar.selector=img%3Afirst&data.avatar.type=image&data.avatar.attr=src&prerender&video=false&palette&filter=avatar
```

```json
{
  "status": "success",
  "data": {
    "avatar": {
      "width": 150,
      "height": 150,
      "type": "jpg",
      "url": "https://scontent-iad3-1.cdninstagram.com/vp/b3d0c296df87fe4b1de4b01639d001ae/5BB89A41/t51.2885-19/s150x150/28429097_208691389878371_4706100807026606080_n.jpg",
      "palette": [
        "#514030",
        "#8a7f6c",
        "#cac0ac",
        "#f4e4d4",
        "#4c3c24",
        "#ad8851"
      ],
      "background_color": "#F4E4D4",
      "color": "#755C37",
      "alternative_color": "#4C3C24"
    }
  }
}
```

<Figcaption>Detecting predominant color for an image extracted using a custom rule and filtering it 🤯.</Figcaption>

The payload shrinks to the one field you asked for, with its `palette`, `background_color`, `color`, and `alternative_color`. Filtering the response this way is how you optimize the response time of your API calls.

## Start with one field

Pick a value on a page, copy its selector from DevTools, and send it as `data.<field>.selector`, `data.<field>.attr`, and `data.<field>.type` with your next request to the [Microlink API](/docs/api/getting-started/overview).
