import { space, width, fontSize, color } from 'styled-system'
import { Flex } from 'rebass'
import React, { Component } from 'react'
import styled from 'styled-components'

import { height } from 'theme'
import Spinner from './Spinner'
import { PrimaryButton, OutlineButton } from './Buttons'

const CustomInput = styled.input`
  ${fontSize} display: inline-block;
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

const CustomForm = styled.form`
  ${space} ${width} ${fontSize} ${color} ${height} white-space: nowrap;
  border-radius: 8px;
  box-shadow: 0 10px 24px 0 rgba(206, 212, 218, 0.3);
  border: solid 8px white;
  max-width: 1024px;
`

const CustomFlex = Flex.extend`
  width: 100%;
  height: 100%;
`

const buttonWidths = ['61.3px', '', '92px']
const buttonHeights = ['32px', '', '48px']

const SpinnerButton = styled(OutlineButton)`
  &:hover {
    .path {
      stroke: white;
    }
  }
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { value: this.props.value || '' }
  }

  handleChange (event) {
    this.setState({ value: event.target.value.trim() })
  }

  renderLoadingButton () {
    return (
      <SpinnerButton
        borderRadius={3}
        width={buttonWidths}
        height={buttonHeights}
        onClick={event => {
          event.preventDefault()
        }}
      >
        <Flex
          justify='center'
          alignItems='center'
          style={{ transform: 'scale(0.5)', height: '100%' }}
        >
          <Spinner />
        </Flex>
      </SpinnerButton>
    )
  }

  onSubmit (event) {
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
      <CustomForm
        role='form'
        onSubmit={this.onSubmit}
        height={['53px', '', '80px']}
        {...props}
      >
        <CustomFlex justify='space-around' alignItems='center'>
          <CustomInput
            name='url'
            fontSize={[1, 2, 3]}
            type='url'
            placeholder={placeholder}
            onChange={this.handleChange}
            value={this.state.value}
            required
            autoComplete='on'
            autoFocus
          />
          <PrimaryButton
            type='submit'
            width={buttonWidths}
            height={buttonHeights}
            fontSize={[0, 2]}
            borderRadius={3}
            spinner={loading ? { height: 24 } : false}
            disabled={loading}
          >
            Try it
          </PrimaryButton>
        </CustomFlex>
      </CustomForm>
    )
  }
}
