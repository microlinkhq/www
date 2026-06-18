import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Dot from 'components/elements/Dot/Dot'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Overlay from 'components/pages/home/overlay'
import FeatherIcon from 'components/icons/Feather'
import { WandSparkles } from 'components/icons/WandSparkles'
import { transition, fonts, theme } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import analyticsData from '../../../../data/analytics.json'

// round the request count down to the nearest 50 (e.g. 778M → 750M) so the
// hero shows a clean, never-overstated figure rather than the exact number
const reqsRounded = (() => {
  const [, value, unit] = analyticsData[0].reqs_pretty.match(/^([\d.]+)(\D+)$/)
  return `${Math.floor(Number(value) / 50) * 50}${unit}`
})()

const PINK = '#FF1E8C'
const VIOLET = '#9B26D6'
const INK = '#0A0A0A'
const GRADIENT = 'linear-gradient(99deg,#FF1E8C,#B026E0)'

const SANS = fonts.sans
const MONO = fonts.mono

// response/syntax-highlight palette (kept literal — these don't map to theme
// tokens and need to match the response viewer exactly)
const SYNTAX = {
  key: '#0E9488',
  string: '#16A34A',
  literal: '#E8743B',
  number: '#2D7FF9',
  boolean: '#E0218A',
  fn: '#1BA39C',
  muted: '#9A9AA0',
  body: '#3D3D42'
}

const reduceMotion = '@media (prefers-reduced-motion: reduce)'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255,30,140,.45) }
  70% { box-shadow: 0 0 0 8px rgba(255,30,140,0) }
  100% { box-shadow: 0 0 0 0 rgba(255,30,140,0) }
