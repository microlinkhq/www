import { responsiveStyle } from 'styled-system'
import { gradient } from 'theme'

import getColors from './get-colors'
import marshall from './marshall'
import unmarshall from './unmarshall'

export const formatDate = timestamp =>
  timestamp.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

export const maxWidth = responsiveStyle({
  prop: 'maxWidth',
  cssProperty: 'maxWidth'
})

export const height = responsiveStyle({
  prop: 'height',
  cssProperty: 'height',
  numberToPx: true
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

export { getColors, marshall, unmarshall }
