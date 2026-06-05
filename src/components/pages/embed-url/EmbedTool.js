import { trackEvent } from 'helpers/plausible'
import { colors, layout, theme, transition } from 'theme'
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  ArrowRight,
  Clipboard,
  Check,
  RotateCcw,
  HelpCircle
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { css, keyframes } from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Button } from 'components/elements/Button/Button'
import Text from 'components/elements/Text'

import Tooltip from 'components/patterns/Tooltip/Tooltip'
import { useClipboard } from 'components/hook/use-clipboard'
import { useLocalStorage } from 'components/hook/use-local-storage'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { normalizeApiError, getErrorMeta } from 'helpers/api-error'
import { buildLocalEmbedResponse } from 'helpers/embed-providers'

import { FadeIn, MOBILE_BP } from 'components/pages/screenshot'

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

const ELEMENT_GROUPS = [
  {
    id: 'identity',
    label: 'Identity',
    fields: [
      { id: 'siteIcon', label: 'Site icon' },
      { id: 'siteName', label: 'Site name' },
      { id: 'authorTopic', label: 'Author / topic' }
    ]
  },
  {
    id: 'content',
    label: 'Content',
    fields: [
      { id: 'description', label: 'Description' },
      { id: 'date', label: 'Date' }
    ]
  }
]

const COLOR_FIELDS = [
  { id: 'headline', label: 'Headline' },
  { id: 'description', label: 'Description' },
  { id: 'meta', label: 'Website' },
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

const CARD_TEXT_LIMITS = {
  large: { title: 90, description: 220 },
  small: { title: 60, description: 140 }
}

const truncate = (text, max) => {
  const str = String(text ?? '')
  if (str.length <= max) return str
  const slice = str.slice(0, max - 1)
  const trimmed = slice.replace(/\s+\S*$/, '')
  return `${trimmed || slice}…`
}

const imageLogoFallbackAttr = logoUrl =>
  logoUrl
    ? `onerror="this.onerror=null;this.src='${logoUrl.replace(
      /'/g,
      '&#39;'
    )}';this.style.objectFit='contain';this.style.padding='15%'" `
    : ''

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
    border: `${config.border}px solid ${palette.border}`,
    radius: `${config.radius}px`,
    shadow: resolveShadow(config.shadow, config.shadowColor),
    elements: config.elements,
    metaBefore: config.metaBefore
  }
}

const de = (s, kind) => (s.instrument ? ` data-element="${kind}"` : '')

const buildMetaPieces = (data, s) => {
  const pieces = []
  if (s.elements.siteIcon && data?.logo?.url) {
    pieces.push(
      `<img${de(s, 'siteIcon')} src="${escAttr(
        data.logo.url
      )}" alt="" style="width:${s.metaSize + 4}px;height:${
        s.metaSize + 4
      }px;border-radius:4px;flex-shrink:0" />`
    )
  }
  if (s.elements.siteName && data?.publisher) {
    pieces.push(
      `<span${de(s, 'siteName')} style="font-size:${s.metaSize}px;font-weight:${
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
      `<span${de(s, 'authorTopic')} style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">${escText(data.author)}</span>`
    )
  }
  if (s.elements.date && data?.date) {
    const dateStr = formatDate(data.date)
    if (dateStr) {
      pieces.push(
        `<span${de(s, 'date')} style="font-size:${s.metaSize}px;color:${
          s.palette.meta
        }">${escText(dateStr)}</span>`
      )
    }
  }
  if (!pieces.length) return ''
  return `<div${de(
    s,
    'meta'
  )} style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:${
    s.metaSize + 4
  }px">${pieces.join('')}</div>`
}

const buildLargeCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const imageUrl = data?.image?.url ? escAttr(data.image.url) : ''
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(
    truncate(data?.title || '', CARD_TEXT_LIMITS.large.title)
  )
  const description = s.elements.description
    ? escText(
      truncate(data?.description || '', CARD_TEXT_LIMITS.large.description)
    )
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const metaHtml = buildMetaPieces(data, s)

  const mediaInner = imageUrl
    ? `<img src="${imageUrl}" alt="" ${imageLogoFallbackAttr(
      logoUrl
    )}style="width:100%;height:100%;object-fit:cover;display:block" />`
    : ''

  const titleHtml = `<div${de(s, 'headline')} style="font-size:${
    s.headlineSize
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };margin:0">${title}</div>`
  const descriptionHtml = description
    ? `<div${de(s, 'description')} style="font-size:${
      s.descriptionSize
    }px;color:${s.palette.description};line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaHtml}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaHtml}`

  return `<a${de(
    s,
    'frame'
  )} href="${href}" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;color:inherit;width:100%;max-width:460px;background:${
    s.palette.background
  };border-radius:${s.radius};overflow:hidden;border:${s.border};box-shadow:${
    s.shadow
  };font-family:${s.fontFamily}">
  <div style="width:100%;aspect-ratio:16 / 9;background:${fallbackBg};overflow:hidden">${mediaInner}</div>
  <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px">${body}</div>
</a>`
}

const buildWideCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const imageUrl = data?.image?.url ? escAttr(data.image.url) : ''
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(data?.title || '')
  const description = s.elements.description
    ? escText(data?.description || '')
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const metaHtml = buildMetaPieces(data, s)

  const mediaInner = imageUrl
    ? `<img src="${imageUrl}" alt="" ${imageLogoFallbackAttr(
      logoUrl
    )}style="width:100%;height:100%;object-fit:cover;display:block" />`
    : ''

  const titleHtml = `<div${de(s, 'headline')} style="font-size:${
    s.headlineSize
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${title}</div>`
  const descriptionHtml = description
    ? `<div${de(s, 'description')} style="font-size:${
      s.descriptionSize
    }px;color:${s.palette.description};line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaHtml}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaHtml}`

  return `<a${de(
    s,
    'frame'
  )} href="${href}" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;width:100%;max-width:460px;min-height:140px;background:${
    s.palette.background
  };border-radius:${s.radius};overflow:hidden;border:${s.border};box-shadow:${
    s.shadow
  };font-family:${s.fontFamily}">
  <div style="width:140px;flex-shrink:0;align-self:stretch;background:${fallbackBg};overflow:hidden">${mediaInner}</div>
  <div style="padding:14px;display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;justify-content:center">${body}</div>
</a>`
}

const buildSmallCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(
    truncate(data?.title || '', CARD_TEXT_LIMITS.small.title)
  )
  const description = s.elements.description
    ? escText(
      truncate(data?.description || '', CARD_TEXT_LIMITS.small.description)
    )
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))

  const showIcon = s.elements.siteIcon
  const iconNode = !showIcon
    ? ''
    : logoUrl
      ? `<img${de(
        s,
        'siteIcon'
      )} src="${logoUrl}" alt="" style="width:36px;height:36px;border-radius:8px;flex-shrink:0" />`
      : `<div${de(
        s,
        'siteIcon'
      )} style="width:36px;height:36px;border-radius:8px;flex-shrink:0;background:${fallbackBg}"></div>`

  const publisherText =
    s.elements.siteName && data?.publisher
      ? `<span${de(s, 'siteName')} style="font-size:${
        s.metaSize + 1
      }px;font-weight:${s.fontWeight};color:${s.palette.meta}">${escText(
        data.publisher
      )}</span>`
      : ''
  const authorText =
    s.elements.authorTopic && data?.author
      ? `<span aria-hidden="true" style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">· </span><span${de(s, 'authorTopic')} style="font-size:${
        s.metaSize
      }px;color:${s.palette.meta}">${escText(data.author)}</span>`
      : ''
  const dateText =
    s.elements.date && data?.date
      ? `<span${de(s, 'date')} style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">${escText(formatDate(data.date))}</span>`
      : ''

  const metaRow =
    publisherText || authorText
      ? `<div${de(
        s,
        'meta'
      )} style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;gap:8px">
      <span style="display:flex;align-items:center;gap:4px;min-width:0;overflow:hidden">${publisherText}${authorText}</span>
      ${dateText}
    </div>`
      : ''

  const titleHtml = `<div${de(s, 'headline')} style="font-size:${
    s.headlineSize - 3
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };margin-bottom:2px">${title}</div>`
  const descriptionHtml = description
    ? `<div${de(s, 'description')} style="font-size:${
      s.descriptionSize - 1
    }px;color:${s.palette.description};line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaRow}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaRow}`

  return `<a${de(
    s,
    'frame'
  )} href="${href}" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;gap:10px;align-items:flex-start;width:100%;max-width:380px;padding:12px 14px;border-radius:${
    s.radius
  };background:${
    s.palette.background
  };-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);border:${
    s.border
  };box-shadow:${s.shadow};font-family:${s.fontFamily}">
  ${iconNode}
  <div style="flex:1;min-width:0">${body}</div>
</a>`
}

const CARD_VARIANTS = [
  { id: 'large', label: 'Standard cover', build: buildLargeCard },
  { id: 'wide', label: 'Wide cover', build: buildWideCard },
  { id: 'small', label: 'Compact cover', build: buildSmallCard }
]

const buildCardHtml = (data, config, { instrument = false } = {}) => {
  const variant =
    CARD_VARIANTS.find(v => v.id === config.variant) || CARD_VARIANTS[0]
  const s = resolveStyle(config)
  s.instrument = instrument
  return variant.build(data, s)
}

const isSameConfig = (a, b) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}
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

const EDITABLE_FIELD_BY_ELEMENT = {
  headline: 'title',
  description: 'description',
  siteName: 'publisher',
  authorTopic: 'author'
}

const EDITABLE_KINDS = Object.keys(EDITABLE_FIELD_BY_ELEMENT)

const HOVER_HIGHLIGHT_KINDS = [
  'frame',
  'headline',
  'description',
  'meta',
  'siteIcon',
  'siteName',
  'authorTopic',
  'date',
  'hostname'
]

const HOVER_FADE_KINDS = HOVER_HIGHLIGHT_KINDS.filter(k => k !== 'frame')

const EmbedPreviewFrame = styled(Box)`
  ${theme({ p: 3, pt: '24px' })}
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  background: #fff;

  & [data-element] {
    transition: opacity 200ms ease;
    outline-color: ${colors.link};
  }

  ${HOVER_HIGHLIGHT_KINDS.map(
    kind => `
    &[data-hover-target='${kind}'] [data-element='${kind}'] {
      outline: 2px dashed ${colors.link};
      outline-offset: 4px;
      border-radius: 4px;
    }
  `
  ).join('\n')}

  ${HOVER_FADE_KINDS.map(
    kind => `
    &[data-hover-target='${kind}'] [data-element]:not([data-element='${kind}']):not(:has([data-element])) {
      opacity: 0.7;
    }
  `
  ).join('\n')}

  ${EDITABLE_KINDS.map(kind => {
    const above = kind === 'description'
    return `
    & [data-element='${kind}']:hover:not([contenteditable='true']) {
      outline: 2px dashed ${colors.link};
      outline-offset: 4px;
      border-radius: 4px;
      cursor: text;
      position: relative;
    }
    & [data-element='${kind}']:hover:not([contenteditable='true'])::after {
      content: 'Click to edit';
      position: absolute;
      ${above ? 'bottom: calc(100% + 6px);' : 'top: calc(100% + 6px);'}
      left: 0;
      background: ${colors.black};
      color: #fff;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2px;
      line-height: 1.4;
      font-family: 'Inter', system-ui, sans-serif;
      text-transform: none;
      padding: 3px 7px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
      opacity: 0;
      animation: editTipFadeIn 180ms ease-out 80ms forwards;
    }
  `
  }).join('\n')}

  & [data-element][contenteditable='true'] {
    outline: 2px solid ${colors.link};
    outline-offset: 4px;
    border-radius: 4px;
    cursor: text;
    -webkit-line-clamp: unset;
    display: block;
    max-height: none;
    overflow: visible;
    white-space: pre-wrap;
  }

  @keyframes editTipFadeIn {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    & [data-element]:hover::after {
      animation: none;
      opacity: 1;
    }
  }
`

