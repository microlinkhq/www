import { between, cycleOf, easeInOut, translate, writeText } from './timing'

const RETRACT_END = 0.12
const COUNTDOWN = [
  [0.12, 'T-3'],
  [0.18, 'T-2'],
  [0.24, 'T-1']
]
const LIFT = 0.3
const CLIMB_END = 0.62
const FADE_FROM_HEIGHT = 70
const FADE_TO_HEIGHT = 190
const SPARE_OUT = [0.64, 0.72]
const PAD_IN = [0.72, 0.84]
const ARM_IN = [0.84, 0.96]
const SPARE_IN = [0.86, 0.98]

const displayAt = phase => {
  if (phase < RETRACT_END) return 'ARM'
  if (phase < LIFT) return COUNTDOWN.filter(([from]) => phase >= from).pop()[1]
  if (phase < CLIMB_END) return 'LIFT'
  return 'NEXT'
}

const statusAt = phase => {
  if (phase < RETRACT_END) return 'on the pad'
  if (phase < LIFT) return 'countdown'
  if (phase < CLIMB_END) return 'climbing'
  return 'loading the next'
}

export const createLaunchPadPose = motion => root => {
  const rocket = root.querySelector('[data-part="rocket"]')
  const arm = root.querySelector('[data-part="arm"]')
  const spare = root.querySelector('[data-part="spare"]')
  const display = root.querySelector('[data-part="display"]')
  const readout = root.querySelector('[data-readout]')

  return time => {
    const { cycle, phase } = cycleOf(time, motion.period)
    const retract =
      easeInOut(between(phase, 0, RETRACT_END)) -
      easeInOut(between(phase, ARM_IN[0], ARM_IN[1]))
    const climbing = between(phase, LIFT, CLIMB_END)
    const height = phase < CLIMB_END ? motion.climb * climbing * climbing : 0
    const rocketOpacity =
      phase < CLIMB_END
        ? 1 - between(height, FADE_FROM_HEIGHT, FADE_TO_HEIGHT)
        : between(phase, PAD_IN[0], PAD_IN[1])
    const spareOpacity =
      phase < SPARE_IN[0]
        ? 1 - between(phase, SPARE_OUT[0], SPARE_OUT[1])
        : between(phase, SPARE_IN[0], SPARE_IN[1])

    arm.setAttribute(
      'transform',
      translate(motion.x, -motion.retract * retract)
    )
    rocket.setAttribute('transform', translate(motion.z, height))
    rocket.setAttribute('opacity', rocketOpacity.toFixed(3))
    spare.setAttribute('opacity', spareOpacity.toFixed(3))
    writeText(display, displayAt(phase))
    const shipped = cycle + (phase >= LIFT ? 1 : 0)
    writeText(readout, `shipped ${shipped} · ${statusAt(phase)}`)
  }
}
