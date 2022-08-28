import prettierStandalone from 'prettier/standalone'
import prettierParserHtml from 'prettier/parser-html'
import prettierParserGraphql from 'prettier/parser-graphql'
import prettierParserMarkdown from 'prettier/parser-markdown'
import parserBabel from 'prettier/parser-babel'

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
  plugins: [parserBabel]
}

const JSON_OPTS = {
  parser: 'json',
  plugins: [parserBabel]
}

const HTML_OPTS = {
  parser: 'html',
  plugins: [prettierParserHtml]
}

const GRAPHQL_OPTS = {
  parser: 'graphql',
  plugins: [prettierParserGraphql]
}

const MARKDOWN_OPTS = {
  parser: 'markdown',
  plugins: [prettierParserMarkdown]
}

export const serializeFmt = (props, { quotes = true } = {}) => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}=`
    const value = (() => {
      if (rawValue === true) return ''

      if (Array.isArray(rawValue)) {
        return `{[${rawValue.map(
          value => `${quotes ? `'${value}'` : value}`
        )}]}`
      }

      return `${quotes ? `'${rawValue}'` : rawValue}`
    })()

    return `${acc}${key}${value} `
  }, '')
}

export const serializeObject = (props, { quotes = true } = {}) => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}: `
    const value =
      rawValue === true ? '' : `${quotes ? `'${rawValue}'` : rawValue}`
    const coma = acc === '' ? '' : ', '
    return `${acc}${coma}${key}${value}`
  }, '')
}

const prettier = (code, opts) => {
  try {
    return prettierStandalone
      .format(code, { ...PRETTIER_CONFIG, ...opts })
      .replace(';<', '<')
  } catch (error) {
    if (error.name !== 'SyntaxError') console.error('[prettier]', error)
    return code
  }
}

prettier.jsx = prettier.js = (code, opts) =>
  prettier(code, { ...JS_OPTS, ...opts })
prettier.html = (code, opts) => prettier(code, { ...HTML_OPTS, ...opts })
prettier.graphql = (code, opts) => prettier(code, { ...GRAPHQL_OPTS, ...opts })
prettier.md = prettier.markdown = (code, opts) =>
  prettier(code, { ...MARKDOWN_OPTS, ...opts })
prettier.json = (code, opts) => prettier(code, { ...JSON_OPTS, ...opts })

export default prettier
