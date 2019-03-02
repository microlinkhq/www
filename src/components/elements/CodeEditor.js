import React, { Component } from 'react'
import CodeCopy from 'react-codecopy'
import SyntaxHighlighter from 'react-syntax-highlighter'
import * as themes from 'react-syntax-highlighter/dist/styles/hljs'
import { serializeComponent } from 'helpers'
import styled from 'styled-components'
import { fonts } from 'theme'
import { Box } from 'components/elements'

const CustomSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin-top: 0px;
  padding-bottom: 12px !important;
  margin-bottom: 12px;
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`

const TerminalWindow = styled(Box)`
  border-radius: 5px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
`

TerminalWindow.defaultProps = {
  ...Box.defaultProps,
  my: '50px'
}

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
  padding: 0 20px;
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

const Terminal = ({ title, children, dark, ...props }) => (
  <TerminalWindow dark={dark} {...props}>
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
      theme = 'dracula',
      my,
      ...props
    } = this.props

    return (
      <Terminal dark my={my}>
        <div style={{ width: '100%' }}>
          <CustomCodeCopy
            theme={'dark'}
            text={serializeComponent(this.props.children)}
          >
            <TerminalTextWrapper dark>
              <CustomSyntaxHighlighter
                lineNumberStyle={{ color: '#6272A4' }}
                showLineNumbers={showLineNumbers}
                language={language}
                style={themes[theme]}
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

// this is necessary for markdown
CodeEditor.displayName = 'CodeEditor'

export default CodeEditor
