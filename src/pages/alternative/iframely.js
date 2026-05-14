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
import { PreviewVariantsShowcase } from 'components/pages/embed'
import { InteractiveExample } from 'pages/embed'

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
 * Iframely plans: https://iframely.com/plans
 * Iframely "hit" definition: https://iframely.com/plans (1 hit = ~1-4 API calls or ~5-15 iframe views)
 * Iframely API limits: 50 req/s across all plans
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PRICING = {
  microlink: {
    price: 45,
    requests: 46000
  },
  iframely: {
    price: 49,
    hits: 25000,
    overage: '$3 per 1,000 hits'
  }
}

const MICROLINK_PRICE_PER_1000 = (
  (PRICING.microlink.price / PRICING.microlink.requests) *
  1000
).toFixed(2)
const IFRAMELY_PRICE_PER_1000_HITS = (
  (PRICING.iframely.price / PRICING.iframely.hits) *
  1000
).toFixed(2)

const VOLUME_MULTIPLIER = (
  PRICING.microlink.requests / PRICING.iframely.hits
).toFixed(2)

const COMPARISON_DATA = [
  { feature: 'URL → metadata API', microlink: true, iframely: true },
  { feature: 'URL → embeddable iframe', microlink: true, iframely: true },
  { feature: 'oEmbed proxy endpoint', microlink: true, iframely: true },
  { feature: 'Card / large card output', microlink: true, iframely: true },
  { feature: 'React component / SDK', microlink: true, iframely: true },
  { feature: 'Lazy-loaded embed widgets', microlink: true, iframely: true },
  {
    feature: 'Theme switching (light / dark)',
    microlink: true,
    iframely: true
  },
  {
    feature: 'Open Graph + Twitter Card parsing',
    microlink: true,
    iframely: true
  },
  { feature: 'Custom HTTP headers', microlink: true, iframely: false },
  { feature: 'Custom cookies', microlink: true, iframely: false },
  {
    feature: 'Remote JS execution',
    microlink: true,
    iframely: false,
    highlight: true
  },
  { feature: 'Wait for selector', microlink: true, iframely: false },
  { feature: 'Cookie banner blocking', microlink: true, iframely: false },
  { feature: 'Ad blocking', microlink: true, iframely: false },
  {
    feature: 'Rotating residential proxy (Pro)',
    microlink: true,
    iframely: false,
    highlight: true,
    note: 'Microlink Pro routes each request through a fresh residential IP with automatic retry on block or throttle.'
  },
  {
    feature: 'Antibot detection & bypass (Pro)',
    microlink: true,
    iframely: false,
    highlight: true,
    note: 'Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security.'
  },
  {
    feature: 'CAPTCHA handling (Pro)',
    microlink: true,
    iframely: false,
    highlight: true,
    note: 'reCAPTCHA v2/v3, hCaptcha, FunCaptcha, GeeTest, Cloudflare Turnstile — handled inside the API.'
  },
  {
    feature: 'Screenshot capture',
    microlink: true,
    iframely: false,
    highlight: true
  },
  { feature: 'Full-page screenshots', microlink: true, iframely: false },
  {
    feature: 'PDF generation',
    microlink: true,
    iframely: false,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, iframely: false },
  { feature: 'Animated GIF / video output', microlink: true, iframely: false },
  { feature: 'Lighthouse audits', microlink: true, iframely: false },
  { feature: 'Technology detection', microlink: true, iframely: false },
  { feature: 'Color palette extraction', microlink: true, iframely: false },
  { feature: 'Markdown conversion', microlink: true, iframely: false },
  {
    feature: 'MQL (structured data extraction)',
    microlink: true,
    iframely: false,
    highlight: true
  },
  {
    feature: 'Open-source core (MIT)',
    microlink: true,
    iframely: false,
    highlight: true
  },
  { feature: '240+ CDN edge nodes', microlink: true, iframely: 'CDN cache' },
  {
    feature: 'Per-minute rate limit on paid plans',
    microlink: 'None',
    iframely: '50 req/s cap',
    note: 'Iframely caps all plans at 50 requests/second by license; higher throughput is custom-only.'
  },
  {
    feature: 'Free plan',
    microlink: '50/day, no expiry',
    iframely: '2,000/mo pilot only',
    highlight: true,
    note: 'Iframely Starter is single-domain and explicitly pilot-only; Microlink free plan has no expiry and is production-ready.'
  },
  {
    feature: 'Publisher-specific embed catalog',
    microlink: '280+ oEmbed providers',
    iframely: '1,900+ publishers',
    note: 'Iframely maintains a deeper publisher catalog. Microlink covers the most common oEmbed providers plus universal Open Graph fallback.'
  },
  {
    feature: 'AMP / Shadow DOM / WordPress plugin',
    microlink: false,
    iframely: true,
    note: 'Iframely ships explicit AMP, Shadow DOM, WordPress and CKEditor integrations out of the box.'
  },
  {
    feature: 'Content IDs (batch cache refresh)',
    microlink: false,
    iframely: true
  },
  {
    feature: 'White-label CDN delivery',
    microlink: false,
    iframely: 'enterprise',
    note: 'Iframely lists white-label CDN delivery on the Enterprise plan.'
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
    title: 'Per-request pricing, not "hits"',
    description: (
      <>
        Iframely bills in <b>hits</b>: roughly an hour of URL activity that can
        cover <b>1-4 API calls</b> or <b>5-15 iframe views</b> per their own
        docs. Microlink bills <b>one API request equals one count</b>, so
        forecasting your bill does not require modelling cache-hit ratios.
      </>
    )
  },
  {
    number: '02',
    title: `${VOLUME_MULTIPLIER}× more headroom for $4 less`,
    description: (
      <>
        Iframely Business is <b>$49/month for 25,000 hits</b>. Microlink is{' '}
        <b>$45/month for 46,000 requests</b>. On a per-request basis that is{' '}
        <b>${MICROLINK_PRICE_PER_1000}/1,000</b> versus Iframely's{' '}
        <b>${IFRAMELY_PRICE_PER_1000_HITS}/1,000 hits</b> entry rate.
      </>
    )
  },
  {
    number: '03',
    title: 'No 50 req/sec ceiling on paid plans',
    description: (
      <>
        Iframely's API license caps usage at{' '}
        <b>50 requests per second across all plans</b> with custom arrangements
        required for more. Microlink has
        <b> no per-minute or per-second rate limit on paid plans</b>, so burst
        traffic does not need a separate contract.
      </>
    )
  },
  {
    number: '04',
    title: 'Pro unlocks a built-in web proxy',
    description: (
      <>
        Iframely fetches cooperative publisher endpoints. The moment a target
        sits behind <b>Cloudflare</b>, <b>DataDome</b>, <b>Akamai</b>, or any of
        the 9 antibot providers Microlink covers, Iframely has nothing to offer.
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
    title: 'Production-grade free tier, not a pilot',
    description: (
      <>
        Iframely Starter is <b>2,000 hits/month, single domain, pilot only</b>.
        Microlink's free tier is{' '}
        <b>50 requests/day with no expiry, no credit card</b>, and same edge
        network as paid plans — usable in production from day one for low-volume
        integrations.
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
        it, or self-host. Iframely's pipeline is fully proprietary, which is
        fine for many teams but harder to audit.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Deeper publisher catalog',
    description:
      'Iframely advertises 1,900+ supported publishers with proprietary rich-media discovery on top of oEmbed. If your product depends on long-tail publisher coverage — niche video hosts, regional media, less common social networks — Iframely has been investing in that catalog since 2012 and serves billions of requests per month.'
  },
  {
    title: 'Editorial / CMS integrations',
    description:
      'Iframely ships a WordPress plugin, CKEditor integration, AMP support, and a per-URL options editor designed for editorial workflows. If your buyers are CMS publishers rather than backend developers, those integrations save real time.'
  },
  {
    title: 'White-label CDN delivery on Enterprise',
    description:
      'Iframely Enterprise lists white-label CDN delivery and Content IDs for batch refresh, which can matter for media platforms that want embeds served from their own domain. Microlink does not currently offer either capability.'
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
            Iframely
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, iframely, highlight, note }) => (
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
                <CellValue value={iframely} />
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
    question: 'How does Microlink compare to Iframely on pricing?',
    answer: (
      <>
        <div>
          Iframely Business is $49/month for 25,000 "hits". Microlink is
          $45/month for 46,000 API requests. On a per-request basis that is
          about ${MICROLINK_PRICE_PER_1000}/1,000 for Microlink versus $
          {IFRAMELY_PRICE_PER_1000_HITS}/1,000 hits for Iframely's first tier.
        </div>
        <div>
          The honest caveat: Iframely defines a "hit" as roughly an hour of URL
          activity that can map to 1-4 API calls. If your traffic re-views the
          same URLs heavily inside the same hour, the gap narrows. If your
          traffic is mostly unique URLs, Microlink is materially cheaper.
        </div>
      </>
    ),
    text: `Iframely Business is $49/month for 25,000 hits. Microlink is $45/month for 46,000 API requests. On a per-request basis that is about $${MICROLINK_PRICE_PER_1000}/1,000 for Microlink versus $${IFRAMELY_PRICE_PER_1000_HITS}/1,000 hits for Iframely's first tier. Iframely defines a hit as roughly an hour of URL activity that can map to 1-4 API calls. If your traffic re-views the same URLs heavily inside the same hour, the gap narrows. If your traffic is mostly unique URLs, Microlink is materially cheaper.`
  },
  {
    question: 'What exactly is a "hit" on Iframely?',
    answer: (
      <>
        <div>
          From Iframely's own pricing page, a hit represents an hour of URL
          activity on their service and typically covers 1-4 API calls or 5-15
          iframe views per hit, depending on caching and reuse.
        </div>
        <div>
          This is a useful model if your audience re-views the same URLs in
          short bursts, but it makes pre-purchase forecasting harder because the
          same workload can cost different amounts depending on how often users
          return to the same content. Microlink's per-request billing is easier
          to reason about up front.
        </div>
      </>
    ),
    text: "From Iframely's pricing page, a hit represents an hour of URL activity and typically covers 1-4 API calls or 5-15 iframe views per hit. This is useful if your audience re-views the same URLs in short bursts, but it makes pre-purchase forecasting harder because the same workload can cost different amounts depending on how often users return to the same content. Microlink's per-request billing is easier to reason about up front."
  },
  {
    question: 'Does Iframely have a requests-per-second cap?',
    answer: (
      <>
        <div>
          Yes. Iframely's API license documents a 50 req/s ceiling across all
          standard plans, with higher throughput available only on custom
          arrangements. For most apps that is plenty; for spiky workloads —
          email blast triggers, viral threads, bulk re-indexing — it forces a
          conversation with sales.
        </div>
        <div>
          Microlink does not apply a per-second or per-minute cap on paid plans.
          You pay for the requests you make and the API scales without a
          separate contract.
        </div>
      </>
    ),
    text: "Yes. Iframely's API license documents a 50 req/s ceiling across all standard plans, with higher throughput available only on custom arrangements. Microlink does not apply a per-second or per-minute cap on paid plans."
  },
  {
    question: 'Can Microlink return the same iframe HTML that Iframely does?',
    answer: (
      <>
        <div>
          For oEmbed providers, yes. Pass the URL to{' '}
          <Link href='/embed'>Microlink's embed API</Link> and the response
          includes the provider's iframe HTML along with the normalized title,
          description, image, logo, and color palette — ready to paste or render
          through the SDK.
        </div>
        <div>
          What differs is publisher coverage breadth: Iframely advertises 1,900+
          publishers with proprietary discovery on top of oEmbed. Microlink
          covers 280+ oEmbed providers plus a universal Open Graph and Twitter
          Card fallback for anything else.
        </div>
      </>
    ),
    text: "For oEmbed providers, yes. Microlink's embed API returns the provider iframe HTML plus normalized title, description, image, logo, and color palette. Iframely advertises 1,900+ publishers with proprietary discovery on top of oEmbed; Microlink covers 280+ oEmbed providers plus universal Open Graph and Twitter Card fallback."
  },
  {
    question: 'Why pick Microlink if Iframely covers more publishers?',
    answer: (
      <>
        <div>
          Two reasons. First, Microlink gives you the same embed flow plus
          screenshots, PDFs, Lighthouse audits, MQL extraction, and remote JS
          from one API — you do not pay a second vendor when the workflow widens
          beyond cards.
        </div>
        <div>
          Second, Microlink ships with antibot detection across 9 providers, a
          built-in rotating residential proxy, and CAPTCHA handling — all
          included on the Pro plan. Iframely's pipeline is optimized for
          cooperative publisher endpoints; Microlink is optimized for arbitrary
          URLs, including ones that fight back.
        </div>
      </>
    ),
    text: 'Two reasons. First, Microlink gives you the same embed flow plus screenshots, PDFs, Lighthouse audits, MQL extraction, and remote JS from one API. Second, Microlink Pro bundles antibot detection across 9 providers, a rotating residential proxy, and CAPTCHA handling, so it handles arbitrary URLs including ones that fight back.'
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
          </Link>{' '}
          and the supported list — Cloudflare, DataDome, Akamai, PerimeterX,
          Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security — plus
          the CAPTCHA coverage are documented on the{' '}
          <Link href='/feature/proxy'>proxy feature page</Link>. Every proxied
          response carries <b>x-fetch-mode: fetch-proxy</b> so you can audit
          usage server-side.
        </div>
      </>
    ),
    text: 'Yes — on the Pro plan. Microlink auto-detects when a target site is blocking the request, routes the call through a rotating residential IP pool, and adapts to the specific antibot or CAPTCHA provider. That replaces a residential proxy contract, an antibot detection tool, and a CAPTCHA solver subscription. Detection logic is open source as is-antibot. Supported antibot providers: Cloudflare, DataDome, Akamai, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, Shape Security. Every proxied response carries x-fetch-mode: fetch-proxy for auditing.'
  },
  {
    question: 'How hard is it to migrate from Iframely to Microlink?',
    answer: (
      <>
        <div>
          For the data shape, it is short. Iframely returns title, description,
          thumbnail, oEmbed-style media, and links. Microlink returns the same
          normalized fields plus image palettes, logos, and color metadata. Most
          card components require a thin adapter and not a rewrite.
        </div>
        <div>
          For the iframe.ly/api/iframely endpoint, swap to{' '}
          <Link href='https://api.microlink.io'>api.microlink.io</Link> with the
          same <b>url</b> parameter and add a Microlink API key if you need
          higher limits. The <Link href='/docs/guides/embed'>embed guide</Link>{' '}
          walks through the full mapping.
        </div>
      </>
    ),
    text: 'For the data shape, it is short. Iframely returns title, description, thumbnail, oEmbed-style media, and links. Microlink returns the same normalized fields plus image palettes, logos, and color metadata. For the iframe.ly/api/iframely endpoint, swap to api.microlink.io with the same url parameter and add an API key if you need higher limits.'
  },
  {
    question: 'When does Iframely still make more sense than Microlink?',
    answer: (
      <>
        <div>
          When your buying profile is editorial CMS work — WordPress, CKEditor,
          AMP, Shadow DOM widgets — Iframely's out-of-the-box integrations
          remove real work. Microlink does not ship those integrations as
          first-class plugins.
        </div>
        <div>
          When you depend on a specific long-tail publisher that Iframely
          curates and Microlink does not yet cover, the catalog gap is a real
          reason to stay. And when four-nines uptime is contractually required,
          Iframely's 99.99% number is one tick above Microlink's 99.9% SLA.
        </div>
      </>
    ),
    text: "When your buying profile is editorial CMS work — WordPress, CKEditor, AMP, Shadow DOM widgets — Iframely's out-of-the-box integrations remove real work. When you depend on a specific long-tail publisher that Iframely curates and Microlink does not cover, that catalog gap is a real reason to stay. When four-nines uptime is contractually required, Iframely's 99.99% number is one tick above Microlink's 99.9% SLA."
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
          99.9% SLA. Iframely's pipeline is fully proprietary today.
        </div>
      </>
    ),
    text: "The core is. Metascraper (metadata extraction), MQL (the query language), and Browserless (the headless browser layer) are all published on GitHub under the MIT license. The hosted API at microlink.io bundles those components with managed proxies, antibot tooling, edge caching, and a 99.9% SLA. Iframely's pipeline is fully proprietary today."
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
        The developer-first <GradientText>Iframely</GradientText>
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
        <b>Iframely</b> bills in hits, caps every plan at 50 req/s, and stays
        focused on rich-media embeds. <b>Microlink</b> gives you{' '}
        <b>46,000 requests for $45</b> versus Iframely's{' '}
        <b>25,000 hits for $49</b>, transparent per-request pricing, no
        per-minute cap, plus screenshots, PDF, and metadata in the same API.
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
            trackEvent('alternative cta', { competitor: 'iframely' })}
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
        The usual reasons teams move from Iframely to Microlink.
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
        Predictable per-request pricing.
        <br />
        <GradientText>No "hit" math.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        <b>46,000 requests at $45</b> vs Iframely's <b>25,000 hits at $49</b>.
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
                'No per-minute cap on paid plans',
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
            Iframely
          </Badge>
          <PriceAmount>
            $49
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
            25,000&nbsp;hits/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'Business plan: single domain, production use',
              '1 hit ≈ 1-4 API calls or 5-15 iframe views',
              `${PRICING.iframely.overage} over 25,000`,
              '50 req/s rate limit across all plans',
              '99.99% uptime claim',
              `$${IFRAMELY_PRICE_PER_1000_HITS} per 1,000 hits`
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
        Honest caveat: Iframely's "hit" can cover 1-4 API calls. If your traffic
        re-loads the same URLs heavily inside an hour, the effective cost
        narrows. For mostly-unique URL workloads, Microlink's $45 tier gives you{' '}
        {VOLUME_MULTIPLIER}× more headroom for $4 less.
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
        Ship embeds without the hit math
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
            trackEvent('alternative cta', { competitor: 'iframely' })}
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
        Based on Iframely's public docs, plans page, and API limits page.
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
        the capability documented on Iframely's official pages.
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
    id='iframely-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Iframely</GradientText>
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
            trackEvent('alternative cta', { competitor: 'iframely' })}
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
    title='Iframely Alternative for a Developer-First Embed API'
    description="Compare Microlink vs Iframely on pricing transparency and integration scope. Microlink gives you 46,000 requests for $45 versus Iframely's 25,000 hits for $49, no per-minute cap, plus screenshots, PDF, and metadata from one API."
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Iframely Alternative for a Developer-First Embed API | Microlink',
        description:
          "Iframely bills in hits and caps all plans at 50 req/s. Microlink gives you 46,000 requests for $45 vs Iframely's 25,000 hits for $49, transparent per-request pricing, no per-minute cap, plus screenshots, PDF, and metadata from one API.",
        url: 'https://microlink.io/alternative/iframely',
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

const IframelyPage = () => (
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

export default IframelyPage
