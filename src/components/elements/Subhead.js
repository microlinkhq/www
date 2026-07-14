import styled from 'styled-components'
import { commonHeadingStyles } from './Heading'
import Text from './Text'
import { theme } from 'theme'
import React from 'react'

const StyledSubhead = styled(Text)(
  theme({
    ...commonHeadingStyles,
    textWrap: 'balance',
    fontSize: 4
  })
)

const Subhead = props => <StyledSubhead as='h2' {...props} />

export default Subhead
