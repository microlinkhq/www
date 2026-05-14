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
import { InteractiveExample, PreviewVariantsShowcase } from 'pages/embed'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const BREAKPOINT_SMALL_MAX = breakpoints[0]
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`
const SPACE_6 = `calc(${space[2]} - ${radii[1]})`

const CTA_TITLE_FONT_SIZE = [
  `calc(${fontSizes[3]} + ${space[3]} - ${space[1]})`,
  `calc(${fontSizes[4]} - ${space[1]})`,
  fontSizes[4],
  `calc(${fontSizes[4]} + ${SPACE_6})`
]

const CTA_LINK_FONT_SIZE = [
  `calc(${fontSizes[2]} + ${space[1]})`,
  fontSizes[3],
  `calc(${fontSizes[3]} + ${radii[1]})`,
  `calc(${fontSizes[3]} + ${space[1]})`
]

/* Pricing sources:
 * Embedly plans: https://embed.ly/pricing
 * Embedly rate limit (50 URLs/sec, paid plans): https://embed.ly/pricing
 * Embedly API endpoints (/1/oembed, /1/extract, /1/display): http://docs.embed.ly
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PRICING = {
  microlink: {
    price: 45,
    requests: 46000
  },
  embedly: {
    cardsPrice: 14,
    apiPrice: 119,
    apiEmbedUrls: 10000,
    apiExtractUrls: 10000,
    apiDisplayImages: 25000,
    overage: '$9.50 per 10,000 URLs'
  }
}

const MICROLINK_PRICE_PER_1000 = (
  (PRICING.microlink.price / PRICING.microlink.requests) *
  1000
).toFixed(2)

const EMBEDLY_API_PRICE_PER_1000 = (
  (PRICING.embedly.apiPrice / PRICING.embedly.apiEmbedUrls) *
  1000
).toFixed(2)

const PER_URL_MULTIPLIER = Math.floor(
  PRICING.embedly.apiPrice /
    PRICING.embedly.apiEmbedUrls /
    (PRICING.microlink.price / PRICING.microlink.requests)
)

const VOLUME_MULTIPLIER = (
  PRICING.microlink.requests / PRICING.embedly.apiEmbedUrls
).toFixed(1)

const COMPARISON_DATA = [
  { feature: 'URL → metadata API', microlink: true, embedly: true },
  { feature: 'URL → embeddable iframe', microlink: true, embedly: true },
  { feature: 'oEmbed proxy endpoint', microlink: true, embedly: true },
  { feature: 'Card / rich card output', microlink: true, embedly: true },
  { feature: 'React / JavaScript SDK', microlink: true, embedly: true },
  { feature: 'Lazy-loaded embed widgets', microlink: true, embedly: true },
  {
    feature: 'Open Graph + Twitter Card parsing',
    microlink: true,
    embedly: true
  },
  { feature: 'JSON response format', microlink: true, embedly: true },
  { feature: 'Custom HTTP headers', microlink: true, embedly: false },
  { feature: 'Custom cookies', microlink: true, embedly: false },
  {
    feature: 'Remote JS execution',
    microlink: true,
    embedly: false,
    highlight: true
  },
  { feature: 'Wait for selector', microlink: true, embedly: false },
  { feature: 'Cookie banner blocking', microlink: true, embedly: false },
  { feature: 'Ad blocking', microlink: true, embedly: false },
  {
    feature: 'Rotating residential proxy (Pro)',
    microlink: true,
    embedly: false,
    highlight: true,
    note: 'Microlink Pro routes each request through a fresh residential IP with automatic retry on block or throttle.'
  },
  {
    feature: 'Antibot detection & bypass (Pro)',
    microlink: true,
    embedly: false,
    highlight: true,
    note: 'Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security.'
  },
  {
    feature: 'CAPTCHA handling (Pro)',
    microlink: true,
    embedly: false,
    highlight: true,
    note: 'reCAPTCHA v2/v3, hCaptcha, FunCaptcha, GeeTest, Cloudflare Turnstile — handled inside the API.'
  },
  {
    feature: 'Screenshot capture',
    microlink: true,
    embedly: false,
    highlight: true
  },
  { feature: 'Full-page screenshots', microlink: true, embedly: false },
  {
    feature: 'PDF generation',
    microlink: true,
    embedly: false,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, embedly: false },
  { feature: 'Animated GIF / video output', microlink: true, embedly: false },
  { feature: 'Lighthouse audits', microlink: true, embedly: false },
  { feature: 'Technology detection', microlink: true, embedly: false },
  { feature: 'Color palette extraction', microlink: true, embedly: false },
  { feature: 'Markdown conversion', microlink: true, embedly: false },
  {
    feature: 'MQL (structured data extraction)',
    microlink: true,
    embedly: false,
    highlight: true
  },
  {
    feature: 'Open-source core (MIT)',
    microlink: true,
    embedly: false,
    highlight: true
  },
  { feature: '240+ CDN edge nodes', microlink: true, embedly: 'CDN cache' },
  {
    feature: 'Per-second rate limit on paid plans',
    microlink: 'None',
    embedly: '50 URLs/s cap',
    note: 'Embedly caps all paid plans at 50 URLs/second; higher throughput is custom-only.'
  },
  {
    feature: 'Free plan',
    microlink: '50/day, no expiry',
    embedly: '30-day trial only',
    highlight: true,
    note: 'Embedly offers a 30-day free trial on the API plan; Microlink keeps the free tier indefinitely.'
  },
  {
    feature: 'Per-request cost (entry API tier)',
    microlink: `$${MICROLINK_PRICE_PER_1000}/1,000 requests`,
    embedly: `$${EMBEDLY_API_PRICE_PER_1000}/1,000 URLs`,
    highlight: true
  },
  {
    feature: 'Publisher catalog size',
    microlink: '280+ oEmbed providers',
    embedly: '1,000+ providers',
    note: 'Embedly maintains a deeper publisher catalog. Microlink covers the most common oEmbed providers plus universal Open Graph fallback.'
  },
  {
    feature: 'Image transformation / resize API',
    microlink: false,
    embedly: true,
    note: 'Embedly Display optimizes images on the fly (resize, crop, format). Microlink does not provide an image transform API.'
  },
  {
    feature: 'Quota separation across APIs',
    microlink: 'Single bucket',
    embedly: 'Embed / Extract / Display',
    note: 'Embedly meters Embed and Extract independently (10K each on the entry API plan). Microlink uses one shared request quota across all endpoints.'
  }
]

/* ---------------------------------------------------------------------------
 * Styled primitives
 * --------------------------------------------------------------------------- */

const Section = styled(Box)`
  ${theme({
    py: [5, 5, 6, 6],
    px: [3, 3, 4, 4]
  })}
