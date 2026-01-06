import React, { useMemo } from 'react'
import kebabCase from 'lodash/kebabCase'

import { Figcaption } from './Figcaption'
import { Microlink } from './Microlink'
import { MultiCodeEditor } from './MultiCodeEditor'

const DEFAULTS = {
  url: 'https://microlink.io'
}

const chainItems = (items, quotes, object, wrapKey = false) =>
  items
    .map(key => {
      const value = !object ? key : object[key]
      const isString = typeof value === 'string'
      const valueQuotes = isString ? quotes : ''
      const wrappedValue = `${valueQuotes}${value}${valueQuotes}`

      if (!object) {
        return wrappedValue
      }

      const k = !wrapKey ? key : `${quotes}${key}${quotes}`

      return `${k}: ${wrappedValue}`
    })
    .join(', ')

const formatParam = (param, useRealJson = false) => {
  const quotes = !useRealJson ? "'" : '"'

  if (Array.isArray(param)) {
    return `[${chainItems(param, quotes)}]`
  }

  if (typeof param === 'object') {
    return `{ ${chainItems(Object.keys(param), quotes, param, useRealJson)} }`
  }

  return param
}

export const DemoIntegrations = ({
  caption,
  parameters = {},
  showCard = true
}) => {
  const params = useMemo(() => ({ ...DEFAULTS, ...parameters }), [parameters])
  const paramKeys = useMemo(() => Object.keys(params), [params])
  const withoutUrl = useMemo(
    () => paramKeys.filter(k => k !== 'url'),
    [paramKeys]
  )

  const react = useMemo(
    () =>
      paramKeys
        .map(key => {
          const param = params[key]

          if (param === true) {
            return key
          }

          const isString = typeof param === 'string'
          const open = isString ? "'" : '{'
          const close = isString ? "'" : '}'

          return `${key}=${open}${formatParam(param)}${close}`
        })
        .join(' '),
    [params, paramKeys]
  )

  const vue = useMemo(
    () =>
      paramKeys
        .map(key => {
          const param = params[key]
          const prefix = typeof param === 'string' ? '' : ':'
          const attr = `${prefix}${kebabCase(key)}`
          return `\n    ${attr}="${formatParam(param)}"`
        })
        .join(' '),
    [params, paramKeys]
  )

  const jsObject = useMemo(
    () =>
      withoutUrl
        .map(key => {
          const param = params[key]
          const isString = typeof param === 'string'
          const quotes = isString ? "'" : ''

          return `${key}: ${quotes}${formatParam(param)}${quotes}`
        })
        .join(', '),
    [params, withoutUrl]
  )

  const jekyll = useMemo(() => {
    const jParams = withoutUrl
      .map(key => {
        const param = params[key]
        const attr = `data-${kebabCase(key)}`
        const quotes = typeof param === 'object' ? "'" : '"'

        return `${attr}=${quotes}${formatParam(param, true)}${quotes}`
      })
      .join(' ')

    return jParams.length ? ` ${jParams}` : ''
  }, [params, withoutUrl])

  const vanilla = useMemo(
    () => (jsObject.length ? `, { ${jsObject} }` : ''),
    [jsObject]
  )

  return (
    <>
      <MultiCodeEditor
        languages={{
          React: `import Microlink from '@microlink/react'

  <Microlink ${react} />
    `,
          Vue: `<template>
  <Microlink ${vue}
  />
</template>
    `,

          Jekyll: `[](${params.url}){:.card-preview${jekyll}}`,
          Vanilla: `<a href="${params.url}"></a>

<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a'${vanilla})
  })
</script>
    `
        }}
      />

      {caption && <Figcaption>{caption}</Figcaption>}

      {showCard && <Microlink {...params} />}
    </>
  )
}
