import { storiesOf } from '@storybook/react'
import { serializeFmt } from 'helpers/prettier'
import Input from './Input'
import InputIcon from './InputIcon'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

const createCode = (props = '') => `
  import Select from '../Select/Select'

  export default () => (<form><Input ${serializeFmt(props)} /></form>)
  `

const createStory = (name, props) => (
  <Story name={name} code={createCode(props)}>
    <Form>
      <Input
        iconComponent={<InputIcon query='microlink.io' />}
        css={theme({
          width: '9rem',
          fontSize: 1
        })}
        {...props}
      />
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
      placeholder: 'you@domain.com'
    })}

    {createStory('Input required', {
      type: 'email',
      placeholder: 'you@domain.com',
      required: true
    })}

    {createStory('Input suggestions', {
      type: 'email',
      id: 'input',
      placeholder: 'you@domain.com',
      suggestions: [{ value: 'you@gmail.com' }, { value: 'you@hotmail.com' }]
    })}
  </>
))
