export const MAX_HISTORY = 6

export const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}
