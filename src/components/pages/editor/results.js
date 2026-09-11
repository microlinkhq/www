import React, { useState } from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Spinner from 'components/elements/Spinner'
import Dot from 'components/elements/Dot/Dot'

import { IconCopy } from './icons'
import { IconButton } from './chrome'
import { Pane, PaneBar, PaneBody, PaneFooter } from './pane'
import { byteLength, formatBytes } from './shared'
import {
  Centered,
  countLogs,
  Kbd,
  LOG_ORDER,
  LogRow,
  ResultTabs,
  statusFromValue,
  SyntaxHighlight,
  toPayload
} from './results-views'

const TABS = [
  { id: 'output', label: 'Output' },
  { id: 'http', label: 'HTTP' },
  { id: 'logs', label: 'Logs' }
]

const StatusMark = ({ status, elapsed }) => {
  if (status !== 'success' && status !== 'error') return null
  const ok = status === 'success'
  return (
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        ml: 'auto',
        color: ok ? 'teal8' : 'red8',
        fontSize: 0,
        fontWeight: 'bold'
      })}
    >
      {ok ? <Dot.Success /> : <Dot.Error />}
      <Text as='span' css={theme({ color: 'inherit', fontSize: 'inherit' })}>
        {ok ? 'Success' : 'Error'}
        {elapsed != null ? ` ${elapsed}ms` : ''}
      </Text>
    </Flex>
  )
}

const ResultBody = ({ tab, status, value, logs, http }) => {
  const payload = toPayload(value)
  const { headers } = statusFromValue(value, http)
  const logCount = countLogs(logs)

  if (status === 'idle') {
    return (
      <Centered>
        <Text>
          Press <Kbd>⌘</Kbd> / <Kbd>Ctrl</Kbd> + <Kbd>↩</Kbd> to run
        </Text>
      </Centered>
    )
  }

  if (status === 'running') {
    return (
      <Centered>
        <Spinner aria-label='Running…' />
      </Centered>
    )
  }

  if (tab === 'output') {
    return <SyntaxHighlight>{JSON.stringify(payload, null, 2)}</SyntaxHighlight>
  }

  if (tab === 'http') {
    return (
      <SyntaxHighlight>
        {JSON.stringify(headers || {}, null, 2)}
      </SyntaxHighlight>
    )
  }

  if (logCount === 0) return <Centered>No logs</Centered>

  const seen = {}
  return LOG_ORDER.flatMap(type =>
    (logs?.[type] || []).map(line => {
      const base = `${type}:${line}`
      seen[base] = (seen[base] || 0) + 1
      return (
        <LogRow key={`${base}:${seen[base]}`} type={type}>
          {line}
        </LogRow>
      )
    })
  )
}

const Results = ({ status, value, logs, http, elapsed, onCopy, copyLabel }) => {
  const [tab, setTab] = useState('output')
  const payload = toPayload(value)
  const bytes =
    status === 'success' || status === 'error' ? byteLength(payload) : 0

  return (
    <Pane>
      <PaneBar>
        <ResultTabs tabs={TABS} active={tab} onChange={setTab} />
        <StatusMark status={status} elapsed={elapsed} />
      </PaneBar>
      <PaneBody>
        {(status === 'success' || status === 'error') && (
          <Box
            css={theme({
              position: 'absolute',
              top: 2,
              right: 2,
              zIndex: 1
            })}
          >
            <IconButton
              aria-label='Copy output'
              onClick={() => onCopy(JSON.stringify(payload, null, 2))}
            >
              <IconCopy />
              {copyLabel}
            </IconButton>
          </Box>
        )}
        <Box
          role='tabpanel'
          id={`${tab}-panel`}
          aria-labelledby={`${tab}-tab`}
          css={theme({ height: '100%', overflow: 'auto' })}
        >
          <ResultBody
            tab={tab}
            status={status}
            value={value}
            logs={logs}
            http={http}
          />
        </Box>
      </PaneBody>
      <PaneFooter>
        <Text as='span' css={theme({ fontSize: 0, color: 'black60' })}>
          Raw response
        </Text>
        <Text
          as='span'
          css={theme({
            fontSize: 0,
            color: 'black60',
            fontVariantNumeric: 'tabular-nums'
          })}
        >
          {formatBytes(bytes)}
        </Text>
      </PaneFooter>
    </Pane>
  )
}

export default Results
