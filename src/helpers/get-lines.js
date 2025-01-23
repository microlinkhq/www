const REGEX_ONE_LINE = /\{\d\d?\}/
const REGEX_LINE_RANGE = /\{\d\d?,\d\d?\}/

export const getLines = str => {
  if (!str) return null

  let strMatch
  ;[REGEX_ONE_LINE, REGEX_LINE_RANGE].find(
    regex => (strMatch = str.match(regex))
  )
  if (!strMatch) return null

  return strMatch[0]
    .replace('{', '')
    .replace('}', '')
    .split(',')
    .map(n => Number(n.trim()))
}
