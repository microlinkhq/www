import { createElement } from 'react'
import { noop } from 'lodash'
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

const withAnalytics = ChildComponent => ({
  'data-event-action': eventAction,
  'data-event-category': eventCategory,
  ...props
}) =>
  createElement(ChildComponent, {
    ...props,
    onClick: createOnClick({ eventAction, eventCategory, ...props })
  })

export default withAnalytics
