import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { PANEL_HEIGHT } from 'components/pages/home/output'
import { theme, colors } from 'theme'
import React from 'react'
import styled from 'styled-components'

import { INSTALL_COMMENT } from './constants'
import { Code, ERROR, Mono, SYNTAX, WARN } from './primitives'

const PILL_TONES = {
  error: { color: ERROR, background: colors.red0 },
  warning: { color: WARN, background: colors.orange0 }
}

const StatusPill = styled.span`
  color: ${p => PILL_TONES[p.$tone].color};
  background: ${p => PILL_TONES[p.$tone].background};
  ${theme({
    fontFamily: 'mono',
    fontSize: '13px',
    fontWeight: 'regular',
    py: '5px',
    px: '12px',
    borderRadius: '999px',
    whiteSpace: 'nowrap'
  })};
`

const RateLimitLink = styled.a`
  ${theme({
    fontFamily: 'sans',
    fontSize: '13px',
    fontWeight: 'regular',
    color: 'grape7',
    textDecoration: 'none'
  })};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      text-decoration: underline;
    }
  }
`

const Str = styled.span`
  ${theme({ color: SYNTAX.string })};
`
const Num = styled.span`
  ${theme({ color: SYNTAX.number })};
`
const Bool = styled.span`
  ${theme({ color: SYNTAX.boolean })};
`
const Fn = styled.span`
  ${theme({ color: SYNTAX.fn })};
`
const Comment = styled.span`
  ${theme({ color: SYNTAX.muted })};
`

const renderJsValue = (value, keyBase) => {
  if (typeof value === 'boolean') return <Bool>{String(value)}</Bool>
  if (typeof value === 'number') return <Num>{value}</Num>
  if (typeof value === 'string') {
    const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    return <Str>{`'${escaped}'`}</Str>
  }
  const entries = Object.entries(value)
  return (
    <>
      {'{ '}
      {entries.map(([k, v], i) => (
        <React.Fragment key={`${keyBase}.${k}`}>
          {i > 0 && ', '}
          {k}: {renderJsValue(v, `${keyBase}.${k}`)}
        </React.Fragment>
      ))}
      {' }'}
    </>
  )
}

export const ErrorContent = ({ req }) => (
  <Box css={theme({ p: 4 })}>
    <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
      <StatusPill $tone='error'>request failed</StatusPill>
    </Flex>
    <Mono
      css={theme({
        fontSize: 0,
        color: SYNTAX.body,
        lineHeight: 1.6,
        wordBreak: 'break-word'
      })}
    >
      {req.error}
    </Mono>
  </Box>
)

export const RateLimitedContent = () => (
  <Box css={theme({ p: 4 })}>
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap'
      })}
    >
      <StatusPill $tone='warning'>rate limited</StatusPill>
    </Flex>
    <Mono
      css={theme({
        fontSize: 0,
        color: SYNTAX.body,
        lineHeight: 1.6,
        wordBreak: 'break-word'
      })}
    >
      You&rsquo;ve hit the public demo rate limit. Get an API key for higher
      limits.
    </Mono>
    <Flex css={theme({ alignItems: 'center', gap: 2, mt: 3 })}>
      <RateLimitLink href='/pricing'>View plans →</RateLimitLink>
    </Flex>
  </Box>
)

export const HeadersContent = ({ headerRows }) => (
  <Box
    css={theme({
      pt: 2,
      px: 3,
      pb: 3,
      maxHeight: PANEL_HEIGHT,
      overflow: 'auto'
    })}
  >
    {headerRows.map(h => (
      <Box
        key={h.k}
        css={theme({
          display: 'grid',
          gridTemplateColumns: '230px 1fr',
          gap: 3,
          py: 2,
          borderBottom: 1,
          borderBottomColor: 'gray1',
          fontFamily: 'mono',
          fontSize: 0
        })}
      >
        <Box as='span' css={theme({ color: SYNTAX.number })}>
          {h.k}
        </Box>
        <Box
          as='span'
          css={theme({ color: SYNTAX.body, wordBreak: 'break-all' })}
        >
          {h.v}
        </Box>
      </Box>
    ))}
  </Box>
)

