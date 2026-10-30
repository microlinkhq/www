import createClient from 'microlink.io'

const client = createClient()

const hrefOf = input =>
  typeof input === 'string'
    ? input
    : input instanceof URL
      ? input.toString()
      : input.url

const headerRewrites = new Map()
let rewriteDepth = 0
let nativeFetch

const fetching = (input, init) => {
  const target = headerRewrites.get(hrefOf(input))
  if (target === undefined) return nativeFetch(input, init)
  if (input instanceof Request) { return nativeFetch(new Request(target, input), init) }
  return nativeFetch(target, init)
}

const prepareOptions = (options = {}) => {
  const entries = []
  let scalar
  for (const [key, value] of Object.entries(options)) {
    if (key !== 'headers') {
      entries.push([key, value])
      continue
    }
    if (value == null) continue
    if (typeof value !== 'object') {
      scalar = value
      continue
    }
    for (const [name, headerValue] of Object.entries(value)) {
      entries.push([`headers.${name}`, headerValue])
    }
  }
  return { options: Object.fromEntries(entries), scalar }
}

const appendScalarHeader = (apiUrl, scalar) => {
  if (scalar === undefined) return apiUrl
  const separator = apiUrl.includes('?') ? '&' : '?'
  return `${apiUrl}${separator}${new URLSearchParams({ headers: scalar })}`
}

const requestWithScalarHeader = async (url, options, scalar) => {
  const base = client.apiUrl(url, options)
  headerRewrites.set(base, appendScalarHeader(base, scalar))
  if (rewriteDepth === 0) {
    nativeFetch = globalThis.fetch.bind(globalThis)
    globalThis.fetch = fetching
  }
  rewriteDepth += 1
  try {
    return await client.request(url, options)
  } finally {
    headerRewrites.delete(base)
    rewriteDepth -= 1
    if (rewriteDepth === 0) globalThis.fetch = nativeFetch
  }
}

const apiUrl = (url, options) => {
  const prepared = prepareOptions(options)
  return appendScalarHeader(
    client.apiUrl(url, prepared.options),
    prepared.scalar
  )
}

const request = (url, options) => {
  const prepared = prepareOptions(options)
  if (prepared.scalar === undefined) { return client.request(url, prepared.options) }
  return requestWithScalarHeader(url, prepared.options, prepared.scalar)
}

export default { request, apiUrl }
