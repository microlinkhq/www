const NOOP = () => {}

export default (nodes, callback) => {
  if (typeof window.ResizeObserver === 'undefined') return NOOP
  const observer = new window.ResizeObserver(callback)
  nodes.forEach(node => observer.observe(node))
  return () => observer.disconnect()
}