`

/* ----------------------------- routing logic ----------------------------- */

const PRESETS = {
  stripe: {
    domain: 'stripe.com',
    brand: 'Stripe',
    title: 'Stripe | Payment Processing Platform',
    desc: 'Financial infrastructure to grow your revenue.'
  },
  github: {
    domain: 'github.com',
    brand: 'GitHub',
    title: 'GitHub · Build and ship software',
    desc: "The world's most widely adopted AI-powered developer platform."
  },
  vercel: {
    domain: 'vercel.com',
    brand: 'Vercel',
    title: 'Vercel: Build and deploy the best web experiences',
    desc: 'Frameworks, workflows, and infrastructure for the web.'
  },
  figma: {
    domain: 'figma.com',
    brand: 'Figma',
    title: 'Figma: The collaborative interface design tool',
    desc: 'Design, prototype, and gather feedback all in one place.'
  }
}

const ICONS = {
  screenshot:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 5V3M17 5V3"/></svg>',
  preview:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-4.5-4.5L7 21"/></svg>',
  markdown:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 14V10l2 2 2-2v4M15 10v4M15 14l1.5 1.5L18 14"/></svg>',
  metadata:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2"/></svg>',
  search:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  pdf: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
  logo: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6z"/></svg>'
}

const LABELS = {
  screenshot: 'Screenshot',
  preview: 'Link preview',
  markdown: 'Markdown',
  metadata: 'Metadata',
  search: 'Search',
  pdf: 'PDF',
  logo: 'Logo'
}

const FLAGS = {
  screenshot: 'screenshot',
  preview: 'embed',
  markdown: 'markdown',
  metadata: 'meta',
  search: 'q',
  pdf: 'pdf',
  logo: 'logo'
}

const VERTICAL_ORDER = [
  'screenshot',
  'preview',
  'markdown',
  'metadata',
  'search',
  'pdf',
  'logo'
]

const CYCLE = [
  'turn stripe.com into a PDF',
  'take a screenshot of vercel.com',
  'extract metadata from github.com',
  'get the markdown of figma.com',
  'fetch the logo of stripe.com'
]

const EXAMPLES = [
  'take a screenshot of stripe.com',
  'markdown of vercel.com/blog',
  'logo of figma.com',
  'metadata from github.com'
]

const parseLocal = text => {
  const t = (text || '').toLowerCase()
  const rules = [
    [
      'screenshot',
      /screenshot|screen ?shot|capture|snap|take a (pic|photo|picture|shot)|image of|how .* looks?/
    ],
    ['pdf', /\bpdf\b|print|printable|to a doc|as a doc/],
    ['logo', /\blogo\b|favicon|brand ?mark|brand icon|\bicon of\b/],
    [
      'metadata',
      /metadata|meta ?data|\bmeta\b|open ?graph|\bog:?\b|\bseo\b|title and description/
    ],
    [
      'markdown',
      /markdown|\bmd\b|clean text|readable|article text|page content|content of|text of|in markdown/
    ],
    ['search', /\bsearch\b|google|serp|results for|look up|find .* (about|on)/],
    ['preview', /preview|unfurl|link ?card|rich card|\bembed\b/]
  ]
  let vertical = 'screenshot'
  for (const [k, re] of rules) {
    if (re.test(t)) {
      vertical = k
      break
    }
  }
  let url = ''
  const m =
    (text || '').match(/https?:\/\/[^\s]+/) ||
    (text || '').match(
      /[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/[^\s]*)?/i
    )
  if (m) {
    url = m[0]
    if (!/^https?:\/\//.test(url)) url = 'https://' + url
  }
  return { vertical, url, hasUrl: !!url }
}

const derive = (text, override) => {
  const p = parseLocal(text)
  const v = override || p.vertical
  const url = p.url || ''
  const domain =
    url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'microlink.io'
  const knownKey = Object.keys(PRESETS).find(k => url.includes(k))
  const known = knownKey ? PRESETS[knownKey] : null
  const brand = known
    ? known.brand
    : (domain.split('.')[0] || 'site').replace(/^./, c => c.toUpperCase())
  return {
    vertical: v,
    label: LABELS[v],
    icon: ICONS[v],
    url: url || '—',
    hasUrl: p.hasUrl,
    domain,
    fullUrl: 'https://' + domain,
    optName: FLAGS[v],
    encUrl: encodeURIComponent('https://' + domain),
    vertBorder: override ? 'rgba(160,40,200,.45)' : '#EAEAEC',
    brand,
    title: known ? known.title : brand,
    desc: known ? known.desc : 'Structured data resolved from ' + domain + '.'
  }
}

const HEADER_ROWS = [
  { k: 'cache-control', v: 'public, must-revalidate, max-age=76376' },
  { k: 'content-length', v: '401' },
  { k: 'content-type', v: 'application/json; charset=utf-8' },
  { k: 'server-timing', v: 'total;dur=34,ssrf;dur=1,purge;dur=0' },
  { k: 'x-cache-status', v: 'HIT' },
  { k: 'x-fetch-mode', v: 'prerender' },
  { k: 'x-fetch-time', v: '869ms' },
  { k: 'x-pricing-plan', v: 'free' },
  { k: 'x-rate-limit-limit', v: '50' },
  { k: 'x-rate-limit-remaining', v: '48' },
  { k: 'x-region', v: 'iad' },
  { k: 'x-response-time', v: '34ms' }
]

const TIMING_BARS = [
  { name: 'total', dur: '34.0ms', pct: '97%', color: '#16A34A' },
  { name: 'ssrf', dur: '1.0ms', pct: '6%', color: '#2D7FF9' },
  { name: 'purge', dur: '0.0ms', pct: '2%', color: '#F59E0B' },
  { name: 'cfExtPri', dur: '0.0ms', pct: '2%', color: '#EC4899' }
]

const TIMING_ROWS = [
  { name: 'total', dur: '34.0ms', pct: '97.1%' },
  { name: 'ssrf', dur: '1.0ms', pct: '2.9%' },
  { name: 'purge', dur: '0.0ms', pct: '0.0%' },
  { name: 'cfExtPri', dur: '0.0ms', pct: '0.0%' }
]

/* ------------------------------- presentation ------------------------------ */

const Section = styled.section`
  position: relative;
  font-family: ${SANS};
  color: ${INK};
  -webkit-font-smoothing: antialiased;
  padding: clamp(32px, 5vw, 72px) clamp(16px, 4vw, 40px)
    clamp(96px, 14vw, 220px);
`

// the centered content column — Container gives flex-column + mx:auto; the
// outer <Section> owns the vertical/horizontal padding, so reset Container's
const Content = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 1080px;
  align-items: center;
  text-align: center;
  padding: 0;
`

const PulseDot = styled(Dot)`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${PINK};
  animation: ${pulse} 2s infinite;
  ${reduceMotion} {
    animation: none;
  }
`

