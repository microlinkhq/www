import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Output, { PANEL_HEIGHT } from 'components/pages/home/output'
import { SEARCH_EXAMPLE } from 'components/pages/home/catalog'
import { trackEvent } from 'helpers/plausible'
import { transition, theme } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { Copy as CopyIcon, Check as CheckIcon } from 'react-feather'

import { CODE_TAB, INSTALL_COMMENT } from './constants'
import { JsonView } from './json-view'
import { GRADIENT, Mono, SYNTAX, fadeIn, reduceMotion } from './primitives'
import {
  CodeContent,
  ErrorContent,
  HeadersContent,
  RateLimitedContent,
  TimingContent
} from './result-contents'
import { RESULT_TABS, ResultTabs } from './tab-bar'
import { useTabIndicator } from './use-tab-indicator'

const skeletonPulse = keyframes`
  0%, 100% { opacity: 1 }
  50% { opacity: 0.45 }
`

const loadingSlide = keyframes`
  0% { transform: translateX(-100%) }
  100% { transform: translateX(400%) }
`

const Panel = styled.div`
  ${theme({
    position: 'relative',
    width: '100%',
    maxWidth: '980px',
    mt: '14px',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    overflow: 'hidden',
    bg: 'white',
    textAlign: 'left',
    boxShadow: '0 24px 60px -40px rgba(40, 10, 60, 0.35)'
  })};
`

const TabContent = styled.div`
  animation: ${fadeIn} ${transition.short};
  ${theme({ minHeight: [null, null, PANEL_HEIGHT, PANEL_HEIGHT] })};

  ${reduceMotion} {
    animation: none;
  }
`

const LoadingBar = styled.span`
  background: ${GRADIENT};
  animation: ${loadingSlide} 1s ease-in-out infinite;
  ${theme({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '2px',
    width: '25%'
  })};
  ${reduceMotion} {
    animation: none;
    width: 100%;
    opacity: 0.4;
  }
`

const SkeletonLine = styled.span`
  animation: ${skeletonPulse} 1.2s ease-in-out infinite;
  ${theme({
    display: 'block',
    height: '12px',
    borderRadius: 3,
    bg: 'gray1'
  })};
  ${reduceMotion} {
    animation: none;
  }
`

const Skeleton = () => (
  <Box css={theme({ p: '22px' })}>
    {[92, 64, 78, 54, 70, 48, 60].map((w, i) => (
      <SkeletonLine
        key={w}
        css={theme({ mb: 3, width: `${w}%`, animationDelay: `${i * 90}ms` })}
      />
    ))}
  </Box>
)

const jsValueText = value => {
  if (typeof value === 'string') {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  }
  if (typeof value !== 'object' || value === null) return String(value)
  return `{ ${Object.entries(value)
    .map(([k, v]) => `${k}: ${jsValueText(v)}`)
    .join(', ')} }`
}

const snippetText = (snippet, arg) => {
  const call = snippet.code
    ? `(\n  '${arg}',\n  ${snippet.code}\n)`
    : `('${arg}'${snippet.opts ? `, ${jsValueText(snippet.opts)}` : ''})`
  return [
    INSTALL_COMMENT,
    "import createClient from 'microlink.io'",
    '',
    'const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })',
    '',
    `const ${snippet.binding} = await microlink.${snippet.method}${call}`,
    '',
    `// ${snippet.comment}`,
    `console.log(${snippet.log})`
  ].join('\n')
}

const copyBody = (req, tab, snippet, snippetArg) => {
  if (tab === 'headers') {
    return (req.headerRows || []).map(({ k, v }) => `${k}: ${v}`).join('\n')
  }
  if (tab === 'timing') {
    return (req.rows || [])
      .map(({ name, dur, pct }) => `${name}  ${dur}  ${pct}`)
      .join('\n')
  }
  if (tab === 'code') return snippetText(snippet, snippetArg)
  return JSON.stringify(req.body, null, 2)
}

const copyPayload = (req, tab, snippet, snippetArg) =>
  `// ${req.apiUrl}\n${copyBody(req, tab, snippet, snippetArg)}`

