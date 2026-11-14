export const storedApiKey = value => {
  const key = typeof value === 'string' ? value : value?.apiKey
  if (typeof key !== 'string') return undefined
  const trimmed = key.trim()
  return trimmed === '' ? undefined : trimmed
}
