import React from 'react'
import {Flex, Button} from 'rebass'
import styled from 'styled-components'
import {fontSize} from 'styled-system'

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
  width: 100%;
  height: 65px;
  white-space: nowrap;
  background: white;
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
  border: solid 8px white;
`

const CustomFlex = Flex.extend`
  width: 100%;
  height: 100%;
`

export default () => (
  <CustomForm>
    <CustomFlex justify='space-around' align='center' role='search'>
      <CustomInput
        f={3}
        type='search'
        placeholder='https://shipow.github.io/searchbox'
        autoComplete='off'
        required='required'
      />
      <CustomButton color='white' bg='#449bf8' children='Go' />
    </CustomFlex>
  </CustomForm>
)
