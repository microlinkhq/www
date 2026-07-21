import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  gradient,
  layout,
  radii,
  shadows,
  space,
  theme,
  transition
} from 'theme'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import { normalizeApiError } from 'helpers/api-error'
import { withTitle } from 'helpers/hoc/with-title'
import { trackEvent } from 'helpers/plausible'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { rotate, dash } from 'components/keyframes'
import {
  ACCENT,
  Caption,
  CopyButton,
  FIRST_URL,
  HERO_LAYOUT,
  MetaApiBar
} from './shared'

const Heading = withTitle(HeadingBase)

const DEMO_URLS = ['unavatar.io', 'plausible.io']

const BrowserWindow = styled('div')`
  ${theme({
    borderRadius: 5,
    bg: 'white',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    position: 'relative'
  })};
  border: ${borders[1]} ${colors.black05};
  box-shadow: ${shadows[3]};

  &:hover:not(:has(.meta-api-bar:hover)) .address-bar {
    background: ${colors.gray1};
    border-color: ${colors.black10};
    box-shadow: none;

    input {
      color: ${colors.gray8};
    }
  }
`

const BrowserHeader = styled(Flex)`
  ${theme({
    bg: 'white',
    height: fontSizes[4],
    alignItems: 'center',
    px: 2,
    gap: 2,
    flexShrink: 0,
    minWidth: 0,
    position: 'relative',
    zIndex: 2
  })};
  border-bottom: ${borders[1]} ${colors.black05};
  border-radius: ${radii[5]} ${radii[5]} 0 0;
`

const NavButtons = styled(Flex)`
  ${theme({ alignItems: 'center', gap: 1, flexShrink: 0 })};
`

const NavArrow = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    color: 'gray5',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1,
    lineHeight: 0
  })};
  border: none;
  cursor: default;
  transition: color ${transition.short}, background ${transition.short},
    border-color ${transition.short};

  &:not(:disabled) {
    cursor: pointer;
    color: ${colors.gray7};

    &:hover {
      color: ${colors.gray8};
      background: ${colors.gray1};
    }

    &:active {
      color: ${colors.black60};
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
  }
`

const caretPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 2px ${colors.black20};
    border-color: ${colors.gray6};
    background: ${colors.white};
  }
  50% {
    box-shadow: ${shadows[0]};
    border-color: ${colors.black20};
    background: ${colors.white95};
  }
`

const AddressBar = styled(Flex)`
  ${theme({
    flex: 1,
    bg: 'gray1',
    borderRadius: 4,
    height: space[4],
    alignItems: 'center',
    justifyContent: 'center',
    px: 2,
    gap: 2,
    minWidth: 0
  })};
  border: ${borders[1]} transparent;
  position: relative;
  transition: box-shadow ${transition.medium}, background ${transition.medium},
    border-color ${transition.medium};

  &:hover {
    background: ${colors.gray1};
    border-color: ${colors.black10};
    box-shadow: none;

    input {
      color: ${colors.gray8};
    }
  }

  ${({ $glowing }) =>
    $glowing &&
    css`
      background: ${colors.white};
      border-color: ${colors.black10};
      box-shadow: ${shadows[0]};
    `}

  ${({ $isPulsing }) =>
    $isPulsing &&
    css`
      animation: ${caretPulse} 2s ease-in-out 2;
    `}

  ${({ $active, $isPulsing }) =>
    $active &&
    !$isPulsing &&
    css`
      background: ${colors.white};
      border-color: ${colors.black10};
      box-shadow: ${shadows[0]};
    `}

  &:focus-within {
    background: ${colors.white};
    border-color: ${colors.black10};
    box-shadow: ${shadows[0]};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
    box-shadow: none;
  }
`

const AddressInput = styled('input')`
  ${theme({
    bg: 'transparent',
    p: 0,
    m: 0,
    flex: 1,
    width: 0,
    minWidth: '0',
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0
  })};
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  font-weight: 400;
  color: ${({ $active }) => ($active ? colors.gray8 : colors.gray6)};
  text-align: left;
  transition: color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  caret-color: ${colors.gray8};

  &::selection {
    background: ${colors.black20};
    color: ${colors.black};
  }

  &:focus {
    outline: none;
    color: ${colors.black};
    text-align: left;
  }
`

const addressPromptArrowNudge = keyframes`
  0%, 100% {
    transform: translateX(0);
    opacity: 0.75;
  }
  50% {
    transform: translateX(-${space[1]});
    opacity: 1;
  }
`

const AddressPrompt = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    mr: 1,
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0
  })};
  background-image: ${gradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateX(${p => (p.$visible ? 0 : space[1])});

  .address-prompt__arrow {
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      mr: 1,
      fontSize: 1,
      lineHeight: 0,
      mt: 1
    })};
    background-image: ${gradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${addressPromptArrowNudge} 1.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .address-prompt__arrow {
      animation: none;
    }
  }
