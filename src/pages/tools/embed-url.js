import { trackEvent } from 'helpers/plausible'
import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Globe,
  ArrowRight,
  Code,
  Clipboard,
  Check,
  Loader,
  RotateCcw
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { keyframes } from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import { useClipboard } from 'components/hook/use-clipboard'
import { useLocalStorage } from 'components/hook/use-local-storage'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { normalizeApiError, getErrorMeta } from 'helpers/api-error'
import { withTitle } from 'helpers/hoc/with-title'

import {
  StepCard,
  SectionIcon,
  UseCaseCard,
  FadeIn,
  MOBILE_BP
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const PREVIEW_HEIGHT = '450px'
const PREVIEW_HEIGHT_MOBILE = '400px'

const FONT_FAMILIES = {
  sans: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  serif: "'Georgia','Times New Roman',serif",
  mono: "'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace"
}
const FONT_FAMILY_OPTIONS = [
  { id: 'sans', label: 'Sans' },
  { id: 'serif', label: 'Serif' },
  { id: 'mono', label: 'Mono' }
]
const FONT_WEIGHTS = { light: 300, regular: 400, medium: 500, bold: 700 }
const FONT_WEIGHT_OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'regular', label: 'Regular' },
  { id: 'medium', label: 'Medium' },
  { id: 'bold', label: 'Bold' }
]
const SHADOW_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'subtle', label: 'Subtle' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' }
]
const THEME_OPTIONS = [
  { id: 'light', label: 'Light theme' },
  { id: 'dark', label: 'Dark theme' }
]

const ELEMENT_FIELDS = [
  { id: 'description', label: 'Description' },
  { id: 'siteIcon', label: 'Site icon' },
  { id: 'siteName', label: 'Site name' },
  { id: 'authorTopic', label: 'Author / topic' },
  { id: 'date', label: 'Date' }
]

const COLOR_FIELDS = [
  { id: 'headline', label: 'Headline' },
  { id: 'description', label: 'Description' },
  { id: 'meta', label: 'Meta' },
  { id: 'website', label: 'Website' },
  { id: 'background', label: 'Background' },
  { id: 'border', label: 'Border' }
]

const DEFAULT_LIGHT_COLORS = {
  headline: '#000000',
  description: '#000000',
  meta: '#999999',
  website: '#999999',
  background: '#ffffff',
  border: '#dedede'
}

const DEFAULT_DARK_COLORS = {
  headline: '#ffffff',
  description: '#ffffff',
  meta: '#808080',
  website: '#808080',
  background: '#000000',
  border: '#222222'
}

const DEFAULT_CONFIG = {
  variant: 'large',
  elements: {
    description: true,
    siteIcon: true,
    siteName: true,
    authorTopic: false,
    date: false
  },
  metaBefore: true,
  border: 1,
  radius: 12,
  shadow: 'subtle',
  shadowColor: '#000000',
  fontBase: 'sans',
  fontWeight: 'regular',
  lineHeight: 1.4,
  headlineSize: 16,
  descriptionSize: 13,
  metaSize: 11,
  websiteSize: 12,
  theme: 'light',
  lightColors: { ...DEFAULT_LIGHT_COLORS },
  darkColors: { ...DEFAULT_DARK_COLORS }
}

const LOCAL_STORAGE_KEY = 'embed-url-card-config'

const escAttr = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escText = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const getHostnameFromUrl = url => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const pickFallbackBg = data => data?.image?.palette?.[0] || 'rgba(0,0,0,0.05)'

