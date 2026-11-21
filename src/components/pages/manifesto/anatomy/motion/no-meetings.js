import { between, cycleOf, easeInOut, translate, writeText } from './timing'

const TYPING_END = 0.82
const RETURN_SHARE = 0.2
const STRIKE_SHARE = 0.45
const JUMP_FROM = 0.6
const SPACE_EVERY = 5
const FADE_TEXT = [0.84, 0.9]
const SHIP = [0.86, 0.93]
const KEY_SEED = 7

const keyFor = (line, char, keys) =>
  (line * 31 + char * KEY_SEED + (((line + 1) * (char + 3)) % 11)) % keys

const lineState = (phase, motion) => {
  const span = TYPING_END / motion.lines
  const line = Math.min(motion.lines - 1, Math.floor(phase / span))
  const within = phase >= TYPING_END ? 1 : (phase - line * span) / span
  const typing = Math.min(1, within / (1 - RETURN_SHARE))
  const chars = typing * motion.chars
  const returning = between(within, 1 - RETURN_SHARE, 1)
  return { line, chars, returning, typing: within < 1 - RETURN_SHARE }
}

export const createTypewriterPose = motion => root => {
  const carriage = root.querySelector('[data-part="carriage"]')
  const strike = root.querySelector('[data-part="strike"]')
  const lines = [...root.querySelectorAll('[data-line]')]
  const keys = [...root.querySelectorAll('[data-key]')].filter(
    key => key.dataset.key !== 'space'
  )
  const space = root.querySelector('[data-key="space"]')
  const sheets = [...root.querySelectorAll('[data-sheet]')]
  const readout = root.querySelector('[data-readout]')
  const capacity = motion.sheets - motion.stacked
  let pressed = null

  const press = node => {
    if (pressed === node) return
    if (pressed) pressed.removeAttribute('transform')
    if (node) node.setAttribute('transform', translate(motion.z, -motion.press))
    pressed = node
  }

  return time => {
    const { cycle, phase } = cycleOf(time, motion.period)
    const { line, chars, returning, typing } = lineState(phase, motion)
    const whole = Math.min(motion.chars, Math.floor(chars))
    const fraction = chars - whole
    const jumped = whole + easeInOut(between(fraction, JUMP_FROM, 1))
    const travelled = typing
      ? jumped
      : motion.chars * (1 - easeInOut(returning))
    carriage.setAttribute(
      'transform',
      translate(motion.x, motion.rest - travelled * motion.step)
    )

    const striking = typing && phase < TYPING_END && fraction < STRIKE_SHARE
    if (striking) {
      press(
        whole % SPACE_EVERY === SPACE_EVERY - 1
          ? space
          : keys[keyFor(line, whole, keys.length)]
      )
    } else {
      press(null)
    }
    strike.setAttribute('opacity', striking ? '1' : '0.35')

    const textOpacity = 1 - between(phase, FADE_TEXT[0], FADE_TEXT[1])
    lines.forEach((node, index) => {
      const typed =
        index < line || phase >= TYPING_END
          ? motion.chars
          : index === line
            ? whole + (striking ? 1 : 0)
            : 0
      node.setAttribute(
        'x2',
        (motion.margin + Math.min(motion.chars, typed) * motion.step).toFixed(2)
      )
      node.setAttribute('opacity', textOpacity.toFixed(3))
    })

    const filled = cycle % capacity
    const shipping = between(phase, SHIP[0], SHIP[1])
    sheets.forEach((sheet, index) => {
      const shown =
        index < motion.stacked + filled
          ? 1
          : index === motion.stacked + filled
            ? shipping
            : 0
      sheet.setAttribute('opacity', shown.toFixed(3))
    })

    writeText(
      readout,
      phase >= TYPING_END
        ? 'page shipped · meetings 0'
        : `line ${line + 1} of ${motion.lines} · meetings 0`
    )
  }
}