`

const SectionInner = styled(Container)`
  ${theme({
    maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
    alignItems: 'center',
    pt: 0
  })}
`

const Badge = styled(Caps)`
  display: inline-flex;
  align-items: center;
  ${theme({
    fontSize: '11px',
    fontWeight: 'bold',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    letterSpacing: '0.08em'
  })}
`

const GradientText = styled('span')`
  ${css`
    ${textGradient}
  `}
`

const FeatureTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;

  th,
  td {
    padding: ${SPACE_10} ${SPACE_14};
    ${theme({ textAlign: 'left', fontSize: 0, fontFamily: 'mono' })};
    border-bottom: ${borders[1]} ${colors.black05};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      padding: ${space[2]} ${SPACE_10};
      white-space: normal;
      word-break: break-word;
    }
  }

  th {
    font-weight: 600;
    text-transform: uppercase;
    ${theme({ color: 'black', fontSize: 0 })};
    border-bottom: ${borders[1]} ${colors.black10};
  }

  td {
    ${theme({ color: 'black' })};
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    ${theme({ bg: 'black05' })};
  }
`

const PriceCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    p: [3, 4, 4, 4],
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    flex: 1,
    minWidth: '260px'
  })}
`

const PriceAmount = styled(Text)`
  ${theme({
    fontSize: [4, 5, 5, 5],
    fontWeight: 'bold',
    lineHeight: 0
  })}
  font-variant-numeric: tabular-nums;
`

const Check = () => (
  <span
    css={theme({
      color: 'green7',
      fontFamily: 'mono',
      fontSize: 1,
      display: 'block',
      textAlign: 'center'
    })}
    aria-label='Yes'
    role='img'
  >
    ✓
  </span>
)

const Cross = () => (
  <span
    css={theme({
      color: 'red5',
      fontFamily: 'mono',
      fontSize: 1,
      display: 'block',
      textAlign: 'center',
      opacity: 0.7
    })}
    aria-label='No'
    role='img'
  >
    ✕
  </span>
)

const Partial = ({ children }) => (
  <span
    css={theme({
      color: 'yellow7',
      fontFamily: 'mono',
      fontSize: 0,
      display: 'block',
      textAlign: 'center'
    })}
  >
    {children || '~'}
  </span>
)

const WhySwitchTimeline = styled(Flex)`
  position: relative;
  ${theme({
    flexDirection: 'column',
    alignItems: 'flex-start'
  })}
`

const WhySwitchItem = styled(Flex)`
  ${theme({
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0
  })}
`

const WhySwitchRail = styled('div')`
  ${theme({ flexShrink: 0, position: 'relative', mr: [3, 3, 4, 4] })}
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;

  @media (min-width: ${breakpoints[1]}) {
    width: 40px;
  }
