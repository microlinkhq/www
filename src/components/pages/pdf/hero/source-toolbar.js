import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  borders,
  colors,
  theme,
  transition,
  gradient,
  fontSizes,
  space,
  radii,
  shadows
} from 'theme'
import Flex from 'components/elements/Flex'
import { stripProtocol } from './url'

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
    fontSize: [1, 1, 0, 0],
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
  handleHistoryClick
}) => (
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
      <AddressPrompt $visible={!isFocused && !hasInteracted} aria-hidden='true'>
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
    </AddressBar>
  </BrowserHeader>
)
