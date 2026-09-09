const tokenize = line => {
  const tokens = []
  let current = ''
  let quote = ''
  for (const char of line) {
    if (quote) {
      if (char === quote) quote = ''
      else current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (/\s/.test(char)) {
      if (current) tokens.push(current)
      current = ''
      continue
    }
    current += char
  }
  if (current) tokens.push(current)
  return tokens
}

export const parseCommand = line => {
  const tokens = tokenize(line.trim())
  const start =
    tokens[0] === 'microlink' || tokens[0] === 'microlink.io' ? 1 : 0
  const rest = tokens.slice(start)
  const page = rest.at(-2) === '|' && rest.at(-1) === 'less'
  return { argv: page ? rest.slice(0, -2) : rest, page }
}

export const toArgv = line => parseCommand(line).argv