`

const WhySwitchConnector = styled('div')`
  width: 1px;
  flex: 1;
  ${theme({ bg: 'black10', mt: 2, mb: 2 })}
`

const WhySwitchNumber = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: [3, 3, 4, 4],
    fontWeight: 'bold',
    lineHeight: 0,
    flexShrink: 0
  })}
  ${css`
    ${textGradient}
  `}
  opacity: 0.9;
`

/* ---------------------------------------------------------------------------
 * Why developers switch
 * --------------------------------------------------------------------------- */

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: `Roughly ${PER_URL_MULTIPLIER}× cheaper per URL on the entry API tier`,
    description: (
      <>
        Embedly's API plan starts at <b>$119/month for 10,000 Embed URLs</b> and
        a separate 10,000 Extract URLs on top. Microlink is{' '}
        <b>$45/month for 46,000 requests</b> across every endpoint — about{' '}
        <b>${MICROLINK_PRICE_PER_1000}/1,000</b> vs Embedly's{' '}
        <b>${EMBEDLY_API_PRICE_PER_1000}/1,000</b>. The gap widens the second
        you outgrow the entry tier.
      </>
    )
  },
  {
    number: '02',
    title: 'One shared request bucket, not three',
    description: (
      <>
        Embedly meters <b>Embed</b>, <b>Extract</b>, and <b>Display</b> as three
        separate quotas — each with its own monthly cap and overage rate.
        Microlink uses <b>one shared request budget</b>, so swapping between a
        card render, a metadata pull, and an iframe response does not require
        capacity planning per endpoint.
      </>
    )
  },
  {
    number: '03',
    title: 'No 50 URLs/sec ceiling on paid plans',
    description: (
      <>
        Embedly caps all paid tiers at <b>50 URLs per second</b>. Microlink has{' '}
        <b>no per-second or per-minute throttle on paid plans</b>, so spiky
        traffic — link-preview rendering during an email blast, batch
        re-indexing — does not require a custom contract.
      </>
    )
  },
  {
    number: '04',
    title: 'Pro unlocks a built-in web proxy',
    description: (
      <>
        Embedly fetches cooperative publisher endpoints. The moment a target
        sits behind <b>Cloudflare</b>, <b>DataDome</b>, <b>Akamai</b>, or any of
        the 9 antibot providers Microlink covers, Embedly has nothing to offer.
        Microlink Pro folds three normally-separate stacks — a{' '}
        <b>rotating residential proxy</b>, <b>antibot detection</b>, and{' '}
        <b>CAPTCHA handling</b> — into the same $45 plan.
        <br />
        <br />
        <Link href='/feature/proxy'>See how the proxy works</Link>.
      </>
    )
  },
  {
    number: '05',
    title: 'A free tier that does not expire',
    description: (
      <>
        Embedly's API plan offers a <b>30-day free trial</b> at base usage
        levels, then bills. Microlink's free tier is{' '}
        <b>50 requests/day forever</b>, no credit card, on the same edge network
        as paid plans — usable in production for low-volume integrations without
        a renewal clock.
      </>
    )
  },
  {
    number: '06',
    title: 'Open-source core, no black box',
    description: (
      <>
        The components behind Microlink — <b>Metascraper</b>, <b>Browserless</b>
        , and <b>MQL</b> — are <b>MIT licensed</b>. You can read the code, fork
        it, or self-host. Embedly's pipeline is fully proprietary, which is fine
        for many teams but harder to audit.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Bigger publisher catalog',
    description:
      'Embedly advertises 1,000+ supported providers, with an established record at NYT, Microsoft, Medium, Reddit, MLB, NPR, and The Guardian. If your product depends on long-tail publisher coverage, Embedly has been investing in that catalog at scale for over a decade.'
  },
  {
    title: 'Cards plan at $14/mo for low-volume sites',
    description:
      "If you only need the JS card widget on a publisher site and do not call the API server-side, Embedly Cards at $14/month is a real entry point that Microlink does not match dollar-for-dollar. Microlink's free tier (50/day) covers most equivalent low-volume cases without a credit card, but the paid tier starts at $45."
  },
  {
    title: 'Display API for on-the-fly image optimization',
    description:
      "Embedly's Display API resizes, crops, and re-encodes images at the edge. Microlink extracts metadata and color palettes but does not transform images. If a chunk of your workflow is image CDN-style transforms, Embedly has the dedicated endpoint for it."
  }
]

const CellValue = ({ value }) => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  if (value === 'partial' || value === 'on demand') {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
    return <Partial>{capitalized}</Partial>
  }

  return (
    <span css={theme({ display: 'block', textAlign: 'center' })}>{value}</span>
  )
}

