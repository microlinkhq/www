const escapeHtml = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const getInputOrigin = metadata => {
  try {
    return metadata?.url ? new URL(metadata.url).origin : ''
  } catch (error) {
    return ''
  }
}

const getInputHost = metadata => {
  try {
    return metadata?.url ? new URL(metadata.url).hostname : ''
  } catch (error) {
    return ''
  }
}

const getDomainName = host =>
  host ? host.split('.').slice(0, -1).join('.') : ''

const buildPlaceholders = metadata => {
  const inputOrigin = getInputOrigin(metadata)
  const inputHost = getInputHost(metadata)
  const domainName = getDomainName(inputHost)
  const inputBaseUrl = inputOrigin || metadata?.url || ''
  const defaultDate = new Date().toISOString()

  return {
    title: 'Your page title',
    description: 'A clear description of the page content.',
    image: inputBaseUrl ? `${inputBaseUrl}/og-image.png` : '',
    logo: inputBaseUrl ? `${inputBaseUrl}/logo.png` : '',
    url: inputBaseUrl,
    publisher: metadata?.publisher || 'Your Brand',
    author: metadata?.author || domainName || 'Author Name',
    locale: metadata?.lang || 'en-US',
    date: defaultDate
  }
}

const addSection = (lines, title, content) => {
  if (!content.length) return
  if (lines.length) lines.push('')
  lines.push(`<!-- ${title} -->`, ...content)
}

const getValue = (placeholders, name, value) =>
  value || placeholders[name] || ''

export const buildFixSnippet = ({ issues = [], metadata = {} } = {}) => {
  const placeholders = buildPlaceholders(metadata)
  const missingIssues = issues.filter(issue => issue.isNullable)

  const issueFixes = missingIssues.reduce(
    (groups, issue) => {
      const rawValue = getValue(placeholders, issue.name, issue.value)
      const safeValue = escapeHtml(rawValue)

      switch (issue.name) {
        case 'title': {
          groups.basic.push(`<title>${safeValue}</title>`)
          groups.openGraph.push(
            `<meta property="og:title" content="${safeValue}">`
          )
          groups.twitter.push(
            `<meta name="twitter:title" content="${safeValue}">`
          )
          break
        }
        case 'description': {
          groups.search.push(`<meta name="description" content="${safeValue}">`)
          groups.openGraph.push(
            `<meta property="og:description" content="${safeValue}">`
          )
          groups.twitter.push(
            `<meta name="twitter:description" content="${safeValue}">`
          )
          break
        }
        case 'image': {
          groups.search.push(`<meta name="image" content="${safeValue}">`)
          groups.schema.push(`<meta itemprop="image" content="${safeValue}">`)
          groups.openGraph.push(
            `<meta property="og:image" content="${safeValue}">`
          )
          groups.twitter.push(
            `<meta name="twitter:image" content="${safeValue}">`
          )
          break
        }
        case 'logo': {
          groups.openGraph.push(
            `<meta property="og:logo" content="${safeValue}">`
          )
          groups.favicon.push(
            '<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">',
            '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
            '<link rel="shortcut icon" href="/favicon.ico">',
            '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
            '<link rel="manifest" href="/site.webmanifest">'
          )
          break
        }
        case 'url': {
          groups.search.push(`<link rel="canonical" href="${safeValue}">`)
          groups.openGraph.push(
            `<meta property="og:url" content="${safeValue}">`
          )
          break
        }
        case 'publisher': {
          groups.search.push(`<meta name="publisher" content="${safeValue}">`)
          groups.openGraph.push(
            `<meta property="og:site_name" content="${safeValue}">`
          )
          break
        }
        case 'author': {
          groups.search.push(`<meta name="author" content="${safeValue}">`)
          groups.schema.push(`<meta itemprop="author" content="${safeValue}">`)
          groups.openGraph.push(
            `<meta property="article:author" content="${safeValue}">`
          )
          break
        }
        case 'locale': {
          const htmlLang = safeValue.split(/[-_]/)[0]
          const ogLocale = safeValue.replace('-', '_')
          groups.basic.push(`<!-- <html lang="${htmlLang}"> -->`)
          groups.openGraph.push(
            `<meta property="og:locale" content="${ogLocale}">`
          )
          break
        }
        case 'date': {
          groups.openGraph.push(
            `<meta property="article:modified_time" content="${safeValue}">`
          )
          break
        }
        default:
          break
      }

      return groups
    },
    {
      basic: [],
      search: [],
      schema: [],
      twitter: [],
      openGraph: [],
      favicon: []
    }
  )

  const fixSnippetParts = []
  addSection(fixSnippetParts, 'Basic', issueFixes.basic)
  addSection(fixSnippetParts, 'Search Engine', issueFixes.search)
  addSection(fixSnippetParts, 'Schema.org for Google', issueFixes.schema)
  addSection(fixSnippetParts, 'X/Twitter', issueFixes.twitter)
  addSection(fixSnippetParts, 'Open Graph', issueFixes.openGraph)
  addSection(fixSnippetParts, 'Favicon', issueFixes.favicon)

  return fixSnippetParts.join('\n')
}
