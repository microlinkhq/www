import { colors, shadowOffsets, shadowColors, fonts, fontWeights } from 'theme'
import { serializeComponent, aspectRatio } from 'helpers'
import { Text, Box } from 'components/elements'
import styled, { css } from 'styled-components'
import { blink } from 'components/keyframes'
import CodeCopy from 'react-codecopy'
import React from 'react'

export const TerminalWindow = styled(Box)`
  border-radius: 5px;
  box-shadow: ${shadowOffsets[0]} ${shadowColors[0]};
`

const TERMINAL_WIDTH = aspectRatio([0.3, 0.4, 0.6, 0.6]).width

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
  background: ${({ theme }) =>
    theme === 'dark' ? colors.black : colors.white};
  top: 0;
  z-index: 1;
`

export const TerminalButton = styled('div')`
  border-radius: 50px;
  width: 12px;
  height: 12px;
  margin: 0 0.2rem;
  background ${({ color }) => color};
`

TerminalButton.Green = props => <TerminalButton color='#0CCE6B' {...props} />
TerminalButton.Yellow = props => <TerminalButton color='#FFBD2E' {...props} />
TerminalButton.Red = props => <TerminalButton color='#FF5F56' {...props} />

const TerminalTitleWrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: -3rem;
`

const TerminalText = styled('div')`
  font-weight: ${fontWeights.normal};
  padding: 16px;
  overflow-x: auto;
  font-family: ${fonts.mono};
  font-size: 13px;
  line-height: 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${({ theme }) =>
    theme === 'dark' ? colors.black : colors.white};
  color: ${({ theme }) => (theme === 'dark' ? colors.white : colors.black)};
  display: flex;
  align-items: center;

  > div {
    width: 100%;
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
  width: 100%;
  word-break: break-all;
  white-space: pre;
  &::before {
    content: ${props => (props.shellSymbol ? '$ ' : '')};
  }
  ${props => props.blinkCursor && blinkCursorStyle}
`

const TerminalProvider = ({ title, children, theme, ...props }) => (
  <TerminalWindow theme={theme} {...props}>
    <TerminalHeader theme={theme}>
      <TerminalButton.Red theme={theme} />
      <TerminalButton.Yellow theme={theme} />
      <TerminalButton.Green theme={theme} />
      {title && (
        <TerminalTitleWrapper>
          <Text
            color={theme === 'dark' ? 'white40' : 'black40'}
            fontSize={0}
            children={title}
          />
        </TerminalTitleWrapper>
      )}
    </TerminalHeader>
    <TerminalText theme={theme} children={children} />
  </TerminalWindow>
)

const CustomCodeCopy = styled(CodeCopy)`
  top: -4px !important;

  &::after,
  &::before {
    display: none !important;
  }
`

const Terminal = ({
  children,
  shellSymbol,
  blinkCursor,
  width,
  theme,
  ...props
}) => {
  const content = typeof children === 'string' ? fromString(children) : children

  return (
    <TerminalProvider width={width} theme={theme} {...props}>
      <CustomCodeCopy theme={theme} text={serializeComponent(children)}>
        <TerminalTextWrapper
          shellSymbol={shellSymbol}
          blinkCursor={blinkCursor}
          theme={theme}
          children={content}
        />
      </CustomCodeCopy>
    </TerminalProvider>
  )
}

Terminal.defaultProps = {
  theme: 'light',
  blinkCursor: true,
  shellSymbol: true,
  width: TERMINAL_WIDTH
}

export default Terminal
