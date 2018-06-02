import React, { Children } from 'react'
import CodeCopy from 'react-codecopy'

import styled, { keyframes } from 'styled-components'
import { fonts } from 'theme'

const serializeComponent = children =>
  Children.map(
    children,
    child => (typeof child === 'string' ? child : child.props.children)
  ).join('')

const TerminalWindow = styled.div`
  border-radius: 5px;
  margin: 50px 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 20px 50px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ dark }) => (dark ? '#333' : '#eee')};
`

const TerminalHeader = styled.div`
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  display: flex;
  height: 36px;
  background: ${({ dark }) => (dark ? '#333' : '#fff')};
  align-items: center;
  padding: 1rem;
`

const TerminalButton = styled.div`
  border-radius: 50px;
  width: 12px;
  height: 12px;
  margin: 0 0.2rem;
  background ${({ color }) => color};
`

const TerminalTitle = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: -3rem;
  color: #999;
  font-size: 12px;
`

const blink = keyframes`
  from { opacity: 1.0; } to { opacity: 0.0; }
`

const TerminalText = styled.div`
  padding: 30px;
  border-radius: 2px;
  overflow-x: auto;
  font-family: ${fonts.mono};
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${({ dark }) => (dark ? '#000' : 'transparent')};
  height: 100px;
  color: ${({ dark }) => (dark ? '#fff' : '#000')};
  display: flex;
  align-items: center;
`

const TerminalTextWrapper = styled.div`
  word-break: break-all;
  &::before {
    content: '$ ';
  }
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
    background: ${props => (props.dark ? '#EA407B' : '#000')};
    margin-left: 4px;
    position: relative;
    top: 3px;
    margin-right: 1px;
  }
`

const Terminal = ({ title, children, dark }) => (
  <TerminalWindow dark={dark}>
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

const _Terminal = ({ children, dark = false }) => {
  const content = Array.isArray(children)
    ? children
    : children
      .split(/\r?\n/)
      .map((item, index) => <span key={index}>{item}</span>)

  return (
    <Terminal dark={dark}>
      <div style={{ width: '100%' }}>
        <CustomCodeCopy
          theme={dark ? 'dark' : 'light'}
          text={serializeComponent(children)}
        >
          <TerminalTextWrapper dark={dark}>{content}</TerminalTextWrapper>
        </CustomCodeCopy>
      </div>
    </Terminal>
  )
}

_Terminal.displayName = 'Terminal'

export default _Terminal
