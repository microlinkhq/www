---
title: 'technologies'
description: Identify the software stack behind any URL using Microlink's technology detection. It returns a detailed list of frameworks, CDNs, and analytics tools with confidence scores.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<boolean>'/></TypeContainer><br/>
Default: <Type children='true'/>

It identifies technology behind target [url](/docs/api/parameters/url), powered by [Wappalyzer](https://www.wappalyzer.com).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { 
  insights: {
    technologies: true
  }
})} />

A detected technology is defined by:

- `name` (e.g., <Type children="'CloudFlare'"/>)<br/>
  The normalized name of the techonlogy.
- `confidence` (e.g., <Type children="100"/>)<br/>
  How sure technology is present on the site, scoring from <Type children="0"/> to <Type children="100"/>.
- `logo` (e.g., <Type children="'https://www.wappalyzer.com/images/icons/CloudFlare.svg'"/>)<br/>
  The technology logo as URL.
- `logo` (e.g., <Type children="'http://www.cloudflare.com'"/>)<br/>
  The main website of the technology.
- `categories` (e.g., <Type children="['PaaS', 'CDN']"/>)<br/>
  A list of keywords identified with similar technologies.

The output can contain one or more technologies detected.

```json
{
  "status": "success",
  "data": {
    "insights": {
      "technologies": [
        {
          "name": "CloudFlare",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/CloudFlare.svg",
          "url": "http://www.cloudflare.com",
          "categories": [
            "CDN"
          ]
        },
        {
          "name": "Gatsby",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/Gatsby.svg",
          "url": "https://www.gatsbyjs.org/",
          "categories": [
            "Static site generator",
            "JavaScript frameworks"
          ]
        },
        {
          "name": "Google Analytics",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/Google%20Analytics.svg",
          "url": "http://google.com/analytics",
          "categories": [
            "Analytics"
          ]
        },
        {
          "name": "Now",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/zeit.svg",
          "url": "https://zeit.co/now",
          "categories": [
            "Web servers"
          ]
        },
        {
          "name": "Polyfill",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/polyfill.svg",
          "url": "https://polyfill.io",
          "categories": [
            "JavaScript libraries"
          ]
        },
        {
          "name": "React",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/React.png",
          "url": "https://reactjs.org",
          "categories": [
            "JavaScript frameworks"
          ]
        },
        {
          "name": "Segment",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/Segment.png",
          "url": "https://segment.com",
          "categories": [
            "Analytics"
          ]
        },
        {
          "name": "Stripe",
          "confidence": 100,
          "logo": "https://www.wappalyzer.com/images/icons/Stripe.png",
          "url": "http://stripe.com",
          "categories": [
            "Payment processors"
          ]
        },
        {
          "name": "webpack",
          "confidence": 0,
          "logo": "https://www.wappalyzer.com/images/icons/webpack.svg",
          "url": "https://webpack.js.org/",
          "categories": [
            "Miscellaneous"
          ]
        }
      ]
    }
  }
}
```

<Figcaption>An example of techonologies detected over microlink.io.</Figcaption>
