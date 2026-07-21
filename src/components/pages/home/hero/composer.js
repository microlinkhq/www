import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Spinner from 'components/elements/Spinner'
import { blink } from 'components/keyframes'
import { escText } from 'helpers/link-card'
import { transition, theme, colors } from 'theme'
import { rgba } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import { GRADIENT, GlyphBadge, VertGlyph, reduceMotion } from './primitives'
import { VerticalMenu } from './vertical-menu'

const composerFocus = css`
  ${theme({
    borderColor: rgba(colors.grape7, 0.45),
    boxShadow: `0 0 6px 3px ${rgba(colors.grape7, 0.14)}`
  })};
`

const Composer = styled.div`
  transition: border-color ${transition.short}, box-shadow ${transition.short};
  ${theme({
    position: 'relative',
    zIndex: 20,
    width: '100%',
    maxWidth: '680px',
    mt: '38px',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: '18px',
    p: '6px',
    boxShadow: `0 0 6px 0 ${rgba(colors.grape7, 0)}`,
    textAlign: 'left'
  })};

  &:has([contenteditable='true']:focus) {
    ${composerFocus}
  }

  ${reduceMotion} {
    transition: none;
  }
`

const ComposerEditor = styled.div`
  outline: none;
  cursor: text;
  scrollbar-width: none;
  ${theme({
    width: '100%',
    fontFamily: 'sans',
    fontSize: '18px',
    color: 'black',
    pt: '18px',
    px: '18px',
    pb: '10px',
    whiteSpace: 'pre',
    overflowX: 'auto',
    overflowY: 'hidden'
  })};

  &::-webkit-scrollbar {
    display: none;
  }

  &:empty::before {
    content: attr(data-placeholder);
    ${theme({ color: 'gray4' })};
  }

  [data-url-tag] {
    text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      color: 'secondary',
      fontFamily: 'mono',
      fontWeight: 'normal',
      px: '4px'
    })};
  }

  [data-url-action] {
    cursor: pointer;
    ${theme({
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      width: '16px',
      height: '16px',
      color: 'inherit'
    })};
  }

  [data-url-tag]:hover [data-url-action] {
    display: inline-flex;
  }

  [data-caret] {
    animation: ${blink} 1s cubic-bezier(1, 0, 0, 1) infinite;
    ${theme({
      display: 'inline-block',
      width: '2px',
      height: '1.05em',
      ml: '1px',
      verticalAlign: 'text-bottom',
      borderRadius: '1px',
      bg: 'secondary'
    })};
  }

  ${reduceMotion} {
    [data-caret] {
      animation: none;
      opacity: 1;
    }
  }
`

const CLOSE_ICON_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'

const composerHtml = (segments, { caret }) => {
  let html = ''
  if (segments.before) html += escText(segments.before)
  if (segments.url) {
    html +=
      '<span data-url-tag contenteditable="false">' +
      escText(segments.url) +
      '<span data-url-action role="button" tabindex="-1" aria-label="Remove URL">' +
      CLOSE_ICON_SVG +
      '</span>' +
      '</span>'
  }
  if (segments.after) html += escText(segments.after)
  if (caret) html += '<span data-caret aria-hidden="true"></span>'
  return html
}

export const readComposerText = el =>
  (el.textContent || '').replace(/\u00a0/g, ' ').replace(/[\r\n]+/g, ' ')

const onEditorPaste = e => {
  e.preventDefault()
  const text = (e.clipboardData?.getData('text/plain') || '').replace(
    /[\r\n]+/g,
    ' '
  )
  document.execCommand('insertText', false, text)
}

export const getCaretOffset = el => {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return null
  const range = sel.getRangeAt(0)
  if (!el.contains(range.endContainer)) return null
  const pre = range.cloneRange()
  pre.selectNodeContents(el)
  pre.setEnd(range.endContainer, range.endOffset)
  return pre.toString().length
}

