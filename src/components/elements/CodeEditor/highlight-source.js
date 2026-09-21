import { highlight } from 'sugar-high'
import { lang } from 'sugar-high/lang'

export const toAlias = (name = '') => {
  name = name.toLowerCase()
  switch (name) {
    case 'vanilla':
      return 'html'
    case 'react':
    case 'angular':
    case 'typescript':
      return 'jsx'
    case 'vue':
    case 'svelte':
      return 'html'
    case 'jekyll':
      return 'markdown'
    case 'ruby':
      return 'python'
    case 'curl':
    case 'shell':
      return 'bash'
    case 'node.js':
    case 'javascript':
      return 'js'
    default:
      return name
  }
}

const HTML_COMMENT_START = /^\s*<!--/
const HTML_COMMENT_END = /-->/

const PLAINTEXT_LANGUAGES = new Set(['text', 'txt', 'plain', 'plaintext'])

const escapeHtml = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const highlightSource = (source, language) => {
  if (PLAINTEXT_LANGUAGES.has(language)) return escapeHtml(source)

  const options = { lang: lang(language) }

  if (language === 'bash') {
    let seenIdentifier = false
    options.markLine = () => {
      seenIdentifier = false
    }
    options.mark = token => {
      if (token.type !== 'identifier' || seenIdentifier) return
      if (token.value === '$') return
      token.className += ' sh__token--bash-command'
      seenIdentifier = true
    }
  }

  if (language === 'sfc') {
    let inComment = false
    options.markLine = line => {
      if (!inComment && !HTML_COMMENT_START.test(line.value)) return
      inComment = !HTML_COMMENT_END.test(line.value)
      line.className += ' sh__token--html-comment'
    }
  }

  return highlight(source, options)
}
