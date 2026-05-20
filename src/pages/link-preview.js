import {
  borders,
  layout,
  colors,
  theme,
  transition,
  fontSizes,
  radii
} from 'theme'
import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import { cdnUrl } from 'helpers/cdn-url'
import { trackEvent } from 'helpers/plausible'
import { trimMs } from 'helpers/trim-ms'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import {
  Check as CheckIcon,
  Star as StarIcon,
  Terminal as TerminalIcon,
  X as CloseIcon
} from 'react-feather'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import Block from 'components/patterns/Block/Block'
import NerdStatsOverlay, {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS as TOOL_CATALOG } from 'components/patterns/Tools/toolCatalog'
import { PREVIEW_VARIANTS } from 'components/pages/embed'
import Plans, {
  CurrencyContext,
  useCurrency
} from 'components/patterns/Plans/Plans'

import { useHealthcheck } from 'components/hook/use-healthcheck'
import { useSiteMetadata } from 'components/hook/use-site-meta'

import { withTitle } from 'helpers/hoc/with-title'

import analyticsData from '../../data/analytics.json'
import ossData from '../../data/oss.json'

const ACCENT = '#3e55ff'
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [3, 3, 4, 5]
}

const INITIAL_PLACEHOLDER_URL = 'https://github.com'
const PLACEHOLDER_CYCLE = ['https://x.com']
const TYPING_SPEED_MS = 80
const INITIAL_DELAY_MS = 5000
const HOLD_AFTER_TYPING_MS = 300

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})
const formatCompactCount = number =>
  COMPACT_NUMBER_FORMATTER.format(number).toLowerCase()
const OSS_STARS_BY_NAME = new Map(
  ossData.map(({ name, stars }) => [name, stars])
)
const getRepoStarsLabel = (repo, asNumber = false) => {
  const liveStars = OSS_STARS_BY_NAME.get(repo.name)
  if (asNumber) return liveStars
  return typeof liveStars === 'number' && !asNumber
    ? formatCompactCount(liveStars)
    : repo.stars
}

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const GITHUB_DEMO_DATA = {
  title: 'GitHub · Build and ship software on a single, collaborative platform',
  description:
    "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
  url: 'https://github.com',
  publisher: 'GitHub',
  author: 'GitHub',
  image: {
    url: 'https://api.microlink.io/?url=https%3A%2F%2Fgithub.com&embed=image.url',
    palette: ['#0D1117', '#F0F6FC', '#2F81F7', '#7EE787']
  },
  logo: {
    url: 'https://api.microlink.io/?url=https%3A%2F%2Fgithub.com&embed=logo.url'
  }
}

const DEMO_LINK = { data: GITHUB_DEMO_DATA }

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroPreviewShell = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: '620px',
    mx: 'auto',
    bg: 'white',
    borderRadius: 3
  })};
  border: ${borders[1]} ${colors.black10};
  box-shadow: 0 1px 2px ${colors.black025};
  overflow: hidden;
`

const HeroInputBar = styled('form')`
  ${theme({
    width: '100%',
    px: 3,
    py: 2,
    bg: 'transparent'
  })};
  display: flex;
  align-items: center;
  gap: 8px;
`

const HeroInput = styled('input')`
  ${theme({
    fontSize: ['13px', '13px', '14px', '14px'],
    fontFamily: 'mono',
    px: 2,
    py: '8px',
    color: 'black',
    bg: 'white',
    borderRadius: 4
  })};
  flex: 1;
  min-width: 0;
  border: ${borders[1]} ${colors.black10};
  letter-spacing: 0;
  outline: none;
  transition: border-color ${transition.short};

  &::placeholder {
    color: ${colors.black40};
  }

  &:hover {
    border-color: ${colors.black20};
  }

  &:focus-visible {
    border-color: ${colors.black40};
  }
