import React, { Component, createElement } from 'react'
import styled from 'styled-components'
import { colors } from 'theme'

import Flex from '../../components/elements/Flex'
import SpinnerIcon from '../../components/elements/Spinner'

export const withSpinner = ChildComponent => {
  const Spinner = styled(ChildComponent)`
    &&& {
      background-color: ${props => colors[props.color]};
      color: ${colors.black50};
      cursor: not-allowed;
      box-shadow: 0 0 0 1px ${props => colors[props.bg]};
    }
    .path {
      stroke: ${props => colors[props.bg]};
      opacity: 1;
    }
  `

  const SpinnerButton = ({ children, ...props }) => (
    <Spinner state='hover' {...props}>
      <Flex justifyContent='center' textAlign='center'>
        {children}
      </Flex>
    </Spinner>
  )

  class SpinnerWrapper extends Component {
    componentDidMount () {
      if (this.button) {
        const { width } = this.button.getBoundingClientRect()
        this.setState({ width })
      }
    }

    render () {
      const { loading, ...props } = this.props
      if (!loading) {
        return (
          <ChildComponent ref={button => (this.button = button)} {...props} />
        )
      } else {
        const children = createElement(SpinnerIcon)
        const width = this.state && this.state.width
        return createElement(
          SpinnerButton,
          {
            ...props,
            style: { width, cursor: 'wait' }
          },
          children
        )
      }
    }
  }

  return SpinnerWrapper
}
