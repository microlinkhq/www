import { compose, color, space, layout, system } from '@techstack/styled-system'
import styled from 'styled-components'
import React from 'react'

const transform = system({
  prop: 'transform',
  cssProperty: 'transform'
})

const StyledSvg = styled('svg')(compose(color, space, layout, transform))

const Svg = props => <StyledSvg fill='currentColor' {...props} />

export default Svg
