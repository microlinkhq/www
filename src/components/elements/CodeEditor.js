import React, { Component, Children } from 'react'
import CodeCopy from 'react-codecopy'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/styles/hljs'
import styled from 'styled-components'
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
  background: #282a36;
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

const TerminalText = styled.div`
  border-radius: 2px;
  overflow-x: auto;
  font-family: ${fonts.mono};
  font-size: 13px;
  font-weight: normal;
  line-height: 20px;
  padding: 10px 30px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #282a36;
  color: #fff;
  display: flex;
  align-items: center;
`

const TerminalTextWrapper = styled.div`
  word-break: break-all;
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

class CodeEditor extends Component {
  render () {
    const {
      language = 'javascript',
      showLineNumbers = true,
      children,
      ...props
    } = this.props

    return (
      <Terminal dark>
        <div style={{ width: '100%' }}>
          <CustomCodeCopy
            theme={'dark'}
            text={serializeComponent(this.props.children)}
          >
            <TerminalTextWrapper dark>
              <SyntaxHighlighter
                lineNumberStyle={{ color: '#6272A4' }}
                showLineNumbers={showLineNumbers}
                language={language}
                style={dracula}
                {...props}
                children={children.trim()}
              />
            </TerminalTextWrapper>
          </CustomCodeCopy>
        </div>
      </Terminal>
    )
  }
}

CodeEditor.displayName = 'CodeEditor'

export default CodeEditor
