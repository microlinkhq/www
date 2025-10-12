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

export const prettier = (code, language = 'js') => {
  // Handle different formatting types
  if (language === 'headers') {
    return formatHeaders(code)
  }

  // For now, return code as-is to avoid complexity
  // Dynamic prettier loading will be handled by webpack code splitting
  try {
    return code
  } catch (error) {
    if (error.name !== 'SyntaxError') console.error('[prettier]', error)
    return code
  }
}
