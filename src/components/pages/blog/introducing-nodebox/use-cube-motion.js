import { useEffect, useRef, useState } from 'react'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const noop = () => {}

export const bindCubeMotion = (
  svg,
  reducedMotion,
  watch,
  isPlaying = () => false
) => {
  if (!svg) return Object.assign(noop, { update: noop })
  let onScreen = true
  let started = false
  const update = () => {
    const playing = isPlaying() && !reducedMotion.matches
    if (playing && onScreen) {
      if (!started) {
        started = true
        const animates =
          typeof svg.querySelectorAll === 'function'
            ? svg.querySelectorAll('animate')
            : []
        animates.forEach(animate => animate.beginElement())
      }
      return svg.unpauseAnimations()
    }
    svg.pauseAnimations()
    if (!playing) {
      started = false
      svg.setCurrentTime(0)
    }
  }
  const disconnect = watch(svg, visible => {
    onScreen = visible
    update()
  })
  reducedMotion.addEventListener('change', update)
  update()
  return Object.assign(
    () => {
      disconnect()
      reducedMotion.removeEventListener('change', update)
    },
    { update }
  )
}

export const watchViewport = (svg, onScreen) => {
  const observer = new globalThis.IntersectionObserver(([entry]) =>
    onScreen(entry.isIntersecting)
  )
  observer.observe(svg)
  return () => observer.disconnect()
}

export const useCubeMotion = ref => {
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const updateRef = useRef(noop)
  useEffect(() => {
    const stop = bindCubeMotion(
      ref.current,
      window.matchMedia(REDUCED_MOTION_QUERY),
      watchViewport,
      () => playingRef.current
    )
    updateRef.current = stop.update
    return stop
  }, [ref])
  const toggle = () => {
    playingRef.current = !playingRef.current
    setPlaying(playingRef.current)
    updateRef.current()
  }
  return { playing, toggle }
}
