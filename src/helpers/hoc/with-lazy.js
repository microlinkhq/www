import { useState, createElement, useEffect } from 'react'
import { aspectRatio, template } from 'helpers'

import Placeholder from '../../components/elements/Placeholder/Placeholder'

const compute = (obj, key, value) =>
  typeof obj[key] === 'function' ? obj[key](value) : obj[key]

const isDataURI = (str = '') => str.startsWith('data:')

const computedProps = (attr, compiledAttr, props, { isLoading }) => {
  const style = compute(props, 'style', isLoading)
  const height = compute(props, 'height', isLoading)
  const width = compute(props, 'width', isLoading) || aspectRatio.width
  return { ...props, [attr]: compiledAttr, style: { height, width, ...style } }
}

export const withLazy = (Component, { tagName = 'img', attr = 'src' } = {}) => {
  const LazyWrapper = componentProps => {
    const [isLoading, setLoading] = useState(!isDataURI(componentProps[attr]))
    const { [attr]: rawAttribute, ...props } = componentProps
    const compiledAttr = template(rawAttribute)

    useEffect(() => {
      const tag = document.createElement(tagName)
      tag[attr] = compiledAttr
      tag
        .decode()
        .then(() => setLoading(false))
        .catch(error => console.error('[hook/with-lazy]', error))
    }, [compiledAttr])

    if (!componentProps[attr]) {
      return createElement(Placeholder.Empty, componentProps)
    }

    return createElement(
      isLoading ? Placeholder : Component,
      computedProps(attr, compiledAttr, props, { isLoading })
    )
  }

  LazyWrapper.Component = Component

  return LazyWrapper
}
