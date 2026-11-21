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

  const parsed = selector => {
    const match = selector.match(SINGLE)
    return { name: match[1], value: match[2] }
  }

  return {
    querySelector (selector) {
      const { name, value } = parsed(selector)
      const values = valuesOf(name)
      if (value === undefined) { return values.length ? nodeFor(name, values[0]) : null }
      return values.includes(value) ? nodeFor(name, value) : null
    },
    querySelectorAll (selector) {
      if (!lists.has(selector)) {
        const { name, value } = parsed(selector)
        lists.set(
          selector,
          valuesOf(name)
            .filter(item => value === undefined || item === value)
            .map(item => nodeFor(name, item))
        )
      }
      return lists.get(selector)
    }
  }
}