const hexToRgba = (hex, alpha) => {
  const h = String(hex || '#000000').replace(/^#/, '')
  const full =
    h.length === 3
      ? h
        .split('')
        .map(c => c + c)
        .join('')
      : h
  const r = parseInt(full.slice(0, 2), 16) || 0
  const g = parseInt(full.slice(2, 4), 16) || 0
  const b = parseInt(full.slice(4, 6), 16) || 0
  return `rgba(${r},${g},${b},${alpha})`
}

const resolveShadow = (kind, color) => {
  if (kind === 'none') return 'none'
  if (kind === 'large') return `0 12px 40px ${hexToRgba(color, 0.25)}`
  if (kind === 'medium') return `0 4px 16px ${hexToRgba(color, 0.18)}`
  return `0 1px 4px ${hexToRgba(color, 0.1)}`
}

const formatDate = value => {
  if (!value) return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

const resolveStyle = config => {
  const palette =
    config.theme === 'dark' ? config.darkColors : config.lightColors
  return {
    palette,
    fontFamily: FONT_FAMILIES[config.fontBase] || FONT_FAMILIES.sans,
    fontWeight: FONT_WEIGHTS[config.fontWeight] || 400,
    lineHeight: config.lineHeight,
    headlineSize: config.headlineSize,
    descriptionSize: config.descriptionSize,
    metaSize: config.metaSize,
    websiteSize: config.websiteSize,
    border: `${config.border}px solid ${palette.border}`,
    radius: `${config.radius}px`,
    shadow: resolveShadow(config.shadow, config.shadowColor),
    elements: config.elements,
    metaBefore: config.metaBefore
  }
}

const buildMetaPieces = (data, s) => {
  const pieces = []
  if (s.elements.siteIcon && data?.logo?.url) {
    pieces.push(
      `<img src="${escAttr(data.logo.url)}" alt="" style="width:${
        s.metaSize + 4
      }px;height:${s.metaSize + 4}px;border-radius:4px;flex-shrink:0" />`
    )
  }
  if (s.elements.siteName && data?.publisher) {
    pieces.push(
      `<span style="font-size:${s.metaSize}px;font-weight:${
        s.fontWeight
      };color:${
        s.palette.meta
      };letter-spacing:0.5px;text-transform:uppercase">${escText(
        data.publisher
      )}</span>`
    )
  }
  if (s.elements.authorTopic && data?.author) {
    pieces.push(
      `<span style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">${escText(data.author)}</span>`
    )
  }
  if (s.elements.date && data?.date) {
    const dateStr = formatDate(data.date)
    if (dateStr) {
      pieces.push(
        `<span style="font-size:${s.metaSize}px;color:${
          s.palette.meta
        }">${escText(dateStr)}</span>`
      )
    }
  }
  if (!pieces.length) return ''
  return `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:${
    s.metaSize + 4
  }px">${pieces.join('')}</div>`
}

const buildLargeCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const imageUrl = data?.image?.url ? escAttr(data.image.url) : ''
  const title = escText(data?.title || '')
  const description = s.elements.description
    ? escText(data?.description || '')
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const metaHtml = buildMetaPieces(data, s)

  const mediaInner = imageUrl
    ? `<img src="${imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />`
    : ''

  const titleHtml = `<div style="font-size:${s.headlineSize}px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${s.lineHeight};margin:0">${title}</div>`
  const descriptionHtml = description
    ? `<div style="font-size:${s.descriptionSize}px;color:${s.palette.description};line-height:${s.lineHeight};display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaHtml}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaHtml}`

  return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;color:inherit;width:100%;max-width:460px;background:${s.palette.background};border-radius:${s.radius};overflow:hidden;border:${s.border};box-shadow:${s.shadow};font-family:${s.fontFamily}">
  <div style="width:100%;aspect-ratio:16 / 9;background:${fallbackBg};overflow:hidden">${mediaInner}</div>
  <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px">${body}</div>
</a>`
}

const buildWideCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const imageUrl = data?.image?.url ? escAttr(data.image.url) : ''
  const hostname = escText(
    getHostnameFromUrl(data?.url) || data?.publisher || ''
  )
  const title = escText(data?.title || '')
  const description = s.elements.description
    ? escText(data?.description || '')
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const metaHtml = buildMetaPieces(data, s)

  const mediaInner = imageUrl
    ? `<img src="${imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />`
    : ''

  const hostnameHtml = `<span style="font-size:${s.websiteSize}px;color:${s.palette.website};font-family:${FONT_FAMILIES.mono}">${hostname}</span>`
  const titleHtml = `<div style="font-size:${s.headlineSize}px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${s.lineHeight};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${title}</div>`
  const descriptionHtml = description
    ? `<div style="font-size:${s.descriptionSize}px;color:${s.palette.description};line-height:${s.lineHeight};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${hostnameHtml}${metaHtml}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${hostnameHtml}${metaHtml}`

  return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;width:100%;max-width:460px;min-height:140px;background:${s.palette.background};border-radius:${s.radius};overflow:hidden;border:${s.border};box-shadow:${s.shadow};font-family:${s.fontFamily}">
  <div style="width:140px;flex-shrink:0;align-self:stretch;background:${fallbackBg};overflow:hidden">${mediaInner}</div>
  <div style="padding:14px;display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;justify-content:center">${body}</div>
</a>`
}

const buildSmallCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(data?.title || '')
  const description = s.elements.description
    ? escText(data?.description || '')
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))

  const showIcon = s.elements.siteIcon
  const iconNode = !showIcon
    ? ''
    : logoUrl
      ? `<img src="${logoUrl}" alt="" style="width:36px;height:36px;border-radius:8px;flex-shrink:0" />`
      : `<div style="width:36px;height:36px;border-radius:8px;flex-shrink:0;background:${fallbackBg}"></div>`

  const publisherText =
    s.elements.siteName && data?.publisher
      ? `<span style="font-size:${s.metaSize + 1}px;font-weight:${
        s.fontWeight
      };color:${s.palette.meta}">${escText(data.publisher)}</span>`
      : ''
  const authorText =
    s.elements.authorTopic && data?.author
      ? `<span style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">· ${escText(data.author)}</span>`
      : ''
  const dateText =
    s.elements.date && data?.date
      ? `<span style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">${escText(formatDate(data.date))}</span>`
      : `<span style="font-size:${s.metaSize}px;color:${s.palette.meta}">now</span>`

  const metaRow =
    publisherText || authorText
      ? `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;gap:8px">
      <span style="display:flex;align-items:center;gap:4px;min-width:0;overflow:hidden">${publisherText}${authorText}</span>
      ${dateText}
    </div>`
      : ''

  const titleHtml = `<div style="font-size:${
    s.headlineSize - 3
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };margin-bottom:2px">${title}</div>`
  const descriptionHtml = description
    ? `<div style="font-size:${s.descriptionSize - 1}px;color:${
      s.palette.description
    };line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaRow}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaRow}`

  return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;gap:10px;align-items:flex-start;width:100%;max-width:380px;padding:12px 14px;border-radius:${s.radius};background:${s.palette.background};-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);border:${s.border};box-shadow:${s.shadow};font-family:${s.fontFamily}">
  ${iconNode}
  <div style="flex:1;min-width:0">${body}</div>
</a>`
}

const CARD_VARIANTS = [
  { id: 'large', label: 'Standard cover', build: buildLargeCard },
  { id: 'wide', label: 'Wide cover', build: buildWideCard },
  { id: 'small', label: 'Compact cover', build: buildSmallCard }
]

const buildCardHtml = (data, config) => {
  const variant =
    CARD_VARIANTS.find(v => v.id === config.variant) || CARD_VARIANTS[0]
  return variant.build(data, resolveStyle(config))
}

const isSameConfig = (a, b) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

const FEATURES_LIST = [
  {
    title: 'Iframe HTML, Ready to Paste',
    description:
      "Add &iframe to any Microlink API call and the response includes a ready-to-paste HTML snippet — the provider's real player for 280+ webpages."
  },
  {
    title: 'Card Fallback for Every URL',
    description:
      'When a URL has no oEmbed iframe, the tool falls back to a Microlink SDK card preview — same vanilla snippet works on any page.'
  },
  {
    title: 'Edge-Cached, Free to Start',
    description:
      'Embed responses are cached on 240+ CloudFlare edge nodes. Free tier with 50 requests per day, no credit card.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a URL',
    description:
      'Drop in any webpage — YouTube, Spotify, Vimeo, a blog post, a tweet, a docs page.'
  },
  {
    icon: Code,
    title: 'Get the HTML',
    description:
      'The Microlink API returns an iframe attribute when supported, or a Microlink SDK card for the long tail.'
  },
  {
    icon: Clipboard,
    title: 'Copy & Embed',
    description:
      'Copy the generated HTML into your markup, MDX, CMS, or newsletter. It just works.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Embed Any URL',
    description:
      'Turn any link into a rich preview — iframe player when the provider supports it, or a Microlink card otherwise. No per-provider integration code.'
  },
  {
    title: 'oEmbed Across 280+ Sites',
    description: (
      <>
        Microlink consumes oEmbed where it exists and falls back to Open Graph,
        JSON-LD, and headless rendering. See the full{' '}
        <Link href='/docs/api/parameters/iframe/#providers-supported'>
          provider list
        </Link>
        .
      </>
    )
  },
  {
    title: 'Iframe Without the Pain',
    description: (
      <>
        Skip provider-specific URL gymnastics. Pass the source URL, get back the
        iframe HTML the provider already exposes — read the{' '}
        <Link href='/docs/guides/embed/iframe'>iframe embed guide</Link>.
      </>
    )
  },
  {
    title: 'Customizable Previews',
    description: (
      <>
        For URLs without a player, the Microlink{' '}
        <Link href='/sdk'>SDK component</Link> renders a themeable card —
        controlled via CSS variables and BEM class hooks.
      </>
    )
  },
  {
    title: 'Free + No Login',
    description:
      'Free embed tool with 50 requests per day. No account needed, no signup, no branding stripped.'
  },
  {
    title: 'API Integration Ready',
    description: (
      <>
        Built on the <Link href='/embed'>Microlink Embed API</Link>. Use the
        same endpoint from any backend, edge runtime, or SDK —{' '}
        <Link href='https://www.npmjs.com/package/@microlink/mql'>
          @microlink/mql
        </Link>
        .
      </>
    )
  }
]

const USE_CASES = [
  {
    title: 'For Docs & Knowledge Bases',
    items: [
      'Embed YouTube tutorials, CodeSandbox demos, Figma boards inline',
      'Drop iframe HTML directly into MDX or Markdown',
      'Keep previews consistent across your docs site',
      'No per-provider integration — one snippet pattern'
    ],
    link: {
      href: '/embed',
      alt: 'Microlink Embed API landing',
      text: 'Explore the Embed API'
    }
  },
  {
    title: 'For Newsletters & Blogs',
    items: [
      'Generate rich previews for any link you share',
      'Use iframes when the provider supports them, cards otherwise',
      'Pair with the vanilla SDK script for static sites',
      'Paste the HTML into Ghost, WordPress, Substack, or static MD'
    ],
    link: {
      href: '/docs/guides/embed',
      alt: 'Embed guide',
      text: 'Read the embed guide'
    }
  },
  {
    title: 'For Dashboards & Apps',
    items: [
      'Render link previews server-side or client-side with the same payload',
      'Drop in <Microlink /> for React, Vue, or vanilla JS',
      'Lazy-load embeds with IntersectionObserver out of the box',
      'Theme the card via CSS variables to match your design system'
    ],
    link: {
      href: '/sdk',
      alt: 'Microlink SDK landing',
      text: 'Use the SDK'
    }
  }
]

/* ─── Page-specific Styled Components ──────────────────── */

const PaperSheet = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1px solid ${colors.black10};
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
`

