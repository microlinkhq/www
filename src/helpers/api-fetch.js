import { accountApiKeys, runWithKeys, shouldTryNextKey } from './account-keys'

export const FREE_API_URL = 'https://api.microlink.io'
export const PRO_API_URL = 'https://pro.microlink.io'

class SpentKeyResponse extends Error {
  constructor (res, json) {
    super(`Microlink API responded ${res.status}`)
    this.statusCode = res.status
    this.code = json?.code
    this.answer = { res, json }
  }
}

const requestInit = (key, signal) =>
  key === undefined ? { signal } : { signal, headers: { 'x-api-key': key } }

const parseJson = res => res.json().catch(() => null)

const fetchOnce = async (fetcher, query, key, signal) => {
  const endpoint = key === undefined ? FREE_API_URL : PRO_API_URL
  const res = await fetcher(`${endpoint}/?${query}`, requestInit(key, signal))
  const json = await parseJson(res)
  if (shouldTryNextKey({ statusCode: res.status, code: json?.code })) {
    throw new SpentKeyResponse(res, json)
  }
  return { res, json }
}

export const fetchApi = async (
  query,
  {
    signal,
    withAccount = false,
    fetcher = globalThis.fetch,
    loadKeys = accountApiKeys
  } = {}
) => {
  const keys = withAccount ? await loadKeys() : []
  try {
    return await runWithKeys(keys, key =>
      fetchOnce(fetcher, query, key, signal)
    )
  } catch (failure) {
    if (failure instanceof SpentKeyResponse) return failure.answer
    throw failure
  }
}
