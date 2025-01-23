export const once =
  (fn, value) =>
    (...args) =>
      value || (value = fn(...args))
