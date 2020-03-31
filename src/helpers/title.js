import capitalize from 'lodash/capitalize'

const special = [
  'apiKey',
  'background',
  'browser',
  'Global',
  'Edge',
  'Cache',
  'click',
  'CodeSandbox',
  'deviceScaleFactor',
  'fullPage',
  'GitHub',
  'hasTouch',
  'height',
  'hide',
  'isLandscape',
  'isMobile',
  'JavaScript',
  'Microlink',
  'Node.js',
  'omitBackground',
  'options',
  'package.json',
  'quality',
  'retry',
  'scroll',
  'timeout',
  'type',
  'TypeScript',
  'url',
  'waitFor',
  'waitUntil',
  'width',
  'WordPress',
  'oEmbed',
  'Open Graph'
]

const isUpperCase = str =>
  str.split('').every(letter => letter === letter.toUpperCase())

// https://docs.microsoft.com/en-us/style-guide/capitalization
export default (str, exclude = []) => {
  // all minus unless the first world
  let title = capitalize(str)

  // respect special words
  special.concat(exclude).forEach(word => {
    const re = new RegExp(`\\b(?:${word})\\b`, 'gi')
    if (re.test(str)) {
      title = title.replace(re, word)
    }
  })

  // respect uppercase words
  title = title.split(' ')
  str.split(' ').forEach((word, index) => {
    if (isUpperCase(word)) {
      title[index] = word
    }
  })
  title = title.join(' ')

  return title
}
