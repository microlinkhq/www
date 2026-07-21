import { useEffect } from 'react'

export const useErrorModalFocus = ({ error, setError, errorModalRef }) => {
  const isErrorOpen = Boolean(error)

  useEffect(() => {
    if (!isErrorOpen) return undefined

    const previouslyFocused = document.activeElement
    const modal = errorModalRef.current
    const getFocusable = () =>
      modal
        ? Array.from(
          modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.disabled)
        : []

    ;(getFocusable()[0] || modal)?.focus()

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setError(null)
        return
      }
      if (event.key !== 'Tab' || !modal) return
      const items = getFocusable()
      if (items.length === 0) return event.preventDefault()
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!modal.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus()
      }
    }
  }, [isErrorOpen, setError, errorModalRef])
}
