import { wrapLinesWithHighlight } from 'components/elements/CodeEditor/CodeEditor'
import Box from 'components/elements/Box'
import React, { useRef } from 'react'
import { highlight } from 'sugar-high'
import { colors } from 'theme'

import { LANGUAGE_MAP } from './language-map'
import { Content } from './content'

const EDITOR_TEXTAREA_STYLE = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'transparent',
  color: 'transparent',
  resize: 'none',
  border: 'none',
  caretColor: colors.secondary
}

function InteractiveCodeEditor ({ activeLanguage, editable, code, setCode }) {
  const textareaRef = useRef(null)
  const codeRef = useRef(null)
  const langClass = LANGUAGE_MAP[activeLanguage] || 'javascript'

  const handleScroll = () => {
    if (editable && textareaRef.current && codeRef.current) {
      codeRef.current.scrollTop = textareaRef.current.scrollTop
      codeRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <Box
      css={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      role='group'
      aria-label='Code editor'
      id='tabpanel-code'
      aria-labelledby='view-button-code'
      aria-describedby='code-editor-help'
    >
      <Content
        as='pre'
        ref={codeRef}
        role='presentation'
        aria-hidden={editable}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          pointerEvents: editable ? 'none' : 'auto',
          overflow: 'auto'
        }}
      >
        <code
          className={`language-${langClass}`}
          dangerouslySetInnerHTML={{
            __html: wrapLinesWithHighlight(highlight(code))
          }}
        />
      </Content>

      {editable && (
        <Content
          forwardedAs='textarea'
          ref={textareaRef}
          value={code}
          onChange={e => setCode && setCode(e.target.value)}
          onScroll={handleScroll}
          aria-label='Edit code'
          aria-describedby='code-editor-help'
          css={`
            outline: none;

            &:focus-visible {
              outline: 2px solid ${colors.secondary};
              outline-offset: -2px;
            }
          `}
          style={EDITOR_TEXTAREA_STYLE}
          spellCheck={false}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
        />
      )}
      {editable && (
        <span id='code-editor-help' style={{ display: 'none' }}>
          Use Tab to indent, Shift+Tab to outdent. Press Ctrl+Enter to execute
          code.
        </span>
      )}
    </Box>
  )
}

export default InteractiveCodeEditor
