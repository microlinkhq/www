import { Box, Link, LinkSolid } from 'components/elements'
import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { theme } from 'theme'

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
          <Box
            key={state}
            css={theme({
              display: ['block', 'inline'],
              pr: 3,
              pb: 3
            })}
          >
            {createElement(
              Component,
              {
                key: `${name}:${state}`,
                [`data-${state}`]: true,
                disabled: state === 'disabled',
                loading: state === 'loading'
              },
              `${name}${state ? `:${state}` : ''}`
            )}
          </Box>
        ))}
      </Story>
    ))}
  </>
))
