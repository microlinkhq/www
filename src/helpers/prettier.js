// Lazy load prettier for better bundle optimization
let prettierPromise = null

const loadPrettier = () => {
  if (!prettierPromise) {
    prettierPromise = Promise.all([
      import('prettier/standalone'),
      import('prettier/parser-babel')
    ]).then(([{ format }, babel]) => ({
      format,
      babel: babel.default || babel
    }))
  }
  return prettierPromise
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

const formatHeaders = content => {
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

export const prettier = async (code, language = 'js') => {
  // Handle headers formatting (no prettier needed)
  if (language === 'headers') {
    return formatHeaders(code)
  }

  // For JS/JSON, use lazy-loaded prettier
  try {
    const { format, babel } = await loadPrettier()

    let opts = PRETTIER_CONFIG
    if (language === 'js' || language === 'jsx') {
      opts = { ...PRETTIER_CONFIG, ...getJsOpts(babel) }
    } else if (language === 'json') {
      opts = { ...PRETTIER_CONFIG, ...getJsonOpts(babel) }
    }

    const formatted = format(code, opts)
    return formatted.replace(';<', '<')
  } catch (error) {
    if (error.name !== 'SyntaxError') console.error('[prettier]', error)
    return code
  }
}