const EmbedPreviewFrame = styled(Box)`
  ${theme({ p: 3 })}
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: #fff;
`

const IframePreviewFrame = styled(EmbedPreviewFrame)`
  overflow: hidden;

  & iframe {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 100%;
    border: 0;
    border-radius: 6px;
    background: ${colors.black05};
  }
`

const VariantSelector = styled(Flex)`
  ${theme({ gap: 1, p: 1 })}
  background: ${colors.black05};
  border-radius: 999px;
  align-items: center;
  flex-wrap: wrap;
`

const VariantButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 3,
    py: '6px',
    borderRadius: '999px',
    cursor: 'pointer'
  })}
  border: none;
  background: ${({ $active }) => ($active ? colors.white : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 2px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const EditorShell = styled(PaperSheet)`
  ${theme({ width: '100%' })}
  min-width: 0;
  flex: 1 1 0;
  border: none;
  box-shadow: none;
`

const EditorTabBar = styled(Flex)`
  ${theme({ px: 3, py: 0, gap: 1 })}
  align-items: stretch;
  border-bottom: 1px solid ${colors.black05};
  background: #fff;
  flex-shrink: 0;
`

const EditorTab = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    px: 2,
    py: '12px',
    cursor: 'pointer'
  })}
  background: transparent;
  border: none;
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? colors.link : 'transparent')};
  margin-bottom: -1px;
  transition: color ${transition.short}, border-color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }
`

const EditorBody = styled(Box)`
  ${theme({ px: 3, py: 3 })}
  background: #fff;
`

const PresetIndicator = styled(Flex)`
  ${theme({ px: 3, py: 2, gap: 2, width: '100%' })}
  align-items: center;
  justify-content: space-between;
  background: ${colors.pinkest};
  border: 1px solid ${colors.black05};
  border-radius: 8px;
  flex-shrink: 0;
`

const SectionHeader = styled(Caps)`
  ${theme({
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black60',
    pb: 2,
    pt: 2
  })}
  display: block;
  letter-spacing: 1px;
`

const FormRow = styled(Flex)`
  ${theme({ py: '6px', gap: 3 })}
  align-items: center;
  justify-content: space-between;
`

const FormLabel = styled(Text)`
  ${theme({ fontSize: 1, color: 'black80', fontFamily: 'sans' })}
  flex: 1;
  min-width: 0;
`

const NumberField = styled.input`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: '6px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80',
    width: '70px'
  })}
  background: white;
  text-align: right;

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }
`

const SelectField = styled.select`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: '6px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80'
  })}
  background: white;
  cursor: pointer;
  min-width: 90px;

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }
`

const ColorField = styled.input.attrs({ type: 'color' })`
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid ${colors.black10};
  border-radius: 6px;
  background: white;
  cursor: pointer;
  flex-shrink: 0;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`

const ColorFieldHex = styled.input`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: '6px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80',
    width: '90px'
  })}
  background: white;
  text-transform: lowercase;

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }
`

const CheckboxWrap = styled(Flex).attrs({ as: 'label' })`
  ${theme({ gap: 2, py: '6px' })}
  align-items: center;
  cursor: pointer;
  user-select: none;

  & input {
    accent-color: ${colors.link};
    cursor: pointer;
  }
`

const SmallActionButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 3,
    py: '8px',
    borderRadius: '6px',
    cursor: 'pointer'
  })}
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${colors.black10};
  background: white;
  color: ${colors.black80};
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${colors.black05};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const ResultGrid = styled(Flex)`
  ${theme({ gap: 3, width: '100%' })}
  flex-direction: column;
  align-items: stretch;

  @media (min-width: ${MOBILE_BP}px) {
    flex-direction: row;
  }
`

const ResultPane = styled(PaperSheet)`
  ${theme({ width: '100%' })}
  min-width: 0;
  height: ${PREVIEW_HEIGHT_MOBILE};
  border: none;
  box-shadow: none;

  @media (min-width: ${MOBILE_BP}px) {
    flex: 1 1 0;
    height: ${PREVIEW_HEIGHT};
  }
`

const PaneHeader = styled(Flex)`
  ${theme({ px: 3, py: 2, gap: 2 })}
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.black05};
  background: #fafafa;
  flex-shrink: 0;
`

const PaneLabel = styled(Caps)`
  ${theme({ fontSize: 0, color: 'black60', fontWeight: 'bold' })}
