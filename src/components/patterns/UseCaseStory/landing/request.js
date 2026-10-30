import microlink from 'helpers/microlink'

const PRO_API_KEY_PLACEHOLDER = 'YOUR_API_KEY'

export const apiUrlFor = ({ url, params = {}, pro = false }) => {
  const options = pro ? { ...params, apiKey: PRO_API_KEY_PLACEHOLDER } : params
  return microlink.apiUrl(url, options)
}

export const curlFor = request => {
  const apiUrl = apiUrlFor(request)
  return request.pro
    ? `curl '${apiUrl}' \\\n  -H 'x-api-key: $MICROLINK_API_KEY'`
    : `curl '${apiUrl}'`
}
