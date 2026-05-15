# Embed Alternative Template

Canonical reference for `src/pages/alternative/[slug].js` pages where the competitor is an **embed / oEmbed / link-preview API** (e.g. Iframely, Embedly, Linkz.ai, Jsonlink.io). Use this when the competitor is NOT a screenshot API.

The primary live reference is `src/pages/alternative/iframely.js`. Match its structure closely.

## When to use this template instead of `template-structure.md`

Use this embed template when:

- The competitor's main offering is turning URLs into cards / iframes / oEmbed responses.
- The competitor does not have a competing screenshot benchmark in `src/pages/benchmarks/screenshot-api.js`.
- The buyer is integrating link previews, rich-media embeds, or content cards — not headless-browser screenshots.

If the competitor straddles both (e.g. they offer screenshots AND embed cards), pick the **dominant** product. If the competitor leads with embeds and has screenshots as a side feature, use this template. If they lead with screenshots, use `template-structure.md`.

## Section order

```jsx
const [CompetitorName]Page = () => (
  <Layout>
    <Hero />
    <WhySwitchSection />
    <PricingSection />
    <CTASection />
    <ComparisonSection />
    <HonestySection />
    <TryItSection />
    <FAQSection />
  </Layout>
)
```

Key omissions vs the screenshot template:

- **No `SpeedSection`**. There is no embed-API benchmark in this repo. Do not fabricate one.
- **No `RaceContainer` in the hero**. The hero gets `<InteractiveExample flat hideFooter />` instead.

## Imports

```js
import {
  borders,
  colors,
  layout,
  theme,
  textGradient,
  fontSizes,
  space,
  radii,
  breakpoints
} from 'theme'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Faq from 'components/patterns/Faq/Faq'
import ArrowLink from 'components/patterns/ArrowLink'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { cdnUrl } from 'helpers/cdn-url'
import { trackEvent } from 'helpers/plausible'
import styled, { css } from 'styled-components'
import React from 'react'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { InteractiveExample } from 'pages/embed'
```

The embed-only import is mandatory:

- `InteractiveExample` — the Custom / SDK / Iframe toggle pulled from the embed landing.

It is exported from `src/pages/embed.js`. Do not duplicate its internals.

> **Do not import `PreviewVariantsShowcase` on alternative pages.** It was used at the bottom of `TryItSection` on Iframely and Embedly and triggered a duplicate `stripe.com` API request on load. The showcase now lives only on the main `/embed` landing. Alternative pages end the `TryItSection` after the "Start now for free" link.

## Hero

- Wrapper: `<BluePrintBackground as='section'>`.
- Heading: `variant={null}`, `textAlign: 'center', fontSize: [4, 4, 5, 5], color: 'black'`, with `<GradientText>[Competitor]</GradientText>` in the title.
- Caption: `forwardedAs='h2'`, `titleize={false}`, plain-language one-paragraph positioning that names the competitor's pricing model and points to Microlink's tier.
- CTA: `<ArrowLink href='/embed'>Get Started Free</ArrowLink>` with `trackEvent('alternative cta', { competitor: '[slug]' })`.
- After the CTA, render `<InteractiveExample flat hideFooter />` directly. No `<HeroCodeLink>`, no "Quick test on a URL" block, no embedded link.

The `flat` and `hideFooter` props are required for the hero. They:

- Make the InteractiveExample background transparent (so it blends with the BluePrintBackground).
- Remove the box-shadow.
- Hide the API URL footer (which is redundant in this context).

If you find yourself wanting either off, you are deviating from the template — confirm with the user first.

## TryItSection

The `TryItSection` is a minimal text-and-link CTA. No preview showcase, no code editor:

