import { createElement, useContext } from 'react'
import { MarkdownContext } from 'components/markdown/Context'
import { title as titleizeFn } from 'helpers/title'

export const withTitle = Component => {
  const TitleWrapper = ({ titleize, omitTitleize, ...props }) => {
    const { titleize: titleizeByDefault } = useContext(MarkdownContext)
    const shouldTitleize = titleize ?? titleizeByDefault

    if (typeof props.children !== 'string' || !shouldTitleize) {
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