const CopyResultButton = styled.button`
  cursor: pointer;
  transition: color ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    bg: 'transparent',
    color: 'gray6',
    p: 1,
    pb: '14px',
    borderRadius: 2
  })};

  &[data-copied='true'] {
    ${theme({ color: 'green8' })};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${theme({ color: 'black' })};
    }
  }
`

export const ResultPanel = React.memo(({ tab, setTab, req }) => {
  const { D, status, body, headerRows, bars, rows, totalMs } = req
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isRateLimited = status === 'rate-limited'
  const hideTabs = isError || isRateLimited
  const snippet = CODE_TAB[D.vertical]
  const snippetArg = snippet.query ? SEARCH_EXAMPLE.query : D.fullUrl

  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(null)
  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const copyResult = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(copyPayload(req, tab, snippet, snippetArg))
      .then(() => {
        trackEvent('hero copy result', { tab, product: D.vertical })
        setCopied(true)
        clearTimeout(copiedTimer.current)
        copiedTimer.current = setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {})
  }

  const barRef = useRef(null)
  const indicatorRef = useRef(null)

  useTabIndicator({ barRef, indicatorRef, tab })

  const onTabKeyDown = e => {
    const keys = RESULT_TABS.map(t => t.key)
    const i = keys.indexOf(tab)
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (i + 1) % keys.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (i - 1 + keys.length) % keys.length
    } else if (e.key === 'Home') {
      next = 0
    } else if (e.key === 'End') {
      next = keys.length - 1
    }
    if (next === null) return
    e.preventDefault()
    setTab(keys[next])
    const btns =
      barRef.current && barRef.current.querySelectorAll('[role="tab"]')
    if (btns && btns[next]) btns[next].focus()
  }

  return (
    <Panel>
      {isLoading && <LoadingBar />}

      <Flex
        css={theme({
          alignItems: 'center',
          gap: 3,
          py: 3,
          px: 3,
          borderBottom: 1,
          borderBottomColor: 'gray1'
        })}
      >
        <Mono
          css={theme({
            fontSize: 0,
            color: SYNTAX.body,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          <Box as='span' css={theme({ color: 'green8', fontWeight: 'bold' })}>
            GET
          </Box>{' '}
          {req.apiUrl}
        </Mono>
      </Flex>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 3,
          px: 3,
          borderBottom: 1,
          borderBottomColor: 'gray1'
        })}
      >
        <ResultTabs
          barRef={barRef}
          indicatorRef={indicatorRef}
          tab={tab}
          setTab={setTab}
          onTabKeyDown={onTabKeyDown}
        />
        {!hideTabs && !isLoading && body && (
          <CopyResultButton
            type='button'
            data-copied={copied}
            aria-label='Copy result'
            onClick={copyResult}
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </CopyResultButton>
        )}
      </Flex>

      <TabContent
        key={isError ? 'error' : isRateLimited ? 'rate-limited' : tab}
        id='hero-tabpanel'
        role='tabpanel'
        aria-labelledby={`hero-tab-${tab}`}
        tabIndex={0}
      >
        {isError && <ErrorContent req={req} />}

        {isRateLimited && <RateLimitedContent />}

        {!hideTabs &&
          tab === 'output' &&
          (isLoading || !body ? <Skeleton /> : <Output req={req} />)}

        {!hideTabs &&
          tab === 'data' &&
          (isLoading || !body ? <Skeleton /> : <JsonView src={body} />)}

        {!hideTabs &&
          tab === 'headers' &&
          (isLoading || !headerRows
            ? (
              <Skeleton />
              )
            : (
              <HeadersContent headerRows={headerRows} />
              ))}

        {!hideTabs &&
          tab === 'timing' &&
          (isLoading || !bars
            ? (
              <Skeleton />
              )
            : (
              <TimingContent bars={bars} rows={rows} totalMs={totalMs} />
              ))}

        {!hideTabs && tab === 'code' && (
          <CodeContent snippet={snippet} snippetArg={snippetArg} />
        )}
      </TabContent>
    </Panel>
  )
})
