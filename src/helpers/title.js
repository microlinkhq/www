import title from 'title'

const special = [
  'API',
  'CDN',
  'CI',
  'CLI',
  'options',
  'cache',
  'retry',
  'timeout',
  'apiKey',
  'CSS',
  'url',
  'DNS',
  'GitHub',
  'HTML',
  'HTTP',
  'HTTPS',
  'JavaScript',
  'JS',
  'JSX',
  'Node.js',
  'package.json',
  'SDK',
  'TypeScript',
  'WordPress'
]

export default str => title(str, { special })
