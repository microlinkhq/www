import { useEffect, useRef, useState } from 'react'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const noop = () => {}

export const bindCubeMotion = (svg, watch, isPlaying) => {
  if (!svg) return Object.assign(noop, { update: noop })
  let onScreen = true
  let started = false
  const update = () => {
    if (!isPlaying() || !onScreen) return svg.pauseAnimations()
    if (!started) {
      started = true
      svg.querySelectorAll('animate').forEach(animate => animate.beginElement())
    }
    svg.unpauseAnimations()
  }
  const disconnect = watch(svg, visible => {
    onScreen = visible
    update()
  })
  update()
  return Object.assign(disconnect, { update })
}

export const followReducedMotion = (media, setPlaying) => {
  const sync = () => setPlaying(!media.matches)
  sync()
  media.addEventListener('change', sync)
  return () => media.removeEventListener('change', sync)
}

export const watchViewport = (svg, onScreen) => {
  const observer = new globalThis.IntersectionObserver(entries => {
    const entry = entries[entries.length - 1]
    onScreen(entry.isIntersecting)
  })
  observer.observe(svg)
  return () => observer.disconnect()
}

export const useCubeMotion = ref => {
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const updateRef = useRef(noop)
  useEffect(() => {
    const play = next => {
      playingRef.current = next
      setPlaying(next)
      updateRef.current()
    }
    const unfollow = followReducedMotion(
      window.matchMedia(REDUCED_MOTION_QUERY),
      play
    )
    const unbind = bindCubeMotion(
      ref.current,
      watchViewport,
      () => playingRef.current
    )
    updateRef.current = unbind.update
    return () => {
      unfollow()
      unbind()
      updateRef.current = noop
    }
  }, [ref])
  const toggle = () => {
    playingRef.current = !playingRef.current
    setPlaying(playingRef.current)
    updateRef.current()
  }
  return { playing, toggle }
}
