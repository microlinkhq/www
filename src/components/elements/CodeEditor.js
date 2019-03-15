import React, { Component } from 'react'
import CodeCopy from 'react-codecopy'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { serializeComponent } from 'helpers'
import styled from 'styled-components'
import { fonts } from 'theme'
import { Box } from 'components/elements'
import { range } from 'lodash'

const RE_LINES = /\{\d(?:, ?\d)?\}|[\d]/

const getLines = (className = '') => {
  const match = className.match(RE_LINES)
  return match
    ? match[0]
        .replace('{', '')
        .replace('}', '')
        .split(',')
        .map(n => Number(n.trim()))
    : null
}

const generateHighlighLines = ([start, end]) => {
  const collection = end ? range(start, end + 1) : start
  return collection.map((line, index) => {
    const isLast = index + 1 === collection.length
    console.log('index', index, collection, isLast)
    return `code > span:nth-child(${line})${!isLast ? ',' : ''}`
  })
}

const prismTheme = {
  'code[class*="language-"]': {
    color: '#c5c8c6',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: fonts.mono,
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none'
  },
  'pre[class*="language-"]': {
    color: '#c5c8c6',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily:
      "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
    background: 'rgb(40, 42, 54)'
  },
  ':not(pre) > code[class*="language-"]': {
    background: 'rgb(40, 42, 54)',
    padding: '.1em',
    borderRadius: '.3em'
  },
  'attr-name': { color: 'rgb(241, 250, 140)', fontStyle: 'italic' },
  comment: { color: '#656b80' },
  string: { color: 'rgb(241, 250, 140)' },
  url: { color: 'rgb(241, 250, 140)' },
  variable: { color: 'rgb(214, 222, 235)' },
  number: { color: 'rgb(247, 140, 108)' },
  builtin: { color: 'rgb(130, 170, 255)' },
  char: { color: 'rgb(130, 170, 255)' },
  constant: { color: 'rgb(130, 170, 255)' },
  function: { color: 'rgb(130, 170, 255)' },
  punctuation: { color: 'rgb(199, 146, 234)' },
  selector: { color: 'rgb(199, 146, 234)', fontStyle: "'italic'" },
  doctype: { color: 'rgb(199, 146, 234)', fontStyle: "'italic'" },
  class_name: { color: 'rgb(255, 203, 139)' },
  tag: { color: '#ffa7c4' },
  operator: { color: '#ffa7c4' },
  keyword: { color: '#ffa7c4' },
  boolean: { color: 'rgb(255, 88, 116)' },
  property: { color: 'rgb(128, 203, 196)' },
  namespace: { color: 'rgb(178, 204, 214)' }
}

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

  ${props =>
    props.highlightLines && generateHighlighLines(props.highlightLines)} {
    display: block;
    background: #464957;
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
                highlightLines={getLines(this.props.className)}
                lineNumberStyle={{ color: '#6272A4' }}
                showLineNumbers={showLineNumbers}
                language={language}
                style={prismTheme}
                wrapLines
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
