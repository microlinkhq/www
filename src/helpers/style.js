import { gradient, maxWidth as maxWidthKeys, maxWidths } from 'theme'
import { responsiveStyle } from 'styled-system'

export const maxWidth = responsiveStyle({
  prop: 'maxWidth',
  cssProperty: 'maxWidth',
  getter: n => maxWidthKeys[n] || maxWidths[n] || n
})

export const height = responsiveStyle({
  prop: 'height',
  cssProperty: 'height',
  numberToPx: true
})

export const lineHeight = responsiveStyle({
  prop: 'lineHeight',
  cssProperty: 'lineHeight',
  key: 'lineHeights'
})

export const bgGradient = `
  background-image: ${gradient};
`

export const textGradient = `
  ${bgGradient}
  display: inline-block;
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`
