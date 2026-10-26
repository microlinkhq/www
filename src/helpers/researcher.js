import { UNAVATAR_TOKEN } from './unavatar'

export const researcherAvatarUrl = email =>
  `https://unavatar.io/${email}?token=${UNAVATAR_TOKEN}`

export const websiteLabel = url => new URL(url).hostname.replace(/^www\./, '')
