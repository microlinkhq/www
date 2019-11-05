import { getApiUrl } from '@microlink/mql'

export default (url, opts) => {
  const [screenshotUrl] = getApiUrl(url, {
    ...opts,
    screenshot: true,
    meta: false,
    embed: 'screenshot.url'
  })
  return screenshotUrl
}
