import {
  space,
  color,
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
import propTypes from '@styled-system/prop-types'

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
  lineHeight,
  height,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  variant({ key: 'boxStyles' })
)

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.textAlign,
  ...propTypes.maxWidth,
  ...propTypes.boxShadow,
  ...propTypes.borders,
  ...propTypes.display,
  ...propTypes.width,
  ...propTypes.height,
  ...propTypes.fontSize,
  ...propTypes.color,
  ...propTypes.flex,
  ...propTypes.order,
  ...propTypes.alignSelf,
  ...propTypes.lineHeight
}

export default Box
