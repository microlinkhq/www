const BLOCK_TAGS = new Set(['div', 'p', 'ul', 'ol', 'li'])

const isBlock = node =>
  BLOCK_TAGS.has(node.type) || BLOCK_TAGS.has(node.props?.as)

const walk = node => {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(walk).join('')
  if (node.props !== undefined) {
    const inner = walk(node.props.children)
    return isBlock(node) ? ` ${inner} ` : inner
  }
  return ''
}

const toPlainText = node => walk(node).replace(/\s+/g, ' ').trim()

export default toPlainText