`

const OmniboxWrapper = styled(Flex)`
  ${theme({
    alignItems: 'center',
    bg: 'white',
    borderRadius: '999px',
    border: 1,
    borderColor: 'black10',
    py: '6px',
    pl: '6px',
    pr: '6px',
    gap: '6px',
    width: '100%',
    fontFamily: 'sans'
  })}
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03);
  transition: border-color ${transition.medium}, box-shadow ${transition.medium};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus-within {
    border-color: ${colors.black20};
  }
`

const OmniboxInput = styled.input`
  ${theme({
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    color: 'black80'
  })}
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  padding: 10px 14px;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: ${colors.black30};
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    font-size: 16px;
  }
`

const OmniboxConvertButton = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    borderRadius: '999px',
    cursor: 'pointer',
    flexShrink: 0
  })}
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  background: ${colors.link};
  color: white;
  transition: transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    padding: 10px 14px;

    .omnibox-btn-label {
      display: none;
    }
  }
`

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const SpinningLoader = styled(Loader)`
  animation: ${spinAnimation} 1s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const LoadingDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${colors.black30};
  animation: ${keyframes`
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  `} 1.4s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.5;
  }
`

const ResultsExpandWrapper = styled(Box).withConfig({
  shouldForwardProp: prop => !['$expanded'].includes(prop)
})`
  display: grid;
  transition: grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1);
  grid-template-rows: ${({ $expanded }) => ($expanded ? '1fr' : '0fr')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ResultsExpandInner = styled(Box)`
  overflow: hidden;
  min-height: 0;
`

/* ─── Omnibar (input + submit) ─────────────────────────── */

const Omnibar = ({ url, setUrl, onSubmit, isLoading }) => {
  const [urlError, setUrlError] = useState('')

  const handleUrlChange = useCallback(
    e => {
      setUrl(e.target.value)
      setUrlError(prev => (prev ? '' : prev))
    },
    [setUrl]
  )

  const normalizeUrl = rawUrl => {
    const trimmed = rawUrl.trim()
    if (!trimmed) return ''
    return prependHttp(trimmed)
  }

  const handleSubmit = useCallback(() => {
    const next = normalizeUrl(url)
    if (!next || !isUrl(next)) {
      setUrlError('Please enter a valid URL (e.g., example.com)')
      return
    }
    setUrl(next)
    setUrlError('')
    onSubmit(next)
  }, [url, setUrl, onSubmit])

  return (
    <Box css={{ width: '100%' }}>
      <OmniboxWrapper>
        <OmniboxInput
          id='embed-url'
          type='url'
          inputMode='url'
          autoComplete='url'
          placeholder='Paste a URL…'
          value={url}
          onChange={handleUrlChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (!isLoading) handleSubmit()
            }
          }}
          aria-describedby={urlError ? 'embed-url-error' : undefined}
          aria-invalid={!!urlError}
        />
        <OmniboxConvertButton onClick={handleSubmit} disabled={isLoading}>
          <span className='omnibox-btn-label'>Embed</span>
          <ArrowRight size={16} />
        </OmniboxConvertButton>
      </OmniboxWrapper>
      {urlError ? (
        <Text
          id='embed-url-error'
          role='alert'
          css={theme({ color: 'fullscreen', fontSize: 0, pt: 1, pl: 3 })}
        >
          {urlError}
        </Text>
      ) : null}
    </Box>
  )
}

/* ─── Result Panes ─────────────────────────────────────── */

const PreviewPane = ({ html, hasIframe }) => (
  <ResultPane>
    {hasIframe ? (
      <IframePreviewFrame dangerouslySetInnerHTML={{ __html: html }} />
    ) : (
      <EmbedPreviewFrame dangerouslySetInnerHTML={{ __html: html }} />
    )}
  </ResultPane>
)

const compactHtml = html =>
  String(html || '')
    .replace(/\n+/g, '')
    .replace(/>\s+</g, '><')
    .replace(/ {2,}/g, ' ')
    .trim()

const HL_COLORS = {
  punct: '#6a737d',
  tag: '#22863a',
  attr: '#6f42c1',
  string: '#032f62'
}

const renderHighlightedTag = (tagStr, baseKey) => {
  const m = tagStr.match(/^(<\/?)([\w-]+)([\s\S]*?)(\/?>)$/)
  if (!m) return <span key={baseKey}>{tagStr}</span>
  const [, openPunct, tagName, attrsStr, closePunct] = m

  const attrParts = []
  const attrRe = /(\s+)([\w-]+)(?:(=)("[^"]*"))?/g
  let am
  let alast = 0
  let k = 0
  while ((am = attrRe.exec(attrsStr))) {
    if (am.index > alast) {
      attrParts.push(
        <span key={`${baseKey}r${k++}`}>{attrsStr.slice(alast, am.index)}</span>
      )
    }
    attrParts.push(<span key={`${baseKey}w${k++}`}>{am[1]}</span>)
    attrParts.push(
      <span key={`${baseKey}a${k++}`} style={{ color: HL_COLORS.attr }}>
        {am[2]}
      </span>
    )
    if (am[3]) {
      attrParts.push(
        <span key={`${baseKey}e${k++}`} style={{ color: HL_COLORS.punct }}>
          {am[3]}
        </span>
      )
      attrParts.push(
        <span key={`${baseKey}s${k++}`} style={{ color: HL_COLORS.string }}>
          {am[4]}
        </span>
      )
    }
    alast = am.index + am[0].length
  }
  if (alast < attrsStr.length) {
    attrParts.push(
      <span key={`${baseKey}r${k++}`}>{attrsStr.slice(alast)}</span>
    )
  }

  return (
    <span key={baseKey}>
      <span style={{ color: HL_COLORS.punct }}>{openPunct}</span>
      <span style={{ color: HL_COLORS.tag }}>{tagName}</span>
      {attrParts}
      <span style={{ color: HL_COLORS.punct }}>{closePunct}</span>
    </span>
  )
}

const HighlightedHtml = ({ html }) => {
  const tokens = []
  const re = /<\/?\w[^>]*>/g
  let m
  let last = 0
  let i = 0
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) {
      tokens.push(<span key={`t${i++}`}>{html.slice(last, m.index)}</span>)
    }
    tokens.push(renderHighlightedTag(m[0], `g${i++}`))
    last = m.index + m[0].length
  }
  if (last < html.length) {
    tokens.push(<span key={`t${i++}`}>{html.slice(last)}</span>)
  }
  return <>{tokens}</>
}

const IconCopyButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid ${colors.black10};
  background: white;
  color: ${colors.black60};
  border-radius: 6px;
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${colors.black05};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  & .icon-check {
    color: ${colors.green5};
  }
`

const InlineCodePre = styled.pre`
  ${theme({ m: 0, px: 3, py: 2 })}
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 3px;
  }
`

