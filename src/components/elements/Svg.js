import system from 'system-components'
import { responsiveStyle } from 'styled-system'

export const transform = responsiveStyle({
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
