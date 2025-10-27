import { Button } from 'components/elements/Button/Button'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Story } from 'story'

import DotsBackground from './DotsBackground'

const DotsBackgroundStory = () => {
  const [theme, setTheme] = useState('light')
  const [animate, setAnimate] = useState(true)

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleAnimate = () => setAnimate(!animate)

  return (
    <Story name='DotsBackground' height='100vh' width='100%'>
      <Box mb={4} width={650}>
        <Button onClick={toggleTheme}>toggle theme</Button>
        <Button ml={2} onClick={toggleAnimate}>
          toggle animation
        </Button>
      </Box>
      <DotsBackground theme={theme} animate={animate}>
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
          <Text color={theme === 'light' ? 'black' : 'white'}>
            dots,{' '}
            <Text as='span' css={theme({ fontWeight: 'bold' })}>
              dots
            </Text>{' '}
            everywhere
          </Text>
        </Flex>
      </DotsBackground>
    </Story>
  )
}

storiesOf('Patterns', module).add('DotsBackground', () => (
  <DotsBackgroundStory />
))
