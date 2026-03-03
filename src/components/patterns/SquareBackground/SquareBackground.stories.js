import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Story } from 'story'

import SquareBackground from './SquareBackground'

const SquareBackgroundStory = () => (
  <Story name='SquareBackground' height='100vh' width='100%'>
    <SquareBackground>
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
        <Text color='black'>squares everywhere</Text>
      </Flex>
    </SquareBackground>
  </Story>
)

storiesOf('Patterns', module).add('SquareBackground', () => (
  <SquareBackgroundStory />
))
