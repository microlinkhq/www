import {
  variant,
  lineHeight,
  fontFamily,
  fontWeight,
  textAlign,
  letterSpacing
} from 'styled-system'

import styled from 'styled-components'

import Box from '../Box'

const Text = styled(Box)(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  variant({ key: 'textStyle' }),
  props => props.css
)

Text.propTypes = {
  ...Box.propTypes,
  ...fontFamily.propTypes,
  ...fontWeight.propTypes,
  ...textAlign.propTypes,
  ...lineHeight.propTypes,
  ...letterSpacing.propTypes
}

Text.defaultProps = {
  ...Box.defaultProps,
  as: 'p',
  fontFamily: 'sans',
  m: 0,
  lineHeight: 3,
  fontSize: [1, 2]
}

export default Text
