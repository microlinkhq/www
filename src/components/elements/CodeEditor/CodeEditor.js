import { cx, radii, theme, fontSizes, lineHeights } from 'theme'
import { hideScrollbar, wordBreak } from 'helpers/style'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getLines } from 'helpers/get-lines'
import { childrenTextAll } from 'helpers/children-text-all'
import { prettier } from 'helpers/prettier'
import { template } from 'helpers/template'
import { highlight } from 'sugar-high'
import { hash } from 'helpers/hash'
import range from 'lodash/range'

import { getLanguageTheme } from './theme'

import {
  blinkCursorCodeLayoutStyle,
  blinkCursorStyle
} from '../Terminal/blink-cursor'
import Terminal, { TERMINAL_WIDTH, TERMINAL_HEIGHT } from '../Terminal/Terminal'

const toAlias = (lang = '') => {
  lang = lang.toLowerCase()
  switch (lang) {
    case 'vanilla':
      return 'html'
    case 'react':
    case 'angular':
      return 'jsx'
    case 'vue':
    case 'svelte':
      return 'html'
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
  return collection.map(line => `.line-${line}`)
}

const getClassName = ({ className, metastring = '' }) =>
  className ? className + metastring : ''

const STRIP_HTML_TAGS_REGEX = /<[^>]+>/g
const HTML_COMMENT_START_REGEX = /^\s*<!/
const HTML_COMMENT_ENTITY_START_REGEX = /^\s*&lt;!/

const applyBashCommentLineClass = line => {
  const isBashCommentLine =
    /^<span class="sh__line">(?:\s|<span[^>]*>)*<span class="sh__token--sign"[^>]*>#<\/span>/.test(
      line
    )

  if (!isBashCommentLine) return line

  return line.replace(
    'class="sh__line"',
    'class="sh__line sh__token--bash-comment"'
  )
}

