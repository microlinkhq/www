import { system } from 'helpers'
import { style } from 'styled-system'

export const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = system(
  { as: 'svg' },
  { fill: 'currentColor' },
  'color',
  'space',
  'height',
  'width',
  transform
)

export default Svg
