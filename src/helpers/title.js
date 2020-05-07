import capitalize from 'microsoft-capitalize'

const special = [
  'apiKey',
  'APIs',
  'background',
  'browser',
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
  'timeout',
  'type',
  'TypeScript',
  'url',
  'waitFor',
  'waitUntil',
  'width',
  'WordPress'
]

export default (str, exceptionsg = []) =>
  capitalize(str, special.concat(exceptions))