`

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const MetaOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: [`-${space[2]}`, `-${space[3]}`, `-${space[3]}`, `-${space[3]}`],
    bottom: 0,
    left: [`-${space[3]}`, `-${space[4]}`, `-${space[4]}`, `-${space[4]}`],
    right: [`-${space[3]}`, `-${space[4]}`, 0, 0]
  })};
  background: ${({ $dim }) => ($dim ? colors.black10 : colors.gray0)};
  pointer-events: none;
  overflow: hidden;
  transition: background ${transition.medium};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${colors.white80} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.8s ease-in-out infinite;
    opacity: ${({ $dim }) => ($dim ? 0 : 1)};

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`

const SkeletonLines = styled('div')`
  ${theme({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    px: 4,
    py: 4
  })};
  inset: 0;
  pointer-events: none;
`

const SkeletonLine = styled('div')`
  height: ${({ $h }) => $h || '12px'};
  width: ${({ $w }) => $w || '100%'};
  background: ${colors.black05};
  border-radius: 6px;
`

const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
  z-index: 1;
`

const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: ${colors.black40};
  stroke-linecap: round;
`

const HistoryDropdown = styled('div')`
  ${theme({ position: 'absolute', borderRadius: 4, bg: 'white' })};
  top: calc(100% + ${space[1]});
  left: 0;
  right: 0;
  border: ${borders[1]} ${colors.black20};
  overflow: hidden;
  box-shadow: ${shadows[4]};
  z-index: 100;
`

const HistoryItem = styled('button')`
  ${theme({
    width: '100%',
    minWidth: '0',
    bg: 'transparent',
    p: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    fontSize: 0,
    fontFamily: 'sans'
  })};
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  transition: background ${transition.short}, color ${transition.short};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }

  svg {
    flex-shrink: 0;
  }

  &:hover,
  &:focus-visible {
    background: ${colors.blue0};
    color: ${colors.black};
    outline: none;
  }

  & + & {
    border-top: ${borders[1]} ${colors.black10};
  }
`

const ErrorModalOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${colors.black60};
  backdrop-filter: blur(${space[1]});
  z-index: 2;
`

const ErrorModalWindow = styled('div')`
  ${theme({ bg: 'black95', borderRadius: 4 })};
  border: ${borders[1]} ${colors.red7};
  width: 340px;
  box-shadow: 0 24px 64px ${colors.black80}, 0 4px 16px ${colors.black40};
  overflow: hidden;
`

const ErrorModalHeader = styled('div')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  })};
  padding: ${space[3]} ${space[3]} ${space[2]};
  border-bottom: ${borders[1]} ${colors.white05};
`

const ErrorModalBody = styled('div')`
  ${theme({ p: 3 })};
`

const ErrorCloseButton = styled('button')`
  ${theme({
    bg: 'white10',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white50',
    flexShrink: 0,
    lineHeight: 0,
    fontSize: 0
  })};
  border: none;
  width: ${fontSizes[2]};
  height: ${fontSizes[2]};
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short};

  &:hover {
    background: ${colors.white20};
    color: ${colors.white90};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.white30};
    outline-offset: ${radii[1]};
  }
`

const HeroPreviewWrapper = styled(Box)`
  ${theme({
    position: 'relative',
    bg: 'gray0',
    px: [3, 4, 4, 4],
    pt: [2, 3, 3, 3],
    pb: 0,
    zIndex: 1
  })};
  aspect-ratio: 16/10;
  overflow: hidden;
`

const JsonScroll = styled(Box)`
  ${theme({ width: '100%', height: '100%' })};
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black20} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black20};
    border-radius: 3px;
  }
`

