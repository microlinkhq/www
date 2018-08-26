import get from './get'

export const ASSETS_PROPS = ['logo', 'screenshot', 'video', 'image']

export default (propName, payload) => {
  const propValue = get(payload, propName)

  const publisher = get(payload, 'publisher')
  if (!publisher) throw new TypeError('publisher is empty.')

  const type = get(propValue, 'type')
  if (!type) throw new TypeError('type is empty.')

  const dirname = `/card/${publisher.toLowerCase()}`
  const basename = `${propName}.${type}`
  const filepath = `${dirname}/${basename}`

  return { dirname, basename, filepath }
}
