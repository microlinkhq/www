import createClient from 'microlink.io'

const client = createClient()

const withQueryHeaders = (options = {}) =>
  Object.fromEntries(
    Object.entries(options).flatMap(([key, value]) =>
      key === 'headers'
        ? Object.entries(value ?? {}).map(([name, headerValue]) => [
          `headers.${name}`,
          headerValue
        ])
        : [[key, value]]
    )
  )

export default {
  request: (url, options) => client.request(url, withQueryHeaders(options)),
  apiUrl: (url, options) => client.apiUrl(url, withQueryHeaders(options))
}
