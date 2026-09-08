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

export const toArgv = line => {
  const tokens = tokenize(line.trim())
  const start =
    tokens[0] === 'microlink' || tokens[0] === 'microlink.io' ? 1 : 0
  const rest = tokens.slice(start)
  if (rest.at(-2) === '|' && rest.at(-1) === 'less') {
    return rest.slice(0, -2)
  }
  return rest
}
