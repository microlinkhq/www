import {
  between,
  cycleOf,
  easeInOut,
  planeRotation,
  translate3,
  writeText
} from './timing'

const TRAVEL_IN = [0.02, 0.14]
const STROKES_FROM = 0.14
const STROKES_TO = 0.66
const TIGHTEN_SHARE = 0.6
const STRIPE_IN = [0.68, 0.74]
const TRAVEL_OUT = [0.74, 0.88]
const LOOSEN = [0.9, 0.98]
const HOP = 14

const travelAt = phase => {
  if (phase < TRAVEL_OUT[0]) {
    return 1 - easeInOut(between(phase, TRAVEL_IN[0], TRAVEL_IN[1]))
  }
  return easeInOut(between(phase, TRAVEL_OUT[0], TRAVEL_OUT[1]))
}

const strokeAt = (phase, strokes) => {
  const run = between(phase, STROKES_FROM, STROKES_TO) * strokes
  const index = Math.min(strokes - 1, Math.floor(run))
  const within = phase >= STROKES_TO ? 1 : run - index
  const turning = Math.min(1, within / TIGHTEN_SHARE)
  const swing =
    within < TIGHTEN_SHARE
      ? easeInOut(turning)
      : 1 - easeInOut(between(within, TIGHTEN_SHARE, 1))
  return { progress: (index + turning) / strokes, swing }
}

export const createTorqueWrenchPose = motion => root => {
  const wrench = root.querySelector('[data-part="wrench"]')
  const handle = root.querySelector('[data-part="handle"]')
  const needle = root.querySelector('[data-part="needle"]')
  const bolt = root.querySelector('[data-part="bolt"]')
  const stripe = root.querySelector('[data-part="stripe"]')
  const readout = root.querySelector('[data-readout]')
  const rotate = planeRotation(motion.x, motion.y)
  const axes = [motion.x, motion.y, motion.z]

  return time => {
    const { phase } = cycleOf(time, motion.period)
    const { progress, swing } =
      phase < STROKES_FROM
        ? { progress: 0, swing: 0 }
        : strokeAt(phase, motion.strokes)
    const loosened = easeInOut(between(phase, LOOSEN[0], LOOSEN[1]))
    const seat = phase >= LOOSEN[0] ? 1 - loosened : progress
    const away = travelAt(phase)
    const [px, py, pz] = motion.park
    const hop = Math.sin(Math.PI * away) * HOP

    bolt.setAttribute(
      'transform',
      translate3(axes, [0, 0, -motion.lift * seat])
    )
    wrench.setAttribute(
      'transform',
      translate3(axes, [
        px * away,
        py * away,
        pz * away + hop - motion.lift * progress * (1 - away)
      ])
    )
    handle.setAttribute(
      'transform',
      rotate(motion.socket, -motion.stroke * (phase < STROKES_TO ? swing : 0))
    )
    const torque =
      phase >= TRAVEL_OUT[0] ? 0 : motion.target * Math.pow(progress, 3)
    needle.setAttribute(
      'transform',
      rotate(motion.dial, (motion.sweep * torque) / motion.target)
    )
    const striped = between(phase, STRIPE_IN[0], STRIPE_IN[1]) * (1 - loosened)
    stripe.setAttribute('opacity', striped.toFixed(3))

    if (phase < STROKES_FROM || phase >= LOOSEN[1]) {
      writeText(readout, 'bolt 1 · loose')
    } else if (phase < STROKES_TO) {
      writeText(
        readout,
        `turning · ${Math.round(torque)} of ${motion.target} Nm`
      )
    } else {
      writeText(readout, `seated · ${motion.target} Nm · striped`)
    }
  }
}
