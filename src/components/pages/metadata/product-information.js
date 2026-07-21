import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Faq from 'components/patterns/Faq/Faq'
import { CDN_EDGES } from 'helpers/cdn-edges'

export const TOP_FAQ_ITEMS = [
  {
    question: 'What is a website metadata API and how does it work?',
    text: 'A website metadata API takes any URL as input, loads the page with a full headless browser, and returns a unified JSON response containing the title, description, image, logo, favicon, color palette, language, author, date, and other structured fields. Think of it as a programmable link to metadata: one URL in, fully normalized metadata out. Microlink merges Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML tags in one call — so you never have to pick a single source.',
    answer: (
      <>
        <div>
          A <b>website metadata API</b> takes any URL as input, loads the page
          with a full{' '}
          <Link href='/blog/what-is-a-headless-browser'>headless browser</Link>,
          and returns a unified JSON response containing title, description,
          image, logo, favicon, color palette, language, author, date, and more.
          Think of it as a programmable link to metadata: one URL in, fully
          normalized metadata out.
        </div>
      </>
    )
  },
  {
    question: 'Which metadata sources does Microlink normalize?',
    text: 'Microlink normalizes Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML head tags into one unified JSON response. The API prioritizes the most accurate source per field automatically, so you always get the best title, description, image, logo, author, date, language, and palette without writing custom parsing logic.',
    answer: (
      <>
        <div>
          Microlink normalizes seven sources into one response:{' '}
          <Link href='https://ogp.me'>Open Graph</Link>, Twitter Cards,{' '}
          <Link href='https://json-ld.org'>JSON-LD</Link>, oEmbed,{' '}
          <Link href='https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microdata'>
            microdata
          </Link>
          , <Link href='https://rdfa.info'>RDFa</Link>, and HTML head tags.
        </div>
        <div>
          The API prioritizes the most accurate source per field automatically —
          you get the best title, description, image, logo, author, date,
          language, and palette without writing custom parsing logic or
          maintaining brittle scrapers.
        </div>
      </>
    )
  },
  {
    question: 'How do I convert a URL to metadata or a link preview?',
    text: 'Use the metadata API as a URL preview and link preview endpoint: send an HTTPS GET request to https://api.microlink.io?url=<your-url> and you will receive JSON with the normalized metadata, including og:title, og:description, og:image, og:type, and og:site_name. No authentication is required for the free tier. The response merges Open Graph with Twitter Cards, JSON-LD, and HTML fallbacks so you always get a complete preview.',
    answer: (
      <>
        <div>
          Use the metadata API as a <b>URL preview</b> and <b>link preview</b>{' '}
          endpoint. Send an HTTPS <code>GET</code> request to{' '}
          <code>https://api.microlink.io?url=&lt;your-url&gt;</code> and you
          will receive JSON with the normalized metadata — including{' '}
          <i>og:title</i>, <i>og:description</i>, <i>og:image</i>,{' '}
          <i>og:type</i>, and <i>og:site_name</i>.
        </div>
        <div>
          No authentication is required for the free tier. The response merges
          Open Graph with Twitter Cards, JSON-LD, and HTML fallbacks so you
          always get a complete preview — see the{' '}
          <Link href='/docs/guides/metadata'>metadata guide</Link> for all
          fields.
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink handle JavaScript-rendered metadata?',
    text: 'Yes. Unlike regex-based scrapers, Microlink runs a full Chromium headless browser so React, Vue, Next.js, and other SPAs that inject meta tags at runtime are captured correctly. This means metadata added by frameworks like next/head, react-helmet, or useHead hooks is detected just as reliably as server-rendered tags.',
    answer: (
      <>
        <div>
          Yes. Unlike regex-based scrapers, Microlink runs a full Chromium
          headless browser. So React, Vue, Next.js, and other SPAs that inject
          meta tags at runtime are captured correctly.
        </div>
        <div>
          Metadata added by frameworks like <code>next/head</code>,{' '}
          <code>react-helmet</code>, or Nuxt <code>useHead</code> hooks is
          detected just as reliably as server-rendered tags. Stale SSR or
          partial hydration edge cases are handled out of the box.
        </div>
      </>
    )
  },
  {
    question: 'Can I extract favicons, logos, and brand color palettes?',
    text: 'Yes. Microlink returns the logo and favicon URLs for every page, with dimensions and MIME type. Add palette=true to the query and you also get the dominant color palette extracted from the og:image or the logo — perfect for theming link preview cards, chat unfurls, and brand-aware UI without manual design work.',
    answer: (
      <>
        <div>
          Yes. Microlink returns the <i>logo</i> and <i>favicon</i> URLs for
          every page, with dimensions and MIME type.
        </div>
        <div>
          Add <code>palette=true</code> to the query and you also get the
          dominant color palette extracted from the <i>og:image</i> or the logo.
          Perfect for theming link preview cards, chat unfurls, and brand-aware
          UI without manual design work.
        </div>
      </>
    )
  },
  {
    question: 'Why use a metadata API instead of scraping the HTML myself?',
    text: 'Metadata extraction looks simple until it is not. Social networks use inconsistent tag naming, some sites inject tags at runtime, JSON-LD can be deeply nested, oEmbed requires provider-specific endpoints, and encoding bugs are everywhere. Microlink handles headless browser rendering, rule-based normalization with metascraper, proxy rotation, caching, and concurrency at scale — so you ship features instead of fighting the long tail of the web.',
    answer: (
      <>
        <div>
          Metadata extraction looks simple until it is not. Social networks use
          inconsistent tag naming, some sites inject tags at runtime, JSON-LD
          can be deeply nested, <Link href='https://oembed.com'>oEmbed</Link>{' '}
          requires provider-specific endpoints, and encoding bugs are
          everywhere.
        </div>
        <div>
          Microlink handles{' '}
          <Link href='/blog/what-is-a-headless-browser'>headless browser</Link>{' '}
          rendering, rule-based normalization with{' '}
          <Link href='https://metascraper.js.org'>metascraper</Link>, proxy
          rotation, caching, and concurrency at scale — so you ship features
          instead of fighting the long tail of the web.
        </div>
      </>
    )
  },
  {
    question: 'Is there a free tier for the metadata API?',
    text: 'Yes. The metadata API is free to use with 25 requests per day — no login, no credit card, and no setup required. Just call the endpoint and get normalized metadata back. For production workloads that need higher volume, automatic proxy rotation, custom headers, configurable TTL, and priority support, see our Pro plans starting at €39/month.',
    answer: (
      <>
        <div>
          Yes. The metadata API is <b>free to use with 25 requests per day</b> —
          no login, no credit card, and no setup required. Just call the
          endpoint and get normalized metadata back.
        </div>
        <div>
          For production workloads that need higher volume,{' '}
          <Link href='/docs/guides/common/proxy'>automatic proxy rotation</Link>
          , <Link href='/docs/api/parameters/headers'>custom headers</Link>,{' '}
          <Link href='/docs/api/parameters/ttl'>configurable TTL</Link>, and
          priority support, see our <Link href='/pricing'>Pro plans</Link>{' '}
          starting at €39/month.
        </div>
      </>
    )
  }
]

export const ProductInformation = () => (
  <Faq
    title='Product Information'
    caption={
      <>
        Everything you need to know about <LineBreak /> the Microlink metadata
        API.
      </>
    }
    css={theme({
      py: SECTION_VERTICAL_SPACING,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      ...TOP_FAQ_ITEMS,
      {
        question: 'How do I integrate the metadata API with Node.js or Python?',
        answer: (
          <>
            <div>
              In minutes. Visit our{' '}
              <Link href='/docs/guides/metadata'>documentation</Link> for
              interactive playground examples, official{' '}
              <Link href='/integrations/sdk'>SDKs</Link> (Node.js, Python, Ruby,
              Go), and copy-paste code snippets for any language.
            </div>
            <div>
              The <Link href='/integrations/sdk'>Microlink SDK</Link> turns the
              metadata response into a rendered link preview component with{' '}
              <Link href='/docs/api/parameters/iframe/#providers-supported'>
                250+ verified providers
              </Link>{' '}
              supported out of the box.
            </div>
          </>
        )
      },
      {
        question: 'What is metascraper and how does it power the API?',
        answer: (
          <>
            <div>
              <Link href='https://metascraper.js.org'>metascraper</Link> is the
              open-source rule-based library that underpins Microlink. It
              evaluates each desired field (title, image, date, etc.) against a
              series of rules and only accepts values that satisfy a strict data
              shape.
            </div>
            <div>
              This approach means when the API detects a field, you can be
              confident it is what it claims to be — no false positives from
              truncated strings, empty images, or malformed dates. The library
              is{' '}
              <Link href='https://github.com/microlinkhq/metascraper'>
                open source on GitHub
              </Link>{' '}
              and you can contribute rules for your own edge cases.
            </div>
          </>
        )
      },
      {
        question: 'What is your uptime SLA and expected latency?',
        answer: (
          <>
            <div>
              We guarantee <Link href='/enterprise'>enterprise-grade</Link>{' '}
              reliability with a 99.9% uptime SLA. Every request runs in an
              isolated browser instance to guarantee security and avoid
              shared-state leaks. Check real-time availability on the{' '}
              <Link href='/status'>status page</Link>.
            </div>
            <div>
              For latency: metadata responses are distributed via Cloudflare's{' '}
              {CDN_EDGES} edge locations, meaning{' '}
              <Link href='/docs/api/parameters/ttl'>cached responses</Link> are
              delivered in milliseconds. Our optimized Chromium pool handles
              cold starts efficiently for consistent P95 performance.
            </div>
          </>
        )
      },
      {
        question: 'Other questions?',
        answer: (
          <>
            <div>
              We’re always available at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)
