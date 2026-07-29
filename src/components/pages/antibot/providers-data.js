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
  const signals = []
  for (const type of Object.keys(SIGNAL)) {
    if (detections.some(detection => detection.type === type)) {
      signals.push(SIGNAL[type])
    }
  }
  return signals
}

export const PROVIDERS_COVERED = `${Math.floor(providers.length / 10) * 10}+`

export const PROVIDERS = providers
  .map(provider => ({
    name: provider.label,
    category: CATEGORY[provider.category] || provider.category,
    methods: signalsOf(provider)
  }))
  .sort((one, other) => one.name.localeCompare(other.name))
