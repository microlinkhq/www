import { storiesOf } from '@storybook/react'
import React, { Fragment } from 'react'
import { serializeFmt } from 'helpers/prettier'
import { Mail } from 'react-feather'
import { noop } from 'lodash'

import { Input } from 'components/elements'
import { colors } from 'theme'
import { Story } from 'story'

const createCode = (props = '') => `
import { Select } from 'components/elements'

export default () => (<form><Input ${serializeFmt(props)} /></form>)
`

const createStory = (name, props) => (
  <Story name={name} code={createCode(props)}>
    <Form>
      <Input {...props} />
    </Form>
  </Story>
)

const Form = props => (
  <form
    onSubmit={event => {
      event.preventDefault()
      console.log(event.target.value)
    }}
    {...props}
  />
)

storiesOf('Elements', module).add('Input', () => (
  <Fragment>
    {createStory('Input', {
      type: 'email',
      placeholder: 'you@domain.com',
      width: '9rem',
      fontSize: 1
    })}

    {createStory('Input required', {
      type: 'email',
      placeholder: 'you@domain.com',
      width: '9rem',
      fontSize: 1,
      required: true
    })}

    {createStory('Input suggestions', {
      type: 'email',
      placeholder: 'you@domain.com',
      suggestions: ['you@gmail.com'],
      width: '9rem',
      fontSize: 1
    })}
  </Fragment>
))
