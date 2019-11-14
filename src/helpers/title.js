import { capitalize } from 'lodash'

const special = [
  'API',
  'apiKey',
  'background',
  'browser',
  'cache',
  'CDN',
  'CI',
  'CLI',
  'click',
  'CSS',
  'deviceScaleFactor',
  'disableAnimations',
  'DNS',
  'fullPage',
  'GitHub',
  'hasTouch',
  'height',
  'hide',
  'HTML',
  'HTTP',
  'HTTPS',
  'isLandscape',
  'isMobile',
  'JavaScript',
  'JS',
  'JSX',
  'Node.js',
  'omitBackground',
  'options',
  'package.json',
  'quality',
  'retry',
  'scrollTo',
  'SDK',
  'SLA',
  'I',
  'timeout',
  'type',
  'TypeScript',
  'url',
  'waitFor',
  'waitUntil',
  'width',
  'WordPress'
]

export default str => {
  let title = capitalize(str)

  special.forEach(word => {
    const re = new RegExp(`\\b(?:${word})\\b`, 'gi')
    if (re.test(str)) title = title.replace(re, word)
  })

  return title
}
