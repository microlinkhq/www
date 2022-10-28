import { useState, createElement, useEffect } from 'react'
import { aspectRatio, template } from 'helpers'

import Placeholder from '../../components/elements/Placeholder/Placeholder'

const compute = (obj, key, value) =>
  typeof obj[key] === 'function' ? obj[key](value) : obj[key]

const isDataURI = str => str.startsWith('data:')

const computedProps = (attr, compiledAttr, props, { isLoading }) => ({
  ...props,
  [attr]: compiledAttr,
  height: compute(props, 'height', isLoading),
  width: compute(props, 'width', isLoading) || aspectRatio.width,
  style: compute(props, 'style', isLoading)
})

const CACHE = Object.create(null)

export const withLazy = (Component, { tagName = 'img', attr = 'src' } = {}) => {
  const LazyWrapper = componentProps => {
    const { [attr]: rawAttribute, ...props } = componentProps
    const [isLoading, setLoading] = useState(!isDataURI(componentProps[attr]))
    const compiledAttr = template(rawAttribute)

    function createTag () {
      const tag = document.createElement(tagName)
      tag[attr] = compiledAttr
      return tag.decode()
    }

    useEffect(() => {
      const promise = CACHE[compiledAttr] || (CACHE[compiledAttr] = createTag())
      promise
        .then(() => setLoading(false))
        .catch(error => console.error('[with-lazy]', error))
    }, [compiledAttr])

    return createElement(
      isLoading ? Placeholder : Component,
      computedProps(attr, compiledAttr, props, { isLoading })
    )
  }

  LazyWrapper.Component = Component

  return LazyWrapper
}
