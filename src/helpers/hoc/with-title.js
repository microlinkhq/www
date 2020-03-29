import { createElement } from 'react'
import { title as titleize } from 'helpers'

export default Component => props => {
  if (typeof props.children !== 'string') {
    return createElement(Component, props)
  }

  const title =
    props.titleize !== false
      ? titleize(props.children, props.omitTitleize)
      : props.children

  return createElement(Component, {
    ...props,
    children: title,
    'data-title': title
  })
}
