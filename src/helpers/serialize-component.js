import { Children } from 'react'

const serialize = children =>
  (
    Children.map(children, child => {
      if (typeof child === 'string') return child
      return serialize(child.props.children)
    }) || []
  ).join('\n')

export default serialize
