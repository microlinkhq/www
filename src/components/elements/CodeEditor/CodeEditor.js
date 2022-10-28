import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { hash, prettier, getLines, template } from 'helpers'
import { hideScrollbar, wordBreak } from 'helpers/style'
import React, { useState } from 'react'
import identity from 'lodash/identity'
import styled from 'styled-components'
import range from 'lodash/range'
import { radii } from 'theme'
import get from 'dlv'

import { prismThemes } from './theme'
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

const generateHighlighLines = linesRange => {
  if (!linesRange) return

  const [start, end] = linesRange
  const collection = end ? range(start, end + 1) : [start]

  return collection.map((line, index) => {
    const isLast = index + 1 === collection.length
    return `code > span:nth-child(${line})${!isLast ? ',' : ''}`
  })
}

const getLanguage = (className, { language }) => {
  if (language) return language
  const languageFromClassName = className.split('-')[1]
  if (languageFromClassName) return languageFromClassName.split('{')[0]
  return 'js'
}

const getClassName = ({ className, metastring = '' }) =>
  className ? className + metastring : ''

const CustomSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding-right: 0px !important;
  margin: 0 !important;
  ${hideScrollbar};

  ${({ $prismTheme, $highlightLines }) => `
    .linenumber {
      color: ${
        $prismTheme['.line-numbers-rows > span:before'].color
      } !important;
    }

    ${generateHighlighLines($highlightLines)} {
      display: block;
      background: ${$prismTheme['.line-highlight'].background};
      border-radius: ${radii[2]};
    }
  `}
`

const TerminalTextWrapper = styled.div`
  ${wordBreak};
  width: 100%;
`

const CodeEditor = ({
  children,
  interactive: runkitProps,
  showLineNumbers,
  theme,
  title,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = toAlias(getLanguage(className, props))
  const pretty = props.prettier ? get(prettier, language, identity) : identity
  const text = pretty(template(children)).trim()
  const prismTheme = prismThemes[theme]
  const id = `codeditor-${hash(children)}-${theme}`
  const isInteractive = Runkit.isSupported({ language, text })

  const TerminalComponent = (
    <Terminal
      title={title}
      theme={theme}
      id={id}
      text={text}
      loading={!isLoaded && isInteractive}
      {...props}
    >
      <TerminalTextWrapper>
        <CustomSyntaxHighlighter
          $prismTheme={prismTheme}
          $highlightLines={highlightLines}
          showLineNumbers={showLineNumbers}
          language={language}
          style={prismTheme}
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
      theme={theme}
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
  prettier: true,
  showLineNumbers: false,
  theme: 'light',
  width: TERMINAL_WIDTH
}

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
