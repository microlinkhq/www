import { breakpoints, colors, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { CodeInline } from 'components/markdown/CodeInline'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'

import { withTitle } from 'helpers/hoc/with-title'
import { cdnUrl } from 'helpers/cdn-url'

const Caption = withTitle(CaptionBase)

/* ─── Layout primitives ──────────────────────────────────────────────────── */

const SECTION_PX = [3, 3, 4, 4]
const SECTION_PY = [3, 3, 4, 5]
const SECTION_MAX_WIDTH = layout.large

const Section = styled(Box)`
  ${theme({
    py: SECTION_PY,
    px: SECTION_PX,
    width: '100%'
  })}
`

const SectionInner = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: SECTION_MAX_WIDTH,
    mx: 'auto'
  })}
`

const Eyebrow = styled(Text)`
  ${theme({
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

const BodyText = props => (
  <Caption
    forwardedAs='p'
    titleize={false}
    {...props}
    css={[
      theme({
        fontSize: [1, 2, 2, 2],
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black'
      }),
      props.css
    ]}
  />
)

const ProTag = styled(Box)`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: 'pinkest',
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    textTransform: 'uppercase'
  })}
`

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const DashedGridOverlay = styled(Box)`
  ${theme({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 })}
  height: 1200px;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
`

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <ProTag>Pro feature</ProTag>
      </Flex>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0
        })}
      >
        <span css={theme({ color: 'secondary' })}>Cache TTL:</span> A
        configurable cache, served from the edge
      </Text>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: 'left',
          maxWidth: layout.large,
          mx: 0
        })}
      >
        Don't pay to re-render the same <strong>screenshot</strong> or{' '}
        <strong>PDF</strong> twice. Every cache <CodeInline>HIT</CodeInline> is
        free — across every Microlink output. Use <CodeInline>ttl</CodeInline>{' '}
        to set the freshness window and <CodeInline>staleTtl</CodeInline> to
        keep callers instant during the background refresh.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Cache your way to a smaller bill
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: 0, pb: [4, 4, 5, 5] })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
        Cache hits are free
      </Eyebrow>
      <BodyText>
        One paid <CodeInline>MISS</CodeInline> warms the cache; every{' '}
        <CodeInline>HIT</CodeInline> until <CodeInline>ttl</CodeInline> expires
        is free — including expensive screenshot and PDF renders.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Two caches behind it: a <strong>unified cache</strong> (
        <CodeInline>x-cache-status</CodeInline>) holds the shared copy per URL;
        a <strong>CloudFlare edge cache</strong> (
        <CodeInline>cf-cache-status</CodeInline>) serves it from the nearest of{' '}
        <Link href='/blog/edge-cdn'>240+ edge nodes</Link>. Cold regions
        auto-populate from the unified layer.
      </BodyText>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        <CodeInline>ttl</CodeInline> sets the cache window.{' '}
        <CodeInline>staleTtl</CodeInline> enables stale-while-revalidate —
        callers always hit cache while refreshes happen in the background. No
        Redis, no cron jobs.
      </BodyText>
    </SectionInner>
  </Section>
)

/* ─── Three-in-one cards ─────────────────────────────────────────────────── */

const ProviderChip = styled(Text).attrs({ as: 'span' })`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: 'white',
    color: 'black',
    border: 1,
    borderColor: 'black10',
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: 1
  })}
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: [3, 3, 4, 4],
    alignItems: 'stretch'
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardSide = styled(Box)`
  ${theme({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  })}
`

const CardMain = styled(Box)`
  ${theme({
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
`

const CardTitle = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1
  })}
`

const CardKicker = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'secondary',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  })}
`

const CardBody = styled(Text)`
  ${theme({
    fontSize: [1, 1, 1, 1],
    lineHeight: 2,
    color: 'black70'
  })}
