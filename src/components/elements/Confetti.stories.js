import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Story } from 'story'
import { theme } from 'theme'

import Button from './Button/Button'
import Caps from './Caps'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import Confetti from './Confetti'

const storyName = 'Confetti'

const code = `
import Confetti from './Confetti'

export default () => (
  <Confetti />
)`

const ConfettiStory = () => {
  const [showConfetti, setShowConfetti] = useState(false)

  const triggerConfetti = () => {
    setShowConfetti(true)
    // Auto-hide after 3 seconds for demo purposes
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const stopConfetti = () => {
    setShowConfetti(false)
  }

  return (
    <Story name={storyName} code={code}>
      <Box css={theme({ position: 'relative', minHeight: '400px' })}>
        <Flex
          css={theme({ flexDirection: 'column', alignItems: 'center', gap: 3 })}
        >
          <Text css={theme({ textAlign: 'center', mb: 3 })}>
            Click the button below to trigger confetti celebration! 🎉
          </Text>

          <Flex css={theme({ gap: 2 })}>
            <Button onClick={triggerConfetti} disabled={showConfetti}>
              <Caps css={theme({ fontSize: 0 })}>
                {showConfetti ? 'Celebrating...' : 'Celebrate!'}
              </Caps>
            </Button>

            {showConfetti && (
              <Button variant='outline' onClick={stopConfetti}>
                <Caps css={theme({ fontSize: 0 })}>Stop</Caps>
              </Button>
            )}
          </Flex>

          {showConfetti && (
            <Text
              css={theme({
                fontSize: 1,
                color: 'black60',
                textAlign: 'center',
                mt: 2
              })}
            >
              Confetti will auto-stop in 3 seconds or click "Stop"
            </Text>
          )}
        </Flex>

        {showConfetti && <Confetti />}
      </Box>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <ConfettiStory />)