const applyBashInlineCommentClass = line => {
  if (line.includes('sh__line sh__token--bash-comment')) return line
  if (!line.includes('sh__token--sign')) return line
  if (line.includes('sh__token--bash-comment')) return line

  return line.replace(
    /(<span class="sh__token--sign"[^>]*>#<\/span>)(.*)$/,
    '<span class="sh__token--comment sh__token--bash-comment">$1$2</span>'
  )
}

const applyHtmlCommentLineClass = line => {
  const text = line.replace(STRIP_HTML_TAGS_REGEX, '')
  const isHtmlComment =
    HTML_COMMENT_START_REGEX.test(text) ||
    HTML_COMMENT_ENTITY_START_REGEX.test(text)
  if (!isHtmlComment) return line

  return line.replace(
    'class="sh__line"',
    'class="sh__line sh__token--html-comment"'
  )
}

const CustomCodeBlock = styled.pre`
  ${hideScrollbar};

  margin: 0;
  padding: 0;
  overflow: auto;
  position: relative;
  background: ${props => (props.$theme === 'dark' ? cx('black') : cx('white'))};
  color: ${props => (props.$theme === 'dark' ? cx('white') : cx('black'))};

  ${props =>
    props.$blinkCursor &&
    theme({ display: 'inline', m: 0, verticalAlign: 'top' })}

  code {
    ${props =>
      theme({
        display: props.$blinkCursor ? 'inline' : 'block',
        whiteSpace: 'pre',
        overflowX: 'auto',
        pl: props.$showLineNumbers ? '3rem' : 0,
        fontFamily: 'mono',
        fontSize: 0,
        lineHeight: props.$language === 'bash' ? 0 : 4
      })}
    tab-size: 2;
  }

  .code-line {
    ${props =>
      theme({
        display: props.$blinkCursor ? 'inline' : 'inline-block',
        width: props.$blinkCursor ? 'auto' : '100%',
        mb: 1
      })}
  }

  .line-numbers {
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    padding: 0;
    margin: 0;
    color: ${props =>
      props.$theme === 'dark' ? cx('white50') : cx('black50')};
    background: ${props =>
      props.$theme === 'dark' ? cx('black') : cx('white')};
    border-right: 1px solid
      ${props => (props.$theme === 'dark' ? cx('white10') : cx('black10'))};
    text-align: right;
    padding-right: 0.5rem;
    font-size: ${fontSizes[0]};
    line-height: ${lineHeights[2]};
    user-select: none;
    pointer-events: none;
  }
`

export const Code = ({
  children,
  highlightLines,
  highLightLinesSelector,
  showLineNumbers,
  firstHighlightLine,
  lastHighlightLine,
  language,
  blinkCursor = false
}) => {
  let highlightedHtml = highlight(children)

  if (language === 'bash') {
    highlightedHtml = highlightedHtml
      .split('\n')
      .map(line => {
        line = line.replace(
          /class="sh__token--identifier"/,
          'class="sh__token--identifier sh__token--bash-command"'
        )

        line = applyBashCommentLineClass(line)
        line = applyBashInlineCommentClass(line)

        return line
      })
      .join('\n')
  }

  if (language === 'html') {
    highlightedHtml = highlightedHtml
      .split('\n')
      .map(line => applyHtmlCommentLineClass(line))
      .join('\n')
  }

  const textHtml = wrapLinesWithHighlight(highlightedHtml, highlightLines)

  return (
    <CustomCodeBlock
      $blinkCursor={blinkCursor}
      $language={language}
      css={`
        ${String(highLightLinesSelector)} {
          background: ${cx('black05')};
        }
        ${String(firstHighlightLine)} {
          border-top-left-radius: ${radii[2]};
          border-top-right-radius: ${radii[2]};
        }
        ${String(lastHighlightLine)} {
          border-bottom-left-radius: ${radii[2]};
          border-bottom-right-radius: ${radii[2]};
        }
        ${getLanguageTheme(language) || ''}
      `}
    >
      {showLineNumbers && (
        <pre className='line-numbers'>{generateLineNumbers(children)}</pre>
      )}
      <code dangerouslySetInnerHTML={{ __html: textHtml }} />
    </CustomCodeBlock>
  )
}

const generateLineNumbers = text => {
  const lines = text.split('\n')
  return lines.map((_, index) => index + 1).join('\n')
}

export const wrapLinesWithHighlight = (highlightedHtml, highlightLines) => {
  const lines = highlightedHtml.split('\n')

  if (!highlightLines) {
    // No highlighting, but still wrap each line for consistent spacing
    return lines
      .map((line, index) => `<span class="code-line">${line}</span>`)
      .join('\n')
  }

  const [start, end] = highlightLines
  const highlightStart = start - 1 // Convert to 0-based index
  const highlightEnd = end ? end - 1 : highlightStart

  return lines
    .map((line, index) => {
      const isHighlighted = index >= highlightStart && index <= highlightEnd
      if (isHighlighted) {
        return `<span class="code-line line-${index + 1}">${line}</span>`
      }
      return `<span class="code-line">${line}</span>`
    })
    .join('\n')
}

const TerminalTextWrapper = styled('div')`
  ${wordBreak};
  width: 100%;
  font-size: 14px;
  white-space: pre;

  ${props => props.$blinkCursor && blinkCursorCodeLayoutStyle}
  ${props => props.$blinkCursor && blinkCursorStyle}
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
  showLineNumbers = false,
  language: languageProp,
  title = '',
  blinkCursor,
  autoHeight = false,
  ...props
}) => {
  const className = getClassName(props)
  const highlightLines = getLines(className)
  const language = toAlias(
    getLanguage({ className, language: languageProp, title })
  )

  const source = childrenTextAll(children)
  const initialText = template(source).trim()
  const [text, setText] = useState(initialText)

  useEffect(() => {
    const formatCode = async () => {
      const formatted = await prettier(template(source), language)
      setText(formatted.trim())
    }
    formatCode()
  }, [source, language])

  const highLightLinesSelector = generateHighlightLines(highlightLines)
  const firstHighlightLine = highLightLinesSelector && highLightLinesSelector[0]
  const lastHighlightLine =
    highLightLinesSelector &&
    highLightLinesSelector[highLightLinesSelector.length - 1]

  const showBlinkCursor =
    blinkCursor === true ||
    (blinkCursor !== false &&
      ['bash', 'shell', 'sh'].includes(language) &&
      !text.includes('\n'))

  return (
    <Terminal
      id={`codeditor-${hash(source)}`}
      title={title}
      text={text}
      autoHeight={autoHeight}
      css={theme(
        autoHeight
          ? { width: '100%', maxWidth: '100%' }
          : { width: TERMINAL_WIDTH }
      )}
      blinkCursor={false}
      {...props}
    >
      <TerminalTextWrapper $blinkCursor={showBlinkCursor}>
        <Code
          blinkCursor={showBlinkCursor}
          firstHighlightLine={firstHighlightLine}
          highlightLines={highlightLines}
          highLightLinesSelector={highLightLinesSelector}
          language={language}
          lastHighlightLine={lastHighlightLine}
          showLineNumbers={showLineNumbers}
        >
          {text}
        </Code>
      </TerminalTextWrapper>
    </Terminal>
  )
}

CodeEditor.width = TERMINAL_WIDTH
CodeEditor.height = TERMINAL_HEIGHT

export default CodeEditor
