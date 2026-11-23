import * as k from '../kit/iso-kit.mjs'
import * as G from '../kit/lathe.mjs'

import { basePlate, createScene, labelPlate, plateExtent, rulerStrip } from '../scene.mjs'

const PLATE = { x: -104, y: -56, w: 208, d: 112, r: 10 }

const COLUMN_R = 4.4
const PIVOT_Z = 94
const ARM = 66
const BEAM_HALF_HEIGHT = 2.6
const BEAM_DEPTH = 5
const HANG = 40
const PAN_R = 19
const PAN_H = 2
const PAN_Z = PIVOT_Z - HANG

const CRATE = { w: 24, d: 24, h: 16 }
const COIN_R = 5.6
const COIN_H = 1.8
const COINS = 12
const COST_IN_COINS = 8

const DIAL_R = 26
const DIAL_FROM = BEAM_DEPTH / 2 + 2.2
const DIAL_Y = DIAL_FROM + 1.4
const COIN_Y = 10
const DIAL_SPAN = 0.62
const NEEDLE = 22

const HOPPER = { x: ARM - 9, y: COIN_Y - 9, w: 18, d: 18, r: 2 }
const HOPPER_Z = PIVOT_Z + 22
const HOPPER_TOP = HOPPER_Z + 14
const MAST = [ARM + 24, -20]

const extent = [
  ...plateExtent(PLATE),
  [-ARM - PAN_R, 0, PIVOT_Z + 6],
  [ARM, 0, HOPPER_TOP + 4],
  [MAST[0], MAST[1], HOPPER_TOP + 4]
]

const pointIn = (x, z, y = DIAL_Y) => [x, y, PIVOT_Z + z]

const dialPlate = scene => {
  const { P, S, L, D, at } = scene
  const plate = G.frameOf([0, DIAL_FROM, PIVOT_Z], [0, 1, 0], [1, 0, 0], [0, 0, 1])
  const arc = []
  const ticks = []
  const steps = 24
  for (let i = 0; i <= steps; i++) {
    const angle = -DIAL_SPAN + (2 * DIAL_SPAN * i) / steps
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    arc.push(k.iso(pointIn(sin * DIAL_R, -cos * DIAL_R), P))
    const reach = i % 6 === 0 ? 3 : 1.6
    ticks.push({ major: i % 6 === 0, d: k.segment(pointIn(sin * DIAL_R, -cos * DIAL_R), pointIn(sin * (DIAL_R - reach), -cos * (DIAL_R - reach)), P), zero: i === steps / 2 })
  }
  const fan = [
    [0, 0],
    ...Array.from({ length: 13 }, (_, i) => {
      const angle = -DIAL_SPAN + (2 * DIAL_SPAN * i) / 12
      return [Math.sin(angle) * (DIAL_R + 3), -Math.cos(angle) * (DIAL_R + 3)]
    })
  ]
  return [
    S(G.prismOf(plate, fan, 0, 1.4, P), { tone: 'mid' }),
    L(`M${arc.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L')}`, { tone: 'lo' }),
    L(ticks.filter(tick => !tick.major).map(tick => tick.d).join(''), { tone: 'lo' }),
    L(ticks.filter(tick => tick.major && !tick.zero).map(tick => tick.d).join(''), { tone: 'mid' }),
    L(ticks.filter(tick => tick.zero).map(tick => tick.d).join(''), { tone: 'hi' }),
    D([at(pointIn(0, 0))], { size: 0.5 })
  ].join('')
}

const beam = scene => {
  const { P, S, D, at } = scene
  const F = G.frameOf([0, -BEAM_DEPTH / 2, PIVOT_Z], [0, 1, 0], [1, 0, 0], [0, 0, 1])
  const body = [
    [-ARM - 3, -BEAM_HALF_HEIGHT * 0.7],
    [-ARM - 3, BEAM_HALF_HEIGHT * 0.7],
    [-8, BEAM_HALF_HEIGHT],
    [0, BEAM_HALF_HEIGHT + 3],
    [8, BEAM_HALF_HEIGHT],
    [ARM + 3, BEAM_HALF_HEIGHT * 0.7],
    [ARM + 3, -BEAM_HALF_HEIGHT * 0.7],
    [8, -BEAM_HALF_HEIGHT],
    [0, -BEAM_HALF_HEIGHT - 2],
    [-8, -BEAM_HALF_HEIGHT]
  ]
  const front = BEAM_DEPTH / 2
  return `<g data-part="beam">${[
    S(G.prismOf(F, body, 0, BEAM_DEPTH, P), { tone: 'mid' }),
    D([-ARM, ARM].map(x => at([x, front, PIVOT_Z])), { size: 0.6 })
  ].join('')}</g>`
}

