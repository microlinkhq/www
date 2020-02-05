import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { Text, Flex } from 'components/elements'

import DotsBackground from './DotsBackground'

storiesOf('Patterns', module).add('DotsBackground', () => (
  <Story name='DotsBackground' height='100vh' width='100%'>
    <DotsBackground>
      <Flex
        px={4}
        pt={4}
        pb={4}
        width='100%'
        height='50vh'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Text>
          dots,{' '}
          <Text as='span' fontWeight='bold'>
            dots
          </Text>{' '}
          everywhere
        </Text>
      </Flex>
    </DotsBackground>
  </Story>
))
