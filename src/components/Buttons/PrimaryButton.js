import React, { createElement } from 'react'
import { Flex, Button } from 'rebass'
import styled from 'styled-components'

import baseStyle from './base'
import SpinnerIcon from '../Spinner'

const PrimaryButton = styled(Button)`
  ${baseStyle} box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.15s;

  &:hover:enabled {
    opacity: 0.8;
  }
`

PrimaryButton.defaultProps = {
  bg: 'primary',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 2
}

const Spinner = styled(PrimaryButton)`
  .path {
    stroke: white;
  }
  &:hover:enabled {
    opacity: 1;
  }
`

const SpinnerButton = ({ children, ...props }) => (
  <Spinner {...props}>
    <Flex justify='center' align='center'>
      {children}
    </Flex>
  </Spinner>
)

export default ({ spinner, ...props }) => {
  if (!spinner) return createElement(PrimaryButton, props)
  const children = createElement(SpinnerIcon, spinner)
  return createElement(SpinnerButton, { ...props, children })
}