const IframePreviewFrame = styled(EmbedPreviewFrame)`
  overflow: visible;
  align-items: stretch;
  height: auto;
  min-height: 0;

  & iframe {
    display: block;
    max-width: 100%;
    border: 0;
    border-radius: 6px;
    background: ${colors.black05};
  }
`

const VariantSelector = styled(Flex)`
  ${theme({ gap: 1, p: 1 })}
  background: ${colors.black05};
  border-radius: 10px;
  align-items: stretch;
  width: 100%;
`

const VariantButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: 2,
    borderRadius: '8px',
    cursor: 'pointer'
  })}
  flex: 1 1 0;
  min-width: 0;
  border: none;
  background: ${({ $active }) => ($active ? colors.white : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 2px rgba(0, 0, 0, 0.08)' : 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

const VariantThumb = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$active'
})`
  width: 64px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${({ $active }) => ($active ? colors.link : colors.black10)};
  background: white;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  box-shadow: ${({ $active }) =>
    $active ? `0 0 0 1px ${colors.link}` : 'none'};
  transition: border-color ${transition.short}, box-shadow ${transition.short};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ThumbImage = styled(Box)`
  background: linear-gradient(135deg, ${colors.black20}, ${colors.black05});
  flex-shrink: 0;
`

const ThumbBar = styled(Box)`
  background: ${colors.black10};
  border-radius: 1px;
  height: 3px;
`

const ThumbSlot = styled(Box)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const VariantPreview = ({ id, active }) => {
  if (id === 'large') {
    return (
      <ThumbSlot>
        <VariantThumb
          $active={active}
          css={{ height: 40, flexDirection: 'column' }}
        >
          <ThumbImage css={{ height: 18, width: '100%' }} />
          <Box
            css={{
              flex: 1,
              padding: '3px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center'
            }}
          >
            <ThumbBar css={{ width: '80%' }} />
            <ThumbBar css={{ width: '55%' }} />
          </Box>
        </VariantThumb>
      </ThumbSlot>
    )
  }
  if (id === 'wide') {
    return (
      <ThumbSlot>
        <VariantThumb
          $active={active}
          css={{ height: 26, flexDirection: 'row' }}
        >
          <ThumbImage css={{ width: 20, height: '100%' }} />
          <Box
            css={{
              flex: 1,
              padding: '4px 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center'
            }}
          >
            <ThumbBar css={{ width: '85%' }} />
            <ThumbBar css={{ width: '60%' }} />
          </Box>
        </VariantThumb>
      </ThumbSlot>
    )
  }
  return (
    <ThumbSlot>
      <VariantThumb
        $active={active}
        css={{
          height: 22,
          flexDirection: 'row',
          alignItems: 'center',
          padding: '3px 4px',
          gap: 5
        }}
      >
        <Box
          css={{
            width: 12,
            height: 12,
            borderRadius: 3,
            background: colors.black10,
            flexShrink: 0
          }}
        />
        <Box
          css={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center'
          }}
        >
          <ThumbBar css={{ width: '90%' }} />
          <ThumbBar css={{ width: '60%' }} />
        </Box>
      </VariantThumb>
    </ThumbSlot>
  )
}

const EditorShell = styled(PaperSheet)`
  ${theme({ width: '100%' })}
  min-width: 0;
  flex: 1 1 0;
  border: none;
  box-shadow: none;

  @media (min-width: ${MOBILE_BP}px) {
    min-height: ${PREVIEW_HEIGHT};
  }
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

const GroupLabel = styled(Caps)`
  ${theme({ fontSize: 0, color: 'black40', pt: 2, pb: '4px' })}
  display: block;
  letter-spacing: 0.6px;
  font-weight: 500;
`

const PreviewSectionLabel = styled(Caps)`
  ${theme({ fontSize: 0, color: 'black60', pb: 1 })}
  display: block;
  letter-spacing: 1px;
  font-weight: 700;
`

const editDiscoveryFadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, 4px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`

const editDiscoveryFadeOut = keyframes`
  from { opacity: 1; transform: translate(-50%, 0); }
  to { opacity: 0; transform: translate(-50%, 4px); }
`

const EditDiscoveryPopover = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$leaving'
})`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%, 0);
  background: ${colors.black};
  color: #fff;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.1px;
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 20;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  animation: ${({ $leaving }) =>
      $leaving ? editDiscoveryFadeOut : editDiscoveryFadeIn}
    220ms ease-out both;

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 7px;
    height: 7px;
    background: ${colors.black};
    border-radius: 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const PreviewWithHint = styled(Box)`
  position: relative;
  width: 100%;
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

const ViewToggle = styled(Flex)`
  ${theme({ gap: '4px', p: '4px' })}
  background: ${colors.black05};
  border-radius: 10px;
  align-items: center;
  flex-shrink: 0;
`

const ViewToggleButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    px: 3,
    py: '8px',
    borderRadius: '8px',
    cursor: 'pointer'
  })}
  min-width: 110px;
  text-align: center;
  border: none;
  background: ${({ $active }) => ($active ? colors.white : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 2px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const UnitFieldWrap = styled(Box)`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  & input {
    padding-right: 26px;
    width: 80px;
  }
`

const RangeInput = styled.input.attrs({ type: 'range' })`
  flex: 1;
  min-width: 80px;
  accent-color: ${colors.link};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 4px;
    border-radius: 2px;
  }
