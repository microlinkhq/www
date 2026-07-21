/* global requestAnimationFrame, cancelAnimationFrame, performance */
import React, { useEffect, useRef } from 'react'

import { formatMs } from './utils'

const COUNTER_DURATION = 500

export const AnimatedCounter = ({ value, animate }) => {
  const displayRef = useRef(null)
  const prevValue = useRef(value)

  useEffect(() => {
    if (!animate || prevValue.current === value) {
      prevValue.current = value
      return
    }

    const from = prevValue.current
    const to = value
    const start = performance.now()
    let raf

    const tick = now => {
      const t = Math.min((now - start) / COUNTER_DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (to - from) * eased)
      if (displayRef.current) {
        displayRef.current.textContent = `${formatMs(current)}\u2009ms`
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        prevValue.current = to
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, animate])

  useEffect(() => {
    if (!animate) {
      prevValue.current = value
      if (displayRef.current) {
        displayRef.current.textContent = `${formatMs(value)}\u2009ms`
      }
    }
  }, [value, animate])

  return <span ref={displayRef}>{formatMs(value)}&thinsp;ms</span>
}
