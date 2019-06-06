import { createElement } from 'react'
import { noop } from 'lodash'

const createOnClick = ({
  eventAction,
  eventCategory,
  onClick = noop,
  href
}) => {
  if (!(eventAction && eventCategory)) return onClick

  return event => {
    if (window.ga) {
      window.ga('send', 'event', {
        eventAction,
        eventCategory,
        eventLabel: href,
        transport: 'beacon'
      })
    }
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