`

const ChipButton = styled(Box)
  .attrs({ as: 'button', type: 'button' })
  .withConfig({
    shouldForwardProp: prop => prop !== '$active'
  })`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: '8px',
    py: '2px',
    borderRadius: '999px',
    cursor: 'pointer'
  })}
  border: 1px solid
    ${({ $active }) => ($active ? colors.link : colors.black10)};
  background: ${({ $active }) => ($active ? colors.link : 'white')};
  color: ${({ $active }) => ($active ? 'white' : colors.black60)};
  line-height: 1.4;
  transition: background ${transition.short}, color ${transition.short},
    border-color ${transition.short};
  touch-action: manipulation;

  &:hover {
    border-color: ${({ $active }) => ($active ? colors.link : colors.black40)};
    color: ${({ $active }) => ($active ? 'white' : colors.black)};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const UnitSuffix = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${colors.black40};
  font-size: 11px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
`

const HelpIconWrap = styled(Box).attrs({ as: 'span' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin-left: 4px;
  color: ${colors.black40};
  line-height: 0;

  &:hover {
    color: ${colors.black80};
  }
`

const ExampleUrlText = styled(Box).attrs({ as: 'span' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    color: 'black60'
  })}
  text-decoration: underline;
  text-decoration-color: ${colors.black10};
  text-underline-offset: 2px;
`

const MobileHiddenInline = styled(Box).attrs({ as: 'span' })`
  @media (max-width: ${MOBILE_BP - 1}px) {
    display: none;
  }
`

const CopiedFlash = styled.span.withConfig({
  shouldForwardProp: prop => prop !== '$visible'
})`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 12px;
  color: ${colors.green5};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 300ms ease-out;
  pointer-events: none;
`

const ResultGrid = styled(Flex)`
  ${theme({ gap: 3, width: '100%' })}
  flex-direction: column;
  align-items: stretch;

  @media (min-width: ${MOBILE_BP}px) {
    flex-direction: row;
  }
`

const ResultPane = styled(PaperSheet).withConfig({
  shouldForwardProp: prop => prop !== '$autoHeight'
})`
  ${theme({ width: '100%' })}
  min-width: 0;
  border: none;
  box-shadow: none;
  overflow: ${({ $autoHeight }) => ($autoHeight ? 'visible' : 'hidden')};
  height: ${({ $autoHeight }) =>
    $autoHeight ? 'auto' : PREVIEW_HEIGHT_MOBILE};
  min-height: ${({ $autoHeight }) =>
    $autoHeight ? '0' : PREVIEW_HEIGHT_MOBILE};

  @media (min-width: ${MOBILE_BP}px) {
    flex: ${({ $autoHeight }) =>
      $autoHeight ? '1 1 auto' : `1 0 ${PREVIEW_HEIGHT}`};
    height: ${({ $autoHeight }) => ($autoHeight ? 'auto' : PREVIEW_HEIGHT)};
    min-height: ${({ $autoHeight }) => ($autoHeight ? '0' : PREVIEW_HEIGHT)};
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

const LOADING_MESSAGES = [
  'Fetching the link.',
  'Reading the page.',
  'Looking for an embed.',
  'Building your preview.',
  'Almost ready.'
]

const LOADING_TICK_MS = 2500

const SKELETON_VARIANTS = ['large', 'wide', 'small']

const skeletonShimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

const SKELETON_TRANSITION = '500ms cubic-bezier(0.4, 0, 0.2, 1)'
const SKELETON_BLOCK_BG = css`
  background: linear-gradient(90deg, #efefef 0%, #e4e4e4 50%, #efefef 100%);
  background-size: 200% 100%;
  animation: ${skeletonShimmer} 1.6s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: #ececec;
  }
`

const SkeletonImage = styled(Box)`
  position: absolute;
  ${SKELETON_BLOCK_BG}
  transition:
    top ${SKELETON_TRANSITION},
    left ${SKELETON_TRANSITION},
    right ${SKELETON_TRANSITION},
    width ${SKELETON_TRANSITION},
    height ${SKELETON_TRANSITION},
    border-radius ${SKELETON_TRANSITION};
`

const SkeletonBody = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: top ${SKELETON_TRANSITION}, left ${SKELETON_TRANSITION},
    right ${SKELETON_TRANSITION}, bottom ${SKELETON_TRANSITION},
    padding ${SKELETON_TRANSITION}, gap ${SKELETON_TRANSITION};
`

const SkeletonLine = styled(Box).withConfig({
  shouldForwardProp: prop => !['$width', '$height'].includes(prop)
})`
  ${SKELETON_BLOCK_BG}
  height: ${({ $height = 10 }) => `${$height}px`};
  width: ${({ $width = '100%' }) => $width};
  border-radius: 4px;
  transition: width ${SKELETON_TRANSITION}, height ${SKELETON_TRANSITION};
`

const SkeletonStage = styled(Box)`
  width: 100%;
  max-width: 380px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SkeletonCard = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$variant'
})`
  position: relative;
  width: 100%;
  background: #fff;
  border: 1px solid ${colors.black10};
  overflow: hidden;
  transition: height ${SKELETON_TRANSITION},
    border-radius ${SKELETON_TRANSITION};

  &[data-variant='large'] {
    height: 260px;
    border-radius: 8px;
  }
  &[data-variant='wide'] {
    height: 140px;
    border-radius: 8px;
  }
  &[data-variant='small'] {
    height: 64px;
    border-radius: 12px;
  }

  &[data-variant='large'] ${SkeletonImage} {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56.25%;
    border-radius: 0;
  }
  &[data-variant='wide'] ${SkeletonImage} {
    top: 0;
    left: 0;
    width: 140px;
    height: 100%;
    border-radius: 0;
  }
  &[data-variant='small'] ${SkeletonImage} {
    top: 14px;
    left: 14px;
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }

  &[data-variant='large'] ${SkeletonBody} {
    top: 56.25%;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 14px 16px;
    gap: 8px;
  }
  &[data-variant='wide'] ${SkeletonBody} {
    top: 0;
    left: 140px;
    right: 0;
    bottom: 0;
    padding: 14px;
    gap: 8px;
  }
  &[data-variant='small'] ${SkeletonBody} {
    top: 14px;
    left: 60px;
    right: 14px;
    bottom: 14px;
    padding: 0;
    gap: 6px;
  }
`