```jsx
const TryItSection = () => (
  <Section as='section' css={theme({ py: [5, 5, 6, 6] })}>
    <SectionInner>
      <Subhead css={theme({ fontSize: CTA_TITLE_FONT_SIZE, textAlign: 'center' })}>
        One URL, <span css='color: #fa5252;'>one</span> API call
      </Subhead>
      <Caption forwardedAs='div' css={theme({ pt: [3, 3, 4, 4], maxWidth: [layout.small, layout.small, layout.normal, layout.normal], textAlign: 'center' })}>
        Pass any URL and get back the normalized metadata plus a ready-to-paste iframe. Same shape, every provider.
      </Caption>
      <Flex css={theme({ pt: [3, 3, 4, 4], gap: [3, 3, 4, 4], flexDirection: ['column', 'column', 'row', 'row'], alignItems: 'center' })}>
        <Link
          href='/docs/guides/embed'
          onClick={() => trackEvent('alternative cta', { competitor: '[slug]' })}
          css={theme({ fontSize: CTA_LINK_FONT_SIZE })}
        >
          Start now for free
        </Link>
      </Flex>
    </SectionInner>
  </Section>
)
```

Notice:

- `useBreakpoint()` is **not** imported.
- `MultiCodeEditorInteractive` is **not** imported.
- `PreviewVariantsShowcase` is **not** imported — see the note in the Imports section above.
- The section ends after the "Start now for free" link; the FAQ section provides the vertical breathing room below.

## CTA targets

| Surface              | Screenshot template     | Embed template          |
| -------------------- | ----------------------- | ----------------------- |
| Hero ArrowLink       | `/screenshot`           | `/embed`                |
| TryItSection link    | `/docs/guides/screenshot` | `/docs/guides/embed`  |
| Pricing card link    | `/screenshot`           | `/embed`                |
| Final CTA ArrowLink  | `/screenshot`           | `/embed`                |

Always include the `trackEvent('alternative cta', { competitor: '[slug]' })` callback on every CTA, just like the screenshot template.

## Comparison table — Pro proxy rows

Embed alternatives compete in a category where Microlink Pro is materially differentiated by the residential proxy bundle. Always include these three rows in `COMPARISON_DATA`, with `highlight: true`:

```js
{
  feature: 'Rotating residential proxy (Pro)',
  microlink: true,
  [competitorKey]: false,
  highlight: true,
  note: 'Microlink Pro routes each request through a fresh residential IP with automatic retry on block or throttle.'
},
{
  feature: 'Antibot detection & bypass (Pro)',
  microlink: true,
  [competitorKey]: false,
  highlight: true,
  note: 'Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security.'
},
{
  feature: 'CAPTCHA handling (Pro)',
  microlink: true,
  [competitorKey]: false,
  highlight: true,
  note: 'reCAPTCHA v2/v3, hCaptcha, FunCaptcha, GeeTest, Cloudflare Turnstile — handled inside the API.'
},
```

Only flip `[competitorKey]: true` if the competitor's docs explicitly document equivalent capabilities — verify on their site before doing so. Iframely, Embedly, Linkz.ai, and Jsonlink.io do not at the time of writing.

Other rows worth including on every embed page:

