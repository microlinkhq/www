import React from 'react'
import { theme } from 'theme'
import Text from 'components/elements/Text'
import { CopyButton, FIRST_URL, MetaApiBar } from '../shared'

export const ApiBar = ({ currentUrl, capCopied, handleCapCopy }) => (
  <MetaApiBar
    className='meta-api-bar'
    css={theme({
      alignItems: 'center',
      justifyContent: 'space-between',
      px: [2, 3, 3, 3],
      py: '10px',
      gap: 2,
      borderTop: 1,
      borderColor: 'black05'
    })}
  >
    <Text
      as='span'
      css={theme({
        fontSize: ['13px', '13px', '14px', '14px'],
        fontFamily: 'mono',
        letterSpacing: 0,
        flex: 1,
        minWidth: '0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'black70'
      })}
    >
      https://api.microlink.io?
      <strong css={theme({ color: 'black' })}>
        palette&url={currentUrl || FIRST_URL}
      </strong>
    </Text>
    <CopyButton
      type='button'
      onClick={handleCapCopy}
      aria-label={capCopied ? 'Copied!' : 'Copy API URL'}
    >
      {capCopied
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
)
