import {
  borders,
  colors,
  layout,
  theme,
  textGradient,
  fontSizes,
  space,
  radii,
  breakpoints,
  SECTION_VERTICAL_SPACING
} from 'theme'
import { withTitle } from 'helpers/hoc/with-title'
import { CDN_EDGES } from 'helpers/cdn-edges'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Faq from 'components/patterns/Faq/Faq'
import ArrowLink from 'components/patterns/ArrowLink'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { trackEvent } from 'helpers/plausible'
import styled, { css } from 'styled-components'
import React from 'react'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { useBreakpoint } from 'components/hook/use-breakpoint'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const BREAKPOINT_SMALL_MAX = breakpoints[0]
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`

const CTA_LINK_FONT_SIZE = [
  `calc(${fontSizes[2]} + ${space[1]})`,
  fontSizes[3],
  `calc(${fontSizes[3]} + ${radii[1]})`,
  `calc(${fontSizes[3]} + ${space[1]})`
]

const CLOUDFLARE_CURL = `curl -X POST \\
  'https://api.cloudflare.com/client/v4/accounts/{account_id}/browser-rendering/screenshot' \\
  -H 'Authorization: Bearer {api_token}' \\
  -H 'Content-Type: application/json' \\
  -d '{"url": "https://example.com"}' \\
  --output screenshot.png`

const MICROLINK_CURL =
  "curl 'https://api.microlink.io?url=https://example.com&screenshot'"

const LIVE_SCREENSHOT_URL =
  'https://api.microlink.io/?url=https%3A%2F%2Fwww.cloudflare.com&screenshot'

/* ---------------------------------------------------------------------------
 * Styled primitives
 * --------------------------------------------------------------------------- */

const Section = styled(Box)`
  ${theme({
    py: SECTION_VERTICAL_SPACING,
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

const HeroCodeLink = styled('a')`
  ${theme({
    color: 'link',
    fontFamily: 'mono'
  })}
  text-decoration: underline;
  text-underline-offset: 2px;
  overflow-wrap: anywhere;

  &:hover {
    text-decoration: underline;
  }
`

/* ---------------------------------------------------------------------------
 * Comparison Table (benchmark-style)
 * --------------------------------------------------------------------------- */

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

const COMPARISON_DATA = [
  { feature: 'Screenshot capture', microlink: true, cloudflare: true },
  { feature: 'Full-page screenshots', microlink: true, cloudflare: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    cloudflare: true
  },
  { feature: 'Viewport control', microlink: true, cloudflare: true },
  { feature: 'PNG / JPEG output', microlink: true, cloudflare: true },
  { feature: 'Custom JS injection', microlink: true, cloudflare: true },
  { feature: 'Custom CSS injection', microlink: true, cloudflare: true },
  { feature: 'Custom HTTP headers', microlink: true, cloudflare: true },
  { feature: 'Custom cookies', microlink: true, cloudflare: true },
  { feature: 'Wait for selector', microlink: true, cloudflare: true },
  {
    feature: 'Response caching (TTL)',
    microlink: true,
    cloudflare: true,
    note: 'Microlink cache hits are free and do not count against your plan.'
  },
  { feature: 'PDF generation', microlink: true, cloudflare: true },
  { feature: 'Markdown conversion', microlink: true, cloudflare: true },
  { feature: 'MCP server', microlink: true, cloudflare: true },
  {
    feature: 'Cookie banner removal (on by default)',
    microlink: true,
    cloudflare: false,
    highlight: true,
    note: 'Microlink ships adblock enabled by default, with automatic consent-banner handling.'
  },
  {
    feature: 'Ad & tracker blocking engine',
    microlink: true,
    cloudflare: 'partial',
    highlight: true,
    note: 'Cloudflare exposes manual rejectRequestPattern / rejectResourceTypes filters — the blocklist is yours to maintain.'
  },
  {
    feature: 'Built-in proxy (auto-rotating residential)',
    microlink: true,
    cloudflare: false,
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    cloudflare: false,
    highlight: true,
    note: "Detected providers include Cloudflare's own bot management."
  },
  {
    feature: 'Hosted capture URLs (CDN delivery)',
    microlink: true,
    cloudflare: false,
    highlight: true
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    cloudflare: false,
    highlight: true
  },
  {
    feature: 'Keyless free tier (no account setup)',
    microlink: true,
    cloudflare: false,
    note: 'Cloudflare requires an account ID plus an API token with Browser Rendering permission.'
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    cloudflare: false,
    highlight: true
  },
  {
    feature: 'Screenshot + PDF + metadata in one request',
    microlink: true,
    cloudflare: false,
    highlight: true,
    note: 'Cloudflare Quick Actions are separate endpoint calls, each billed as browser time.'
  },
  {
    feature: 'MQL (structured data via CSS selectors)',
    microlink: true,
    cloudflare: false
  },
  { feature: 'Link previews SDK', microlink: true, cloudflare: false },
  { feature: 'Browser chrome overlay', microlink: true, cloudflare: false },
  {
    feature: 'Dark/light mode capture',
    microlink: true,
    cloudflare: false
  },
  {
    feature: 'Device emulation presets',
    microlink: true,
    cloudflare: 'partial',
    note: 'Cloudflare exposes manual viewport and userAgent values, no named device presets.'
  },
  {
    feature: 'Animated capture (MP4/WebM)',
    microlink: true,
    cloudflare: false
  },
  { feature: 'Signed request URLs', microlink: true, cloudflare: false },
  { feature: 'Open-source core', microlink: true, cloudflare: false },
  {
    feature: 'Full browser sessions (Puppeteer / Playwright / CDP)',
    microlink: 'partial',
    cloudflare: true,
    note: 'Microlink exposes Puppeteer through the function parameter; Cloudflare offers persistent sessions.'
  },
  {
    feature: 'Multi-page crawling',
    microlink: false,
    cloudflare: true
  },
  {
    feature: 'AI-prompt JSON extraction',
    microlink: false,
    cloudflare: true
  },
  {
    feature: 'Workers-native bindings',
    microlink: false,
    cloudflare: true
  }
]

const CellValue = ({ value }) => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  if (value === 'partial' || value === 'on demand') {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
    return <Partial>{capitalized}</Partial>
  }
  return <span>{value}</span>
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
            Cloudflare
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, cloudflare, highlight, note }) => (
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
                <CellValue value={cloudflare} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </FeatureTable>
  </Box>
)

/* ---------------------------------------------------------------------------
 * Pricing Comparison
 * --------------------------------------------------------------------------- */

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

const FAQ_ITEMS = [
  {
    question:
      'Is there a Cloudflare screenshot alternative that removes cookie banners automatically?',
    answer: (
      <>
        <div>
          Yes — that is Microlink's default behavior. The{' '}
          <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter
          ships enabled, so ads, trackers, and cookie consent banners are
          stripped before the capture is taken, with automatic consent handling
          for supported providers.
        </div>
        <div>
          Cloudflare's screenshot endpoint gives you the raw tools instead:{' '}
          <b>rejectRequestPattern</b> filters and <b>addScriptTag</b> injection.
          The blocklists and consent-dismissal scripts are yours to write and
          keep up to date.
        </div>
      </>
    ),
    text: "Yes — that is Microlink's default behavior. The adblock parameter ships enabled, so ads, trackers, and cookie consent banners are stripped before the capture is taken, with automatic consent handling for supported providers. Cloudflare's screenshot endpoint gives you the raw tools instead: rejectRequestPattern filters and addScriptTag injection. The blocklists and consent-dismissal scripts are yours to write and keep up to date."
  },
  {
    question:
      'Can I embed a Cloudflare Browser Rendering screenshot directly in an image tag?',
    answer: (
      <>
        <div>
          Not directly. Cloudflare's endpoint is an authenticated POST — the
          request carries your API token, so it can never run from a browser
          tag. Every capture has to route through your backend, and storing,
          caching, and serving the binary is your job.
        </div>
        <div>
          Microlink screenshots are plain GET URLs that return a CDN-hosted
          image, so you can drop them into an image tag, a CSS background, or an
          Open Graph meta tag with no backend at all. See the{' '}
          <Link href='/docs/guides/screenshot'>screenshot docs</Link> for the
          embed patterns.
        </div>
      </>
    ),
    text: "Not directly. Cloudflare's endpoint is an authenticated POST — the request carries your API token, so it can never run from a browser tag. Every capture has to route through your backend, and storing, caching, and serving the binary is your job. Microlink screenshots are plain GET URLs that return a CDN-hosted image, so you can drop them into an image tag, a CSS background, or an Open Graph meta tag with no backend at all."
  },
  {
    question:
      "Why doesn't Cloudflare's screenshot endpoint include a proxy for blocked pages?",
    answer: (
      <>
        <div>
          Cloudflare is the world's largest bot-protection vendor — the walls
          that block screenshot requests are often Cloudflare's own product. Its
          Browser Rendering docs are explicit that the configurable user agent
          "does not bypass bot protection".
        </div>
        <div>
          Microlink ships the missing piece: when a target refuses datacenter
          traffic, the API signals <b>EPROXYNEEDED</b>, and{' '}
          <Link href='/features/proxy'>proxy: true</Link> reroutes the same
          request through auto-rotating residential IPs on Pro plans, backed by{' '}
          <Link href='/features/antibot'>antibot detection</Link> for 30+
          providers.
        </div>
      </>
    ),
    text: "Cloudflare is the world's largest bot-protection vendor — the walls that block screenshot requests are often Cloudflare's own product. Its Browser Rendering docs are explicit that the configurable user agent does not bypass bot protection. Microlink ships the missing piece: when a target refuses datacenter traffic, the API signals EPROXYNEEDED, and proxy: true reroutes the same request through auto-rotating residential IPs on Pro plans, backed by antibot detection for 30+ providers."
  },
  {
    question:
      'How does Cloudflare Browser Rendering pricing compare to Microlink for screenshots?',
    answer: (
      <>
        <div>
          The models are different shapes — and the shape of your traffic moves
          the Cloudflare bill more than the volume does. Cloudflare bills
          browser time and concurrency on top of a $5/month Workers Paid plan:
          10 browser-hours included, then $0.09 per hour, plus $2.00 per
          concurrent browser beyond 10 — measured on your daily peak, averaged
          over the month.
        </div>
        <div>
          At ~5 seconds of browser time per capture, 46,000 captures spread
          evenly is about 64 browser-hours — roughly $10/month. The same volume
          as a daily batch at Cloudflare's 10 requests/second cap holds ~50
          browsers open at peak, and that concurrency pushes the bill to roughly
          $90/month — before storage, caching, and delivery, which are separate
          work.
        </div>
        <div>
          Microlink bills finished screenshots at a flat rate: $49/month covers
          46,000 requests with adblock, proxy routing on Pro, CDN-hosted output,
          and caching included — a paid-plan TTL of up to 31 days means cache
          hits don't spend your quota, and there is no concurrency limit or
          per-minute cap on legitimate usage. A single request can even bundle
          the screenshot with the PDF, metadata, logo, and markdown, where
          Cloudflare bills each endpoint call as separate browser time.
        </div>
      </>
    ),
    text: "The models are different shapes — and the shape of your traffic moves the Cloudflare bill more than the volume does. Cloudflare bills browser time and concurrency on top of a $5/month Workers Paid plan: 10 browser-hours included, then $0.09 per hour, plus $2.00 per concurrent browser beyond 10 — measured on your daily peak, averaged over the month. At ~5 seconds of browser time per capture, 46,000 captures spread evenly is about 64 browser-hours — roughly $10/month. The same volume as a daily batch at Cloudflare's 10 requests/second cap holds ~50 browsers open at peak, and that concurrency pushes the bill to roughly $90/month — before storage, caching, and delivery, which are separate work. Microlink bills finished screenshots at a flat rate: $49/month covers 46,000 requests with adblock, proxy routing on Pro, CDN-hosted output, and caching included — a paid-plan TTL of up to 31 days means cache hits don't spend your quota, and there is no concurrency limit or per-minute cap on legitimate usage. A single request can even bundle the screenshot with the PDF, metadata, logo, and markdown, where Cloudflare bills each endpoint call as separate browser time."
  },
  {
    question:
      'How do I migrate from the Cloudflare screenshot endpoint to Microlink?',
    answer: (
      <>
        <div>
          The capture concepts map one-to-one: <b>url</b> stays <b>url</b>,{' '}
          <b>fullPage</b> becomes <b>screenshot.fullPage</b>, <b>selector</b>{' '}
          becomes <b>screenshot.element</b>, and <b>viewport</b>,{' '}
          <b>waitForSelector</b>, <b>cookies</b>, and <b>setExtraHTTPHeaders</b>{' '}
          all have direct equivalents.
        </div>
        <div>
          The main change is simpler plumbing: Microlink is a GET request with
          query parameters instead of an authenticated POST with a JSON body,
          and the response is a hosted image URL instead of a binary you need to
          store. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot guide</Link>.
        </div>
      </>
    ),
    text: 'The capture concepts map one-to-one: url stays url, fullPage becomes screenshot.fullPage, selector becomes screenshot.element, and viewport, waitForSelector, cookies, and setExtraHTTPHeaders all have direct equivalents. The main change is simpler plumbing: Microlink is a GET request with query parameters instead of an authenticated POST with a JSON body, and the response is a hosted image URL instead of a binary you need to store.'
  },
  {
    question:
      "What are Cloudflare's screenshot rate limits compared to Microlink?",
    answer: (
      <>
        <div>
          On the Workers Free plan, Cloudflare allows 10 minutes of browser time
          per day and 1 Quick Actions request every 10 seconds, with a 60-second
          browser timeout. The paid plan raises that to 10 requests per second
          and 120 concurrent browsers per account.
        </div>
        <div>
          Microlink's free tier is 25 requests per day with no account or token
          setup, and paid plans have no per-minute cap — you spend your monthly
          quota at whatever rate your workload needs.
        </div>
      </>
    ),
    text: "On the Workers Free plan, Cloudflare allows 10 minutes of browser time per day and 1 Quick Actions request every 10 seconds, with a 60-second browser timeout. The paid plan raises that to 10 requests per second and 120 concurrent browsers per account. Microlink's free tier is 25 requests per day with no account or token setup, and paid plans have no per-minute cap — you spend your monthly quota at whatever rate your workload needs."
  },
  {
    question: 'When is Cloudflare Browser Rendering the better choice?',
    answer: (
      <>
        <div>
          When you need browser infrastructure rather than finished screenshots.
          If your code already lives in Cloudflare Workers, bindings give you a
          headless browser with no extra auth hop, and persistent Puppeteer,
          Playwright, and CDP sessions cover automation well beyond captures.
        </div>
        <div>
          Its crawling and AI-extraction endpoints also go past what a
          screenshot API covers. If that is your workload, Browser Rendering is
          a genuinely different product — this page is about the screenshot use
          case.
        </div>
      </>
    ),
    text: 'When you need browser infrastructure rather than finished screenshots. If your code already lives in Cloudflare Workers, bindings give you a headless browser with no extra auth hop, and persistent Puppeteer, Playwright, and CDP sessions cover automation well beyond captures. Its crawling and AI-extraction endpoints also go past what a screenshot API covers. If that is your workload, Browser Rendering is a genuinely different product — this page is about the screenshot use case.'
  },
  {
    question: 'Why is there no live benchmark against Cloudflare on this page?',
    answer: (
      <>
        <div>
          Microlink's open{' '}
          <Link href='/benchmarks/screenshot-api'>screenshot benchmark</Link>{' '}
          measures dedicated screenshot SaaS providers over identical cold-start
          runs. Cloudflare's endpoint is account-scoped infrastructure with its
          own rate limits, so it has not been through that suite yet.
        </div>
        <div>
          We only publish numbers we have measured — the comparison on this page
          sticks to documented capabilities, pricing, and limits from each
          product's own docs.
        </div>
      </>
    ),
    text: "Microlink's open screenshot benchmark measures dedicated screenshot SaaS providers over identical cold-start runs. Cloudflare's endpoint is account-scoped infrastructure with its own rate limits, so it has not been through that suite yet. We only publish numbers we have measured — the comparison on this page sticks to documented capabilities, pricing, and limits from each product's own docs."
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
          color: 'black'
        })}
      >
        The <GradientText>Cloudflare screenshot</GradientText> alternative
        <br />
        with batteries included
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
        <b>Cloudflare Browser Rendering</b> rents you a raw headless browser —
        the pipeline around it is yours to build. <b>Microlink</b> returns a
        finished capture: <b>cookie banners and ads removed by default</b>, a{' '}
        <b>built-in residential proxy</b> for blocked pages, and a CDN-hosted
        URL you can embed anywhere.
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
          href='/screenshot'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'cloudflare' })}
        >
          Get Started Free
        </ArrowLink>
      </Flex>

      <Flex
        css={theme({
          width: '100%',
          maxWidth: '960px',
          my: [3, 3, 4, 4],
          pb: [3, 3, 4, 4],
          gap: [3, 3, 4, 4],
          flexDirection: 'column'
        })}
      >
        <Box css={theme({ width: '100%', minWidth: 0 })}>
          <Caps
            css={theme({
              fontSize: 0,
              color: 'black60',
              pb: 2,
              display: 'block',
              textAlign: 'center'
            })}
          >
            Microlink
          </Caps>
          <CodeEditor language='bash' blinkCursor={false} autoHeight>
            {MICROLINK_CURL}
          </CodeEditor>
          <Text
            css={theme({
              pt: 2,
              fontSize: 0,
              color: 'black50',
              textAlign: 'center',
              fontFamily: 'mono'
            })}
          >
            Returns a CDN-hosted URL — cookie banners already gone.
          </Text>
        </Box>
        <Box css={theme({ width: '100%', minWidth: 0 })}>
          <Caps
            css={theme({
              fontSize: 0,
              color: 'black60',
              pb: 2,
              display: 'block',
              textAlign: 'center'
            })}
          >
            Cloudflare Browser Rendering
          </Caps>
          <CodeEditor language='bash' blinkCursor={false} autoHeight>
            {CLOUDFLARE_CURL}
          </CodeEditor>
          <Text
            css={theme({
              pt: 2,
              fontSize: 0,
              color: 'black50',
              textAlign: 'center',
              fontFamily: 'mono'
            })}
          >
            Returns raw binary — storing, caching, and serving it is on you.
          </Text>
        </Box>
      </Flex>

      <Text
        css={theme({
          fontSize: 1,
          color: 'black50',
          textAlign: 'center',
          fontFamily: 'mono'
        })}
      >
        No token, no account — try it right now, even on <b>cloudflare.com</b>{' '}
        itself:
      </Text>
      <Text
        css={theme({
          pt: 2,
          fontSize: 1,
          lineHeight: 2,
          textAlign: 'center',
          maxWidth: layout.large,
          mx: 'auto'
        })}
      >
        <HeroCodeLink
          href={LIVE_SCREENSHOT_URL + '&embed=screenshot.url'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {LIVE_SCREENSHOT_URL}
        </HeroCodeLink>
      </Text>
    </Flex>
  </BluePrintBackground>
)