const needle = scene => {
  const { P, S } = scene
  return `<g data-part="needle">${[
    `<path class="iso-line" data-tone="lit" data-free="end" style="stroke-width:1.1" d="${k.segment(pointIn(0, -2), pointIn(0, -NEEDLE), P)}"/>`,
    S(G.disc(0, 1.4, 3, G.frameAlong([0, DIAL_Y, PIVOT_Z], [0, 1, 0]), P), { tone: 'hi' })
  ].join('')}</g>`
}

const pan = (scene, x, side, load) => {
  const { P, S, L } = scene
  const hook = [x, 0, PIVOT_Z - 8]
  const [towardX, towardY] = k.towardViewer(P)
  const rods = [0, 1, 2].map(i => {
    const angle = Math.PI / 6 + (i * Math.PI * 2) / 3
    const rim = [Math.cos(angle), Math.sin(angle)]
    return {
      front: rim[0] * towardX + rim[1] * towardY > 0,
      d: k.segment(hook, [x + rim[0] * PAN_R, rim[1] * PAN_R, PAN_Z + PAN_H], P)
    }
  })
  const stem = k.segment([x, BEAM_DEPTH / 2, PIVOT_Z - BEAM_HALF_HEIGHT * 0.7], hook, P)
  const back = rods.filter(rod => !rod.front).map(rod => rod.d).join('')
  const front = rods.filter(rod => rod.front).map(rod => rod.d).join('')
  return `<g data-part="pan-${side}">${[
    `<path class="iso-halo" d="${k.haloOf({ x: x - PAN_R, y: -PAN_R, w: PAN_R * 2, d: PAN_R * 2, r: PAN_R }, PAN_Z - 2, 0.1, P)}" style="filter:blur(4px);opacity:.5"/>`,
    S(k.cylinder(x, 0, PAN_R, PAN_Z, PAN_H, P, 64, 0.6), { tone: 'hi', crease: 'lo' }),
    L(k.ring(x, 0, PAN_R - 3, PAN_Z + PAN_H, P, 56), { tone: 'faint' }),
    L(back, { tone: 'mid' }),
    load,
    L(front + stem, { tone: 'mid' }),
    S(G.sphereOf(hook, 1.8, P), { tone: 'hi' })
  ].join('')}</g>`
}

const crate = (scene, x) => {
  const { P, S, L, D, at } = scene
  const plan = { x: x - CRATE.w / 2, y: -CRATE.d / 2, w: CRATE.w, d: CRATE.d, r: 1 }
  const z = PAN_Z + PAN_H
  const top = z + CRATE.h
  const slats = [6, 12, 18].map(dx => k.lineOnTop([plan.x + dx, plan.y], [plan.x + dx, plan.y + plan.d], top, P)).join('')
  return [
    S(k.slabOf(plan, z, CRATE.h, P, 2, 0.5), {
      tone: 'mid',
      inner: L([z + CRATE.h / 3, z + (2 * CRATE.h) / 3].map(h => k.sideSeam(plan, h, P, 2)).join(''), { tone: 'faint' })
    }),
    L(slats, { tone: 'faint' }),
    D(k.corners(plan, 2.4).map(([px, py]) => at([px, py, top])), { size: 0.45 })
  ].join('')
}

const coinStack = (scene, x) => {
  const { P, S, L } = scene
  const z = PAN_Z + PAN_H
  return Array.from({ length: COINS }, (_, index) => {
    const bottom = z + index * COIN_H
    return `<g data-coin="${index}" opacity="0">${S(k.cylinder(x, COIN_Y, COIN_R, bottom, COIN_H, P, 40, 0.3), { tone: 'hi', crease: 'lo' })}${L(k.ring(x, COIN_Y, COIN_R - 1.4, bottom + COIN_H, P, 32), { tone: 'faint' })}</g>`
  }).join('')
}

const fallingCoin = scene => {
  const { P, S } = scene
  return `<g data-part="drop" opacity="0">${S(k.cylinder(ARM, COIN_Y, COIN_R, HOPPER_Z - COIN_H, COIN_H, P, 40, 0.3), { tone: 'hi', crease: 'lo' })}</g>`
}

