import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'

import Text from './Text'

const Heading = styled(Text)(
  theme({
    letterSpacing: 1,
    lineHeight: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: [4, 6, 7, 7]
  })
)

export default props => <Heading as='h1' variant='gradient' {...props} />
