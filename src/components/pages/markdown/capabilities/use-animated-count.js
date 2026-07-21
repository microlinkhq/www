import { useState, useRef, useEffect } from 'react'

const COUNTER_DURATION_MS = 900
const COUNTER_STEPS = 20

export const useAnimatedCount = target => {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)
  useEffect(() => {
    if (target === 0) {
      setDisplay(0)
      prevRef.current = 0
      return
    }
    const from = prevRef.current
    const diff = target - from
    if (diff === 0) return
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= COUNTER_STEPS) {
        setDisplay(target)
        prevRef.current = target
        clearInterval(interval)
      } else {
        const progress = step / COUNTER_STEPS
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(from + diff * eased))
      }
    }, COUNTER_DURATION_MS / COUNTER_STEPS)
    return () => clearInterval(interval)
  }, [target])
  return display
}
