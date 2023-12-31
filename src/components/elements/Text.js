import { variant, typography } from '@techstack/styled-system'
import styled from 'styled-components'

import Box from './Box'

const Text = styled(Box)(typography, variant({ key: 'text' }))

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
