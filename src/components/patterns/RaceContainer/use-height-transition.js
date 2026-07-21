import { useEffect, useRef } from 'react'

export const useHeightTransition = ({
  innerRef,
  phase,
  modeIndex,
  step,
  isAnnouncing
}) => {
  const prevPhaseRef = useRef(phase)
  const prevModeRef = useRef(modeIndex)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const phaseChanged = prevPhaseRef.current !== phase
    const modeChanged = prevModeRef.current !== modeIndex
    prevPhaseRef.current = phase
    prevModeRef.current = modeIndex

    if (phase === 'finished' && modeChanged && !phaseChanged) {
      el.style.transition = 'none'
      el.style.height = 'auto'
      el.getBoundingClientRect()
      el.style.transition = ''
      return
    }

    const prevHeight = el.offsetHeight
    el.style.height = 'auto'
    const nextHeight = el.scrollHeight

    if (prevHeight && prevHeight !== nextHeight) {
      el.style.height = `${prevHeight}px`
      el.getBoundingClientRect()
      el.style.height = `${nextHeight}px`
    } else {
      el.style.height = `${nextHeight}px`
    }
  }, [innerRef, phase, modeIndex, step, isAnnouncing])
}
