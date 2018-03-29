import getColors from './get-colors'
import marshall from './marshall'
import unmarshall from './unmarshall'

import { responsiveStyle } from 'styled-system'

const maxWidth = responsiveStyle({
  prop: 'maxWidth',
  cssProperty: 'maxWidth'
})

const height = responsiveStyle({
  prop: 'height',
  cssProperty: 'height',
  numberToPx: true
})

export default {
  maxWidth,
  height,
  getColors,
  marshall,
  unmarshall
}
