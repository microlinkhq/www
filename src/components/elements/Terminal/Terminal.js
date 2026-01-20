import { theme, speed, toMs, timings, cx, colors, radii, borders } from 'theme'
import { childrenTextAll } from 'helpers/children-text-all'
import styled, { css, keyframes } from 'styled-components'
import { aspectRatio } from 'helpers/aspect-ratio'
import { blink } from 'components/keyframes'
import { wordBreak } from 'helpers/style'
import React from 'react'

import CodeCopy from '../Codecopy'
import Text from '../Text'
import Box from '../Box'

export const TerminalWindow = styled(Box)`
  overflow: auto;
  border-radius: ${radii[3]};
  border: ${borders[1]};
  border-color: ${({ $isDark }) => cx($isDark ? 'white10' : 'black10')};
  background: ${({ $isDark }) => cx($isDark ? 'black' : 'white')};
  color: ${({ $isDark }) => cx($isDark ? 'white' : 'black')};
`

export const { width: TERMINAL_WIDTH, height: TERMINAL_HEIGHT } = aspectRatio([
  '100%',
  0.48,
  0.68,
  0.68
])

const createBgAnimation = color => keyframes`
from {
  background: transparent;
}
to {
  background: ${color};
}
`

const fromString = text =>
  Array.isArray(text)
    ? text
    : text.split(/\r?\n/).map((item, index) => (
      <span key={index}>
        {item}
        {'\n'}
      </span>
    ))

const TerminalHeader = styled('div')`
  background: linear-gradient(
    ${props => (props.$isDark ? 'black' : 'white')} 75%,
    transparent
  );
  border-top-right-radius: ${radii[3]};
  border-top-left-radius: ${radii[3]};
  display: flex;
  align-items: center;
  padding: 1rem;
  position: sticky;
  height: 36px;
  top: 0;
  z-index: 1;
`

const animationStyle = css`
  background: transparent;
  animation-name: ${props => createBgAnimation(cx(props.color))};
  animation-timing-function: ${timings.long};
  animation-fill-mode: both;
  animation-direction: alternate;
  animation-iteration-count: infinite;
`

export const TerminalButton = styled('div')`
  border-radius: 50px;
  width: 12px;
  height: 12px;

  border: 1px solid;
  border-color: ${colors.black10};
  background: ${props => cx(props.color)};
  ${({ $loading }) => $loading && animationStyle}
`

const animationSpeed = speed.slowly
const animationDuration = toMs(animationSpeed)
const animationDelay = (n = 1) => `${(animationSpeed / 2) * n}ms`

const TerminalButtonRed = ({ loading, ...props }) => (
  <TerminalButton
    color='fullscreen'
    $loading={loading}
    style={
      loading
        ? {
            animationDelay: animationDelay(1),
            animationDuration
          }
        : undefined
    }
    {...props}
  />
)

const TerminalButtonYellow = ({ loading, ...props }) => (
  <TerminalButton
    $loading={loading}
    style={Object.assign(
      { margin: '0 4px' },
      loading && { animationDelay: animationDelay(2), animationDuration }
    )}
    color='minimize'
    {...props}
  />
)

const TerminalButtonGreen = ({ loading, ...props }) => (
  <TerminalButton
    $loading={loading}
    color='close'
    style={
      loading
        ? {
            animationDelay: animationDelay(3),
            animationDuration
          }
        : undefined
    }
    {...props}
  />
)

TerminalButton.Green = TerminalButtonGreen
TerminalButton.Yellow = TerminalButtonYellow
TerminalButton.Red = TerminalButtonRed

const TerminalTitleWrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: -3rem;
`

export const TerminalTitle = ({ isDark, children }) => (
  <TerminalTitleWrapper>
    <Text
      css={theme({
        color: isDark ? 'white40' : 'black40',
        fontSize: 0
      })}
    >
      {children}
    </Text>
  </TerminalTitleWrapper>
)

export const TerminalText = styled('div')`
  padding: 16px 8px 16px 8px;
  overflow: visible;
  font-size: 13px;
  line-height: 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  align-items: center;

  div > span,
  code > span {
    padding: 0 8px;
  }

  > div {
    width: 100%;
  }

  ${theme({
    fontWeight: 'normal',
    fontFamily: 'mono'
  })}
`

const blinkCursorStyle = css`
  &::after {
    left: -8px;
    content: '';
    animation-name: ${blink};
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
    animation-duration: 1s;
    display: inline-block;
    width: 1px;
    height: 14px;
    background: ${colors.secondary};
    margin-left: 4px;
    position: relative;
    top: 2px;
    margin-right: 1px;
  }
`

const TerminalTextWrapper = styled('div')`
  ${wordBreak};
  overflow: auto;
  width: 100%;
  white-space: pre;
  &::before {
    content: ${props => (props.$shellSymbol ? `'${props.$shellSymbol} '` : '')};
  }
  ${props => props.$blinkCursor && blinkCursorStyle}
`

const TerminalProvider = ({
  ActionComponent = CodeCopy,
  text,
  children,
  loading = false,
  isDark = false,
  title,
  header,
  width = TERMINAL_WIDTH,
  ...props
}) => {
  return (
    <TerminalWindow $isDark={isDark} css={theme({ width })} {...props}>
      <TerminalHeader $isDark={isDark} {...header}>
        <TerminalButton.Red loading={loading} />
        <TerminalButton.Yellow loading={loading} />
        <TerminalButton.Green loading={loading} />
        <TerminalTitle isDark={isDark}>{title}</TerminalTitle>
        <ActionComponent isDark={isDark} text={text} />
      </TerminalHeader>
      <TerminalText>{children}</TerminalText>
    </TerminalWindow>
  )
}

const Terminal = ({
  children,
  shellSymbol = false,
  blinkCursor = true,
  ...props
}) => {
  const content = typeof children === 'string' ? fromString(children) : children
  const text = childrenTextAll(children)

  return (
    <TerminalProvider text={text} {...props}>
      <TerminalTextWrapper
        $shellSymbol={shellSymbol}
        $blinkCursor={blinkCursor}
      >
        {content}
      </TerminalTextWrapper>
    </TerminalProvider>
  )
}

Terminal.width = TERMINAL_WIDTH
Terminal.height = TERMINAL_HEIGHT

export default Terminal
