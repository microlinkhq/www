import { createElement, useEffect, useRef, useState } from 'react'

const DEFAULT_WAIT = 300

export const withDebounce = (Component, propNames) => {
  const Wrapper = props => {
    const [debounced, setDebounced] = useState(() =>
      Object.fromEntries(propNames.map(p => [p, props[p]]))
    )

    const timeouts = useRef({})

    useEffect(() => {
      propNames.forEach(p => {
        if (Object.is(debounced[p], props[p])) return

        clearTimeout(timeouts.current[p])
        timeouts.current[p] = setTimeout(() => {
          setDebounced(prev =>
            Object.is(prev[p], props[p]) ? prev : { ...prev, [p]: props[p] }
          )
        }, DEFAULT_WAIT)
      })

      return () => Object.values(timeouts.current).forEach(clearTimeout)
    }, [DEFAULT_WAIT, ...propNames.map(p => props[p])])

    return createElement(Component, { ...props, ...debounced })
  }

  Wrapper.displayName = `withDebounce(${
    Component.displayName || Component.name || 'Component'
  })`

  return Wrapper
}
