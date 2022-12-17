import { createRule } from './Hide'

const LineBreak = createRule(
  'br',
  (breakpoints, key) => breakpoints.length && !breakpoints.includes(key)
)

export default LineBreak
