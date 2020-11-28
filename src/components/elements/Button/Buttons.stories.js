import React from 'react'
import { storiesOf } from '@storybook/react'
import { Caps, Flex, Button } from 'components/elements'

import { Story } from 'story'

const states = [null, 'hover', 'disabled', 'loading']

const text = 'Get it'

const code = `
import { Button } from 'components/elements'

export default () => (
  <Button>${text}</Button>
)
`

storiesOf('Elements', module).add('Button', () => (
  <Story name='Button' code={code}>
    <Flex>
      {states.map(state => (
        <Button
          mr={3}
          mb={3}
          key={state}
          state={state}
          disabled={state === 'disabled'}
          loading={state === 'loading'}
        >
          <Caps fontSize={1}>{text}</Caps>
        </Button>
      ))}
    </Flex>
  </Story>
))
