import { createElement, useEffect, useState } from 'react'

const DEFAULT_WAIT = 300

export const withDebounce = (Component, propNames) => {
  const Wrapper = props => {
    const [debounced, setDebounced] = useState(() =>
      Object.fromEntries(propNames.map(p => [p, props[p]]))
    )

    useEffect(
      () => {
        const pending = propNames.filter(
          p => !Object.is(debounced[p], props[p])
        )
        if (pending.length === 0) return

        const timeout = setTimeout(() => {
          setDebounced(prev => {
            const next = { ...prev }
            let changed = false
            for (const p of pending) {
              if (!Object.is(next[p], props[p])) {
                next[p] = props[p]
                changed = true
              }
            }
            return changed ? next : prev
          })
        }, DEFAULT_WAIT)

        return () => clearTimeout(timeout)
      },
      propNames.map(p => props[p])
    )

    return createElement(Component, { ...props, ...debounced })
  }

  Wrapper.displayName = `withDebounce(${
    Component.displayName || Component.name || 'Component'
  })`

  return Wrapper
}
