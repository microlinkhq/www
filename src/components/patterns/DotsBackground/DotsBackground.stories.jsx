import { Button } from 'components/elements/Button/Button'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import React, { useState } from 'react'
import { theme } from 'theme'
import { Story } from 'story'

import DotsBackground from './DotsBackground'

const DotsBackgroundStory = () => {
  const [pageTheme, setPageTheme] = useState('light')
  const [animate, setAnimate] = useState(true)

  const toggleTheme = () =>
    setPageTheme(pageTheme === 'light' ? 'dark' : 'light')
  const toggleAnimate = () => setAnimate(!animate)

  return (
    <Story name='DotsBackground' css={theme({ height: '100vh', width: '100%' })}>
      <Box css={theme({ mb: 4, width: 650 })}>
        <Button onClick={toggleTheme}>toggle theme</Button>
        <Button css={theme({ ml: 2 })} onClick={toggleAnimate}>
          toggle animation
        </Button>
      </Box>
      <DotsBackground theme={pageTheme} animate={animate}>
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
          <Text
            css={theme({ color: pageTheme === 'light' ? 'black' : 'white' })}
          >
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

export default { title: 'Patterns/DotsBackground' }

export const Default = () => <DotsBackgroundStory />
