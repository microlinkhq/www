import * as k from '../kit/iso-kit.mjs'
import * as G from '../kit/lathe.mjs'

import { basePlate, createScene, labelPlate, plateExtent, rulerStrip } from '../scene.mjs'

const PLATE = { x: -112, y: -56, w: 232, d: 112, r: 10 }

const FROM = [-84, 56]
const TO = [76, 16]
const LANES = { gated: -16, direct: 16 }
const RAIL_GAP = 3
const RAIL_R = 0.8
const BALL_R = 3.2
const BALL_LIFT = 2.6
const TIE_DROP = 3.2
const TIE_H = 2.4
const POSTS = [-84, -30, 24, 76]
const GATES = [-30, 24]
const START = { x: -104, y: -26, w: 22, d: 52, r: 3 }
const FINISH = { x: 80, y: -26, w: 22, d: 52, r: 3 }
const FINISH_TOP = 14
const DISPLAY = { w: 16, h: 8, z: 3 }

const SLOPE = (TO[1] - FROM[1]) / (TO[0] - FROM[0])
const railZ = x => FROM[1] + (x - FROM[0]) * SLOPE
const LENGTH = Math.hypot(TO[0] - FROM[0], TO[1] - FROM[1])
const DIRECTION = [(TO[0] - FROM[0]) / LENGTH, 0, (TO[1] - FROM[1]) / LENGTH]
const alongTo = x => (x - FROM[0]) / DIRECTION[0]

const extent = [...plateExtent(PLATE), [START.x, START.y, FROM[1] + 14], [START.x + START.w, START.y + START.d, FROM[1] + 14]]

const rail = (scene, y) => {
  const { P, S } = scene
  const F = G.frameAlong([FROM[0], y, FROM[1]], DIRECTION)
  return S(G.disc(0, LENGTH, RAIL_R, F, P), { tone: 'mid', crease: 'none' })
}

const ball = (scene, lane) => {
  const { P, S } = scene
  const center = [FROM[0] + 3, LANES[lane], railZ(FROM[0] + 3) + BALL_LIFT]
  return `<g data-part="ball-${lane}">${S(G.sphereOf(center, BALL_R, P), { tone: 'hi', lit: lane === 'direct' })}</g>`
}

const posts = (scene, y) => {
  const { P, S } = scene
  return POSTS.map(x => S(k.cylinder(x, y, 2.2, 0, railZ(x) - TIE_DROP, P, 20), { tone: 'mid', crease: 'none' }) + S(k.cylinder(x, y, 4, 0, 1.6, P, 24), { tone: 'lo' })).join('')
}

const ties = scene => {
  const { P, S, L, D, at } = scene
  return POSTS.map(x => {
    const z = railZ(x) - TIE_DROP
    const plan = { x: x - 2.4, y: LANES.gated - 8, w: 4.8, d: LANES.direct - LANES.gated + 16, r: 1 }
    const out = [S(k.slabOf(plan, z, TIE_H, P, 2, 0.3), { tone: 'mid' })]
    if (GATES.includes(x)) {
      const holes = [LANES.direct - 6.4, LANES.direct + 4.4]
      out.push(L(k.planOutline({ x: x - 2, y: LANES.direct - 9, w: 4, d: 15, r: 1 }, z + TIE_H, P, 2), { tone: 'faint' }))
      out.push(L(holes.map(y => k.ring(x, y, 1.6, z + TIE_H, P, 16)).join(''), { tone: 'mid' }))
      out.push(D(holes.map(y => at([x, y, z + TIE_H])), { size: 0.35, tone: 'lo' }))
    }
    return out.join('')
  }).join('')
}

const gate = (scene, x, index) => {
  const { P, S, L, D, at } = scene
  const y = LANES.gated
  const z = railZ(x)
  const bracket = { x: x - 1.6, y: y - 7.6, w: 3.2, d: 2.4, r: 0.6 }
  const blade = { x: x + BALL_R - 0.4, y: y - 5.2, w: 2.2, d: 10.4, r: 0.5 }
  return [
    S(k.slabOf(bracket, z - TIE_DROP + TIE_H, 16, P, 2), { tone: 'mid' }),
    `<g data-gate="${index}">${[
      S(k.slabOf({ x: x - 1.6, y: y - 5.2, w: 3.2 + BALL_R, d: 1.6, r: 0.4 }, z + 9.6, 2, P, 2), { tone: 'lo' }),
      S(k.slabOf(blade, z - 0.6, 12.2, P, 2), { tone: 'mid' })
    ].join('')}</g>`,
    L(k.ring(x, y - 6.4, 0.8, z + 12.4, P, 12), { tone: 'lo' }),
    D([at([x, y - 6.4, z + 12.4])], { size: 0.4 })
  ].join('')
}

