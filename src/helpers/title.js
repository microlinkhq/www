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
  'Edge Node Cache',
  'fullPage',
  'GitHub',
  'hasTouch',
  'height',
  'isLandscape',
  'isMobile',
  'JavaScript',
  'Lighthouse Viewer',
  'Lighthouse',
  'Microlink Cards',
  'Microlink',
  'Node.js',
  'oEmbed',
  'omitBackground',
  'Open Graph',
  'options',
  'package.json',
  'PDFs',
  'quality',
  'retry',
  'scroll',
  'SDK',
  'staleTtl',
  'timeout',
  'type',
  'TypeScript',
  'Unified Cache',
  'url',
  'URLs',
  'waitFor',
  'waitUntil',
  'width',
  'WordPress'
]

const title = (str, exceptions = []) =>
  capitalize(str, special.concat(exceptions))

export default title
