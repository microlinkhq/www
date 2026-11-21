import {
  between,
  cycleOf,
  planeRotation,
  translate2,
  writeText
} from './timing'

const FIRST_LANDING = 0.06
const LANDING_GAP = 0.055
const FALL = 0.04
const SPEND = [0.84, 0.92]
const SETTLE_SECONDS = 0.16
const SWAY_SECONDS = 0.55
const RETURN = [0.9, 1]

const landingOf = index => FIRST_LANDING + index * LANDING_GAP

const landedAt = (phase, coins) => {
  if (phase >= SPEND[0]) return 0
  let count = 0
  while (count < coins && phase >= landingOf(count)) count++
  return count
}

export const createBalanceScalePose = motion => root => {
  const beam = root.querySelector('[data-part="beam"]')
  const needle = root.querySelector('[data-part="needle"]')
  const left = root.querySelector('[data-part="pan-cost"]')
  const right = root.querySelector('[data-part="pan-earned"]')
  const drop = root.querySelector('[data-part="drop"]')
  const coins = [...root.querySelectorAll('[data-coin]')]
  const readout = root.querySelector('[data-readout]')

  const rotationAround = planeRotation(motion.x, motion.z)
  const tiltFor = count =>
    motion.tilt *
    Math.max(-0.5, Math.min(1, (motion.cost - count) / motion.cost))

  return time => {
    const { phase } = cycleOf(time, motion.period)
    const count = landedAt(phase, motion.coins)
    const since =
      count > 0 ? (phase - landingOf(count - 1)) * motion.period : Infinity
    const previous = tiltFor(Math.max(0, count - 1))
    const settled = tiltFor(count)
    const sway =
      count > 0
        ? (previous - settled) *
        Math.exp(-since / SETTLE_SECONDS) *
        Math.cos((2 * Math.PI * since) / SWAY_SECONDS)
        : 0
    const angle =
      phase >= SPEND[0]
        ? tiltFor(motion.coins) +
        (tiltFor(0) - tiltFor(motion.coins)) *
          between(phase, RETURN[0], RETURN[1])
        : settled + sway

    beam.setAttribute('transform', rotationAround(motion.beamPivot, angle))
    needle.setAttribute('transform', rotationAround(motion.needlePivot, angle))
    const lift = motion.arm * Math.sin(angle)
    const reach = motion.arm * (Math.cos(angle) - 1)
    left.setAttribute(
      'transform',
      translate2(motion.x, -reach, motion.z, -lift)
    )
    right.setAttribute('transform', translate2(motion.x, reach, motion.z, lift))

    const spent = 1 - between(phase, SPEND[0], SPEND[1])
    coins.forEach((coin, index) => {
      coin.setAttribute(
        'opacity',
        index < count
          ? '1'
          : phase >= SPEND[0] && index < motion.coins
            ? spent.toFixed(3)
            : '0'
      )
    })

    const falling =
      count < motion.coins &&
      phase < SPEND[0] &&
      phase >= landingOf(count) - FALL
    if (falling) {
      const progress = between(phase, landingOf(count) - FALL, landingOf(count))
      const distance = motion.drop - count * motion.coinHeight - lift
      drop.setAttribute('opacity', '1')
      drop.setAttribute(
        'transform',
        translate2(motion.x, reach, motion.z, -distance * progress * progress)
      )
    } else {
      drop.setAttribute('opacity', '0')
    }

    const shown = phase >= SPEND[0] ? motion.coins : count
    const verdict = shown >= motion.cost ? 'pays for itself' : 'not yet'
    writeText(readout, `earned ${shown} of ${motion.cost} · ${verdict}`)
  }
}
