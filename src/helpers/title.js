import capitalize from 'microsoft-capitalize'

const special = [
  'apiKey',
  'APIs',
  'background',
  'browser',
  'cache',
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
  'Lighthouse',
  'Ligthouse Viewer',
  'Microlink',
  'Node.js',
  'oEmbed',
  'omitBackground',
  'Open Graph',
  'options',
  'package.json',
  'quality',
  'retry',
  'scroll',
  'SDK',
  'timeout',
  'type',
  'TypeScript',
  'url',
  'waitFor',
  'waitUntil',
  'width',
  'WordPress'
]

export default (str, exceptions = []) =>
  capitalize(str, special.concat(exceptions))
