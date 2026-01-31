import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'

import Text from './Text'

export const commonHeadingStyles = {
  letterSpacing: 1,
  lineHeight: 0,
  textAlign: 'center',
  fontWeight: 'bold'
}

const StyledHeading = styled(Text)(
  theme({
    ...commonHeadingStyles,
    fontSize: [3, 5]
  })
)

const Heading = props => <StyledHeading as='h1' variant='gradient' {...props} />

export default Heading