const SkeletonLoader = ({ tick = 0 }) => {
  const variant = SKELETON_VARIANTS[tick % SKELETON_VARIANTS.length]

  return (
    <SkeletonStage aria-hidden='true'>
      <SkeletonCard data-variant={variant}>
        <SkeletonImage />
        <SkeletonBody>
          <SkeletonLine $width='72%' $height={12} />
          <SkeletonLine $width='95%' $height={10} />
          <SkeletonLine $width='45%' $height={10} />
        </SkeletonBody>
      </SkeletonCard>
    </SkeletonStage>
  )
}

const LoadingMessage = ({ tick = 0 }) => {
  const index = tick % LOADING_MESSAGES.length

  return (
    <Box aria-live='polite' aria-atomic='true'>
      <FadeIn key={index}>
        <Text
          css={theme({
            color: 'black50',
            fontSize: 1,
            fontFamily: 'sans',
            textAlign: 'center'
          })}
        >
          {LOADING_MESSAGES[index]}
        </Text>
      </FadeIn>
    </Box>
  )
}

const LoadingState = () => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), LOADING_TICK_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <SkeletonLoader tick={tick} />
      <LoadingMessage tick={tick} />
    </>
  )
}

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

const EXAMPLE_URLS = [
  { url: 'youtube.com' },
  { url: 'tiktok.com' },
  { url: 'twitter.com' },
  { url: 'spotify.com', hideOnMobile: true },
  { url: 'facebook.com', hideOnMobile: true }
]

const Omnibar = ({
  url,
  setUrl,
  onSubmit,
  isLoading,
  exampleUrls = EXAMPLE_URLS,
  placeholder: placeholderProp
}) => {
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

  const handleSubmit = useCallback(
    nextValue => {
      const raw = typeof nextValue === 'string' ? nextValue : url
      const next = normalizeUrl(raw)
      if (!next || !isUrl(next)) {
        setUrlError('Please enter a valid URL (e.g., example.com)')
        return
      }
      setUrl(next)
      setUrlError('')
      onSubmit(next)
    },
    [url, setUrl, onSubmit]
  )

  return (
    <Box css={{ width: '100%' }}>
      <OmniboxWrapper>
        <OmniboxInput
          id='embed-url'
          type='url'
          inputMode='url'
          autoComplete='url'
          placeholder={placeholderProp || 'Paste a URL…'}
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
        <OmniboxConvertButton
          onClick={() => handleSubmit()}
          disabled={isLoading}
          aria-label='Generate preview'
        >
          <span className='omnibox-btn-label'>Generate preview</span>
          <ArrowRight size={16} />
        </OmniboxConvertButton>
      </OmniboxWrapper>
      {urlError
        ? (
          <Text
            id='embed-url-error'
            role='alert'
            css={theme({ color: 'fullscreen', fontSize: 0, pt: 1, pl: 3 })}
          >
            {urlError}
          </Text>
          )
        : !url.trim() && exampleUrls.length > 0
            ? (
              <Text
                css={theme({
                  fontFamily: 'sans',
                  color: 'black60',
                  fontSize: 0,
                  pt: 2,
                  pl: 3
                })}
              >
                <Box as='span' css={{ marginRight: 4 }}>
                  Try:
                </Box>
                {exampleUrls.map(({ url: example, hideOnMobile }, i) => {
                  const Wrapper = hideOnMobile ? MobileHiddenInline : React.Fragment
                  return (
                    <Wrapper key={example}>
                      {i > 0 && (
                        <Box
                          as='span'
                          aria-hidden='true'
                          css={{
                            marginLeft: 6,
                            marginRight: 6,
                            color: colors.black30
                          }}
                        >
                          ·
                        </Box>
                      )}
                      <ExampleUrlText>{example}</ExampleUrlText>
                    </Wrapper>
                  )
                })}
              </Text>
              )
            : null}
    </Box>
  )
}

/* ─── Result Panes ─────────────────────────────────────── */

const PreviewPane = ({
  html,
  hasIframe,
  hoverTarget,
  scripts,
  onEditField
}) => {
  const cardRef = useRef(null)
  const needsSandbox = hasIframe && Array.isArray(scripts) && scripts.length > 0

  useEffect(() => {
    if (hasIframe) return
    const root = cardRef.current
    if (!root || !onEditField) return

    const onClick = e => {
      const el = e.target.closest('[data-element]')
      if (!el || !root.contains(el)) return
      const kind = el.getAttribute('data-element')
      const field = EDITABLE_FIELD_BY_ELEMENT[kind]
      if (!field) return

      e.preventDefault()
      e.stopPropagation()

      if (el.getAttribute('contenteditable') === 'true') return

      el.setAttribute('contenteditable', 'true')
      el.focus()
      try {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } catch (_) {
        // Selection API may not be available in some browsers — caret stays at start
      }

      const commit = () => {
        el.removeEventListener('blur', commit)
        el.removeEventListener('keydown', onKey)
        el.removeAttribute('contenteditable')
        const value = (el.textContent || '').replace(/\s+/g, ' ').trim()
        onEditField(field, value)
      }

      const onKey = ev => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
          ev.preventDefault()
          el.blur()
        } else if (ev.key === 'Escape') {
          ev.preventDefault()
          el.blur()
        }
      }

      el.addEventListener('blur', commit)
      el.addEventListener('keydown', onKey)
    }

    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [hasIframe, html, onEditField])

  return (
    <ResultPane $autoHeight={hasIframe}>
      {hasIframe
        ? (
            needsSandbox
              ? (
                <IframePreviewFrame>
                  <SandboxedEmbed html={html} scripts={scripts} />
                </IframePreviewFrame>
                )
              : (
                <IframePreviewFrame dangerouslySetInnerHTML={{ __html: html }} />
                )
          )
        : (
          <EmbedPreviewFrame
            ref={cardRef}
            data-hover-target={hoverTarget || undefined}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          )}
    </ResultPane>
  )
}

