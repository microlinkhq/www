import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { hash, prettier, getLines, template } from 'helpers'
import { hideScrollbar, wordBreak } from 'helpers/style'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { cx, radii } from 'theme'
import range from 'lodash/range'

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
  ${hideScrollbar};
  ${props => codeTheme[props.$theme]};
  ${({ $highlightLines, $theme }) => {
    const isLight = $theme === 'light'
    return `
    ${generateHighlighLines($highlightLines)} {
      display: block;
      background: ${cx(isLight ? 'black05' : 'whitek05')};
      border-radius: ${radii[2]};
    }
    `
  }}
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
  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = toAlias(getLanguage(className, props))
  const id = `codeditor-${hash(children)}-${theme}`

  const [content, setContent] = useState({
    text: template(children).trim(),
    isPretty: false
  })

  const isInteractive =
    runkitProps !== false &&
    Runkit.isSupported({ language, text: content.text })

  const [isLoaded, setIsLoaded] = useState(!isInteractive)

  useEffect(() => {
    async function asyncPretty () {
      const prettyText = await prettier[language](content.text)
      setContent({ text: prettyText.trim(), isPretty: true })
    }
    asyncPretty()
  }, [])

  const TerminalComponent = (
    <Terminal
      title={title}
      theme={theme}
      id={id}
      text={content.text}
      loading={!isLoaded}
      {...props}
    >
      <TerminalTextWrapper>
        <CustomSyntaxHighlighter
          useInlineStyles={false}
          $theme={theme}
          $highlightLines={highlightLines}
          showLineNumbers={showLineNumbers}
          language={language}
          style={{}}
          wrapLines
        >
          {content.text}
        </CustomSyntaxHighlighter>
      </TerminalTextWrapper>
    </Terminal>
  )

  if (!isInteractive || !content.isPretty) return TerminalComponent

  return (
    <Runkit
      {...runkitProps}
      theme={theme}
      title={title}
      placeholderComponent={TerminalComponent}
      source={content.text}
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
  theme: 'light',
  width: TERMINAL_WIDTH
}

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
