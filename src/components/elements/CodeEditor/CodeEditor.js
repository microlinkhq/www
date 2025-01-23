import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { getLines } from 'helpers/get-lines'
import { prettier } from 'helpers/prettier'
import { template } from 'helpers/template'
import { hash } from 'helpers/hash'

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
  return collection.map(line => `code > span:nth-child(${line})`)
}

const getClassName = ({ className, metastring = '' }) =>
  className ? className + metastring : ''

const CustomSyntaxHighlighter = styled(SyntaxHighlighter)`
  ${hideScrollbar};
  ${props => codeTheme[props.$theme]};
`

const TerminalTextWrapper = styled('div')`
  ${wordBreak};
  width: 100%;
  font-size: 14px;
`

const getLanguage = ({ className, language, title }) => {
  if (language) return language
  if (title) return title.split('.').pop()
  const languageFromClassName = className.split('-')[1]
  if (languageFromClassName) return languageFromClassName.split('{')[0]
  return 'js'
}

const CodeEditor = ({
  children,
  interactive: runkitProps = {},
  showLineNumbers = false,
  isDark = false,
  language: languageProp,
  title = '',
  blinkCursor = false,
  ...props
}) => {
  const themeKey = isDark ? 'dark' : 'light'
  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = toAlias(
    getLanguage({ className, language: languageProp, title })
  )
  const pretty = get(prettier, language, identity)
  const text = pretty(template(children)).trim()
  const id = `codeditor-${hash(children)}-${themeKey}`

  const isInteractive =
    runkitProps !== false && Runkit.isSupported({ language, text })

  const [isLoaded, setIsLoaded] = useState(!isInteractive)

  const highLightLinesSelector = generateHighlightLines(highlightLines)
  const firstHighlightLine = highLightLinesSelector && highLightLinesSelector[0]
  const lastHighlightLine =
    highLightLinesSelector &&
    highLightLinesSelector[highLightLinesSelector.length - 1]

  const TerminalComponent = (
    <Terminal
      title={title}
      isDark={isDark}
      id={id}
      text={text}
      loading={!isLoaded}
      css={theme({ width: TERMINAL_WIDTH })}
      blinkCursor={blinkCursor}
      {...props}
    >
      <TerminalTextWrapper>
        <CustomSyntaxHighlighter
          css={`
            ${String(highLightLinesSelector)} {
              display: block;
              background: ${cx(isDark ? 'white05' : 'black05')};
            }
            ${String(firstHighlightLine)} {
              border-top-left-radius: ${radii[2]};
              border-top-right-radius: ${radii[2]};
            }
            ${String(lastHighlightLine)} {
              border-bottom-left-radius: ${radii[2]};
              border-bottom-right-radius: ${radii[2]};
            }
          `}
          useInlineStyles={false}
          $theme={themeKey}
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

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
