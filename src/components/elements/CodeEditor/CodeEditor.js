import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prettier, getLines, template } from 'helpers'
import styled, { css } from 'styled-components'
import { Text } from 'components/elements'
import { rgba, lighten } from 'polished'
import React, { useState } from 'react'
import identity from 'lodash/identity'
import CodeCopy from 'react-codecopy'
import { colors, fonts } from 'theme'
import range from 'lodash/range'
import get from 'dlv'

import {
  styleTerminalHeader,
  TerminalButton,
  TerminalWindow,
  TERMINAL_WIDTH,
  TERMINAL_HEIGHT
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

const highlighLinesStyle = highlightLines => css`
  ${generateHighlighLines(highlightLines)} {
    display: block;
    background: #464957;
  }
`

const getLanguage = (className, { language }) => {
  if (language) return language
  const languageFromClassName = className.split('-')[1]
  if (languageFromClassName) return languageFromClassName.split('{')[0]
  return 'javascript'
}

const getClassName = ({ className, metastring = '' }) =>
  className ? className + metastring : ''

export const COLORS = {
  PINK: colors.pink5,
  VIOLET: colors.grape4,
  WHITE: colors.white80,
  GRAY: colors.gray6,
  ORANGE: colors.orange4,
  YELLOW: colors.yellow2,
  RED: colors.red7,
  BACKGROUND: 'rgb(40, 42, 54)'
}

const TERMINAL_HEADER_HEIGHT = '36px'

const codeTheme = {
  textShadow: '0 1px rgba(0, 0, 0, 0.3)',
  fontFamily: fonts.mono,
  direction: 'ltr',
  textAlign: 'left',
  whiteSpace: 'pre',
  wordSpacing: 'normal',
  wordBreak: 'normal',
  lineHeight: '1.5',
  MozTabSize: '2',
  OTabSize: '2',
  tabSize: '2',
  WebkitHyphens: 'none',
  MozHyphens: 'none',
  msHyphens: 'none',
  hyphens: 'none'
}

const langTheme = {
  markdown: {
    'code[class*="language-"]': {
      ...codeTheme,
      color: COLORS.WHITE
    }
  },
  html: {
    'code[class*="language-"]': {
      ...codeTheme,
      color: COLORS.WHITE
    },
    doctype: { color: COLORS.GRAY },
    token: { color: COLORS.ORANGE }
  },
  bash: {
    'code[class*="language-"]': {
      ...codeTheme,
      color: COLORS.YELLOW
    },
    function: { color: COLORS.YELLOW },
    token: { color: COLORS.YELLOW },
    operator: { color: COLORS.YELLOW },
    keyword: { color: COLORS.YELLOW },
    variable: { color: COLORS.YELLOW },
    comment: { color: COLORS.YELLOW },
    number: { color: COLORS.YELLOW }
  },
  json: {
    'code[class*="language-"]': {
      ...codeTheme,
      color: COLORS.YELLOW
    },
    function: { color: COLORS.YELLOW },
    token: { color: COLORS.YELLOW },
    operator: { color: COLORS.YELLOW },
    keyword: { color: COLORS.YELLOW },
    property: { color: COLORS.PINK },
    number: { color: COLORS.VIOLET }
  }
}

const baseTheme = {
  'code[class*="language-"]': {
    ...codeTheme,
    color: COLORS.PINK
  },
  'pre[class*="language-"]': {
    ...codeTheme,
    margin: '.5em 8px',
    borderRadius: '0.3em',
    height: 'calc(100% - 18px)'
  },
  ':not(pre) > code[class*="language-"]': {
    background: COLORS.BACKGROUND,
    padding: '.1em',
    borderRadius: '.3em'
  },
  'attr-name': { color: COLORS.ORANGE },
  comment: { color: 'rgba(101, 107, 128, 0.8)' },
  string: { color: COLORS.YELLOW },
  url: { color: COLORS.YELLOW },
  variable: { color: 'rgb(214, 222, 235)' },
  number: { color: COLORS.ORANGE },
  builtin: { color: COLORS.VIOLET },
  char: { color: COLORS.VIOLET },
  constant: { color: COLORS.VIOLET },
  'attr-value': { color: COLORS.YELLOW },
  punctuation: { color: COLORS.GRAY },
  selector: { color: COLORS.VIOLET, fontStyle: "'italic'" },
  doctype: { color: COLORS.VIOLET, fontStyle: "'italic'" },
  class_name: { color: 'rgb(255, 203, 139)' },
  function: { color: COLORS.PINK },
  tag: { color: COLORS.PINK },
  operator: { color: COLORS.PINK },
  keyword: { color: COLORS.VIOLET },
  boolean: { color: COLORS.RED },
  property: { color: 'rgb(128, 203, 196)' },
  namespace: { color: 'rgb(178, 204, 214)' }
}

const CustomSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding: 0;
  margin: 0;
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
  background: ${COLORS.BACKGROUND};
  top: 1px;
  z-index: 2;

  .codecopy_wrapper {
    top: 15px;
  }
`

const TerminalTitleWrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: -3rem;
`

const TerminalText = styled.section`
  overflow: visible;
  font-family: ${fonts.mono};
  font-size: 13px;
  font-weight: normal;
  line-height: 20px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${COLORS.BACKGROUND};
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
  word-break: break-all;
  width: 100%;
`

const Terminal = ({
  title = '',
  children,
  theme,
  interactive,
  toCopy,
  ActionComponent = CodeCopy,
  ...props
}) => {
  const [isHover, setHover] = useState(interactive)

  return (
    <TerminalWindow
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      {...props}
    >
      <TerminalHeader>
        <TerminalButton.Red theme={theme} />
        <TerminalButton.Yellow theme={theme} />
        <TerminalButton.Green theme={theme} />
        <TerminalTitleWrapper>
          <Text
            color={rgba(lighten(0.4, COLORS.BACKGROUND), 0.8)}
            fontSize={0}
            children={title}
          />
        </TerminalTitleWrapper>
        <ActionComponent isHover={isHover} theme={theme} toCopy={toCopy} />
      </TerminalHeader>
      <TerminalText children={children} />
    </TerminalWindow>
  )
}

Terminal.defaultProps = {
  interactive: false,
  theme: 'dark'
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
  const css = highlightLines && highlighLinesStyle(highlightLines)

  return (
    <Terminal
      interactive={interactive}
      toCopy={text}
      ActionComponent={ActionComponent}
      {...restProps}
    >
      <TerminalTextWrapper theme={theme}>
        <CustomSyntaxHighlighter
          lineNumberStyle={{ color: '#6272A4' }}
          showLineNumbers={showLineNumbers}
          language={language}
          style={{ ...baseTheme, ...langTheme[language] }}
          wrapLines
          children={text}
          css={css}
        />
      </TerminalTextWrapper>
    </Terminal>
  )
}

CodeEditor.defaultProps = {
  interactive: false,
  prettier: true,
  showLineNumbers: false,
  width: TERMINAL_WIDTH,
  theme: 'dark'
}

CodeEditor.colors = COLORS
CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
