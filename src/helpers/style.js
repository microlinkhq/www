import { maxWidth as maxWidthKeys, maxWidths } from 'theme'
import { responsiveStyle } from 'styled-system'

export const maxWidth = responsiveStyle({
  prop: 'maxWidth',
  cssProperty: 'maxWidth',
  getter: n => maxWidthKeys[n] || maxWidths[n] || n
})

export const lineHeight = responsiveStyle({
  prop: 'lineHeight',
  cssProperty: 'lineHeight',
  key: 'lineHeights'
})
