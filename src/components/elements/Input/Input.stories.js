import { storiesOf } from '@storybook/react'
import { serializeFmt } from 'helpers/prettier'
import { Input, InputIcon } from 'components/elements'
import { Story } from 'story'
import React from 'react'

const createCode = (props = '') => `
import { Select } from 'components/elements'

export default () => (<form><Input ${serializeFmt(props)} /></form>)
`

const createStory = (name, props) => (
  <Story name={name} code={createCode(props)}>
    <Form>
      <Input iconComponent={<InputIcon query='microlink.io' />} {...props} />
    </Form>
  </Story>
)

const Form = props => (
  <form
    onSubmit={event => {
      event.preventDefault()
    }}
    {...props}
  />
)

storiesOf('Elements', module).add('Input', () => (
  <>
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
      id: 'input',
      placeholder: 'you@domain.com',
      suggestions: [{ value: 'you@gmail.com' }, { value: 'you@hotmail.com' }],
      width: '9rem',
      fontSize: 1
    })}
  </>
))
