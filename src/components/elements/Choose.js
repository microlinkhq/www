import React from 'react'
import If from './If'

const Choose = props => {
  let when = null
  let otherwise = null

  React.Children.forEach(props.children, children => {
    if (children.props.condition === undefined) {
      otherwise = children
    } else if (!when && children.props.condition === true) {
      when = children
    }
  })

  return when || otherwise
}

Choose.When = If

Choose.Otherwise = ({ render, children }) => (render ? render() : children)

export default Choose