const JsonPre = styled('pre')`
  ${theme({
    m: 0,
    fontFamily: 'mono',
    fontSize: ['12px', '13px', '13px', '13px'],
    lineHeight: 2,
    color: 'black80'
  })};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  min-width: 0;
  tab-size: 2;

  .json-punct {
    color: ${colors.black40};
  }
  .json-key {
    color: ${colors.black};
    font-weight: 600;
  }
  .json-string {
    color: ${colors.black};
  }
  .json-string a {
    color: ${ACCENT};
    text-decoration: none;
    text-underline-offset: 2px;
  }
  .json-string a:hover,
  .json-string a:focus-visible {
    text-decoration: underline;
    text-decoration-color: ${ACCENT};
  }
  .json-number {
    color: ${colors.grape7};
  }
  .json-boolean {
    color: ${colors.orange7};
    font-weight: 600;
  }
  .json-null {
    color: ${colors.black40};
    font-style: italic;
  }
`

const JsonExpandToggle = styled('button')`
  ${theme({
    m: 0,
    p: 0,
    bg: 'transparent',
    color: 'black40',
    fontFamily: 'mono',
    fontSize: 'inherit',
    lineHeight: 'inherit'
  })};
  border: none;
  cursor: pointer;
  vertical-align: baseline;
  transition: color ${transition.short};

  &:hover,
  &:focus-visible {
    color: ${ACCENT};
  }

  &:focus-visible {
    outline: ${borders[1]} ${colors.black20};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const jsonCaret = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const JsonCaret = styled('span')`
  ${theme({ display: 'inline-block', color: 'black60' })};
  width: 0.5em;
  animation: ${jsonCaret} 0.9s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const JSON_KEYS = [
  'title',
  'description',
  'lang',
  'author',
  'publisher',
  'date',
  'url',
  'image',
  'logo',
  'video',
  'audio'
]

const JsonKeyList = styled('ul')`
  ${theme({
    m: 0,
    p: 0,
    display: 'grid',
    gridTemplateColumns: [
      'repeat(3, minmax(0, 1fr))',
      'repeat(6, minmax(0, 1fr))',
      '1fr',
      '1fr'
    ],
    gap: 2,
    fontFamily: 'mono',
    fontSize: 0
  })};
  list-style: none;
`

const JsonKeyItem = styled('li')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    minWidth: 0
  })};
`

const KeyDot = styled('span')`
  ${theme({ width: '8px', height: '8px', borderRadius: '50%' })};
  background: ${({ $present }) => ($present ? colors.green7 : colors.black20)};
  flex-shrink: 0;
`

const DetectedColumn = styled(Box)`
  ${theme({
    width: ['100%', '100%', '160px', '160px'],
    flexShrink: 0,
    order: [1, 1, 2, 2],
    pl: [0, 0, 3, 3],
    pb: [3, 3, 0, 0]
  })};
  display: none;
  border-bottom: ${borders[1]} ${colors.gray3};
  border-left: 0;

  @media (min-width: ${breakpoints[0]}) {
    display: block;
  }

  @media (min-width: ${breakpoints[1]}) {
    border-bottom: 0;
    border-left: ${borders[1]} ${colors.gray3};
  }
