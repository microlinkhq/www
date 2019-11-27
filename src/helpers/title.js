import capitalize from 'lodash/capitalize'

const special = [
  'apiKey',
  'background',
  'browser',
  'cache',
  'click',
  'deviceScaleFactor',
  'disableAnimations',
  'fullPage',
  'GitHub',
  'hasTouch',
  'height',
  'hide',
  'isLandscape',
  'isMobile',
  'JavaScript',
  'Node.js',
  'omitBackground',
  'options',
  'package.json',
  'quality',
  'retry',
  'scrollTo',
  'timeout',
  'type',
  'TypeScript',
  'url',
  'waitFor',
  'waitUntil',
  'width',
  'WordPress'
]

const isUpperCase = str =>
  str.split('').every(letter => letter === letter.toUpperCase())

export default (str, exclude = []) => {
  // all minus unless the first world
  let title = capitalize(str)

  // reset some words
  exclude.concat(special).forEach(word => {
    const re = new RegExp(`\\b(?:${word})\\b`, 'gi')
    if (re.test(str)) title = title.replace(re, word)
  })

  // respect uppercase words
  title = title.split(' ')
  str.split(' ').forEach((word, index) => {
    if (isUpperCase(word)) title[index] = word
  })
  title = title.join(' ')

  return title
}