const ComparisonTable = () => (
  <Box
    css={theme({
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: 4,
      border: `${borders[1]} ${colors.black10}`,
      bg: 'white'
    })}
  >
    <FeatureTable>
      <thead>
        <tr>
          <th css={{ minWidth: '220px' }}>Feature</th>
          <th css={[theme({ textAlign: 'center' }), { minWidth: '120px' }]}>
            <span css={textGradient}>Microlink</span>
          </th>
          <th
            css={[
              theme({ textAlign: 'center', color: 'black60' }),
              { minWidth: '120px' }
            ]}
          >
            Embedly
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, embedly, highlight, note }) => (
            <tr
              key={feature}
              css={{
                background: highlight
                  ? 'rgba(6, 125, 247, 0.03)'
                  : 'transparent'
              }}
            >
              <td css={theme({ fontWeight: 'regular' })}>
                {feature}
                {note && (
                  <Text
                    css={theme({
                      fontSize: '11px',
                      color: 'black40',
                      pt: 1,
                      lineHeight: 1
                    })}
                    as='div'
                  >
                    {note}
                  </Text>
                )}
              </td>
              <td css={theme({ textAlign: 'center' })}>
                <CellValue value={microlink} />
              </td>
              <td css={theme({ textAlign: 'center' })}>
                <CellValue value={embedly} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </FeatureTable>
  </Box>
)

/* ---------------------------------------------------------------------------
 * FAQ items (rendered + schema)
 * --------------------------------------------------------------------------- */

