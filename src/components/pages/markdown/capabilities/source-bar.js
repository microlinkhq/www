import React from 'react'
import { css } from 'styled-components'
import { space, theme } from 'theme'
import {
  DocumentHeader,
  SourceBar,
  SourceInput,
  SourcePrompt,
  ensureProtocol,
  stripProtocol
} from '../shared'
import { CAP_DEFAULT_URL } from './use-attract-typing'

export const CapSourceBar = ({
  capInputRef,
  capFocused,
  capDisplayValue,
  capHasInteracted,
  setCapUrl,
  setCapFocused,
  setCapHasInteracted,
  capTypeTimerRef,
  capHasContentRef,
  capSkipBlurRef,
  capLastFetchedRef,
  fetchCapMarkdown,
  submitCapUrl
}) => (
  <DocumentHeader>
    <SourceBar>
      <svg
        width='14'
        height='14'
        viewBox='0 0 24 24'
        fill='none'
        aria-hidden='true'
        css={theme({ flexShrink: 0, color: 'black30' })}
      >
        <circle
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <path
          d='M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <SourceInput
        ref={capInputRef}
        $active={capFocused}
        css={css`
          ${theme({ fontSize: 1 })};
          text-align: ${capFocused ? 'left' : 'center'};
        `}
        type='url'
        size='1'
        value={capDisplayValue}
        onChange={e => setCapUrl(ensureProtocol(stripProtocol(e.target.value)))}
        onFocus={() => {
          capSkipBlurRef.current = false
          setCapFocused(true)
          setCapHasInteracted(true)
          if (capTypeTimerRef.current) {
            clearTimeout(capTypeTimerRef.current)
            capTypeTimerRef.current = null
            setCapUrl(CAP_DEFAULT_URL)
            if (!capHasContentRef.current) {
              fetchCapMarkdown(CAP_DEFAULT_URL)
            }
          }
        }}
        onBlur={e => {
          const value = e.target.value
          setTimeout(() => {
            if (capSkipBlurRef.current) {
              capSkipBlurRef.current = false
              return
            }
            const normalized = ensureProtocol(value)
            if (normalized && normalized !== capLastFetchedRef.current) {
              submitCapUrl(normalized)
            } else {
              setCapUrl(normalized)
              setCapFocused(false)
            }
          }, 150)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            capSkipBlurRef.current = true
            e.target.blur()
            submitCapUrl(e.target.value)
          }
          if (e.key === 'Escape') {
            capSkipBlurRef.current = true
            e.target.blur()
            setCapFocused(false)
          }
        }}
        aria-label='Source URL'
        spellCheck={false}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
      />
      <SourcePrompt
        $visible={!capFocused && !capHasInteracted}
        aria-hidden='true'
        css={css`
          position: absolute;
          right: ${space[2]};
          top: 50%;
          transform: translateY(-50%)
            ${!capFocused && !capHasInteracted ? '' : `translateX(${space[1]})`};
          margin: 0;
          @media (max-width: 40em) {
            display: none;
          }
        `}
      >
        <span className='source-prompt__arrow'>←</span>
        Type any URL
      </SourcePrompt>
    </SourceBar>
  </DocumentHeader>
)