const Headline = styled.h1`
  font-size: clamp(36px, 6.5vw, 62px);
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.035em;
  margin: 0;
  color: ${INK};

  span {
    background: ${GRADIENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

const Subtitle = styled.p`
  font-size: clamp(16px, 2.4vw, 19px);
  color: #3d3d42;
  margin: 18px 0 0;
  line-height: 1.5;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  font-weight: 600;
  color: ${VIOLET};
  background: rgba(255, 30, 140, 0.07);
  border: 1px solid rgba(160, 40, 200, 0.18);
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 26px;
`

const Composer = styled.div`
  width: 100%;
  max-width: 680px;
  margin-top: 38px;
  background: #fff;
  border: 1px solid #e6e4ea;
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 24px 60px -30px rgba(40, 10, 60, 0.4);
  text-align: left;
`

const ComposerInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: ${SANS};
  font-size: 18px;
  color: ${INK};
  background: transparent;
  padding: 18px 18px 10px;

  &::placeholder {
    color: #b3b3ba;
  }
`

const VertChip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: #fafafb;
  border: 1px solid ${props => props.$border};
  border-radius: 10px;
  padding: 5px 9px 5px 6px;
`

const RunButton = styled.button`
  border: none;
  cursor: pointer;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform ${transition.short}, filter ${transition.short};

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }
`

const ExampleChip = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: ${SANS};
  font-size: 13px;
  color: #5a5a60;
  background: #fff;
  border: 1px solid #e4e4e8;
  padding: 8px 13px;
  border-radius: 999px;
  transition: border-color ${transition.short}, color ${transition.short};

  &:hover {
    border-color: ${props => props.$border};
    color: ${INK};
  }
`

const Panel = styled.div`
  width: 100%;
  max-width: 980px;
  margin-top: 14px;
  border: 1px solid #e9e7ec;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  text-align: left;
  box-shadow: 0 24px 60px -40px rgba(40, 10, 60, 0.35);
`

const TabButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: ${SANS};
  font-size: 17px;
  font-weight: ${props => (props.$active ? 600 : 500)};
  color: ${props => (props.$active ? INK : '#8a8a90')};
  padding: 0 0 14px;
  border-bottom: 2px solid ${props => (props.$active ? INK : 'transparent')};
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const Mono = styled(Text).attrs({ as: 'span' })`
  font-family: ${MONO};
`

const StatusPill = styled.span`
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 500;
  color: ${SYNTAX.string};
  background: #e7f7ed;
  padding: 5px 12px;
  border-radius: 999px;
  white-space: nowrap;
`

const Code = styled.pre`
  margin: 0;
  padding: 22px;
  font-family: ${MONO};
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 380px;
  overflow: auto;
`

const Glyph = ({ html, ...props }) => (
  <Box as='span' {...props} dangerouslySetInnerHTML={{ __html: html }} />
)

const IconBadge = styled(Glyph)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  flex-shrink: 0;
`

// syntax-highlight tokens for the Data/Code panels
const Key = styled.span`
  color: ${SYNTAX.key};
`
const Str = styled.span`
  color: ${SYNTAX.string};
`
const Literal = styled.span`
  color: ${SYNTAX.literal};
`
const Num = styled.span`
  color: ${SYNTAX.number};
`
const Bool = styled.span`
  color: ${SYNTAX.boolean};
`
const Fn = styled.span`
  color: ${SYNTAX.fn};
`
const Comment = styled.span`
  color: ${SYNTAX.muted};
