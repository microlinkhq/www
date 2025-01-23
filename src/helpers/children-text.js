import { hasChildren } from './has-children'

export const childrenText = children =>
  hasChildren(children) ? childrenText(children.props.children) : children
