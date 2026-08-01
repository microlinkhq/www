export default (nodes, callback) => {
  const observer = new window.ResizeObserver(callback)
  nodes.forEach(node => observer.observe(node))
  return () => observer.disconnect()
}
