/* global IntersectionObserver */
import { useEffect } from 'react'

export const useAutoStart = ({ containerRef, hasAutoStarted, startIntro }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoStarted.current) {
          observer.disconnect()
          startIntro()
        }
      },
      { threshold: 0.3 }
    )

    const el = containerRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef, hasAutoStarted, startIntro])
}
