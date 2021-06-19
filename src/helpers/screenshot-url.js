import { getApiUrl } from '@microlink/mql'

const screenshotUrl = (url, opts) => {
  const [screenshotUrl] = getApiUrl(url, {
    ...opts,
    screenshot: true,
    meta: false,
    embed: 'screenshot.url'
  })
  return screenshotUrl
}

export default screenshotUrl
