import { colors, theme } from 'theme'
import { css } from 'styled-components'

const DESKTOP_SLOTS = [false, false, true, true]

export const MOBILE_ONLY = DESKTOP_SLOTS.map(on => (on ? 'none' : 'block'))
export const DESKTOP_ONLY = DESKTOP_SLOTS.map(on => (on ? 'block' : 'none'))

export const onDesktop = (desktopValue, mobileValues) =>
  DESKTOP_SLOTS.map((on, index) => (on ? desktopValue : mobileValues[index]))

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
