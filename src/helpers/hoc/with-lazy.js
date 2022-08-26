import { useState, createElement, useEffect } from 'react'
import { aspectRatio, template } from 'helpers'

import Placeholder from '../../components/elements/Placeholder/Placeholder'

const compute = (obj, key, value) =>
  typeof obj[key] === 'function' ? obj[key](value) : obj[key]

const computedProps = (attr, compiledAttr, props, { isLoading }) => ({
  ...props,
  [attr]: compiledAttr,
  height: compute(props, 'height', isLoading),
  width: compute(props, 'width', isLoading) || aspectRatio.width,
  style: compute(props, 'style', isLoading)
})

const CACHE = Object.create(null)

export const withLazy = (Component, { tagName = 'img', attr = 'src' } = {}) => {
  const LazyWrapper = ({ [attr]: rawAttribute, ...props }) => {
    const [isLoading, setLoading] = useState(true)
    const compiledAttr = template(rawAttribute)

    useEffect(() => {
      CACHE[compiledAttr] ||
        (CACHE[compiledAttr] = (() => {
          const tag = document.createElement(tagName)
          tag[attr] = compiledAttr
          return tag
            .decode()
            .then(() => setLoading(false))
            .catch(error => console.error('[with-lazy]', error))
        })())
    }, [])

    return createElement(
      isLoading ? Placeholder : Component,
      computedProps(attr, compiledAttr, props, { isLoading })
    )
  }

  LazyWrapper.Component = Component

  return LazyWrapper
}
