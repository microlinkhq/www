import { accountLoad } from './dashboard-account'
import { signedInMarker } from './dashboard-session'

const TOO_MANY_REQUESTS = 429
const NEXT_KEY_CODES = new Set(['ERATE', 'EAUTH'])

const cookiesOf = document => (document ? document.cookie : '')

export const accountApiKeys = async (
  document = globalThis.document,
  load = accountLoad
) => {
  const marker = signedInMarker(cookiesOf(document))
  if (marker === null) return []
  const account = await load(marker).account.catch(() => null)
  return Array.isArray(account?.apiKeys) ? account.apiKeys : []
}

export const requestKeys = (apiKey, accountKeys = []) => [
  ...new Set(
    [apiKey, ...accountKeys]
      .filter(key => typeof key === 'string' && key.trim() !== '')
      .map(key => key.trim())
  )
]

export const shouldTryNextKey = failure =>
  failure?.statusCode === TOO_MANY_REQUESTS || NEXT_KEY_CODES.has(failure?.code)

export const runWithKeys = async (keys, attempt) => {
  let lastKeyedFailure
  for (const key of keys) {
    try {
      return await attempt(key)
    } catch (failure) {
      if (!shouldTryNextKey(failure)) throw failure
      lastKeyedFailure = failure
    }
  }
  try {
    return await attempt(undefined)
  } catch (failure) {
    throw lastKeyedFailure ?? failure
  }
}
