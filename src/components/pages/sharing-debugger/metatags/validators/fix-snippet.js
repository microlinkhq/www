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

const addUnique = (lines, ...entries) => {
  entries.forEach(entry => {
    if (!lines.includes(entry)) lines.push(entry)
  })
}

const getValue = (placeholders, name, value) =>
  value || placeholders[name] || ''

export const buildFixSnippet = ({ issues = [], metadata = {} } = {}) => {
  const placeholders = buildPlaceholders(metadata)
  const twitterCardValue = metadata?.image?.url
    ? 'summary_large_image'
    : 'summary'

  const issueFixes = issues.reduce(
    (groups, issue) => {
      const rawValue = getValue(placeholders, issue.name, issue.value)
      const safeValue = escapeHtml(rawValue)

      switch (issue.name) {
        case 'title': {
          addUnique(groups.basic, `<title>${safeValue}</title>`)
          addUnique(
            groups.openGraph,
            `<meta property="og:title" content="${safeValue}">`
          )
          addUnique(
            groups.twitter,
            `<meta name="twitter:card" content="${twitterCardValue}">`,
            `<meta name="twitter:title" content="${safeValue}">`
          )
          break
        }
        case 'description': {
          if (!issue.isNullable) {
            addUnique(
              groups.search,
              '<!-- Aim for 90-155 characters to optimize the preview -->'
            )
          }
          addUnique(
            groups.search,
            `<meta name="description" content="${safeValue}">`
          )
          addUnique(
            groups.openGraph,
            `<meta property="og:description" content="${safeValue}">`
          )
          addUnique(
            groups.twitter,
            `<meta name="twitter:card" content="${twitterCardValue}">`,
            `<meta name="twitter:description" content="${safeValue}">`
          )
          break
        }
        case 'image': {
          addUnique(
            groups.openGraph,
            `<meta property="og:image" content="${safeValue}">`
          )
          addUnique(
            groups.twitter,
            '<meta name="twitter:card" content="summary_large_image">',
            `<meta name="twitter:image" content="${safeValue}">`
          )
          break
        }
        case 'logo': {
          if (!issue.isNullable) {
            addUnique(
              groups.favicon,
              '<!-- Use images at least 100x100px for better quality -->'
            )
          }
          addUnique(
            groups.favicon,
            '<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">',
            '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
            '<link rel="shortcut icon" href="/favicon.ico">',
            '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
            '<link rel="manifest" href="/site.webmanifest">'
          )
          break
        }
        case 'url': {
          addUnique(groups.search, `<link rel="canonical" href="${safeValue}">`)
          addUnique(
            groups.openGraph,
            `<meta property="og:url" content="${safeValue}">`
          )
          break
        }
        case 'publisher': {
          addUnique(
            groups.search,
            `<meta name="publisher" content="${safeValue}">`
          )
          addUnique(
            groups.openGraph,
            `<meta property="og:site_name" content="${safeValue}">`
          )
          break
        }
        case 'author': {
          addUnique(
            groups.search,
            `<meta name="author" content="${safeValue}">`
          )
          addUnique(
            groups.openGraph,
            `<meta property="article:author" content="${safeValue}">`
          )
          break
        }
        case 'locale': {
          const rawLocaleValue = String(rawValue || '').trim()
          const htmlLang = rawLocaleValue.split(/[-_]/)[0]
          const ogLocale = rawLocaleValue.replace('-', '_')

          addUnique(groups.basic, `<!-- <html lang="${htmlLang}"> -->`)
          addUnique(
            groups.openGraph,
            `<meta property="og:locale" content="${ogLocale}">`
          )
          break
        }
        case 'date': {
          addUnique(
            groups.openGraph,
            `<meta property="article:published_time" content="${safeValue}">`
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