`

const HeroPreviewButton = styled('button')`
  ${theme({
    px: 3,
    py: '8px',
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 4
  })};
  background: ${ACCENT};
  border: ${borders[1]} ${ACCENT};
  cursor: pointer;
  letter-spacing: 0;
  flex-shrink: 0;
  transition: opacity ${transition.short};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: ${borders[2]} ${ACCENT};
    outline-offset: ${radii[1]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const CHIP_GROUPS = [
  { id: 'hero', label: 'Hero', variantIds: ['hero'] },
  { id: 'inline', label: 'Inline', variantIds: ['oneline', 'twitter'] },
  {
    id: 'notification',
    label: 'Notification',
    variantIds: ['telegram', 'notification']
  },
  { id: 'chat', label: 'WhatsApp', variantIds: ['chat'] },
  { id: 'tweet', label: 'Tweet', variantIds: ['tweet'] }
]

const HeroVariantBar = styled(Flex)`
  ${theme({
    width: '100%',
    px: [2, 3, 3, 3],
    pt: 2,
    pb: 3,
    bg: 'transparent',
    gap: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  })};
  border-bottom: ${borders[1]} ${colors.black10};
`

const VariantButton = styled('button')`
  ${theme({
    px: 2,
    py: 1,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    borderRadius: 4
  })};
  background: ${({ $active }) => ($active ? colors.black : 'transparent')};
  color: ${({ $active }) => ($active ? colors.white : colors.black70)};
  border: ${borders[1]}
    ${({ $active }) => ($active ? colors.black : colors.black10)};
  cursor: pointer;
  letter-spacing: 0;
  transition: background ${transition.short}, color ${transition.short},
    border-color ${transition.short};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    color: ${({ $active }) => ($active ? colors.white : colors.black)};
    border-color: ${({ $active }) => ($active ? colors.black : colors.black40)};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

const HeroPreviewBody = styled(Box)`
  ${theme({
    width: '100%',
    bg: 'transparent',
    px: [4, 4, 5, 5],
    py: [4, 4, 4, 4]
  })};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  overflow: hidden;
`

const HeroApiBar = styled(Flex)`
  ${theme({
    width: '100%',
    bg: 'black025',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    px: 3,
    py: 2,
    minWidth: 0
  })};
  border-top: ${borders[1]} ${colors.black10};
`

const HeroApiUrl = styled('span')`
  ${theme({
    fontSize: ['12px', '13px', '13px', '13px'],
    fontFamily: 'mono',
    letterSpacing: 0,
    minWidth: 0,
    color: 'black60',
    textAlign: 'left'
  })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;

  strong {
    color: ${colors.black};
    font-weight: bold;
  }
`

const HeroCopyButton = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'black60'
  })};
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, transform ${transition.short};

  &:hover {
    color: ${colors.black};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[2]};
    border-radius: ${radii[2]};
  }

  svg.icon-check {
    color: ${colors.green5};
  }
`

const HeroNerdButton = styled('button')`
  ${theme({
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2
  })};
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 6;
  background: ${({ $active }) => ($active ? colors.white10 : colors.white90)};
  color: ${({ $active }) => ($active ? colors.white : colors.black60)};
  border: ${borders[1]}
    ${({ $active }) => ($active ? colors.white20 : colors.black10)};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: color ${transition.short}, border-color ${transition.short},
    background ${transition.short}, transform ${transition.short};

  &:hover {
    color: ${({ $active }) => ($active ? colors.white : colors.black)};
    border-color: ${({ $active }) =>
      $active ? colors.white40 : colors.black40};
    background: ${({ $active }) => ($active ? colors.white20 : colors.white)};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: ${borders[2]}
      ${({ $active }) => ($active ? colors.white40 : colors.black40)};
    outline-offset: ${radii[1]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  &:disabled:hover {
    color: ${colors.black60};
    border-color: ${colors.black10};
    background: ${colors.white90};
  }
`

const fallbackCopy = text => {
  try {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  } catch {
    return false
  }
}

const Hero = function Hero ({
  data,
  isLoading,
  onSubmit,
  chipId,
  onChipChange,
  response
}) {
  return (
    <Container
      id='hero'
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        px: [3, 3, 4, 5],
        py: SECTION_VERTICAL_SPACING
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', '50%'],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            titleize={false}
            css={theme({
              px: [2, 3, 4, 0],
              fontSize: [4, 4, 5, 5],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Link Preview API{' '}
            <span style={{ whiteSpace: 'nowrap' }}>for developers</span>
          </Heading>
          <Caption
            forwardedAs='h2'
            titleize={false}
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              fontSize: [2, 2, 3, 3],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            One HTTPS call returns normalized metadata for any URL — title,
            description, image, logo, brand palette. Build Slack-style unfurls,
            Discord previews, iMessage cards, or your own custom layout —
            entirely in your own markup.
          </Caption>

          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: 'center',
              justifyContent: ['center', 'center', 'center', 'flex-start'],
              gap: [3, 4, 4, 4]
            })}
          >
            <ArrowLink href='/docs/guides/embed/metadata-api'>
              Build a link preview
            </ArrowLink>
          </Flex>
        </Flex>

        <Flex
          css={theme({
            width: ['100%', '100%', '100%', '50%'],
            minWidth: 0,
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <CapabilityTool
            data={data}
            isLoading={isLoading}
            onSubmit={onSubmit}
            chipId={chipId}
            onChipChange={onChipChange}
            response={response}
          />
        </Flex>
      </Flex>
    </Container>
  )
}

// ─── Response Times ───────────────────────────────────────────────────────────

const Timings = () => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex
      css={theme({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Subhead css={theme({ fontSize: [2, 3, 3, '44px'], color: 'white' })}>
        Fast link previews{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          Cached at the edge, globally
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        justifyContent: ['space-around', 'space-around', 'center', 'center'],
        alignItems: 'baseline',
        px: [4, 4, 4, 0],
        width: '100%',
        maxWidth: layout.normal,
        gap: [1, 3, 4, 5],
        fontVariantNumeric: 'tabular-nums'
      })}
    >
      <Flex
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        })}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: ['28px', '34px', '42px', '42px'],
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          {trimMs(healthcheck.meta.p95_pretty)}
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 1,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
            titleize={false}
          >
            secs
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
          {['P95', 'response time'].map(children => (
            <Caps
              key={children}
              css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
            >
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
      <Hide breakpoints={[0]}>
        <Flex
          css={theme({
            display: 'inline-flex',
            px: [2, 2, 2, 5],
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          })}
        >
          <Subhead
            forwardedAs='div'
            css={theme({
              fontSize: ['28px', '34px', '42px', '42px'],
              color: 'white',
              fontWeight: 'bold'
            })}
          >
            {trimMs(healthcheck.meta.avg_pretty)}
            <Caption
              forwardedAs='div'
              css={theme({
                ml: 1,
                color: 'white',
                display: 'inline',
                fontWeight: 'bold'
              })}
              titleize={false}
            >
              secs
            </Caption>
          </Subhead>
          <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
            {['average', 'response time'].map(children => (
              <Caps
                key={children}
                css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
              >
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>
      </Hide>
      <Flex
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        })}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: ['28px', '34px', '42px', '42px'],
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          99.9
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 1,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
          >
            %
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
          {['SLA', 'Guaranteed'].map(children => (
            <Caps
              key={children}
              css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
            >
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <Block
      forwardedAs='section'
      id='timings'
      flexDirection='column'
      blockOne={blockOne}
      blockTwo={blockTwo}
      css={theme({
        px: 4,
        py: SECTION_VERTICAL_SPACING,
        mt: 4,
        width: '100%',
        maxWidth: '100%',
        backgroundImage: `radial-gradient(
          circle at center right,
          ${colors.blue9} 0%,
          ${colors.blue9} 48%,
          ${colors.blue8} 48%,
          ${colors.blue8} 52%,
          ${colors.blue7} 52%,
          ${colors.blue7} 65%,
          ${colors.blue6} 65%,
          ${colors.blue6} 79%,
          ${ACCENT} 79%,
          ${ACCENT} 100%
        )`,
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
    />
  )
}

// ─── Capabilities ─────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M9 4H8a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1' />
        <path d='M15 4h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1' />
      </svg>
    ),
    title: 'Normalized metadata, ready to render',
    description:
      'Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, and HTML tags collapsed into one predictable JSON shape. Pull title, description, image, logo, publisher, and brand palette from any URL and ship the preview without per-site fallback logic.',
    links: [
      {
        label: 'Build a custom link preview',
        href: '/docs/guides/embed/metadata-api'
      }
    ]
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
      </svg>
    ),
    title: 'Generate previews with AI',
    description:
      'Paste the payload into Cursor, Claude Code, or any AI assistant and let it render a preview built from your own design system — same tokens, same components, no SDK to fight. Six ready-to-paste recipes (hero, inline, tweet, telegram, notification, chat bubble) ship with the guide.',
    links: [
      {
        label: 'AI-generated previews guide',
        href: '/docs/guides/embed/custom-previews-with-ai'
      }
    ]
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      </svg>
    ),
    title: 'Captures URLs behind Cloudflare and CAPTCHAs',
    description:
      'Every URL is rendered through a real headless browser routed via a rotating residential proxy network. Cloudflare, DataDome, PerimeterX, hCaptcha, reCAPTCHA — pages behind antibot walls still come back with full metadata, so your previews stay perfect even when the source would block a scraper. Proxy rotation ships with every Pro plan.',
    links: [
      { label: 'Read about the proxy', href: '/docs/api/parameters/proxy' }
    ]
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' />
        <polyline points='12 6 12 12 16 14' />
      </svg>
    ),
    title: 'JavaScript-rendered pages, captured',
    description:
      'React, Vue, and Next.js sites that inject metadata at runtime are captured as a real visitor sees them — no stale SSR, no empty meta tags. Smart TTL caching keeps responses fresh against source changes while delivering sub-second previews from 240+ Cloudflare edge locations.',
    links: [
      {
        label: 'Headless rendering docs',
        href: '/docs/api/parameters/waitUntil'
      }
    ]
  }
]

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: '40px',
    height: '40px',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};
  color: ${ACCENT};
`

const CapabilityVariantPreview = React.memo(
  function CapabilityVariantPreview ({ chipId, data }) {
    const group = CHIP_GROUPS.find(g => g.id === chipId) || CHIP_GROUPS[0]
    const variants = group.variantIds
      .map(id => PREVIEW_VARIANTS.find(v => v.id === id))
      .filter(Boolean)
    return (
      <Flex
        css={theme({
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: [4, 4, 5, 5]
        })}
      >
        {variants.map(({ id, component: Variant }) => (
          <Variant key={id} data={data} />
        ))}
      </Flex>
    )
  },
  (prev, next) => prev.chipId === next.chipId && prev.data === next.data
)

const normalizeInputUrl = raw => {
  const trimmed = (raw || '').trim()
  if (!trimmed) return null
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`
  try {
    const parsed = new URL(withProtocol)
    if (!parsed.hostname.includes('.')) return null
    return parsed.href
  } catch {
    return null
  }
}

const CapabilityTool = ({
  data,
  isLoading,
  onSubmit,
  chipId,
  onChipChange,
  response
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [showNerdStats, setShowNerdStats] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholderText, setPlaceholderText] = useState(
    INITIAL_PLACEHOLDER_URL
  )
  const copyTimerRef = useRef(null)
  const userInteractedRef = useRef(false)
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  const handleInputChange = e => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true
      setPlaceholderText(data.url || INITIAL_PLACEHOLDER_URL)
    }
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (userInteractedRef.current) return
    onSubmitRef.current(INITIAL_PLACEHOLDER_URL, {
      queryUrl: INITIAL_PLACEHOLDER_URL,
      syncQuery: false
    })
    const timers = []
    let previousUrl = INITIAL_PLACEHOLDER_URL
    let timeOffset = INITIAL_DELAY_MS

    PLACEHOLDER_CYCLE.forEach(nextUrl => {
      const fromUrl = previousUrl
      const toUrl = nextUrl

      const eraseStart = timeOffset
      for (let i = 1; i <= fromUrl.length; i++) {
        timers.push(
          setTimeout(() => {
            if (userInteractedRef.current) return
            setPlaceholderText(fromUrl.slice(0, fromUrl.length - i))
          }, eraseStart + i * TYPING_SPEED_MS)
        )
      }
      timeOffset = eraseStart + fromUrl.length * TYPING_SPEED_MS

      const typeStart = timeOffset
      for (let i = 1; i <= toUrl.length; i++) {
        timers.push(
          setTimeout(() => {
            if (userInteractedRef.current) return
            setPlaceholderText(toUrl.slice(0, i))
          }, typeStart + i * TYPING_SPEED_MS)
        )
      }
      timeOffset = typeStart + toUrl.length * TYPING_SPEED_MS

      timers.push(
        setTimeout(() => {
          if (userInteractedRef.current) return
          onSubmitRef.current(toUrl, { queryUrl: toUrl, syncQuery: false })
        }, timeOffset + HOLD_AFTER_TYPING_MS)
      )

      timeOffset += HOLD_AFTER_TYPING_MS
      previousUrl = toUrl
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  const handleInputSubmit = e => {
    e.preventDefault()
    if (isLoading) return
    const normalized = normalizeInputUrl(inputValue)
    if (!normalized || normalized === data.url) return
    trackEvent('demo submit', { product: 'link-preview' })
    setShowNerdStats(false)
    onSubmit(normalized, { queryUrl: normalized, syncQuery: false })
  }

  const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(data.url)}`
  const nerdStats = extractNerdStats(response?.headers)
  const nerdQuery = buildMqlQuery(data.url, { meta: true })
  const nerdResponse = JSON.stringify(data, null, 2)

  const handleCopy = () => {
    const markCopied = () => {
      setIsCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setIsCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(apiUrl)
        .then(markCopied)
        .catch(() => {
          if (fallbackCopy(apiUrl)) markCopied()
        })
    } else if (fallbackCopy(apiUrl)) {
      markCopied()
    }
  }

  return (
    <Box css={theme({ width: '100%' })}>
      <HeroPreviewShell>
        <HeroInputBar onSubmit={handleInputSubmit}>
          <HeroInput
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholderText}
            aria-label='URL to preview'
            spellCheck={false}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
          />
          <HeroPreviewButton
            type='submit'
            disabled={isLoading}
            aria-label={isLoading ? 'Loading preview' : 'Preview URL'}
            aria-busy={isLoading}
          >
            {isLoading ? 'Loading…' : 'Preview'}
          </HeroPreviewButton>
        </HeroInputBar>

        <HeroVariantBar role='radiogroup' aria-label='Pick a preview style'>
          {CHIP_GROUPS.map(group => {
            const isActive = group.id === chipId
            return (
              <VariantButton
                key={group.id}
                type='button'
                role='radio'
                aria-checked={isActive}
                $active={isActive}
                onClick={() => onChipChange(group.id)}
              >
                {group.label}
              </VariantButton>
            )
          })}
        </HeroVariantBar>

        <HeroPreviewBody>
          <CapabilityVariantPreview chipId={chipId} data={data} />
          <HeroNerdButton
            type='button'
            $active={showNerdStats}
            disabled={!nerdStats}
            onClick={() => setShowNerdStats(s => !s)}
            aria-label={showNerdStats ? 'Hide nerd stats' : 'Show nerd stats'}
            aria-pressed={showNerdStats}
          >
            {showNerdStats
              ? (
                <CloseIcon size={16} aria-hidden='true' />
                )
              : (
                <TerminalIcon size={16} aria-hidden='true' />
                )}
          </HeroNerdButton>
          {showNerdStats && nerdStats && (
            <NerdStatsOverlay
              stats={nerdStats}
              mqlQuery={nerdQuery}
              responseData={nerdResponse}
            />
          )}
        </HeroPreviewBody>

        <HeroApiBar>
          <HeroApiUrl>
            https://api.microlink.io?
            <strong>url={data.url}</strong>
          </HeroApiUrl>
          <HeroCopyButton
            type='button'
            onClick={handleCopy}
            aria-label={isCopied ? 'Copied!' : 'Copy API URL'}
          >
            {isCopied
              ? (
                <svg
                  className='icon-check'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M3 8l3.5 3.5L13 4.5'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                )
              : (
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
                  />
                </svg>
                )}
          </HeroCopyButton>
        </HeroApiBar>
      </HeroPreviewShell>
    </Box>
  )
}

const CAPABILITY_STACK_VARIANT_IDS = [
  'hero',
  'oneline',
  'telegram',
  'notification',
  'tweet'
]

const CAPABILITY_STACK_FADE_MASK = `linear-gradient(
  to bottom,
  transparent 0,
  #000 12%,
  #000 88%,
  transparent 100%
)`

const CapabilityStackFrame = styled(Box)`
  ${theme({
    width: '100%',
    height: ['360px', '420px', '100%', '100%'],
    minHeight: ['360px', '420px', '520px', '600px']
  })};
  position: relative;
  overflow: hidden;
  -webkit-mask-image: ${CAPABILITY_STACK_FADE_MASK};
  mask-image: ${CAPABILITY_STACK_FADE_MASK};
`

const CapabilityStackInner = styled(Flex)`
  ${theme({
    width: '100%',
    gap: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    px: [2, 2, 0, 0]
  })};
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CapabilityPreviewStack = ({ data }) => {
  const variants = CAPABILITY_STACK_VARIANT_IDS.map(id =>
    PREVIEW_VARIANTS.find(v => v.id === id)
  ).filter(Boolean)
  return (
    <CapabilityStackFrame aria-hidden='true'>
      <CapabilityStackInner>
        {variants.map(({ id, component: Variant }) => (
          <Variant key={id} data={data} />
        ))}
      </CapabilityStackInner>
    </CapabilityStackFrame>
  )
}

const Capabilities = ({ data }) => (
  <Container
    id='capabilities'
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'pinky',
      px: [3, 3, 4, 5],
      py: [5, 5, 6, 6]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', '50%'],
          minWidth: 0,
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <CapabilityPreviewStack data={data} />
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', '50%'],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          gap: [3, 3, 4, 4]
        })}
      >
        <Subhead
          css={theme({
            fontSize: [3, 4, 4, 4],
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          One payload,
          <LineBreak />
          <span css={{ color: ACCENT }}>every preview style</span>
        </Subhead>
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black80',
            lineHeight: 1.5,
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          The Microlink link preview API normalizes every metadata source into a
          single JSON response. Render it as a Slack-style hero card, a Telegram
          bubble, an iOS notification, a WhatsApp chat preview — same fields,
          your markup.
        </Text>
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black60',
            lineHeight: 1.5,
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          Need a ready-to-paste iframe instead? See the{' '}
          <Link href='/embed'>Embed API</Link>.
        </Text>
        <Flex
          css={[
            theme({ gap: [3, 3, 3, 4], width: '100%' }),
            { flexDirection: 'column' }
          ]}
        >
          {CAPABILITIES.map(({ icon, title, description, links }) => (
            <CapabilityItem key={title}>
              <CapabilityIcon>{icon}</CapabilityIcon>
              <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2]
                  })}
                >
                  {title}
                </Text>
                <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
                  {description}
                </Text>
                {links && (
                  <Flex
                    css={theme({
                      pt: 1,
                      gap: 3,
                      flexWrap: 'wrap',
                      fontSize: [1, 1, 2, 2]
                    })}
                  >
                    {links.map(({ label, href }) => (
                      <Link key={href} href={href}>
                        {label}
                      </Link>
                    ))}
                  </Flex>
                )}
              </Flex>
            </CapabilityItem>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </Container>
)

// ─── Copy. Paste. Preview. ────────────────────────────────────────────────────

const CopyPastePreview = ({ data }) => (
  <Container
    as='section'
    id='copy-paste-preview'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      py: [5, 5, 6, 6],
      px: [3, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'center',
        justifyContent: 'center',
        gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '50%', '50%'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: ['center', 'center', 'flex-start', 'flex-start']
        })}
      >
        <Subhead
          variant='gradient'
          css={theme({
            fontSize: [3, 4, 5, 5],
            textAlign: ['center', 'center', 'left', 'left'],
            width: '100%'
          })}
        >
          Copy. Paste. Preview.
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: layout.normal,
            fontSize: [2, 2, 3, 3],
            textAlign: ['center', 'center', 'left', 'left']
          })}
        >
          One API call returns every piece of metadata you need — title,
          description, image, logo, palette. Map those fields to your own
          components — Slack hero cards, Telegram bubbles, iOS notifications,
          WhatsApp chat previews — all from the same payload.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: [2, 2, 3, 3],
            flexDirection: ['column', 'row', 'row', 'row'],
            alignItems: 'center',
            justifyContent: ['center', 'center', 'flex-start', 'flex-start'],
            gap: [3, 4, 4, 4]
          })}
        >
          <ArrowLink href='/docs/guides/embed/custom-previews-with-ai#the-base-prompt'>
            Generate previews with a prompt
          </ArrowLink>
        </Flex>
      </Flex>
      <Flex
        css={[
          theme({
            width: ['100%', '100%', '50%', '50%'],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: [0, 0, 2, 2],
            pb: [2, 2, 4, 4],
            px: [0, 0, 0, 0]
          }),
          {
            '& > div, & > div > div:first-child': {
              width: '100%'
            },
            '& > div > div:first-child': {
              boxShadow: `0 24px 64px ${colors.black20}, 0 4px 16px ${colors.black10}`
            }
          }
        ]}
      >
        <MultiCodeEditorInteractive height={220} mqlCode={{ url: data.url }} />
      </Flex>
    </Flex>
  </Container>
)

