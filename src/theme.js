import palx from 'palx'

export const breakpoints = [32, 48, 64, 80].map(n => n + 'em')

export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96]

export const fontWeights = {
  lighter: 100,
  light: 200,
  normal: 400,
  regular: 500,
  bold: 600
}

export const radii = [0, 2, 4, 6, 8]

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
  link: '#067df7',

  violet0: '#faf9fc',
  violet1: '#efecf5',
  violet2: '#e3dfee',
  violet3: '#d6d0e6',
  violet4: '#c8c0de',
  violet5: '#b8add5',
  violet6: '#a699ca',
  violet7: '#9080bd',
  violet8: '#7460ac',
  violet9: '#45356f',

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
  sans: "'Inter UI', sans-serif",
  mono:
    '"Operator Mono", "Fira Code", "SF Mono", "Roboto Mono", Menlo, monospace'
}

export const cx = key => colors[key] || key

export const gradient = `linear-gradient(to right, #F76698 0%, #EA407B 29%, #654EA3 100%)`

export const shadows = [
  'rgb(206, 212, 218) 0 -5px 15px 0',
  '0 1px 2px rgba(0,0,0,0.24)',
  '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
]

export const lineHeights = [1, 1.125, 1.25, 1.5, 2]

export const maxWidths = [
  1,
  2,
  4,
  8,
  12,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  64,
  72,
  82,
  96
].map(n => n + 'em')

export const transition = {
  short: '.1s cubic-bezier(.25,.8,.25,1)',
  medium: '.35s cubic-bezier(.25,.8,.25,1)',
  long: '.45s cubic-bezier(.4, 0, .2, 1)'
}

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

export const textStyle = {
  gradient: textGradient
}

export const boxStyle = {
  gradient: `
    background-image: linear-gradient(to bottom, #F76698 0%, #EA407B 29%, #654EA3 100%);
  `
}

export const layout = [1024, 1024, 1024]

export default {
  breakpoints,
  boxStyle,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  gradient,
  layout,
  lineHeights,
  maxWidths,
  radii,
  shadows,
  space,
  textStyle,
  transition
}
