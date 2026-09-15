import prettyMs from 'pretty-ms'
import React, { useState } from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Spinner from 'components/elements/Spinner'
import Dot from 'components/elements/Dot/Dot'
import JsonView from 'components/elements/JsonView/JsonView'
import { TimingContent } from 'components/pages/home/hero/result-contents'
import { parseServerTiming } from 'helpers/server-timing'

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
  SyntaxHighlight,
  toPayload
} from './results-views'

const TABS = [
  { id: 'output', label: 'Output' },
  { id: 'trace', label: 'Trace' },
  { id: 'timing', label: 'Timing' },
  { id: 'logs', label: 'Logs' }
]

const COPY_ARIA_LABEL = {
  output: 'Copy output',
  trace: 'Copy trace',
  timing: 'Copy timing',
  logs: 'Copy logs'
}

const copyAriaLabel = tab => COPY_ARIA_LABEL[tab] || 'Copy output'

const copyTextForTab = (tab, { trace, timing, logs, payload }) => {
  if (tab === 'trace') {
    return trace ? JSON.stringify(trace, null, 2) : 'No trace'
  }
  if (tab === 'timing') {
    return timing.bars
      .map(row => `${row.name}  ${row.dur} (${row.share})`)
      .join('\n')
  }
  if (tab === 'logs') {
    return LOG_ORDER.flatMap(type =>
      (logs?.[type] || []).map(line => `${type}  ${line}`)
    ).join('\n')
  }
  return JSON.stringify(payload, null, 2)
}

const StatusMark = ({ status, elapsed }) => {
  if (status !== 'success' && status !== 'error') return null
  const ok = status === 'success'
  return (
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        color: ok ? 'teal8' : 'red8',
        fontSize: 0,
        fontWeight: 'bold'
      })}
    >
      {ok ? <Dot.Success /> : <Dot.Error />}
      <Text as='span' css={theme({ color: 'inherit', fontSize: 'inherit' })}>
        {ok ? 'Success' : 'Error'}
        {elapsed != null ? ` ${prettyMs(elapsed)}` : ''}
      </Text>
    </Flex>
  )
}

const jsonPaneCss = theme({
  p: 3,
  minHeight: '100%'
})

const JsonPane = ({ src }) => {
  if (src !== null && typeof src === 'object') {
    return (
      <Box css={jsonPaneCss}>
        <JsonView src={src} />
      </Box>
    )
  }
  return <SyntaxHighlight>{JSON.stringify(src, null, 2)}</SyntaxHighlight>
}

const ResultBody = ({ tab, status, value, logs, trace, timing }) => {
  const payload = toPayload(value)
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

  if (tab === 'output') return <JsonPane src={payload} />

  if (tab === 'trace') {
    if (!trace) return <Centered>No trace</Centered>
    return <JsonPane src={trace} />
  }

  if (tab === 'timing') {
    return <TimingContent bars={timing.bars} maxHeight={null} />
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

const Results = ({
  status,
  value,
  logs,
  trace,
  elapsed,
  onCopy,
  copyLabel
}) => {
  const [tab, setTab] = useState('output')
  const payload = toPayload(value)
  const timing = parseServerTiming(trace?.response?.headers?.['server-timing'])
  const bytes =
    status === 'success' || status === 'error' ? byteLength(payload) : 0
  const copyText = copyTextForTab(tab, { trace, timing, logs, payload })

  return (
    <Pane>
      <PaneBar>
        <ResultTabs tabs={TABS} active={tab} onChange={setTab} />
        {(status === 'success' || status === 'error') && (
          <Flex
            css={theme({
              alignItems: 'center',
              gap: 2,
              ml: 'auto',
              flexShrink: 0
            })}
          >
            <StatusMark status={status} elapsed={elapsed} />
            <IconButton
              aria-label={copyAriaLabel(tab)}
              onClick={() => onCopy(copyText)}
            >
              <IconCopy />
              {copyLabel}
            </IconButton>
          </Flex>
        )}
      </PaneBar>
      <PaneBody>
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
            trace={trace}
            timing={timing}
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
