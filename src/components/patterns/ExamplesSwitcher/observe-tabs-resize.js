const observeTabsResize = (list, callback, { includeList = true } = {}) => {
  const observer = new window.ResizeObserver(callback)
  const nodes = includeList ? [list, ...list.children] : [...list.children]
  nodes.forEach(node => observer.observe(node))
  return () => observer.disconnect()
}

export default observeTabsResize
