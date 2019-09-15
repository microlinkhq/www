import React, { Component, createElement } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { colors } from 'theme'

import Flex from '../Flex'
import SpinnerIcon from '../Spinner'

export default (ChildComponent, spinnertStyle) => {
  const Spinner = styled(ChildComponent)`
    &&& {
      ${spinnertStyle};
    }

    .path {
      stroke: ${colors[ChildComponent.defaultProps.color]};
      opacity: 1;
    }
  `

  const SpinnerButton = ({ children, ...props }) => (
    <Spinner state='hover' {...props}>
      <Flex justifyContent='center' textAlign='center' children={children} />
    </Spinner>
  )

  return class extends Component {
    componentDidMount () {
      const node = ReactDOM.findDOMNode(this.refs.button)
      if (node) {
        const { width } = node.getBoundingClientRect()
        this.setState({ width })
      }
    }

    render () {
      const { loading, ...props } = this.props
      if (!loading) {
        return <ChildComponent ref='button' {...props} />
      } else {
        const children = createElement(SpinnerIcon)
        const width = this.state && this.state.width
        return createElement(SpinnerButton, {
          ...props,
          style: { width, cursor: 'wait' },
          children
        })
      }
    }
  }
}
