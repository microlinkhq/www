import { Children } from 'react'

import { hasChildren } from './has-children'

export const childrenTextAll = children =>
  Children.toArray(children).reduce((acc, child) => {
    if (hasChildren(children)) return childrenTextAll(child.props.children)
    else return acc + child
  }, '')
