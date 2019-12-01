import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Button } from 'components/elements'

import { Story } from 'story'

const states = [null, 'hover', 'disabled', 'loading']

const text = 'Click me'

const code = `
import { Button } from 'components/elements'

export default () => (
  <Button>${text}</Button>
)
`

storiesOf('Elements', module).add('Button', () => (
  <Story name='Button' code={code}>
    {states.map(state => (
      <Box key={state} display={['block', 'inline']} pr={3} pb={3}>
        <Button
          key={state}
          state={state}
          disabled={state === 'disabled'}
          loading={state === 'loading'}
        >
          {text}
        </Button>
      </Box>
    ))}
  </Story>
))
