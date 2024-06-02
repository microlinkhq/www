import { compose, variant, typography } from '@techstack/styled-system'
import styled from 'styled-components'
import { theme } from 'theme'

import Box from './Box'

const Text = styled(Box).withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop)
})(
  compose(typography, variant({ key: 'text' })),
  theme({
    fontWeight: 'normal',
    letterSpacing: 0,
    fontFamily: 'sans',
    m: 0,
    lineHeight: 3,
    fontSize: [1, 1, 2, 2]
  })
)

export default Text
