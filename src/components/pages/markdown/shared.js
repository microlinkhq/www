import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  borders,
  colors,
  layout,
  radii,
  shadows,
  space,
  theme,
  transition
} from 'theme'
import Flex from 'components/elements/Flex'
import SubheadBase from 'components/elements/Subhead'
import CaptionBase from 'components/patterns/Caption/Caption'
import { dash, rotate } from 'components/keyframes'
import { withTitle } from 'helpers/hoc/with-title'

export const Subhead = withTitle(SubheadBase)

export const Caption = withTitle(CaptionBase)

export const DocumentViewer = styled('div')`
  ${theme({
    borderRadius: 3,
    bg: 'white',
    display: 'flex',
    flexDirection: 'column'
  })};
  overflow: hidden;
  border: ${borders[1]} ${colors.black10};
  box-shadow: ${shadows[3]};
`

export const DocumentHeader = styled(Flex)`
  ${theme({
    bg: 'white',
    alignItems: 'center',
    px: [2, 2, 3, 3],
    py: '10px',
    gap: 2,
    flexShrink: 0,
    minWidth: '0'
  })};
  border-bottom: ${borders[1]} ${colors.black05};
`

const caretPulse = keyframes`
  0%, 100% {
    border-color: ${colors.black10};
    background: ${colors.white};
  }
  50% {
    border-color: ${colors.black20};
    background: ${colors.gray0};
  }
`

export const SourceBar = styled(Flex)`
  ${theme({
    flex: 1,
    bg: 'white',
    borderRadius: 2,
    alignItems: 'center',
    px: 2,
    gap: 2,
    minWidth: '0',
    height: space[4]
  })};
  border: ${borders[1]} transparent;
  position: relative;
  transition: border-color ${transition.medium}, background ${transition.medium};

  ${({ $glowing }) =>
    $glowing &&
    css`
      border-color: ${colors.black10};
      background: ${colors.gray0};
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
      border-color: ${colors.black10};
      background: ${colors.gray0};
    `}

  &:focus-within {
    border-color: ${colors.black20};
    background: ${colors.gray0};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }
`

export const SourceInput = styled('input')`
  ${theme({
    bg: 'transparent',
    p: 0,
    m: 0,
    flex: 1,
    minWidth: '0',
    fontSize: [1, 1, 0, 0],
    fontFamily: 'sans',
    letterSpacing: 0,
    fontWeight: 'bold'
  })};
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  color: ${({ $active }) => ($active ? colors.black : colors.black80)};
  text-align: left;
  transition: color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  caret-color: ${colors.black};

  &::selection {
    background: ${colors.black20};
    color: ${colors.black};
  }

  &:focus {
    outline: none;
    color: ${colors.black};
    font-weight: 400;
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

export const SourcePrompt = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    mr: 1,
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0
  })};
  background-image: linear-gradient(
    135deg,
    ${colors.orange7},
    ${colors.orange9}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateX(${p => (p.$visible ? 0 : space[1])});

  .source-prompt__arrow {
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      mr: 1,
      fontSize: 1,
      lineHeight: 0,
      mt: 1
    })};
    background-image: linear-gradient(
      135deg,
      ${colors.orange7},
      ${colors.orange9}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${addressPromptArrowNudge} 1.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .source-prompt__arrow {
      animation: none;
    }
  }
`

export const WordCountBadge = styled('span')`
  ${theme({
    fontSize: '11px',
    fontFamily: 'sans',
    color: 'black40',
    letterSpacing: 0,
    fontWeight: 'bold',
    flexShrink: 0
  })};
  white-space: nowrap;
`

export const MarkdownContentArea = styled('pre')`
  ${theme({
    m: 0,
    p: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80'
  })};
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  -webkit-overflow-scrolling: touch;

  .md-heading {
    font-weight: 700;
  }

  .md-link {
    color: ${colors.blue7};
  }

  .md-bold {
    font-weight: 700;
    color: ${colors.black};
  }

  .md-list {
    color: ${colors.black60};
  }

  .md-meta-fence {
    color: ${colors.black40};
  }

  .md-meta-key {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.8);
  }

  .md-meta-value {
    color: ${colors.blue7};
  }
`

export const MarkdownOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${({ $dim }) => ($dim ? colors.black60 : 'transparent')};
  pointer-events: none;
`

export const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
`

export const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: ${colors.white90};
  stroke-linecap: round;
`

export const ErrorInline = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    px: 4,
    bg: 'white'
  })};
  z-index: 2;
`

export const ErrorDismissButton = styled('button')`
  ${theme({
    bg: 'transparent',
    borderRadius: 2,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    color: 'black50',
    fontSize: 0,
    fontFamily: 'sans',
    fontWeight: 'bold',
    mt: 3,
    px: 3,
    py: 2
  })};
  border: ${borders[1]} ${colors.black10};
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short},
    border-color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${colors.gray1};
    color: ${colors.black80};
    border-color: ${colors.black20};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

export const countWords = text => {
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

export const estimateTokens = text => {
  if (!text) return 0

  const chunks = text.match(/\b\w+\b|[^\w\s]/g)
  if (!chunks) return 0

  return Math.ceil(chunks.length * 1.15)
}

export const formatCompactNumber = n => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

export const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export const stripProtocol = url => url.replace(/^https?:\/\//i, '')
export const stripForDisplay = url => stripProtocol(url).replace(/\?.*$/, '')

export const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}

export const highlightMarkdown = text => {
  if (!text) return null
  const lines = text.split('\n')
  let inFrontmatter = false
  let fenceCount = 0
  return lines.map((line, i) => {
    if (/^---\s*$/.test(line) && fenceCount < 2) {
      fenceCount++
      inFrontmatter = fenceCount === 1
      if (fenceCount === 2) inFrontmatter = false
      return (
        <span key={`${line}-${i}`}>
          <span className='md-meta-fence'>{line}</span>
          {'\n'}
        </span>
      )
    }
    if (inFrontmatter) {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0) {
        return (
          <span key={`${line}-${i}`}>
            <span className='md-meta-key'>{line.slice(0, colonIdx)}</span>:
            <span className='md-meta-value'>{line.slice(colonIdx + 1)}</span>
            {'\n'}
          </span>
        )
      }
    }
    if (/^#{1,6}\s/.test(line)) {
      return (
        <span key={`${line}-${i}`}>
          <span className='md-heading'>{line}</span>
          {'\n'}
        </span>
      )
    }
    if (/^[-*]\s/.test(line)) {
      return (
        <span key={`${line}-${i}`}>
          <span className='md-list'>{line.charAt(0)}</span>
          {line.slice(1)}
          {'\n'}
        </span>
      )
    }
    return (
      <span key={`${line}-${i}`}>
        {line}
        {'\n'}
      </span>
    )
  })
}
