import { createElement } from 'react'
import { title as titleize } from 'helpers'

export const withTitle = Component => {
  const TitleWrapper = props => {
    if (typeof props.children !== 'string' || props.titleize === false) {
      return createElement(Component, props)
    }

    const title = titleize(props.children, props.omitTitleize)

    return createElement(
      Component,
      {
        ...props,
        'data-title': title
      },
      title
    )
  }

  return TitleWrapper
}