const HtmlPane = ({ html }) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    trackEvent('embed copy')
    toClipboard({ copy: html, text: Tooltip.TEXT.COPIED('HTML') })
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [html, toClipboard])

  return (
    <PaperSheet css={{ width: '100%' }}>
      <PaneHeader>
        <PaneLabel as='span'>HTML</PaneLabel>
        <IconCopyButton
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy HTML to clipboard'}
          title={copied ? 'Copied!' : 'Copy HTML'}
        >
          {copied ? (
            <Check size={14} className='icon-check' />
          ) : (
            <Clipboard size={14} />
          )}
        </IconCopyButton>
      </PaneHeader>
      <InlineCodePre>
        <code>
          <HighlightedHtml html={html} />
        </code>
      </InlineCodePre>
      <ClipboardComponent />
    </PaperSheet>
  )
}

/* ─── Config Editor Tabs ───────────────────────────────── */

const LayoutTab = ({ config, set }) => (
  <Box>
    <SectionHeader>Card style</SectionHeader>
    <VariantSelector
      role='radiogroup'
      aria-label='Card style'
      css={{ marginBottom: 8 }}
    >
      {CARD_VARIANTS.map(({ id, label }) => (
        <VariantButton
          key={id}
          role='radio'
          aria-checked={config.variant === id}
          $active={config.variant === id}
          onClick={() => set('variant', id)}
        >
          {label}
        </VariantButton>
      ))}
    </VariantSelector>

    <SectionHeader>Elements to include</SectionHeader>
    <Box css={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {ELEMENT_FIELDS.map(({ id, label }) => (
        <CheckboxWrap key={id}>
          <input
            type='checkbox'
            checked={!!config.elements[id]}
            onChange={e => set(`elements.${id}`, e.target.checked)}
          />
          <Text css={theme({ fontSize: 1, color: 'black80' })}>{label}</Text>
        </CheckboxWrap>
      ))}
      <CheckboxWrap>
        <input
          type='checkbox'
          checked={!!config.metaBefore}
          onChange={e => set('metaBefore', e.target.checked)}
        />
        <Text css={theme({ fontSize: 1, color: 'black80' })}>
          Meta before title
        </Text>
      </CheckboxWrap>
    </Box>

    <SectionHeader>Frame</SectionHeader>
    <Box>
      <FormRow>
        <FormLabel>Border</FormLabel>
        <NumberField
          type='number'
          min='0'
          max='10'
          value={config.border}
          onChange={e =>
            set('border', Math.max(0, Number(e.target.value) || 0))
          }
        />
      </FormRow>
      <FormRow>
        <FormLabel>Radius</FormLabel>
        <NumberField
          type='number'
          min='0'
          max='40'
          value={config.radius}
          onChange={e =>
            set('radius', Math.max(0, Number(e.target.value) || 0))
          }
        />
      </FormRow>
      <FormRow>
        <FormLabel>Shadow</FormLabel>
        <SelectField
          value={config.shadow}
          onChange={e => set('shadow', e.target.value)}
        >
          {SHADOW_OPTIONS.map(o => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </SelectField>
      </FormRow>
      <FormRow>
        <FormLabel>Color</FormLabel>
        <Flex css={{ gap: 8, alignItems: 'center' }}>
          <ColorField
            value={config.shadowColor}
            onChange={e => set('shadowColor', e.target.value)}
          />
          <ColorFieldHex
            type='text'
            value={config.shadowColor}
            onChange={e => set('shadowColor', e.target.value)}
          />
        </Flex>
      </FormRow>
    </Box>
  </Box>
)

const FontsTab = ({ config, set }) => (
  <Box>
    <SectionHeader>Typography</SectionHeader>
    <FormRow>
      <FormLabel>Base font</FormLabel>
      <SelectField
        value={config.fontBase}
        onChange={e => set('fontBase', e.target.value)}
      >
        {FONT_FAMILY_OPTIONS.map(o => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </SelectField>
    </FormRow>
    <FormRow>
      <FormLabel>Weight</FormLabel>
      <SelectField
        value={config.fontWeight}
        onChange={e => set('fontWeight', e.target.value)}
      >
        {FONT_WEIGHT_OPTIONS.map(o => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </SelectField>
    </FormRow>
    <FormRow>
      <FormLabel>Line height</FormLabel>
      <NumberField
        type='number'
        step='0.1'
        min='1'
        max='3'
        value={config.lineHeight}
        onChange={e =>
          set('lineHeight', Math.max(1, Number(e.target.value) || 1))
        }
      />
    </FormRow>

    <SectionHeader>Sizes (px)</SectionHeader>
    {[
      { key: 'headlineSize', label: 'Headline' },
      { key: 'descriptionSize', label: 'Description' },
      { key: 'metaSize', label: 'Meta' },
      { key: 'websiteSize', label: 'Website' }
    ].map(({ key, label }) => (
      <FormRow key={key}>
        <FormLabel>{label}</FormLabel>
        <NumberField
          type='number'
          min='8'
          max='48'
          value={config[key]}
          onChange={e => set(key, Math.max(8, Number(e.target.value) || 8))}
        />
      </FormRow>
    ))}
  </Box>
)

const ColorsTab = ({ config, set }) => {
  const themeKey = config.theme === 'dark' ? 'darkColors' : 'lightColors'
  return (
    <Box>
      <SectionHeader>Theme</SectionHeader>
      <Flex css={{ width: '100%' }}>
        <VariantSelector role='radiogroup' aria-label='Theme'>
          {THEME_OPTIONS.map(({ id, label }) => (
            <VariantButton
              key={id}
              role='radio'
              aria-checked={config.theme === id}
              $active={config.theme === id}
              onClick={() => set('theme', id)}
            >
              {label}
            </VariantButton>
          ))}
        </VariantSelector>
      </Flex>

      <SectionHeader>
        {config.theme === 'dark' ? 'Dark theme colors' : 'Light theme colors'}
      </SectionHeader>
      {COLOR_FIELDS.map(({ id, label }) => (
        <FormRow key={id}>
          <FormLabel>{label}</FormLabel>
          <Flex css={{ gap: 8, alignItems: 'center' }}>
            <ColorField
              value={config[themeKey][id]}
              onChange={e => set(`${themeKey}.${id}`, e.target.value)}
            />
            <ColorFieldHex
              type='text'
              value={config[themeKey][id]}
              onChange={e => set(`${themeKey}.${id}`, e.target.value)}
            />
          </Flex>
        </FormRow>
      ))}
    </Box>
  )
}

const EDITOR_TABS = [
  { id: 'layout', label: 'Layout', Component: LayoutTab },
  { id: 'fonts', label: 'Fonts', Component: FontsTab },
  { id: 'colors', label: 'Colors', Component: ColorsTab }
]

const ConfigEditor = ({ config, setConfig }) => {
  const [tab, setTab] = useState('layout')

  const set = useCallback(
    (path, value) => {
      setConfig(prev => {
        const next = JSON.parse(JSON.stringify(prev))
        const keys = path.split('.')
        let cur = next
        for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]]
        cur[keys[keys.length - 1]] = value
        return next
      })
    },
    [setConfig]
  )

  const ActiveTab = (EDITOR_TABS.find(t => t.id === tab) || EDITOR_TABS[0])
    .Component

  return (
    <EditorShell>
      <EditorTabBar>
        {EDITOR_TABS.map(({ id, label }) => (
          <EditorTab
            key={id}
            $active={tab === id}
            onClick={() => setTab(id)}
            aria-pressed={tab === id}
          >
            {label}
          </EditorTab>
        ))}
      </EditorTabBar>
      <EditorBody>
        <ActiveTab config={config} set={set} />
      </EditorBody>
    </EditorShell>
  )
}

const SavedPresetIndicator = ({ onReset }) => (
  <PresetIndicator>
    <Text css={theme({ fontSize: 1, color: 'black80', fontFamily: 'sans' })}>
      Custom style applied from your saved preset.
    </Text>
    <SmallActionButton onClick={onReset}>
      <RotateCcw size={14} />
      Reset to defaults
    </SmallActionButton>
  </PresetIndicator>
)

const PreviewColumn = styled(Flex)`
  ${theme({ gap: 2, width: '100%' })}
  flex-direction: column;
  min-width: 0;
  flex: 1 1 0;
`

const ResultArea = ({
  isLoading,
  error,
  data,
  onRetry,
  config,
  setConfig,
  onReset,
  hasSavedPreset
}) => {
  if (isLoading) {
    return (
      <PaperSheet
        css={{
          height: PREVIEW_HEIGHT_MOBILE,
          [`@media (min-width: ${MOBILE_BP}px)`]: { height: PREVIEW_HEIGHT }
        }}
      >
        <FadeIn
          key='loading'
          css={theme({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          })}
        >
          <SpinningLoader size={28} color={colors.black60} />
          <Text
            css={theme({
              color: 'black80',
              fontSize: 2,
              fontFamily: 'sans',
              pt: 3
            })}
            aria-live='polite'
          >
            Fetching embed
          </Text>
          <Flex css={{ gap: '5px', marginTop: space[2] }}>
            <LoadingDot />
            <LoadingDot />
            <LoadingDot />
          </Flex>
        </FadeIn>
      </PaperSheet>
    )
  }

  if (error) {
    return (
      <PaperSheet
        css={{
          height: PREVIEW_HEIGHT_MOBILE,
          [`@media (min-width: ${MOBILE_BP}px)`]: { height: PREVIEW_HEIGHT }
        }}
      >
        <FadeIn
          key='error'
          css={theme({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            px: 4,
            textAlign: 'center'
          })}
        >
          <Text css={theme({ color: 'fullscreen', fontSize: 3, pb: 3 })}>
            <ApiErrorTitle code={error?.code} />
            <Text css={theme({ fontSize: 2, color: 'black60', pt: 2 })}>
              <ApiErrorBody
                code={error?.code}
                fallback={
                  error?.message || 'Something went wrong. Please try again.'
                }
              />
            </Text>
          </Text>
          {getErrorMeta(error?.code).showRetry ? (
            <Button onClick={onRetry}>
              <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
            </Button>
          ) : null}
        </FadeIn>
      </PaperSheet>
    )
  }

  if (!data) return null

  const hasIframe = Boolean(data.iframe?.html)
  const html = compactHtml(
    hasIframe ? data.iframe.html : buildCardHtml(data, config)
  )

  return (
    <Flex
      css={theme({
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        alignItems: 'stretch'
      })}
    >
      {!hasIframe && hasSavedPreset ? (
        <SavedPresetIndicator onReset={onReset} />
      ) : null}
      <ResultGrid>
        {!hasIframe ? (
          <ConfigEditor config={config} setConfig={setConfig} />
        ) : null}
        <PreviewColumn>
          <PreviewPane html={html} hasIframe={hasIframe} />
        </PreviewColumn>
      </ResultGrid>
      <HtmlPane html={html} />
    </Flex>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const EmbedTool = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')
  const [config, setConfigInternal] = useState(DEFAULT_CONFIG)
  const [storedConfig, setStoredConfig] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    null
  )
  const hydratedRef = useRef(false)
  const requestIdRef = useRef(0)

  useEffect(() => {
    if (hydratedRef.current) return
    if (storedConfig == null) return
    hydratedRef.current = true
    if (!isSameConfig(storedConfig, DEFAULT_CONFIG)) {
      setConfigInternal(storedConfig)
    }
  }, [storedConfig])

  const setConfig = useCallback(
    updater => {
      setConfigInternal(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        setStoredConfig(next)
        return next
      })
    },
    [setStoredConfig]
  )

  const executeSubmit = useCallback(async nextUrl => {
    trackEvent('embed convert')
    const requestId = ++requestIdRef.current
    setIsLoading(true)
    setError(null)
    setData(null)
    setLastUrl(nextUrl)

    try {
      const response = await mql(nextUrl, {
        iframe: true,
        audio: true,
        video: true
      })
      if (requestId !== requestIdRef.current) return
      setData(response.data || null)
    } catch (err) {
      if (requestId !== requestIdRef.current) return
      setError(normalizeApiError.fromMql(err, 'Failed to fetch embed.'))
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false)
    }
  }, [])

  const handleSubmit = useCallback(
    next => {
      executeSubmit(next)
    },
    [executeSubmit]
  )

  const handleRetry = useCallback(() => {
    if (lastUrl) executeSubmit(lastUrl)
  }, [lastUrl, executeSubmit])

  const handleResetConfig = useCallback(() => {
    setConfigInternal(DEFAULT_CONFIG)
    setStoredConfig(null)
  }, [setStoredConfig])

  const hasContent = !!(data || error || isLoading)
  const hasSavedPreset =
    storedConfig != null && !isSameConfig(storedConfig, DEFAULT_CONFIG)

  return (
    <Container
      as='section'
      id='tool'
      css={theme({
        px: ['16px', '25px'],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
        pb: [2, 2, 4, 4],
        pt: [3, 3, 4, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%'
        })}
      >
        <Omnibar
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <Box css={{ width: '100%' }}>
          <ResultsExpandWrapper $expanded={hasContent}>
            <ResultsExpandInner>
              <ResultArea
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={handleRetry}
                config={config}
                setConfig={setConfig}
                onReset={handleResetConfig}
                hasSavedPreset={hasSavedPreset}
              />
            </ResultsExpandInner>
          </ResultsExpandWrapper>
        </Box>
      </Flex>
    </Container>
  )
}

/* ─── Hero Section ─────────────────────────────────────── */

const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
    })}
  >
    <Heading
      css={theme({
        px: [3, 3],
        maxWidth: layout.large,
        fontSize: [3, '35px', '40px', '50px']
      })}
    >
      Embed Any URL <LineBreak breakpoints={[0, 1]} /> in One Click
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, '26px', '28px']
      })}
    >
      Paste any URL and get a ready-to-paste HTML embed — <br />
      iframe attribute when supported, Microlink SDK card for the long tail.
    </Caption>
  </Flex>
)

