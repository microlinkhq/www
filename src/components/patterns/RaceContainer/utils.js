export const formatMs = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 0 })

export const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

export const getDeviceType = width => {
  if (width <= 480) return 'Mobile'
  if (width <= 1024) return 'Tablet'
  return 'Desktop'
}

export const extractDomain = url => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export const getVisualIndex = (key, order) => order.indexOf(key)
