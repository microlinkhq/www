import { track } from '@vercel/analytics'
import { createElement, forwardRef } from 'react'
import { noop } from 'helpers/noop'

const createOnClick = ({ onClick = noop, name, location }) => {
  if (!(name && location)) return onClick

  return event => {
    track(name, { location })
    onClick(event)
    return false
  }
}

export const withAnalytics = Component => {
  const AnalyticsWrapper = forwardRef(
    (
      { 'data-event-name': name, 'data-event-location': location, ...props },
      ref
    ) =>
      createElement(Component, {
        ...props,
        ref,
        onClick: createOnClick({ name, location, ...props })
      })
  )

  AnalyticsWrapper.displayName = `withAnalytics(${
    Component.displayName || Component.name || 'Component'
  })`

  Object.keys(Component).forEach(
    key => (AnalyticsWrapper[key] = Component[key])
  )

  return AnalyticsWrapper
}