const FAQ_ITEMS = [
  {
    question: 'How does Microlink compare to Embedly on per-URL cost?',
    answer: (
      <>
        <div>
          Embedly's API plan starts at $119/month for 10,000 Embed URLs, which
          works out to about $${EMBEDLY_API_PRICE_PER_1000}/1,000. Microlink is
          $45/month for 46,000 requests, or roughly $${MICROLINK_PRICE_PER_1000}
          /1,000. On a per-URL basis Microlink is roughly {PER_URL_MULTIPLIER}×
          cheaper at the entry tier.
        </div>
        <div>
          The gap is not just about the headline rate. Embedly bills Embed,
          Extract, and Display as three separate buckets — if your workload uses
          two of them, your effective price per useful URL is higher again.
          Microlink uses one shared bucket across every endpoint.
        </div>
      </>
    ),
    text: `Embedly's API plan starts at $119/month for 10,000 Embed URLs, which works out to about $${EMBEDLY_API_PRICE_PER_1000}/1,000. Microlink is $45/month for 46,000 requests, or roughly $${MICROLINK_PRICE_PER_1000}/1,000. On a per-URL basis Microlink is roughly ${PER_URL_MULTIPLIER}× cheaper at the entry tier. The gap is not just the headline rate — Embedly bills Embed, Extract, and Display as three separate buckets; Microlink uses one shared bucket.`
  },
  {
    question: 'What is the difference between Embedly Cards and the API plan?',
    answer: (
      <>
        <div>
          Cards is the $14/month JavaScript widget plan: you drop the embedly.js
          script on a publisher site and Embedly handles rendering in the
          browser. There is no documented server-side quota and you cannot call
          the API directly.
        </div>
        <div>
          The API plan at $119/month gives you the Embed, Extract, and Display
          REST APIs with metered URL quotas and overage pricing. That is the
          plan to compare against Microlink, since Microlink is API-first.
        </div>
      </>
    ),
    text: 'Cards is the $14/month JavaScript widget plan: you drop the embedly.js script on a publisher site and Embedly handles rendering in the browser. There is no documented server-side quota and you cannot call the API directly. The API plan at $119/month gives you the Embed, Extract, and Display REST APIs with metered URL quotas and overage pricing. That is the plan to compare against Microlink, since Microlink is API-first.'
  },
  {
    question: 'Does Embedly have a 50 URLs/second cap?',
    answer: (
      <>
        <div>
          Yes. Embedly's documentation states every paid API plan is rate-
          limited to 50 URLs per second across Embed, Extract, and Display
          combined. Custom throughput requires contacting their sales team.
        </div>
        <div>
          Microlink does not apply a per-second or per-minute cap on paid plans,
          so spike traffic does not need a separate negotiation.
        </div>
      </>
    ),
    text: "Yes. Embedly's documentation states every paid API plan is rate-limited to 50 URLs per second across Embed, Extract, and Display combined. Custom throughput requires contacting their sales team. Microlink does not apply a per-second or per-minute cap on paid plans."
  },
  {
    question:
      "Can Microlink replace Embedly's Embed, Extract, and Display APIs?",
    answer: (
      <>
        <div>
          Embed and Extract — yes. Microlink's metadata endpoint returns the
          same normalized fields Extract does (title, description, image,
          author, publisher, oEmbed-style media) and the same iframe HTML
          payload Embed returns for supported providers. Pass any URL to{' '}
          <Link href='/embed'>the embed API</Link> and the response covers both
          jobs.
        </div>
        <div>
          Display — partial. Embedly Display is an on-the-fly image transform
          API (resize, crop, format conversion). Microlink does not provide
          equivalent image-transform capabilities. If image optimization is a
          load-bearing part of your stack, pair Microlink with a dedicated image
          CDN (Cloudinary, Imgix, ImageKit) rather than expecting Microlink to
          cover it.
        </div>
      </>
    ),
    text: "Embed and Extract — yes. Microlink's metadata endpoint returns the same normalized fields Extract does and the same iframe HTML payload Embed returns for supported providers. Display — partial. Embedly Display is an on-the-fly image transform API. Microlink does not provide equivalent image-transform capabilities. Pair Microlink with a dedicated image CDN if you need image optimization."
  },
  {
    question:
      'Does Microlink really replace a separate proxy and CAPTCHA solver?',
    answer: (
      <>
        <div>
          Yes — on the Pro plan. Microlink auto-detects when a target site is
          blocking the request, routes the call through a rotating residential
          IP pool, and adapts to the specific antibot or CAPTCHA provider in the
          way. That replaces three usual line items on your bill: a residential
          proxy contract, an antibot detection tool, and a CAPTCHA solver
          subscription.
        </div>
        <div>
          The detection logic is open source as{' '}
          <Link href='https://github.com/microlinkhq/is-antibot'>
            is-antibot
          </Link>
          . Supported antibot providers: Cloudflare, DataDome, Akamai,
          PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape
          Security. The full breakdown lives on the{' '}
          <Link href='/feature/proxy'>proxy feature page</Link>. Embedly does
          not advertise any equivalent capability.
        </div>
      </>
    ),
    text: 'Yes — on the Pro plan. Microlink auto-detects when a target site is blocking the request, routes the call through a rotating residential IP pool, and adapts to the specific antibot or CAPTCHA provider. That replaces a residential proxy contract, an antibot detection tool, and a CAPTCHA solver subscription. Detection logic is open source as is-antibot. Supported antibot providers: Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security. Embedly does not advertise any equivalent capability.'
  },
  {
    question: 'How do I migrate from Embedly to Microlink?',
    answer: (
      <>
        <div>
          The data shapes are close enough that most card components only need a
          thin adapter, not a rewrite. Embedly returns title, description,
          thumbnail, oEmbed-style media, and provider info; Microlink returns
          the same fields plus color palette, logo URL, and dominant color
          metadata.
        </div>
        <div>
          At the network layer, swap <b>i.embed.ly/1/oembed?url=...&key=...</b>{' '}
          for <b>api.microlink.io?url=...</b> and add a Microlink API key if you
          need to go beyond the free 50/day. The{' '}
          <Link href='/docs/guides/embed'>embed guide</Link> walks through the
          full mapping.
        </div>
      </>
    ),
    text: 'The data shapes are close enough that most card components only need a thin adapter, not a rewrite. Embedly returns title, description, thumbnail, oEmbed-style media, and provider info; Microlink returns the same fields plus color palette, logo URL, and dominant color metadata. At the network layer, swap i.embed.ly/1/oembed?url=...&key=... for api.microlink.io?url=... and add a Microlink API key if you need to go beyond the free 50/day.'
  },
  {
    question: 'When does Embedly still make more sense than Microlink?',
    answer: (
      <>
        <div>
          When you depend on a long-tail publisher in Embedly's 1,000+ catalog
          that Microlink does not yet cover, the catalog gap is a real reason to
          stay. Embedly has been curating their provider list since 2009.
        </div>
        <div>
          When image transformation is in your critical path — resizing,
          cropping, or format converting — Embedly Display ships that as a
          first-class API while Microlink does not. And if you only need the
          drop-in Cards widget for a publisher site with no server-side API
          usage, the $14 Cards plan is genuinely the lower-priced entry.
        </div>
      </>
    ),
    text: "When you depend on a long-tail publisher in Embedly's 1,000+ catalog that Microlink does not yet cover, the catalog gap is a real reason to stay. When image transformation is in your critical path — resizing, cropping, or format converting — Embedly Display ships that as a first-class API while Microlink does not. And if you only need the drop-in Cards widget for a publisher site with no server-side API usage, the $14 Cards plan is the lower-priced entry."
  },
  {
    question: 'Is Microlink open source?',
    answer: (
      <>
        <div>
          The core is. Metascraper (metadata extraction), MQL (the query
          language), and Browserless (the headless browser layer) are all
          published on GitHub under the MIT license, so you can audit, fork, or
          self-host the underlying pipeline.
        </div>
        <div>
          The hosted API at <Link href='/'>microlink.io</Link> bundles those
          components with managed proxies, antibot tooling, edge caching, and a
          99.9% SLA. Embedly's pipeline is fully proprietary today.
        </div>
      </>
    ),
    text: "The core is. Metascraper (metadata extraction), MQL (the query language), and Browserless (the headless browser layer) are all published on GitHub under the MIT license. The hosted API at microlink.io bundles those components with managed proxies, antibot tooling, edge caching, and a 99.9% SLA. Embedly's pipeline is fully proprietary today."
  }
]

