import * as k from '../kit/iso-kit.mjs'
import * as G from '../kit/lathe.mjs'

import { basePlate, createScene, labelPlate, plateExtent, rulerStrip } from '../scene.mjs'

const PLATE = { x: -96, y: -66, w: 178, d: 130, r: 10 }

const HOUSING = { x: -70, y: -54, w: 92, d: 92, r: 8 }
const HOUSING_TOP = 18
const CENTER = [HOUSING.x + HOUSING.w / 2, HOUSING.y + HOUSING.d / 2]
const COVER_R = 42
const COVER_TOP = HOUSING_TOP + 8
const HUB_R = 15
const HUB_TOP = COVER_TOP + 6
const BOLT_CIRCLE = 34
const BOLT_COUNT = 8
const LOOSE = 0
const LIFT = 5
const WASHER_TOP = COVER_TOP + 0.8
const HEAD_R = 4.4
const HEAD_H = 3.6
const SHANK_R = 2.4

const SOCKET_R = 5.6
const SOCKET_FROM = WASHER_TOP + LIFT + 0.6
const SOCKET_TOP = SOCKET_FROM + 9
const HANDLE_FROM = 7
const HANDLE_TO = 74
const HANDLE_W = 5
const HANDLE_H = 3
const DIAL_AT = 42
const DIAL_R = 10.4
const DIAL_TOP = SOCKET_TOP + 3
const PARK = [-4, 50]

const boltAt = index => {
  const angle = (index * Math.PI * 2) / BOLT_COUNT + Math.PI / 4
  return [CENTER[0] + Math.cos(angle) * BOLT_CIRCLE, CENTER[1] + Math.sin(angle) * BOLT_CIRCLE]
}

const LOOSE_AT = boltAt(LOOSE)

const extent = [...plateExtent(PLATE), [LOOSE_AT[0], LOOSE_AT[1], DIAL_TOP + 2], [LOOSE_AT[0] + HANDLE_TO, LOOSE_AT[1], DIAL_TOP]]

const housing = scene => {
  const { P, S, L, D, at } = scene
  const port = G.frameAlong([HOUSING.x + HOUSING.w, CENTER[1], 9], [1, 0, 0])
  const glass = G.frameAlong([CENTER[0] - 16, HOUSING.y + HOUSING.d, 9], [0, 1, 0])
  return [
    S(k.slabOf(HOUSING, 0, HOUSING_TOP, P, 6, 0.8), { tone: 'mid', inner: L(k.sideSeam(HOUSING, 5, P, 6), { tone: 'faint' }) }),
    D(k.corners(HOUSING, 5).map(([x, y]) => at([x, y, HOUSING_TOP])), { size: 0.5 }),
    S(G.disc(0, 4, 8, port, P), { tone: 'mid' }),
    S(G.disc(4, 6, 10, port, P), { tone: 'mid' }),
    D(G.dotsOf(port, 6, 8, 6, P, { all: true }), { size: 0.45 }),
    L(G.circleOf(port, 6, 4.4, P, 32), { tone: 'lo' }),
    S(G.disc(0, 1.6, 5.4, glass, P), { tone: 'lo' }),
    L(G.circleOf(glass, 1.6, 3.6, P, 32), { tone: 'mid' }),
    L(k.segment([CENTER[0] - 19.6, HOUSING.y + HOUSING.d + 1.6, 9], [CENTER[0] - 12.4, HOUSING.y + HOUSING.d + 1.6, 9], P), { tone: 'lo' })
  ].join('')
}