`

const HERO_JSON_KEY_ORDER = [
  'title',
  'description',
  'lang',
  'author',
  'publisher',
  'date',
  'url',
  'image',
  'logo',
  'video',
  'audio',
  'iframe',
  'palette'
]

const compactMedia = value => {
  if (!value || typeof value !== 'object') return value
  const { url, type, width, height, size_pretty: sizePretty } = value
  const compact = { url }
  if (type) compact.type = type
  if (width) compact.width = width
  if (height) compact.height = height
  if (sizePretty) compact.size_pretty = sizePretty
  return compact
}

const reshapeForHero = data => {
  if (!data) return null
  const shaped = {}
  for (const key of HERO_JSON_KEY_ORDER) {
    if (data[key] == null) continue
    if (['image', 'logo', 'video', 'audio'].includes(key)) {
      shaped[key] = compactMedia(data[key])
    } else if (key === 'iframe') {
      shaped[key] =
        typeof data[key] === 'object' && data[key].html
          ? { html: '…' }
          : data[key]
    } else {
      shaped[key] = data[key]
    }
  }
  for (const key of Object.keys(data)) {
    if (shaped[key] === undefined && data[key] != null) {
      shaped[key] = data[key]
    }
  }
  return shaped
}

const STRING_TRUNCATE_AT = 64

const URL_REGEX = /^https?:\/\/\S+$/i

const renderStringContent = value => {
  if (URL_REGEX.test(value)) {
    return (
      <a href={value} target='_blank' rel='noopener noreferrer'>
        {value}
      </a>
    )
  }
  return value
}

const renderJson = (value, path = 'root', expanded, onToggle, indent = 0) => {
  const pad = '  '.repeat(indent)
  const padInner = '  '.repeat(indent + 1)

  if (value === null) return <span className='json-null'>null</span>
  if (typeof value === 'boolean') {
    return <span className='json-boolean'>{String(value)}</span>
  }
  if (typeof value === 'number') {
    return <span className='json-number'>{value}</span>
  }
  if (typeof value === 'string') {
    const isUrl = URL_REGEX.test(value)
    const isLong = !isUrl && value.length > STRING_TRUNCATE_AT
    const isOpen = expanded.has(path)
    if (!isLong || isOpen) {
      return (
        <>
          <span className='json-string'>"{renderStringContent(value)}"</span>
          {isLong && (
            <>
              {' '}
              <JsonExpandToggle
                type='button'
                aria-label='Collapse value'
                onClick={() => onToggle(path)}
              >
                [collapse]
              </JsonExpandToggle>
            </>
          )}
        </>
      )
    }
    const truncated = value.slice(0, STRING_TRUNCATE_AT).trimEnd()
    return (
      <>
        <span className='json-string'>"{truncated}</span>
        <JsonExpandToggle
          type='button'
          aria-label='Expand value'
          title={`${value.length - truncated.length} more characters`}
          onClick={() => onToggle(path)}
        >
          …
        </JsonExpandToggle>
        <span className='json-string'>"</span>
      </>
    )
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className='json-punct'>[]</span>
    return (
      <>
        <span className='json-punct'>[</span>
        {'\n'}
        {value.map((item, i) => (
          <React.Fragment key={`${path}.${i}`}>
            {padInner}
            {renderJson(item, `${path}.${i}`, expanded, onToggle, indent + 1)}
            {i < value.length - 1 && <span className='json-punct'>,</span>}
            {'\n'}
          </React.Fragment>
        ))}
        {pad}
        <span className='json-punct'>]</span>
      </>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) return <span className='json-punct'>{'{}'}</span>
    return (
      <>
        <span className='json-punct'>{'{'}</span>
        {'\n'}
        {entries.map(([k, v], i) => (
          <React.Fragment key={k}>
            {padInner}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            {renderJson(v, `${path}.${k}`, expanded, onToggle, indent + 1)}
            {i < entries.length - 1 && <span className='json-punct'>,</span>}
            {'\n'}
          </React.Fragment>
        ))}
        {pad}
        <span className='json-punct'>{'}'}</span>
      </>
    )
  }

  return String(value)
}

const flattenToLines = (value, expanded, onToggle) => {
  const lines = []
  const indentStr = depth => '  '.repeat(depth)

  const renderLeaf = (v, path) => renderJson(v, path, expanded, onToggle, 0)

  const pushValue = (v, path, depth, trailingComma) => {
    const pad = indentStr(depth)
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const entries = Object.entries(v)
      if (entries.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-punct'>{'{}'}</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'{'}</span>
        </>
      )
      entries.forEach(([k, child], i) => {
        pushEntry(k, child, `${path}.${k}`, depth + 1, i < entries.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'}'}</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-punct'>[]</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-punct'>[</span>
        </>
      )
      v.forEach((child, i) => {
        pushValue(child, `${path}.${i}`, depth + 1, i < v.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>]</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    lines.push(
      <>
        {pad}
        {renderLeaf(v, path)}
        {trailingComma && <span className='json-punct'>,</span>}
      </>
    )
  }

  const pushEntry = (k, v, path, depth, trailingComma) => {
    const pad = indentStr(depth)
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const entries = Object.entries(v)
      if (entries.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            <span className='json-punct'>{'{}'}</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-key'>"{k}"</span>
          <span className='json-punct'>: </span>
          <span className='json-punct'>{'{'}</span>
        </>
      )
      entries.forEach(([ck, cv], i) => {
        pushEntry(ck, cv, `${path}.${ck}`, depth + 1, i < entries.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'}'}</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            <span className='json-punct'>[]</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-key'>"{k}"</span>
          <span className='json-punct'>: </span>
          <span className='json-punct'>[</span>
        </>
      )
      v.forEach((child, i) => {
        pushValue(child, `${path}.${i}`, depth + 1, i < v.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>]</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    lines.push(
      <>
        {pad}
        <span className='json-key'>"{k}"</span>
        <span className='json-punct'>: </span>
        {renderLeaf(v, path)}
        {trailingComma && <span className='json-punct'>,</span>}
      </>
    )
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const entries = Object.entries(value)
    lines.push(<span className='json-punct'>{'{'}</span>)
    entries.forEach(([k, v], i) => {
      pushEntry(k, v, `root.${k}`, 1, i < entries.length - 1)
    })
    lines.push(<span className='json-punct'>{'}'}</span>)
  }

  return lines
}

const STREAM_MS_PER_LINE = 40

const useRevealLines = (totalLines, signature) => {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    setRevealed(0)
    const timers = []
    for (let i = 1; i <= totalLines; i++) {
      timers.push(setTimeout(() => setRevealed(i), i * STREAM_MS_PER_LINE))
    }
    return () => timers.forEach(clearTimeout)
  }, [totalLines, signature])

  return revealed
}

const StreamedJsonObject = ({ value, expanded, onToggle }) => {
  const lines = value ? flattenToLines(value, expanded, onToggle) : []
  const signature = value
    ? `${Object.keys(value).length}:${Object.keys(value).join(',')}:${
      value.url || value.title || ''
    }`
    : ''
  const revealed = useRevealLines(lines.length, signature)
  const isStreaming = revealed < lines.length
  const visible = lines.slice(0, revealed)

  return (
    <JsonPre aria-label='Metadata JSON response'>
      {visible.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {'\n'}
        </React.Fragment>
      ))}
      {isStreaming && <JsonCaret aria-hidden='true'>▍</JsonCaret>}
    </JsonPre>
  )
}

const JsonPreview = ({ data }) => {
  const shaped = reshapeForHero(data)
  const [expanded, setExpanded] = useState(() => new Set())
  const onToggle = useCallback(path => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  return (
    <StreamedJsonObject
      value={shaped}
      expanded={expanded}
      onToggle={onToggle}
    />
  )
}

const MetadataPreview = ({ url, data, isLoading }) => (
  <HeroPreviewWrapper>
    <Flex
      css={theme({
        width: '100%',
        height: '100%',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch',
        gap: 0
      })}
    >
      <Box
        css={theme({
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          width: '100%',
          order: [2, 2, 1, 1],
          pt: [2, 2, 0, 0],
          pr: [0, 0, 2, 2],
          position: 'relative'
        })}
      >
        <Box
          css={[
            theme({ width: '100%', height: '100%' }),
            {
              filter: isLoading && data ? 'blur(6px)' : 'blur(0px)',
              transition: 'filter 0.5s ease'
            }
          ]}
        >
          <JsonScroll>
            <JsonPreview data={data} />
          </JsonScroll>
        </Box>
        {isLoading && (
          <MetaOverlay
            $dim={Boolean(data)}
            aria-label='Loading metadata…'
            role='status'
          >
            {!data && (
              <SkeletonLines aria-hidden='true'>
                <SkeletonLine $w='55%' $h='18px' />
                <SkeletonLine $w='90%' />
                <SkeletonLine $w='80%' />
                <SkeletonLine $w='85%' />
                <SkeletonLine $w='40%' />
                <Box css={theme({ height: '12px' })} />
                <SkeletonLine $w='45%' $h='16px' />
                <SkeletonLine $w='95%' />
                <SkeletonLine $w='70%' />
              </SkeletonLines>
            )}
            <Spinner
              width='36'
              height='36'
              viewBox='0 0 50 50'
              aria-hidden='true'
            >
              <SpinnerCircle
                cx='25'
                cy='25'
                r='20'
                fill='none'
                strokeWidth='4'
              />
            </Spinner>
          </MetaOverlay>
        )}
      </Box>
      <DetectedColumn aria-label='Detected metadata fields'>
        <Hide breakpoints={[0, 1]}>
          <Caps
            css={theme({
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black60',
              pb: 2,
              letterSpacing: 2
            })}
          >
            Detected
          </Caps>
        </Hide>
        <JsonKeyList>
          {JSON_KEYS.map(key => {
            const present = !isLoading && data && data[key] != null
            return (
              <JsonKeyItem key={key}>
                <KeyDot $present={present} />
                <span
                  css={theme({
                    color: present ? 'black' : 'black40',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  })}
                >
                  {key}
                </span>
              </JsonKeyItem>
            )
          })}
        </JsonKeyList>
      </DetectedColumn>
    </Flex>
  </HeroPreviewWrapper>
)

const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const stripProtocol = url => url.replace(/^https?:\/\//i, '')

const stripForDisplay = url => stripProtocol(url).replace(/\?.*$/, '')

const MAX_HISTORY = 6

const DEFAULT_HISTORY = [
  FIRST_URL,
  'https://unavatar.io',
  'https://plausible.io'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

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

export const Hero = function Hero ({
  onRequestTiming,
  onUrlChange,
  onDataChange
}) {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [isFocused, setIsFocused] = useState(false)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [metaData, setMetaData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [isAttractMode, setIsAttractMode] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [navStack, setNavStack] = useState([FIRST_URL])
  const [navIndex, setNavIndex] = useState(0)
  const abortRef = useRef(null)
  const copyTimerRef = useRef(null)
  const skipBlurRef = useRef(false)

  const fetchMetadata = useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'metadata' })
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      try {
        const endpoint =
          `https://api.microlink.io?url=${encodeURIComponent(url)}` +
          '&palette&video&audio'
        const res = await window.fetch(endpoint, {
          signal: abortRef.current.signal
        })
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const data = json?.data
        if (data) {
          setMetaData(data)
          onUrlChange?.(url)
          onDataChange?.(data)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [onRequestTiming, onUrlChange, onDataChange]
  )

  useEffect(() => {
    fetchMetadata(FIRST_URL)
  }, [])

  useEffect(() => {
    if (hasInteracted) return

    const timeouts = []
    let cancelled = false
    const delay = ms =>
      new Promise(resolve => {
        timeouts.push(setTimeout(resolve, ms))
      })
    const check = () => cancelled || hasInteracted

    const typeUrl = async url => {
      setInputUrl('')
      for (let i = 1; i <= url.length; i++) {
        await delay(80)
        if (check()) return false
        setInputUrl('https://' + url.slice(0, i))
      }
      await delay(250)
      if (check()) return false
      setIsGlowing(false)
      return true
    }

    const run = async () => {
      await delay(5000)
      if (check()) return

      for (let i = 0; i < DEMO_URLS.length; i++) {
        const url = DEMO_URLS[i]
        if (check()) return

        setIsGlowing(true)
        await delay(250)
        if (check()) return

        const completed = await typeUrl(url)
        if (!completed) return

        await delay(50)
        if (check()) return

        const normalized = ensureProtocol(url)
        setInputUrl(normalized)
        setHistory(h => addToHistory(h, normalized))
        setNavStack(s => [...s, normalized].slice(-MAX_HISTORY))
        setNavIndex(i + 1)
        fetchMetadata(normalized)

        await delay(8000)
        if (check()) return

        if (i >= DEMO_URLS.length - 1) {
          setIsGlowing(true)
          setIsFocused(true)
          setIsAttractMode(true)
          setIsPulsing(true)
          await delay(5000)
          if (check()) return
          setIsPulsing(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [hasInteracted])

  const apiUrl = `https://api.microlink.io?url=${inputUrl}`

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
          fallbackCopy(apiUrl) && markCopied()
        })
    } else {
      fallbackCopy(apiUrl) && markCopied()
    }
  }

  const displayValue = isFocused
    ? stripProtocol(inputUrl)
    : stripForDisplay(inputUrl)

  const handleChange = e => {
    setInputUrl(ensureProtocol(stripProtocol(e.target.value)))
    stopAttract()
  }

  const handlePaste = e => {
    const pastedText = e.clipboardData?.getData('text') ?? ''
    const trimmedText = pastedText.trim()
    const strippedText = stripProtocol(trimmedText)
    if (strippedText === trimmedText) return
    e.preventDefault()
    const inputEl = e.currentTarget
    const start = inputEl.selectionStart ?? inputEl.value.length
    const end = inputEl.selectionEnd ?? inputEl.value.length
    const nextValue =
      inputEl.value.slice(0, start) + strippedText + inputEl.value.slice(end)
    setInputUrl(ensureProtocol(stripProtocol(nextValue)))
    stopAttract()
    setTimeout(() => {
      const cursorPosition = start + strippedText.length
      inputEl.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }

  const stopAttract = () => {
    setIsGlowing(false)
    setIsAttractMode(false)
    setIsPulsing(false)
    setHasInteracted(true)
  }

  const handleFocus = () => {
    setIsFocused(true)
    stopAttract()
  }

  const submitUrl = url => {
    const normalized = ensureProtocol(url)
    const newStack = [...navStack.slice(0, navIndex + 1), normalized].slice(
      -MAX_HISTORY
    )
    const newIndex = newStack.length - 1
    setInputUrl(normalized)
    setIsFocused(false)
    setHistory(h => addToHistory(h, normalized))
    setNavStack(newStack)
    setNavIndex(newIndex)
    fetchMetadata(normalized, { track: true })
  }

  const handleBack = () => {
    if (navIndex === 0) return
    stopAttract()
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMetadata(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
    stopAttract()
    const newIndex = navIndex + 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMetadata(url)
  }

  const handleBlur = e => {
    setTimeout(() => {
      if (skipBlurRef.current) {
        skipBlurRef.current = false
        return
      }
      const normalized = ensureProtocol(e.target.value)
      setInputUrl(normalized)
      setIsFocused(false)
      if (normalized && normalized !== inputUrl) {
        setHistory(h => addToHistory(h, normalized))
        fetchMetadata(normalized)
      }
    }, 150)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.target.blur()
      submitUrl(e.target.value)
    }
    if (e.key === 'Escape') {
      e.target.blur()
      setIsFocused(false)
    }
  }

  const handleHistoryClick = url => {
    skipBlurRef.current = true
    stopAttract()
    inputRef.current?.blur()
    submitUrl(url)
  }

  return (
    <Flex
      id='hero'
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: [3, 3, 1, 0],
        pb: [4, 4, 5, 5],
        px: [2, 3, 4, 5]
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
            flexDirection: 'column',
            width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            css={theme({
              px: [2, 3, 4, 0],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Website Metadata API for developers
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Turn any URL into normalized JSON. A single REST endpoint that
            executes JavaScript, merges Open Graph, JSON-LD, and HTML tags, and
            returns structured data instantly.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start'],
              gap: [3, 3, 4, 4],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: ['flex-start', 'center', 'center', 'center']
            })}
          >
            <ArrowLink href='/docs/guides/metadata'>Get Started</ArrowLink>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
            minWidth: 0,
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Box
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              maxWidth: ['100%', '95%', '85%', '100%'],
              width: ['100%', '95%', '85%', '100%'],
              minWidth: 0,
              position: 'relative'
            })}
          >
            <BrowserWindow
              onClick={e => {
                if (
                  !e.target.closest('input') &&
                  !e.target.closest('[role="listbox"]') &&
                  !e.target.closest('.meta-api-bar')
                ) {
                  setIsFocused(false)
                }
              }}
            >
              <BrowserHeader>
                <NavButtons>
                  <NavArrow
                    type='button'
                    aria-label='Go back'
                    disabled={navIndex === 0}
                    onClick={handleBack}
                  >
                    <svg
                      width='7'
                      height='12'
                      viewBox='0 0 7 12'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M6 1L1 6l5 5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </NavArrow>
                  <NavArrow
                    type='button'
                    aria-label='Go forward'
                    disabled={navIndex >= navStack.length - 1}
                    onClick={handleForward}
                  >
                    <svg
                      width='7'
                      height='12'
                      viewBox='0 0 7 12'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M1 1l5 5-5 5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </NavArrow>
                </NavButtons>
                <AddressBar
                  className='address-bar'
                  $glowing={isGlowing}
                  $active={isAttractMode}
                  $isPulsing={isPulsing}
                >
                  <svg
                    width='11'
                    height='13'
                    viewBox='0 0 11 13'
                    fill='none'
                    aria-hidden='true'
                    css={theme({ flexShrink: 0 })}
                  >
                    <rect
                      x='1'
                      y='5.5'
                      width='9'
                      height='7'
                      rx='1.5'
                      fill={colors.black40}
                    />
                    <path
                      d='M3 5.5V3.5a2.5 2.5 0 015 0v2'
                      stroke={colors.black40}
                      strokeWidth='1.4'
                      strokeLinecap='round'
                    />
                  </svg>
                  <AddressInput
                    ref={inputRef}
                    $active={isFocused || isAttractMode}
                    type='url'
                    size='1'
                    value={displayValue}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    aria-label='Browser address bar'
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                  />
                  <AddressPrompt
                    $visible={!isFocused && !hasInteracted}
                    aria-hidden='true'
                  >
                    <span className='address-prompt__arrow'>&larr;</span>
                    Type any URL
                  </AddressPrompt>

                  {isFocused && history.length > 0 && (
                    <HistoryDropdown role='listbox' aria-label='Recent URLs'>
                      {history.map(url => (
                        <HistoryItem
                          key={url}
                          role='option'
                          type='button'
                          onMouseDown={e => {
                            e.preventDefault()
                            handleHistoryClick(url)
                          }}
                        >
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            aria-hidden='true'
                          >
                            <circle
                              cx='5'
                              cy='5'
                              r='3.5'
                              stroke={colors.black40}
                              strokeWidth='1.3'
                            />
                            <path
                              d='M8 8l2 2'
                              stroke={colors.black40}
                              strokeWidth='1.3'
                              strokeLinecap='round'
                            />
                          </svg>
                          <span>{stripProtocol(url)}</span>
                        </HistoryItem>
                      ))}
                    </HistoryDropdown>
                  )}
                </AddressBar>
              </BrowserHeader>
              <Box
                css={theme({
                  position: 'relative',
                  zIndex: 1,
                  bg: 'gray0'
                })}
              >
                <MetadataPreview
                  url={inputUrl}
                  data={metaData}
                  isLoading={isLoading}
                />
                {error && (
                  <ErrorModalOverlay
                    role='dialog'
                    aria-modal='true'
                    aria-label='Error'
                    onClick={e => {
                      if (e.target === e.currentTarget) setError(null)
                    }}
                  >
                    <ErrorModalWindow>
                      <ErrorModalHeader>
                        <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            aria-hidden='true'
                          >
                            <circle
                              cx='8'
                              cy='8'
                              r='7'
                              stroke={colors.red6}
                              strokeWidth='1.5'
                            />
                            <path
                              d='M8 5v3M8 10.5v.5'
                              stroke={colors.red5}
                              strokeWidth='1.5'
                              strokeLinecap='round'
                            />
                          </svg>
                          <Text
                            as='span'
                            css={theme({
                              color: 'red5',
                              fontSize: 0,
                              fontWeight: 'bold',
                              letterSpacing: 0
                            })}
                          >
                            <ApiErrorTitle code={error.code} />
                          </Text>
                        </Flex>
                        <ErrorCloseButton
                          type='button'
                          aria-label='Dismiss error'
                          onClick={() => setError(null)}
                        >
                          &times;
                        </ErrorCloseButton>
                      </ErrorModalHeader>
                      <ErrorModalBody>
                        <Text
                          as='p'
                          css={theme({
                            color: 'white90',
                            fontSize: 1,
                            lineHeight: 2,
                            m: 0
                          })}
                        >
                          <ApiErrorBody
                            code={error.code}
                            fallback={error.message}
                          />
                        </Text>
                      </ErrorModalBody>
                    </ErrorModalWindow>
                  </ErrorModalOverlay>
                )}
              </Box>
              <MetaApiBar
                className='meta-api-bar'
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: [2, 3, 3, 3],
                  py: '10px',
                  gap: 2
                })}
              >
                <Text
                  as='span'
                  css={theme({
                    fontSize: ['13px', '13px', '14px', '14px'],
                    fontFamily: 'mono',
                    letterSpacing: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: '0',
                    color: 'black70'
                  })}
                >
                  https://api.microlink.io?
                  <strong css={theme({ color: 'black' })}>
                    url={inputUrl}
                  </strong>
                </Text>
                <CopyButton
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
                </CopyButton>
              </MetaApiBar>
            </BrowserWindow>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
