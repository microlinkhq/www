import React from 'react'
import { Caps, Flex, Heading, Subhead } from 'components/elements'

const Legend = ({ title, sup, textAlign = 'center', children }) => (
  <Flex
    as='header'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
  >
    <Subhead
      fontSize={2}
      fontWeight='bold'
      color='secondary'
      textAlign={textAlign}
    >
      <Caps letterSpacing={3} as='span'>
        {sup}
      </Caps>
    </Subhead>
    <Heading
      mt={1}
      mb={children && 1}
      fontWeight='bold'
      fontSize={[3, 5]}
      variant={null}
      textAlign={textAlign}
    >
      {title}
    </Heading>
    {children}
  </Flex>
)

export default Legend
