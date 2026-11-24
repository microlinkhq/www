export const swapLayerState = (layer, { current, previous }) => {
  if (layer === current) return previous === null ? 'shown' : 'in'
  return layer === previous ? 'out' : 'hidden'
}

export const isLayerHidden = state => state === 'hidden' || state === 'out'

export const accountLayer = mode =>
  mode === 'sign-in' ? 'sign-in' : 'dashboard'
