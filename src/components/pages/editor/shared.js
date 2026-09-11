export const DOCS_HREF = '/docs/guides/function'

export const ENTRY_FILE = 'main.mjs'

export const editorTemplateHref = id => `/editor?template=${id}`

export const META = {
  title: 'Editor',
  description:
    'Write Microlink JavaScript in the browser and inspect the live API response. Debug Functions without curl or HTTPie.'
}

export const STRUCTURED = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Microlink Editor',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  url: 'https://microlink.io/editor',
  description: META.description
}

export const SDK_PREAMBLE = `import createClient from 'microlink.io'

const microlink = createClient()`

const indentFn = fn =>
  String(fn)
    .split('\n')
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join('\n')

export const toSdkSnippet = ({ url, fn, opts, log, method = 'function' }) => {
  const lines = [SDK_PREAMBLE, '']
  if (log) lines.push(`console.log(${JSON.stringify(log)})`, '')
  if (method !== 'function') {
    lines.push(`export default microlink.${method}('${url}')`, '')
    return lines.join('\n')
  }
  const extra = opts
    ? `,\n  ${typeof opts === 'string' ? opts : JSON.stringify(opts)}`
    : ''
  const body = indentFn(fn)
  if (!String(fn).includes('\n') && !opts) {
    lines.push(`export default microlink.function('${url}', ${fn})`, '')
    return lines.join('\n')
  }
  lines.push(
    `export default microlink.function(\n  '${url}',\n  ${body}${extra}\n)`,
    ''
  )
  return lines.join('\n')
}

export const filesFromEntry = code => ({ [ENTRY_FILE]: code })

export const isTypeScriptFile = name => /\.[cm]?tsx?$/.test(name)

export const editorLanguage = name =>
  isTypeScriptFile(name) ? 'typescript' : 'javascript'

export const nextFileName = files => {
  const used = new Set(Object.keys(files))
  const ext = Object.keys(files).some(isTypeScriptFile) ? 'ts' : 'mjs'
  const first = `helper.${ext}`
  if (!used.has(first)) return first
  let index = 2
  while (used.has(`helper-${index}.${ext}`)) index += 1
  return `helper-${index}.${ext}`
}

export const byteLength = value => {
  try {
    return new TextEncoder().encode(
      typeof value === 'string' ? value : JSON.stringify(value)
    ).length
  } catch (_) {
    return 0
  }
}

export const formatBytes = bytes => {
  if (bytes < 1024) return `${bytes} bytes`
  return `${(bytes / 1024).toFixed(1)} kB`
}
