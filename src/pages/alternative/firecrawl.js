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

const LIVE_MARKDOWN_URL = 'https://markdown.microlink.io/www.firecrawl.dev'

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
  { feature: 'URL to LLM-ready markdown', microlink: true, firecrawl: true },
  { feature: 'Metadata extraction', microlink: true, firecrawl: true },
  { feature: 'Screenshot capture', microlink: true, firecrawl: true },
  { feature: 'Full-page screenshots', microlink: true, firecrawl: true },
  {
    feature: 'PDF parsing (PDF → markdown)',
    microlink: true,
    firecrawl: true,
    note: 'Microlink also converts docx, xlsx, and pptx documents with the same request.'
  },
  {
    feature: 'Structured data extraction',
    microlink: true,
    firecrawl: true,
    note: 'Firecrawl uses AI prompts or JSON Schema; Microlink uses MQL CSS-selector rules at the flat request price.'
  },
  {
    feature: 'Browser automation (click / scroll / wait)',
    microlink: true,
    firecrawl: true
  },
  { feature: 'Custom HTTP headers', microlink: true, firecrawl: true },
  {
    feature: 'Response caching (TTL)',
    microlink: true,
    firecrawl: true,
    note: 'Microlink cache hits are free and do not count against your plan.'
  },
  {
    feature: 'Residential / stealth proxy',
    microlink: true,
    firecrawl: true,
    highlight: true,
    note: 'Firecrawl enhanced proxy bills 5 credits per request; Microlink Pro includes it at the flat request price.'
  },
  { feature: 'MCP server', microlink: true, firecrawl: true },
  { feature: 'CLI', microlink: true, firecrawl: true },
  {
    feature: 'Open-source core',
    microlink: true,
    firecrawl: true,
    note: 'Firecrawl is AGPL-3.0 (copyleft); Microlink components are MIT licensed.'
  },
  {
    feature: 'Flat pricing (no credit multipliers)',
    microlink: true,
    firecrawl: false,
    highlight: true,
    note: 'Firecrawl: search 2 credits per 10 results, browser interaction 2 per minute, enhanced proxy 5 per request.'
  },
  {
    feature: 'Free tier that renews daily',
    microlink: true,
    firecrawl: false,
    highlight: true,
    note: 'Firecrawl free plan is 1,000 one-time credits; Microlink resets 25 free requests every day.'
  },
  {
    feature: 'No concurrency limit*',
    microlink: true,
    firecrawl: false,
    note: 'Firecrawl caps concurrency per plan: 2 free, 50 Standard, 150 Scale.'
  },
  {
    feature: 'PDF generation (URL → PDF)',
    microlink: true,
    firecrawl: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK (React/Vue/JS)',
    microlink: true,
    firecrawl: false
  },
  { feature: 'Browser chrome overlay', microlink: true, firecrawl: false },
  {
    feature: 'Animated capture (MP4/WebM)',
    microlink: true,
    firecrawl: false
  },
  { feature: 'Dark/light mode capture', microlink: true, firecrawl: false },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    firecrawl: false
  },
  {
    feature: 'Self-hostable platform',
    microlink: 'partial',
    firecrawl: true,
    note: 'The MIT components (Browserless, Metascraper, MQL) can be self-hosted; the hosted API is managed.'
  },
  {
    feature: 'Web search endpoint',
    microlink: true,
    firecrawl: true,
    note: 'Microlink Search is a paid workflow from the first request; results expose lazy .markdown() content expansion.'
  },
  {
    feature: 'One-line GET endpoint (markdown.microlink.io/{url})',
    microlink: true,
    firecrawl: false
  },
  { feature: 'Multi-page crawling', microlink: false, firecrawl: true },
  { feature: 'Site mapping', microlink: false, firecrawl: true },
  {
    feature: 'Change monitoring & alerts',
    microlink: false,
    firecrawl: true
  },
  {
    feature: 'AI-prompt extraction (natural language)',
    microlink: false,
    firecrawl: true
  },
  { feature: 'Async jobs + webhooks', microlink: false, firecrawl: true }
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
            Firecrawl
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, firecrawl, highlight, note }) => (
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
                <CellValue value={firecrawl} />
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
    question: 'Is there a Firecrawl alternative with flat per-request pricing?',
    answer: (
      <>
        <div>
          Yes — Microlink charges one flat price per request, whatever the
          request does. Firecrawl bills in credits that multiply: a basic scrape
          is 1 credit, the enhanced (stealth) proxy is 5, search costs 2 per 10
          results, and browser interaction costs 2 per minute.
        </div>
        <div>
          On Microlink, routing through the{' '}
          <Link href='/features/proxy'>residential proxy</Link>, extracting
          metadata, or returning markdown never changes what a request costs.
          Cache hits are free on top.
        </div>
      </>
    ),
    text: 'Yes — Microlink charges one flat price per request, whatever the request does. Firecrawl bills in credits that multiply: a basic scrape is 1 credit, the enhanced (stealth) proxy is 5, search costs 2 per 10 results, and browser interaction costs 2 per minute. On Microlink, routing through the residential proxy, extracting metadata, or returning markdown never changes what a request costs. Cache hits are free on top.'
  },
  {
    question: "How much does Firecrawl's stealth proxy actually cost at scale?",
    answer: (
      <>
        <div>
          Five credits per request instead of one, per Firecrawl's own proxy
          docs — and <b>auto</b> mode escalates to it whenever the basic attempt
          fails. If 30% of 46,000 monthly pages sit behind bot walls, that is
          32,200 + (13,800 × 5) = 101,200 credits — past the 100,000-credit
          Standard plan and into the $333 Growth tier.
        </div>
        <div>
          Microlink Pro includes residential proxy routing and{' '}
          <Link href='/features/antibot'>antibot detection</Link> at the flat
          request price, so the protected-page ratio never changes your bill.
        </div>
      </>
    ),
    text: "Five credits per request instead of one, per Firecrawl's own proxy docs — and auto mode escalates to it whenever the basic attempt fails. If 30% of 46,000 monthly pages sit behind bot walls, that is 32,200 + (13,800 × 5) = 101,200 credits — past the 100,000-credit Standard plan and into the $333 Growth tier. Microlink Pro includes residential proxy routing and antibot detection at the flat request price, so the protected-page ratio never changes your bill."
  },
  {
    question: 'Does Microlink return LLM-ready markdown like Firecrawl?',
    answer: (
      <>
        <div>
          Yes. One GET request returns any URL as clean markdown — see the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            URL to markdown guide
          </Link>
          . Because <Link href='/docs/api/parameters/adblock'>adblock</Link>{' '}
          ships enabled by default, ads, trackers, and cookie banners are
          stripped before conversion, so the markdown arrives free of consent
          noise.
        </div>
        <div>
          The token math matters for LLM workloads: a typical page that costs
          20,000 HTML tokens becomes about 4,000 markdown tokens — roughly 80%
          fewer tokens per page.
        </div>
      </>
    ),
    text: 'Yes. One GET request returns any URL as clean markdown. Because adblock ships enabled by default, ads, trackers, and cookie banners are stripped before conversion, so the markdown arrives free of consent noise. The token math matters for LLM workloads: a typical page that costs 20,000 HTML tokens becomes about 4,000 markdown tokens — roughly 80% fewer tokens per page.'
  },
  {
    question: 'Can Microlink convert PDFs and office documents like Firecrawl?',
    answer: (
      <>
        <div>
          Yes. Point the same request at a web page, a PDF, or a docx, xlsx, or
          pptx file — Microlink converts the document to an HTML DOM at fetch
          time, so the identical markdown request works across all of them. A
          YouTube URL even returns the video's caption transcript as the
          markdown body.
        </div>
        <div>
          Firecrawl parses web-hosted and local PDFs too; the difference is that
          on Microlink the document case needs no separate endpoint or parameter
          — it is the same GET request.
        </div>
      </>
    ),
    text: "Yes. Point the same request at a web page, a PDF, or a docx, xlsx, or pptx file — Microlink converts the document to an HTML DOM at fetch time, so the identical markdown request works across all of them. A YouTube URL even returns the video's caption transcript as the markdown body. Firecrawl parses web-hosted and local PDFs too; the difference is that on Microlink the document case needs no separate endpoint or parameter — it is the same GET request."
  },
  {
    question: 'What about crawling, search, and monitoring?',
    answer: (
      <>
        <div>
          Crawling and monitoring are genuinely Firecrawl's territory: Microlink
          converts one URL per call and does not watch pages for changes — you
          own the queue and the diffing.
        </div>
        <div>
          Search is covered: <Link href='/search'>Microlink Search</Link> is a
          Google SERP API for AI agents returning normalized JSON across 10
          surfaces, where every result exposes a lazy <b>.markdown()</b> helper
          to expand top matches into LLM-ready content. It is a paid workflow
          from the first request, since public-result collection runs on managed
          proxy capacity.
        </div>
      </>
    ),
    text: "Crawling and monitoring are genuinely Firecrawl's territory: Microlink converts one URL per call and does not watch pages for changes — you own the queue and the diffing. Search is covered: Microlink Search is a Google SERP API for AI agents returning normalized JSON across 10 surfaces, where every result exposes a lazy .markdown() helper to expand top matches into LLM-ready content. It is a paid workflow from the first request, since public-result collection runs on managed proxy capacity."
  },
  {
    question: 'How do the open-source licenses compare (MIT vs AGPL)?',
    answer: (
      <>
        <div>
          Both companies develop in the open, with different licenses.
          Firecrawl's core is AGPL-3.0 — a copyleft license that requires
          publishing your modifications if you serve the software to users.
        </div>
        <div>
          Microlink's core libraries — Browserless, Metascraper, and MQL — are
          MIT licensed: read, fork, embed, or self-host them with no copyleft
          obligations.
        </div>
      </>
    ),
    text: "Both companies develop in the open, with different licenses. Firecrawl's core is AGPL-3.0 — a copyleft license that requires publishing your modifications if you serve the software to users. Microlink's core libraries — Browserless, Metascraper, and MQL — are MIT licensed: read, fork, embed, or self-host them with no copyleft obligations."
  },
  {
    question: "How do I migrate from Firecrawl's scrape endpoint to Microlink?",
    answer: (
      <>
        <div>
          Swap the authenticated POST for a plain GET. Firecrawl's{' '}
          <b>formats: ["markdown"]</b> becomes{' '}
          <b>data.markdown.attr=markdown</b> (add <b>embed=markdown</b> to
          receive raw markdown instead of JSON), and the metadata Firecrawl
          returns alongside the content is included in Microlink's standard
          response by default.
        </div>
        <div>
          Screenshots, headers, and browser automation map to query parameters
          too — start from the{' '}
          <Link href='/docs/guides/content-conversion/url-to-markdown'>
            markdown guide
          </Link>{' '}
          and adapt one request at a time.
        </div>
      </>
    ),
    text: "Swap the authenticated POST for a plain GET. Firecrawl's formats: [markdown] becomes data.markdown.attr=markdown (add embed=markdown to receive raw markdown instead of JSON), and the metadata Firecrawl returns alongside the content is included in Microlink's standard response by default. Screenshots, headers, and browser automation map to query parameters too."
  },
  {
    question: 'How do the free tiers compare?',
    answer: (
      <>
        <div>
          Firecrawl's free plan is 1,000 one-time credits with 2 concurrent
          requests — once spent, it is gone. Microlink gives you 25 free
          requests per day, every day, with no credit card and no expiry — over
          9,000 requests per year for evaluating in real conditions.
        </div>
        <div>
          Microlink's free tier also needs no API key at all: paste the URL in a
          browser address bar and the response comes back.
        </div>
      </>
    ),
    text: "Firecrawl's free plan is 1,000 one-time credits with 2 concurrent requests — once spent, it is gone. Microlink gives you 25 free requests per day, every day, with no credit card and no expiry — over 9,000 requests per year for evaluating in real conditions. Microlink's free tier also needs no API key at all: paste the URL in a browser address bar and the response comes back."
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
        The <GradientText>Firecrawl</GradientText> alternative
        <br />
        without the credit math
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
        <b>Firecrawl</b> bills in credits that multiply — <b>5×</b> for the
        stealth proxy, spent even when the target page errors, gone if unused.{' '}
        <b>Microlink</b> turns URLs into{' '}
        <b>LLM-ready markdown, metadata, and screenshots</b> at one flat request
        price, <b>residential proxy included</b>.
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
          href='/markdown'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'firecrawl' })}
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
              Markdown + metadata + logo + screenshot, from the same call
            </Text>
            <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
              Residential proxy included · cache hits free
            </Text>
            <Text
              css={theme({
                fontSize: 1,
                color: 'green7',
                fontWeight: 'bold',
                pt: 3
              })}
            >
              ✓ Flat — always the same price
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
            Firecrawl
          </Badge>
          <PriceAmount>
            1–5
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
            1 basic · 5 with the stealth proxy
          </Text>
          <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
            +2 credits per browser-minute of interaction
          </Text>
          <Text css={theme({ fontSize: 1, color: 'black50', pt: 3 })}>
            Depends on the page — unused credits expire monthly
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
        No key, no signup — try that one request right now on{' '}
        <b>firecrawl.dev</b> itself:
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
          href={LIVE_MARKDOWN_URL}
          target='_blank'
          rel='noopener noreferrer'
        >
          {LIVE_MARKDOWN_URL}
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
        A flat-priced data API and a credit-billed scraping platform, side by
        side.
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
    title: 'Every request costs exactly one request',
    description: (
      <>
        Firecrawl's credit menu multiplies: <b>5 credits</b> for the stealth
        proxy, 2 per 10 search results, 2 per browser-minute — and a successful
        fetch bills <b>even when the page itself errors</b>, while unused
        credits expire monthly. On Microlink, a request is a request: one flat
        price, whatever it returns.
      </>
    )
  },
  {
    number: '02',
    title: 'The proxy is included, not a 5× surcharge',
    description: (
      <>
        When a target blocks datacenter traffic, Microlink Pro reroutes through{' '}
        <Link href='/features/proxy'>auto-rotating residential IPs</Link> with{' '}
        <Link href='/features/antibot'>antibot detection</Link> for 30+
        providers — at the same flat request price. The share of protected pages
        in your workload never changes your bill.
      </>
    )
  },
  {
    number: '03',
    title: 'A free tier that refills every day',
    description: (
      <>
        Firecrawl's free plan is <b>1,000 one-time credits</b> — spend them and
        it's over. Microlink resets <b>25 free requests every day, forever</b>:
        over 9,000 requests a year, no credit card, no API key, testable from
        the browser address bar.
      </>
    )
  },
  {
    number: '04',
    title: 'Markdown from pages, PDFs, and office files',
    description: (
      <>
        The same GET request converts a web page, a <b>PDF</b>, or a{' '}
        <b>docx, xlsx, or pptx</b> document into clean markdown — about{' '}
        <b>80% fewer tokens</b> than raw HTML — with{' '}
        <Link href='/docs/api/parameters/adblock'>adblock</Link> stripping ads,
        trackers, and cookie banners before conversion by default.
      </>
    )
  },
  {
    number: '05',
    title: 'Caching that pays you back',
    description: (
      <>
        Microlink caches responses with a <b>TTL of up to 31 days</b> on paid
        plans, and <b>cache hits don't spend your quota</b>. Firecrawl credits
        work the other way around: they don't roll over — capacity you paid for
        disappears at the end of the month.
      </>
    )
  },
  {
    number: '06',
    title: 'MIT-licensed core, no copyleft strings',
    description: (
      <>
        Firecrawl's core is <b>AGPL-3.0</b> — copyleft that requires publishing
        your modifications if you serve it to users. Microlink's engine —
        Browserless, Metascraper, MQL — is <b>MIT licensed</b>: embed it, fork
        it, or self-host it with no obligations.
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
        The top reasons teams pick Microlink over Firecrawl for per-URL
        workloads.
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
 * Where Firecrawl Might Be Right
 * --------------------------------------------------------------------------- */

const HONESTY_ITEMS = [
  {
    title: 'You need discovery, not just extraction',
    description:
      'Firecrawl bundles search-and-scrape in one call, crawls whole sites, and maps URL structures. Microlink assumes you already know which URLs you need — if discovery is part of the job, Firecrawl covers it natively.'
  },
  {
    title: 'Change monitoring with alerts',
    description:
      'The monitor endpoint watches pages for changes with webhook and email alerts, plus AI-powered goal filtering. Microlink has no monitoring capability — you would schedule and diff captures yourself.'
  },
  {
    title: 'Natural-language extraction',
    description:
      'Firecrawl extracts structured data from a plain-English prompt or a JSON Schema. Microlink MQL is CSS-selector based — precise and deterministic, but you write the selectors.'
  },
  {
    title: 'Self-hosting the whole platform',
    description:
      'Firecrawl is AGPL-3.0 and self-hostable as a complete product. Microlink open-sources its MIT core libraries, but the hosted API itself is a managed service.'
  },
  {
    title: 'A large agent ecosystem',
    description:
      'SDKs for Python, Node.js, Go, Rust, and Java, a first-class CLI, an agent-onboarding flow, and a widely adopted MCP server make Firecrawl a familiar default in AI tooling stacks.'
  }
]

const HonestySection = () => (
  <Section
    as='section'
    id='firecrawl-strengths'
    css={theme({ bg: 'gray0', px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead css={theme({ pb: [4, 4, 5, 5], pt: 3 })} titleize={false}>
        Where <GradientText>Firecrawl</GradientText>
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
 * Firecrawl pricing: https://www.firecrawl.dev/pricing
 * Firecrawl proxy credits: https://docs.firecrawl.dev/features/stealth-mode
 * Microlink comparison tier: .cursor/skills/alternative-landing/references/microlink-features.md
 */
const CREDIT_MATH_ROWS = [
  {
    scenario: 'Firecrawl — every page is easy',
    detail: '46,000 pages × 1 credit fits the 100,000-credit Standard plan',
    bill: '$83/mo'
  },
  {
    scenario: 'Firecrawl — 30% behind bot walls',
    detail:
      '32,200 × 1 + 13,800 × 5 = 101,200 credits — past Standard, into the Growth tier',
    bill: '≈ $333/mo'
  },
  {
    scenario: 'Microlink — any mix',
    detail: '46,000 requests with the residential proxy included*',
    bill: '$49/mo',
    highlight: true
  }
]

const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead css={theme({ pb: [2, 2, 3, 3], pt: 3 })} titleize={false}>
        One request price. <br />
        <GradientText>No credit multipliers.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Microlink bills <b>requests</b>. Firecrawl bills <b>credits</b> — and
        the multipliers decide what a credit is worth.
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
                'Adblock and cookie-banner removal on by default',
                'Residential proxy and antibot detection included — no 5× multiplier',
                "TTL caching up to 31 days — cache hits don't spend your quota",
                'No concurrency limit* and no per-minute cap',
                'Free: 25 requests/day, renews forever, no credit card',
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
                href='/markdown'
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
            Firecrawl
          </Badge>
          <PriceAmount>
            $83
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
            100,000&nbsp;credits/month (Standard)
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              '1 credit per basic scrape page; stealth proxy pages cost 5',
              'Search: 2 credits per 10 results · Interact: 2 per browser-minute',
              '50 concurrent requests on this tier',
              "Credits don't roll over; successful fetches bill even if the page errors",
              'Free plan: 1,000 one-time credits'
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
          The credit math: same 46,000 pages, very different bills
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
          Firecrawl's default <b>auto</b> proxy escalates to enhanced when the
          basic attempt fails — and enhanced bills <b>5 credits</b>. The mix of
          protected pages, not your volume, decides the bill.
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
              {CREDIT_MATH_ROWS.map(({ scenario, detail, bill, highlight }) => (
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
        Estimates use Firecrawl's published credit rates. Light, unprotected
        workloads fit Firecrawl's cheaper tiers well — the gap opens when
        stealth pages, search calls, and browser minutes start multiplying, or
        when unused credits expire while Microlink cache hits stay free.
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
        Ship markdown, not credit spreadsheets
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
          href='/markdown'
          onClick={() =>
            trackEvent('alternative cta', { competitor: 'firecrawl' })}
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
          Ship <span css='color: #fa5252;'>lighter</span> markdown
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
          25&nbsp;requests/day free — no account, no credit card. 20,000 HTML
          tokens in, 4,000 markdown tokens&nbsp;out.
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
              url: 'https://github.com/trending',
              data: {
                markdown: {
                  attr: 'markdown'
                }
              },
              embed: 'markdown'
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
            href='/docs/guides/content-conversion/url-to-markdown'
            onClick={() =>
              trackEvent('alternative cta', { competitor: 'firecrawl' })}
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
    title='Firecrawl Alternative: LLM-Ready Markdown, No Credit Math'
    description='Firecrawl credits multiply — 5× for the stealth proxy, spent even on error pages, gone monthly. Microlink converts URLs, PDFs, and docs into markdown, metadata, and screenshots at a flat per-request price, proxy included.'
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Firecrawl Alternative: LLM-Ready Markdown, No Credit Math',
        description:
          'Compare Microlink and Firecrawl for LLM-ready web data. Microlink converts URLs, PDFs, and office documents into markdown, metadata, and screenshots at a flat per-request price, with the residential proxy included and a free tier that renews daily.',
        url: 'https://microlink.io/alternative/firecrawl',
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

const FirecrawlPage = () => (
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

export default FirecrawlPage
