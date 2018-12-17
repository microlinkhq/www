import {
  space,
  color,
  borderRadius,
  borderColor,
  borders,
  lineHeight,
  width,
  flex,
  order,
  alignSelf,
  fontSize,
  variant,
  textAlign,
  maxWidth,
  boxShadow,
  display,
  height
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
  borders,
  borderRadius,
  lineHeight,
  borderColor,
  height,
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
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...borders.propTypes,
  ...display.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...lineHeight.propTypes
}

Box.displayName = 'Box'

export default Box
