import React from 'react'
import { Badge, Link, Text, Flex } from 'components/elements'
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

const Banner = ({ href, children }) => (
  <Flex justifyContent='center' alignItems='center'>
    <CustomFlex as='section' px='12px' borderRadius={5} bg='pinkest'>
      <Link href={href}>
        <Badge>new</Badge>
        <Text
          fontWeight='normal'
          as='span'
          color='gray8'
          fontSize={[0, 1]}
          ml={2}
          children={`${children}  »`}
        />
      </Link>
    </CustomFlex>
  </Flex>
)

export default Banner