const column = scene => {
  const { P, S, L, D, at } = scene
  const foot = { x: -18, y: -16, w: 36, d: 32, r: 3 }
  return [
    S(k.slabOf(foot, 0, 6, P, 4, 0.6), { tone: 'mid' }),
    D(k.corners(foot, 3.4).map(([x, y]) => at([x, y, 6])), { size: 0.45 }),
    S(k.cylinder(0, 0, 8, 6, 3, P, 40, 0.4), { tone: 'mid' }),
    S(k.cylinder(0, 0, COLUMN_R, 9, PIVOT_Z - 14 - 9, P, 32), { tone: 'mid', crease: 'none' }),
    L([30, 56, 82].map(z => k.sideArc(0, 0, COLUMN_R, z, P, 24)).join(''), { tone: 'faint' }),
    S(k.slabOf({ x: -6, y: -BEAM_DEPTH / 2 - 2, w: 12, d: BEAM_DEPTH + 4, r: 1.2 }, PIVOT_Z - 14, 8, P, 2, 0.5), { tone: 'mid' })
  ].join('')
}

const hopper = scene => {
  const { P, S, L, D, at } = scene
  const [mx, my] = MAST
  const arm = { x: ARM + 6, y: my - 2, w: mx - ARM - 6, d: 4, r: 1 }
  const neck = { x: ARM + 2, y: my - 2, w: 6, d: -my + 2 - HOPPER.y + 2, r: 1 }
  return [
    S(k.cylinder(mx, my, 6, 0, 3, P, 28, 0.4), { tone: 'mid' }),
    S(k.cylinder(mx, my, 2.4, 3, HOPPER_TOP + 4 - 3, P, 20), { tone: 'mid', crease: 'none' }),
    S(k.slabOf(arm, HOPPER_TOP - 2, 4, P, 2), { tone: 'mid' }),
    S(k.slabOf(neck, HOPPER_TOP - 2, 4, P, 2), { tone: 'mid' }),
    S(k.cylinder(ARM, COIN_Y, 3.4, HOPPER_Z - 3, 3, P, 24), { tone: 'lo' }),
    S(k.slabOf(HOPPER, HOPPER_Z, HOPPER_TOP - HOPPER_Z, P, 3, 0.6), { tone: 'mid', inner: L(k.sideSeam(HOPPER, HOPPER_Z + 4, P, 3), { tone: 'faint' }) }),
    L(k.planOutline(k.insetPlan(HOPPER, 2.4), HOPPER_TOP, P, 3), { tone: 'lo' }),
    D([at([mx, my, HOPPER_TOP + 4])], { size: 0.5 })
  ].join('')
}

export default {
  id: 'everyone-profitable',
  fig: 'Fig 03',
  title: 'Balance scale',
  hint: 'Hover to drop coins',
  label: 'A balance scale. The left pan holds a crate that stands for what a project costs; coins drop one by one from a hopper onto the right pan. Once the coins outweigh the crate the beam tips and the needle crosses zero: the project pays for itself.',
  build () {
    const scene = createScene({ points: extent, azimuth: 60 })
    const { at, vector } = scene
    const body = [
      basePlate(scene, PLATE),
      rulerStrip(scene, { x: -90, y: PLATE.y + PLATE.d - 15, w: 104, d: 7, r: 1 }),
      labelPlate(scene, { x: 40, y: PLATE.y + PLATE.d - 26, w: 34, d: 16, r: 1.4 }),
      pan(scene, -ARM, 'cost', crate(scene, -ARM)),
      column(scene),
      beam(scene),
      dialPlate(scene),
      needle(scene),
      hopper(scene),
      fallingCoin(scene),
      pan(scene, ARM, 'earned', coinStack(scene, ARM))
    ]
    const pivotAt = y => at([0, y, PIVOT_Z]).map(value => Math.round(value * 100) / 100)
    return {
      body,
      motion: {
        period: 9,
        coins: COINS,
        cost: COST_IN_COINS,
        arm: ARM,
        drop: HOPPER_Z - COIN_H - (PAN_Z + PAN_H),
        coinHeight: COIN_H,
        tilt: 0.12,
        beamPivot: pivotAt(0),
        needlePivot: pivotAt(DIAL_Y),
        x: vector([1, 0, 0]),
        z: vector([0, 0, 1])
      },
      readout: `earned 0 of ${COST_IN_COINS} · not yet`
    }
  }
}
