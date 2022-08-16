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
  const LazyWrapper = ({
    lazy = true,
    loading,
    [attr]: rawAttribute,
    ...props
  }) => {
    const [isLoading, setLoading] = useState(loading || lazy)
    const compiledAttr = template(rawAttribute)

    useEffect(() => {
      if (lazy) {
        CACHE[compiledAttr] ||
          (CACHE[compiledAttr] = (() => {
            const tag = document.createElement(tagName)
            const cleanup = () => {
              tag.onload = null
              tag.onerror = null
            }

            tag.onerror = err => console.error('[with-lazy]', err)
            tag.onload = () => {
              cleanup()
              setLoading(false)
            }
            tag[attr] = compiledAttr

            return cleanup
          })())
      }
    }, [compiledAttr, lazy, props])

    return createElement(
      isLoading ? Placeholder : Component,
      computedProps(attr, compiledAttr, props, { isLoading })
    )
  }

  LazyWrapper.Component = Component

  return LazyWrapper
}
