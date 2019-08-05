import { compose, color, space, height, width, style } from 'styled-system'
import propTypes from '@styled-system/prop-types'
import styled from 'styled-components'

const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = styled('svg')(
  compose(
    color,
    space,
    height,
    width,
    transform
  )
)

Svg.defaultProps = {
  fill: 'currentColor'
}

Svg.propTypes = {
  ...propTypes.space,
  ...propTypes.width,
  ...propTypes.height,
  ...propTypes.color
}

export default Svg
