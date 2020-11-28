import { serializeComponent, aspectRatio } from 'helpers'
import styled, { css } from 'styled-components'
import { blink } from 'components/keyframes'
import { wordBreak } from 'helpers/style'
import CodeCopy from 'react-codecopy'
import React from 'react'

import {
  cx,
  colors,
  shadowOffsets,
  shadowColors,
  fonts,
  fontWeights
} from 'theme'

import Text from '../Text'
import Box from '../Box'

export const TerminalWindow = styled(Box)`
  border-radius: 5px;
  box-shadow: ${shadowOffsets[0]} ${shadowColors[0]};
`

export const { width: TERMINAL_WIDTH, height: TERMINAL_HEIGHT } = aspectRatio([
  0.41,
  0.48,
  0.68,
  0.68
])

const fromString = text =>
  Array.isArray(text)
    ? text
    : text.split(/\r?\n/).map((item, index) => <span key={index}>{item}</span>)

export const styleTerminalHeader = css`
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  display: flex;
  align-items: center;
  padding: 1rem;
  position: sticky;
`

const TerminalHeader = styled('header')`
  ${styleTerminalHeader};
  height: 36px;
  background: ${props => props.background};
  top: 0;
  z-index: 1;
`

export const TerminalButton = styled('div')`
  border-radius: 50px;
  width: 12px;
  height: 12px;
  background ${({ color }) => cx(color)};
`

TerminalButton.Green = props => <TerminalButton color='close' {...props} />
TerminalButton.Yellow = props => (
  <TerminalButton style={{ margin: '0 4px' }} color='minimize' {...props} />
)
TerminalButton.Red = props => <TerminalButton color='fullscreen' {...props} />

const TerminalTitleWrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: -3rem;
`

export const TerminalTitle = ({ theme, children }) => (
  <TerminalTitleWrapper>
    <Text color={theme === 'dark' ? 'white40' : 'black40'} fontSize={0}>
      {children}
    </Text>
  </TerminalTitleWrapper>
)

const TerminalText = styled('div')`
  font-weight: ${fontWeights.normal};
  padding: 16px;
  overflow: visible;
  font-family: ${fonts.mono};
  font-size: 13px;
  line-height: 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${props => props.background};
  color: ${props => props.color};
  display: flex;
  align-items: center;

  > div {
    width: 100%;
  }

  .codecopy_button {
    top: -4px;
    background: ${props => props.background};
  }
`

const blinkCursorStyle = css`
  &::after {
    content: '';
    animation-name: ${blink};
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
    animation-duration: 1s;
    display: inline-block;
    width: 1px;
    height: 14px;
    border-radius: 3px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background: ${({ theme }) =>
      theme === 'dark' ? colors.secondary : colors.black};
    margin-left: 4px;
    position: relative;
    top: 3px;
    margin-right: 1px;
  }
`

const TerminalTextWrapper = styled('div')`
  ${wordBreak};
  overflow: auto;
  width: 100%;
  white-space: pre;
  &::before {
    content: ${props => (props.shellSymbol ? `${props.shellSymbol} ` : '')};
  }
  ${props => props.blinkCursor && blinkCursorStyle}
`

const TerminalProvider = ({ title = '', children, theme, ...props }) => {
  const background = theme === 'dark' ? colors.black : colors.white
  const color = theme === 'dark' ? colors.white : colors.black

  return (
    <TerminalWindow theme={theme} {...props}>
      <TerminalHeader background={background} theme={theme}>
        <TerminalButton.Red theme={theme} />
        <TerminalButton.Yellow theme={theme} />
        <TerminalButton.Green theme={theme} />
        <TerminalTitle theme={theme}>{title}</TerminalTitle>
      </TerminalHeader>
      <TerminalText color={color} background={background}>
        {children}
      </TerminalText>
    </TerminalWindow>
  )
}

const Terminal = ({
  children,
  shellSymbol,
  blinkCursor,
  width,
  theme,
  ...props
}) => {
  const content = typeof children === 'string' ? fromString(children) : children
  const text = serializeComponent(children)

  return (
    <TerminalProvider width={width} theme={theme} {...props}>
      <CodeCopy theme={theme} text={text}>
        <TerminalTextWrapper
          shellSymbol={shellSymbol}
          blinkCursor={blinkCursor}
          theme={theme}
        >
          {content}
        </TerminalTextWrapper>
      </CodeCopy>
    </TerminalProvider>
  )
}

Terminal.defaultProps = {
  blinkCursor: true,
  shellSymbol: '$',
  theme: 'light',
  width: TERMINAL_WIDTH
}

Terminal.width = TERMINAL_WIDTH
Terminal.height = TERMINAL_HEIGHT

export default Terminal
