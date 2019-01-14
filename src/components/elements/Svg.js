import { color, space, height, width, style } from 'styled-system'
import styled from 'styled-components'

const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = styled('svg')(
  { as: 'svg', fill: 'currentColor' },
  color,
  space,
  height,
  width,
  transform
)

Svg.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...color.propTypes
}

export default Svg
