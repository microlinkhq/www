const LOAD_MARGIN = '600px 0px'

export const watchFigure = (node, load, setSource) => {
  if (!node) return undefined
  let cancelled = false
  const observer = new window.IntersectionObserver(
    entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      load()
        .then(module => {
          if (!cancelled) setSource(module.default ?? module)
        })
        .catch(() => {})
    },
    { rootMargin: LOAD_MARGIN }
  )
  observer.observe(node)
  return () => {
    cancelled = true
    observer.disconnect()
  }
}