// ─── Clients ──────────────────────────────────────────────────────────────────

const [
  {
    reqs_pretty: reqsPretty,
    cached_reqs_percentage: cachedReqsPercentage,
    bytes_pretty: bytesPretty
  }
] = analyticsData

const analyticsBytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  return `${Number(value).toFixed(0)}${unit}`
})()

const STATS = [
  { value: reqsPretty, label: 'reqs per month' },
  { value: cachedReqsPercentage, label: 'cache hit rate' },
  { value: analyticsBytes, label: 'data served' }
]

const CLIENTS_STATS_VALUE_FONT_SIZE = [3, 3, '42px']
const CLIENTS_STATS_LABEL_FONT_SIZE = [0, 1, 1, 1]

const CLIENTS = [
  {
    name: 'Community',
    description: 'Fan engagement platform',
    url: 'https://community.com',
    logo: (
      <img
        src='/images/clients/community.com.png'
        alt='Community'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Impact',
    description: 'Partnership management',
    url: 'https://impact.com',
    logo: (
      <img
        src='/images/clients/impact.com.png'
        alt='Impact'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Mirror',
    description: 'Web3 publishing platform',
    url: 'https://mirror.xyz',
    logo: (
      <img
        src='/images/clients/mirror.xyz.png'
        alt='Mirror'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Padlet',
    description: 'Visual collaboration tool',
    url: 'https://padlet.com',
    logo: (
      <img
        src='/images/clients/padlet.com.png'
        alt='Padlet'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'SkedSocial',
    description: 'Marketing platform',
    url: 'https://skedsocial.com',
    logo: (
      <img
        src='/images/clients/skedsocial.com.png'
        alt='Sked Social'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  }
]

const ClientLogo = styled(Flex)`
  ${theme({ textDecoration: 'none' })};
  color: inherit;
  transition: transform ${transition.short};

  &:hover {
    transform: translateY(-${radii[1]}) scale(1.05);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
    border-radius: ${radii[3]};
  }
`

const StatSeparator = styled(Box)`
  ${theme({ width: '1px', alignSelf: 'stretch', bg: 'black10' })};
`

const Clients = () => (
  <Container
    id='clients'
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      pt: [3, 3, 2, 2],
      pb: [5, 5, 6, 6]
    })}
  >
    <Caps
      css={theme({
        fontSize: [1, 1, 2, 2],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3
      })}
    >
      Last month usage
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 0, 0],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [3, 4, 5, 5],
        maxWidth: layout.large,
        width: '100%',
        fontVariantNumeric: 'tabular-nums',
        flexWrap: ['wrap', 'nowrap', 'nowrap', 'nowrap']
      })}
    >
      {STATS.map(({ value, label }, index) => (
        <React.Fragment key={label}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              px: [3, 2, 3, 3],
              mt: index === STATS.length - 1 ? [2, 0, 0, 0] : undefined
            })}
          >
            <Subhead
              forwardedAs='div'
              titleize={false}
              css={theme({
                fontSize: CLIENTS_STATS_VALUE_FONT_SIZE,
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              {value}
            </Subhead>
            <Caps
              css={theme({
                pt: 1,
                fontSize: CLIENTS_STATS_LABEL_FONT_SIZE,
                fontWeight: 'bold',
                color: 'black80',
                whiteSpace: 'nowrap',
                lineHeight: 0
              })}
            >
              {label}
            </Caps>
          </Flex>
          {index < STATS.length - 1 && (
            <StatSeparator
              css={theme({
                display: ['none', 'none', 'block', 'block']
              })}
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
    <Caps
      css={theme({
        pt: [4, 4, 5, 5],
        fontSize: [1, 1, 2, 2],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3,
        pb: [3, 3, 0, 0]
      })}
    >
      some clients
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 4, 0],
        flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [4, 4, 5, 5],
        maxWidth: layout.large
      })}
    >
      {CLIENTS.map(({ name, description, logo, url }) => (
        <ClientLogo
          as='a'
          key={name}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${name}`}
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          })}
        >
          <Box css={theme({ color: 'black' })}>{logo}</Box>
          <Text
            css={theme({
              fontWeight: 'bold',
              fontSize: 1,
              color: 'black'
            })}
          >
            {name}
          </Text>
          <Text
            css={theme({ fontSize: 0, color: 'black80', textAlign: 'center' })}
          >
            {description}
          </Text>
        </ClientLogo>
      ))}
    </Flex>
  </Container>
)

// ─── Pricing ──────────────────────────────────────────────────────────────────

const Pricing = () => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()
  const currencyState = useCurrency()

  return (
    <CurrencyContext.Provider value={currencyState}>
      <Box as='section' id='pricing' css={theme({ bg: 'pinky' })}>
        <Container
          css={theme({
            alignItems: 'center',
            maxWidth: '100%',
            pt: [5, 5, 6, 6]
          })}
        >
          <Subhead
            variant='gradient'
            css={theme({ fontSize: ['34px', '42px', '54px', '62px'] })}
          >
            Start free, scale when ready
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              maxWidth: layout.normal
            })}
          >
            No login. No credit card. Preview any URL on the free tier — upgrade
            when production traffic kicks in. Proxy rotation ships with every
            Pro plan.
          </Caption>
        </Container>
        <Plans
          canonicalUrl={canonicalUrl}
          stripeKey={stripeKey}
          footer='compare'
        />
      </Box>
    </CurrencyContext.Provider>
  )
}

// ─── Open Source ──────────────────────────────────────────────────────────────

const REPOS = [
  {
    name: 'metascraper',
    org: 'microlinkhq',
    description:
      'The rule-based library that powers Microlink link previews. Normalize Open Graph, JSON-LD, Twitter Cards, microdata, RDFa, oEmbed, and HTML tags from any URL.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '2.6k',
    primary: true
  },
  {
    name: 'browserless',
    org: 'microlinkhq',
    description:
      'The headless Chrome/Chromium driver on top of Puppeteer. Renders JavaScript-heavy pages so metadata injected at runtime is captured every time.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '1.8k'
  },
  {
    name: 'sdk',
    org: 'microlinkhq',
    description:
      'Drop-in React, Vue, and vanilla JS preview component. The same metadata payload, rendered without writing markup.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '616'
  }
]

const RepoCard = styled('a')`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    borderRadius: 4,
    bg: 'white'
  })};
  border: ${borders[1]} ${colors.black10};
  text-decoration: none;
  color: inherit;
  transition: border-color ${transition.short}, box-shadow ${transition.short},
    background ${transition.short};

  .repo-github-icon {
    transition: fill ${transition.short};
  }

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};

    .repo-github-icon {
      fill: ${colors.black};
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
  }
