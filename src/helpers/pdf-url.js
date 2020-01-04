import { getApiUrl } from '@microlink/mql'

export default (url, opts) => {
  const [pdfUrl] = getApiUrl(url, {
    ...opts,
    pdf: true,
    meta: false,
    embed: 'pdf.url'
  })
  return pdfUrl
}
