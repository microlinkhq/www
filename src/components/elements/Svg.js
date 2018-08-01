import system from 'system-components'
import { responsiveStyle } from 'styled-system'

export const transform = responsiveStyle({
  prop: 'transform',
  cssProperty: 'transform'
})

export const width = responsiveStyle({
  prop: 'width',
  cssProperty: 'width',
  key: 'widths'
})

const Svg = system(
  { is: 'svg' },
  { fill: 'currentColor' },
  'color',
  'space',
  width,
  transform
)

export default Svg
