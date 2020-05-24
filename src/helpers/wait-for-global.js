import isSSR from './is-ssr'

const store = isSSR ? {} : window

function waitForGlobal (key, cb, time = 100) {
  return store[key]
    ? cb()
    : setTimeout(() => waitForGlobal(key, cb, time), time)
}

export default waitForGlobal
