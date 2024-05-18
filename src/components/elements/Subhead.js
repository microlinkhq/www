import styled from 'styled-components'
import Heading from './Heading'
import { theme } from 'theme'
import React from 'react'

const Subhead = styled(Heading)(
  theme({
    fontSize: [4, 4, 6, 6],
    color: 'black'
  })
)

export default props => <Subhead as='h2' variant={null} {...props} />