const lane = (scene, name) => {
  const y = LANES[name]
  const gates = name === 'gated' ? GATES.map((x, index) => gate(scene, x, index)).join('') : ''
  return [rail(scene, y - RAIL_GAP), ball(scene, name), rail(scene, y + RAIL_GAP), gates].join('')
}

const start = scene => {
  const { P, S, L, D, at } = scene
  const top = FROM[1] + 4
  return [
    S(k.slabOf(START, 0, top, P, 4, 0.6), { tone: 'mid', inner: L([12, 28, 44].map(z => k.sideSeam(START, z, P, 4)).join(''), { tone: 'faint' }) }),
    D(k.corners(START, 3.4).map(([x, y]) => at([x, y, top])), { size: 0.45 }),
    S(k.slabOf({ x: START.x + 4, y: -4, w: 8, d: 8, r: 1.4 }, top, 8, P, 2, 0.4), { tone: 'mid' }),
    S(k.cylinder(START.x + 8, 0, 2.6, top + 8, 4, P, 20), { tone: 'lo' }),
    L(Object.values(LANES).map(y => k.ring(FROM[0] - 6, y, 4.4, top, P, 28)).join(''), { tone: 'lo' })
  ].join('')
}

const finish = scene => {
  const { P, S, L, D, at } = scene
  const face = FINISH.x + FINISH.w
  const matrix = k.sideMatrix([face, FINISH.y + FINISH.d], 0, P, 'right')
  const windows = Object.entries(LANES).map(([name, y]) => {
    const center = FINISH.y + FINISH.d - y
    const x = center - DISPLAY.w / 2
    const top = -(DISPLAY.z + DISPLAY.h)
    return `<rect class="iso-shade" data-shade="0" x="${x}" y="${top}" width="${DISPLAY.w}" height="${DISPLAY.h}" rx="1"/><rect class="iso-line" data-tone="lo" x="${x}" y="${top}" width="${DISPLAY.w}" height="${DISPLAY.h}" rx="1" fill="none"/><text class="iso-face-text" data-tone="hi" data-part="time-${name}" x="${center}" y="${-DISPLAY.z - 2.2}" font-size="5.2" text-anchor="middle">0.0</text>`
  }).join('')
  return [
    S(k.slabOf(FINISH, 0, FINISH_TOP, P, 4, 0.6), { tone: 'mid', inner: L(k.sideSeam(FINISH, FINISH_TOP - 3, P, 4), { tone: 'faint' }) }),
    L(Object.values(LANES).map(y => k.ring(FINISH.x + 9, y, 5, FINISH_TOP, P, 32) + k.ring(FINISH.x + 9, y, 3.4, FINISH_TOP, P, 28)).join(''), { tone: 'lo' }),
    D(k.corners(FINISH, 3.4).map(([x, y]) => at([x, y, FINISH_TOP])), { size: 0.45 }),
    `<g transform="${matrix}">${windows}</g>`
  ].join('')
}

export default {
  id: 'make-fast-faster',
  fig: 'Fig 06',
  title: 'Marble run',
  hint: 'Hover to race the lanes',
  label: 'Two marble lanes down the same incline. The back lane has two gates, a handoff and an approval, that each hold the marble. The front lane is the same track with both gates removed; only their bolt holes are left. Timers on the finish block show both runs.',
  build () {
    const scene = createScene({ points: extent, azimuth: 40 })
    const { vector } = scene
    const body = [
      basePlate(scene, PLATE),
      rulerStrip(scene, { x: -60, y: PLATE.y + PLATE.d - 15, w: 124, d: 7, r: 1 }),
      labelPlate(scene, { x: -100, y: PLATE.y + PLATE.d - 26, w: 34, d: 16, r: 1.4 }),
      start(scene),
      posts(scene, LANES.gated),
      posts(scene, LANES.direct),
      ties(scene),
      lane(scene, 'gated'),
      lane(scene, 'direct'),
      finish(scene)
    ]
    return {
      body,
      motion: {
        period: 8.5,
        length: alongTo(TO[0]) - 3,
        gates: GATES.map(x => alongTo(x) - 3 - BALL_R - 0.6),
        waits: [1.1, 1.4],
        acceleration: 126,
        startAt: 0.5,
        direction: vector(DIRECTION),
        z: vector([0, 0, 1]),
        lift: 9
      },
      readout: 'with gates 0.0 s · without 0.0 s'
    }
  }
}
