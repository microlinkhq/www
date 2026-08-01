const observeTabsResize = (list, callback) => {
  const observer = new window.ResizeObserver(callback)
  ;[list, ...list.children].forEach(node => observer.observe(node))
  return () => observer.disconnect()
}

export default observeTabsResize
