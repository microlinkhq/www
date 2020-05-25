import noop from 'lodash/noop'
import isSSR from './is-ssr'

function waitForGlobal (key, cb, time = 100) {
  return window[key]
    ? cb()
    : setTimeout(() => waitForGlobal(key, cb, time), time)
}

export default isSSR ? noop : waitForGlobal
