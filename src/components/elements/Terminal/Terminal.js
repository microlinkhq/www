import { shadowOffsets, shadowColors, fonts, fontWeights } from 'theme'
import styled, { css } from 'styled-components'
import { CodeEditor, Box } from 'components/elements'
import { blink } from 'components/keyframes'
import { serializeComponent } from 'helpers'
import CodeCopy from 'react-codecopy'
import React from 'react'

const TerminalWindow = styled(Box)`
  border-radius: 5px;
  box-shadow: ${shadowOffsets[0]} ${shadowColors[0]};
`

TerminalWindow.defaultProps = {
  mt: '50px',
  mb: '50px',
  maxWidth: CodeEditor.width
}

const TerminalHeader = styled('header')`
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  display: flex;
  height: 36px;
  background: ${({ dark }) => (dark ? '#333' : '#fff')};
  align-items: center;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
`

const TerminalButton = styled('div')`
  border-radius: 50px;
  width: 12px;
  height: 12px;
  margin: 0 0.2rem;
  background ${({ color }) => color};
`

const TerminalTitle = styled('div')`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: -3rem;
  color: #999;
  font-size: 12px;
`

const TerminalText = styled('div')`
  font-weight: ${fontWeights.normal};
  padding: 16px;
  border-radius: 2px;
  overflow-x: auto;
  font-family: ${fonts.mono};
  font-size: 13px;
  line-height: 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${({ dark }) => (dark ? '#000' : '#fff')};
  color: ${({ dark }) => (dark ? '#fff' : '#000')};
  display: flex;
  align-items: center;
`

const blinkCursorStyle = css`
  &::after {
    content: '';
    will-change: opacity;
    animation-name: ${blink};
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
    animation-duration: 1s;
    display: inline-block;
    width: 1px;
    height: 14px;
    border-radius: 3px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background: ${props => (props.dark ? '#EA407B' : '#000')};
    margin-left: 4px;
    position: relative;
    top: 3px;
    margin-right: 1px;
  }
`

const TerminalTextWrapper = styled('div')`
  word-break: break-all;
  white-space: pre;
  &::before {
    content: '$ ';
  }

  ${props => props.blinkCursor && blinkCursorStyle}
`

const TerminalProvider = ({ style, title, children, dark, ...props }) => (
  <TerminalWindow dark={dark} style={style} {...props}>
    <TerminalHeader dark={dark}>
      <TerminalButton dark={dark} color='#FF5F56' />
      <TerminalButton dark={dark} color='#FFBD2E' />
      <TerminalButton dark={dark} color='#27C93F' />
      <TerminalTitle dark={dark}>{title}</TerminalTitle>
    </TerminalHeader>
    <TerminalText dark={dark}>{children}</TerminalText>
  </TerminalWindow>
)

const CustomCodeCopy = styled(CodeCopy)`
  top: -4px !important;
`

const fromString = text =>
  Array.isArray(text)
    ? text
    : text.split(/\r?\n/).map((item, index) => <span key={index}>{item}</span>)

const Terminal = ({ children, blinkCursor, dark, ...props }) => {
  const content = typeof children === 'string' ? fromString(children) : children

  return (
    <TerminalProvider dark={dark} {...props}>
      <Box
        css={`
          width: 100%;
          position: relative;
          height: 100%;
          overflow: auto;
        `}
      >
        <CustomCodeCopy
          theme={dark ? 'dark' : 'light'}
          text={serializeComponent(children)}
        >
          <TerminalTextWrapper blinkCursor={blinkCursor} dark={dark}>
            {content}
          </TerminalTextWrapper>
        </CustomCodeCopy>
      </Box>
    </TerminalProvider>
  )
}

Terminal.defaultProps = {
  dark: false,
  blinkCursor: true
}

export default Terminal