`

const ChipRow = ({ items }) => (
  <Flex css={theme({ flexWrap: 'wrap', gap: 2, py: 3 })}>
    {items.map(item => (
      <ProviderChip key={item}>{item}</ProviderChip>
    ))}
  </Flex>
)

const TTL_VALUES = ['min (1m)', '1h', '6h', '1d', '7d', '14d', 'max (31d)']

const STALE_PATTERNS = [
  'staleTtl: 0',
  "staleTtl: '12h'",
  "staleTtl: '1d'",
  'staleTtl: false'
]

const CACHE_HEADERS = [
  'x-cache-status',
  'x-cache-ttl',
  'cf-cache-status',
  'x-response-time'
]

const TwoInOne = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Two parameters → every cache trade-off
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Pay once. Serve millions of cache hits for free.
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          A request cache, an invalidation policy, and a background revalidator
          are the three pieces every team rebuilds on top of an external API.
          Pro folds them into the response layer — and{' '}
          <strong>cache hits never count against your plan quota</strong>, so
          the better your cache strategy, the less you pay per served request.{' '}
          <CodeInline>ttl</CodeInline> tunes lifetime,{' '}
          <CodeInline>staleTtl</CodeInline> covers cold starts, and the response
          headers expose enough observability to keep your cache hit rate
          honest.
        </BodyText>
      </Box>

      <Flex
        css={theme({
          gap: 3,
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <Card>
          <CardSide>
            <CardKicker>01 · ttl</CardKicker>
            <CardTitle>Tune cache lifetime per request</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              The <CodeInline>ttl</CodeInline> parameter sets the maximum time a
              response is considered valid before expiring — from{' '}
              <strong>1 minute</strong> to <strong>31 days</strong>. Pass it as
              a number in milliseconds (<CodeInline>86400000</CodeInline>) or as
              a humanized string (<CodeInline>'1d'</CodeInline>,{' '}
              <CodeInline>'90s'</CodeInline>, <CodeInline>'1hour'</CodeInline>).
              The aliases <CodeInline>'min'</CodeInline> and{' '}
              <CodeInline>'max'</CodeInline> snap to the boundaries.
            </CardBody>
            <ChipRow items={TTL_VALUES} />
            <CardBody>
              <strong>Longer TTL = lower bill.</strong> Each paid{' '}
              <CodeInline>MISS</CodeInline> buys you free hits for the entire
              cache window. Short TTLs for dashboards and feeds, longer TTLs for
              marketing pages and docs, and <CodeInline>'max'</CodeInline> for
              content that essentially never changes. The effective lifetime
              always echoes back as <CodeInline>x-cache-ttl</CodeInline>.
            </CardBody>
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/ttl'
                css={theme({
                  color: 'secondary',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the ttl reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · staleTtl</CardKicker>
            <CardTitle>Cold starts, eliminated</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              <CodeInline>staleTtl</CodeInline> opts into{' '}
              <strong>stale-while-revalidate</strong>: when a cached entry
              passes its stale window, the next request still gets served from
              cache instantly while a background refresh regenerates a fresh
              copy. Your callers never wait on the origin again.
            </CardBody>
            <ChipRow items={STALE_PATTERNS} />
            <CardBody>
              The recommended production pattern is{' '}
              <CodeInline>{"{ ttl: '1d', staleTtl: 0 }"}</CodeInline> — every
              caller is served from cache (free), and one background refresh per
              cache window keeps the entry current (the only billed request).
              The <CodeInline>staleTtl</CodeInline> value cannot exceed{' '}
              <CodeInline>ttl</CodeInline>.
            </CardBody>
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/api/parameters/staleTtl'
                css={theme({
                  color: 'secondary',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the staleTtl reference
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · Headers</CardKicker>
            <CardTitle>Observability, included</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Every response carries the headers you need to track cache
              behavior and tune it over time. No probing, no guesswork —
              <CodeInline>x-cache-status</CodeInline> tells you whether the
              response was a <CodeInline>HIT</CodeInline>,{' '}
              <CodeInline>MISS</CodeInline>, or <CodeInline>BYPASS</CodeInline>;
              the rest tell you why.
            </CardBody>
            <ChipRow items={CACHE_HEADERS} />
            <CardBody>
              Combine <CodeInline>x-cache-status</CodeInline> with{' '}
              <CodeInline>x-response-time</CodeInline> in your APM and you get a
              real-time read on cache hit rate and p95 latency — enough to know
              when a TTL needs to grow, shrink, or pivot to{' '}
              <CodeInline>staleTtl</CodeInline>.
            </CardBody>
            <Box css={theme({ mt: 'auto' })}>
              <ArrowLink
                href='/docs/guides/common/caching'
                css={theme({
                  color: 'secondary',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 1, 1]
                })}
              >
                Read the caching guide
              </ArrowLink>
            </Box>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Visual: request flow + response inspector ──────────────────────────── */

const Node = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    px: [3, 3, 3, 3],
    py: [3, 3, 3, 3],
    width: ['100%', '100%', 'auto', 'auto'],
    minWidth: [0, 0, '0', '0'],
    flex: ['0 0 auto', '0 0 auto', '1 1 0', '1 1 0']
  })}
  box-shadow: 0 1px 2px ${colors.black05};
  text-align: center;
`