const cover = scene => {
  const { P, S, L, D, at } = scene
  const [x, y] = CENTER
  return [
    S(k.cylinder(x, y, COVER_R, HOUSING_TOP, COVER_TOP - HOUSING_TOP, P, 96, 0.8), { tone: 'mid', inner: L(k.sideArc(x, y, COVER_R, HOUSING_TOP + 3, P, 64), { tone: 'faint' }) }),
    L(k.ring(x, y, COVER_R - 3, COVER_TOP, P, 96), { tone: 'faint' }),
    S(k.cylinder(x, y, HUB_R, COVER_TOP, HUB_TOP - COVER_TOP, P, 64, 0.6), { tone: 'mid' }),
    L(k.ring(x, y, HUB_R - 4, HUB_TOP, P, 48), { tone: 'lo' }),
    D([at([x, y, HUB_TOP])], { size: 0.6 }),
    S(k.cylinder(x, y + HUB_R + 10, 3, COVER_TOP, 6, P, 20), { tone: 'mid' }),
    L(k.ring(x, y + HUB_R + 10, 1.6, COVER_TOP + 6, P, 16), { tone: 'lo' })
  ].join('')
}

const stripe = (scene, [x, y], z) => {
  const { P } = scene
  return `<path class="iso-line" data-tone="hi" style="stroke-width:1.8" d="${k.lineOnTop([x - HEAD_R * 0.7, y - HEAD_R * 0.7], [x + HEAD_R * 0.7, y + HEAD_R * 0.7], z, P)}"/>`
}

const head = (scene, [x, y], bottom) => {
  const { P, S, L } = scene
  return [
    S(k.cylinder(x, y, HEAD_R, bottom, HEAD_H, P, 6, 0.4), { tone: 'hi', crease: 'lo' }),
    L(k.ring(x, y, 1.6, bottom + HEAD_H, P, 16), { tone: 'faint' })
  ].join('')
}

const washer = (scene, [x, y]) => scene.S(k.cylinder(x, y, 5.8, COVER_TOP, 0.8, scene.P, 32), { tone: 'lo' })

const bolts = scene => {
  const { byDepth } = scene
  const tight = byDepth(Array.from({ length: BOLT_COUNT }, (_, index) => index).filter(index => index !== LOOSE).map(index => boltAt(index)))
  return tight.map(point => [washer(scene, point), head(scene, point, WASHER_TOP), stripe(scene, point, WASHER_TOP + HEAD_H)].join('')).join('')
}

const looseBolt = scene => {
  const { P, S, L } = scene
  const [x, y] = LOOSE_AT
  const threads = [1.2, 2.4, 3.6, 4.8].map(dz => k.sideArc(x, y, SHANK_R, WASHER_TOP + dz, P, 16)).join('')
  return [
    washer(scene, LOOSE_AT),
    `<g data-part="bolt">${[
      S(k.cylinder(x, y, SHANK_R, WASHER_TOP, LIFT + 0.2, P, 20), { tone: 'mid', crease: 'none', inner: L(threads, { tone: 'lo' }) }),
      head(scene, LOOSE_AT, WASHER_TOP + LIFT),
      `<g data-part="stripe" opacity="0">${stripe(scene, LOOSE_AT, WASHER_TOP + LIFT + HEAD_H)}</g>`
    ].join('')}</g>`
  ].join('')
}

const rotated = ([x, y], angle, [dx, dy]) => [x + Math.cos(angle) * dx - Math.sin(angle) * dy, y + Math.sin(angle) * dx + Math.cos(angle) * dy]

