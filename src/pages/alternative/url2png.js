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
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { useBreakpoint } from 'components/hook/use-breakpoint'

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
 * URL2PNG docs: https://www.url2png.com/docs
 * URL2PNG pricing: https://www.url2png.com/plans
 * URL2PNG signup: https://www.url2png.com/signup
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const PRICING = {
  microlink: {
    price: 45,
    requests: 46000
  },
  url2png: {
    price: 199,
    requests: 50000,
    overage: '$0.004'
  },
  url2pngEntry: {
    price: 29,
    requests: 5000,
    overage: '$0.006'
  }
}

const PRICE_SAVINGS_PCT = Math.floor(
  ((PRICING.url2png.price - PRICING.microlink.price) / PRICING.url2png.price) *
    100
)
const MICROLINK_PRICE_PER_1000 = (
  (PRICING.microlink.price / PRICING.microlink.requests) *
  1000
).toFixed(2)
const URL2PNG_PRICE_PER_1000 = (
  (PRICING.url2png.price / PRICING.url2png.requests) *
  1000
).toFixed(2)
const UNAVATAR_SCREENSHOT_URL =
  'https://api.microlink.io?screenshot&embed=screenshot.url&url=https://unavatar.io'

const COMPARISON_DATA = [
  { feature: 'Screenshot capture', microlink: true, url2png: true },
  { feature: 'Full-page screenshots', microlink: true, url2png: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    url2png: true,
    note: 'Official docs snippets surface css_selector support alongside the standard screenshot parameters.'
  },
  { feature: 'Viewport size control', microlink: true, url2png: true },
  { feature: 'Custom CSS injection', microlink: true, url2png: true },
  { feature: 'User-Agent override', microlink: true, url2png: true },
  { feature: 'Accept-Language override', microlink: true, url2png: true },
  {
    feature: 'Built-in response cache',
    microlink: true,
    url2png: true,
    note: 'URL2PNG documents a 30-day default TTL for cached screenshots and a unique parameter for fresh captures.'
  },
  { feature: 'Signed request URLs', microlink: true, url2png: true },
  {
    feature: 'Direct embed (no backend needed)',
    microlink: true,
    url2png: true,
    note: 'URL2PNG says hotlinking is encouraged, so both services can power direct image embeds.'
  },
  {
    feature: 'PDF generation',
    microlink: true,
    url2png: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    url2png: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    url2png: false,
    highlight: true
  },
  {
    feature: 'Custom cookies',
    microlink: true,
    url2png: 'not documented'
  },
  {
    feature: 'Arbitrary custom HTTP headers',
    microlink: true,
    url2png: 'partial',
    note: 'Public docs mention user_agent and accept_languages overrides, not arbitrary request headers.'
  },
  {
    feature: 'Click/scroll interactions',
    microlink: true,
    url2png: 'not documented'
  },
  {
    feature: 'Wait for selector',
    microlink: true,
    url2png: 'not documented'
  },
  {
    feature: 'Ad blocking',
    microlink: true,
    url2png: 'not documented'
  },
  {
    feature: 'Built-in proxy (auto-rotating residential)',
    microlink: true,
    url2png: 'not documented',
    highlight: true
  },
  {
    feature: 'Antibot detection (30+ providers)',
    microlink: true,
    url2png: 'not documented',
    highlight: true
  },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    url2png: false
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    url2png: false,
    highlight: true
  },
  { feature: 'Open-source core', microlink: true, url2png: false },
  { feature: 'MCP server', microlink: true, url2png: false }
]

