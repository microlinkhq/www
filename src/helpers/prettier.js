// Dynamic imports for better tree-shaking and code splitting
let prettierFormat = null
let babelParser = null

const loadPrettier = async () => {
  if (!prettierFormat || !babelParser) {
    const [{ format }, babel] = await Promise.all([
      import('prettier/standalone'),
      import('prettier/parser-babel')
    ])
    prettierFormat = format
    babelParser = babel
  }
  return { format: prettierFormat, babel: babelParser }
}

/**
 * https://prettier.io/docs/en/options.html
 */
const PRETTIER_CONFIG = {
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none'
}

const getJsOpts = babel => ({
  parser: 'babel',
  plugins: [babel]
})

const getJsonOpts = babel => ({
  parser: 'json',
  plugins: [babel]
})

/**
 * It turns an JS object:
 *
 * { foo: 'bar', apiKey: true }
 *
 * into fmt representation:
 *
 * `foo='bar' apiKey`
 *
 */
export const serializeFmt = props => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}=`
    const value = (() => {
      if (rawValue === true) return ''
      if (Array.isArray(rawValue)) {
        return `{[${rawValue.map(serializePrimitive).join(', ')}]}`
      }
      return serializeValue(rawValue)
    })()

    return `${acc}${key}${value} `
  }, '')
}

const serializePrimitive = value =>
  typeof value === 'object'
    ? `{ ${serializeObject(value)} }`
    : serializeValue(value)

const serializeValue = value =>
  typeof value === 'number' ? `{${value}}` : `'${value}'`

const serializeObject = (props, { quotes = true } = {}) => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}: `
    const value =
      rawValue === true ? '' : `${quotes ? `'${rawValue}'` : rawValue}`
    const coma = acc === '' ? '' : ', '
    return `${acc}${coma}${key}${value}`
  }, '')
}

export const prettier = async (code, opts = {}) => {
  try {
    const { format } = await loadPrettier()
    const pretty = format(code, { ...PRETTIER_CONFIG, ...opts })
    return pretty.replace(';<', '<')
  } catch (error) {
    if (error.name !== 'SyntaxError') console.error('[prettier]', error)
    return code
  }
}

prettier.jsx = prettier.js = async (code, opts = {}) => {
  try {
    const { format, babel } = await loadPrettier()
    return prettier(code, { ...getJsOpts(babel), ...opts })
  } catch (error) {
    console.error('[prettier.js]', error)
    return code
  }
}

prettier.json = async (code, opts = {}) => {
  try {
    const { format, babel } = await loadPrettier()
    return prettier(code, { ...getJsonOpts(babel), ...opts })
  } catch (error) {
    console.error('[prettier.json]', error)
    return code
  }
}

prettier.headers = content => {
  return content
    .split('\n')
    .map(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex === -1) return line

      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim()

      // Find the longest key to align properly
      const allLines = content.split('\n')
      const maxKeyLength = Math.max(
        ...allLines
          .filter(l => l.includes(':'))
          .map(l => l.substring(0, l.indexOf(':')).trim().length)
      )

      return `${key.padEnd(maxKeyLength)} : ${value}`
    })
    .join('\n')
}