- `URL → metadata API`
- `URL → embeddable iframe`
- `oEmbed proxy endpoint`
- `Card / large card output`
- `React component / SDK`
- `Lazy-loaded embed widgets`
- `Theme switching (light / dark)`
- `Open Graph + Twitter Card parsing`
- `Custom HTTP headers`
- `Custom cookies`
- `Remote JS execution`
- `Wait for selector`
- `Cookie banner blocking`
- `Ad blocking`
- `Screenshot capture` (Microlink-only differentiator on embed pages)
- `PDF generation`
- `HTML rendering`
- `Animated GIF / video output`
- `Lighthouse audits`
- `Technology detection`
- `Color palette extraction`
- `Markdown conversion`
- `MQL (structured data extraction)`
- `Open-source core (MIT)`
- `240+ CDN edge nodes`
- `Per-minute rate limit on paid plans` (compare against the competitor's documented cap)
- `Free plan` (compare free quotas)
- `Publisher-specific embed catalog` (some competitors will out-cover Microlink here — note honestly)

## WhySwitch items

Always include one item dedicated to the Pro proxy bundle. Use a structure equivalent to Iframely's item 04:

```jsx
{
  number: '04',
  title: 'Pro unlocks a built-in web proxy',
  description: (
    <>
      [Competitor] fetches cooperative publisher endpoints. The moment a target
      sits behind <b>Cloudflare</b>, <b>DataDome</b>, <b>Akamai</b>, or any of
      the 9 antibot providers Microlink covers, [Competitor] has nothing to
      offer. Microlink Pro folds three normally-separate stacks — a{' '}
      <b>rotating residential proxy</b>, <b>antibot detection</b>, and{' '}
      <b>CAPTCHA handling</b> — into the same $45 plan.<br /><br />
      <Link href='/feature/proxy'>See how the proxy works</Link>.
    </>
  )
}
```

The `/feature/proxy` internal link is mandatory.

The remaining 5 items should cover the competitor-specific angles you discovered in research (pricing model, rate limits, free tier, open-source core, etc.). Do not reuse Iframely's exact wording — every alternative page must read distinct.

## Pricing card bullets (Microlink side)

The Microlink pricing card must surface the proxy bundle in its feature list. Iframely's bullets are the canonical list:

```js
[
  'Embeds, screenshots, PDF, metadata, remote JS',
  'Rotating residential proxy + antibot bypass + CAPTCHA handling',
  'Free: 50 requests/day, no credit card, no expiry',
  'No per-minute cap on paid plans',
  '240+ edge nodes, 99.9% SLA',
  'Open-source core (MIT licensed)',
  `$${MICROLINK_PRICE_PER_1000} per 1,000 requests`
]
```

You may reword, but the proxy + antibot + CAPTCHA bundle line must stay visible.

## FAQSection

The FAQ section must declare an explicit `title='FAQ'` and use a top-only padding so it visibly separates from the `TryItSection` CTA above it (which no longer carries a preview showcase):

```jsx
const FAQSection = () => (
  <Faq
    title='FAQ'
    css={theme({ pt: [5, 5, 6, 6], pb: 0 })}
    questions={FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))}
  />
)
```

Notes:

- The `title='FAQ'` heading is required — leaving it off makes the section land cold right after the CTA link with no visual anchor.
- `pt: [5, 5, 6, 6]` is what creates the breathing room between the CTA link and the FAQ heading. Do not drop it back to `py: 0`.
- `pb: 0` keeps the footer spacing unchanged.

## FAQ items

Include one question dedicated to the proxy bundle, with a link to `/feature/proxy` and a mention of `is-antibot` (the open-source detection library on GitHub). Iframely's "Does Microlink really replace a separate proxy and CAPTCHA solver?" is the canonical example — paraphrase, do not copy.

Total FAQ count: 7–9, same as the screenshot template.

## SEO Head

```jsx
export const Head = () => (
  <Meta
    title='[Competitor] Alternative for [angle]'
    description='[one-sentence pricing + value-prop summary]'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '[Competitor] Alternative for [angle] | Microlink',
        description: '[same as above]',
        url: 'https://microlink.io/alternative/[slug]',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: 'Microlink',
          applicationCategory: ['DeveloperApplication', 'WebApplication'],
          url: 'https://microlink.io',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text }
        }))
      }
    ]}
  />
)
```

The `image` field uses `banner/screenshot.jpeg` because that is the existing alternative banner — keep it consistent unless an embed-specific banner asset ships later.

## Footer entry

Add the new page to `src/components/patterns/Footer/Footer.js` Comparisons list in alphabetical order:

```js
{ label: 'vs [Competitor]', href: '/alternative/[slug]' },
```

## Gotchas

- **Do not use `<code css={theme({...})}>`.** This repo's `css` prop transform fails on `<code>` and throws "Element type is invalid". Use `<b>` or a styled component instead.
- **Do not duplicate `HERO_DEMOS` or the card variant components.** Import from `pages/embed`. (Note: `PreviewVariantsShowcase` itself must not be rendered on alternative pages — see Imports and TryItSection.)
- **The proxy section is no longer rendered as its own section on embed pages** (it was removed during Iframely review). Surface proxy claims through WhySwitch item 04, the comparison rows, the Microlink pricing card bullet, and the dedicated FAQ — not via a standalone section.
- **`InteractiveExample` accepts `flat` and `hideFooter`** as boolean props. Both default to `false` (the embed.js page's normal styling). Always pass both on alternative pages.
- **`PreviewVariantsShowcase` is forbidden on alternative pages.** It fires a `stripe.com` request on mount and the main `/embed` landing already loads it. Embedding it on Iframely/Embedly produced duplicate API calls and was removed.
- **FAQ section needs `title='FAQ'` and `pt: [5, 5, 6, 6], pb: 0`.** Without those, the FAQ collapses into the CTA above it with no visual separation.
