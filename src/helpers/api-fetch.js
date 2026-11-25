import { accountApiKeys, fetchWithKeys } from './account-keys'

export const FREE_API_URL = 'https://api.microlink.io'
export const PRO_API_URL = 'https://pro.microlink.io'

const requestInit = (key, signal) =>
  key === undefined ? { signal } : { signal, headers: { 'x-api-key': key } }

const endpointFor = key => (key === undefined ? FREE_API_URL : PRO_API_URL)

export const fetchApi = async (
  query,
  { signal, fetcher = globalThis.fetch, loadKeys = accountApiKeys } = {}
) => {
  const keys = await loadKeys()
  const { response, body } = await fetchWithKeys(keys, key =>
    fetcher(`${endpointFor(key)}/?${query}`, requestInit(key, signal))
  )
  return { res: response, json: body }
}
