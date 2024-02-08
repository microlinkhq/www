import { compose, variant, typography } from '@techstack/styled-system'
import { themeCss, defaultProps } from 'theme'
import styled from 'styled-components'

import Box from './Box'

const Text = styled(Box).attrs(defaultProps({ as: 'div' }))(
  compose(typography, variant({ key: 'text' })),
  themeCss({
    fontWeight: 'normal',
    letterSpacing: 0,
    fontFamily: 'sans',
    m: 0,
    lineHeight: 3,
    fontSize: [1, 1, 2, 2]
  })
)

export default Text