`

/* --------------------------------- result -------------------------------- */

const ResultPanel = ({ tab, setTab, D }) => {
  const tabs = [
    { key: 'data', label: 'Data' },
    { key: 'headers', label: 'Headers' },
    { key: 'timing', label: 'Timing', badge: '4' },
    { key: 'code', label: 'Code' }
  ]

  return (
    <Panel>
      {/* header */}
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 3,
          px: 3
        })}
      >
        <Flex css={theme({ alignItems: 'center', gap: 3 })}>
          <Box
            as='span'
            css={theme({
              fontSize: 2,
              fontWeight: 'bold',
              letterSpacing: '-.02em',
              color: INK
            })}
          >
            Result
          </Box>
          <StatusPill>200 success</StatusPill>
          <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>569ms</Mono>
        </Flex>
      </Flex>

      {/* GET url */}
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 3,
          py: 3,
          px: 3,
          borderTop: '1px solid #EFEFF1',
          borderBottom: '1px solid #EFEFF1'
        })}
      >
        <Mono
          css={theme({
            fontSize: 0,
            color: SYNTAX.body,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          <Box as='span' css={theme({ color: SYNTAX.string, fontWeight: 600 })}>
            GET
          </Box>{' '}
          https://api.microlink.io?url={D.encUrl}
        </Mono>
      </Flex>

      {/* tabs */}
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 4,
          pt: 3,
          px: 3,
          borderBottom: '1px solid #EFEFF1'
        })}
      >
        {tabs.map(t => (
          <TabButton
            key={t.key}
            $active={tab === t.key}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.badge && (
              <StatusPill css={theme({ fontSize: 0, py: 1, px: 2 })}>
                {t.badge}
              </StatusPill>
            )}
          </TabButton>
        ))}
      </Flex>

      {tab === 'data' && (
        <Code
          css={theme({
            fontSize: 0,
            lineHeight: 1.85,
            color: SYNTAX.body
          })}
        >
          {'{\n  '}
          <Key>"status"</Key>: <Str>"success"</Str>,{'\n  '}
          <Key>"data"</Key>: {'{\n    '}
          <Key>"publisher"</Key>: <Str>"{D.domain}"</Str>,{'\n    '}
          <Key>"lang"</Key>: <Str>"en"</Str>,{'\n    '}
          <Key>"title"</Key>: <Str>"{D.title}"</Str>,{'\n    '}
          <Key>"url"</Key>: <Str>"{D.fullUrl}"</Str>,{'\n    '}
          <Key>"date"</Key>: <Str>"2026-06-16T20:42:11.000Z"</Str>,{'\n    '}
          <Key>"image"</Key>: <Literal>null</Literal>,{'\n    '}
          <Key>"description"</Key>: <Str>"{D.desc}"</Str>,{'\n    '}
          <Key>"logo"</Key>: <Literal>null</Literal>
          {'\n  },\n  '}
          <Key>"statusCode"</Key>: <Num>200</Num>,{'\n  '}
          <Key>"redirects"</Key>: []{'\n}'}
        </Code>
      )}

      {tab === 'headers' && (
        <Box
          css={theme({
            pt: 2,
            px: 3,
            pb: 3,
            maxHeight: '380px',
            overflow: 'auto'
          })}
        >
          {HEADER_ROWS.map(h => (
            <Box
              key={h.k}
              css={theme({
                display: 'grid',
                gridTemplateColumns: '230px 1fr',
                gap: 3,
                py: 2,
                borderBottom: '1px solid #F2F2F4',
                fontFamily: 'mono',
                fontSize: 0
              })}
            >
              <Box as='span' css={theme({ color: SYNTAX.number })}>
                {h.k}
              </Box>
              <Box
                as='span'
                css={theme({ color: SYNTAX.body, wordBreak: 'break-all' })}
              >
                {h.v}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {tab === 'timing' && (
        <Box css={theme({ p: 3, maxHeight: '380px', overflow: 'auto' })}>
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3
            })}
          >
            <Box
              as='span'
              css={theme({ fontSize: 1, fontWeight: 600, color: INK })}
            >
              Total server time
            </Box>
            <Box
              as='span'
              css={theme({ fontSize: 2, fontWeight: 'bold', color: INK })}
            >
              35ms
            </Box>
          </Flex>
          {TIMING_BARS.map(b => (
            <Box key={b.name} css={theme({ mb: 3 })}>
              <Flex
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                })}
              >
                <Mono css={theme({ fontSize: 0, color: INK })}>{b.name}</Mono>
                <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>
                  {b.dur}
                </Mono>
              </Flex>
              <Box
                css={theme({
                  height: '8px',
                  borderRadius: '999px',
                  background: '#F0F0F2',
                  overflow: 'hidden'
                })}
              >
                <Box
                  css={theme({
                    height: '100%',
                    borderRadius: '999px',
                    width: b.pct,
                    background: b.color
                  })}
                />
              </Box>
            </Box>
          ))}
          <Box
            css={theme({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 2,
              mt: 3,
              pb: 2,
              borderBottom: '1px solid #EFEFF1',
              fontFamily: 'mono',
              fontSize: 0,
              letterSpacing: '.05em',
              color: SYNTAX.muted,
              textTransform: 'uppercase'
            })}
          >
            <span>Metric</span>
            <Box as='span' css={theme({ textAlign: 'right' })}>
              Duration
            </Box>
            <Box as='span' css={theme({ textAlign: 'right' })}>
              % of total
            </Box>
          </Box>
          {TIMING_ROWS.map(r => (
            <Box
              key={r.name}
              css={theme({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 2,
                py: 3,
                borderBottom: '1px solid #F2F2F4',
                fontFamily: 'mono',
                fontSize: 0,
                color: SYNTAX.body
              })}
            >
              <span>{r.name}</span>
              <Box
                as='span'
                css={theme({ textAlign: 'right', color: SYNTAX.muted })}
              >
                {r.dur}
              </Box>
              <Box
                as='span'
                css={theme({ textAlign: 'right', color: SYNTAX.muted })}
              >
                {r.pct}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {tab === 'code' && (
        <Box>
          <Box
            css={theme({
              fontFamily: 'mono',
              fontSize: 0,
              letterSpacing: '.06em',
              color: SYNTAX.muted,
              pt: 3,
              px: 3
            })}
          >
            JAVASCRIPT / NODE.JS
          </Box>
          <Code
            css={theme({
              pt: 3,
              px: 3,
              pb: 4,
              fontSize: 0,
              lineHeight: '2',
              maxHeight: '340px',
              color: INK
            })}
          >
            <Num>import</Num> mql <Num>from</Num> <Str>'@microlink/mql'</Str>
            {'\n\n'}
            <Num>const</Num> {'{'} status, data, headers, redirects {'}'} ={' '}
            <Num>await</Num> mql(
            <Str>'{D.fullUrl}'</Str>, {'{ '}
            <Num>{D.optName}</Num>: <Bool>true</Bool> {'})'}
            {'\n\n'}
            console.<Fn>log</Fn>(status){'     '}
            <Comment>{"// => 'success'"}</Comment>
            {'\n'}
            console.<Fn>log</Fn>(data){'       '}
            <Comment>{'// => response payload'}</Comment>
            {'\n'}
            console.<Fn>log</Fn>(headers){'    '}
            <Comment>{'// => response headers'}</Comment>
            {'\n'}
            console.<Fn>log</Fn>(redirects){'  '}
            <Comment>{'// => redirect chain'}</Comment>
          </Code>
        </Box>
      )}
    </Panel>
  )
}

/* ---------------------------------- hero --------------------------------- */

const Hero = () => {
  const [dText, setDText] = useState(CYCLE[0])
  const [dTab, setDTab] = useState('data')
  const [dVert, setDVert] = useState(null)
  const [dVertMenu, setDVertMenu] = useState(false)
  const anim = useRef({
    ci: 0,
    phase: 'pause',
    userTook: false,
    timer: null,
    text: CYCLE[0]
  })
  const chipRef = useRef(null)

  const stopTyping = () => {
    anim.current.userTook = true
    clearTimeout(anim.current.timer)
  }

  useEffect(() => {
    const a = anim.current
    const apply = t => {
      a.text = t
      setDText(t)
    }
    const tick = () => {
      if (a.userTook) return
      if (a.phase === 'pause') {
        a.phase = 'deleting'
        a.timer = setTimeout(tick, 50)
        return
      }
      if (a.phase === 'deleting') {
        if (a.text.length > 0) {
          apply(a.text.slice(0, -1))
          a.timer = setTimeout(tick, 28)
          return
        }
        a.ci = (a.ci + 1) % CYCLE.length
        a.phase = 'typing'
        a.timer = setTimeout(tick, 160)
        return
      }
      const target = CYCLE[a.ci]
      if (a.text.length < target.length) {
        apply(target.slice(0, a.text.length + 1))
        a.timer = setTimeout(tick, 48 + Math.random() * 40)
        return
      }
      a.phase = 'pause'
      a.timer = setTimeout(tick, 2600)
    }
    a.timer = setTimeout(tick, 2400)
    return () => clearTimeout(a.timer)
  }, [])

  useEffect(() => {
    if (!dVertMenu) return undefined
    const onDown = e => {
      if (chipRef.current && !chipRef.current.contains(e.target)) {
        setDVertMenu(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [dVertMenu])

  const D = derive(dText, dVert)

  const onComposerChange = e => {
    stopTyping()
    anim.current.text = e.target.value
    setDText(e.target.value)
    setDVert(null)
    setDVertMenu(false)
  }

  const pickExample = value => () => {
    stopTyping()
    anim.current.text = value
    setDVert(null)
    setDVertMenu(false)
    setDText(value)
  }

  return (
    <Section id='hero'>
      <Overlay start='60%' />
      <Content>
        <Badge>
          <PulseDot />
          Trusted by apps, agents & AI · {reqsRounded}+ requests / month
        </Badge>

        <Headline>
          The web, <span>automated</span>
        </Headline>
        <Subtitle>Everything your software needs from any URL.</Subtitle>

        {/* composer */}
        <Composer>
          <ComposerInput
            value={dText}
            onChange={onComposerChange}
            onFocus={stopTyping}
            onKeyDown={e => {
              if (e.key === 'Enter') e.target.blur()
            }}
            placeholder='Ask Microlink anything…'
            aria-label='Ask Microlink anything'
          />
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              p: 2
            })}
          >
            <Flex
              css={theme({ alignItems: 'center', gap: 2, minHeight: '34px' })}
            >
              <VertChip
                ref={chipRef}
                $border={D.vertBorder}
                onClick={e => {
                  e.stopPropagation()
                  stopTyping()
                  setDVertMenu(v => !v)
                }}
              >
                <IconBadge
                  html={D.icon}
                  css={theme({
                    width: '24px',
                    height: '24px',
                    background: GRADIENT,
                    color: 'white'
                  })}
                />
                <Box
                  as='span'
                  css={theme({ fontSize: 0, fontWeight: 600, color: INK })}
                >
                  {D.label}
                </Box>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#9A9AA0'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m6 9 6 6 6-6' />
                </svg>
                {dVertMenu && (
                  <Box
                    css={theme({
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: 0,
                      zIndex: 30,
                      width: '230px',
                      background: 'white',
                      border: '1px solid #E6E4EA',
                      borderRadius: 5,
                      boxShadow: '0 24px 48px -20px rgba(40,10,60,.35)',
                      p: 2
                    })}
                  >
                    {VERTICAL_ORDER.map(k => {
                      const active = k === D.vertical
                      return (
                        <Flex
                          key={k}
                          onClick={e => {
                            e.stopPropagation()
                            setDVert(k)
                            setDVertMenu(false)
                          }}
                          css={theme({
                            alignItems: 'center',
                            gap: 2,
                            py: 2,
                            px: 2,
                            borderRadius: 4,
                            cursor: 'pointer',
                            background: active
                              ? 'rgba(255,30,140,.06)'
                              : 'transparent'
                          })}
                        >
                          <IconBadge
                            html={ICONS[k]}
                            css={theme({
                              width: '26px',
                              height: '26px',
                              background: active ? GRADIENT : '#EDEBF0',
                              color: active ? '#fff' : '#9A9AA0'
                            })}
                          />
                          <Box
                            as='span'
                            css={theme({
                              fontSize: 0,
                              fontWeight: active ? 600 : 500,
                              color: INK
                            })}
                          >
                            {LABELS[k]}
                          </Box>
                          {active && (
                            <svg
                              width='15'
                              height='15'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke={VIOLET}
                              strokeWidth='3'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              css={theme({ ml: 'auto' })}
                            >
                              <path d='M20 6 9 17l-5-5' />
                            </svg>
                          )}
                        </Flex>
                      )
                    })}
                  </Box>
                )}
              </VertChip>
              {D.hasUrl && (
                <Mono css={theme({ fontSize: 0, color: VIOLET })}>{D.url}</Mono>
              )}
            </Flex>
            <RunButton aria-label='Run'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#fff'
                strokeWidth='2.4'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M5 12h14M13 6l6 6-6 6' />
              </svg>
            </RunButton>
          </Flex>
        </Composer>

        {/* example chips */}
        <Flex
          css={theme({
            gap: 2,
            mt: 4,
            flexWrap: 'wrap',
            justifyContent: 'center'
          })}
        >
          {EXAMPLES.map(ex => (
            <ExampleChip
              key={ex}
              $border={D.vertBorder}
              onClick={pickExample(ex)}
            >
              <Glyph
                html={ICONS[parseLocal(ex).vertical]}
                css={theme({ color: VIOLET, display: 'flex' })}
              />
              {ex}
            </ExampleChip>
          ))}
        </Flex>

        {/* live response */}
        <Caps
          css={theme({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            mt: 4,
            fontFamily: 'mono',
            fontSize: 0,
            color: VIOLET
          })}
        >
          <FeatherIcon icon={WandSparkles} size={0} color={VIOLET} />
          Live response
        </Caps>

        <ResultPanel tab={dTab} setTab={setDTab} D={D} />
      </Content>
    </Section>
  )
}

export default Hero
