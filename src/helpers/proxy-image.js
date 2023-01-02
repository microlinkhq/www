const proxyImage = (url, opts) =>
  url
    ? `https://images.weserv.nl/?${new URLSearchParams({
        url,
        default: url,
        l: 9,
        af: '',
        il: '',
        n: -1,
        ...opts
      }).toString()}`
    : undefined

export default proxyImage
