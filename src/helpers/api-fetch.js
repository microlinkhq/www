import { isSignedIn, sessionRequest } from './session-request'

export const FREE_API_URL = 'https://api.microlink.io'

const readJson = response => response.json().catch(() => null)

const sendQuery = (query, { signal, fetcher, signedIn, token }) =>
  signedIn()
    ? sessionRequest(query, { signal, fetcher, token })
    : fetcher(`${FREE_API_URL}/?${query}`, { signal })

export const fetchApi = async (
  query,
  { signal, fetcher = globalThis.fetch, signedIn = isSignedIn, token } = {}
) => {
  const res = await sendQuery(query, { signal, fetcher, signedIn, token })
  return { res, json: await readJson(res) }
}
