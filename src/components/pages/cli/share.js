export const SHARE_QUERY_KEY = 'q'

const SECRET_FLAG = /(?:^|\s)--api-key(?:=|\s+)\S+/gi

export const sanitizeShareLine = line =>
  String(line || '')
    .replace(SECRET_FLAG, '')
    .replace(/\s+/g, ' ')
    .trim()

export const parseSharedLine = search =>
  sanitizeShareLine(new URLSearchParams(search).get(SHARE_QUERY_KEY) || '')

export const sharePath = (line, loc) => {
  const url = new URL(loc.href)
  const next = sanitizeShareLine(line)
  if (next) url.searchParams.set(SHARE_QUERY_KEY, next)
  else url.searchParams.delete(SHARE_QUERY_KEY)
  return `${url.pathname}${url.search}${url.hash}`
}

export const commandToShareLine = command =>
  sanitizeShareLine(
    String(command || '').replace(/^(?:microlink(?:\.io)?\s+)/i, '')
  )

export const shareHref = (command, loc = window.location) =>
  new URL(sharePath(commandToShareLine(command), loc), loc.href).href

export const readSharedLine = () => {
  if (typeof window === 'undefined') return ''
  return parseSharedLine(window.location.search)
}
