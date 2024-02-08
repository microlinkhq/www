import { compose, color, space, layout, system } from '@techstack/styled-system'
import styled from 'styled-components'

const transform = system({
  prop: 'transform',
  cssProperty: 'transform'
})

const Svg = styled('svg')(compose(color, space, layout, transform))

Svg.defaultProps = {
  fill: 'currentColor'
}

export default Svg
