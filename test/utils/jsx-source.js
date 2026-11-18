import fs from 'node:fs'
import path from 'node:path'

export const SRC = path.join(process.cwd(), 'src')

export const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'node_modules' ? [] : walk(full)
    }
    return /\.[jt]sx?$/.test(entry.name) ? [full] : []
  })

export const tagEndAt = (src, from) => {
  let depth = 0
  let quote = null
  const tmpl = []
  for (let i = from; i < src.length; i++) {
    const c = src[i]
    if (quote) {
      if (c === '\\') {
        i++
      } else if (quote === '`' && c === '$' && src[i + 1] === '{') {
        tmpl.push(depth)
        depth++
        quote = null
        i++
      } else if (c === quote) {
        quote = null
      }
      continue
    }
    if (c === '/' && src[i + 1] === '/') {
      const nl = src.indexOf('\n', i + 2)
      i = nl === -1 ? src.length : nl
      continue
    }
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2)
      i = end === -1 ? src.length : end + 1
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c
    } else if (c === '{' || c === '[' || c === '(') {
      depth++
    } else if (c === '}' || c === ']' || c === ')') {
      depth--
      if (tmpl.length && depth === tmpl[tmpl.length - 1]) {
        tmpl.pop()
        quote = '`'
      }
    } else if (c === '>' && depth === 0) {
      return i
    }
  }
  return -1
}

export const lineAt = (src, index) => src.slice(0, index).split('\n').length

export const relative = file => path.relative(process.cwd(), file)

export const elementsOf = (src, name) => {
  const open = new RegExp(`<${name}(?=[\\s/>])`, 'g')
  const elements = []
  let match
  while ((match = open.exec(src))) {
    const end = tagEndAt(src, open.lastIndex)
    if (end === -1) break
    const openingTag = src.slice(match.index, end + 1)
    const selfClosing = openingTag.endsWith('/>')
    const body = selfClosing ? '' : bodyOf(src, name, end + 1)
    elements.push({ index: match.index, openingTag, body })
    open.lastIndex = end + 1
  }
  return elements
}

const bodyOf = (src, name, from) => {
  const tag = new RegExp(`<${name}(?=[\\s/>])|</${name}>`, 'g')
  tag.lastIndex = from
  let depth = 1
  let match
  while ((match = tag.exec(src))) {
    if (match[0].startsWith('</')) {
      depth--
      if (depth === 0) return src.slice(from, match.index)
    } else {
      const end = tagEndAt(src, tag.lastIndex)
      if (end === -1) return src.slice(from)
      if (!src.slice(match.index, end + 1).endsWith('/>')) depth++
      tag.lastIndex = end + 1
    }
  }
  return src.slice(from)
}
