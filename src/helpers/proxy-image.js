export default (url, opts) => {
  const encodedUrl = encodeURIComponent(url)
  const query = new URLSearchParams(opts).toString()
  console.log({ query })
  let proxyUrl = `https://images.weserv.nl/?url=${encodedUrl}&l=9&af&il&n=-1`
  if (query) proxyUrl = `${proxyUrl}&${query}`
  return proxyUrl
}
