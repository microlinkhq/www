import {
  space,
  color,
  width,
  flex,
  order,
  alignSelf,
  fontSize,
  variant,
  textAlign,
  maxWidth,
  boxShadow,
  display
} from 'styled-system'

import styled from 'styled-components'

const Box = styled('div')(
  {
    boxSizing: 'border-box'
  },
  space,
  textAlign,
  maxWidth,
  boxShadow,
  display,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  variant({ key: 'boxStyle' }),
  props => props.css
)

Box.propTypes = {
  ...space.propTypes,
  ...textAlign.propTypes,
  ...maxWidth.propTypes,
  ...boxShadow.propTypes,
  ...display.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes
}

Box.displayName = 'Box'

export default Box
