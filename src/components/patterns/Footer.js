import React from 'react'
import { alignSelf } from 'styled-system'
import { OutlineButton, Flex, NavLink, Input, Text } from 'components/elements'
import { Github, Twitter } from 'react-feather'

const CustomNavLink = NavLink.extend`
  ${alignSelf};
  padding: 0;
`

const NavLinkIcon = NavLink.extend`
  transition: all 0.1s ease-out;
  &:hover {
    svg {
      fill: white;
    }
  }
`

CustomNavLink.defaultProps = {
  blacklist: [...NavLink.defaultProps.blacklist, 'alignSelf']
}

const SignButton = OutlineButton.extend`
  color: #10111b;
  background-color: white;
  box-shadow: none;

  &:hover {
    color: #10111b;
    background-color: white;
  }
`

export default props => (
  <Flex is='footer' flexDirection='column' {...props}>
    <Flex
      mb={2}
      flexDirection={['column', '', 'row']}
      alignItems='center'
      py={3}
      p
    >
      <Flex flexDirection='column'>
        <Text fontSize={1}>Early access and updates on new releases.</Text>
        <Flex py={3} px={0} alignItems='center' justifyContent='flex-start'>
          <form
            action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
            method='post'
          >
            <Input
              name='EMAIL'
              placeholder='Email Address...'
              width={'12rem'}
              py={1}
              px={2}
              mr={2}
            />
            <SignButton py={'10px'} children='Sign Up' />
          </form>
        </Flex>
      </Flex>
      <Flex mt={[3, '', 0]} ml={[0, '', 'auto']} flexDirection='column'>
        <CustomNavLink
          fontSize={[3, '', 5]}
          href='mailto:hello@microlink.io'
          target='_blank'
          children='hello@microlink.io'
          alignSelf={['center', '', 'flex-start']}
        />
        <Flex w={1} justifyContent={['center', '', 'flex-end']}>
          <NavLinkIcon
            mr={2}
            target='_blank'
            href='http://twitter.com/microlinkhq'
            children={<Twitter size={20} />}
          />
          <NavLinkIcon
            target='_blank'
            href='http://github.com/microlinkhq'
            children={<Github size={20} />}
          />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)
