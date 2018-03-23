import React from 'react'
import { Flex, NavLink, Input, ButtonOutline, Text } from 'rebass'
import { alignSelf } from 'styled-system'

import { OutlineButton } from './Buttons'

const CustomNavLink = NavLink.extend`
  padding: 0;
  ${alignSelf};
`

export default props => (
  <Flex is='footer' flexDirection='column' {...props}>
    <Flex mb={2} flexDirection={['column', '', 'row']} align='center' py={3}>
      <Flex flexDirection='column'>
        <Text fontSize={1}>Early access and updates on new releases.</Text>
        <Flex py={3} px={0} align='center' justifyContent='flex-start'>
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
            <OutlineButton
              color='black'
              bg='white'
              py={'10px'}
              children='Sign Up'
            />
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
        <Flex w={1} justifyContent={['flex-start', '', 'flex-end']}>
          <NavLink
            mr={2}
            target='_blank'
            href='http://twitter.com/microlinkhq'
            children='Twitter'
          />
          <NavLink
            target='_blank'
            href='http://github.com/microlinkhq'
            children='GitHub'
          />
          <NavLink
            target='_blank'
            href='https://medium.com/microlink'
            children='Medium'
          />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)
