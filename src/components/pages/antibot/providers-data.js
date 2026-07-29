import providersData from 'is-antibot/providers.json'

const { providers } = providersData

const CATEGORY = {
  antibot: 'Antibot',
  captcha: 'CAPTCHA',
  platform: 'Platform-specific'
}

const SIGNAL = {
  headers: 'Headers',
  cookies: 'Cookies',
  html: 'HTML',
  url: 'URL',
  status_code: 'Status Code'
}

const signalsOf = ({ detections }) => {
  const seen = new Set()
  const types = []

  for (const type of Object.keys(SIGNAL)) {
    if (detections.some(detection => detection.type === type)) {
      seen.add(type)
      types.push(type)
    }
  }

  for (const { type } of detections) {
    if (!seen.has(type)) {
      seen.add(type)
      types.push(type)
    }
  }

  return types.map(type => SIGNAL[type] ?? type)
}

const byName = (one, other) =>
  one.name.toLowerCase() < other.name.toLowerCase() ? -1 : 1

const roundDown = count => (count < 10 ? count : Math.floor(count / 10) * 10)

export const PROVIDERS_COVERED = `${roundDown(providers.length)}+`

export const PROVIDERS = providers
  .map(provider => {
    const methods = signalsOf(provider)
    return {
      name: provider.label,
      category: CATEGORY[provider.category] || provider.category,
      signals: methods.length,
      methods
    }
  })
  .sort(byName)
