import { space, width, fontSize, color } from 'styled-system'
import {debounce} from 'throttle-debounce'
import React, {Component} from 'react'
import styled from 'styled-components'
import {Flex, Button} from 'rebass'

const CustomButton = Button.extend`
  width: 93px;
  height: 48px;
  border-radius: 8px;
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
`

const CustomForm = styled.form`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  height: 65px;
  white-space: nowrap;
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
  border: solid 8px white;
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
    const {placeholder, onChange, ...props} = this.props

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
          />
          <CustomButton
            color='white'
            bg='#449bf8'
            children='Try It'
          />
        </CustomFlex>
      </CustomForm>
    )
  }
}
