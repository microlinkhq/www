import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Story } from 'story'

import FlickeringBackground from './FlickeringBackground'

const FlickeringBackgroundStory = () => (
  <Story name='FlickeringBackground' height='100vh' width='100%'>
    <FlickeringBackground>
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
        <Text color='black'>dots everywhere</Text>
      </Flex>
    </FlickeringBackground>
  </Story>
)

storiesOf('Patterns', module).add('FlickeringBackground', () => (
  <FlickeringBackgroundStory />
))
