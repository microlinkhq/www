import system from 'system-components'
import { style } from 'styled-system'

export const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = system(
  { is: 'svg' },
  { fill: 'currentColor' },
  'color',
  'space',
  'height',
  'width',
  transform
)

export default Svg
