import { lighten } from 'polished'

export { css as theme } from '@techstack/styled-system'

export const toPx = n => `${n}px`
export const toEm = n => `${n}em`
export const toMs = n => `${n}ms`
export const toRaw = n => Number(n.replace(/px|em/, ''))

export const breakpoints = [600, 768, 1200, 1200].map(toPx)

export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512].map(toPx)

export const fontSizes = [14, 16, 20, 28, 52, 64, 80, 96].map(toPx)

export const fontWeights = {
  light: 200,
  normal: 400,
  regular: 500,
  bold: 700
}

export const radii = [0, 2, 4, 6, 8, 16].map(toPx)

export const borders = [0, '1px solid', '2px solid', '2px dashed']

// https://palx.jxnblk.com/067df7
// https://github.com/yeun/open-color
export const colors = {
  link: '#067df7',
  hoverLink: lighten(0.15, '#067df7'),
  secondary: '#EA407B',
  close: '#27C93F',
  minimize: '#FFBD2E',
  fullscreen: '#FF5F56',
  primary: '#313b53',
  pinky: 'rgb(252, 250, 255)',
  pinkest: 'rgb(246, 237, 250)',
  black: '#000',
  black95: 'rgba(0,0,0,0.95)',
  black90: 'rgba(0,0,0,0.9)',
  black80: 'rgba(0,0,0,0.8)',
  black70: 'rgba(0,0,0,0.7)',
  black60: 'rgba(0,0,0,0.6)',
  black50: 'rgba(0,0,0,0.5)',
  black40: 'rgba(0,0,0,0.4)',
  black30: 'rgba(0,0,0,0.3)',
  black20: 'rgba(0,0,0,0.2)',
  black10: 'rgba(0,0,0,0.1)',
  black05: 'rgba(0,0,0,0.05)',
  black025: 'rgba(0,0,0,0.025)',
  black0125: 'rgba(0,0,0,0.0125)',
  white: '#fff',
  white95: 'rgba(255,255,255,0.95)',
  white90: 'rgba(255,255,255,0.9)',
  white80: 'rgba(255,255,255,0.8)',
  white70: 'rgba(255,255,255,0.7)',
  white60: 'rgba(255,255,255,0.6)',
  white50: 'rgba(255,255,255,0.5)',
  white40: 'rgba(255,255,255,0.4)',
  white30: 'rgba(255,255,255,0.3)',
  white20: 'rgba(255,255,255,0.2)',
  white10: 'rgba(255,255,255,0.1)',
  white05: 'rgba(255,255,255,0.05)',
  white025: 'rgba(255,255,255,0.025)',
  white0125: 'rgba(255,255,255,0.0125)',
  gray0: '#f8f9fa',
  gray1: '#f1f3f5',
  gray2: '#e9ecef',
  gray3: '#dee2e6',
  gray4: '#ced4da',
  gray5: '#adb5bd',
  gray: '#adb5bd',
  gray6: '#868e96',
  gray7: '#495057',
  gray8: '#343a40',
  gray9: '#212529',
  red0: '#fff5f5',
  red1: '#ffe3e3',
  red2: '#ffc9c9',
  red3: '#ffa8a8',
  red4: '#ff8787',
  red5: '#ff6b6b',
  red: '#ff6b6b',
  red6: '#fa5252',
  red7: '#f03e3e',
  red8: '#e03131',
  red9: '#c92a2a',
  pink0: '#fff0f6',
  pink1: '#ffdeeb',
  pink2: '#fcc2d7',
  pink3: '#faa2c1',
  pink4: '#f783ac',
  pink5: '#f06595',
  pink: '#f06595',
  pink6: '#e64980',
  pink7: '#d6336c',
  pink8: '#c2255c',
  pink9: '#a61e4d',
  grape0: '#f8f0fc',
  grape1: '#f3d9fa',
  grape2: '#eebefa',
  grape3: '#e599f7',
  grape4: '#da77f2',
  grape5: '#cc5de8',
  grape: '#cc5de8',
  grape6: '#be4bdb',
  grape7: '#ae3ec9',
  grape8: '#9c36b5',
  grape9: '#862e9c',
  violet0: '#f3f0ff',
  violet1: '#e5dbff',
  violet2: '#d0bfff',
  violet3: '#b197fc',
  violet4: '#9775fa',
  violet5: '#845ef7',
  violet: '#845ef7',
  violet6: '#7950f2',
  violet7: '#7048e8',
  violet8: '#6741d9',
  violet9: '#5f3dc4',
  indigo0: '#edf2ff',
  indigo1: '#dbe4ff',
  indigo2: '#bac8ff',
  indigo3: '#91a7ff',
  indigo4: '#748ffc',
  indigo5: '#5c7cfa',
  indigo: '#5c7cfa',
  indigo6: '#4c6ef5',
  indigo7: '#4263eb',
  indigo8: '#3b5bdb',
  indigo9: '#364fc7',
  blue0: '#e7f5ff',
  blue1: '#d0ebff',
  blue2: '#a5d8ff',
  blue3: '#74c0fc',
  blue4: '#4dabf7',
  blue5: '#339af0',
  blue: '#339af0',
  blue6: '#228be6',
  blue7: '#1c7ed6',
  blue8: '#1971c2',
  blue9: '#1864ab',
  cyan0: '#e3fafc',
  cyan1: '#c5f6fa',
  cyan2: '#99e9f2',
  cyan3: '#66d9e8',
  cyan4: '#3bc9db',
  cyan5: '#22b8cf',
  cyan: '#22b8cf',
  cyan6: '#15aabf',
  cyan7: '#1098ad',
  cyan8: '#0c8599',
  cyan9: '#0b7285',
  teal0: '#e6fcf5',
  teal1: '#c3fae8',
  teal2: '#96f2d7',
  teal3: '#63e6be',
  teal4: '#38d9a9',
  teal5: '#20c997',
  teal: '#20c997',
  teal6: '#12b886',
  teal7: '#0ca678',
  teal8: '#099268',
  teal9: '#087f5b',
  green0: '#ebfbee',
  green1: '#d3f9d8',
  green2: '#b2f2bb',
  green3: '#8ce99a',
  green4: '#69db7c',
  green5: '#51cf66',
  green: '#51cf66',
  green6: '#40c057',
  green7: '#37b24d',
  green8: '#2f9e44',
  green9: '#2b8a3e',
  lime0: '#f4fce3',
  lime1: '#e9fac8',
  lime2: '#d8f5a2',
  lime3: '#c0eb75',
  lime4: '#a9e34b',
  lime5: '#94d82d',
  lime: '#94d82d',
  lime6: '#82c91e',
  lime7: '#74b816',
  lime8: '#66a80f',
  lime9: '#5c940d',
  yellow0: '#fff9db',
  yellow1: '#fff3bf',
  yellow2: '#ffec99',
  yellow3: '#ffe066',
  yellow4: '#ffd43b',
  yellow: '#fcc419',
  yellow5: '#fcc419',
  yellow6: '#fab005',
  yellow7: '#f59f00',
  yellow8: '#f08c00',
  yellow9: '#e67700',
  orange0: '#fff4e6',
  orange1: '#ffe8cc',
  orange2: '#ffd8a8',
  orange3: '#ffc078',
  orange4: '#ffa94d',
  orange: '#ff922b',
  orange5: '#ff922b',
  orange6: '#fd7e14',
  orange7: '#f76707',
  orange8: '#e8590c',
  orange9: '#d9480f'
}

