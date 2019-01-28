import { color, space, height, width, style } from 'styled-system'
import styled from 'styled-components'

const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = styled('svg')(color, space, height, width, transform)

Svg.defaultProps = {
  fill: 'currentColor'
}

Svg.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...color.propTypes
}

export default Svg
