import createClient from 'microlink.io'

const client = createClient()

let rewriteBase
let rewriteTarget
let scalarChain = Promise.resolve()

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

const withScalarHeader = (apiUrl, scalar) =>
  `${apiUrl}&${new URLSearchParams({ headers: scalar })}`

const runScalarRequest = async (url, options, scalar) => {
  const base = client.apiUrl(url, options)
  const previous = globalThis.fetch.bind(globalThis)
  rewriteBase = base
  rewriteTarget = withScalarHeader(base, scalar)
  globalThis.fetch = (input, init) => {
    const next =
      input.url === rewriteBase ? new Request(rewriteTarget, input) : input
    return previous(next, init)
  }
  try {
    return await client.request(url, options)
  } finally {
    rewriteBase = undefined
    rewriteTarget = undefined
    globalThis.fetch = previous
  }
}

const requestWithScalarHeader = (url, options, scalar) => {
  const run = scalarChain.then(() => runScalarRequest(url, options, scalar))
  scalarChain = run.catch(() => {})
  return run
}

const apiUrl = (url, options) => {
  const prepared = prepareOptions(options)
  const built = client.apiUrl(url, prepared.options)
  return prepared.scalar === undefined
    ? built
    : withScalarHeader(built, prepared.scalar)
}

const request = (url, options) => {
  const prepared = prepareOptions(options)
  if (prepared.scalar === undefined) {
    return client.request(url, prepared.options)
  }
  return requestWithScalarHeader(url, prepared.options, prepared.scalar)
}

export default { request, apiUrl }
