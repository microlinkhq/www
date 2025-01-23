import { format } from 'prettier/standalone'
import babel from 'prettier/parser-babel'

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

const JS_OPTS = {
  parser: 'babel',
  plugins: [babel]
}

const JSON_OPTS = {
  parser: 'json',
  plugins: [babel]
}

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

export const prettier = (code, opts) => {
  try {
    const pretty = format(code, { ...PRETTIER_CONFIG, ...opts })
    return pretty.replace(';<', '<')
  } catch (error) {
    if (error.name !== 'SyntaxError') console.error('[prettier]', error)
    return code
  }
}

prettier.jsx = prettier.js = (code, opts) =>
  prettier(code, { ...JS_OPTS, ...opts })

prettier.json = (code, opts) => prettier(code, { ...JSON_OPTS, ...opts })