export const fonts = {
  sans: "'Inter', sans-serif",
  mono: '"Operator Mono", "Fira Code", "SF Mono", "Roboto Mono", Menlo, monospace'
}

export const cx = key => colors[key] || key

export const gradient =
  'linear-gradient(90deg, #f76698, #c03fa2 60%, #8c1bab 100%)'

export const shadowOffsets = ['0px 5px 10px 0px', '0 8px 30px', '0 30px 60px']

export const shadowColors = [
  'rgba(0,0,0,0.12)',
  'rgba(0,0,0,0.12)',
  'rgba(0,0,0,0.12)'
]

export const shadows = shadowOffsets.map(
  (shadow, index) => `${shadow} ${shadowColors[index]}`
)

export const lineHeights = [1.2, 1.45, 1.6, 1.75, 1.8]

export const sizes = [
  1, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 72, 82, 96
].map(toEm)

export const speed = {
  quickly: 150,
  normal: 300,
  slowly: 450
}

export const timings = {
  short: 'cubic-bezier(.25,.8,.25,1)',
  medium: 'cubic-bezier(.25,.8,.25,1)',
  long: 'cubic-bezier(.4, 0, .2, 1)'
}

export const transition = {
  short: `${speed.quickly}ms ${timings.short}`,
  medium: `${speed.normal}ms ${timings.medium}`,
  long: `${speed.slowly}ms ${timings.long}`
}

export const textGradient = {
  WebkitPrintColorAdjust: 'exact',
  backgroundImage: gradient,
  backgroundSize: 'cover',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textFillColor: 'transparent',
  '&::selection': {
    WebkitTextFillColor: colors.black,
    textFillColor: colors.black
  }
}

export const variants = {
  text: {
    gradient: textGradient
  },
  buttons: {
    gradient: {
      background: 'red'
    },
    black: {
      background: 'black',
      color: 'white'
    },
    white: {
      background: 'white',
      color: 'black'
    }
  }
}

export const layout = {
  large: toPx(960),
  normal: toPx(780),
  small: toPx(650)
}

export const touchTargets = {
  minHeight: toPx(44)
}

export const letterSpacings = [0, -0.025, 0.025, 0.1, 0.25].map(toEm)

const theme = {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  gradient,
  layout,
  letterSpacings,
  lineHeights,
  radii,
  shadowOffsets,
  shadows,
  sizes,
  space,
  speed,
  timings,
  transition,
  variants
}

export default theme
