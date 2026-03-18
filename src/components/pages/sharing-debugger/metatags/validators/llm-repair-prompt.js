import { buildFixSnippet } from './fix-snippet'

const VALIDATOR_STATUS_ERROR = 'ERROR'

const toSeverity = status =>
  status === VALIDATOR_STATUS_ERROR ? 'error' : 'warning'

const getPageLabel = metadata => metadata?.url || 'this page'

const getIssueTitle = issue => {
  switch (issue.name) {
    case 'title':
      return issue.isNullable
        ? 'Missing social title'
        : 'Title may be truncated in sharing cards'
    case 'description':
      return issue.isNullable
        ? 'Missing social description'
        : 'Description may be too short or too long'
    case 'image':
      return issue.isNullable
        ? 'Missing preview image'
        : 'Preview image needs optimization'
    case 'logo':
      return issue.isNullable
        ? 'Missing favicon / site icon'
        : 'Logo is too small'
    case 'url':
      return 'Missing canonical sharing URL'
    case 'publisher':
      return 'Missing brand / publisher name'
    case 'author':
      return 'Missing author metadata'
    case 'locale':
      return 'Locale format needs correction'
    case 'date':
      return 'Published date format needs correction'
    default:
      return `Fix ${issue.name} metadata`
  }
}

const getIssueDetails = issue => {
  if (issue.isNullable) {
    switch (issue.name) {
      case 'image':
        return 'No social image was detected in normalized metadata.'
      case 'logo':
        return 'No favicon or site logo was detected in normalized metadata.'
      default:
        return `No ${issue.name} value was detected in normalized metadata.`
    }
  }

  const resume = issue.resume ? `Detected ${issue.resume}.` : ''

  switch (issue.name) {
    case 'title':
      return `Detected title length is ${
        issue.value?.length || 0
      } characters. ${resume}`.trim()
    case 'description':
      return `Detected description length is ${
        issue.value?.length || 0
      } characters. ${resume}`.trim()
    case 'image':
      return `Detected image summary is ${issue.resume || 'unknown'}.`
    case 'logo':
      return `Detected logo summary is ${issue.resume || 'unknown'}.`
    case 'locale':
      return `Detected locale value is "${issue.value}".`
    case 'date':
      return `Detected date value is "${issue.value}".`
    default:
      return resume || `Detected ${issue.name} value is "${issue.value}".`
  }
}

const getRecommendation = issue => {
  if (issue.isNullable) {
    switch (issue.name) {
      case 'title':
        return 'Add a real final social title and keep <title>, og:title, and twitter:title aligned.'
      case 'description':
        return 'Add a real final social description and keep description, og:description, and twitter:description aligned.'
      case 'image':
        return 'Add a real social image URL, ideally around 1200x630, and use Twitter summary_large_image.'
      case 'logo':
        return 'Add real favicon assets so browsers and sharing surfaces can identify the site.'
      case 'url':
        return 'Add the real canonical URL and reuse it in og:url.'
      case 'publisher':
        return 'Add the real brand or publisher name.'
      case 'author':
        return 'Add the real author name when this page is an article or blog post.'
      case 'locale':
        return 'Add a valid locale code such as en or en-US.'
      case 'date':
        return 'Add a real publication date in ISO 8601 format.'
      default:
        return issue.description || `Add the missing ${issue.name} metadata.`
    }
  }

  switch (issue.name) {
    case 'title':
      return 'Aim for roughly 30-70 characters for stronger social snippets and keep title tags aligned.'
    case 'description':
      return 'Aim for roughly 90-155 characters so the description is informative without heavy truncation.'
    case 'image':
      return 'Use a real image URL and confirm the file is suitable for social cards, ideally around 1200x630 and reasonably compressed.'
    case 'logo':
      return 'Use a sharper favicon or logo asset, ideally larger than 100x100, so the brand icon stays crisp.'
    case 'locale':
      return 'Use a valid ISO 639-1 locale and keep html lang / og:locale consistent.'
    case 'date':
      return 'Use a valid ISO 8601 date so crawlers can parse freshness correctly.'
    default:
      return issue.description || `Improve the ${issue.name} metadata value.`
  }
}