const compactHtml = html =>
  String(html || '')
    .replace(/\n+/g, '')
    .replace(/>\s+</g, '><')
    .replace(/ {2,}/g, ' ')
    .trim()

const serializeIframeScripts = scripts => {
  if (!Array.isArray(scripts) || scripts.length === 0) return ''
  return scripts
    .filter(s => s && s.src)
    .map(({ src, async, charset }) => {
      const attrs = [`src="${escAttr(src)}"`]
      if (async) attrs.push('async')
      if (charset) attrs.push(`charset="${escAttr(charset)}"`)
      return `<script ${attrs.join(' ')}></script>`
    })
    .join('')
}

const IFRAME_SANDBOX_PERMISSIONS =
  'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation'

const RESIZE_MESSAGE_TYPE = 'microlink-embed-resize'

const RESIZE_BRIDGE_SCRIPT = `(function(){var post=function(){try{var h=Math.max(document.documentElement.scrollHeight,document.body?document.body.scrollHeight:0);parent.postMessage({type:'${RESIZE_MESSAGE_TYPE}',height:h},'*')}catch(e){}};post();if(typeof ResizeObserver!=='undefined'){new ResizeObserver(post).observe(document.documentElement);if(document.body)new ResizeObserver(post).observe(document.body)}setTimeout(post,500);setTimeout(post,1500);setTimeout(post,3500)})();`

const buildSandboxedSrcdoc = (html, scripts) =>
  `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;padding:0;background:transparent;font-family:system-ui,-apple-system,sans-serif}body{display:flex;align-items:flex-start;justify-content:center}iframe,blockquote,img{max-width:100%}</style></head><body>${
    html || ''
  }${serializeIframeScripts(
    scripts
  )}<script>${RESIZE_BRIDGE_SCRIPT}</script></body></html>`

const SandboxedEmbedIframe = styled('iframe')`
  display: block;
  width: 100%;
  min-height: 240px;
  border: 0;
  background: transparent;
`

