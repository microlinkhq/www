import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Box,
  ButtonPrimary,
  ButtonSecondary,
  ButtonOutline
} from 'components/elements'

import { Story } from 'story'

const buttons = [
  { name: 'Primary', Component: ButtonPrimary },
  { name: 'Secondary', Component: ButtonSecondary },
  { name: 'Outline', Component: ButtonOutline }
]
const states = [null, 'hover', 'disabled', 'loading']

const createCode = name => `
import { Button${name} } from 'components/elements'

export default () => (
  <Button${name}>${name}</Button${name}>
)
`

storiesOf('Elements', module).add('Button', () => (
  <Fragment>
    {buttons.map(({ name, Component }) => {
      return (
        <Story
          key={`Button${name}`}
          name={`Button${name}`}
          code={createCode(name)}
        >
          {states.map(state => (
            <Box key={state} display={['block', 'inline']} pr={3} pb={3}>
              <Component
                key={`${name}:${state}`}
                state={state}
                disabled={state === 'disabled'}
                loading={state === 'loading'}
              >
                {`${name}${state ? `:${state}` : ''}`}
              </Component>
            </Box>
          ))}
        </Story>
      )
    })}
  </Fragment>
))
