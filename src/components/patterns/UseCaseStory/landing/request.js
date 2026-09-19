import { getApiUrl } from 'helpers/get-api-url'

const PRO_API_KEY_PLACEHOLDER = 'YOUR_API_KEY'

export const apiUrlFor = ({ url, params = {}, pro = false }) => {
  const options = pro ? { ...params, apiKey: PRO_API_KEY_PLACEHOLDER } : params
  const [apiUrl] = getApiUrl(url, options)
  return apiUrl
}

export const curlFor = request => {
  const apiUrl = apiUrlFor(request)
  return request.pro
    ? `curl '${apiUrl}' \\\n  -H 'x-api-key: $MICROLINK_API_KEY'`
    : `curl '${apiUrl}'`
}
