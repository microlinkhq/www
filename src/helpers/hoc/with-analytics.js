import { track } from '@vercel/analytics'
import { createElement } from 'react'
import { noop } from 'helpers'

const createOnClick = ({ onClick = noop, name, location }) => {
  if (!(name && location)) return onClick

  return event => {
    track(name, { location })
    onClick(event)
    return false
  }
}

export const withAnalytics = Component => {
  const AnalyticsWrapper = ({
    'data-event-name': name,
    'data-event-location': location,
    ...props
  }) =>
    createElement(Component, {
      ...props,
      onClick: createOnClick({ name, location, ...props })
    })

  return AnalyticsWrapper
}
