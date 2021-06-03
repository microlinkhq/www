import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { createElement } from 'react'
import noop from 'lodash/noop'

const createOnClick = ({ onClick = noop, action, category, href: label }) => {
  if (!(action && category)) return onClick

  return event => {
    trackCustomEvent({ action, category, label })
    onClick(event)
    return false
  }
}

export const withAnalytics = Component => ({
  'data-event-action': action,
  'data-event-category': category,
  ...props
}) =>
  createElement(Component, {
    ...props,
    onClick: createOnClick({ action, category, ...props })
  })
