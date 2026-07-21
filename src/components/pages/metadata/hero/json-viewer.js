import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { colors, theme } from 'theme'
import { ACCENT } from '../shared'
import { flattenToLines } from './json-lines'
import { useRevealLines } from './use-reveal-lines'

const JsonPre = styled('pre')`
  ${theme({
    m: 0,
    fontFamily: 'mono',
    fontSize: ['12px', '13px', '13px', '13px'],
    lineHeight: 2,
    color: 'black80'
  })};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  min-width: 0;
  tab-size: 2;

  .json-punct {
    color: ${colors.black40};
  }
  .json-key {
    color: ${colors.black};
    font-weight: 600;
  }
  .json-string {
    color: ${colors.black};
  }
  .json-string a {
    color: ${ACCENT};
    text-decoration: none;
    text-underline-offset: 2px;
  }
  .json-string a:hover,
  .json-string a:focus-visible {
    text-decoration: underline;
    text-decoration-color: ${ACCENT};
  }
  .json-number {
    color: ${colors.grape7};
  }
  .json-boolean {
    color: ${colors.orange7};
    font-weight: 600;
  }
  .json-null {
    color: ${colors.black40};
    font-style: italic;
  }
`

const jsonCaret = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const JsonCaret = styled('span')`
  ${theme({ display: 'inline-block', color: 'black60' })};
  width: 0.5em;
  animation: ${jsonCaret} 0.9s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const HERO_JSON_KEY_ORDER = [
  'title',
  'description',
  'lang',
  'author',
  'publisher',
  'date',
  'url',
  'image',
  'logo',
  'video',
  'audio',
  'iframe',
  'palette'
]

const compactMedia = value => {
  if (!value || typeof value !== 'object') return value
  const { url, type, width, height, size_pretty: sizePretty } = value
  const compact = { url }
  if (type) compact.type = type
  if (width) compact.width = width
  if (height) compact.height = height
  if (sizePretty) compact.size_pretty = sizePretty
  return compact
}

const reshapeForHero = data => {
  if (!data) return null
  const shaped = {}
  for (const key of HERO_JSON_KEY_ORDER) {
    if (data[key] == null) continue
    if (['image', 'logo', 'video', 'audio'].includes(key)) {
      shaped[key] = compactMedia(data[key])
    } else if (key === 'iframe') {
      shaped[key] =
        typeof data[key] === 'object' && data[key].html
          ? { html: '…' }
          : data[key]
    } else {
      shaped[key] = data[key]
    }
  }
  for (const key of Object.keys(data)) {
    if (shaped[key] === undefined && data[key] != null) {
      shaped[key] = data[key]
    }
  }
  return shaped
}

const StreamedJsonObject = ({ value, expanded, onToggle }) => {
  const lines = value ? flattenToLines(value, expanded, onToggle) : []
  const signature = value
    ? `${Object.keys(value).length}:${Object.keys(value).join(',')}:${
      value.url || value.title || ''
    }`
    : ''
  const revealed = useRevealLines(lines.length, signature)
  const isStreaming = revealed < lines.length
  const visible = lines.slice(0, revealed)

  return (
    <JsonPre aria-label='Metadata JSON response'>
      {visible.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {'\n'}
        </React.Fragment>
      ))}
      {isStreaming && <JsonCaret aria-hidden='true'>▍</JsonCaret>}
    </JsonPre>
  )
}

export const JsonPreview = ({ data }) => {
  const shaped = reshapeForHero(data)
  const [expanded, setExpanded] = useState(() => new Set())
  const onToggle = useCallback(path => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  return (
    <StreamedJsonObject
      value={shaped}
      expanded={expanded}
      onToggle={onToggle}
    />
  )
}
