import { DASHBOARD_URL } from './dashboard-url'
import { accountToken } from './dashboard-account'
import { signedInMarker } from './dashboard-session'

export const SESSION_REQUEST_URL = `${DASHBOARD_URL}/api/v1/session-request`

export const ACCOUNT_ERROR_CODE = 'EACCOUNT'

const ACCOUNT_ERROR_MESSAGE =
  'Your Microlink session could not be reached. Sign in again to run this on your account.'

const NO_KEYS_STATUS = 404

const NO_KEYS_MESSAGE = 'Your Microlink account has no API keys yet.'

export const isSignedIn = (document = globalThis.document) =>
  signedInMarker(document ? document.cookie : '') !== null

const accountFailure = (status, message) =>
  new Response(
    JSON.stringify({ status: 'fail', code: ACCOUNT_ERROR_CODE, message }),
    { status, headers: { 'content-type': 'application/json' } }
  )

const readJson = response =>
  response
    .clone()
    .json()
    .catch(() => null)

const isGatewayRefusal = body =>
  body !== null &&
  typeof body === 'object' &&
  typeof body.error === 'string' &&
  body.status === undefined

const fromGateway = async response => {
  if (response.ok) return response
  const body = await readJson(response)
  if (body !== null && !isGatewayRefusal(body)) return response
  return accountFailure(
    response.status,
    response.status === NO_KEYS_STATUS ? NO_KEYS_MESSAGE : ACCOUNT_ERROR_MESSAGE
  )
}

const mintToken = async token => {
  try {
    return await token()
  } catch {
    return null
  }
}

export const sessionRequest = async (
  query,
  { signal, fetcher = globalThis.fetch, token = accountToken } = {}
) => {
  const jwt = await mintToken(token)
  if (jwt === null) return accountFailure(401, ACCOUNT_ERROR_MESSAGE)
  try {
    const response = await fetcher(`${SESSION_REQUEST_URL}?${query}`, {
      signal,
      headers: { authorization: `Bearer ${jwt}` }
    })
    return fromGateway(response)
  } catch (error) {
    if (error && error.name === 'AbortError') throw error
    return accountFailure(502, ACCOUNT_ERROR_MESSAGE)
  }
}
