import styled from 'styled-component'
import { theme } from 'rebass'

const {breakpoints} = theme
const lastIndex = breakpoints[breakpoints.length - 1]

const getMediaBreakpoint = (breakpoints, breakpoint, index) => {
  if (index === 0) return `@media screen and (max-width: ${breakpoint})`
  if (index === lastIndex) return `@media screen and (min-width: ${breakpoint})`
  const prevBreakpoint = breakpoints[index - 1]
  return `@media screen and (min-width: ${prevBreakpoint}) and (max-width: ${breakpoint})`
}

const mediaBreakpoints = breakpoints.reduce((acc, breakpoint, index) => {
  acc[index] = getMediaBreakpoint(breakpoints, breakpoint, index)
  return acc
}, {})

const hidden = key => props => props[key] ? {
  [mediaBreakpoints[key]]: {
    display: 'none'
  }
} : null

const Hide = styled.div([], ...mediaBreakpoints.map(hidden))

export default Hide