/* ---------------------------------------------------------------------------
 * Hero Section
 * --------------------------------------------------------------------------- */

const Hero = () => (
  <BluePrintBackground as='section'>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: 3,
        pb: [4, 4, 5, 5],
        px: 4
      })}
    >
      <Heading
        variant={null}
        css={theme({
          textAlign: 'center',
          maxWidth: '100%',
          fontSize: [4, 4, 5, 5],
          color: 'black'
        })}
      >
        The lower-cost <GradientText>Embedly</GradientText>
        <br />
        alternative
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.large,
          color: 'black80'
        })}
        titleize={false}
      >
        <b>Embedly</b> charges <b>$119/month for 10,000 URLs</b> on its API
        plan, splits Embed and Extract into separate quotas, and caps every paid
        tier at <b>50 URLs/sec</b>. <b>Microlink</b> gives you{' '}
        <b>46,000 requests for $45</b> across every endpoint — about{' '}
        <b>{PER_URL_MULTIPLIER}× cheaper per URL</b>, no rate-limit ceiling,
        plus a built-in residential proxy on the same plan.
      </Caption>

      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          pb: [3, 3, 4, 4],
          fontSize: [2, 2, 3, 3],
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <ArrowLink
          href='/embed'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'embedly' })}
        >
          Get Started Free
        </ArrowLink>
      </Flex>

      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          width: '100%',
          maxWidth: layout.large,
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <InteractiveExample flat hideFooter />
      </Flex>
    </Flex>
  </BluePrintBackground>
)

/* ---------------------------------------------------------------------------
 * Why developers switch
 * --------------------------------------------------------------------------- */

const WhySwitchSection = () => (
  <Section as='section' id='why-switch' css={theme({ bg: 'pinky' })}>
    <SectionInner>
      <Subhead
        css={theme({ color: 'black', pb: [1, 2, 2, 2] })}
        titleize={false}
      >
        Why <GradientText>Developers</GradientText> Switch
      </Subhead>
      <Caption
        css={theme({
          color: 'black60',
          pb: [4, 4, 5, 5],
          maxWidth: layout.normal
        })}
        titleize={false}
      >
        The usual reasons teams move from Embedly to Microlink.
      </Caption>

      <WhySwitchTimeline
        css={theme({
          width: '100%',
          maxWidth: layout.normal,
          mx: 'auto'
        })}
      >
        {WHY_SWITCH_ITEMS.map(({ number, title, description }, index) => {
          const isLast = index === WHY_SWITCH_ITEMS.length - 1
          return (
            <WhySwitchItem key={number}>
              <WhySwitchRail>
                <WhySwitchNumber aria-hidden='true'>{number}</WhySwitchNumber>
                {!isLast && <WhySwitchConnector />}
              </WhySwitchRail>
              <Box
                css={theme({
                  flex: 1,
                  minWidth: 0,
                  pb: isLast ? 0 : [3, 3, 4, 4]
                })}
              >
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [2, 2, 3, 3],
                    color: 'black',
                    pb: 2,
                    lineHeight: 1
                  })}
                >
                  {title}
                </Text>
                <Text
                  css={theme({
                    fontSize: [1, 1, 2, 2],
                    color: 'black90',
                    lineHeight: 2,
                    maxWidth: '40em'
                  })}
                >
                  {description}
                </Text>
              </Box>
            </WhySwitchItem>
          )
        })}
      </WhySwitchTimeline>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Pricing Section
 * --------------------------------------------------------------------------- */

