import CodeCopyBase from 'react-codecopy'
import { useMounted } from 'components/hook/use-mounted'
import styled from 'styled-components'
import { cx } from 'theme'
import React from 'react'

const CodeCopyWrapper = styled('div')`
  .codecopy__button {
    box-shadow: none;
    background: none;
    border: 0;
    padding: 0;
    position: relative;
    top: -2px;
    left: 0;
    right: 0;

    &[aria-label='Copied!']::after {
      right: 30px;
    }

    &[aria-label='Copy to clipboard']::after {
      right: 56px;
    }

    &:hover {
      background: none;
    }
  }

  .codecopy__button__light::before {
    border-bottom-color: black;
  }
  .codecopy__button__light::after {
    background: black;
  }

  .codecopy__button__dark::before {
    border-bottom-color: white;
  }
  .codecopy__button__dark::after {
    background: white;
    color: black;
  }

  .codecopy__icon {
    fill: ${({ $isDark }) => cx($isDark ? 'white50' : 'black20')};

    &:hover {
      fill: ${({ $isDark }) => cx($isDark ? 'white' : 'black')};
    }
  }
`

const CodeCopy = ({ isDark, text }) => {
  const mounted = useMounted()

  return (
    <CodeCopyWrapper $isDark={isDark}>
      {mounted
        ? (
          <CodeCopyBase
            theme={isDark ? 'dark' : 'light'}
            interactive
            text={text}
          />
          )
        : (
          <button
            type='button'
            className={`codecopy__button codecopy__button__${
            isDark ? 'dark' : 'light'
          }`}
            aria-label='Copy to clipboard'
            disabled
            style={{
              cursor: 'default',
              display: 'inline-block',
              lineHeight: '20px',
              fontSize: '14px'
            }}
          >
            <svg
              height='16'
              width='16'
              viewBox='0 0 16 16'
              className='codecopy__icon'
              aria-hidden='true'
              style={{
                position: 'relative',
                top: '4px',
                marginTop: '-3px',
                display: 'inline',
                verticalAlign: 'baseline',
                lineHeight: '20px'
              }}
            >
              <path
                fillRule='evenodd'
                d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
              />
            </svg>
          </button>
          )}
    </CodeCopyWrapper>
  )
}

export default CodeCopy
