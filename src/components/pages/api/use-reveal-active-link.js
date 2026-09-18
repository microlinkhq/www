import { useEffect } from 'react'

export const useRevealActiveLink = (scrollerRef, activeId) => {
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return

    const link = scroller.querySelector("[data-active='true']")
    if (!link) return

    const scrollerRect = scroller.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    const offset =
      linkRect.left -
      scrollerRect.left -
      (scroller.clientWidth - linkRect.width) / 2

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    scroller.scrollTo({
      left: scroller.scrollLeft + offset,
      behavior: reduceMotion ? 'auto' : 'smooth'
    })
  }, [scrollerRef, activeId])
}
