import React from 'react'
import { theme, touchTargets } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { highlightSource } from 'components/elements/CodeEditor/highlight-source'
import { getLanguageTheme } from 'components/elements/CodeEditor/theme'

export const Kbd = ({ children }) => (
  <Text
    as='kbd'
    css={theme({
      fontFamily: 'mono',
      fontSize: 0,
      border: 1,
      borderColor: 'gray4',
      borderRadius: 2,
      px: 2,
      py: '2px',
      mx: 1
    })}
  >
    {children}
  </Text>
)

export const SyntaxHighlight = ({ children, language = 'json' }) => (
  <Box
    as='pre'
    css={[
      theme({
        m: 0,
        p: 3,
        fontFamily: 'mono',
        fontSize: 0,
        lineHeight: 2,
        overflow: 'auto',
        height: '100%',
        color: 'black'
      }),
      getLanguageTheme(language)
    ]}
    dangerouslySetInnerHTML={{
      __html: highlightSource(String(children), language)
    }}
  />
)

export const Centered = ({ children }) => (
  <Flex
    css={theme({
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      color: 'black60',
      textAlign: 'center'
    })}
  >
    {children}
  </Flex>
)

export const LogRow = ({ type, children }) => {
  const tone = type === 'error' ? 'red' : type === 'warn' ? 'orange' : 'blue'
  return (
    <Flex
      css={theme({
        alignItems: 'flex-start',
        gap: 2,
        py: 2,
        px: 3,
        borderBottom: 1,
        borderBottomColor: 'black05',
        color: `${tone}8`
      })}
    >
      <Text
        as='span'
        css={theme({
          fontFamily: 'mono',
          fontSize: 0,
          fontWeight: 'bold',
          minWidth: '48px'
        })}
      >
        {type}
      </Text>
      <Text
        as='span'
        css={theme({
          fontFamily: 'mono',
          fontSize: 0,
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere'
        })}
      >
        {children}
      </Text>
    </Flex>
  )
}

export const ResultTabs = ({ tabs, active, onChange }) => {
  const onKeyDown = event => {
    const index = tabs.findIndex(tab => tab.id === active)
    const last = tabs.length - 1
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onChange(tabs[index === last ? 0 : index + 1].id)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onChange(tabs[index === 0 ? last : index - 1].id)
    }
  }

  return (
    <Flex
      as='div'
      role='tablist'
      aria-label='Result'
      onKeyDown={onKeyDown}
      css={theme({ alignItems: 'center', gap: 1, minWidth: 0 })}
    >
      {tabs.map(tab => {
        const selected = tab.id === active
        return (
          <Box
            as='button'
            key={tab.id}
            type='button'
            role='tab'
            id={`${tab.id}-tab`}
            aria-selected={selected}
            aria-controls={`${tab.id}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            css={theme({
              appearance: 'none',
              bg: 'transparent',
              border: 0,
              color: selected ? 'black' : 'black50',
              fontFamily: 'sans',
              fontSize: 0,
              fontWeight: selected ? 'bold' : 'normal',
              py: 2,
              px: 2,
              minHeight: [touchTargets.minHeight, '32px', '32px', '32px'],
              cursor: 'pointer',
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'link'
              }
            })}
          >
            {tab.label}
          </Box>
        )
      })}
    </Flex>
  )
}

export const toPayload = value => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const { response, ...payload } = value
    return payload
  }
  return value
}

export const toHeadersObject = headers => {
  if (!headers) return {}
  const entries =
    typeof headers.forEach === 'function'
      ? Array.from(headers)
      : Object.entries(headers)
  return Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b)))
}

export const statusFromValue = (value, http) => {
  if (http) return http
  if (!value || typeof value !== 'object') return {}
  return {
    statusCode: value.statusCode || value.response?.statusCode,
    headers: toHeadersObject(value.response?.headers || value.headers)
  }
}

export const countLogs = logs =>
  Object.values(logs || {}).reduce((total, items) => total + items.length, 0)

export const LOG_ORDER = ['log', 'debug', 'info', 'warn', 'error']
