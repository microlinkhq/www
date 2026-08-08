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

const LIVE_METADATA_URL =
  'https://api.microlink.io/?url=https%3A%2F%2Fwww.context.dev'

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
  { feature: 'URL to LLM-ready markdown', microlink: true, contextdev: true },
  { feature: 'Metadata extraction', microlink: true, contextdev: true },
  {
    feature: 'Logo & brand image extraction',
    microlink: true,
    contextdev: true,
    highlight: true,
    note: 'Context.dev Retrieve Brand bills 10 credits; Microlink includes logo and brand image in the standard response.'
  },
  {
    feature: 'Color palette extraction',
    microlink: true,
    contextdev: true,
    note: 'Context.dev styleguide endpoint bills 10 credits.'
  },
  {
    feature: 'Screenshot capture',
    microlink: true,
    contextdev: true,
    note: 'Context.dev bills screenshots at 5 credits; Microlink at the flat request price.'
  },
  {
    feature: 'Structured data extraction',
    microlink: true,
    contextdev: true,
    note: 'Context.dev Extract bills 10 credits; Microlink MQL selector rules run at the flat request price.'
  },
  {
    feature: 'Hotlinkable logo URLs',
    microlink: true,
    contextdev: true,
    note: 'Microlink via embed=logo.url; Context.dev via its Logo Link CDN.'
  },
  {
    feature: 'Web search endpoint',
    microlink: true,
    contextdev: true,
    note: 'Microlink Search is a paid workflow from the first request.'
  },
  {
    feature: 'Residential proxy / anti-bot bypass',
    microlink: true,
    contextdev: true,
    note: 'Context.dev includes it on every plan; Microlink includes it on Pro plans.'
  },
  { feature: 'MCP server', microlink: true, contextdev: true },
  { feature: 'CLI', microlink: true, contextdev: true },
  { feature: 'SDKs (multiple languages)', microlink: true, contextdev: true },
  {
    feature: 'Markdown + metadata + logo + screenshot in one request',
    microlink: true,
    contextdev: false,
    highlight: true,
    note: 'On Context.dev that bundle is 1 + 10 + 5 = 16 credits across separate endpoint calls.'
  },
  {
    feature: 'Free tier that renews daily',
    microlink: true,
    contextdev: false,
    highlight: true,
    note: 'Context.dev free credits are one-time: 500, or 250 with a consumer email.'
  },
  {
    feature: 'Keyless usage (no API key)',
    microlink: true,
    contextdev: false,
    highlight: true
  },
  {
    feature: 'No per-minute rate cap',
    microlink: true,
    contextdev: false,
    note: 'Context.dev caps 30–700 API calls/minute depending on plan.'
  },
  {
    feature: 'PDF generation (URL → PDF)',
    microlink: true,
    contextdev: false,
    highlight: true
  },
  {
    feature: 'Document conversion (PDF/docx/xlsx/pptx → markdown)',
    microlink: true,
    contextdev: false
  },
  {
    feature: 'Animated capture (MP4/WebM)',
    microlink: true,
    contextdev: false
  },
  { feature: 'Browser chrome overlay', microlink: true, contextdev: false },
  { feature: 'Dark/light mode capture', microlink: true, contextdev: false },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    contextdev: false
  },
  {
    feature: 'Link previews SDK (React/Vue/JS)',
    microlink: true,
    contextdev: false
  },
  {
    feature: 'Open-source core (MIT)',
    microlink: true,
    contextdev: false,
    highlight: true
  },
  { feature: 'Multi-page crawling', microlink: false, contextdev: true },
  {
    feature: 'Monitors / change detection',
    microlink: false,
    contextdev: true
  },
  {
    feature: 'Batch jobs (up to 25,000 URLs)',
    microlink: false,
    contextdev: true
  },
  {
    feature: 'Company enrichment (NAICS/SIC, tickers, people)',
    microlink: false,
    contextdev: true
  },
  {
    feature: 'Transaction / merchant identification',
    microlink: false,
    contextdev: true
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
            Context.dev
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, contextdev, highlight, note }) => (
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
                <CellValue value={contextdev} />
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
      'Is there a Context.dev alternative that returns brand data in one request?',
    answer: (
      <>
        <div>
          Yes — that is how Microlink has always worked. The standard response
          for any URL already includes normalized{' '}
          <Link href='/metadata'>metadata</Link>: title, description, publisher,{' '}
          <Link href='/logo'>logo</Link>, brand image, and color palette. No
          dedicated brand endpoint, no 10-credit surcharge.
        </div>
        <div>
          Add markdown or a screenshot to the same request and it still costs
          one request. On Context.dev, that bundle is three endpoint calls
          billed at 1 + 10 + 5 = 16 credits per URL.
        </div>
      </>
    ),
    text: 'Yes — that is how Microlink has always worked. The standard response for any URL already includes normalized metadata: title, description, publisher, logo, brand image, and color palette. No dedicated brand endpoint, no 10-credit surcharge. Add markdown or a screenshot to the same request and it still costs one request. On Context.dev, that bundle is three endpoint calls billed at 1 + 10 + 5 = 16 credits per URL.'
  },
  {
    question: 'How does Microlink pricing compare to Context.dev credits?',
    answer: (
      <>
        <div>
          Context.dev prices a menu: markdown is 1 credit, a screenshot is 5,
          structured extraction is 10, Retrieve Brand is 10, fonts 5, styleguide
          10, people enrichment 20 — on plans from $25/month for 10,000 credits
          to $499/month for 1M, with 30–700 API calls/minute rate caps.
        </div>
        <div>
          Microlink prices requests: $49/month covers 46,000 of them, whatever
          each one returns, with no per-minute cap and cache hits free. The more
          endpoints you would touch per URL over there, the bigger the gap gets.
        </div>
      </>
    ),
    text: 'Context.dev prices a menu: markdown is 1 credit, a screenshot is 5, structured extraction is 10, Retrieve Brand is 10, fonts 5, styleguide 10, people enrichment 20 — on plans from $25/month for 10,000 credits to $499/month for 1M, with 30–700 API calls/minute rate caps. Microlink prices requests: $49/month covers 46,000 of them, whatever each one returns, with no per-minute cap and cache hits free. The more endpoints you would touch per URL over there, the bigger the gap gets.'
  },
  {
    question: 'Can Microlink extract logos and brand assets like Context.dev?',
    answer: (
      <>
        <div>
          Yes — brand data is Microlink's home turf. The metadata engine,{' '}
          <Link href='https://github.com/microlinkhq/metascraper'>
            Metascraper
          </Link>
          , has been extracting logos, brand images, and publisher data in the
          open for years, and the <Link href='/logo'>logo API</Link> adds
          detection with color palettes and sizing information.
        </div>
        <div>
          Need a hotlinkable asset? `embed=logo.url` turns the API URL into the
          logo itself — the response mimics the original resource's headers and
          body, so it drops straight into an image tag.
        </div>
      </>
    ),
    text: "Yes — brand data is Microlink's home turf. The metadata engine, Metascraper, has been extracting logos, brand images, and publisher data in the open for years, and the logo API adds detection with color palettes and sizing information. Need a hotlinkable asset? embed=logo.url turns the API URL into the logo itself — the response mimics the original resource's headers and body, so it drops straight into an image tag."
  },
  {
    question: 'Does Microlink return LLM-ready markdown like Context.dev?',
    answer: (
      <>
        <div>
          Yes. Any URL — a web page, a PDF, or a docx, xlsx, or pptx document —
          converts to clean markdown with about 80% fewer tokens than raw HTML.
          See the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            URL to markdown guide
          </Link>
          , or use the one-line shortcut endpoint markdown.microlink.io/
          {'{url}'}.
        </div>
        <div>
          <Link href='/docs/api/parameters/adblock'>Adblock</Link> ships enabled
          by default, so ads, trackers, and cookie banners are stripped before
          conversion.
        </div>
      </>
    ),
    text: 'Yes. Any URL — a web page, a PDF, or a docx, xlsx, or pptx document — converts to clean markdown with about 80% fewer tokens than raw HTML, via the API or the one-line shortcut endpoint markdown.microlink.io/{url}. Adblock ships enabled by default, so ads, trackers, and cookie banners are stripped before conversion.'
  },
  {
    question: 'Which Context.dev features does Microlink not cover?',
    answer: (
      <>
        <div>
          The company-data layer: NAICS and SIC classification, ticker and ISIN
          resolution, transaction and merchant-descriptor identification,
          email-to-company lookup, and people enrichment. Microlink extracts
          what a URL contains — it does not resolve corporate entities behind
          it.
        </div>
        <div>
          Multi-page crawling, page monitors, and 25,000-URL batch jobs are also
          Context.dev territory. If those are the core of your workload, it is a
          genuinely different product.
        </div>
      </>
    ),
    text: 'The company-data layer: NAICS and SIC classification, ticker and ISIN resolution, transaction and merchant-descriptor identification, email-to-company lookup, and people enrichment. Microlink extracts what a URL contains — it does not resolve corporate entities behind it. Multi-page crawling, page monitors, and 25,000-URL batch jobs are also Context.dev territory. If those are the core of your workload, it is a genuinely different product.'
  },
  {
    question: 'Do free credits expire on Context.dev and Microlink?',
    answer: (
      <>
        <div>
          Context.dev's free tier is one-time: 500 credits with a work email,
          250 with a consumer one — once spent, evaluation is over. Microlink's
          free tier renews: 25 requests every day, forever, with no credit card
          and no API key.
        </div>
        <div>
          Over a year that is more than 9,000 free requests — enough to keep a
          side project running on the free tier alone.
        </div>
      </>
    ),
    text: "Context.dev's free tier is one-time: 500 credits with a work email, 250 with a consumer one — once spent, evaluation is over. Microlink's free tier renews: 25 requests every day, forever, with no credit card and no API key. Over a year that is more than 9,000 free requests — enough to keep a side project running on the free tier alone."
  },
  {
    question: 'How do I migrate from Context.dev to Microlink?',
    answer: (
      <>
        <div>
          Both are GET APIs, so migration is mostly URL rewriting: drop the
          Bearer header (the free tier needs no key), swap
          `/web/scrape/markdown?url=` for `?url=` plus
          `data.markdown.attr=markdown`, and delete the separate brand and
          screenshot calls — metadata comes standard and `screenshot` is a
          parameter on the same request.
        </div>
        <div>
          Start from the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            markdown guide
          </Link>{' '}
          and the <Link href='/docs/guides/metadata'>metadata guide</Link>.
        </div>
      </>
    ),
    text: 'Both are GET APIs, so migration is mostly URL rewriting: drop the Bearer header (the free tier needs no key), swap /web/scrape/markdown?url= for ?url= plus data.markdown.attr=markdown, and delete the separate brand and screenshot calls — metadata comes standard and screenshot is a parameter on the same request.'
  },
  {
    question: 'Can I audit how Microlink extracts brand data?',
    answer: (
      <>
        <div>
          Yes — the extraction rules are public code. Metascraper (the metadata
          and brand engine), MQL, and Browserless are MIT licensed and developed
          in the open, used by thousands of projects beyond Microlink itself.
        </div>
        <div>
          Context.dev is a proprietary platform: its entity-resolution logic is
          a black box you can only observe from outside.
        </div>
      </>
    ),
    text: 'Yes — the extraction rules are public code. Metascraper (the metadata and brand engine), MQL, and Browserless are MIT licensed and developed in the open, used by thousands of projects beyond Microlink itself. Context.dev is a proprietary platform: its entity-resolution logic is a black box you can only observe from outside.'
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
        The <GradientText>Context.dev</GradientText> alternative
        <br />
        that answers in one request
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
        <b>Context.dev</b> prices every answer on a credit menu: markdown is 1,
        a screenshot is <b>5</b>, brand data is <b>10</b>. <b>Microlink</b>{' '}
        returns <b>metadata, logo, brand image, markdown, and screenshots</b>{' '}
        from a single flat-priced request — with a free tier that renews every
        day.
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
          href='/metadata'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'context-dev' })}
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
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'stretch'
        })}
      >
        <Box
          css={theme({ borderRadius: 3, flex: 1, minWidth: 0 })}
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
              minWidth: 0,
              height: '100%',
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
              1
              <Text
                as='span'
                css={theme({
                  fontSize: 2,
                  color: 'black50',
                  fontWeight: 'normal'
                })}
              >
                &nbsp;request
              </Text>
            </PriceAmount>
            <Text
              css={theme({
                fontSize: 1,
                color: 'black70',
                pt: 3,
                lineHeight: 2
              })}
            >
              Metadata + logo + brand image + palette, in the standard response
            </Text>
            <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
              Markdown and screenshot on the same request
            </Text>
            <Text
              css={theme({
                fontSize: 1,
                color: 'green7',
                fontWeight: 'bold',
                pt: 3
              })}
            >
              ✓ Everything included — no API key
            </Text>
          </PriceCard>
        </Box>

        <PriceCard css={theme({ bg: 'white', flex: 1, minWidth: 0 })}>
          <Badge
            css={{
              background: colors.gray1,
              color: colors.gray7,
              alignSelf: 'flex-start',
              marginBottom: '12px'
            }}
          >
            Context.dev
          </Badge>
          <PriceAmount>
            16
            <Text
              as='span'
              css={theme({
                fontSize: 2,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              &nbsp;credits
            </Text>
          </PriceAmount>
          <Text
            css={theme({ fontSize: 1, color: 'black70', pt: 3, lineHeight: 2 })}
          >
            Markdown 1 · screenshot +5 · Retrieve Brand +10
          </Text>
          <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
            Per URL, across three endpoint calls
          </Text>
          <Text css={theme({ fontSize: 1, color: 'black50', pt: 3 })}>
            Free credits are one-time — 500, or 250 with a consumer email
          </Text>
        </PriceCard>
      </Flex>

      <Text
        css={theme({
          fontSize: 1,
          color: 'black50',
          textAlign: 'center',
          fontFamily: 'mono'
        })}
      >
        No key, no signup — see the brand data for <b>context.dev</b> itself:
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
          href={LIVE_METADATA_URL}
          target='_blank'
          rel='noopener noreferrer'
        >
          {LIVE_METADATA_URL}
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
      py: 5
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
        One bundled request against a credit-metered endpoint menu.
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
    title: 'One request instead of a credit menu',
    description: (
      <>
        On Context.dev, each answer has a price tag: markdown 1 credit,
        screenshot <b>5</b>, extraction <b>10</b>, Retrieve Brand <b>10</b>,
        fonts 5, styleguide 10. Microlink returns{' '}
        <b>
          metadata, logo, brand image, markdown, and a screenshot from the same
          request
        </b>{' '}
        — one flat price, however much it carries.
      </>
    )
  },
  {
    number: '02',
    title: "Brand data is Microlink's home turf",
    description: (
      <>
        The metadata engine behind Microlink,{' '}
        <b>
          Metascraper, has been extracting logos, brand images, and publisher
          data in the open for years
        </b>{' '}
        — and the <Link href='/logo'>logo API</Link> adds detection with color
        palettes and sizing. Normalized brand fields are the default response,
        not a premium endpoint.
      </>
    )
  },
  {
    number: '03',
    title: 'A free tier that refills every day',
    description: (
      <>
        Context.dev hands you <b>500 one-time credits</b> — 250 if you sign up
        with a consumer email — and evaluation ends when they do. Microlink
        resets <b>25 free requests every day, forever</b>: no credit card, no
        API key, testable from the browser address bar.
      </>
    )
  },
  {
    number: '04',
    title: 'Screenshots without the 5-credit surcharge',
    description: (
      <>
        Microlink screenshots cost the same flat request price and come back as{' '}
        <b>CDN-hosted URLs</b> you can embed directly, with{' '}
        <b>
          browser-frame overlays, device presets, dark mode, and MP4/WebM
          recordings
        </b>{' '}
        as parameters. On Context.dev every screenshot bills 5 credits.
      </>
    )
  },
  {
    number: '05',
    title: 'No rate-limit ladders',
    description: (
      <>
        Context.dev meters <b>30 to 700 API calls per minute</b> depending on
        the plan you pay for. Microlink paid plans have{' '}
        <b>no per-minute cap and no concurrency limit*</b> — your monthly quota
        spends at whatever rate your pipeline needs.
      </>
    )
  },
  {
    number: '06',
    title: 'An open engine you can audit',
    description: (
      <>
        Context.dev's entity resolution is proprietary. Microlink's extraction
        stack — <b>Metascraper, MQL, Browserless</b> — is <b>MIT licensed</b>{' '}
        and developed in public: read the rules that produce your brand data,
        fork them, or run them yourself.
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
        The top reasons teams pick Microlink over Context.dev for URL data.
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
 * Where Context.dev Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: 'You need company enrichment, not just page data',
    description:
      'NAICS and SIC classification, ticker and ISIN resolution, transaction and merchant-descriptor identification, email-to-company lookup, and people enrichment make Context.dev a real company-data platform. Microlink extracts what a URL contains — it does not resolve corporate entities.'
  },
  {
    title: 'Resolved brand entities across the web',
    description:
      'Context.dev positions its brand data as canonical entities resolved across sources, not a single-page extraction. If your product needs the one true logo and identity for a company rather than what a given URL declares, that resolver is the point.'
  },
  {
    title: 'Crawling, monitors, and batch jobs',
    description:
      'Multi-page crawls, page and sitemap monitors with signed webhooks, and batch jobs up to 25,000 URLs cover pipeline shapes Microlink does not — Microlink converts one URL per call and leaves the queue to you.'
  },
  {
    title: 'Cheaper per plain page at high volume',
    description:
      'The Pro plan works out to about $0.75 per 1,000 markdown pages versus roughly $1.07 on Microlink. If your workload is pure single-endpoint scraping at scale and nothing else, Context.dev can be the cheaper line item.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='context-dev-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead css={theme({ pb: [4, 4, 5, 5], pt: 3 })} titleize={false}>
        Where <GradientText>Context.dev</GradientText>
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
 * Context.dev pricing: https://www.context.dev/pricing
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const CREDIT_MENU_ROWS = [
  {
    scenario: 'Context.dev — markdown only',
    detail: '46,000 pages × 1 credit — needs the Pro plan (200K credits)',
    bill: '$149/mo'
  },
  {
    scenario: 'Context.dev — markdown + screenshot + brand per URL',
    detail: '46,000 × (1 + 5 + 10) = 736,000 credits — into the Scale tier',
    bill: '≈ $499/mo'
  },
  {
    scenario: 'Microlink — all three in one request',
    detail: '46,000 requests, flat price, no menu*',
    bill: '$49/mo',
    highlight: true
  }
]

const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead css={theme({ pb: [2, 2, 3, 3], pt: 3 })} titleize={false}>
        One request price. <br />
        <GradientText>No endpoint menu.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        On Context.dev the question isn't how many URLs — it's{' '}
        <b>how many endpoints you touch per URL</b>. On Microlink, one request
        carries everything.
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
                'One request can return markdown, metadata, logo, and screenshot together',
                'Brand fields — logo, image, palette — in the standard response',
                'Residential proxy and antibot detection included on Pro',
                "TTL caching up to 31 days — cache hits don't spend your quota",
                'No concurrency limit* and no per-minute cap',
                'Free: 25 requests/day, renews forever, no credit card, no key',
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
                href='/metadata'
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
            Context.dev
          </Badge>
          <PriceAmount>
            $25
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
            10,000&nbsp;credits/month (Developer)
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              '1 credit per markdown page · screenshots 5 · Extract 10',
              'Retrieve Brand 10 · Fonts 5 · Styleguide 10 · Enrich People 20',
              'Rate limit: 60 API calls/minute on this tier',
              'Overage: $15 per 10K credits',
              'Free: 500 one-time credits (250 with a consumer email)'
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
          The credit menu: what a full brand snapshot really costs
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
          Ask for markdown, a screenshot, and brand data on the same URL and
          Context.dev bills <b>16 credits across three endpoint calls</b>.
          Microlink answers all three in one.
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
              {CREDIT_MENU_ROWS.map(({ scenario, detail, bill, highlight }) => (
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
        Estimates use Context.dev's published credit rates. Light,
        single-endpoint workloads fit its $25 Developer plan well — the gap
        opens when each URL needs more than one answer, since Microlink bundles
        them into the same flat-priced request.
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
        Get the whole answer in one request
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
        renewed daily, no credit card, no API key.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <ArrowLink
          href='/metadata'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'context-dev' })}
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
          Ship the <span css='color: #fa5252;'>whole</span> answer
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
          25&nbsp;requests/day free — no account, no credit card. Metadata,
          logo, and brand image from any&nbsp;URL.
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
              url: 'https://stripe.com',
              meta: true
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
            href='/docs/guides/metadata'
            onClick={() =>
              trackEvent('alternative cta', { competitor: 'context-dev' })}
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
    title='Context.dev Alternative: Brand & Web Data in One Request'
    description='Context.dev bills a credit menu — 10 for brand data, 5 for screenshots, 10 for extraction. Microlink returns metadata, logo, palette, markdown, and screenshots in one flat-priced request, with a free tier that renews daily.'
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Context.dev Alternative: Brand & Web Data in One Request',
        description:
          'Compare Microlink and Context.dev for brand and web data. Microlink returns metadata, logo, brand image, color palette, markdown, and screenshots from a single flat-priced request — no credit menu, no API key on the free tier, and an MIT-licensed extraction engine.',
        url: 'https://microlink.io/alternative/context-dev',
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

const ContextDevPage = () => (
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

export default ContextDevPage
