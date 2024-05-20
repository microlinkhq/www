import styled from 'styled-components'
import { commonHeadingStyles } from './Heading'
import Text from './Text'
import { theme } from 'theme'
import React from 'react'

const Subhead = styled(props => <Text as='h2' {...props} />)(
  theme({
    ...commonHeadingStyles,
    fontSize: [4, 4, 6, 6]
  })
)

export default Subhead
