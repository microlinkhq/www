const createNode = dataset => ({
  dataset,
  attributes: {},
  textContent: '',
  setAttribute (name, value) {
    this.attributes[name] = String(value)
  },
  removeAttribute (name) {
    delete this.attributes[name]
  }
})

const SINGLE = /^\[data-([a-z-]+)(?:="([^"]+)")?\]$/

const toCamel = name =>
  name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

export const createFakeFigureRoot = html => {
  const nodes = new Map()
  const lists = new Map()

  const valuesOf = name =>
    [...html.matchAll(new RegExp(`data-${name}(?:="([^"]*)")?`, 'g'))].map(
      match => match[1] ?? ''
    )

  const nodeFor = (name, value) => {
    const key = `${name}=${value}`
    if (!nodes.has(key)) nodes.set(key, createNode({ [toCamel(name)]: value }))
    return nodes.get(key)
  }

  return {
    querySelector (selector) {
      const [, name, value = ''] = selector.match(SINGLE)
      return valuesOf(name).includes(value) ? nodeFor(name, value) : null
    },
    querySelectorAll (selector) {
      if (!lists.has(selector)) {
        const [, name] = selector.match(SINGLE)
        lists.set(
          selector,
          valuesOf(name).map(value => nodeFor(name, value))
        )
      }
      return lists.get(selector)
    }
  }
}
