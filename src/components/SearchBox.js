import { space, width, fontSize, color } from 'styled-system'
import {Flex, Button, ButtonOutline} from 'rebass'
import React, {Component} from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

const CustomButtonOutline = ButtonOutline.extend`
  width: 93px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
`

const CustomButton = Button.extend`
  width: 93px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
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
  ${space}
  ${width}
  ${fontSize}
  ${color}
  height: 65px;
  white-space: nowrap;
  border-radius: 8px;
  box-shadow: 0 10px 24px 0 rgba(206, 212, 218, 0.3);
  border: solid 8px white;
  max-width: 1024px;
`

const CustomFlex = Flex.extend`
  width: 100%;
  height: 100%;
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { value: this.props.value || '' }
  }

  handleChange (event) {
    this.setState({value: event.target.value.trim()})
  }

  renderLoadingButton () {
    return (
      <CustomButtonOutline onClick={event => {
        event.preventDefault()
      }}>
        <Flex justify='center' align='center'
          style={{transform: 'scale(0.5)', height: '100%'}}>
          <Spinner />
        </Flex>
      </CustomButtonOutline>
    )
  }

  renderButton () {
    return (
      <CustomButton
        color='white'
        bg='primary'
        type='submit'
        >Try it
      </CustomButton>
    )
  }

  onSubmit (event) {
    event.preventDefault()
    this.props.onChange(this.state.value)
  }

  componentWillReceiveProps (nextProps) {
    const {value} = nextProps
    value && this.setState({value})
  }

  render () {
    const {loading, placeholder, onChange, value, ...props} = this.props

    return (
      <CustomForm role='form' {...props} onSubmit={this.onSubmit}>
        <CustomFlex justify='space-around' align='center'>
          <CustomInput
            name='url'
            f={3}
            type='url'
            placeholder={placeholder}
            onChange={this.handleChange}
            value={this.state.value}
            required
            autoComplete='on'
            autoFocus
          />

          {!loading ? this.renderButton() : this.renderLoadingButton()}
        </CustomFlex>
      </CustomForm>
    )
  }
}