export const setCaretOffset = (el, offset) => {
  const sel = window.getSelection()
  if (!sel) return
  const range = document.createRange()
  const walker = document.createTreeWalker(el, window.NodeFilter.SHOW_TEXT)
  let remaining = offset
  let placed = false
  let node
  while ((node = walker.nextNode())) {
    const len = node.textContent.length
    if (remaining <= len) {
      const atomic =
        node.parentElement && node.parentElement.closest('[data-url-tag]')
      if (atomic) {
        if (remaining === 0) range.setStartBefore(atomic)
        else range.setStartAfter(atomic)
      } else {
        range.setStart(node, remaining)
      }
      placed = true
      break
    }
    remaining -= len
  }
  if (!placed) range.selectNodeContents(el)
  range.collapse(placed)
  sel.removeAllRanges()
  sel.addRange(range)
}

const VertChip = styled.button`
  cursor: pointer;
  font: inherit;
  color: inherit;
  border: 1px solid ${props => props.$border};
  transition: transform ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    flexShrink: 0,
    textAlign: 'left',
    bg: 'white',
    borderRadius: '10px',
    py: '5px',
    pr: '9px',
    pl: '6px'
  })};

  &:active {
    transform: scale(0.98);
  }
`

const RunButton = styled.button`
  cursor: pointer;
  background: ${GRADIENT};
  transition: transform ${transition.short}, filter ${transition.short};
  ${theme({
    border: 0,
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.06);
    }
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
    transform: none;
    filter: none;
  }
`

export const HeroComposer = ({
  editorRef,
  chipRef,
  menuRef,
  dSegments,
  isFocused,
  dText,
  D,
  menuState,
  menuVisible,
  req,
  canRun,
  onEditorInput,
  onEditorFocus,
  setIsFocused,
  removeUrl,
  handleRun,
  stopTyping,
  toggleMenu,
  onMenuKeyDown,
  pickVertical
}) => (
  <Composer>
    <ComposerEditor
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      role='textbox'
      aria-multiline='false'
      aria-label='Tell Microlink what to do'
      data-placeholder='Tell Microlink what to do…'
      spellCheck={false}
      onInput={onEditorInput}
      onPaste={onEditorPaste}
      onMouseDown={e => {
        if (e.target.closest('[data-url-action]')) e.preventDefault()
      }}
      onClick={e => {
        if (e.target.closest('[data-url-action]')) removeUrl()
      }}
      onFocus={onEditorFocus}
      onBlur={() => setIsFocused(false)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault()
          e.target.blur()
          handleRun()
        }
      }}
      dangerouslySetInnerHTML={{
        __html: composerHtml(dSegments, {
          caret: !isFocused && !!dText
        })
      }}
    />
    <Flex
      css={theme({
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: 2
      })}
    >
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 2,
          minHeight: '34px',
          flex: 1,
          minWidth: 0
        })}
      >
        <VertChip
          ref={chipRef}
          type='button'
          $border={D.vertBorder}
          aria-haspopup='true'
          aria-expanded={menuVisible}
          aria-label={`Product: ${D.label}. Change product`}
          onClick={e => {
            e.stopPropagation()
            stopTyping()
            toggleMenu()
          }}
        >
          <GlyphBadge css={theme({ width: '24px', height: '24px' })}>
            <VertGlyph vertical={D.vertical} size={15} />
          </GlyphBadge>
          <Box
            as='span'
            css={theme({
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black'
            })}
          >
            {D.label}
          </Box>
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke={colors.gray5}
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <g
              css={theme({
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transition: `transform ${transition.short}`,
                transform: menuVisible ? 'rotate(180deg)' : 'none'
              })}
            >
              <path d='m6 9 6 6 6-6' />
            </g>
          </svg>
        </VertChip>
        {menuState && (
          <VerticalMenu
            menuRef={menuRef}
            menuState={menuState}
            onMenuKeyDown={onMenuKeyDown}
            pickVertical={pickVertical}
            D={D}
          />
        )}
      </Flex>
      <RunButton
        type='button'
        aria-label='Run'
        aria-busy={req.status === 'loading'}
        onClick={handleRun}
        disabled={!canRun}
      >
        {req.status === 'loading'
          ? (
            <Spinner
              color='white'
              width='20px'
              height='20px'
              style={{ padding: 0 }}
            />
            )
          : (
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#fff'
              strokeWidth='2.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 12h14M13 6l6 6-6 6' />
            </svg>
            )}
      </RunButton>
    </Flex>
  </Composer>
)
