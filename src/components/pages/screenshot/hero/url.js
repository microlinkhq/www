export const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export const stripProtocol = url => url.replace(/^https?:\/\//i, '')

export const stripForDisplay = url => stripProtocol(url).replace(/\?.*$/, '')

export const handleProtocolPaste = (e, onValue) => {
  const pastedText = e.clipboardData?.getData('text') ?? ''
  const trimmedText = pastedText.trim()
  const strippedText = stripProtocol(trimmedText)

  if (strippedText === trimmedText) return

  e.preventDefault()
  const inputEl = e.currentTarget
  const start = inputEl.selectionStart ?? inputEl.value.length
  const end = inputEl.selectionEnd ?? inputEl.value.length
  const nextValue =
    inputEl.value.slice(0, start) + strippedText + inputEl.value.slice(end)

  onValue(ensureProtocol(stripProtocol(nextValue)))

  setTimeout(() => {
    const cursorPosition = start + strippedText.length
    inputEl.setSelectionRange(cursorPosition, cursorPosition)
  }, 0)
}
