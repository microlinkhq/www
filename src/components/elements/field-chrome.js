import { transition, colors, theme, touchTargets } from 'theme'

const FOCUS_RING_WIDTH = '3px'
const DISABLED_OPACITY = 0.55

export const focusRing = color =>
  `0 0 0 ${FOCUS_RING_WIDTH} color-mix(in oklch, ${color} 20%, transparent)`

export const fieldChromeTokens = theme({
  bg: 'white',
  color: 'black80',
  border: 1,
  borderColor: 'black10',
  borderRadius: 4
})

const focusedField = color => ({
  borderColor: color,
  boxShadow: focusRing(color)
})

export const fieldChrome = ({ focus, invalid, disabled }) => ({
  minHeight: touchTargets.minHeight,
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  transition: ['border-color', 'box-shadow', 'opacity']
    .map(property => `${property} ${transition.short}`)
    .join(', '),
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none'
  },
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      borderColor: colors.black20
    }
  },
  [focus]: focusedField(colors.link),
  [invalid]: {
    borderColor: colors.red8
  },
  [`${invalid}${focus.slice(1)}`]: focusedField(colors.red8),
  [disabled]: {
    opacity: DISABLED_OPACITY,
    cursor: 'not-allowed'
  }
})
