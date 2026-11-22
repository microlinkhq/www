import { useEffect } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

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

const watchViewport = (svg, onScreen) => {
  const observer = new window.IntersectionObserver(([entry]) =>
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
        window.matchMedia(REDUCED_MOTION),
        watchViewport
      ),
    [ref]
  )
