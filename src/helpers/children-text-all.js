import { Children } from 'react'

import hasChildren from './has-children'

const serialize = children =>
  Children.toArray(children).reduce((acc, child) => {
    if (hasChildren(children)) return serialize(child.props.children)
    else return acc + child
  }, '')

export default serialize
