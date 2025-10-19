---
title: 'Product Brief #6: Custom Rules & metadata improvements'
date: '2018-06-30'
---

## Custom Rules

[![](/images/subDjQ1.png)](/blog/custom-rules)

<Figcaption>Custom Rules enables build custom API response based on your necessities.</Figcaption>

[Microlink API](/docs/api/getting-started/overview) is so powerful for extracting data. We created links previews as one of the possible use cases (actually our [SDK](/docs/sdk/getting-started/overview/)), but because the API response returns generic data, it's a bit difficult use Microlink API for different problems scope.

Now, we are introducing the concept of **Custom Rules**: The ability to setup custom API response based on user necessities.

**Custom Rules** work specifying what you want to get using CSS selectors. Also, you can provide consistent types (`url`, `author`, `date`, etc) avoiding getting unexpected value in your data.

In other words, you can use it as a scraper as service 🤯.

We wrote a specific blog [post](/blog/custom-rules) explaining how to use custom rules, taking an Instagram profile as an example.

## Compression documentation

[![](/images/Jh7GHUP.png)](/docs/api/basics/compression)

<Figcaption>Ensure to use *Accept-Encoding* for enabling compression</Figcaption>

Althought we support **brotli** and **gzip** from the beginning, we [added](/docs/api/basics/compression) a specific section into the documentation.

Using it, it will **save payload size up to 70%**, so ensure you are using it!

## Informational headers

```bash
$ curl -i -I -X GET https://api.microlink.io/?url=https%3A%2F%2Fwww.reddit.com

x-response-time : 21.518ms
x-fetch-mode    : fetch
x-fetch-time    : 618.055ms
```

<Figcaption>The mission of these headers helps you optimize the response time of the API.</Figcaption>

As part of the response header, we added two new headers to help optimize your API calls:

#### x-response-time

It returns the total amount of time used for processing the API call.

#### x-fetch-mode

It specifies the way to content will be fetched.

It could be `fetch` or `prerendering`. The value is strongly related with [prerender](/docs/api/parameters/prerender) API parameter.

#### x-fetch-time

It expresses the amount of time spend just in the `x-fetch-mode` step.

## Better contextual metadata

We added `size` and `duration` every time that [Microlink API](/docs/api/getting-started/overview) detects you are working with `image` or `video` 🎉.

```bash
curl https://api.microlink.io/?url=https://vimeo.com/188175573?v=hwMkbaS_M_c&video&filter=video
```

The API response will look like:

```json
{
  "status": "success",
  "data": {
    "video": {
      "url": "https://gcs-vimeo.akamaized.net/exp=1530385652~acl=%2A%2F823603783.mp4%2A~hmac=5237941fe7ed6229d27eb8048360786fd0a164fb877cea8c654dbeee0b2eedd1/vimeo-prod-skyfire-std-us/01/2635/7/188175573/823603783.mp4",
      "width": 1280,
      "height": 720,
      "type": "h264",
      "size": 7228264,
      "size_pretty": "7.23 MB",
      "duration": 28.533333,
      "duration_pretty": "29s"
    }
  }
}
```

Notes how we provided the field with **pretty** suffix as well. It's the same value but human readable 👌.