const SandboxedEmbed = ({ html, scripts }) => {
  const [height, setHeight] = useState(null)

  useEffect(() => {
    const onMessage = event => {
      const data = event?.data
      if (!data || data.type !== RESIZE_MESSAGE_TYPE) return
      const h = Number(data.height)
      if (Number.isFinite(h) && h > 0) setHeight(Math.ceil(h))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const srcDoc = useMemo(
    () => buildSandboxedSrcdoc(html, scripts),
    [html, scripts]
  )

  return (
    <SandboxedEmbedIframe
      sandbox={IFRAME_SANDBOX_PERMISSIONS}
      referrerPolicy='no-referrer'
      loading='lazy'
      srcDoc={srcDoc}
      style={height ? { height } : undefined}
    />
  )
}

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
    setTimeout(() => setCopied(false), 2000)
  }, [html, toClipboard])

  return (
    <PaperSheet css={{ width: '100%' }}>
      <PaneHeader>
        <Flex css={{ flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <Text
            as='h3'
            css={theme({
              fontFamily: 'sans',
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black80',
              m: 0
            })}
          >
            Embed code (HTML)
          </Text>
          <Text
            css={theme({
              fontFamily: 'sans',
              fontSize: 0,
              color: 'black50',
              m: 0
            })}
          >
            Paste this HTML wherever you want the preview to appear.
          </Text>
        </Flex>
        <Flex css={{ alignItems: 'center', gap: 8 }}>
          <CopiedFlash $visible={copied} aria-hidden='true'>
            Copied!
          </CopiedFlash>
          <SmallActionButton
            onClick={handleCopy}
            aria-label={
              copied ? 'Copied to clipboard' : 'Copy embed code to clipboard'
            }
            aria-live='polite'
          >
            {copied
              ? (
                <Check size={14} color={colors.green5} />
                )
              : (
                <Clipboard size={14} />
                )}
            <span>{copied ? 'Copied!' : 'Copy code'}</span>
          </SmallActionButton>
        </Flex>
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

const LayoutTab = ({ config, set, setHoverTarget }) => {
  const hover = target => ({
    onMouseEnter: () => setHoverTarget(target),
    onMouseLeave: () => setHoverTarget(null)
  })

  return (
    <Box>
      <SectionHeader>Card style</SectionHeader>
      <VariantSelector
        role='radiogroup'
        aria-label='Card style'
        css={{ marginBottom: 8 }}
      >
        {CARD_VARIANTS.map(({ id, label }) => {
          const isActive = config.variant === id
          return (
            <VariantButton
              key={id}
              role='radio'
              aria-checked={isActive}
              $active={isActive}
              onClick={() => set('variant', id)}
            >
              <VariantPreview id={id} active={isActive} />
              {label}
            </VariantButton>
          )
        })}
      </VariantSelector>

      <SectionHeader>Elements to include</SectionHeader>
      <Box
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 16
        }}
      >
        {ELEMENT_GROUPS.map(group => (
          <Box key={group.id}>
            <GroupLabel as='span'>{group.label}</GroupLabel>
            {group.fields.map(({ id, label }) => (
              <CheckboxWrap key={id} {...hover(id)}>
                <input
                  type='checkbox'
                  checked={!!config.elements[id]}
                  onChange={e => set(`elements.${id}`, e.target.checked)}
                />
                <Text css={theme({ fontSize: 1, color: 'black80' })}>
                  {label}
                </Text>
              </CheckboxWrap>
            ))}
            {group.id === 'content'
              ? (
                <Flex css={{ alignItems: 'center' }} {...hover('meta')}>
                  <CheckboxWrap>
                    <input
                      type='checkbox'
                      checked={!!config.metaBefore}
                      onChange={e => set('metaBefore', e.target.checked)}
                    />
                    <Text css={theme({ fontSize: 1, color: 'black80' })}>
                      Site name on top
                    </Text>
                  </CheckboxWrap>
                  <Tooltip
                    aria-label='Help: show site name above title'
                    content={
                      <Tooltip.Content>
                        When enabled, the site name appears above the title —
                        useful for branded previews.
                      </Tooltip.Content>
                  }
                  >
                    <HelpIconWrap>
                      <HelpCircle size={13} />
                    </HelpIconWrap>
                  </Tooltip>
                </Flex>
                )
              : null}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const FrameTab = ({ config, set, setHoverTarget }) => {
  const hover = target => ({
    onMouseEnter: () => setHoverTarget(target),
    onMouseLeave: () => setHoverTarget(null)
  })

  return (
    <Box>
      <SectionHeader>Frame</SectionHeader>
      <Box>
        <FormRow css={{ alignItems: 'flex-start' }} {...hover('frame')}>
          <FormLabel css={{ paddingTop: 6 }}>Border</FormLabel>
          <Flex
            css={{
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 6,
              minWidth: 200
            }}
          >
            <Flex css={{ alignItems: 'center', gap: 8 }}>
              <RangeInput
                min='0'
                max='10'
                step='1'
                value={config.border}
                onChange={e =>
                  set('border', Math.max(0, Number(e.target.value) || 0))}
                aria-label='Border width'
              />
              <UnitFieldWrap>
                <NumberField
                  type='number'
                  min='0'
                  max='10'
                  value={config.border}
                  onChange={e =>
                    set('border', Math.max(0, Number(e.target.value) || 0))}
                  aria-label='Border width in pixels'
                />
                <UnitSuffix aria-hidden='true'>px</UnitSuffix>
              </UnitFieldWrap>
            </Flex>
            <Flex css={{ gap: 4, flexWrap: 'wrap' }}>
              {[0, 1, 2, 4].map(v => (
                <ChipButton
                  key={v}
                  $active={config.border === v}
                  onClick={() => set('border', v)}
                  aria-label={`Border ${v} pixels`}
                  aria-pressed={config.border === v}
                >
                  {v}
                </ChipButton>
              ))}
            </Flex>
          </Flex>
        </FormRow>
        <FormRow css={{ alignItems: 'flex-start' }} {...hover('frame')}>
          <FormLabel css={{ paddingTop: 6 }}>Radius</FormLabel>
          <Flex
            css={{
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 6,
              minWidth: 200
            }}
          >
            <Flex css={{ alignItems: 'center', gap: 8 }}>
              <RangeInput
                min='0'
                max='32'
                step='1'
                value={config.radius}
                onChange={e =>
                  set('radius', Math.max(0, Number(e.target.value) || 0))}
                aria-label='Border radius'
              />
              <UnitFieldWrap>
                <NumberField
                  type='number'
                  min='0'
                  max='40'
                  value={config.radius}
                  onChange={e =>
                    set('radius', Math.max(0, Number(e.target.value) || 0))}
                  aria-label='Border radius in pixels'
                />
                <UnitSuffix aria-hidden='true'>px</UnitSuffix>
              </UnitFieldWrap>
            </Flex>
            <Flex css={{ gap: 4, flexWrap: 'wrap' }}>
              {[0, 4, 8, 16, 24].map(v => (
                <ChipButton
                  key={v}
                  $active={config.radius === v}
                  onClick={() => set('radius', v)}
                  aria-label={`Radius ${v} pixels`}
                  aria-pressed={config.radius === v}
                >
                  {v}
                </ChipButton>
              ))}
            </Flex>
          </Flex>
        </FormRow>
        <FormRow {...hover('frame')}>
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
        <FormRow {...hover('frame')}>
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
}

const FONT_SIZE_FIELDS = [
  { key: 'headlineSize', label: 'Headline', target: 'headline' },
  { key: 'descriptionSize', label: 'Description', target: 'description' },
  { key: 'metaSize', label: 'Website', target: 'meta' }
]

const FontsTab = ({ config, set, setHoverTarget }) => {
  const hover = target => ({
    onMouseEnter: () => setHoverTarget(target),
    onMouseLeave: () => setHoverTarget(null)
  })

  return (
    <Box>
      <SectionHeader>Typography</SectionHeader>
      <FormRow {...hover('frame')}>
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
      <FormRow {...hover('frame')}>
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
      <FormRow {...hover('frame')}>
        <FormLabel>Line height</FormLabel>
        <NumberField
          type='number'
          step='0.1'
          min='1'
          max='3'
          value={config.lineHeight}
          onChange={e =>
            set('lineHeight', Math.max(1, Number(e.target.value) || 1))}
        />
      </FormRow>

      <SectionHeader>Sizes (px)</SectionHeader>
      {FONT_SIZE_FIELDS.map(({ key, label, target }) => (
        <FormRow key={key} {...hover(target)}>
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
}

const COLOR_TARGET_MAP = {
  headline: 'headline',
  description: 'description',
  meta: 'meta',
  website: 'hostname',
  background: 'frame',
  border: 'frame'
}

const ColorsTab = ({ config, set, setHoverTarget }) => {
  const themeKey = config.theme === 'dark' ? 'darkColors' : 'lightColors'
  const hover = target => ({
    onMouseEnter: () => setHoverTarget(target),
    onMouseLeave: () => setHoverTarget(null)
  })
  return (
    <Box>
      <SectionHeader>Theme</SectionHeader>
      <Flex css={theme({ width: '100%', pb: 3, pt: 1 })} {...hover('frame')}>
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
        <FormRow key={id} {...hover(COLOR_TARGET_MAP[id])}>
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
  { id: 'frame', label: 'Frame', Component: FrameTab },
  { id: 'fonts', label: 'Fonts', Component: FontsTab },
  { id: 'colors', label: 'Colors', Component: ColorsTab }
]

const ConfigEditor = ({ config, setConfig, setHoverTarget }) => {
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
        <ActiveTab config={config} set={set} setHoverTarget={setHoverTarget} />
      </EditorBody>
    </EditorShell>
  )
}

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
  const [hoverTarget, setHoverTarget] = useState(null)
  const [useCard, setUseCard] = useState(false)
  const [editOverrides, setEditOverrides] = useState({})
  const [editHint, setEditHint] = useState('idle')
  const hintShownRef = useRef(false)
  const hintTimerRef = useRef(null)

  useEffect(() => {
    setUseCard(false)
    setEditOverrides({})
    hintShownRef.current = false
    setEditHint('idle')
  }, [data])

  useEffect(
    () => () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    },
    []
  )

  const handlePreviewMouseEnter = useCallback(() => {
    if (hintShownRef.current) return
    hintShownRef.current = true
    setEditHint('visible')
    hintTimerRef.current = setTimeout(() => {
      setEditHint('leaving')
      hintTimerRef.current = setTimeout(() => {
        setEditHint('idle')
        hintTimerRef.current = null
      }, 240)
    }, 3500)
  }, [])

  const onEditField = useCallback((field, value) => {
    setEditOverrides(prev => {
      if ((prev[field] ?? '') === value) return prev
      return { ...prev, [field]: value }
    })
  }, [])

  const handleReset = useCallback(() => {
    setEditOverrides({})
    onReset()
  }, [onReset])

  const hasEdits = Object.keys(editOverrides).length > 0

  if (isLoading) {
    return (
      <PaperSheet
        css={{
          height: PREVIEW_HEIGHT_MOBILE,
          border: 'none',
          boxShadow: 'none',
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
            flex: 1,
            px: 3,
            gap: 4
          })}
        >
          <LoadingState />
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
          {getErrorMeta(error?.code).showRetry
            ? (
              <Button onClick={onRetry}>
                <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
              </Button>
              )
            : null}
        </FadeIn>
      </PaperSheet>
    )
  }

  if (!data) return null

  const apiHasIframe = Boolean(data.iframe?.html)
  const showCard = useCard || !apiHasIframe
  const iframeScripts = data.iframe?.scripts
  const effectiveData =
    Object.keys(editOverrides).length > 0 ? { ...data, ...editOverrides } : data
  const previewHtml = compactHtml(
    showCard
      ? buildCardHtml(effectiveData, config, { instrument: true })
      : data.iframe.html
  )
  const copyHtml = compactHtml(
    showCard
      ? buildCardHtml(effectiveData, config)
      : `${data.iframe.html}${serializeIframeScripts(iframeScripts)}`
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
      {apiHasIframe
        ? (
          <Flex
            css={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: 6
            }}
          >
            <ViewToggle role='radiogroup' aria-label='Preview format'>
              <ViewToggleButton
                role='radio'
                aria-checked={!useCard}
                $active={!useCard}
                onClick={() => setUseCard(false)}
              >
                Iframe
              </ViewToggleButton>
              <ViewToggleButton
                role='radio'
                aria-checked={useCard}
                $active={useCard}
                onClick={() => setUseCard(true)}
              >
                Card
              </ViewToggleButton>
            </ViewToggle>
            <Text
              css={theme({
                fontSize: 0,
                color: 'black50',
                fontFamily: 'sans',
                textAlign: 'center',
                maxWidth: '320px',
                lineHeight: 1.5
              })}
            >
              {useCard
                ? 'A preview card you can theme and edit inline.'
                : "The provider's native player — drop it in as-is."}
            </Text>
          </Flex>
          )
        : null}
      <ResultGrid>
        {showCard
          ? (
            <ConfigEditor
              config={config}
              setConfig={setConfig}
              setHoverTarget={setHoverTarget}
            />
            )
          : null}
        <PreviewColumn>
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              minHeight: 28,
              flexWrap: 'wrap'
            }}
          >
            <PreviewSectionLabel as='span'>Live preview</PreviewSectionLabel>
            {showCard && (hasSavedPreset || hasEdits)
              ? (
                <SmallActionButton
                  onClick={handleReset}
                  aria-label='Reset all preview settings and edits to defaults'
                >
                  <RotateCcw size={14} />
                  Reset to defaults
                </SmallActionButton>
                )
              : null}
          </Flex>
          <PreviewWithHint
            onMouseEnter={showCard ? handlePreviewMouseEnter : undefined}
          >
            <PreviewPane
              html={previewHtml}
              hasIframe={!showCard}
              hoverTarget={hoverTarget}
              scripts={!showCard ? iframeScripts : undefined}
              onEditField={onEditField}
            />
            {showCard && editHint !== 'idle'
              ? (
                <EditDiscoveryPopover
                  role='status'
                  aria-live='polite'
                  $leaving={editHint === 'leaving'}
                >
                  Click any text to edit it
                </EditDiscoveryPopover>
                )
              : null}
          </PreviewWithHint>
        </PreviewColumn>
      </ResultGrid>
      <HtmlPane html={copyHtml} />
    </Flex>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const EmbedTool = ({ initialUrl = '', exampleUrls, placeholder } = {}) => {
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

    const localFallback = buildLocalEmbedResponse(nextUrl)
    if (localFallback) {
      if (requestId !== requestIdRef.current) return
      setData(localFallback)
      setIsLoading(false)
      return
    }

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
      if (err?.code === 'EPROXYNEEDED') {
        const fallback = buildLocalEmbedResponse(nextUrl)
        if (fallback) {
          setData(fallback)
          return
        }
      }
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
          gap: [4, 4, 5, 5],
          width: '100%'
        })}
      >
        <Omnibar
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          exampleUrls={initialUrl ? [] : exampleUrls}
          placeholder={initialUrl || undefined}
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

export { EmbedTool, EXAMPLE_URLS }