const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        More volume.
        <br />
        <GradientText>One-third the spend.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        <b>46,000 requests at $45</b> vs Embedly's <b>10,000 URLs at $119</b>.
      </Caption>

      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          width: '100%',
          maxWidth: layout.normal,
          mx: 'auto'
        })}
      >
        <Box
          css={theme({
            borderRadius: 3,
            flex: 1,
            minWidth: ['100%', '400px']
          })}
          style={{
            background:
              'linear-gradient(90deg, rgb(247, 102, 152), rgb(192, 63, 162) 60%, rgb(140, 27, 171) 100%)',
            padding: '2px'
          }}
        >
          <PriceCard
            style={{
              border: 'none',
              borderRadius: '6px',
              flex: 1,
              minWidth: 0,
              background: 'white'
            }}
          >
            <Badge
              css={{
                background: colors.blue0,
                color: colors.blue8,
                alignSelf: 'flex-start',
                marginBottom: '12px'
              }}
            >
              Microlink
            </Badge>
            <PriceAmount>
              $45
              <Text
                as='span'
                css={theme({
                  fontSize: 1,
                  color: 'black50',
                  fontWeight: 'normal'
                })}
              >
                /mo
              </Text>
            </PriceAmount>
            <Text
              css={theme({
                fontSize: 2,
                color: 'black80',
                pt: 2,
                pb: 3,
                fontWeight: 'bold'
              })}
            >
              46,000&nbsp;requests/month
            </Text>
            <Box as='ul' css={theme({ pl: 3, m: 0 })}>
              {[
                'Embeds, screenshots, PDF, metadata, remote JS',
                'Rotating residential proxy + antibot bypass + CAPTCHA handling',
                'Free: 50 requests/day, no credit card, no expiry',
                'No per-second cap on paid plans',
                '240+ edge nodes, 99.9% SLA',
                'Open-source core (MIT licensed)',
                `$${MICROLINK_PRICE_PER_1000} per 1,000 requests`
              ].map(item => (
                <Text
                  as='li'
                  key={item}
                  css={theme({
                    fontSize: 1,
                    color: 'black70',
                    pb: 2,
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              ))}
            </Box>
            <Box css={theme({ pt: 3 })}>
              <Link
                href='/embed'
                css={theme({ fontSize: 1, width: '100%', textAlign: 'center' })}
              >
                <Caps>Start for free</Caps>
              </Link>
            </Box>
          </PriceCard>
        </Box>

        <PriceCard>
          <Badge
            css={{
              background: colors.gray1,
              color: colors.gray7,
              alignSelf: 'flex-start',
              marginBottom: '12px'
            }}
          >
            Embedly
          </Badge>
          <PriceAmount>
            $119
            <Text
              as='span'
              css={theme({
                fontSize: 1,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              /mo
            </Text>
          </PriceAmount>
          <Text
            css={theme({
              fontSize: 2,
              color: 'black80',
              pt: 2,
              pb: 3,
              fontWeight: 'bold'
            })}
          >
            10,000&nbsp;URLs/month (Embed)
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'API plan: Embed, Extract, Display split into three quotas',
              '+10,000 Extract URLs, +25,000 Display images',
              `${PRICING.embedly.overage} (Embed / Extract) overage`,
              '50 URLs/sec rate limit across all paid plans',
              '30-day free trial only — no permanent free tier',
              `$${EMBEDLY_API_PRICE_PER_1000} per 1,000 URLs at base`
            ].map(item => (
              <Text
                as='li'
                key={item}
                css={theme({
                  fontSize: 1,
                  color: 'black70',
                  pb: 2,
                  lineHeight: 2
                })}
              >
                {item}
              </Text>
            ))}
          </Box>
        </PriceCard>
      </Flex>

      <Text
        css={theme({
          pt: 4,
          mb: 4,
          fontSize: 1,
          color: 'black60',
          textAlign: 'center',
          maxWidth: layout.small,
          mx: 'auto',
          lineHeight: 2
        })}
      >
        Honest caveat: Embedly's <b>$14 Cards</b> plan is cheaper than
        Microlink's $45 tier if your usage is purely client-side card widgets on
        a small publisher site. The comparison above is the API plan vs API plan
        match-up — that's where the {VOLUME_MULTIPLIER}× volume gap and the{' '}
        {PER_URL_MULTIPLIER}× per-URL gap actually show up.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * CTA Section
 * --------------------------------------------------------------------------- */

const CTASection = () => (
  <Section
    as='section'
    id='get-started'
    css={theme({
      backgroundImage: `radial-gradient(
        circle at center right,
        #850ba7 0%,
        #850ba7 48%,
        #a31b91 48%,
        #a31b91 52%,
        #c12a78 52%,
        #c12a78 65%,
        #df3a61 65%,
        #df3a61 79%,
        #fd494a 79%,
        #fd494a 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`,
      py: [4, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center'
      })}
    >
      <Subhead
        css={theme({
          color: 'white',
          pb: [2, 2, 3, 3],
          fontSize: [3, 3, 4, 4]
        })}
        titleize={false}
      >
        Spend less on every embed
      </Subhead>

      <Caption
        css={theme({
          color: 'white80',
          pt: 3,
          pb: [3, 3, 4, 4],
          maxWidth: layout.large,
          fontSize: 3
        })}
        titleize={false}
      >
        Start with{' '}
        <b css={theme({ color: 'white' })}>50&nbsp;requests/day free</b> — no
        credit card, no expiry, same edge network as paid plans.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <ArrowLink
          href='/embed'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'embedly' })}
          css={theme({ fontSize: 3, px: 5, py: 3, color: 'white' })}
        >
          Start Building Free
        </ArrowLink>
      </Flex>
    </Flex>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Comparison Section
 * --------------------------------------------------------------------------- */

const ComparisonSection = () => (
  <Section
    as='section'
    id='comparison'
    css={theme({
      borderTop: `${borders[1]} ${colors.black05}`,
      borderBottom: `${borders[1]} ${colors.black05}`,
      py: 5
    })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4], pt: 4 })}
        titleize={false}
      >
        <GradientText>Feature-by-Feature</GradientText> Comparison
      </Subhead>
      <Caption
        css={theme({
          pt: 2,
          pb: [3, 3, 4, 4],
          maxWidth: layout.normal,
          color: 'black60'
        })}
        titleize={false}
      >
        Based on Embedly's public docs, plans page, and API documentation.
      </Caption>
      <ComparisonTable />
      <Text
        css={theme({
          pt: 4,
          pb: 4,
          fontSize: '12px',
          color: 'black40',
          textAlign: 'center',
          fontFamily: 'mono'
        })}
      >
        Last verified: May&nbsp;2026. Cells marked false mean we did not find
        the capability documented on Embedly's official pages.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Honesty Section
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='embedly-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Embedly</GradientText>
        <br /> Might Still Be the Right Choice
      </Subhead>

      <Box
        css={theme({
          maxWidth: layout.normal,
          width: '100%',
          mx: 'auto'
        })}
      >
        {HONESTY_ITEMS.map(({ title, description }, index) => {
          const isLast = index === HONESTY_ITEMS.length - 1
          return (
            <Flex
              key={title}
              css={theme({
                flexDirection: 'row',
                alignItems: 'baseline',
                py: [3, 3, 3, 3],
                borderBottom: isLast ? 0 : 1,
                borderBottomColor: 'black05'
              })}
            >
              <Text
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: 'black20',
                  flexShrink: 0,
                  mr: [3, 3, 4, 4],
                  minWidth: '24px'
                })}
                aria-hidden='true'
              >
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Box css={theme({ flex: 1, minWidth: 0 })}>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2],
                    color: 'black',
                    pb: 1
                  })}
                >
                  {title}
                </Text>
                <Text
                  css={theme({
                    fontSize: [0, 0, 1, 1],
                    color: 'black50',
                    lineHeight: 2,
                    maxWidth: '40em'
                  })}
                >
                  {description}
                </Text>
              </Box>
            </Flex>
          )
        })}
      </Box>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Try It Section
 * --------------------------------------------------------------------------- */

