import { space, width, fontSize, color } from 'styled-system'
import {debounce} from 'throttle-debounce'
import React, {Component} from 'react'
import styled from 'styled-components'
import {Flex, Button} from 'rebass'

const CustomButton = Button.extend`
  width: 93px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
`

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
  ${space}
  ${width}
  ${fontSize}
  ${color}
  height: 65px;
  white-space: nowrap;
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(206, 212, 218, 0.3);
  border: solid 8px white;
  max-width: 1024px;
`

const CustomFlex = Flex.extend`
  width: 100%;
  height: 100%;
`

const DEBOUNCE_MS = 500

export default class extends Component {
  constructor (props) {
    super(props)
    this.setEventValue = debounce(DEBOUNCE_MS, this.setEventValue)
  }

  submitValue () {
    this.props.onSubmit(this.state.value)
  }

  setEventValue (value) {
    this.setState({ value })
    this.props.onSubmit(value)
  }

  updateValue (event) {
    this.setEventValue(event.target.value.trim())
  }

  render () {
    const {placeholder, onChange, value, ...props} = this.props

    return (
      <CustomForm {...props}>
        <CustomFlex justify='space-around' align='center' role='search'>
          <CustomInput
            f={3}
            type='search'
            placeholder={placeholder}
            autoComplete='off'
            required='required'
            onChange={this.updateValue.bind(this)}
            value={value || ''}
          />
          <CustomButton
            color='white'
            bg='blue'
            children='Try It'
            onClick={event => {
              event.preventDefault()
            }}
          />
        </CustomFlex>
      </CustomForm>
    )
  }
}
