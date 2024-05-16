import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { hash, prettier, getLines, template } from 'helpers'
import { hideScrollbar, wordBreak } from 'helpers/style'
import React, { useState } from 'react'
import identity from 'lodash/identity'
import styled from 'styled-components'
import { cx, radii, theme } from 'theme'
import range from 'lodash/range'
import get from 'dlv'

import codeTheme from './theme'
import Runkit from '../Runkit/Runkit'

import Terminal, { TERMINAL_WIDTH, TERMINAL_HEIGHT } from '../Terminal/Terminal'

const toAlias = (lang = '') => {
  lang = lang.toLowerCase()
  switch (lang) {
    case 'vanilla':
      return 'html'
    case 'react':
      return 'jsx'
    case 'jekyll':
      return 'markdown'
    case 'curl':
    case 'shell':
      return 'bash'
    case 'node.js':
    case 'javascript':
      return 'js'
    default:
      return lang
  }
}

const generateHighlightLines = linesRange => {
  if (!linesRange) return

  const [start, end] = linesRange
  const collection = end ? range(start, end + 1) : [start]

  return collection.map((line, index) => {
    const isLast = index + 1 === collection.length
    return `code > span:nth-child(${line})${!isLast ? ',' : ''}`
  })
}

const getClassName = ({ className, metastring = '' }) =>
  className ? className + metastring : ''

const CustomSyntaxHighlighter = styled(SyntaxHighlighter)`
  ${hideScrollbar};
  ${props => codeTheme[props.$isDark]};
  ${({ $highlightLines, $isDark }) => {
    return `
    ${generateHighlightLines($highlightLines)} {
      display: block;
      background: ${cx($isDark ? 'white05' : 'black05')};
      border-radius: ${radii[2]};
    }
    `
  }}
`

const TerminalTextWrapper = styled('div')`
  ${wordBreak};
  width: 100%;
  font-size: 14px;
`

const CodeEditor = ({
  children,
  interactive: runkitProps,
  showLineNumbers,
  isDark,
  language: languageProp,
  title = '',
  ...props
}) => {
  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = toAlias(languageProp || title.split('.').pop())
  const pretty = get(prettier, language, identity)
  const text = pretty(template(children)).trim()
  const id = `codeditor-${hash(children)}-${isDark ? 'dark' : 'light'}`

  const isInteractive =
    runkitProps !== false && Runkit.isSupported({ language, text })

  const [isLoaded, setIsLoaded] = useState(!isInteractive)

  const TerminalComponent = (
    <Terminal
      title={title}
      isDark={isDark}
      id={id}
      text={text}
      loading={!isLoaded}
      css={theme({ width: TERMINAL_WIDTH })}
      {...props}
    >
      <TerminalTextWrapper>
        <CustomSyntaxHighlighter
          useInlineStyles={false}
          $isDark={isDark}
          $highlightLines={highlightLines}
          showLineNumbers={showLineNumbers}
          language={language}
          style={{}}
          wrapLines
        >
          {text}
        </CustomSyntaxHighlighter>
      </TerminalTextWrapper>
    </Terminal>
  )

  if (!isInteractive) return TerminalComponent

  return (
    <Runkit
      {...runkitProps}
      isDark={isDark}
      title={title}
      placeholderComponent={TerminalComponent}
      source={text}
      onLoad={element => {
        setIsLoaded(true)
        element.style['padding-top'] = '4px'
        element.style['padding-bottom'] = 0
        element.style['overflow-x'] = 'hidden'
      }}
    />
  )
}

CodeEditor.defaultProps = {
  blinkCursor: false,
  interactive: {},
  showLineNumbers: false,
  isDark: false
}

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