export const TimingContent = ({ bars, rows, totalMs }) =>
  bars.length === 0
    ? (
      <Box css={theme({ p: 4 })}>
        <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>
          No server-timing header on this response.
        </Mono>
      </Box>
      )
    : (
      <Box css={theme({ p: 3, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}>
        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3
          })}
        >
          <Box
            as='span'
            css={theme({
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black'
            })}
          >
            Total server time
          </Box>
          <Box
            as='span'
            css={theme({
              fontSize: 2,
              fontWeight: 'bold',
              color: 'black'
            })}
          >
            {totalMs != null ? `${Math.round(totalMs)}ms` : '—'}
          </Box>
        </Flex>
        {bars.map(b => (
          <Box key={b.name} css={theme({ mb: 3 })}>
            <Flex
              css={theme({
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2
              })}
            >
              <Mono css={theme({ fontSize: 0, color: 'black' })}>{b.name}</Mono>
              <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>
                {b.dur}
              </Mono>
            </Flex>
            <Box
              css={theme({
                height: '8px',
                borderRadius: '999px',
                bg: 'gray1',
                overflow: 'hidden'
              })}
            >
              <Box
                css={theme({
                  height: '100%',
                  borderRadius: '999px',
                  width: b.pct,
                  bg: b.color
                })}
              />
            </Box>
          </Box>
        ))}
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 2,
            mt: 3,
            pb: 2,
            borderBottom: 1,
            borderBottomColor: 'gray1',
            fontFamily: 'mono',
            fontSize: 0,
            letterSpacing: '.05em',
            color: SYNTAX.muted,
            textTransform: 'uppercase'
          })}
        >
          <span>Metric</span>
          <Box as='span' css={theme({ textAlign: 'right' })}>
            Duration
          </Box>
          <Box as='span' css={theme({ textAlign: 'right' })}>
            % of total
          </Box>
        </Box>
        {rows.map(r => (
          <Box
            key={r.name}
            css={theme({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 2,
              py: 3,
              borderBottom: 1,
              borderBottomColor: 'gray1',
              fontFamily: 'mono',
              fontSize: 0,
              color: SYNTAX.body
            })}
          >
            <span>{r.name}</span>
            <Box
              as='span'
              css={theme({ textAlign: 'right', color: SYNTAX.muted })}
            >
              {r.dur}
            </Box>
            <Box
              as='span'
              css={theme({ textAlign: 'right', color: SYNTAX.muted })}
            >
              {r.pct}
            </Box>
          </Box>
        ))}
      </Box>
      )

export const CodeContent = ({ snippet, snippetArg }) => (
  <Code
    css={theme({
      pt: 4,
      px: 3,
      pb: 4,
      fontSize: 0,
      lineHeight: '2',
      maxHeight: PANEL_HEIGHT,
      color: 'black'
    })}
  >
    <Comment>{INSTALL_COMMENT}</Comment>
    {'\n'}
    <Num>import</Num> createClient <Num>from</Num> <Str>'microlink.io'</Str>
    {'\n\n'}
    <Num>const</Num> microlink = <Fn>createClient</Fn>({'{'} apiKey:
    process.env.MICROLINK_API_KEY {'}'}){'\n\n'}
    <Num>const</Num> {snippet.binding} = <Num>await</Num> microlink.
    <Fn>{snippet.method}</Fn>(
    {snippet.code
      ? (
        <>
          {'\n  '}
          <Str>'{snippetArg}'</Str>,{'\n  '}
          {snippet.code}
          {'\n'}
        </>
        )
      : (
        <>
          <Str>'{snippetArg}'</Str>
          {snippet.opts && <>, {renderJsValue(snippet.opts, 'opts')}</>}
        </>
        )}
    ){'\n\n'}
    <Comment>{`// ${snippet.comment}`}</Comment>
    {'\n'}
    console.<Fn>log</Fn>({snippet.log})
  </Code>
)
