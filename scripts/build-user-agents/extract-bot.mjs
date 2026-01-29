const EXCLUDED_PRODUCTS = new Set([
  // Browsers / engines
  'mozilla',
  'applewebkit',
  'webkit',
  'gecko',
  'chrome',
  'safari',
  'firefox',
  'edge',
  'edg',
  'opr',
  'opera',

  // Platforms / runtimes
  'windows',
  'linux',
  'android',
  'iphone',
  'ipad',
  'macintosh'
])

export function extractBotName (ua) {
  // Match multi-word bot name with version at start (e.g., "2ip bot/1.1 (+http://...)")
  const multiWordBotStart = ua.match(
    /^([A-Za-z0-9][A-Za-z0-9 ]*[A-Za-z])\/[\d.]+/
  )
  if (multiWordBotStart) {
    const name = multiWordBotStart[1].toLowerCase()
    const firstWord = name.split(' ')[0]
    if (!EXCLUDED_PRODUCTS.has(firstWord)) {
      return name
    }
  }

  // Look inside parentheses for bot names with version (e.g., "compatible; Gluten Free Crawler/1.0")
  const parenContent = ua.match(/\(([^)]+)\)/)
  if (parenContent) {
    const inside = parenContent[1]

    // Match multi-word bot name with version (e.g., "Gluten Free Crawler/1.0")
    const multiWordBot = inside.match(
      /;\s*([A-Za-z0-9][A-Za-z0-9 ]*[A-Za-z])\/[\d.]+/
    )
    if (multiWordBot) {
      const name = multiWordBot[1].toLowerCase()
      if (!EXCLUDED_PRODUCTS.has(name.split(' ')[0])) {
        return name
      }
    }

    // Match snake_case identifiers at start or after semicolon (e.g., "ias_crawler; ...")
    // Exclude URLs by checking it's not preceded by / or .
    const snakeCaseIdentifier = inside.match(
      /(?:^|;\s*)([a-z][a-z0-9]*_[a-z0-9_]+)\b/
    )
    if (snakeCaseIdentifier) {
      return snakeCaseIdentifier[1]
    }
  }

  // Match products with version outside parens (e.g., Googlebot/2.1)
  const products = [...ua.matchAll(/\b([A-Za-z][A-Za-z0-9._-]*)\/([\d.]+)/g)]
    .map(m => ({
      name: m[1],
      version: m[2],
      lname: m[1].toLowerCase()
    }))
    .filter(p => !EXCLUDED_PRODUCTS.has(p.lname))

  if (products.length > 0) {
    // Prefer longer / more specific names (ChatGPT-User > Bot)
    products.sort((a, b) => b.name.length - a.name.length)
    return products[0].lname
  }

  // Fallback: first word before any URL or parenthesis (e.g., "YouBot (+http://...)" → "youbot")
  const firstWordMatch = ua.match(/^([A-Za-z][A-Za-z0-9._-]*)(?:\s|$|\s*\()/)
  if (firstWordMatch) {
    const name = firstWordMatch[1].toLowerCase()
    if (!EXCLUDED_PRODUCTS.has(name)) {
      return name
    }
  }

  return null
}
