import React from 'react'
import { Banner, Flex } from 'components/elements'
import styled from 'styled-components'

const CustomFlex = styled(Flex)`
  a {
    position: relative;
    bottom: 1px;
  }

  &:hover {
    opacity: 0.8;
  }
`

export default props => (
  <CustomFlex justifyContent='center' as='footer'>
    <Banner {...props} />
  </CustomFlex>
)
