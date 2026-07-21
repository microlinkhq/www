import { useEffect } from 'react'
import { stripProtocol } from '../shared'

export const CAP_DEFAULT_URL = 'https://github.com/trending'

export const useAttractTyping = ({
  capSectionRef,
  capTriggeredRef,
  capTypeTimerRef,
  setCapUrl,
  fetchCapMarkdown
}) => {
  useEffect(() => {
    const el = capSectionRef.current
    if (!el) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || capTriggeredRef.current) return
        capTriggeredRef.current = true
        observer.disconnect()

        const target = stripProtocol(CAP_DEFAULT_URL)
        let i = 0
        const typeStep = () => {
          i++
          setCapUrl('https://' + target.slice(0, i))
          if (i < target.length) {
            capTypeTimerRef.current = setTimeout(typeStep, 60)
          } else {
            capTypeTimerRef.current = null
            setCapUrl(CAP_DEFAULT_URL)
            fetchCapMarkdown(CAP_DEFAULT_URL)
          }
        }
        capTypeTimerRef.current = setTimeout(typeStep, 300)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (capTypeTimerRef.current) {
        clearTimeout(capTypeTimerRef.current)
        capTypeTimerRef.current = null
      }
    }
  }, [
    capSectionRef,
    capTriggeredRef,
    capTypeTimerRef,
    setCapUrl,
    fetchCapMarkdown
  ])
}