/* ---------------------------------------------------------------------------
 * Comparison Table Section
 * --------------------------------------------------------------------------- */

const ComparisonSection = () => (
  <Section
    as='section'
    id='comparison'
    css={theme({
      borderTop: `${borders[1]} ${colors.black05}`,
      borderBottom: `${borders[1]} ${colors.black05}`,
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <SectionInner>
      <Subhead css={theme({ pb: [2, 2, 3, 3], pt: 4 })} titleize={false}>
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
        A screenshot API and browser infrastructure, side by side.
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
        Last verified: August&nbsp;2026. See each product's docs for the latest.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Why Developers Switch
 * --------------------------------------------------------------------------- */

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'A screenshot URL, not a browser rental',
    description: (
      <>
        Cloudflare's endpoint is an authenticated POST that returns raw binary —
        your API token can never touch a browser tag, so every capture routes
        through your backend, and <b>storing, caching, and serving</b> the image
        is your job. Microlink returns a <b>CDN-hosted URL</b> you can drop
        straight into an image tag.
      </>
    )
  },
  {
    number: '02',
    title: 'Popups and cookie banners gone by default',
    description: (
      <>
        Microlink ships <Link href='/docs/api/parameters/adblock'>adblock</Link>{' '}
        enabled by default: ads, trackers, and cookie consent banners are
        stripped <b>before the page renders</b>. On Cloudflare you get{' '}
        <b>rejectRequestPattern</b> and <b>addScriptTag</b> — the blocklists and
        consent-dismissal scripts are yours to write and maintain.
      </>
    )
  },
  {
    number: '03',
    title: 'A proxy Cloudflare will never ship',
    description: (
      <>
        When a target blocks datacenter traffic, Microlink signals{' '}
        <b>EPROXYNEEDED</b> and <Link href='/features/proxy'>proxy: true</Link>{' '}
        reroutes the request through <b>auto-rotating residential IPs</b>, with{' '}
        <Link href='/features/antibot'>antibot detection</Link> for 30+
        providers — Cloudflare included. Cloudflare sells the bot protection
        those walls are made of; its own docs state the configurable user agent{' '}
        <b>"does not bypass bot protection"</b>.
      </>
    )
  },
  {
    number: '04',
    title: 'One request, the whole platform',
    description: (
      <>
        A single API call can return the <b>screenshot</b>, the <b>PDF</b>, the{' '}
        <b>metadata</b> — title, description, logo, brand image — and even{' '}
        <b>markdown</b>, all at the same per-request price with no token
        juggling. On Cloudflare, each of those is a separate endpoint call,
        billed as separate browser time.
      </>
    )
  },
  {
    number: '05',
    title: 'Presentation-ready output, not raw pixels',
    description: (
      <>
        Browser chrome <b>overlays</b> with light/dark themes and custom
        backgrounds, <b>dark-mode capture</b>, named <b>device presets</b> like
        iPhone 15 Pro Max, and <b>animated MP4/WebM</b> recordings — all
        parameters, not projects. Cloudflare's endpoint exposes viewport numbers
        and PNG/JPEG.
      </>
    )
  },
  {
    number: '06',
    title: 'A free tier with zero setup',
    description: (
      <>
        Microlink gives you <b>25 free requests per day</b> — no account, no API
        token, testable from the browser address bar. Cloudflare's free tier
        needs an account ID plus a scoped API token, and caps you at{' '}
        <b>10 minutes of browser time per day</b> and 1 request every
        10&nbsp;seconds.
      </>
    )
  },
  {
    number: '07',
    title: 'Open-source core, fully auditable',
    description: (
      <>
        Browserless, Metascraper, and MQL are <b>MIT licensed</b> — the engine
        behind every capture is public code you can read, fork, or self-host.
        Browser Rendering is a closed managed service inside the Cloudflare
        platform.
      </>
    )
  }
]

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
  opacity: 0.90;
`

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
        The top reasons teams pick Microlink over Cloudflare's screenshot
        endpoint.
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
 * Where Cloudflare Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: 'You live inside Cloudflare Workers',
    description:
      'Workers bindings call the browser directly from your Worker code with no extra auth hop, and compose naturally with R2, KV, and Queues. If your stack is already Workers-native, that gravity is real.'
  },
  {
    title: 'You need a full automation platform',
    description:
      'Persistent browser sessions with Puppeteer, Playwright, and CDP support cover testing, scraping flows, and agent automation well beyond captures. Browser Rendering is browser infrastructure, not just a screenshot tool.'
  },
  {
    title: 'Crawling and AI extraction endpoints',
    description:
      'The crawl endpoint handles multi-page jobs and the JSON endpoint extracts structured data from a natural-language prompt — both beyond what a screenshot API covers.'
  },
  {
    title: 'Raw compute is cheap at light usage',
    description:
      'Workers Paid is $5/month with 10 browser-hours included, then $0.09 per hour. If your captures are quick, your volume is low, and you are happy assembling storage and delivery yourself, the compute bill stays small.'
  },
  {
    title: "It runs on Cloudflare's network",
    description:
      'Captures render on the same global edge platform that fronts much of the web — Microlink would know, since its own CDN is served from Cloudflare edge nodes. For the screenshot use case, though, the network is the starting point, not the finished pipeline.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='cloudflare-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead css={theme({ pb: [4, 4, 5, 5], pt: 3 })} titleize={false}>
        Where <GradientText>Cloudflare</GradientText>
        <br /> Might Be the Right Choice
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
 * Pricing Section
 * --------------------------------------------------------------------------- */

/* Pricing sources:
 * Cloudflare Browser Rendering pricing: https://developers.cloudflare.com/browser-run/pricing/
 * Cloudflare Browser Rendering limits: https://developers.cloudflare.com/browser-run/limits/
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const USAGE_TRAP_ROWS = [
  {
    scenario: 'Cloudflare — traffic spread evenly',
    detail: '46,000 captures × ~5s of browser time ≈ 64 browser-hours',
    bill: '≈ $10/mo'
  },
  {
    scenario: 'Cloudflare — daily batch at 10 req/s',
    detail:
      "Same volume at Cloudflare's own rate cap holds ~50 browsers open — 40 over the 10 included, at $2.00 each",
    bill: '≈ $90/mo'
  },
  {
    scenario: 'Microlink — any traffic shape',
    detail: '46,000 requests, no concurrency limit* and no per-minute cap',
    bill: '$49/mo',
    highlight: true
  }
]

const PricingSection = () => (
  <Section
    as='section'
    id='pricing'
    css={theme({ py: SECTION_VERTICAL_SPACING })}
  >
    <SectionInner>
      <Subhead css={theme({ pb: [2, 2, 3, 3], pt: 3 })} titleize={false}>
        One request price. <br />
        <GradientText>Everything included.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Microlink bills <b>finished screenshots</b>. Cloudflare bills{' '}
        <b>browser-minutes and concurrency</b> — and the pipeline around them is
        yours to build.
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
              46,000&nbsp;requests/month
            </Text>
            <Box as='ul' css={theme({ pl: 3, m: 0 })}>
              {[
                'One request can return screenshot, PDF, metadata, logo, and markdown together',
                'Adblock and cookie-banner removal on by default',
                'Built-in residential proxy and antibot detection',
                "TTL caching up to 31 days — cache hits don't spend your quota",
                'No concurrency limit* and no per-minute cap',
                'Free: 25 requests/day, no credit card, no expiry',
                `${CDN_EDGES} edge nodes, 99.9% SLA`,
                '~$0.00107/request on this tier'
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
                href='/screenshot'
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
            Cloudflare
          </Badge>
          <PriceAmount>
            $5
            <Text
              as='span'
              css={theme({
                fontSize: 1,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              /mo + usage
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
            Workers Paid + browser time
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              '10 browser-hours/month included, then $0.09/hour',
              '10 concurrent browsers (averaged), then $2.00/browser',
              'Quick Actions capped at 10 requests/second',
              'Storage, caching, and delivery are your build (R2, Cache API)',
              'Free plan: 10 min/day of browser time, 1 request every 10s'
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

      <Box
        css={theme({
          pt: [4, 4, 5, 5],
          width: '100%',
          maxWidth: layout.normal,
          mx: 'auto'
        })}
      >
        <Text
          css={theme({
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3],
            color: 'black',
            pb: 2,
            textAlign: 'center'
          })}
        >
          The usage trap: same 46,000 captures, very different bills
        </Text>
        <Text
          css={theme({
            fontSize: 1,
            color: 'black60',
            pb: 3,
            lineHeight: 2,
            textAlign: 'center',
            maxWidth: '40em',
            mx: 'auto'
          })}
        >
          Cloudflare charges browser time plus concurrency — and concurrency is
          billed on your <b>daily peak</b>, averaged over the month. The shape
          of your traffic moves the bill more than the volume does.
        </Text>
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
                <th>Scenario</th>
                <th>What happens</th>
                <th>Monthly bill</th>
              </tr>
            </thead>
            <tbody>
              {USAGE_TRAP_ROWS.map(({ scenario, detail, bill, highlight }) => (
                <tr
                  key={scenario}
                  css={{
                    background: highlight
                      ? 'rgba(6, 125, 247, 0.03)'
                      : 'transparent'
                  }}
                >
                  <td css={theme({ fontWeight: 'bold' })}>{scenario}</td>
                  <td>{detail}</td>
                  <td css={{ whiteSpace: 'nowrap' }}>{bill}</td>
                </tr>
              ))}
            </tbody>
          </FeatureTable>
        </Box>
      </Box>

      <Text
        css={theme({
          pt: 4,
          fontSize: 1,
          color: 'black60',
          textAlign: 'center',
          maxWidth: layout.small,
          mx: 'auto',
          lineHeight: 2
        })}
      >
        Estimates assume ~5 seconds of browser time per capture at Cloudflare's
        published rates. The exact number matters less than the shape of the
        curve: the bill moves with render time and traffic bursts, on top of
        building storage, caching, and delivery yourself. Microlink's price is
        the finished capture at a flat per-request rate — and one request can
        bundle the screenshot with the PDF, metadata, logo, and markdown, while
        a paid-plan TTL of up to 31 days means cache hits don't spend your
        monthly quota at all.
      </Text>

      <Text
        css={theme({
          pt: 3,
          mb: 4,
          fontSize: 0,
          color: 'black40',
          textAlign: 'center',
          maxWidth: layout.small,
          mx: 'auto',
          lineHeight: 2
        })}
      >
        * Microlink never bills or caps concurrency on legitimate usage. We only
        restrict usage that is fraudulent or illegal — for example, traffic
        aimed at attacking other people's sites.
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
          pb: [2, 2, 3, 3]
        })}
        titleize={false}
      >
        Ship screenshots, not browser plumbing
      </Subhead>

      <Caption
        css={theme({
          color: 'white80',
          pt: 3,
          pb: [3, 3, 4, 4],
          maxWidth: layout.large
        })}
        titleize={false}
      >
        Your first{' '}
        <b css={theme({ color: 'white' })}>25&nbsp;requests/day are free</b> —
        no token, no account, no credit card.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <ArrowLink
          href='/screenshot'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'cloudflare' })}
          css={theme({ fontSize: 3, px: 5, py: 3, color: 'white' })}
        >
          Start Building Free
        </ArrowLink>
      </Flex>
    </Flex>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Try It Section (code editor + call-to-action)
 * --------------------------------------------------------------------------- */

const TryItSection = () => {
  const breakpoint = useBreakpoint()
  return (
    <Section as='section' css={theme({ py: [5, 5, 6, 6] })}>
      <SectionInner>
        <Subhead
          css={theme({
            textAlign: 'center'
          })}
        >
          Ship <span css='color: #fa5252;'>cleaner</span> screenshots
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            textAlign: 'center'
          })}
        >
          25&nbsp;requests/day free — no account, no credit card. One GET
          request in, one finished capture&nbsp;back.
        </Caption>
        <Flex
          css={[
            theme({
              pt: [4, 4, 5, 5],
              width: '100%',
              px: [2, 3, 0, 0]
            }),
            {
              '& > div, & > div > div:first-child': {
                width: '100%'
              }
            }
          ]}
        >
          <MultiCodeEditorInteractive
            height={breakpoint === 0 ? 250 : 180}
            mqlCode={{
              url: 'https://www.cloudflare.com',
              screenshot: true
            }}
          />
        </Flex>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            gap: [3, 3, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            alignItems: 'center'
          })}
        >
          <Link
            href='/docs/guides/screenshot'
            onClick={() =>
              trackEvent('alternative cta', { competitor: 'cloudflare' })}
            css={theme({ fontSize: CTA_LINK_FONT_SIZE })}
          >
            Start now for free
          </Link>
        </Flex>
      </SectionInner>
    </Section>
  )
}

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
    title='Cloudflare Screenshot Alternative with Batteries Included'
    description="Cloudflare's screenshot endpoint rents you a raw browser. Microlink returns finished captures: cookie banners removed by default, a built-in residential proxy for blocked pages, and CDN-hosted URLs you can embed anywhere."
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Cloudflare Screenshot Alternative with Batteries Included',
        description:
          'Compare Microlink and Cloudflare Browser Rendering for screenshots. Microlink removes cookie banners and ads by default, ships a built-in rotating residential proxy with antibot detection, and returns CDN-hosted capture URLs you can embed without a backend.',
        url: 'https://microlink.io/alternative/cloudflare',
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

const CloudflarePage = () => (
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

export default CloudflarePage
