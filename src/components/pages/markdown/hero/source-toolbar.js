import React from 'react'
import styled from 'styled-components'
import {
  borders,
  colors,
  radii,
  shadows,
  space,
  theme,
  transition
} from 'theme'
import { Terminal as TerminalIcon } from 'react-feather'
import Button from 'components/elements/Button/Button'
import {
  DocumentHeader,
  SourceBar,
  SourceInput,
  SourcePrompt,
  stripProtocol
} from '../shared'

const NerdButton = styled(Button).attrs({ variant: 'black' })`
  &&& {
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: space[4],
      minHeight: space[4],
      maxHeight: space[4],
      width: space[4],
      minWidth: space[4],
      p: 0,
      borderRadius: 4,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    })};
    background: ${p => (p.$active ? colors.black : 'transparent')};
    border: ${borders[1]} ${p => (p.$active ? colors.black : colors.black10)};
    box-shadow: none;
    color: ${p => (p.$active ? colors.white : colors.gray6)};
    transition: background ${transition.short}, border-color ${transition.short},
      color ${transition.short}, box-shadow ${transition.short};
  }

  &&&:hover:not(:disabled) {
    background: ${p => (p.$active ? colors.black : colors.gray1)};
    border-color: ${p => (p.$active ? colors.gray7 : colors.black20)};
    color: ${p => (p.$active ? colors.white : colors.gray7)};
    box-shadow: none;
  }

  &&&:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
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
  transition: color ${transition.short}, background ${transition.short};

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
    outline-offset: ${radii[1]};
  }
`

const HistoryDropdown = styled('div')`
  ${theme({ position: 'absolute', borderRadius: 4, bg: 'white' })};
  top: calc(100% + ${space[1]});
  left: 0;
  right: 0;
  border: ${borders[1]} ${colors.black20};
  overflow: hidden;
  box-shadow: ${shadows[4]};
  z-index: 10;
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
    background: ${colors.orange0};
    color: ${colors.black};
    outline: none;
  }

  & + & {
    border-top: ${borders[1]} ${colors.black10};
  }
`

export const SourceToolbar = ({
  navIndex,
  navStack,
  handleBack,
  handleForward,
  ui: { isGlowing, isAttractMode, isPulsing, isFocused, hasInteracted },
  inputRef,
  displayValue,
  handleChange,
  handlePaste,
  handleFocus,
  handleBlur,
  handleKeyDown,
  history,
  handleHistoryClick,
  showNerdStats,
  handleNerdClick
}) => (
  <DocumentHeader>
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
    <SourceBar
      $glowing={isGlowing}
      $active={isAttractMode}
      $isPulsing={isPulsing}
    >
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
        aria-label='Source URL'
        spellCheck={false}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
      />
      <SourcePrompt $visible={!isFocused && !hasInteracted} aria-hidden='true'>
        <span className='source-prompt__arrow'>←</span>
        Type any URL
      </SourcePrompt>

      {isFocused && history.length > 0 && (
        <HistoryDropdown role='listbox' aria-label='Recent URLs'>
          {history.map(url => (
            <HistoryItem
              key={url}
              role='option'
              type='button'
              onMouseDown={e => e.preventDefault()}
              onClick={() => handleHistoryClick(url)}
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
    </SourceBar>
    <NerdButton
      $active={showNerdStats}
      type='button'
      aria-label={showNerdStats ? 'Hide nerd stats' : 'Show nerd stats'}
      aria-pressed={showNerdStats}
      onClick={handleNerdClick}
    >
      <TerminalIcon size={16} aria-hidden='true' />
    </NerdButton>
  </DocumentHeader>
)
