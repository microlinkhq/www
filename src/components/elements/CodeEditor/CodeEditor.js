import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { hash, prettier, getLines, template } from 'helpers'
import { wordBreak } from 'helpers/style'
import identity from 'lodash/identity'
import styled from 'styled-components'
import range from 'lodash/range'
import { radii } from 'theme'
import React from 'react'
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
  showLineNumbers,
  interactive,
  children,
  theme,
  title,
  ...props
}) => {
  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = toAlias(getLanguage(className, props))
  const pretty = props.prettier ? get(prettier, language, identity) : identity
  const text = pretty(template(children)).trim()
  const prismTheme = prismThemes[theme]
  const id = `codeditor-${hash(children)}`

  const isInteractive =
    interactive &&
    language === 'js' &&
    !text.includes('import') &&
    !text.startsWith('{')

  const TerminalComponent = (
    <Terminal
      title={title}
      theme={theme}
      id={id}
      text={text}
      loading={isInteractive}
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
      title={title}
      placeholderComponent={TerminalComponent}
      code={text}
    />
  )
}

CodeEditor.defaultProps = {
  blinkCursor: false,
  interactive: false,
  prettier: true,
  showLineNumbers: false,
  theme: 'light',
  width: TERMINAL_WIDTH
}

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