const getSuggestedSnippet = ({ issue, metadata }) => {
  return buildFixSnippet({ issues: [issue], metadata })
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('<!--'))
    .join('\n')
}

const getRequiredValues = issues => {
  const requiredValues = []

  if (issues.some(issue => issue.name === 'url')) {
    requiredValues.push('real canonical URL')
  }
  if (issues.some(issue => issue.name === 'title')) {
    requiredValues.push('final social title')
  }
  if (issues.some(issue => issue.name === 'description')) {
    requiredValues.push('final social description')
  }
  if (issues.some(issue => issue.name === 'image')) {
    requiredValues.push('real image URL (ideally around 1200x630)')
  }
  if (issues.some(issue => ['publisher', 'logo'].includes(issue.name))) {
    requiredValues.push('brand / publisher name')
  }
  if (issues.some(issue => issue.name === 'author')) {
    requiredValues.push('author name')
  }
  if (issues.some(issue => issue.name === 'locale')) {
    requiredValues.push('final locale code')
  }
  if (issues.some(issue => issue.name === 'date')) {
    requiredValues.push('final publication date')
  }

  return requiredValues
}

const formatCurrentValue = value => {
  if (value === null || value === undefined || value === '') return 'missing'
  return String(value)
}

export const buildLlmRepairPrompt = ({ issues = [], metadata = {} } = {}) => {
  if (issues.length === 0) return ''

  const pageLabel = getPageLabel(metadata)
  const requiredValues = getRequiredValues(issues)

  const issueBlocks = issues
    .map((issue, index) => {
      const snippet = getSuggestedSnippet({ issue, metadata })

      return [
        `Issue ${index + 1}: ${getIssueTitle(issue)}`,
        `Severity: ${toSeverity(issue.status)}`,
        `Details: ${getIssueDetails(issue)}`,
        `Recommendation: ${getRecommendation(issue)}`,
        'Suggested HTML snippet:',
        ...snippet.split('\n').map(line => `  ${line}`)
      ].join('\n')
    })
    .join('\n\n')

  const currentContext = [
    `Current normalized metadata for "${pageLabel}":`,
    `- title: ${formatCurrentValue(metadata.title)}`,
    `- description: ${formatCurrentValue(metadata.description)}`,
    `- url: ${formatCurrentValue(metadata.url)}`,
    `- image: ${formatCurrentValue(metadata.image?.url)}`,
    `- publisher: ${formatCurrentValue(metadata.publisher)}`,
    `- author: ${formatCurrentValue(metadata.author)}`,
    `- locale: ${formatCurrentValue(metadata.lang)}`,
    `- date: ${formatCurrentValue(metadata.date)}`
  ].join('\n')

  const requiredValuesText =
    requiredValues.length > 0
      ? requiredValues.join(', ')
      : 'any missing real values'

  return `You are an expert web metadata repair assistant. Help me fix social sharing metadata (Open Graph + Twitter tags) for "${pageLabel}".

MANDATORY RULES:
1) Ask permission before each step. Use this exact pattern: "Step X: <action>. May I continue?"
2) If any required value is unknown, stop and ask for it before editing.
3) Required real values when missing: ${requiredValuesText}.
4) Never invent production values. Use placeholders only until the user confirms real values.
5) For each fix, provide exact HTML tags and explain where to place them (usually inside <head>).
6) After each applied step, summarize what changed and ask permission for the next step.

Detected issues for "Sharing Checks":

${issueBlocks}

${currentContext}

Execution workflow:
Step 1) Restate the detected issues and ask for confirmation to start.
Step 2) Ask for any missing real inputs (URL, text, image, publisher, locale, or date) before editing.
Step 3) Propose the first fix only and request permission.
Step 4) Apply only that fix, then summarize what changed and ask permission for the next step.
Step 5) Repeat until every warning and error has been handled.
Step 6) Provide a final verification checklist for Open Graph, Twitter Card tags, title, description, image, canonical URL, favicon, locale, and article metadata if relevant.`
}
