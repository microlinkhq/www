import { createElement } from 'react'
import noop from 'lodash/noop'

import { sendEvent } from 'helpers'

const createOnClick = ({
  eventAction,
  eventCategory,
  onClick = noop,
  href
}) => {
  if (!(eventAction && eventCategory)) return onClick

  return event => {
    sendEvent({
      eventAction,
      eventCategory,
      eventLabel: href
    })
    onClick(event)
    return false
  }
}

export const withAnalytics = Component => ({
  'data-event-action': eventAction,
  'data-event-category': eventCategory,
  ...props
}) =>
  createElement(Component, {
    ...props,
    onClick: createOnClick({ eventAction, eventCategory, ...props })
  })
