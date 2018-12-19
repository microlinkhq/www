import { Children } from 'react'

export default children =>
  Children.map(
    children,
    child => (typeof child === 'string' ? child : child.props.children)
  ).join('')