/* ─── How It Works ─────────────────────────────────────── */

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: 0,
      pb: [2, 2, 3, 3],
      mt: 2
    })}
  >
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 3, 3, '28px']
      })}
    >
      How to embed any URL as HTML
    </Caption>
    <Flex
      css={theme({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: [2, 2, 3, 4],
        pt: [2, 2, 3, 3]
      })}
    >
      {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
        <StepCard key={title} css={theme({ px: 1, py: [3, 3, 4, 4] })}>
          <SectionIcon icon={Icon} />
          <Caps
            as='h3'
            css={theme({ fontWeight: 'regular', pb: 2, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </StepCard>
      ))}
    </Flex>
  </Container>
)

/* ─── Explanation ────────────────────────────────────── */

const Explanation = () => (
  <Container
    as='section'
    id='why-choose'
    css={theme({
      alignItems: 'center',
      pb: [4, 4, 5, 5],
      pt: [4, 4, 5, 5],
      mt: [3, 3, 4, 4],
      bg: 'pinky'
    })}
  >
    <Subhead css={theme({ fontSize: [3, '30px', '35px', '45px'] })}>
      Why use this free URL embed tool?
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
    >
      {REASON_TO_USE.map(({ title, description }) => (
        <UseCaseCard key={title}>
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 1 })}>
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </UseCaseCard>
      ))}
    </Box>
    <Caption
      css={theme({
        pt: [4, 4, 5, 5],
        px: [1, 1, 3, 3],
        fontSize: '24px',
        maxWidth: layout.large
      })}
    >
      <Text css={theme({ fontSize: 3, color: 'black' })}>
        How can a URL embed tool be free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This tool runs on the <Link href='/embed'>Microlink Embed API</Link> —
        the same infrastructure powering rich previews and iframe embeds at
        scale. Free for everyday use, no credit card.
      </Text>
    </Caption>
  </Container>
)

