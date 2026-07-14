import Text from 'components/elements/Text'
import { commonHeadingStyles } from 'components/elements/Heading'
import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'

const StyledSubtext = styled(Text)(
  theme({
    ...commonHeadingStyles,
    textWrap: 'balance',
    lineHeight: 1,
    fontWeight: 'normal',
    fontSize: [1, 1, 2, 2]
  })
)

const Subtext = props => <StyledSubtext as='p' {...props} />

export default Subtext
