import React, { useRef, useState } from 'react'
import { theme } from 'theme'
import Text from 'components/elements/Text'
import { PdfApiBar, CopyButton } from '../shared'

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

export const Footer = ({ apiUrl, inputUrl }) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimerRef = useRef(null)

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

  return (
    <PdfApiBar
      className='pdf-api-bar'
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
        <strong css={theme({ color: 'black' })}>pdf&url</strong>={inputUrl}
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
    </PdfApiBar>
  )
}
