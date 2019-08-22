import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Link, LinkSolid } from 'components/elements'
import { Story } from 'story'

const buttons = [
  { name: 'Link', Component: Link },
  { name: 'LinkSolid', Component: LinkSolid }
]

const states = [null, 'hover']

const createCode = name => `
import { ${name} } from 'components/elements'

export default () => (
  <${name}>Click my site</${name}>
)
`

storiesOf('Elements', module).add('Link', () => (
  <>
    {buttons.map(({ name, Component }) => (
      <Story key={name} name={name} code={createCode(name)}>
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
    ))}
  </>
))
