import { getApiUrl } from '@microlink/mql'

const pdfUrl = (url, opts) => {
  const [pdfUrl] = getApiUrl(url, {
    ...opts,
    pdf: true,
    meta: false,
    embed: 'pdf.url'
  })
  return pdfUrl
}

export default pdfUrl
