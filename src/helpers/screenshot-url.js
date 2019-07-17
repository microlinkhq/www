import { apiUrl } from '@microlink/mql'
import { pickBy } from 'lodash'

export default (url, opts) => {
  const [screenshotUrl] = apiUrl(url, {
    ...pickBy(opts),
    screenshot: true,
    embed: 'screenshot.url'
  })
  return screenshotUrl
}
