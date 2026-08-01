import { colors, theme } from 'theme'
import { css } from 'styled-components'

export const SECONDARY_FOCUS_RING = css`
  outline: 2px solid ${colors.secondary};
  outline-offset: 2px;
`

export const TAB_TITLE_STYLE = theme({
  fontFamily: 'sans',
  fontWeight: 'bold',
  fontSize: 1,
  lineHeight: 2,
  color: 'black'
})

export const TAB_DESCRIPTION_STYLE = {
  ...theme({
    fontFamily: 'sans',
    fontSize: 1,
    color: 'black60',
    lineHeight: 2,
    m: 0
  }),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
}