const FAQ_ITEMS = [
  {
    question: 'Why is there no live URL2PNG benchmark on this page?',
    answer: (
      <>
        <div>
          We did not publish a benchmark because URL2PNG's public{' '}
          <Link href='https://www.url2png.com/signup' rel='nofollow'>
            signup page
          </Link>{' '}
          resolved back to the plans view during review, and the public site did
          not expose a normal self-serve evaluation flow for provisioning a new
          test account.
        </div>
        <div>
          Since the{' '}
          <Link href='https://www.url2png.com/docs' rel='nofollow'>
            docs
          </Link>{' '}
          say the API key is assigned during signup, we limited this page to
          verified docs and pricing instead of inventing a benchmark story. If
          their public signup flow reopens, this page can be benchmarked later.
        </div>
      </>
    ),
    text: "We did not publish a benchmark because URL2PNG's public signup page resolved back to the plans view during review, and the public site did not expose a normal self-serve evaluation flow for provisioning a new test account. Since the docs say the API key is assigned during signup, we limited this page to verified docs and pricing instead of inventing a benchmark story."
  },
  {
    question:
      "What does Microlink cover that URL2PNG's public docs do not mention?",
    answer: (
      <>
        <div>
          Microlink goes well beyond screenshot capture. One integration also
          gives you PDF generation, metadata extraction, link previews, remote
          JavaScript execution, browser chrome overlays, and built-in tooling
          for blocked pages.
        </div>
        <div>
          URL2PNG's public docs focus on screenshot parameters like viewport,
          fullpage, custom CSS, delay, user agent, language override, TTL, and
          cache-busting. That is fine for screenshot-only workloads, but it is a
          much narrower API surface.
        </div>
      </>
    ),
    text: "Microlink goes well beyond screenshot capture. One integration also gives you PDF generation, metadata extraction, link previews, remote JavaScript execution, browser chrome overlays, and built-in tooling for blocked pages. URL2PNG's public docs focus on screenshot parameters like viewport, fullpage, custom CSS, delay, user agent, language override, TTL, and cache-busting, which is a much narrower API surface."
  },
  {
    question:
      'How different is the pricing once you get close to 50,000 screenshots?',
    answer: (
      <>
        <div>
          URL2PNG's Killinit plan is <b>$199/month</b> for
          <b> 50,000 freshly generated screenshots</b>. Microlink's comparison
          tier is <b>$45/month</b> for <b>46,000 requests</b>.
        </div>
        <div>
          That means Microlink gets you almost the same monthly volume for about{' '}
          <b>{PRICE_SAVINGS_PCT}% less spend</b>. Per 1,000 requests, Microlink
          lands around <b>${MICROLINK_PRICE_PER_1000}</b> versus{' '}
          <b>${URL2PNG_PRICE_PER_1000}</b> on the URL2PNG plan.
        </div>
      </>
    ),
    text: `URL2PNG's Killinit plan is $199 per month for 50,000 freshly generated screenshots. Microlink's comparison tier is $45 per month for 46,000 requests. That gets you almost the same monthly volume for about ${PRICE_SAVINGS_PCT}% less spend. Per 1,000 requests, Microlink lands around $${MICROLINK_PRICE_PER_1000} versus $${URL2PNG_PRICE_PER_1000} on the URL2PNG plan.`
  },
  {
    question: 'Can I evaluate Microlink without paying first?',
    answer: (
      <>
        <div>
          Yes. Microlink gives you <b>50 requests/day free</b> with no credit
          card and no time limit. You can test the same screenshot API surface
          before moving to a paid plan.
        </div>
        <div>
          URL2PNG's{' '}
          <Link href='https://www.url2png.com/plans' rel='nofollow'>
            plans page
          </Link>{' '}
          says it does not offer free accounts, so Microlink is much easier to
          evaluate gradually.
        </div>
      </>
    ),
    text: "Yes. Microlink gives you 50 requests per day free with no credit card and no time limit. URL2PNG's plans page says it does not offer free accounts, so Microlink is much easier to evaluate gradually."
  },
  {
    question: 'How hard is it to move from URL2PNG signed URLs to Microlink?',
    answer: (
      <>
        <div>
          Usually not very hard. URL2PNG already uses a signed request model
          with a URL target plus query params like <i>viewport</i>,{' '}
          <i>fullpage</i>, <i>delay</i>, and <i>custom_css_url</i>. Microlink
          supports the same high-level capture concepts, even if the parameter
          names differ.
        </div>
        <div>
          In practice, migrations are mostly endpoint-and-parameter mapping
          work. Start from the{' '}
          <Link href='/docs/guides/screenshot'>screenshot guide</Link> and adapt
          your existing request builder around the new query shape.
        </div>
      </>
    ),
    text: 'Usually not very hard. URL2PNG already uses a signed request model with a URL target plus query params like viewport, fullpage, delay, and custom_css_url. Microlink supports the same high-level capture concepts, even if the parameter names differ. In practice, migrations are mostly endpoint-and-parameter mapping work.'
  },
  {
    question: 'Does URL2PNG document cookies or arbitrary request headers?',
    answer: (
      <>
        <div>
          Not in the public material we reviewed. The docs explicitly mention{' '}
          <i>user_agent</i> and <i>accept_languages</i>, which gives you some
          header control, but we did not find documented cookie injection or
          arbitrary custom header support on the public docs pages.
        </div>
        <div>
          Microlink supports custom cookies and arbitrary request headers, which
          matters once you need authenticated captures, localization tests, or
          more realistic browser state.
        </div>
      </>
    ),
    text: 'Not in the public material we reviewed. The docs explicitly mention user_agent and accept_languages, which gives you some header control, but we did not find documented cookie injection or arbitrary custom header support on the public docs pages. Microlink supports custom cookies and arbitrary request headers.'
  },
  {
    question: 'When is URL2PNG still a reasonable choice?',
    answer: (
      <>
        <div>
          URL2PNG still looks reasonable when your workload is strictly
          screenshot-first and you value a very simple signed image URL model,
          long cache TTLs, hotlink-friendly delivery, and dedicated worker
          plans.
        </div>
        <div>
          Its public site also emphasizes no queued images, Fastly CDN delivery,
          and high-fidelity rendering for canvas, webfonts, CSS3, SVG, and video
          pages. If those basics are enough, a broader browser platform may be
          unnecessary.
        </div>
      </>
    ),
    text: 'URL2PNG still looks reasonable when your workload is strictly screenshot-first and you value a very simple signed image URL model, long cache TTLs, hotlink-friendly delivery, and dedicated worker plans. Its public site also emphasizes no queued images, Fastly CDN delivery, and high-fidelity rendering for canvas, webfonts, CSS3, SVG, and video pages.'
  },
  {
    question:
      'Can Microlink replace screenshot plus metadata and preview tooling with one API?',
    answer: (
      <>
        <div>
          Yes. That is one of the clearest reasons teams move over. Microlink
          can return screenshots, generate PDFs, extract metadata, power link
          previews through SDKs, and execute browser-side JavaScript from the
          same platform.
        </div>
        <div>
          URL2PNG is centered on screenshot delivery. If your screenshot
          pipeline keeps expanding into product previews, metadata, or browser
          automation, Microlink removes extra glue code and extra vendors.
        </div>
      </>
    ),
    text: 'Yes. Microlink can return screenshots, generate PDFs, extract metadata, power link previews through SDKs, and execute browser-side JavaScript from the same platform. URL2PNG is centered on screenshot delivery, so Microlink removes extra glue code and extra vendors once your workflow expands.'
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
 * Comparison data helpers
 * --------------------------------------------------------------------------- */

const WHY_SWITCH_ITEMS = [
  {
    number: '01',
    title: 'A modern API, not a screenshot-only endpoint',
    description: (
      <>
        URL2PNG's public docs revolve around screenshot controls like viewport,
        fullpage, TTL, custom CSS, delay, language, and user agent. Microlink
        adds{' '}
        <b>PDF, metadata, previews, remote JS, and richer browser control</b>{' '}
        from the same integration.
      </>
    )
  },
  {
    number: '02',
    title: 'Near-50k monthly volume without a $199 bill',
    description: (
      <>
        URL2PNG prices <b>50,000 screenshots at $199/month</b>. Microlink gives
        you <b>46,000 requests for $45/month</b>. That is almost the same volume
        for roughly <b>{PRICE_SAVINGS_PCT}% less spend</b>.
      </>
    )
  },
  {
    number: '03',
    title: 'Free evaluation instead of a gated paid entry point',
    description: (
      <>
        URL2PNG's plans page says there are <b>no free accounts</b>. Microlink
        gives you <b>50 requests/day free</b> with no credit card and no expiry,
        so you can test real traffic patterns before paying.
      </>
    )
  },
  {
    number: '04',
    title: 'More browser control when pages stop being simple',
    description: (
      <>
        Microlink supports{' '}
        <b>
          custom cookies, arbitrary headers, click/scroll interactions, selector
          waits, and ad blocking
        </b>
        . URL2PNG's public docs document a much narrower control surface
        centered on the screenshot itself.
      </>
    )
  },
  {
    number: '05',
    title: 'Built for harder targets',
    description: (
      <>
        Microlink includes <b>built-in residential proxying</b> and{' '}
        <b>antibot detection</b> for 30+ providers. URL2PNG's public material
        does not document built-in proxying or blocked-page tooling on the same
        level.
      </>
    )
  },
  {
    number: '06',
    title: 'One platform for product, embeds, and previews',
    description: (
      <>
        Microlink can power screenshots, metadata, link previews, and
        presentation-ready browser overlays from one API. That is a better fit
        when screenshot capture is only <b>one part of a bigger workflow</b>.
      </>
    )
  }
]

const HONESTY_ITEMS = [
  {
    title: 'Simple signed image URLs',
    description:
      'URL2PNG keeps the integration model very straightforward: one signed URL, one image response, one job done. If your needs are truly screenshot-first, that simplicity is attractive.'
  },
  {
    title: 'Cache TTL and freshness controls',
    description:
      'URL2PNG documents a 30-day default TTL plus a unique parameter to force fresh captures. That is useful when you want deterministic screenshot caching without building your own image cache layer.'
  },
  {
    title: 'Screenshot-first rendering focus',
    description:
      'The homepage explicitly calls out graphs, canvas, webfonts, CSS3, SVG, and video rendering. If your workload is mostly about turning pages into images, that focused rendering pitch makes sense.'
  },
  {
    title: 'Fastly CDN, hotlinking, and no queued images',
    description:
      'URL2PNG highlights Fastly CDN delivery, says hotlinking is encouraged, and says there are no queued images. That is a nice fit for direct image delivery inside apps or CMS flows.'
  },
  {
    title: 'Dedicated worker plans',
    description:
      'The paid plans advertise 10 dedicated workers on Bootstrapped and 35 on Killinit, plus customization services on higher tiers. Teams with stable screenshot-only demand may like that clarity.'
  },
  {
    title: 'Lower paid entry point for basic usage',
    description:
      'If you only need 5,000 freshly generated screenshots per month and do not care about richer browser workflows, URL2PNG starts at $29. That is a valid screenshot-only buying profile.'
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
            URL2PNG
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, url2png, highlight, note }) => (
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
                <CellValue value={url2png} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </FeatureTable>
  </Box>
)

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
        The modern <GradientText>URL2PNG</GradientText> alternative
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
        <b>URL2PNG</b> still covers simple screenshot delivery. If you need a
        more modern browser API with{' '}
        <b>PDFs, metadata, previews, harder-page tooling</b>, and far lower cost
        at higher volume, <b>Microlink</b> gives you{' '}
        <b>46,000 requests for $45</b> versus URL2PNG's{' '}
        <b>50,000 screenshots for $199</b>.
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
        <ArrowLink href='/screenshot'>Get Started Free</ArrowLink>
      </Flex>

      <Box
        css={theme({
          pt: [2, 2, 3, 3],
          width: '100%',
          maxWidth: layout.large
        })}
      >
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black70',
            lineHeight: 2,
            textAlign: 'center',
            maxWidth: '42em',
            mx: 'auto'
          })}
        >
          URL2PNG requires sending them an email to create an account and does
          not offer a free trial. Microlink lets you test the screenshot API
          immediately, even without an API key, with{' '}
          <b>50 free requests per day</b>.
        </Text>

        <Text
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: 1,
            color: 'black50',
            textAlign: 'center',
            fontFamily: 'mono'
          })}
        >
          Quick test on the <b>unavatar.io</b> homepage: click the URL below to
          generate the screenshot.
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
            href={UNAVATAR_SCREENSHOT_URL}
            target='_blank'
            rel='noopener noreferrer'
          >
            {UNAVATAR_SCREENSHOT_URL}
          </HeroCodeLink>
        </Text>
      </Box>
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
        The usual reasons teams outgrow URL2PNG's screenshot-only surface.
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
        Almost same volume.
        <br />
        <GradientText>Much lower spend.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        <b>46,000 requests at $45</b> with URL2PNG's{' '}
        <b>50,000 screenshots at $199</b>.
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
                'Screenshots, PDF, metadata, previews, and remote JS',
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
            URL2PNG
          </Badge>
          <PriceAmount>
            $199
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
            50,000&nbsp;fresh screenshots/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'Killinit plan with 35 dedicated workers',
              `${PRICING.url2png.overage} per extra screenshot`,
              'No free accounts on the public pricing page',
              'Fastly CDN and SSL endpoint',
              'Full-page screenshots and custom CSS injection',
              `$${URL2PNG_PRICE_PER_1000} per 1,000 screenshots`
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
        URL2PNG also has a <b>$29</b> Bootstrapped plan for{' '}
        <b>5,000 screenshots</b>, which is a fair lower-cost paid entry point
        for simple screenshot-only usage. This page focuses on the higher-volume
        comparison because that is where the price gap becomes hardest to
        ignore.
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
        Replace legacy screenshot plumbing
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
        <b css={theme({ color: 'white' })}>50&nbsp;requests/day free</b> and
        keep the same browser API when your workload gets more demanding.
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
        Based on URL2PNG's public docs, homepage, plans, and signup flow.
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
        Last verified: April&nbsp;2026. Cells marked "not documented" mean we
        did not find public documentation for that capability on URL2PNG's
        official pages.
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
    id='url2png-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>URL2PNG</GradientText>
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

const TryItSection = () => {
  const breakpoint = useBreakpoint()

  return (
    <Section as='section' css={theme({ py: [5, 5, 6, 6] })}>
      <SectionInner>
        <Subhead
          css={theme({
            fontSize: CTA_TITLE_FONT_SIZE,
            textAlign: 'center'
          })}
        >
          Ship <span css='color: #fa5252;'>more than</span> screenshots
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
          Start with screenshots, then add metadata, previews, PDF output, or
          remote browser logic only when your workflow actually needs them.
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
              url: 'https://www.apple.com',
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
    title='URL2PNG Alternative for a More Modern Screenshot API'
    description='URL2PNG still covers simple screenshots, but Microlink gives you a free plan or 46,000 requests for $45 versus URL2PNG 50,000 for $199.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'URL2PNG Alternative for a More Modern Screenshot API | Microlink',
        description:
          "Compare Microlink and URL2PNG on documented browser capabilities and pricing. Microlink adds PDF, metadata, previews, and harder-page tooling while giving you 46,000 requests for $45 versus URL2PNG's 50,000 screenshots for $199.",
        url: 'https://microlink.io/alternative/url2png',
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

const Url2pngPage = () => (
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

export default Url2pngPage
