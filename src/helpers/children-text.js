import hasChildren from './has-children'

const childrenText = children =>
  hasChildren(children) ? childrenText(children.props.children) : children

export default childrenText
