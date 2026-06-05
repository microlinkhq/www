export const once = fn => {
  let called = false
  let value
  return (...args) => {
    if (!called) {
      called = true
      value = fn(...args)
    }
    return value
  }
}
