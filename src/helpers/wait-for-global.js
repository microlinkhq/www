function waitForGlobal (key, cb, time = 100) {
  return window[key]
    ? cb()
    : setTimeout(() => waitForGlobal(key, cb, time), time)
}

export default waitForGlobal
