import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { ButtonPrimary, ButtonSecondary, ButtonOutline } from '.'
import Box from '../Box'
import Subhead from '../Subhead'

const buttons = [
  { name: 'Primary', Component: ButtonPrimary },
  { name: 'Secondary', Component: ButtonSecondary },
  { name: 'Outline', Component: ButtonOutline }
]
const states = [null, 'hover', 'disabled', 'loading']

storiesOf('Components', module).add('Buttons', () => (
  <Fragment>
    {buttons.map(({ name, Component }) => (
      <Box mb={5}>
        <Subhead textAlign='left' mb={3}>
          {name}
        </Subhead>
        {states.map(state => (
          <Box display={['block', 'inline']} pr={3} pb={3}>
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
      </Box>
    ))}
  </Fragment>
))
