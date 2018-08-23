import React, { createElement } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import SpinnerIcon from '../Spinner'
import { colors } from 'theme'

export default ChildComponent => {
  const Spinner = styled(ChildComponent)`
    .path {
      stroke: ${colors[ChildComponent.defaultProps.color]};
    }
  `

  const SpinnerButton = ({ children, ...props }) => (
    <Spinner disabled {...props}>
      <Flex justify='center' textAlign='center'>
        {children}
      </Flex>
    </Spinner>
  )

  return ({ loading, ...props }) => {
    if (!loading) return createElement(ChildComponent, props)
    const children = createElement(SpinnerIcon, props)
    return createElement(SpinnerButton, { ...props, children })
  }
}
