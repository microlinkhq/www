import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import React from 'react'
import { theme } from 'theme'
import { Story } from 'story'

import FlickeringBackground from './FlickeringBackground'

const FlickeringBackgroundStory = () => (
  <Story name='FlickeringBackground' css={theme({ height: '100vh', width: '100%' })}>
    <FlickeringBackground>
      <Flex
        css={theme({
          px: 4,
          pt: 4,
          pb: 4,
          width: '100%',
          height: '50vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Text css={theme({ color: 'black' })}>dots everywhere</Text>
      </Flex>
    </FlickeringBackground>
  </Story>
)

export default { title: 'Patterns/FlickeringBackground' }

export const Default = () => <FlickeringBackgroundStory />
