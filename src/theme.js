import palx from 'palx'
import { responsiveStyle } from 'styled-system'

export const breakpoints = [32, 48, 64, 80].map(n => n + 'em')

export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96]

export const fontWeights = {
  normal: 400,
  bold: 600
}

export const letterSpacings = {
  normal: 'normal',
  caps: '0.25em'
}

export const radii = [0, 2, 4, 8]

export const borders = [0, '1px solid', '2px solid']

const palette = palx('#449bf8')

const flattened = Object.keys(palette).reduce((a, key) => {
  const value = palette[key]
  if (Array.isArray(value)) {
    a[key] = value[5]
    value.forEach((val, i) => {
      a[key + i] = val
    })
  } else {
    a[key] = value
  }
  return a
}, {})

export const colors = Object.assign({}, flattened, {
  secondary: '#EA407B',
  primary: '#303A52',
  black: '#000',
  black90: 'rgba(0,0,0,.9)',
  black80: 'rgba(0,0,0,.8)',
  black70: 'rgba(0,0,0,.7)',
  black60: 'rgba(0,0,0,.6)',
  black50: 'rgba(0,0,0,.5)',
  black40: 'rgba(0,0,0,.4)',
  black30: 'rgba(0,0,0,.3)',
  black20: 'rgba(0,0,0,.2)',
  black10: 'rgba(0,0,0,.1)',
  black05: 'rgba(0,0,0,.05)',
  black025: 'rgba(0,0,0,.025)',
  black0125: 'rgba(0,0,0,.0125)',

  white: '#fff',
  white95: 'rgba(255,255,255,.95)',
  white90: 'rgba(255,255,255,.9)',
  white80: 'rgba(255,255,255,.8)',
  white70: 'rgba(255,255,255,.7)',
  white60: 'rgba(255,255,255,.6)',
  white50: 'rgba(255,255,255,.5)',
  white40: 'rgba(255,255,255,.4)',
  white30: 'rgba(255,255,255,.3)',
  white20: 'rgba(255,255,255,.2)',
  white10: 'rgba(255,255,255,.1)',
  white05: 'rgba(255,255,255,.05)',
  white025: 'rgba(255,255,255,.025)',
  white0125: 'rgba(255,255,255,.0125)'
})

export const fonts = {
  0: 'Interface, -apple-system, BlinkMacSystemFont, sans-serif',
  sans: 'Interface, -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"SF Mono", "Roboto Mono", Menlo, monospace'
}

export const cx = key => colors[key] || key

export const gradient = `linear-gradient(to right, #F76698 0%, #EA407B 29%, #654EA3 100%)`

export const bgGradient = `
  background-image: ${gradient};
`

export const shadows = [
  'none',
  `inset 0 0 0 1px ${colors.gray}`,
  `inset 0 0 0 1px ${colors.gray}, 0 0 4px ${colors.gray}`
]

export const lineHeights = [1, 1.125, 1.25, 1.5]

export const textGradient = `
  ${bgGradient}
  display: inline-block;
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

// TODO: remove
export const primaryFont = `
  font-family: 'avenir next', avenir, sans-serif;
`

export const maxWidth = responsiveStyle({
  prop: 'maxWidth',
  cssProperty: 'maxWidth'
})

export const height = responsiveStyle({
  prop: 'height',
  cssProperty: 'height',
  numberToPx: true
})

export default {
  primaryFont,
  textGradient,
  bgGradient,
  gradient,
  breakpoints,
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  fonts,
  colors,
  radii,
  maxWidth,
  height
}
