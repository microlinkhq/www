import title from 'title'

const special = [
  'apiKey',
  'media',
  'direction',
  'size',
  'loop',
  'url',
  'controls',
  'muted',
  'autoPlay',
  'setData',
  'contrast',
  'SDK',
  'CLI',
  'API',
  'HTTP',
  'HTTPS',
  'JSX',
  'DNS',
  'URL',
  'CI',
  'CDN',
  'package.json',
  'GitHub',
  'CSS',
  'JS',
  'JavaScript',
  'TypeScript',
  'HTML',
  'WordPress',
  'JavaScript',
  'Node.js'
]

export default str => title(str, { special })
