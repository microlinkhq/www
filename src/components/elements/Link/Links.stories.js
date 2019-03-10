import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Subhead, CodeEditor, Link, LinkSolid } from 'components/elements'

const buttons = [
  { name: 'Link', Component: Link },
  { name: 'LinkSolid', Component: LinkSolid }
]
const states = [null, 'hover']

storiesOf('Elements', module).add('Links', () => (
  <Fragment>
    {buttons.map(({ name, Component }) => (
      <Box key={name} mb={5}>
        <Subhead textAlign='left' mb={3}>
          {`<${name} />`}
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
import { ${name} } from 'components/elements'

export default () => (
  <${name}>${name}</${name}>
)
`}</CodeEditor>
      </Box>
    ))}
  </Fragment>
))
