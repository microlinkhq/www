import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { ButtonPrimary, ButtonSecondary, ButtonOutline } from '.'
import Box from '../Box'
import Subhead from '../Subhead'
import CodeEditor from '../CodeEditor'

const buttons = [
  { name: 'Primary', Component: ButtonPrimary },
  { name: 'Secondary', Component: ButtonSecondary },
  { name: 'Outline', Component: ButtonOutline }
]
const states = [null, 'hover', 'disabled', 'loading']

storiesOf('Elements', module).add('Buttons', () => (
  <Fragment>
    {buttons.map(({ name, Component }) => (
      <Box mb={5} key={name}>
        <Subhead textAlign='left' mb={3}>
          {`<Button${name} />`}
        </Subhead>
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
        <CodeEditor my={4} language='jsx'>{`
import { Button${name} } from 'components/elements'

export default () => (
  <Button${name}>${name}</Button${name}>
)
`}</CodeEditor>
      </Box>
    ))}
  </Fragment>
))
