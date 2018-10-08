import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'
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
      <Flex justify='center' textAlign='center' children={children} />
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
        const children = createElement(SpinnerIcon, props)
        const width = this.state && this.state.width
        return createElement(SpinnerButton, {
          ...props,
          style: { width },
          children
        })
      }
    }
  }
}
