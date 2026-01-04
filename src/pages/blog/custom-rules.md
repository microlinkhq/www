---
title: 'Microlink API: Introducing Custom Rules'
date: '2018-05-31'
---

The [Microlink API](/docs/api/getting-started/overview) is used for extracting information from **any** link.

Just enter a URL and you will receive data.

It was designed to get generic information present in the target website, based on metadata normalization using [metascraper](https://metascraper.js.org/#/).

Although this is expected, many use cases are left out of the scope if we need to get specific data information.

Today we’re happy to introduce a new core functionality called **Custom Rules** 🎉.

## Leveraging Custom Rules

**Custom Rules** provide you an interface to interact with the API, specifying new data fields that can be extracted from an specific URL.

Imagine you want ot interact with an Instagram profile url, like [@elonmusk](https://x.com/elonmusk)'s profile.

![](/images/subDjQ1.png)

<Figcaption>A website is just an interface for a database, let's convert the web into real data 🤘.</Figcaption>

By using [Microlink API](/docs/api/getting-started/overview) we can obtain well structured and normalized data from any Instagram URL:

```bash
curl https://api.microlink.io/?url=https://instagram.com/elonmusk
```

The API response will look like the following:

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

Although this is enough to have a global vision of what's behind a link (or to build a previsualization using our [SDK](/docs/sdk/getting-started/overview/)), you may be interested in specific information that we don't expose because it'sn't generic.

Let's define a **rule** for extracting the avatar profile.

## Defining rules

A **rule** is a way to interact with the API. You’ve to declare the type of data you want to extract through **properties**. These properties are:

### selector

It defines the HTML element you want to get from the HTML of the targeted URL.

![](/images/3yy4kDD.png)

<Figcaption>A simple way to get the selector could be copy it directly from DevTools.</Figcaption>

The way to specify selectors is jQuery-like, so you can specify the selector using:

- An HTML tag, (e.g., `img`).
- An CSS class or pseudo class, id or data-attribute, (e.g., `.avatar`).
- A combination of both, (e.g., `first:img`).

### attr

It defines which property from the matched selector should be picked.

That means, for example, if you want to extract an `img`, probably you are interested in `src` property.

### type

It defines a **check validator** to be run against the extracted value defined by `selector` and `attr`.

It's possible to validate all the [basic](/docs/api/getting-started/overview) properties that can be extracted using the API:

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

Each validator `type` will be applied to a set of mutations from the original extracted value.

For example, if you define the `type` as `image`, then you'll be sure that the value extracted will be an image-compatible url, and your browser will be able to render it.

But it'll be different if you declare the `type` as `author`, because the value will be capitalized.

## Querying using the API

Now that we know how to define rules, let's see how to add them into the [API](https://api.microlink.io/) request.

They need to be declared as **query parameters** using **dot notation**:

```json
{
  "data.avatar.selector": "img:first",
  "data.avatar.attr": "src",
  "data.avatar.type": "image"
}
```

<Figcaption>Defining a new custom rule for 'avatar' field.</Figcaption>

Here we are defining our **custom rule** for a new data field called **avatar**.

```bash
curl https://api.microlink.io/?url=https%3A%2F%2Fwww.instagram.com%2Felonmusk&data.avatar.selector=img%3Afirst&data.avatar.type=image&data.avatar.attr=src&prerender&video=false
```

<Figcaption>Encoding the custom rule as query paramter in the API request.</Figcaption>

After that, the API will return the new data field `avatar` as part of the response payload 🎉

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

In this case, we've defined the `type` as `image`. The API can handle the property value and then provide us extra information. Like, for instance, the image dimensions.

## Adding more rules per field

Some scenarios need to contemplate that HTML markup can change.

This is specially remarkable in the way to define your custom rules `selector`:

- A very specific selector (e.g., `.avatar`) has better accuracy, but you don't have the guarantee that it's always present.
- A more generic selector (e.g., `img`) is easier to be found in the HTML markup, but it doesn't always have the expected value.

Ideally, a good solution needs to contemplate both approaches: first, resolve with an specific selector, and second, fallback into one more generic if it can't resolve the first selector.

This could be done with **custom rules** in the same API request 🎊.

You just need to declare the conditions as part of the same rule:

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

Note that **order is important**: The data value extracted will be first value resolved successfully.

## More than one result

What happens if you declare a `selector` that matches with more than one result?

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

Can the API extract them? The answer is **yes**!

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

The only difference is that this time the result is a collection.

## Adding fallback for basic rules

When you see a `null` in the API response, it means that it couldn't resolve the value properly.

You can define **custom rules** as fallback rules for an existing data field.

For example, we are seeing that the API is not resolving the `author` field for Instagram profile urls. Let's add it!

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

Now the value is resolved properly 👌.

## Combine it with the rest of API Parameters

One thing that makes [Microlink API](/docs/api/getting-started/overview) powerful is that you can combine every [API Parameter](/docs/api/getting-started/overview) to work together.

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

This is specially useful when you want to optimize your API calls response time.
