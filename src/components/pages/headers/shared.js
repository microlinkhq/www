import React from 'react'
import { Link } from 'components/elements/Link'

import { faqFromItems, sdkExample } from 'components/patterns/FeatureStory'

export const META = {
  title: 'Custom HTTP Headers API: Secrets Stay Out of URLs',
  description:
    'Pass cookies, tokens and any header through the headers option. They ride the HTTP layer — x-api-header-* is forwarded to the target fetch and never appears in the URL.'
}

export const HERO = {
  title: 'Custom HTTP Headers',
  tag: 'PRO',
  description:
    'Secrets stay out of URLs. Pass headers on the HTTP layer, and any x-api-header-* is forwarded to the target fetch — cookies and tokens never touch the query string.'
}

export const OVERVIEW = {
  title: 'Headers ride the HTTP layer.',
  body: (
    <>
      The <Link href='/docs/api/parameters/headers'>headers</Link> option
      travels as real request headers — never in the URL. The API forwards any{' '}
      <code>x-api-header-&lt;name&gt;</code> to the target fetch as{' '}
      <code>&lt;name&gt;</code>, so a session cookie becomes the target’s{' '}
      <code>cookie</code> header. Your <code>apiKey</code> rides the same way,
      as <code>x-api-key</code>.
    </>
  ),
  bullets: [
    'headers travel as HTTP request headers — never query params',
    'x-api-header-cookie → forwarded to the target as cookie',
    'apiKey is sent as x-api-key, never in the URL',
    'Compose with proxy to authenticate behind an unblocker',
    'Secrets stay out of logs, history and shareable links'
  ]
}

export const PARAMS = {
  title: 'How headers are routed.',
  rows: [
    {
      name: 'headers',
      type: 'object',
      description: 'Sent as real HTTP request headers — never in the URL.',
      href: '/docs/api/parameters/headers'
    },
    {
      name: 'x-api-header-*',
      type: 'header',
      description: 'Forwarded to the target fetch with the prefix stripped.',
      href: '/docs/api/parameters/headers'
    },
    {
      name: 'apiKey',
      type: 'string',
      description: 'Sent as the x-api-key header by the client — not the URL.',
      href: '/docs/api/getting-started/overview'
    },
    {
      name: 'url',
      type: 'string',
      description: 'The target the forwarded headers are attached to.',
      href: '/docs/api/parameters/url'
    }
  ]
}

export const EXAMPLES = {
  title: 'Forward what the target needs.',
  panels: [
    {
      id: 'cookie',
      title: 'Forward a session cookie',
      description: 'x-api-header-cookie reaches the target as cookie.',
      snippet: sdkExample(`const markdown = await microlink.markdown(
  'https://x.com/some/article',
  { headers: { 'x-api-header-cookie': 'auth_token=…' } }
)`)
    },
    {
      id: 'bearer',
      title: 'Pass a bearer token',
      description: 'Any header is forwarded — here an Authorization token.',
      snippet: sdkExample(`const data = await microlink.extract(
  'https://api.example.com/me',
  { name: { selector: '.name' } },
  { headers: { 'x-api-header-authorization': 'Bearer …' } }
)`)
    },
    {
      id: 'user-agent',
      title: 'Set a user agent',
      description: 'Shape how the target sees the request.',
      snippet: sdkExample(`const { title } = await microlink.metadata(url, {
  headers: {
    'x-api-header-user-agent':
      'Mozilla/5.0 (compatible; MicrolinkBot/1.0)'
  }
})`)
    },
    {
      id: 'locale',
      title: 'Locale and consent',
      description: 'Send Accept-Language or a consent cookie before capture.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://example.com',
  {
    headers: {
      'x-api-header-accept-language': 'es-ES',
      'x-api-header-cookie': 'consent=accepted'
    }
  }
)`)
    },
    {
      id: 'with-proxy',
      title: 'Authenticate behind a proxy',
      description: 'Combine forwarded headers with proxy resolution.',
      snippet: sdkExample(`const { url } = await microlink.screenshot(
  'https://protected.example.com/account',
  {
    proxy: true,
    headers: { 'x-api-header-cookie': 'session=…' }
  }
)`)
    }
  ]
}

export const RELATED = {
  relatedSlugs: ['proxy', 'antibot', 'isolation', 'scraping'],
  title: 'Authenticate and reach targets.'
}

export const FAQ_ITEMS = faqFromItems([
  {
    question: 'Why not just put secrets in the URL?',
    text: 'URLs leak. They land in server logs, browser history, and shared links. Send the headers option on the HTTP layer instead, so cookies and tokens never appear in the query string.'
  },
  {
    question: 'How does x-api-header-* work?',
    text: 'The API forwards any request header prefixed with x-api-header- to the target fetch with the prefix stripped. So x-api-header-cookie becomes the target’s cookie header, and x-api-header-authorization becomes authorization.'
  },
  {
    question: 'How is my apiKey sent?',
    text: 'The client sends your apiKey as the x-api-key request header, never in the URL. Pass it once to createClient({ apiKey }) and every call is authenticated.'
  },
  {
    question: 'Do forwarded headers work on the free plan?',
    text: 'Standard request headers work on any plan. Forwarding x-api-header-* secrets to the target fetch is a Pro capability, since it typically pairs with authenticated or proxied requests.'
  },
  {
    question: 'Can I forward headers and use a proxy together?',
    text: 'Yes. headers compose with proxy on the same request, so one call can route through a residential IP and still forward a session cookie to authenticate on the target.'
  }
])