const NodeActive = styled(Node)`
  ${theme({
    bg: 'pinkest',
    borderColor: 'secondary'
  })}
`

const NodeLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const NodeSub = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black60',
    pt: 1
  })}
`

const Arrow = () => (
  <Flex
    aria-hidden='true'
    css={`
      ${theme({
        color: 'black30',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center'
      })}
      @media (max-width: calc(${breakpoints[1]} - 1px)) {
        transform: rotate(90deg);
      }
    `}
  >
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  </Flex>
)

const ResponseCard = styled(Box)`
  ${theme({
    bg: 'black',
    color: 'white',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2
  })}
  white-space: pre;
  overflow-x: auto;
`

const ResponseLine = ({ children, highlight, comment }) => (
  <Flex css={theme({ gap: 3, alignItems: 'baseline', whiteSpace: 'nowrap' })}>
    <Text
      as='span'
      css={theme({
        color: highlight ? 'pink3' : 'white',
        fontFamily: 'mono',
        fontSize: 0
      })}
    >
      {children}
    </Text>
    {comment && (
      <Text
        as='span'
        css={theme({
          color: 'white60',
          fontFamily: 'mono',
          fontSize: 0
        })}
      >
        ← {comment}
      </Text>
    )}
  </Flex>
)

const ScenarioHeader = ({ title, status, free }) => (
  <Flex
    css={theme({
      alignItems: 'baseline',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 2,
      pb: [2, 2, 3, 3]
    })}
  >
    <Text
      as='span'
      css={theme({
        fontFamily: 'mono',
        fontSize: 1,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: '0.04em'
      })}
    >
      {title}
    </Text>
    <Box
      css={theme({
        bg: free ? 'pinkest' : 'white',
        color: free ? 'secondary' : 'black70',
        border: 1,
        borderColor: free ? 'secondary' : 'black10',
        borderRadius: 5,
        fontFamily: 'mono',
        fontSize: 0,
        fontWeight: 'bold',
        px: 3,
        py: 1,
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      })}
    >
      {status}
    </Box>
  </Flex>
)

const ScenarioRow = ({ children }) => (
  <Flex
    css={theme({
      alignItems: 'stretch',
      gap: [2, 2, 3, 3],
      flexDirection: ['column', 'column', 'row', 'row']
    })}
  >
    {children}
  </Flex>
)

const CACHED_WORKFLOWS = [
  'metadata',
  'screenshot',
  'pdf',
  'html',
  'markdown',
  'insights',
  'data extraction'
]

const Diagram = () => (
  <Section css={theme({ pt: 1 })}>
    <SectionInner>
      <Box
        css={theme({
          bg: 'transparent',
          py: [3, 3, 4, 4],
          pb: 0
        })}
      >
        <Flex
          css={theme({
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 2,
            pb: [3, 4, 4, 4]
          })}
        >
          <Text
            as='span'
            css={theme({
              fontSize: 0,
              color: 'black60',
              fontFamily: 'mono',
              alignSelf: 'center'
            })}
          >
            Same cache, every output:
          </Text>
          {CACHED_WORKFLOWS.map(item => (
            <ProviderChip key={item}>{item}</ProviderChip>
          ))}
        </Flex>

        <Box css={theme({ pb: [4, 4, 5, 5] })}>
          <ScenarioHeader
            title='First request to a URL'
            status='MISS · billed once'
          />
          <ScenarioRow>
            <Node>
              <NodeLabel>Your code</NodeLabel>
              <NodeSub>any workflow</NodeSub>
            </Node>
            <Arrow />
            <NodeActive>
              <NodeLabel css={theme({ color: 'secondary' })}>
                Microlink Pro
              </NodeLabel>
              <NodeSub>fetch + render</NodeSub>
            </NodeActive>
            <Arrow />
            <Node>
              <NodeLabel>Origin</NodeLabel>
              <NodeSub>target site</NodeSub>
            </Node>
            <Arrow />
            <Node>
              <NodeLabel>Response</NodeLabel>
              <NodeSub>cache populated</NodeSub>
            </Node>
          </ScenarioRow>
        </Box>

        <Box>
          <ScenarioHeader
            title='Every request after, while ttl is valid'
            status='HIT · free'
            free
          />
          <ScenarioRow>
            <Node>
              <NodeLabel>Your code</NodeLabel>
              <NodeSub>any workflow</NodeSub>
            </Node>
            <Arrow />
            <NodeActive>
              <NodeLabel css={theme({ color: 'secondary' })}>
                CloudFlare edge
              </NodeLabel>
              <NodeSub>nearest of 240+ nodes</NodeSub>
            </NodeActive>
            <Arrow />
            <Node>
              <NodeLabel>Cached response</NodeLabel>
              <NodeSub>tens of milliseconds</NodeSub>
            </Node>
          </ScenarioRow>
        </Box>

        <Text
          as='p'
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: 0,
            color: 'black60',
            fontFamily: 'mono',
            textAlign: 'left'
          })}
        >
          With <CodeInline>staleTtl</CodeInline>, even revalidations happen in
          the background.
        </Text>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Code example ───────────────────────────────────────────────────────── */

const CodeExample = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Code</Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Recommended: one paid request per day, the rest are free
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Keep responses valid for 24 hours and serve every caller from cache
        while a background refresh keeps them current. The result: a single
        billed <CodeInline>MISS</CodeInline> per cache window, every other
        request a free <CodeInline>HIT</CodeInline>. Works the same on metadata,
        screenshots, PDFs, HTML, and markdown.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  apiKey: process.env.MICROLINK_API_KEY,
  ttl: '1d',
  staleTtl: 0
})`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/guides/common/caching'
          css={theme({
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Full caching patterns guide
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Bypass: force a fresh response ─────────────────────────────────────── */

const ForceFresh = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>
        Bypass the cache
      </Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Need a guaranteed fresh response?
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        Pass <CodeInline>force: true</CodeInline> to skip the cache layer
        entirely and force-regenerate a new copy. The response header{' '}
        <CodeInline>x-cache-status</CodeInline> will read{' '}
        <CodeInline>BYPASS</CodeInline>, and a fresh entry replaces the previous
        one. Use it for cache invalidation events — not on every request.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  apiKey: process.env.MICROLINK_API_KEY,
  force: true
})`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/docs/api/parameters/force'
          css={theme({
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          Read the force reference
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Verifying ──────────────────────────────────────────────────────────── */

const Verifying = () => (
  <Section>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Verify</Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        How to confirm cache behavior
      </SubheadBase>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        <CodeInline>x-cache-status</CodeInline> is the source of truth — and the
        difference between a free request and a billed one.{' '}
        <CodeInline>HIT</CodeInline> means served from the unified cache (
        <strong>not counted toward your plan</strong>),{' '}
        <CodeInline>MISS</CodeInline> means a fresh build (billed), and{' '}
        <CodeInline>BYPASS</CodeInline> means the cache was skipped on purpose
        (billed). The accompanying <CodeInline>cf-cache-status</CodeInline>{' '}
        tells you whether CloudFlare's edge served it from a node close to the
        caller.
      </BodyText>

      <ResponseCard aria-label='Example response headers from a cached request'>
        <ResponseLine>HTTP/2 200</ResponseLine>
        <ResponseLine comment='Pro plan active'>
          x-pricing-plan: pro
        </ResponseLine>
        <ResponseLine highlight comment='served from cache · no quota used'>
          x-cache-status: HIT
        </ResponseLine>
        <ResponseLine highlight comment='effective ttl in ms (= 1d)'>
          x-cache-ttl: 86400000
        </ResponseLine>
        <ResponseLine comment='served from nearest edge node'>
          cf-cache-status: HIT
        </ResponseLine>
        <ResponseLine comment='cache hit ⇒ tens of ms'>
          x-response-time: 23ms
        </ResponseLine>
      </ResponseCard>
    </SectionInner>
  </Section>
)

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    question: 'Does caching apply to screenshots and PDFs too?',
    text: 'Yes — the cache layer covers every Microlink output equally: metadata, HTML, markdown, screenshots, PDFs, insights, and data extraction. There is no separate cache for media. A 4K full-page screenshot or a 50-page PDF behaves the same as a metadata response: the first request renders and caches the artifact (x-cache-status: MISS, billed once); every subsequent caller within the ttl window gets it back as a HIT for free, served from the nearest CloudFlare edge node. Because rendered outputs are the most expensive ones to produce, that is also where caching saves you the most.',
    answer: (
      <>
        <div>
          Yes — the cache layer covers every Microlink output equally: metadata,
          HTML, markdown, <strong>screenshots</strong>, <strong>PDFs</strong>,
          insights, and data extraction. There is no separate cache for media.
        </div>
        <div>
          A 4K full-page screenshot or a 50-page PDF behaves the same as a
          metadata response: the first request renders and caches the artifact (
          <CodeInline>x-cache-status: MISS</CodeInline>, billed once); every
          subsequent caller within the <CodeInline>ttl</CodeInline> window gets
          it back as a <CodeInline>HIT</CodeInline> for free, served from the
          nearest CloudFlare edge node. Because rendered outputs are the most
          expensive ones to produce, that is also where caching saves you the
          most.
        </div>
      </>
    )
  },
  {
    question: 'Do cached responses count against my plan quota?',
    text: 'No. Any response served from cache (x-cache-status: HIT) does not count toward your plan quota — it is served from CloudFlare\u2019s edge in milliseconds and billed at zero. Only the first request that warms the cache (x-cache-status: MISS) and explicit cache bypasses (x-cache-status: BYPASS, e.g. when force: true is set) count as billed requests. The longer your ttl, the more free hits each paid miss generates. See the edge-cdn announcement and the cache documentation for the full rationale.',
    answer: (
      <>
        <div>
          No. Any response served from cache (
          <CodeInline>x-cache-status: HIT</CodeInline>) does{' '}
          <strong>not</strong> count toward your plan quota — it is served from
          CloudFlare's edge in milliseconds and billed at zero. Only the first
          request that warms the cache (
          <CodeInline>x-cache-status: MISS</CodeInline>) and explicit cache
          bypasses (<CodeInline>x-cache-status: BYPASS</CodeInline>, e.g. when{' '}
          <CodeInline>force: true</CodeInline> is set) count as billed requests.
        </div>
        <div>
          The longer your <CodeInline>ttl</CodeInline>, the more free hits each
          paid miss generates. See the{' '}
          <Link href='/blog/edge-cdn'>edge-cdn announcement</Link> and the{' '}
          <Link href='/docs/api/basics/cache'>cache documentation</Link> for the
          full rationale.
        </div>
      </>
    )
  },
  {
    question: 'What is the difference between ttl and staleTtl?',
    text: 'ttl sets how long a cached response is considered valid (between 1 minute and 31 days). staleTtl opts into stale-while-revalidate: when a cached entry crosses the staleTtl threshold, the next request still serves the cached copy instantly while a background refresh regenerates a fresh one. The staleTtl value cannot exceed ttl. The recommended production setup is ttl set to your freshness budget, staleTtl set to 0 — every request returns instantly while background refreshes keep the cache current.',
    answer: (
      <>
        <div>
          <CodeInline>ttl</CodeInline> sets how long a cached response is
          considered valid — between <strong>1 minute</strong> and{' '}
          <strong>31 days</strong>. <CodeInline>staleTtl</CodeInline> opts into{' '}
          <strong>stale-while-revalidate</strong>: when a cached entry crosses
          the staleTtl threshold, the next request still serves the cached copy
          instantly while a background refresh regenerates a fresh one.
        </div>
        <div>
          The <CodeInline>staleTtl</CodeInline> value cannot exceed{' '}
          <CodeInline>ttl</CodeInline>. The recommended production setup is{' '}
          <CodeInline>ttl</CodeInline> set to your freshness budget,{' '}
          <CodeInline>staleTtl: 0</CodeInline> — every request returns instantly
          while background refreshes keep the cache current.
        </div>
      </>
    )
  },
  {
    question: 'What values can I pass to ttl?',
    text: "A number in milliseconds (e.g. 86400000) or a humanized string. Supported units: s/sec/secs/second/seconds, m/min/mins/minute/minutes, h/hr/hour/hours, d/day/days. Aliases: 'min' equals '1m' and 'max' equals '31d'. The minimum is 1 minute and the maximum is 31 days; values outside that window get clamped.",
    answer: (
      <>
        <div>
          A number in milliseconds (<CodeInline>86400000</CodeInline>) or a
          humanized string. Supported units: <CodeInline>s</CodeInline>,{' '}
          <CodeInline>m</CodeInline>, <CodeInline>h</CodeInline>, and{' '}
          <CodeInline>d</CodeInline> in singular, plural, and long-form variants
          — for example <CodeInline>'90s'</CodeInline>,{' '}
          <CodeInline>'1hour'</CodeInline>, <CodeInline>'7days'</CodeInline>.
        </div>
        <div>
          Aliases: <CodeInline>'min'</CodeInline> equals 1 minute and{' '}
          <CodeInline>'max'</CodeInline> equals 31 days. The minimum is{' '}
          <strong>1 minute</strong> and the maximum is <strong>31 days</strong>;
          values outside that window get clamped.
        </div>
      </>
    )
  },
  {
    question: 'How does stale-while-revalidate actually work?',
    text: 'When you set staleTtl=0, every request hits a cached copy if one exists — and if that copy has aged past the stale threshold, Microlink schedules a background fetch to regenerate it. The current caller does not wait. Subsequent callers benefit from the freshly built copy. This is the same pattern modern CDNs use (Cache-Control: stale-while-revalidate), implemented inside the API so you do not have to.',
    answer: (
      <>
        <div>
          When you set <CodeInline>staleTtl: 0</CodeInline>, every request hits
          a cached copy if one exists — and if that copy has aged past the stale
          threshold, Microlink schedules a background fetch to regenerate it.
          The current caller does not wait. Subsequent callers benefit from the
          freshly built copy.
        </div>
        <div>
          This is the same pattern modern CDNs use (
          <CodeInline>Cache-Control: stale-while-revalidate</CodeInline>),
          implemented inside the API so you do not have to coordinate it on your
          end.
        </div>
      </>
    )
  },
  {
    question: 'How do I bypass the cache for a fresh response?',
    text: 'Pass force: true. The cache layer is skipped, a new response is generated, and the response carries x-cache-status: BYPASS. Use this for invalidation events (e.g. you know the source content changed) — not on every request, since you would lose the latency and quota benefits of caching.',
    answer: (
      <>
        <div>
          Pass <CodeInline>force: true</CodeInline>. The cache layer is skipped,
          a new response is generated, and the response carries{' '}
          <CodeInline>x-cache-status: BYPASS</CodeInline>.
        </div>
        <div>
          Use this for invalidation events — for example, you know the source
          content changed — not on every request, since you would lose the
          latency and quota benefits of caching. See the{' '}
          <Link href='/docs/api/parameters/force'>force reference</Link>.
        </div>
      </>
    )
  },
  {
    question: 'How do I confirm cache behavior on a request?',
    text: 'Read the cache headers on the response: x-cache-status (HIT, MISS, or BYPASS) is the source of truth for the unified cache. cf-cache-status reports the CloudFlare edge layer separately. x-cache-ttl confirms the effective ttl in milliseconds. x-response-time gives you a quick latency sanity check — cache hits typically come back in tens of milliseconds.',
    answer: (
      <>
        <div>
          Read the cache headers on the response.{' '}
          <CodeInline>x-cache-status</CodeInline> (<CodeInline>HIT</CodeInline>,{' '}
          <CodeInline>MISS</CodeInline>, or <CodeInline>BYPASS</CodeInline>) is
          the source of truth for the unified cache.{' '}
          <CodeInline>cf-cache-status</CodeInline> reports the CloudFlare edge
          layer separately.
        </div>
        <div>
          <CodeInline>x-cache-ttl</CodeInline> confirms the effective ttl in
          milliseconds. <CodeInline>x-response-time</CodeInline> gives you a
          quick latency sanity check — cache hits typically come back in tens of
          milliseconds.
        </div>
      </>
    )
  },
  {
    question: 'Do ttl and staleTtl work on free plans?',
    text: 'No. Both ttl and staleTtl are Pro features. Free-plan responses are still cached using the default 24-hour ttl, but the parameters themselves are honored only on Pro requests. The unified cache + CloudFlare edge cache combination is shared by both tiers — Pro adds the ability to tune lifetime and opt into stale-while-revalidate.',
    answer: (
      <>
        <div>
          No. Both <CodeInline>ttl</CodeInline> and{' '}
          <CodeInline>staleTtl</CodeInline> are <Link href='/pricing'>Pro</Link>{' '}
          features. Free-plan responses are still cached using the default
          24-hour ttl, but the parameters themselves are honored only on Pro
          requests.
        </div>
        <div>
          The unified cache + CloudFlare edge cache combination is shared by
          both tiers — Pro adds the ability to tune lifetime and opt into
          stale-while-revalidate.
        </div>
      </>
    )
  }
]

const FAQSection = () => (
  <Box
    css={theme({
      bg: 'pinky',
      borderTop: 1,
      borderTopColor: 'pinkest',
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_PY,
          px: SECTION_PX
        })}
        questions={FAQ_ITEMS}
      />
    </Box>
  </Box>
)

/* ─── CTA ────────────────────────────────────────────────────────────────── */

const CtaSection = () => (
  <Section>
    <SectionInner css={theme({ textAlign: 'center' })}>
      <SubheadBase
        css={theme({
          color: 'black',
          fontSize: ['28px', '32px', '40px', '46px'],
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Pay for misses.{' '}
        <span css={theme({ color: 'secondary' })}>Hits are on us.</span>
      </SubheadBase>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Pick the volume that matches your traffic. Cache TTL tuning,
        stale-while-revalidate, and the cache layer (unified cache + CloudFlare
        edge) are included on every Pro plan — and every cache hit served from
        those layers stays free, no matter how many requests it absorbs.
      </Caption>
      <Flex
        css={theme({
          py: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'secondary',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Cache your way to a smaller bill
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const TtlFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Diagram />
      <WhatItDoes />
      <TwoInOne />
      <CodeExample />
      <ForceFresh />
      <Verifying />
      <CtaSection />
      <FAQSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Cache TTL & Stale-While-Revalidate API'
    description='Cache hits never count against your Microlink plan quota — every HIT is free, including expensive screenshot and PDF renders. Tune cache lifetime per request with ttl (1 minute to 31 days) and eliminate cold-start latency with staleTtl. A unified cache + CloudFlare edge cache plus stale-while-revalidate, applied uniformly to metadata, HTML, markdown, screenshots, PDFs, insights, and data extraction.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
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

export default TtlFeaturePage
