const TYPE_TOKEN = /<Type\s+children\s*=\s*(['"])(.*?)\1\s*\/>/g

const FRONTMATTER_FIELD = field =>
  new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm')

const unquote = value => value.replace(/^(['"])([\s\S]*)\1$/, '$2')

const frontmatterOf = source => source.split(/^---$/m)[1] || ''

export const frontmatterField = (source, field) => {
  const match = frontmatterOf(source).match(FRONTMATTER_FIELD(field))
  return match ? unquote(match[1].trim()).replace(/''/g, "'") : ''
}

const lineStartingWith = (source, label) =>
  source
    .split('\n')
    .find(line => line.startsWith(`${label}:`))

const typeTokens = line => [...line.matchAll(TYPE_TOKEN)].map(([, , token]) => token)

export const parseTypes = source => {
  const line = lineStartingWith(source, 'Type')
  if (!line) return []
  return typeTokens(line).map(token => token.replace(/^<|>$/g, ''))
}

const NUMERIC = /^-?\d+(\.\d+)?$/

const parseLiteral = token => {
  if (token === 'undefined') return undefined
  if (token === 'true') return true
  if (token === 'false') return false
  if (NUMERIC.test(token)) return Number(token)
  return unquote(token)
}

export const parseDefault = source => {
  const line = lineStartingWith(source, 'Default')
  if (!line) return undefined
  const [token] = typeTokens(line)
  return token === undefined ? undefined : parseLiteral(token)
}

export const parameterName = title => title.split('›').map(part => part.trim()).join('.')

export const parseErrorCodes = source =>
  source
    .split('\n')
    .flatMap(line => {
      const match = line.match(/^##\s+([A-Z]{2,})\s*$/)
      return match ? match[1] : []
    })
    .sort()
