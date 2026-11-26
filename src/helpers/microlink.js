import createClient from 'microlink.io'
import { isSignedIn, sessionRequest } from './session-request'

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
    if (value === null) continue
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

const requestOnce = async (url, options) => {
  const prepared = prepareOptions(options)
  try {
    if (prepared.scalar === undefined) {
      return await client.request(url, prepared.options)
    }
    return await requestWithScalarHeader(url, prepared.options, prepared.scalar)
  } catch (err) {
    if (prepared.options.apiKey && err && typeof err === 'object') {
      err.keyed = true
    }
    throw err
  }
}

const RAW_BODY_OPTIONS = ['stream', 'embed']

const wantsRawBody = options =>
  RAW_BODY_OPTIONS.some(name => Boolean(options[name]))

const parseJson = text => {
  try {
    return JSON.parse(text)
  } catch {
    return { status: 'fail', message: text }
  }
}

const sessionFailure = (body, response) =>
  Object.assign(new Error(body.message ?? `Error ${response.status}`), {
    ...body,
    description: body.message,
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    url: response.url,
    keyed: true
  })

const toResult = async (response, raw) => {
  const reply = {
    url: response.url,
    headers: response.headers,
    statusCode: response.status
  }
  const type = response.headers.get('content-type') || ''
  if (raw && response.ok && !type.includes('json')) {
    return { ...reply, body: await response.arrayBuffer() }
  }
  const body = parseJson(await response.text())
  if (!response.ok || body.status === 'fail') {
    throw sessionFailure(body, response)
  }
  return { ...body, response: { ...reply, body } }
}

const requestOnSession = async (url, options) => {
  const query = new URL(apiUrl(url, options)).search.slice(1)
  return toResult(await sessionRequest(query), wantsRawBody(options))
}

const request = async (url, { apiKey, ...options } = {}) => {
  if (apiKey) return requestOnce(url, { ...options, apiKey })
  if (isSignedIn()) return requestOnSession(url, options)
  return requestOnce(url, options)
}

export default { request, apiUrl }
