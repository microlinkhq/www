import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'

import Text from './Text'

export const commonHeadingStyles = {
  letterSpacing: 1,
  lineHeight: 0,
  textAlign: 'center',
  fontWeight: 'bold',
  overflowWrap: 'break-word'
}

const StyledHeading = styled(Text)(
  theme({
    ...commonHeadingStyles,
    textWrap: 'balance',
    fontSize: [4, 4, 5, 5]
  })
)

const Heading = ({ titleize, omitTitleize, ...props }) => (
  <StyledHeading as='h1' variant='gradient' {...props} />
)

export default Heading
