import React from 'react'
import { Link } from 'components/elements/Link'

import {
  faqFromItems,
  ProxyHeadersTtlLinks,
  sdkExample
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Web Scraping API: Structured Data Extraction',
  description:
    'Extract structured JSON from any URL. Declare CSS-selector rules, render JavaScript pages when needed, and get typed fields back — links, emails, markdown, images, or a custom shape.'
}

export const HERO = {
  title: 'Web Scraping',
  description:
    'Turn any URL into structured JSON. Point CSS selectors at the fields you need — Microlink fetches the page, runs a browser when the content is client-rendered, and returns typed data.',
  plans: [
    {
      plan: 'Free',
      description: 'Full data extraction. 25 requests/day without a key.'
    },
    {
      plan: 'Pro',
      description: (
        <>
          <ProxyHeadersTtlLinks /> on the same extraction calls.
        </>
      )
    }
  ]
}

export const OVERVIEW = {
  title: 'Declare the shape. Get the data.',
  body: (
    <>
      Web scraping on Microlink is built around a target{' '}
      <Link href='/docs/api/parameters/url'>url</Link> and a{' '}
      <Link href='/docs/api/parameters/data'>data</Link> schema. Each key in
      that schema becomes a field in the response; each rule tells Microlink how
      to pull that field from the page — a CSS selector, an attribute, a type,
      or a list. The API returns clean JSON: absolute URLs, typed images with
      size and dimensions, validated emails, or Markdown of the content you
      scoped.
    </>
  ),
  bullets: [
    'CSS selectors and attr rules define every field you want back',
    'Headless Chrome runs when the page needs JavaScript to render',
    'Types like url, image, and email normalize and validate server-side',
    {
      key: 'compose-pro',
      label: (
        <>
          Same call can take <ProxyHeadersTtlLinks ttlLabel='ttl' /> when the
          target is hard or repeated (Pro)
        </>
      )
    }
  ]
}

export const PARAMS = {
  title: 'What an extraction call accepts.',
  rows: [
    {
      name: 'url',
      type: 'string',
      description: 'The page to fetch and extract from.',
      href: '/docs/api/parameters/url'
    },
    {
      name: 'data',
      type: 'object',
      description:
        'Output schema: CSS-selector rules for each field you want back.',
      href: '/docs/api/parameters/data'
    },
    {
      name: 'selector / selectorAll',
      type: 'string',
      description: 'Scope a field or collection to part of the DOM.',
      href: '/docs/api/parameters/data'
    },
    {
      name: 'prerender',
      type: "boolean | 'auto'",
      description: 'Run headless Chrome for client-rendered pages.',
      href: '/docs/api/parameters/prerender'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'Automatic or BYO proxy when the target blocks the request.',
      href: '/docs/api/parameters/proxy'
    },
    {
      name: 'ttl',
      type: 'string | number',
      description:
        'Cache lifetime so repeated extractions on the same URL stay free.',
      href: '/docs/api/parameters/ttl'
    }
  ]
}

export const EXAMPLES = {
  title: 'Extraction shapes.',
  panels: [
    {
      id: 'extract',
      title: 'Custom extract',
      description: 'Shape any JSON with CSS-selector rules and typed fields.',
      snippet: sdkExample(`const { image } = await microlink.extract(url, {
  image: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})`)
    },
    {
      id: 'links',
      title: 'Collect links',
      description: 'Every matching href as absolute, deduped strings.',
      snippet: sdkExample(`const links = await microlink.links(url, {
  selectorAll: 'nav a'
})`)
    },
    {
      id: 'emails',
      title: 'Harvest emails',
      description: 'mailto and plain-text addresses, validated server-side.',
      snippet:
        sdkExample(`const emails = await microlink.emails('https://microlink.io')
// → ['hello@microlink.io']`)
    },
    {
      id: 'images',
      title: 'Collect images',
      description: 'Image assets from the page as a clean collection.',
      snippet: sdkExample('const images = await microlink.images(url)')
    },
    {
      id: 'videos',
      title: 'Collect videos',
      description: 'Playable video sources discovered on the page.',
      snippet: sdkExample('const videos = await microlink.videos(url)')
    },
    {
      id: 'audios',
      title: 'Collect audios',
      description: 'Audio sources extracted from the target URL.',
      snippet: sdkExample('const audios = await microlink.audios(url)')
    },
    {
      id: 'markdown',
      title: 'Page to Markdown',
      description: 'Scope content to Markdown for indexing or RAG.',
      snippet: sdkExample(`const md = await microlink.markdown(url, {
  selector: 'article'
})`)
    },
    {
      id: 'html',
      title: 'Page to HTML',
      description: 'Return scoped HTML for the region you select.',
      snippet: sdkExample(`const html = await microlink.html(url, {
  selector: 'article'
})`)
    },
    {
      id: 'text',
      title: 'Page to text',
      description: 'Plain text from a selector — no markup noise.',
      snippet: sdkExample(`const text = await microlink.text(url, {
  selector: 'article'
})`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['function', 'proxy', 'headers', 'ttl', 'antibot'],
  title: 'Compose after you extract.'
}

export const FAQ_ITEMS = faqFromItems([
  {
    question: 'How does Microlink scrape a page?',
    text: 'You send a url and a data schema of CSS-selector rules. Microlink fetches the page — with headless Chrome when JavaScript must run — applies each rule, and returns typed JSON for the fields you declared.'
  },
  {
    question: 'Can I scrape JavaScript-rendered pages?',
    text: 'Yes. Microlink runs headless Chrome when the content is client-rendered. Pass prerender to force it when auto-detection is not enough.'
  },
  {
    question: 'What is the difference between a custom data rule and a preset?',
    text: 'A custom data object lets you shape any JSON you need. Presets like links, emails, and markdown are fixed shapes over the same engine — use them when they match, and a custom schema when they do not.'
  },
  {
    question: 'Does scraping work on the free plan?',
    text: 'Yes. Data extraction works on the free tier (25 requests per day without an API key). Pro adds proxy, custom headers, and configurable TTL on the same calls.'
  },
  {
    question: "What happens when a selector doesn't match?",
    text: 'Define a rule as an array of fallbacks and Microlink tries each one. If nothing matches, the field comes back empty rather than failing the request.'
  }
])
