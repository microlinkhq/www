import React from 'react'
import styled from 'styled-components'
import { borders, colors, theme, transition } from 'theme'
import { ACCENT } from '../shared'

const JsonExpandToggle = styled('button')`
  ${theme({
    m: 0,
    p: 0,
    bg: 'transparent',
    color: 'black40',
    fontFamily: 'mono',
    fontSize: 'inherit',
    lineHeight: 'inherit'
  })};
  border: none;
  cursor: pointer;
  vertical-align: baseline;
  transition: color ${transition.short};

  &:hover,
  &:focus-visible {
    color: ${ACCENT};
  }

  &:focus-visible {
    outline: ${borders[1]} ${colors.black20};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const STRING_TRUNCATE_AT = 64

const URL_REGEX = /^https?:\/\/\S+$/i

const renderStringContent = value => {
  if (URL_REGEX.test(value)) {
    return (
      <a href={value} target='_blank' rel='noopener noreferrer'>
        {value}
      </a>
    )
  }
  return value
}

const renderJson = (value, path = 'root', expanded, onToggle, indent = 0) => {
  const pad = '  '.repeat(indent)
  const padInner = '  '.repeat(indent + 1)

  if (value === null) return <span className='json-null'>null</span>
  if (typeof value === 'boolean') {
    return <span className='json-boolean'>{String(value)}</span>
  }
  if (typeof value === 'number') {
    return <span className='json-number'>{value}</span>
  }
  if (typeof value === 'string') {
    const isUrl = URL_REGEX.test(value)
    const isLong = !isUrl && value.length > STRING_TRUNCATE_AT
    const isOpen = expanded.has(path)
    if (!isLong || isOpen) {
      return (
        <>
          <span className='json-string'>"{renderStringContent(value)}"</span>
          {isLong && (
            <>
              {' '}
              <JsonExpandToggle
                type='button'
                aria-label='Collapse value'
                onClick={() => onToggle(path)}
              >
                [collapse]
              </JsonExpandToggle>
            </>
          )}
        </>
      )
    }
    const truncated = value.slice(0, STRING_TRUNCATE_AT).trimEnd()
    return (
      <>
        <span className='json-string'>"{truncated}</span>
        <JsonExpandToggle
          type='button'
          aria-label='Expand value'
          title={`${value.length - truncated.length} more characters`}
          onClick={() => onToggle(path)}
        >
          …
        </JsonExpandToggle>
        <span className='json-string'>"</span>
      </>
    )
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className='json-punct'>[]</span>
    return (
      <>
        <span className='json-punct'>[</span>
        {'\n'}
        {value.map((item, i) => (
          <React.Fragment key={`${path}.${i}`}>
            {padInner}
            {renderJson(item, `${path}.${i}`, expanded, onToggle, indent + 1)}
            {i < value.length - 1 && <span className='json-punct'>,</span>}
            {'\n'}
          </React.Fragment>
        ))}
        {pad}
        <span className='json-punct'>]</span>
      </>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) return <span className='json-punct'>{'{}'}</span>
    return (
      <>
        <span className='json-punct'>{'{'}</span>
        {'\n'}
        {entries.map(([k, v], i) => (
          <React.Fragment key={k}>
            {padInner}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            {renderJson(v, `${path}.${k}`, expanded, onToggle, indent + 1)}
            {i < entries.length - 1 && <span className='json-punct'>,</span>}
            {'\n'}
          </React.Fragment>
        ))}
        {pad}
        <span className='json-punct'>{'}'}</span>
      </>
    )
  }

  return String(value)
}

export const flattenToLines = (value, expanded, onToggle) => {
  const lines = []
  const indentStr = depth => '  '.repeat(depth)

  const renderLeaf = (v, path) => renderJson(v, path, expanded, onToggle, 0)

  const pushValue = (v, path, depth, trailingComma) => {
    const pad = indentStr(depth)
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const entries = Object.entries(v)
      if (entries.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-punct'>{'{}'}</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'{'}</span>
        </>
      )
      entries.forEach(([k, child], i) => {
        pushEntry(k, child, `${path}.${k}`, depth + 1, i < entries.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'}'}</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-punct'>[]</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-punct'>[</span>
        </>
      )
      v.forEach((child, i) => {
        pushValue(child, `${path}.${i}`, depth + 1, i < v.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>]</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    lines.push(
      <>
        {pad}
        {renderLeaf(v, path)}
        {trailingComma && <span className='json-punct'>,</span>}
      </>
    )
  }

  const pushEntry = (k, v, path, depth, trailingComma) => {
    const pad = indentStr(depth)
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const entries = Object.entries(v)
      if (entries.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            <span className='json-punct'>{'{}'}</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-key'>"{k}"</span>
          <span className='json-punct'>: </span>
          <span className='json-punct'>{'{'}</span>
        </>
      )
      entries.forEach(([ck, cv], i) => {
        pushEntry(ck, cv, `${path}.${ck}`, depth + 1, i < entries.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'}'}</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            <span className='json-punct'>[]</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-key'>"{k}"</span>
          <span className='json-punct'>: </span>
          <span className='json-punct'>[</span>
        </>
      )
      v.forEach((child, i) => {
        pushValue(child, `${path}.${i}`, depth + 1, i < v.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>]</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    lines.push(
      <>
        {pad}
        <span className='json-key'>"{k}"</span>
        <span className='json-punct'>: </span>
        {renderLeaf(v, path)}
        {trailingComma && <span className='json-punct'>,</span>}
      </>
    )
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const entries = Object.entries(value)
    lines.push(<span className='json-punct'>{'{'}</span>)
    entries.forEach(([k, v], i) => {
      pushEntry(k, v, `root.${k}`, 1, i < entries.length - 1)
    })
    lines.push(<span className='json-punct'>{'}'}</span>)
  }

  return lines
}
