import { createElement } from 'react'
import { title as titleizeFn } from 'helpers'

export const withTitle = Component => {
  const TitleWrapper = ({ titleize, omitTitleize, ...props }) => {
    if (typeof props.children !== 'string' || titleize === false) {
      return createElement(Component, props)
    }

    const title = titleizeFn(props.children, omitTitleize)

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
