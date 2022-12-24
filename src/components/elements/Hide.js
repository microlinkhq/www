import styled from 'styled-components'
import { breakpoints } from 'theme'

const lastIndex = breakpoints.length - 1

const getMediaBreakpoint = (breakpoints, breakpoint, index) => {
  if (index === 0) return `@media screen and (max-width: ${breakpoint})`
  const prevBreakpoint = breakpoints[index - 1]
  if (index === lastIndex) {
    return `@media screen and (min-width: ${prevBreakpoint})`
  }
  return `@media screen and (min-width: ${prevBreakpoint}) and (max-width: ${breakpoint})`
}

const mediaBreakpoints = breakpoints.reduce((acc, breakpoint, index) => {
  acc[index] = getMediaBreakpoint(breakpoints, breakpoint, index)
  return acc
}, {})

function createBreakpoint (key, fn) {
  return props => {
    const breakpoints = props.breakpoints ? [].concat(props.breakpoints) : []
    return fn(breakpoints, key)
      ? { [mediaBreakpoints[key]]: { display: 'none' } }
      : null
  }
}

export function createRule (tagname, condition) {
  return styled[tagname](
    [],
    ...Object.keys(mediaBreakpoints).map(i =>
      createBreakpoint(Number(i), condition)
    )
  )
}

const Hide = createRule('div', (breakpoints, key) => breakpoints.includes(key))

export default Hide
