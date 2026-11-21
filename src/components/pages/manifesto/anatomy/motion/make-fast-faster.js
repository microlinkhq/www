import { between, easeInOut, translate2, writeText } from './timing'

const GATE_LIFT_SECONDS = 0.25
const GATE_OPEN_SECONDS = 0.5
const SINK_SECONDS = 0.3
const RESPAWN_SECONDS = 0.5

const fallTime = (distance, acceleration) =>
  Math.sqrt((2 * distance) / acceleration)

const planOf = motion => {
  const [first, second] = motion.gates
  const legs = [first, second - first, motion.length - second]
  const releases = []
  let clock = 0
  legs.forEach((leg, index) => {
    releases.push(clock)
    clock += fallTime(leg, motion.acceleration)
    if (index < motion.waits.length) clock += motion.waits[index]
  })
  return {
    legs,
    releases,
    gated: clock,
    direct: fallTime(motion.length, motion.acceleration)
  }
}

const gatedDistance = (elapsed, motion, plan) => {
  let covered = 0
  for (let index = 0; index < plan.legs.length; index++) {
    const since = elapsed - plan.releases[index]
    if (since < 0) return covered
    const travel = Math.min(
      plan.legs[index],
      0.5 * motion.acceleration * since * since
    )
    if (travel < plan.legs[index]) return covered + travel
    covered += plan.legs[index]
  }
  return covered
}

const directDistance = (elapsed, motion) =>
  Math.min(motion.length, 0.5 * motion.acceleration * Math.max(0, elapsed) ** 2)

export const createMarbleRunPose = motion => root => {
  const balls = {
    gated: root.querySelector('[data-part="ball-gated"]'),
    direct: root.querySelector('[data-part="ball-direct"]')
  }
  const gates = [...root.querySelectorAll('[data-gate]')]
  const times = {
    gated: root.querySelector('[data-part="time-gated"]'),
    direct: root.querySelector('[data-part="time-direct"]')
  }
  const readout = root.querySelector('[data-readout]')
  const plan = planOf(motion)
  const totals = { gated: plan.gated, direct: plan.direct }

  return time => {
    const local = time % motion.period
    const elapsed = local - motion.startAt
    const respawn = between(
      local,
      motion.period - RESPAWN_SECONDS,
      motion.period
    )
    const distances = {
      gated: gatedDistance(elapsed, motion, plan),
      direct: directDistance(elapsed, motion)
    }

    Object.entries(balls).forEach(([name, ball]) => {
      const total = totals[name]
      const sunk = easeInOut(between(elapsed, total, total + SINK_SECONDS))
      const placed = respawn > 0 ? 0 : distances[name]
      ball.setAttribute(
        'transform',
        translate2(
          motion.direction,
          placed,
          motion.z,
          respawn > 0 ? 0 : -motion.lift * 0.4 * sunk
        )
      )
      ball.setAttribute(
        'opacity',
        (respawn > 0 ? respawn : 1 - sunk).toFixed(3)
      )
      const shown = Math.max(0, Math.min(elapsed, total))
      writeText(times[name], shown.toFixed(1))
    })

    gates.forEach((gate, index) => {
      const release = plan.releases[index + 1] - GATE_LIFT_SECONDS
      const opening = easeInOut(
        between(elapsed, release, release + GATE_LIFT_SECONDS)
      )
      const closing = easeInOut(
        between(
          elapsed,
          release + GATE_OPEN_SECONDS,
          release + GATE_OPEN_SECONDS + GATE_LIFT_SECONDS
        )
      )
      gate.setAttribute(
        'transform',
        translate2(
          motion.direction,
          0,
          motion.z,
          motion.lift * (opening - closing)
        )
      )
    })

    const gatedShown = Math.max(0, Math.min(elapsed, plan.gated)).toFixed(1)
    const directShown = Math.max(0, Math.min(elapsed, plan.direct)).toFixed(1)
    writeText(readout, `with gates ${gatedShown} s · without ${directShown} s`)
  }
}
