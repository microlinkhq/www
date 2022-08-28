import {
  compose,
  variant,
  fontFamily,
  fontWeight,
  letterSpacing
} from 'styled-system'

import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'

import Box from './Box'

const Text = styled(Box)(
  compose(fontFamily, fontWeight, letterSpacing, variant({ key: 'textStyles' }))
)

Text.propTypes = {
  ...Box.propTypes,
  ...propTypes.fontFamily,
  ...propTypes.fontWeight,
  ...propTypes.letterSpacing
}

Text.defaultProps = {
  fontWeight: 'normal',
  letterSpacing: 0,
  as: 'div',
  fontFamily: 'sans',
  mt: 0,
  mb: 0,
  mr: 0,
  ml: 0,
  lineHeight: 3,
  fontSize: [1, 1, 2, 2]
}

export default Text
