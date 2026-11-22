import { useEffect } from 'react'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const bindCubeMotion = (svg, reducedMotion, watch) => {
  if (!svg) return () => {}
  let onScreen = true
  const update = () => {
    if (onScreen && !reducedMotion.matches) return svg.unpauseAnimations()
    svg.pauseAnimations()
    if (reducedMotion.matches) svg.setCurrentTime(0)
  }
  const disconnect = watch(svg, visible => {
    onScreen = visible
    update()
  })
  reducedMotion.addEventListener('change', update)
  update()
  return () => {
    disconnect()
    reducedMotion.removeEventListener('change', update)
  }
}

export const watchViewport = (svg, onScreen) => {
  const observer = new globalThis.IntersectionObserver(([entry]) =>
    onScreen(entry.isIntersecting)
  )
  observer.observe(svg)
  return () => observer.disconnect()
}

export const useCubeMotion = ref =>
  useEffect(
    () =>
      bindCubeMotion(
        ref.current,
        window.matchMedia(REDUCED_MOTION_QUERY),
        watchViewport
      ),
    [ref]
  )
