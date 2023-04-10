import React, { Component, createElement } from 'react'

import SpinnerIcon from '../../components/elements/Spinner'
import Flex from '../../components/elements/Flex'

export const withSpinner = ChildComponent => {
  const SpinnerButton = ({ children, ...props }) => (
    <ChildComponent state='hover' {...props}>
      <Flex justifyContent='center' textAlign='center'>
        {children}
      </Flex>
    </ChildComponent>
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
            disabled: true,
            style: { width, cursor: 'wait' }
          },
          children
        )
      }
    }
  }

  return SpinnerWrapper
}
