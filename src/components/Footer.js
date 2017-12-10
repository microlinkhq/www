import React from 'react'
import {Flex, NavLink, Input, ButtonOutline, Text} from 'rebass'
import { Github, Twitter } from 'react-feather'

const CustomButtonOutline = ButtonOutline.extend`
  font-weight: normal;
  &:hover {
    background: white;
    color: black;
  }
`

export default props => (
  <Flex is='footer' direction='column' {...props}>
    <Flex mb={4}>
      <Flex direction='column'>
        <Text mb={2}>Sign up for our newsletter.</Text>
        <Flex align='center' justify='center'>
          <Input placeholder='Email Address...' w={'12rem'} px={2} mr={2} />
          <CustomButtonOutline color='white' children='Submit' />
        </Flex>
      </Flex>
      <NavLink
        f={5}
        ml='auto'
        href='mailto:hello@microlink.io'
        target='_blank'
        children='hello@microlink.io'
        />
    </Flex>
    <Flex w={1} justify='flex-end'>
      <NavLink
        mr={2}
        target='_blank'
        href='http://twitter.com/microlinkio'
        children={<Twitter size={28} />}
        />
      <NavLink
        target='_blank'
        href='http://twitter.com/microlinkio'
        children={<Github size={28} />}
        />
    </Flex>
  </Flex>
)
