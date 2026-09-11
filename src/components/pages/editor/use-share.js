import { EXAMPLES, exampleIdForFiles } from './examples'
import { ENTRY_FILE, filesFromEntry } from './shared'

export const SHARE_QUERY_KEY = 'q'
export const TEMPLATE_QUERY_KEY = 'template'

const API_KEY_LITERAL =
  /(?:['"]apiKey['"]|apiKey)\s*:\s*(['"`])(?:\\.|(?!\1).)*\1\s*,?/g

export const sanitizeShareCode = code =>
  String(code || '')
    .replace(API_KEY_LITERAL, '')
    .replace(/,\s*,/g, ',')
    .replace(/,\s*([}\]])/g, '$1')

const sanitizeFiles = files =>
  Object.fromEntries(
    Object.entries(files || {}).map(([name, source]) => [
      name,
      sanitizeShareCode(source)
    ])
  )

const toBase64Url = bytes => {
  let binary = ''
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromBase64Url = value => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  return Uint8Array.from(binary, char => char.charCodeAt(0))
}

const encodeBytes = async text => {
  if (typeof CompressionStream === 'function') {
    const stream = new Blob([text])
      .stream()
      .pipeThrough(new CompressionStream('deflate-raw'))
    return new Uint8Array(await new Response(stream).arrayBuffer())
  }
  return new TextEncoder().encode(text)
}

const decodeBytes = async bytes => {
  if (typeof DecompressionStream === 'function') {
    try {
      const stream = new Blob([bytes])
        .stream()
        .pipeThrough(new DecompressionStream('deflate-raw'))
      return await new Response(stream).text()
    } catch (_) {}
  }
  return new TextDecoder().decode(bytes)
}

const toSharePayload = files => JSON.stringify({ files: sanitizeFiles(files) })

const fromSharePayload = text => {
  if (!text) return null
  try {
    const parsed = JSON.parse(text)
    if (parsed && parsed.files && typeof parsed.files === 'object') {
      return parsed.files
    }
  } catch (_) {}
  return filesFromEntry(text)
}

export const encodeShareCode = async files => {
  const payload = toSharePayload(
    typeof files === 'string' ? filesFromEntry(files) : files
  )
  if (!payload || payload === '{"files":{}}') return ''
  return toBase64Url(await encodeBytes(payload))
}

export const decodeShareCode = async query => {
  if (!query) return null
  try {
    return fromSharePayload(await decodeBytes(fromBase64Url(query)))
  } catch (_) {
    return null
  }
}

export const exampleFromSearch = search => {
  const id = new URLSearchParams(search).get(TEMPLATE_QUERY_KEY)
  return EXAMPLES.find(example => example.id === id) || null
}

export const applyEditorParams = (url, { templateId, encoded } = {}) => {
  if (templateId && templateId !== 'custom') {
    url.searchParams.set(TEMPLATE_QUERY_KEY, templateId)
    url.searchParams.delete(SHARE_QUERY_KEY)
  } else {
    url.searchParams.delete(TEMPLATE_QUERY_KEY)
    if (encoded) url.searchParams.set(SHARE_QUERY_KEY, encoded)
    else url.searchParams.delete(SHARE_QUERY_KEY)
  }
  return `${url.pathname}${url.search}${url.hash}`
}

export const readSharedFiles = async () => {
  if (typeof window === 'undefined') return null
  const search = window.location.search
  const shared = await decodeShareCode(
    new URLSearchParams(search).get(SHARE_QUERY_KEY) || ''
  )
  if (shared) return shared
  const example = exampleFromSearch(search)
  return example ? example.files : null
}

export const writeShareQuery = async files => {
  if (typeof window === 'undefined') return window.location.href
  const url = new URL(window.location.href)
  const templateId = exampleIdForFiles(files)
  const encoded = templateId === 'custom' ? await encodeShareCode(files) : ''
  const next = applyEditorParams(url, { templateId, encoded })
  window.history.replaceState(null, '', next)
  return new URL(next, url.origin).href
}

export const hasEntry = files => files && typeof files[ENTRY_FILE] === 'string'
