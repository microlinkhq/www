import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { borders, colors, radii, theme, transition } from 'theme'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { fadeInDown } from 'components/keyframes'
import { trackEvent } from 'helpers/plausible'
import {
  WordCountBadge,
  countWords,
  estimateTokens,
  formatCompactNumber
} from '../shared'

const DocumentFooter = styled(Flex)`
  ${theme({
    bg: 'gray0',
    px: [2, 3, 3, 3],
    py: '10px',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    minWidth: '0'
  })};
  border-top: ${borders[1]} ${colors.black05};
`

const CopyButton = styled('button')`
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
    animation: ${fadeInDown} 0.2s ease both;
    color: ${colors.green5};
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

export const Footer = ({ apiUrl, displayedContent }) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimerRef = useRef(null)

  const handleCopy = () => {
    trackEvent('demo copy', { product: 'markdown' })
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

  return (
    <DocumentFooter className='document-footer'>
      <Text
        as='span'
        css={theme({
          fontSize: ['12px', '12px', '13px', '13px'],
          fontFamily: 'mono',
          letterSpacing: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          minWidth: '0',
          color: 'black80'
        })}
      >
        {apiUrl}
      </Text>
      {displayedContent && (
        <WordCountBadge>
          {formatCompactNumber(countWords(displayedContent))} words
          {' · '}
          {formatCompactNumber(estimateTokens(displayedContent))} tokens
        </WordCountBadge>
      )}
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
    </DocumentFooter>
  )
}
