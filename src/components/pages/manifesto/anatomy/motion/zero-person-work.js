import { between, cycleOf, easeInOut, translate, writeText } from './timing'

const HIT = 0.16
const LIFT = 0.22
const PRESS_END = 0.38
const COUNTER_DIGITS = 4

const pressAt = phase => {
  if (phase < HIT) return easeInOut(phase / HIT)
  if (phase < LIFT) return 1
  return 1 - easeInOut(between(phase, LIFT, PRESS_END))
}

const fadeAt = (x, { fadeFrom, fadeTo }) => {
  if (x > fadeFrom) return 1 - between(x, fadeFrom, fadeTo)
  if (x < -fadeFrom) return between(x, -fadeTo, -fadeFrom)
  return 1
}

export const createStampingJigPose = motion => root => {
  const ram = root.querySelector('[data-part="ram"]')
  const cards = [...root.querySelectorAll('[data-card]')]
  const marks = [...root.querySelectorAll('[data-mark]')]
  const counter = root.querySelector('[data-part="counter"]')
  const readout = root.querySelector('[data-readout]')

  return time => {
    const { cycle, phase } = cycleOf(time, motion.period)
    const hit = phase >= HIT
    const shift = easeInOut(between(phase, PRESS_END, 1)) * motion.pitch
    ram.setAttribute(
      'transform',
      translate(motion.z, -motion.travel * pressAt(phase))
    )
    cards.forEach((card, index) => {
      const x = motion.cards[index] + shift
      card.setAttribute('transform', translate(motion.x, shift))
      card.setAttribute('opacity', fadeAt(x, motion).toFixed(3))
      const stamped = x > 0.5 || (motion.cards[index] === 0 && hit)
      marks[index].setAttribute('opacity', stamped ? '1' : '0')
    })
    const stamped = motion.prestamped + cycle + (hit ? 1 : 0)
    writeText(counter, String(stamped).padStart(COUNTER_DIGITS, '0'))
    writeText(readout, `by hand 1 · by the jig ${stamped}`)
  }
}
