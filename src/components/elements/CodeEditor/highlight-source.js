import { highlight } from 'sugar-high'
import { lang } from 'sugar-high/lang'

const HTML_COMMENT_START = /^\s*<!--/
const HTML_COMMENT_END = /-->/

export const highlightSource = (source, language) => {
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
