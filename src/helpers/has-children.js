import { isValidElement } from 'react'

export const hasChildren = element =>
  isValidElement(element) && Boolean(element.props.children)