const TryItSection = () => (
  <Section as='section' css={theme({ py: [5, 5, 6, 6] })}>
    <SectionInner>
      <Subhead
        css={theme({
          fontSize: CTA_TITLE_FONT_SIZE,
          textAlign: 'center'
        })}
      >
        One URL, <span css='color: #fa5252;'>one</span> API call
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center'
        })}
      >
        Pass any URL and get back the normalized metadata plus a ready-to-paste
        iframe. Same shape, every provider.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <Link
          href='/docs/guides/embed'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'embedly' })}
          css={theme({ fontSize: CTA_LINK_FONT_SIZE })}
        >
          Start now for free
        </Link>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          width: '100%',
          maxWidth: layout.large,
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <PreviewVariantsShowcase />
      </Flex>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * FAQ Section
 * --------------------------------------------------------------------------- */

const FAQSection = () => (
  <Faq
    css={theme({ py: 0 })}
    questions={FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))}
  />
)

/* ---------------------------------------------------------------------------
 * Head / SEO
 * --------------------------------------------------------------------------- */

export const Head = () => (
  <Meta
    title='Embedly Alternative with Lower Per-URL Pricing'
    description="Microlink gives you 46,000 requests for $45 versus Embedly's 10,000 URLs for $119 — roughly 12x cheaper per request, no 50 URLs/sec cap, plus a built-in residential proxy on the same plan."
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Embedly Alternative with Lower Per-URL Pricing | Microlink',
        description:
          "Embedly's API plan starts at $119/month for 10,000 URLs and caps every plan at 50 URLs/sec. Microlink gives you 46,000 requests for $45 across every endpoint, no rate-limit ceiling, plus a built-in residential proxy on the same plan.",
        url: 'https://microlink.io/alternative/embedly',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: 'Microlink',
          applicationCategory: ['DeveloperApplication', 'WebApplication'],
          url: 'https://microlink.io',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text
          }
        }))
      }
    ]}
  />
)

/* ---------------------------------------------------------------------------
 * Page
 * --------------------------------------------------------------------------- */

const EmbedlyPage = () => (
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

export default EmbedlyPage