`

const RepoCardPrimary = styled(RepoCard)`
  ${theme({ p: 3 })};
  border: ${borders[1]} ${colors.black10};

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};
  }
`

const RepoMeta = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3,
    fontSize: 0,
    fontFamily: 'sans',
    color: 'black60'
  })};
`

const LanguageDot = styled('span')`
  ${theme({ width: fontSizes[0], height: fontSizes[0] })};
  background: ${({ $color }) => $color};
  border-radius: 50%;
  flex-shrink: 0;
`

const GithubMarkPath = (
  <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
)

const OpenSource = () => (
  <Container
    as='section'
    id='open-source'
    css={theme({
      alignItems: 'center',
      width: '100%',
      py: [5, 5, 6, 6],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: HERO_LAYOUT.gap
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '85%', '100%'],
            flexDirection: 'column',
            gap: [3, 3, 4, 4]
          })}
        >
          {REPOS.filter(r => r.primary).map(repo => (
            <RepoCardPrimary
              key={repo.name}
              href={`https://github.com/${repo.org}/${repo.name}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Flex css={theme({ alignItems: 'center', gap: '10px' })}>
                <svg
                  className='repo-github-icon'
                  width='20'
                  height='20'
                  viewBox='0 0 16 16'
                  fill={colors.black80}
                  aria-hidden='true'
                >
                  {GithubMarkPath}
                </svg>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [2, 2, 3, 3],
                    color: 'black80'
                  })}
                >
                  {repo.name}
                </Text>
              </Flex>
              <Text
                css={theme({
                  fontSize: [1, 1, 2, 2],
                  color: 'black60',
                  lineHeight: 1.4
                })}
              >
                {repo.description}
              </Text>
              <RepoMeta css={theme({ fontSize: 1 })}>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <LanguageDot $color={repo.languageColor} />
                  {repo.language}
                </Flex>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <StarIcon size={16} aria-hidden='true' />
                  {getRepoStarsLabel(repo)}
                </Flex>
              </RepoMeta>
            </RepoCardPrimary>
          ))}

          <Flex
            css={theme({
              gap: [3, 3, 4, 4],
              flexDirection: ['column', 'column', 'row', 'row']
            })}
          >
            {REPOS.filter(r => !r.primary).map(repo => (
              <RepoCard
                key={repo.name}
                href={`https://github.com/${repo.org}/${repo.name}`}
                target='_blank'
                rel='noopener noreferrer'
                css={theme({ flex: 1 })}
              >
                <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                  <svg
                    className='repo-github-icon'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill={colors.black60}
                    aria-hidden='true'
                  >
                    {GithubMarkPath}
                  </svg>
                  <Text
                    css={theme({
                      fontWeight: 'bold',
                      fontSize: [2, 2, 2, 2],
                      color: 'black'
                    })}
                  >
                    {repo.name}
                  </Text>
                </Flex>
                <Text
                  css={theme({
                    color: 'black60',
                    fontSize: 1,
                    lineHeight: 1.4,
                    flex: 1
                  })}
                >
                  {repo.description}
                </Text>
                <RepoMeta>
                  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                    <LanguageDot $color={repo.languageColor} />
                    {repo.language}
                  </Flex>
                  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                    <StarIcon size={14} aria-hidden='true' />
                    {getRepoStarsLabel(repo)}
                  </Flex>
                </RepoMeta>
              </RepoCard>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          order: [-1, -1, -1, 0]
        })}
      >
        <Subhead
          css={theme({
            textAlign: ['center', 'center', 'center', 'left'],
            fontSize: [3, 3, 4, 4],
            width: '100%'
          })}
        >
          Built on <span css={{ color: ACCENT }}>open source</span>,
          <br />
          trusted by developers
        </Subhead>
        <Caption
          css={theme({
            pt: [3, 3, 4, 4],
            px: [4, 4, 4, 0],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          Microlink link previews are powered by{' '}
          <Link href='https://github.com/microlinkhq/metascraper'>
            metascraper
          </Link>{' '}
          and{' '}
          <Link href='https://github.com/microlinkhq/browserless'>
            browserless
          </Link>{' '}
          — battle-tested libraries used by thousands of developers worldwide.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            width: '100%',
            justifyContent: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <ArrowLink
            href='https://github.com/microlinkhq'
            css={theme({ fontSize: [2, 2, 3, 3] })}
          >
            Explore on GitHub
          </ArrowLink>
        </Flex>
      </Flex>
    </Flex>
  </Container>
)

// ─── Playground ───────────────────────────────────────────────────────────────

const PLAYGROUND_TOOL_PATHS = ['/tools/embed-url']
const EMBEDDING_TOOLS =
  TOOL_CATALOG.find(section => section.category === 'Embedding')?.tools ?? []
const PLAYGROUND_TOOLS = PLAYGROUND_TOOL_PATHS.map(path =>
  EMBEDDING_TOOLS.find(tool => tool.href === path)
).filter(Boolean)

const livePulse = keyframes`
  0%, 62% { color: inherit; }
  70%, 90% { color: ${ACCENT}; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${ACCENT};
  }
`

const Playground = () => (
  <Container
    as='section'
    id='playground'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: [2, 2, 3, 3],
      pb: [4, 4, 5, 5],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      })}
    >
      <Subhead
        css={theme({
          fontSize: ['28px', '36px', '46px', '46px'],
          textAlign: 'center'
        })}
      >
        Try it <LiveText>live</LiveText>, right now
      </Subhead>
      <Caption
        css={theme({
          px: [4, 4, 4, 0],
          fontSize: ['20px', '20px', '24px', '24px'],
          maxWidth: layout.large,
          textAlign: 'center'
        })}
      >
        Skip the setup. Paste any URL and our interactive tool returns the link
        preview payload — copy the JSON, copy individual fields, or prototype
        your own card.
      </Caption>

      <Flex
        css={theme({
          width: '100%',
          justifyContent: 'center',
          maxWidth: layout.large,
          pt: 4,
          gap: [4, 4, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['center', 'center', 'stretch', 'stretch']
        })}
      >
        {PLAYGROUND_TOOLS.map(tool => (
          <Box
            key={tool.href}
            css={theme({
              width: '100%',
              maxWidth: ['550px', '550px', '720px', '720px'],
              flex: [null, null, 1, 1]
            })}
          >
            <FeaturedToolCard
              {...tool}
              cardCss={{ height: '100%' }}
              titleCss={{ fontSize: [2, 2, 2, 2] }}
              descriptionCss={{ color: 'black60' }}
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  </Container>
)

// ─── Features Grid ────────────────────────────────────────────────────────────

const LINK_PREVIEW_FEATURES = [
  {
    title: 'Unified Link Preview Payload',
    description:
      'Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and raw HTML merged into one predictable JSON response. The same fields for every URL — no per-site fallback logic.'
  },
  {
    title: 'Brand-Ready Visuals',
    description:
      'High-resolution image, logo, favicon, and dominant color palette returned alongside the text. Theme link previews and chat unfurls without manual art direction.'
  },
  {
    title: 'JavaScript-Rendered Pages',
    description:
      'Full headless browser execution means React, Vue, and Next.js sites that inject meta tags at runtime are captured correctly every time — no stale SSR required.'
  },
  {
    title: 'Proxy Rotation Behind CAPTCHAs',
    description:
      'Rotating residential proxies and real headless browsers reach pages behind Cloudflare, DataDome, PerimeterX, hCaptcha, and reCAPTCHA — included with every Pro plan.'
  },
  {
    title: 'Global Edge Delivery',
    description:
      'Link preview responses are cached and distributed across 240+ Cloudflare edge locations, ensuring sub-second URL previews and feed ingestion worldwide.'
  },
  {
    title: 'Plain HTTPS, No SDK Required',
    description:
      'A single GET request returns the link preview payload. Call it from any backend, edge runtime, browser, or static site — no library install needed.'
  },
  {
    title: 'Smart TTL Caching',
    description:
      'Configure Time-To-Live caching rules to keep your link previews fresh against source changes while maintaining sub-second API performance at scale.'
  },
  {
    title: 'AI-Friendly by Design',
    description:
      'Paste the payload into Cursor, Claude Code, or any AI assistant and let it generate a preview component built from your own design tokens — no SDK, no wrapper.'
  },
  {
    title: 'Free to Start',
    description:
      'Preview any URL immediately. 50 requests per day on the free tier — no setup fees, no credit card, and pay-as-you-grow pricing once production traffic kicks in.'
  }
]

// ─── Call to Action ───────────────────────────────────────────────────────────

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_LEAD_TEXT = 'Preview'
const CTA_LEAD_CHARS = CTA_LEAD_TEXT.split('')
const CTA_CHAR_PCT = CTA_SWEEP_PCT / CTA_LEAD_CHARS.length

const ctaCharAnim = index => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: ${ACCENT}; }
  `
}

const ctaAnims = Array.from({ length: CTA_LEAD_CHARS.length }, (_, i) =>
  ctaCharAnim(i)
)

const CtaChar = styled('span')`
  animation: ${({ $i }) => ctaAnims[$i]} ${CTA_DURATION}s step-end infinite;
`

const ctaNowAnim = keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${ACCENT}; }
`

const CtaNow = styled('span')`
  animation: ${ctaNowAnim} ${CTA_DURATION}s step-end infinite;
`

const CallToAction = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        css={theme({
          fontSize: [4, 4, 5, 5],
          textAlign: 'center'
        })}
      >
        {CTA_LEAD_CHARS.map((char, i) => (
          <CtaChar key={i} $i={i}>
            {char}
          </CtaChar>
        ))}{' '}
        <CtaNow>any URL</CtaNow>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center',
          fontSize: [2, 2, 3, 3]
        })}
      >
        Call the link preview API directly for the metadata payload, then render
        the card style that fits your product — hero, inline, chat bubble,
        notification, or your own. Free to start, no credit card.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/docs/guides/embed/metadata-api'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Build a link preview
        </ArrowLink>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {['No login needed', '50 reqs/day free', 'No credit card'].map(
          label => (
            <Flex
              key={label}
              css={theme({
                alignItems: 'center',
                gap: 1,
                color: 'black80',
                fontSize: [0, 0, 1, 1]
              })}
            >
              <CheckIcon size={16} color={colors.close} />
              <Text as='span'>{label}</Text>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  </Container>
)

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const TOP_FAQ_ITEMS = [
  {
    question: 'What is a link preview API?',
    text: 'A link preview API takes any URL as input and returns the structured metadata behind it — title, description, image, logo, publisher, brand palette, and more — in a single JSON response. You can then render that data as a rich preview card, an unfurled chat message, a Twitter / X summary, or any layout that fits your product. Microlink merges Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and raw HTML tags into one predictable shape, so every URL returns the same fields.',
    answer: (
      <>
        <div>
          A <b>link preview API</b> takes any URL as input and returns the
          structured metadata behind it — <code>title</code>,{' '}
          <code>description</code>, <code>image</code>, <code>logo</code>,{' '}
          <code>publisher</code>, brand palette, and more — in a single JSON
          response.
        </div>
        <div>
          Microlink merges <b>Open Graph</b>, <b>Twitter Cards</b>,{' '}
          <b>JSON-LD</b>, <b>oEmbed</b>, microdata, RDFa, and raw HTML tags into
          one predictable shape, so every URL returns the same fields. See the{' '}
          <Link href='/docs/guides/embed/metadata-api'>metadata API guide</Link>{' '}
          for the full response.
        </div>
      </>
    )
  },
  {
    question: 'What is link unfurling, and how do I unfurl URLs?',
    text: 'Link unfurling is the process of expanding a plain URL into a rich preview — the way Slack, Discord, WhatsApp, Telegram, and iMessage turn a pasted link into a card with title, description, image, and logo. To unfurl a URL programmatically, fetch its metadata with Microlink and render the response as a card. The same payload powers every preview style: Slack-style hero card, Telegram bubble, iOS notification, WhatsApp chat preview, or your own custom layout.',
    answer: (
      <>
        <div>
          <b>Link unfurling</b> is the process of expanding a plain URL into a
          rich preview — the way Slack, Discord, WhatsApp, Telegram, and
          iMessage turn a pasted link into a card with title, description,
          image, and logo.
        </div>
        <div>
          To unfurl a URL programmatically, call the Microlink link preview API
          and render the response in your own markup. See the{' '}
          <Link href='/docs/guides/embed/metadata-api'>
            metadata API with custom HTML/CSS guide
          </Link>{' '}
          for a worked example.
        </div>
      </>
    )
  },
  {
    question: 'Is there a free link preview API?',
    text: 'Yes. The Microlink link preview API is free with 50 requests per day — no login, no credit card, no setup. Cached responses served from 240+ Cloudflare edge locations do not count against your daily limit. For production workloads, Pro plans start at €39 per month and include rotating proxy support, higher rate limits, and priority response.',
    answer: (
      <>
        <div>
          Yes. The Microlink{' '}
          <b>link preview API is free with 50 requests per day</b> — no login,
          no credit card, no setup. Cached responses served from 240+ Cloudflare
          edge locations do not count against your daily limit.
        </div>
        <div>
          For production workloads, <Link href='/pricing'>Pro plans</Link> start
          at €39 per month and include rotating proxy support, higher rate
          limits, and priority response.
        </div>
      </>
    )
  },
  {
    question: 'How is this different from oEmbed or an embed API?',
    text: "oEmbed is the open spec providers like YouTube, Spotify, and Twitter implement to expose ready-to-paste embed HTML — usually an interactive iframe. An embed API like Microlink's /embed product wraps oEmbed and falls back to scraping where the provider does not support it. The link preview API focuses on the underlying data: it returns the normalized metadata payload, and leaves the rendering entirely up to you. Choose link previews when you want to control the markup; choose embeds when you want the provider's native player.",
    answer: (
      <>
        <div>
          <Link href='https://oembed.com'>oEmbed</Link> is the open spec
          providers like YouTube, Spotify, and Twitter implement to expose
          ready-to-paste embed HTML — usually an interactive iframe. The{' '}
          <Link href='/embed'>Microlink embed API</Link> wraps oEmbed and falls
          back to scraping where the provider does not support it.
        </div>
        <div>
          The link preview API focuses on the underlying data: it returns the
          normalized metadata payload, and leaves the rendering entirely up to
          you. Choose link previews when you want to control the markup; choose
          embeds when you want the provider's native player.
        </div>
      </>
    )
  },
  {
    question: 'How do I build a custom URL preview from the API response?',
    text: 'Fetch the metadata payload from https://api.microlink.io?url=YOUR_URL, then read data.title, data.description, data.image.url, data.logo.url, data.publisher, and data.image.palette. Map those fields into your own markup — whatever HTML and CSS fits your design system. The metadata-api guide ships a worked example, and the custom-previews-with-ai guide includes six recipes (hero card, inline, tweet, telegram, notification, chat bubble) you can paste into Cursor or Claude Code.',
    answer: (
      <>
        <div>
          Fetch the payload from{' '}
          <code>https://api.microlink.io?url=YOUR_URL</code> and read{' '}
          <code>data.title</code>, <code>data.description</code>,{' '}
          <code>data.image.url</code>, <code>data.logo.url</code>,{' '}
          <code>data.publisher</code>, and <code>data.image.palette</code>. Map
          those fields into your own markup — whatever HTML and CSS fits your
          design system.
        </div>
        <div>
          The{' '}
          <Link href='/docs/guides/embed/metadata-api'>
            metadata API with custom HTML/CSS
          </Link>{' '}
          guide ships a worked example. For ready-made layouts you can paste
          into Cursor or Claude Code, see{' '}
          <Link href='/docs/guides/embed/custom-previews-with-ai'>
            generate custom previews with AI
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question:
      'Can Microlink preview URLs behind Cloudflare, antibot walls, or CAPTCHAs?',
    text: 'Yes. Microlink routes requests through a rotating residential proxy network and renders pages in a real headless browser, so it can fetch URLs protected by Cloudflare, DataDome, PerimeterX, hCaptcha, reCAPTCHA, and similar anti-bot systems. The response shape stays identical — title, description, image, logo, palette — so URLs that would normally return 403 or block a scraper still come back with a perfect preview. Proxy rotation is included with every Pro plan.',
    answer: (
      <>
        <div>
          Yes. Microlink routes requests through a{' '}
          <b>rotating residential proxy network</b> and renders pages in a real
          headless browser. URLs gated by Cloudflare, DataDome, PerimeterX,
          hCaptcha, reCAPTCHA, or similar anti-bot systems are fetched and
          rendered the same way a real visitor sees them.
        </div>
        <div>
          The response shape stays identical — <code>title</code>,{' '}
          <code>description</code>, <code>image</code>, <code>logo</code>,{' '}
          <code>palette</code> — so URLs that would normally return{' '}
          <code>403</code> still come back with a perfect preview. Proxy
          rotation is <b>included with every Pro plan</b>; see the{' '}
          <Link href='/docs/api/parameters/proxy'>proxy parameter</Link> for
          configuration.
        </div>
      </>
    )
  },
  {
    question: 'Does the link preview API support PDFs, images, and media?',
    text: 'Yes. Pass any URL — webpage, PDF, image, video, audio, or social media post — and the link preview API returns the matching metadata. PDFs return title, author, and page count. Images return dimensions and a dominant color palette. Audio and video URLs return embeddable player metadata when available. The response shape stays the same; the relevant fields populate based on what the URL exposes.',
    answer: (
      <>
        <div>
          Yes. Pass any URL — webpage, PDF, image, video, audio, or social media
          post — and the link preview API returns the matching metadata.
        </div>
        <Faq.List as='ul'>
          <li>
            <b>PDFs</b>: title, author, page count.
          </li>
          <li>
            <b>Images</b>: dimensions, dominant color palette.
          </li>
          <li>
            <b>Audio / video</b>: embeddable player metadata when available.
          </li>
          <li>
            <b>Social posts</b>: oEmbed-normalized title, author, image.
          </li>
        </Faq.List>
      </>
    )
  },
  {
    question: 'How does Microlink handle JavaScript-rendered pages and SPAs?',
    text: 'Every Microlink link preview request runs in a real headless browser via the open source browserless driver. React, Vue, Next.js, Svelte, and other SPAs that inject metadata at runtime are captured correctly — the API waits for the DOM to settle before extracting tags. This is the same architecture used by Slack, Discord, and other unfurl previews, but exposed as a single HTTPS endpoint you can call from your backend.',
    answer: (
      <>
        <div>
          Every Microlink request runs in a real headless browser via the{' '}
          <Link href='https://github.com/microlinkhq/browserless'>
            browserless
          </Link>{' '}
          driver. React, Vue, Next.js, Svelte, and other SPAs that inject
          metadata at runtime are captured correctly — the API waits for the DOM
          to settle before extracting tags.
        </div>
        <div>
          This is the same architecture used by Slack and Discord for unfurl
          previews, but exposed as a single HTTPS endpoint you can call from
          your backend.
        </div>
      </>
    )
  },
  {
    question: 'How fresh are the link previews?',
    text: 'Every response is cached at the edge with a configurable TTL. By default Microlink keeps previews fresh by re-fetching the URL after the TTL window expires; you can override the TTL per request to balance freshness against latency. Cached responses are served from 240+ Cloudflare locations in milliseconds and do not count against your daily quota.',
    answer: (
      <>
        <div>
          Every response is cached at the edge with a configurable TTL. By
          default Microlink keeps previews fresh by re-fetching the URL after
          the TTL window expires; you can override the{' '}
          <Link href='/docs/api/parameters/ttl'>TTL parameter</Link> per request
          to balance freshness against latency.
        </div>
        <div>
          Cached responses are served from <b>240+ Cloudflare locations</b> in
          milliseconds and do not count against your daily quota.
        </div>
      </>
    )
  },
  {
    question: 'Can I use AI to generate the preview component?',
    text: 'Yes — and we recommend it. Microlink ships a guide with the exact base prompt to paste into Cursor, Claude Code, or any AI assistant. The prompt teaches the assistant the response shape and asks it to build a preview component using your own design system. Six ready-made recipes are bundled (hero card, inline, tweet, telegram, notification, chat bubble). No SDK to install, no wrapper to override — just your markup, your tokens.',
    answer: (
      <>
        <div>
          Yes — and we recommend it. Microlink ships a guide with the exact base
          prompt to paste into Cursor, Claude Code, or any AI assistant. Six
          ready-made recipes are bundled (hero card, inline, tweet, telegram,
          notification, chat bubble).
        </div>
        <div>
          See{' '}
          <Link href='/docs/guides/embed/custom-previews-with-ai'>
            generate custom previews with AI
          </Link>{' '}
          for the prompt and the recipes.
        </div>
      </>
    )
  },
  {
    question: 'How fast is the link preview API?',
    text: 'Cold responses settle in the low-second range; cached responses return in milliseconds. We publish live P95 and average response times for the metadata endpoint on the status page. Cached responses are served globally from 240+ Cloudflare edge locations, and every plan ships with a 99.9% uptime SLA.',
    answer: (
      <>
        <div>
          Cold responses settle in the low-second range; cached responses return
          in milliseconds. We publish live P95 and average response times on the{' '}
          <Link href='/status'>status page</Link>.
        </div>
        <div>
          Cached responses are served globally from{' '}
          <b>240+ Cloudflare edge locations</b>, and every plan ships with a{' '}
          <b>99.9% uptime SLA</b>.
        </div>
      </>
    )
  },
  {
    question: 'What happens to my data?',
    text: 'Microlink does not store the body of the pages it fetches — only the normalized metadata payload, cached for the configured TTL window. No login is required for the free tier, and Pro accounts can rotate API keys at any time. Source URLs and response payloads are not used to train any model.',
    answer: (
      <>
        <div>
          Microlink does not store the body of the pages it fetches — only the
          normalized metadata payload, cached for the configured TTL window.
        </div>
        <div>
          No login is required for the free tier, and Pro accounts can rotate
          API keys at any time. Source URLs and response payloads are{' '}
          <b>not used to train any model</b>.
        </div>
      </>
    )
  }
]

const ProductInformation = () => (
  <Faq
    title='Product Information'
    titleSize={['40px', 4, 5, 5]}
    caption={
      <>
        Everything you need to know about <LineBreak /> the Microlink Link
        Preview API.
      </>
    }
    css={theme({
      pb: [5, 5, 6, 6],
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      ...TOP_FAQ_ITEMS,
      {
        question: 'Other questions?',
        answer: (
          <>
            <div>
              We are always available at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)

// ─── Meta / SEO ───────────────────────────────────────────────────────────────

export const Head = () => (
  <Meta
    title='Link Preview API — URL Unfurling & Open Graph Metadata'
    noSuffix
    description='Link preview API that turns any URL into a custom preview card. Normalized metadata (Open Graph, Twitter Cards, JSON-LD, oEmbed) in one JSON call. Free tier, proxy rotation for URLs behind Cloudflare and CAPTCHAs. Built for developers.'
    image={cdnUrl('banner/meta.jpeg')}
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/link-preview',
          name: 'Microlink Link Preview API',
          alternateName: [
            'Link Preview API',
            'URL Preview API',
            'Link Unfurling API',
            'URL Unfurl API'
          ],
          description:
            'Link preview API for developers — turn any URL into a custom preview using normalized metadata (Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa) in a single JSON call. Render hero cards, chat unfurls, Twitter-style summaries, Telegram bubbles, iOS notifications, or your own design.',
          url: 'https://microlink.io/link-preview',
          applicationCategory: ['DeveloperApplication', 'WebAPI'],
          operatingSystem: 'Web, Platform-Agnostic',
          provider: {
            '@type': 'Organization',
            '@id': 'https://microlink.io/about',
            name: 'Microlink',
            url: 'https://microlink.io'
          },
          audience: {
            '@type': 'Audience',
            audienceType: 'Developers, Software Engineers, Product Teams'
          },
          featureList: [
            'Link preview API for any URL',
            'Unified metadata: Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, HTML',
            'Brand palette and image colors extraction',
            'Headless browser execution for JavaScript-rendered pages',
            'Rotating residential proxy for URLs behind Cloudflare and CAPTCHAs',
            'Edge-cached across 240+ Cloudflare locations',
            'AI-friendly: pair with Cursor or Claude Code to generate previews',
            'Free tier with 50 requests per day'
          ],
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://microlink.io',
            url: 'https://microlink.io',
            name: 'Microlink'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            description:
              'Free tier available (50 requests/day). Pro plans start at €39/month for production workloads.',
            url: 'https://microlink.io/pricing'
          },
          keywords: [
            'link preview api',
            'link preview',
            'url preview',
            'url preview api',
            'link unfurling',
            'unfurl url',
            'link to metadata',
            'open graph api',
            'twitter cards api',
            'json-ld api',
            'oembed api',
            'metadata api',
            'sharing debugger'
          ],
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: {
              '@type': 'https://schema.org/LikeAction'
            },
            userInteractionCount: getRepoStarsLabel(REPOS[0], true),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: 'https://github.com/microlinkhq/metascraper'
            }
          },
          about: [
            {
              '@type': 'Thing',
              name: 'Open Graph protocol',
              sameAs:
                'https://en.wikipedia.org/wiki/Facebook_Platform#Open_Graph_protocol'
            },
            {
              '@type': 'Thing',
              name: 'oEmbed',
              sameAs: 'https://en.wikipedia.org/wiki/OEmbed'
            },
            {
              '@type': 'Thing',
              name: 'Metadata',
              sameAs: 'https://en.wikipedia.org/wiki/Metadata'
            },
            {
              '@type': 'Thing',
              name: 'Application Programming Interface',
              sameAs: 'https://en.wikipedia.org/wiki/API'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://microlink.io/link-preview#faq',
          url: 'https://microlink.io/link-preview',
          mainEntity: TOP_FAQ_ITEMS.map(({ question, text }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text
            }
          }))
        }
      ]
    }}
  />
)

// ─── Page Assembly ────────────────────────────────────────────────────────────

const LinkPreviewBody = ({ status, doFetch, data, response }) => {
  const [chipId, setChipId] = useState('hero')

  const isLoading = status === 'fetching'
  const unifiedData = data || DEMO_LINK.data

  return (
    <>
      <Hero
        data={unifiedData}
        isLoading={isLoading}
        onSubmit={doFetch}
        chipId={chipId}
        onChipChange={setChipId}
        response={response}
      />
      <Timings />
      <Capabilities data={unifiedData} />
      <CopyPastePreview data={unifiedData} />
      <Clients />
      <Pricing />
      <OpenSource />
      <Playground />
      <Features
        css={theme({ px: 4, pb: 5, pt: [5, 5, 6, 6] })}
        title={
          <Subhead
            css={theme({
              width: '100%',
              textAlign: 'left',
              fontSize: [
                4,
                4,
                `calc(${fontSizes[6]} - 1px)`,
                `calc(${fontSizes[6]} - 1px)`
              ]
            })}
          >
            The most complete link preview API,{' '}
            <span
              css={{
                display: 'block',
                color: ACCENT,
                width: '100%',
                textAlign: 'left'
              }}
            >
              with no compromises.
            </span>
          </Subhead>
        }
        caption={
          <>
            No brittle scrapers, no conflicting tag sources, no partial previews
            — our link preview API turns any URL into a custom-styled preview in
            one predictable JSON response. See the{' '}
            <Link href='/docs/guides/embed/metadata-api'>
              metadata API guide
            </Link>{' '}
            or{' '}
            <Link href='/docs/guides/embed/custom-previews-with-ai'>
              generate previews with AI
            </Link>
            .
          </>
        }
        features={LINK_PREVIEW_FEATURES}
      />
      <CallToAction />
      <ProductInformation />
    </>
  )
}

const LinkPreviewPage = () => (
  <Layout>
    <FetchProvider>
      {fetchState => <LinkPreviewBody {...fetchState} />}
    </FetchProvider>
  </Layout>
)

export default LinkPreviewPage
