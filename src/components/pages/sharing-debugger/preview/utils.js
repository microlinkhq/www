import prependHttp from 'prepend-http'

const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+'

const FALLBACK_TITLE = 'No title found'
const FALLBACK_DESCRIPTION =
  'No description was found. Add one to improve how this page appears when shared.'
const FALLBACK_PUBLISHER = 'Unknown publisher'
const FALLBACK_URL = 'No canonical URL found'

export const PREVIEW_TIME = '12:34'

const getUrl = metadata =>
  typeof metadata?.url === 'string' ? metadata.url.trim() : ''

const getParsedUrl = metadata => {
  const value = getUrl(metadata)

  if (!value) return null

  try {
    return new URL(prependHttp(value))
  } catch {
    return null
  }
}

export const getHostname = metadata => getParsedUrl(metadata)?.hostname || ''

export const getTitle = metadata => {
  const value = metadata?.title

  return typeof value === 'string' && value.trim()
    ? value.trim()
    : FALLBACK_TITLE
}

export const getGoogleTitle = metadata => {
  const title = getTitle(metadata)

  return title.includes(' — ') ? title.split(' — ')[1] : title
}

export const getDescription = metadata => {
  const value = metadata?.description

  return typeof value === 'string' && value.trim()
    ? value.trim()
    : FALLBACK_DESCRIPTION
}

export const getPublisher = metadata =>
  metadata?.publisher || getHostname(metadata) || FALLBACK_PUBLISHER

export const getImageUrl = metadata => metadata?.image?.url || FALLBACK_IMAGE

export const getLogoUrl = metadata => metadata?.logo?.url || ''

export const getDisplayUrl = metadata => getUrl(metadata) || FALLBACK_URL
