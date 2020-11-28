import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { hash, prettier, getLines, template } from 'helpers'
import styled, { css } from 'styled-components'
import { wordBreak } from 'helpers/style'
import React, { useState } from 'react'
import identity from 'lodash/identity'
import CodeCopy from 'react-codecopy'
import range from 'lodash/range'
import get from 'dlv'

import { prismThemes, themes } from './theme'
import { cx } from 'theme'

import Runkit from '../Runkit/Runkit'

import {
  styleTerminalHeader,
  TerminalButton,
  TerminalWindow,
  TERMINAL_WIDTH,
  TERMINAL_HEIGHT,
  TerminalTitle
} from '../Terminal/Terminal'

const generateHighlighLines = linesRange => {
  if (!linesRange) return

  const [start, end] = linesRange
  const collection = end ? range(start, end + 1) : [start]

  return collection.map((line, index) => {
    const isLast = index + 1 === collection.length
    return `code > span:nth-child(${line})${!isLast ? ',' : ''}`
  })
}

const highlighLinesStyle = (highlightLines, prismTheme) => css`
  ${generateHighlighLines(highlightLines)} {
    display: block;
    background: ${prismTheme['.line-highlight'].background};
  }
`

const getLanguage = (className, { language }) => {
  if (language) return language
  const languageFromClassName = className.split('-')[1]
  if (languageFromClassName) return languageFromClassName.split('{')[0]
  return 'js'
}

const getClassName = ({ className, metastring = '' }) =>
  className ? className + metastring : ''

const TERMINAL_HEADER_HEIGHT = '36px'

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
`

const TerminalHeader = styled.header`
  ${styleTerminalHeader};
  height: ${TERMINAL_HEADER_HEIGHT};
  background: ${props => themes[props.theme].background};
  top: 1px;
  z-index: 2;

  .codecopy_button {
    background: ${props => themes[props.theme].background};
    border-color: ${({ theme }) => theme === 'dark' && cx('black80')};
    svg {
      fill: ${({ theme }) =>
        theme === 'light' ? cx('black80') : cx('white80')};
    }
  }
`

const TerminalText = styled.section`
  overflow: visible;
  hyphens: none;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 32px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${props => props.background};
  color: #fff;
  display: flex;
  align-items: center;
  height: inherit;
  align-items: baseline;
  height: calc(100% - ${TERMINAL_HEADER_HEIGHT});

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
`

const TerminalTextWrapper = styled.div`
  ${wordBreak};
  width: 100%;
`

const Terminal = ({
  title = '',
  children,
  theme,
  prismTheme,
  text,
  ActionComponent = CodeCopy,
  ...props
}) => {
  const [isHover, setHover] = useState(false)
  const background = prismTheme['code[class*="language-"]'].background

  return (
    <TerminalWindow
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      {...props}
    >
      <TerminalHeader background={background} theme={theme}>
        <TerminalButton.Red theme={theme} />
        <TerminalButton.Yellow theme={theme} />
        <TerminalButton.Green theme={theme} />
        <TerminalTitle theme={theme}>{title}</TerminalTitle>
        <ActionComponent isHover={isHover} theme={theme} text={text} />
      </TerminalHeader>
      <TerminalText background={background} theme={theme}>
        {children}
      </TerminalText>
    </TerminalWindow>
  )
}

const CodeEditor = props => {
  const {
    ActionComponent,
    showLineNumbers,
    interactive,
    children,
    theme,
    ...restProps
  } = props

  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = getLanguage(className, props)
  const pretty = props.prettier ? get(prettier, language, identity) : identity
  const text = pretty(template(children)).trim()
  const prismTheme = prismThemes[theme]
  const css = highlightLines && highlighLinesStyle(highlightLines, prismTheme)
  const id = `codeditor-${hash(children)}`

  const TerminalComponent = (
    <Terminal
      theme={theme}
      prismTheme={prismTheme}
      id={id}
      text={text}
      ActionComponent={ActionComponent}
      {...restProps}
    >
      <TerminalTextWrapper theme={theme}>
        <CustomSyntaxHighlighter
          lineNumberStyle={{ color: '#6272A4' }}
          showLineNumbers={showLineNumbers}
          language={language}
          style={prismTheme}
          css={css}
        >
          {text}
        </CustomSyntaxHighlighter>
      </TerminalTextWrapper>
    </Terminal>
  )

  if (interactive === false || language !== 'js' || text.includes('import')) {
    return TerminalComponent
  }

  return (
    <Runkit
      title={restProps.title}
      placeholderComponent={TerminalComponent}
      code={text}
    />
  )
}

CodeEditor.defaultProps = {
  interactive: false,
  prettier: true,
  showLineNumbers: false,
  width: TERMINAL_WIDTH,
  theme: 'light'
}

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
