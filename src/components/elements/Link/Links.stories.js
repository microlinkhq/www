import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { Link, LinkSolid } from '.'
import Box from '../Box'
import Subhead from '../Subhead'
import CodeEditor from '../CodeEditor'

const buttons = [{ name: 'Link', Component: Link }, { name: 'LinkSolid', Component: LinkSolid }]
const states = [null, 'hover']

storiesOf('Components', module).add('Links', () => (
  <Fragment>
    {buttons.map(({ name, Component }) => (
      <Box mb={5}>
        <Subhead textAlign='left' mb={3}>
          {`<${name} />`}
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
        <CodeEditor language='jsx'>{`
import { ${name} } from 'components/elements'

export default () => (
  <${name}>${name}</${name}>
)
`}</CodeEditor>
      </Box>
    ))}
  </Fragment>
))
