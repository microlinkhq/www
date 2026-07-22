import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import CaptionBase from 'components/patterns/Caption/Caption'
import SubheadBase from 'components/elements/Subhead'
import { extractDomain } from 'helpers/extract-domain'
import { highlight } from 'components/keyframes'
import { withTitle } from 'helpers/hoc/with-title'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import { radii, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const HIGHLIGHT_DURATION = 1000
const IDLE_ROTATE_MS = 5000
const TIMING_VALUE_FONT_SIZE = ['28px', '34px', '42px', '42px']
const TIMING_UNIT_FONT_SIZE = ['22px', '28px', '32px', '32px']

const TimingHighlight = styled('span')`
  animation: ${highlight} ${HIGHLIGHT_DURATION}ms ease both;
  border-radius: ${radii[1]};
  padding: 0 ${radii[1]};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const formatTiming = ms =>
  ms < 100 ? `${Math.round(ms)}` : (ms / 1000).toFixed(2)
const timingUnit = ms => (ms < 100 ? 'ms' : 'secs')

export const LiveTiming = ({ timingMs, timingUrl, timingHistory }) => {
  const [displayMs, setDisplayMs] = useState(null)
  const [displayUrl, setDisplayUrl] = useState(null)
  const [key, setKey] = useState(0)
  const historyRef = useRef(timingHistory)
  const displayUrlRef = useRef(null)

  useEffect(() => {
    historyRef.current = timingHistory
  }, [timingHistory])

  const show = useCallback((ms, url) => {
    displayUrlRef.current = url
    setDisplayMs(ms)
    setDisplayUrl(url)
    setKey(k => k + 1)
  }, [])

  useEffect(() => {
    if (timingMs == null) return
    show(timingMs, timingUrl)

    const idleTimer = setInterval(() => {
      const history = historyRef.current
      if (history.length < 3) return
      const others = history.filter(e => e.url !== displayUrlRef.current)
      const pick = others[Math.floor(Math.random() * others.length)]
      show(pick.ms, pick.url)
    }, IDLE_ROTATE_MS)

    return () => clearInterval(idleTimer)
  }, [timingMs, timingUrl, show])

  const hasValue = displayMs != null
  const isCache = hasValue && displayMs < 500
  const value = hasValue ? formatTiming(displayMs) : null
  const unit = hasValue ? timingUnit(displayMs) : 'secs'
  const domain = displayUrl ? extractDomain(displayUrl) : null

  return (
    <Flex
      css={theme({
        display: 'inline-flex',
        px: [2, 2, 2, 3],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      })}
    >
      <Subhead
        forwardedAs='div'
        css={theme({
          fontSize: TIMING_VALUE_FONT_SIZE,
          color: 'white',
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums'
        })}
      >
        {hasValue
          ? (
            <>
              <TimingHighlight key={key}>{value}</TimingHighlight>
              <Caption
                forwardedAs='div'
                css={theme({
                  ml: 1,
                  color: 'white',
                  display: 'inline',
                  fontWeight: 'bold',
                  fontSize: TIMING_UNIT_FONT_SIZE
                })}
                titleize={false}
              >
                {unit}
              </Caption>
            </>
            )
          : (
              '—'
            )}
      </Subhead>
      <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
        <Caps css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}>
          {hasValue
            ? isCache
              ? `${domain} · cached`
              : `${domain} · cold`
            : 'loading…'}
        </Caps>
      </Caption>
    </Flex>
  )
}
