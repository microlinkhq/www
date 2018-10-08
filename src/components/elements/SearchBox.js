import React, { Component } from 'react'
import { fontSize } from 'styled-system'
import styled from 'styled-components'
import system from 'system-components'
import { Flex, Button } from 'components/elements'

const Input = styled.input`
  ${fontSize};
  display: inline-block;
  transition: box-shadow 0.4s ease, background 0.4s ease;
  border: 0;
  box-shadow: inset 0 0 0 1px white;
  background: white;
  width: 80%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  appearance: none;
  outline: 0;
  padding: 0;

  ::-webkit-input-placeholder {
    opacity: 0.45;
  }
  ::-moz-placeholder {
    opacity: 0.45;
  }
  :-ms-input-placeholder {
    opacity: 0.45;
  }
  :-moz-placeholder {
    opacity: 0.45;
  }
`

const Form = system({ is: Flex }, 'space', 'width', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  boxShadow: '0 10px 24px 0 rgba(206, 212, 218, 0.3)',
  border: 'solid 8px white'
})

class SearchBox extends Component {
  state = { value: this.props.value }

  handleChange = event => {
    this.setState({ value: event.target.value.trim() })
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.onChange(this.state.value)
  }

  componentWillReceiveProps (nextProps) {
    const { value } = nextProps
    value && this.setState({ value })
  }

  render () {
    const { loading, placeholder, onChange, value, ...props } = this.props

    return (
      <Form py={1} is='form' role='form' onSubmit={this.onSubmit} {...props}>
        <Input
          name='url'
          fontSize={'18px'}
          type='url'
          placeholder={placeholder}
          onChange={this.handleChange}
          value={this.state.value}
          required
          autoComplete='on'
          autoFocus
          disabled={loading}
        />

        <Button fontSize={1} children='Try it' loading={loading} />
      </Form>
    )
  }
}

SearchBox.defaultProps = {
  value: ''
}

export default SearchBox