/* ─── Use Cases ───────────────────────────────────────── */

const UseCasesSection = () => (
  <Container
    as='section'
    id='use-cases'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6],
      pt: [4, 4, 5, 5]
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Use cases for embedding URLs
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From documentation sites to newsletters to product dashboards — embedding
      URLs powers content workflows across every team.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      {USE_CASES.map(({ title, items, link }) => (
        <Box
          key={title}
          css={theme({
            p: 4,
            border: 1,
            borderColor: 'black10',
            borderRadius: 3,
            bg: 'white'
          })}
        >
          <Caps
            as='h3'
            titleize='false'
            css={theme({ fontWeight: 'bold', pb: 3, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Box
            as='ul'
            css={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: space[2]
            }}
          >
            {items.map(item => (
              <Flex
                key={item}
                as='li'
                css={{
                  alignItems: 'baseline',
                  gap: space[2]
                }}
              >
                <ArrowRight
                  size={12}
                  css={{ flexShrink: 0, position: 'relative', top: 1 }}
                />
                <Text
                  css={theme({
                    fontSize: 1,
                    color: 'black60',
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              </Flex>
            ))}
          </Box>
          {link ? (
            <Box css={theme({ pt: 3 })}>
              <Link href={link.href} aria-label={link.alt}>
                {link.text}
              </Link>
            </Box>
          ) : null}
        </Box>
      ))}
    </Box>
  </Container>
)

/* ─── Banner ─────────────────────────────────────────── */

const Banner = () => (
  <Block
    forwardedAs='section'
    id='pricing'
    flexDirection='column'
    css={theme({
      px: 4,
      maxHeight: '800px',
      pb: 0,
      pt: 5,
      width: '100%',
      overflow: 'hidden',
      backgroundImage: `radial-gradient(
        circle at center right,
        #1d1f4f 0%,
        #1d1f4f 48%,
        #272a73 48%,
        #272a73 52%,
        #303597 52%,
        #303597 65%,
        #3940bb 65%,
        #3940bb 79%,
        #3e55ff 79%,
        #3e55ff 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    })}
    blockOne={
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
          Embed API{' '}
          <span css={theme({ display: 'block', color: 'white60' })}>
            for developers
          </span>
        </Subhead>
      </Flex>
    }
    blockTwo={
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxHeight: ['200px', '300px', '400px', '650px'],
          overflow: 'hidden'
        })}
      >
        <ArrowLink
          href='/embed'
          css={theme({
            color: 'white',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Explore the Embed API
        </ArrowLink>
      </Flex>
    }
  />
)

/* ─── API Docs Card ───────────────────────────────────── */

const EmbedApiDocsCard = () => (
  <Container
    as='section'
    id='api-docs'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [2, 2, 3, 3],
      pt: [5, 5, 5, 5],
      mb: [4, 4, 5, 5]
    })}
  >
    <Box
      css={theme({
        width: '100%',
        p: [3, 4],
        borderRadius: 3,
        textAlign: 'center'
      })}
    >
      <Flex css={theme({ justifyContent: 'center', pb: 4 })}>
        <SectionIcon icon={Code} />
      </Flex>
      <Subhead css={theme({ fontSize: 4 })}>
        Embed URL API Documentation
      </Subhead>
      <Caption
        css={theme({
          pt: 3,
          maxWidth: layout.normal,
          mx: 'auto',
          fontSize: 3
        })}
      >
        Read the full embed guide — iframe parameter, custom HTML/CSS,
        AI-generated previews, and the Microlink SDK across React, Vue, and
        vanilla JS.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          fontSize: [2, 2, 3, 3]
        })}
      >
        <ArrowLink href='/docs/guides/embed'>Embed guide</ArrowLink>
        <ArrowLink href='/docs/guides/embed/iframe'>iframe parameter</ArrowLink>
        <ArrowLink href='/sdk'>Microlink SDK</ArrowLink>
      </Flex>
    </Box>
  </Container>
)

/* ─── Product Information (FAQ) ────────────────────────── */

const ProductInformation = () => (
  <Faq
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [2, 2, 4, 4],
      pb: 4,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question: 'What does the URL embed tool do?',
        answer: (
          <>
            <div>
              Paste any URL and the tool calls the{' '}
              <Link href='/embed'>Microlink Embed API</Link> with{' '}
              <code>&iframe</code>. When the provider supports an iframe embed,
              you get the ready-to-paste HTML right there.
            </div>
            <div>
              For URLs without a player, the tool falls back to a Microlink SDK
              card preview — and the copy snippet ships with the vanilla SDK
              script, so it works on any page out of the box.
            </div>
          </>
        )
      },
      {
        question: 'How does the iframe parameter work?',
        answer: (
          <>
            <div>
              Pass <code>&iframe</code> on the Microlink API request. The
              response includes an{' '}
              <Link href='/docs/guides/embed/iframe'>
                <code>iframe.html</code> field
              </Link>{' '}
              with the provider's real player markup — YouTube, Spotify, Vimeo,
              X, TikTok, Figma, and the rest.
            </div>
            <div>
              No per-provider URL gymnastics — Microlink normalizes oEmbed
              across 280+ supported sites.
            </div>
          </>
        )
      },
      {
        question: 'Which providers are supported?',
        answer: (
          <>
            <div>
              280+ verified oEmbed providers including YouTube, Spotify, Twitter
              / X, Instagram, TikTok, GitHub, CodePen, CodeSandbox, Vimeo,
              SoundCloud, Figma, Reddit, Pinterest, Medium, TED, Twitch, and
              more.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/api/parameters/iframe/#providers-supported'>
                full provider list
              </Link>{' '}
              — it grows automatically, no SDK upgrade needed.
            </div>
          </>
        )
      },
      {
        question: 'What happens if a URL has no iframe?',
        answer: (
          <>
            <div>
              The tool falls back to a Microlink SDK card and gives you a
              vanilla HTML snippet that includes the{' '}
              <code>microlink.min.js</code> script from jsDelivr. Paste it
              anywhere — the SDK upgrades the link into a card on page load.
            </div>
            <div>
              For React or Vue, drop in the{' '}
              <Link href='/sdk'>Microlink SDK</Link> component instead — same
              data, framework-native rendering.
            </div>
          </>
        )
      },
      {
        question: 'Can I customize the embed look?',
        answer: (
          <>
            <div>
              Yes. The <Link href='/sdk'>Microlink SDK</Link> exposes CSS
              variables (<code>--microlink-background-color</code>,{' '}
              <code>--microlink-max-width</code>) and stable BEM class hooks for
              styling cards.
            </div>
            <div>
              For more control, fetch the metadata directly and build your own
              card — see the{' '}
              <Link href='/docs/guides/embed/sdk'>SDK guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'What if a URL has no image to preview?',
        answer: (
          <>
            <div>
              Microlink can capture a screenshot on demand — pass{' '}
              <code>screenshot=true</code> and the response includes a{' '}
              <code>screenshot.url</code> you can use as the fallback image.
              Every URL ends up with a usable visual.
            </div>
            <div>
              See the <Link href='/screenshot'>screenshot API</Link> for options
              like full page, dark mode, viewport, and format.
            </div>
          </>
        )
      },
      {
        question: 'Is the embed tool free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Cached
              responses are served instantly from 240+ Cloudflare edge nodes and
              don't count against your limit.
            </div>
            <div>
              For production volume, see <Link href='/pricing'>Pro plans</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Can I integrate URL embedding into my app?',
        answer: (
          <>
            <div>
              Yes. This tool is built on the{' '}
              <Link href='/embed'>Microlink Embed API</Link> — a plain HTTPS GET
              endpoint. Call it from any backend, edge runtime, browser, or
              static site.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK for Node.js, or drop in the{' '}
              <Link href='/sdk'>Microlink SDK</Link> for React, Vue, or vanilla
              JS.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Free URL Embed Tool — Generate iframe HTML in One Click'
    noSuffix
    description='Paste any URL and get a ready-to-paste HTML embed — iframe attribute from the Microlink API for 280+ providers, with a Microlink SDK card fallback for the long tail. Free, no login.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url',
        name: 'URL Embed Tool',
        description:
          'Free URL embed tool — paste any URL and get a ready-to-paste HTML embed. iframe attribute when supported, Microlink SDK card fallback otherwise. 280+ oEmbed providers.',
        url: 'https://microlink.io/tools/embed-url',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed url',
          'url embed',
          'url to iframe',
          'iframe generator',
          'url preview',
          'link preview',
          'oembed',
          'embed any url',
          'embed link'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 requests per day'
        },
        featureList: [
          'Embed any URL as iframe HTML',
          'Microlink SDK card fallback',
          'Copy ready-to-paste HTML',
          '280+ oEmbed providers',
          'Edge-cached responses',
          'No login required'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What does the URL embed tool do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste any URL and the tool calls the Microlink Embed API with the iframe parameter. When the provider supports an iframe embed, you get the ready-to-paste HTML. For URLs without a player, the tool falls back to a Microlink SDK card preview with a vanilla SDK snippet.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does the iframe parameter work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Pass &iframe on the Microlink API request. The response includes an iframe.html field with the provider's real player markup — YouTube, Spotify, Vimeo, X, TikTok, Figma, and the rest. Microlink normalizes oEmbed across 280+ supported sites."
            }
          },
          {
            '@type': 'Question',
            name: 'What happens if a URL has no iframe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool falls back to a Microlink SDK card and gives you a vanilla HTML snippet that includes microlink.min.js from jsDelivr. Paste it anywhere — the SDK upgrades the link into a card on page load.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the embed tool free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes — 50 requests per day, no login, no credit card. Cached responses are served from 240+ Cloudflare edge nodes and don't count against your limit."
            }
          }
        ]
      }
    ]}
  />
)

/* ─── Page Composition ─────────────────────────────────── */

const EmbedUrlPage = () => (
  <Layout>
    <Hero />
    <EmbedTool />
    <HowItWorks />
    <Explanation />
    <UseCasesSection />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Embed Any URL{' '}
          <span
            css={{
              display: 'block',
              color: '#3e55ff',
              width: '100%',
              textAlign: 'left'
            }}
          >
            iframes, cards, and oEmbed at scale.
          </span>
        </Subhead>
      }
      caption={
        <>
          One API to embed any URL — iframe HTML when supported, Microlink SDK
          card otherwise. See the <Link href='/embed'>embed landing</Link> for
          the full picture.
        </>
      }
      features={FEATURES_LIST}
    />
    <EmbedApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default EmbedUrlPage
