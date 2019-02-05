import React from 'react'
import { CodeEditor, Terminal } from 'components/elements'
import components, { Figcaption, Strong } from 'components/markdown'
import md from 'markdown-in-js'

import postLayout from 'layouts/post'

export const frontmatter = {
  title: 'Product Brief #6: Custom Rules, new metadata & improvements',
  date: '30 Jun 2018',
  slug: 'custom-rules-compression-headers'
}

export default postLayout(frontmatter)(
  md(components)`

## Custom Rules

[![](https://i.imgur.com/subDjQ1.png)](https://microlink.io/blog/custom-rules)

${(
  <Figcaption>
    {'Custom Rules enables build custom API response based on your necessities'}.
  </Figcaption>
)}

[microlink API](https://docs.microlink.io/api/#introduction) is so powerful for extracting data. We created links previews as one of the possible use cases (actually our [SDK](https://docs.microlink.io/sdk/)), but because the API response returns generic data, it's a bit difficult use microlink API for different problems scope.

Now, we are introducing the concept of **Custom Rules**: The ability to setup custom API response based on user necessities.

**Custom Rules** work specifying what you want to get using CSS selectors. Also, you can provide consistent types (\`url\`, \`author\`, \`date\`, etc) avoiding getting unexpected value in your data.

In other words, you can use it as a scraper as service 🤯.

We wrote a specific blog [post](https://microlink.io/blog/custom-rules) explaining how to use custom rules, taking an Instagram profile as an example.

## Compression documentation

[![](https://i.imgur.com/Jh7GHUP.png)](https://docs.microlink.io/api/#api-basics/compression)

${(
  <Figcaption>
    Ensure to use <Strong children='Accept-Encoding' /> for enabling compression
  </Figcaption>
)}

Althought we support **brotli** and **gzip** from the beginning, we [added](https://docs.microlink.io/api/#api-basics/compression) a specific section into the documentation.

Using it, it will **save payload size up to 70%**, so ensure you are using it!

## Informational headers

${(
  <CodeEditor language='bash'>{`$ curl -i -I -X GET https://api.microlink.io/?url=https%3A%2F%2Fwww.reddit.com
x-response-time : 21.518ms
x-fetch-mode    : fetch
x-fetch-time    : 618.055ms`}</CodeEditor>
)}

${(
  <Figcaption>
    The mission of these headers helps you optimize the response time of the API.
  </Figcaption>
)}

As part of the response header, we added two new headers to help optimize your API calls:

#### x-response-time

It returns the total amount of time used for processing the API call.

#### x-fetch-mode

It specifies the way to content will be fetched.

It could be \`fetch\` or \`prerendering\`. The value is strongly related with [prerender](https://docs.microlink.io/api/#api-parameters/prerender) API parameter.

#### x-fetch-time

It expresses the amount of time spend just in the \`x-fetch-mode\` step.

## Better contextual metadata

We added \`size\` and \`duration\` every time that [microlink API](https://docs.microlink.io/api/#introduction) detects you are working with \`image\` or \`video\` 🎉.

${(
  <Terminal>
    curl https://api.microlink.io/?url=https://vimeo.com/188175573?v=hwMkbaS_M_c&video&filter=video
  </Terminal>
)}

The API response will look like:

${(
  <CodeEditor language='json'>{`{
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
}`}</CodeEditor>
)}

Notes how we provided the field with **pretty** suffix as well. It's the same value but human readable 👌.`
)
