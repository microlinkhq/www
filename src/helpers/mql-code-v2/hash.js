export const hash = (url, options = {}) => {
  const optionsStr = JSON.stringify(options)
  const combined = url + optionsStr

  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36)
}