const handle = scene => {
  const { P, S, L, D, at } = scene
  const [x, y] = LOOSE_AT
  const z = SOCKET_TOP - HANDLE_H
  const half = HANDLE_W / 2
  const ring = [[HANDLE_FROM, -half], [HANDLE_TO - 14, -half], [HANDLE_TO - 14, half], [HANDLE_FROM, half]].map(([dx, dy]) => [x + dx, y + dy])
  const dial = [x + DIAL_AT, y]
  const grip = G.frameAlong([x + HANDLE_TO - 14, y, z + HANDLE_H / 2], [1, 0, 0])
  const ticks = k.radialTicks(dial[0], dial[1], DIAL_R - 1.4, 30, 5, DIAL_TOP, [1, 2], P, -Math.PI * 0.75, Math.PI * 1.5)
  const ribs = G.ribsOf(grip, 1.6, 12.4, 3.2, 24, P, { fade: [0.1, 0.55], seams: true })
  return `<g data-part="handle">${[
    S(k.cylinder(x, y, 7.4, SOCKET_TOP, 3.2, P, 48, 0.5), { tone: 'mid' }),
    S(k.extrude(ring, z, HANDLE_H, P, { bevel: 0.4 }), { tone: 'mid' }),
    S(G.disc(0, 14, 3.2, grip, P), { tone: 'lo', inner: k.fadedSvg(ribs, { tone: 'faint' }) }),
    S(G.disc(14, 15.4, 3.6, grip, P), { tone: 'mid' }),
    S(k.cylinder(dial[0], dial[1], DIAL_R + 1, z + HANDLE_H, DIAL_TOP - z - HANDLE_H, P, 56, 0.5), { tone: 'hi', crease: 'lo' }),
    L(k.ring(dial[0], dial[1], DIAL_R - 1, DIAL_TOP, P, 48), { tone: 'lo' }),
    L(ticks.minor, { tone: 'lo' }),
    L(ticks.major, { tone: 'mid' }),
    `<g data-part="needle"><path class="iso-line" data-tone="lit" data-free="end" style="stroke-width:1.1" d="${k.lineOnTop(dial, rotated(dial, -Math.PI * 0.75 - Math.PI / 2, [DIAL_R - 2.4, 0]), DIAL_TOP + 0.2, P)}"/></g>`,
    D([at([dial[0], dial[1], DIAL_TOP + 0.2])], { size: 0.6, tone: 'hi' }),
    S(k.slabOf({ x: x - 2, y: y - 2, w: 4, d: 4, r: 0.8 }, SOCKET_TOP + 3.2, 1.6, P, 2), { tone: 'lo' })
  ].join('')}</g>`
}

const socket = scene => {
  const { P, S, L } = scene
  const [x, y] = LOOSE_AT
  return [
    S(k.cylinder(x, y, SOCKET_R, SOCKET_FROM, SOCKET_TOP - SOCKET_FROM, P, 40, 0.4), { tone: 'hi', crease: 'lo', lit: true, inner: L(k.sideArc(x, y, SOCKET_R, SOCKET_FROM + 3, P, 32), { tone: 'faint' }) })
  ].join('')
}

export default {
  id: 'own-outcomes',
  fig: 'Fig 04',
  title: 'Torque wrench',
  hint: 'Hover to turn the wrench',
  label: 'A pump cover held by eight bolts, seven of them torqued and striped. A torque wrench seats the one loose bolt with short ratchet strokes until its dial reads the target, then the bolt gets its own stripe.',
  build () {
    const scene = createScene({ points: extent, azimuth: 44 })
    const { at, vector } = scene
    const body = [
      basePlate(scene, PLATE),
      rulerStrip(scene, { x: -86, y: PLATE.y + PLATE.d - 15, w: 64, d: 7, r: 1 }),
      labelPlate(scene, { x: 38, y: PLATE.y + 10, w: 34, d: 16, r: 1.4 }),
      housing(scene),
      cover(scene),
      bolts(scene),
      looseBolt(scene),
      `<g data-part="wrench">${socket(scene)}${handle(scene)}</g>`
    ]
    const round = point => point.map(value => Math.round(value * 100) / 100)
    return {
      body,
      motion: {
        period: 7,
        lift: LIFT,
        park: [PARK[0] - LOOSE_AT[0], PARK[1] - LOOSE_AT[1], -SOCKET_FROM],
        strokes: 4,
        stroke: 0.42,
        sweep: Math.PI * 1.5 * 0.82,
        socket: round(at([LOOSE_AT[0], LOOSE_AT[1], SOCKET_TOP])),
        dial: round(at([LOOSE_AT[0] + DIAL_AT, LOOSE_AT[1], DIAL_TOP])),
        target: 25,
        x: vector([1, 0, 0]),
        y: vector([0, 1, 0]),
        z: vector([0, 0, 1])
      },
      readout: 'bolt 1 · loose'
    }
  }
}
