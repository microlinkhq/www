import * as k from '../kit/iso-kit.mjs'
import * as G from '../kit/lathe.mjs'

import { basePlate, createScene, knurledKnob, labelPlate, plateExtent, rulerStrip } from '../scene.mjs'

const PLATE = { x: -104, y: -76, w: 204, d: 168, r: 10 }

const TABLE = { x: -18, y: -18, w: 36, d: 36, r: 2.4 }
const TABLE_Z = 10
const TABLE_TOP = 15
const TABLE_LEG_INSET = 4

const ROCKET_BASE = TABLE_TOP
const BODY_R = 7
const ROCKET_PROFILE = [
  [0, 4.6],
  [4, 3],
  [4, BODY_R],
  [74, BODY_R],
  [78, 6.9, 1],
  [84, 6.2, 1],
  [90, 4.9, 1],
  [95, 3.1, 1],
  [98, 1.4, 1],
  [99, 0.4, 1]
]
const ROCKET_TOP = ROCKET_BASE + 99
const FIN_FROM = 6
const FIN_TO = 24
const FIN_REACH = 9

const TOWER = { x: -46, y: -6, w: 12, d: 12 }
const TOWER_TOP = 136
const LEVELS = [24, 48, 72, 96, 120]
const ARM_Z = 80
const ARM_RETRACT = 10

const DESK = { x: 34, y: 40, w: 46, d: 24, r: 2.4 }
const DESK_TOP = 20
const DISPLAY = { x: 38, w: 34, z: 4, h: 12 }

const TANK = [60, -42]
const TANK_R = 14
const TANK_TOP = 58

const CART = { x: -94, y: 38, w: 92, d: 22, r: 2 }
const CART_Z = 6
const CART_TOP = 10
const RAIL_Y = [41, 57]
const SPARE_Y = CART.y + CART.d / 2
const SPARE_AXIS = 26
const SPARE_TAIL = -96
const CRADLES = [-50, -14]

const extent = [...plateExtent(PLATE), [TOWER.x, TOWER.y, TOWER_TOP + 8], [0, 0, ROCKET_TOP]]

const rocketFrame = () => G.frameOf([0, 0, ROCKET_BASE], [0, 0, 1], [1, 0, 0], [0, 1, 0])

const fin = (scene, [dx, dy]) => {
  const { P, S } = scene
  const along = dx !== 0
  const plan = along
    ? { x: dx > 0 ? BODY_R - 0.2 : -BODY_R - FIN_REACH + 0.2, y: -0.8, w: FIN_REACH, d: 1.6, r: 0.6 }
    : { x: -0.8, y: dy > 0 ? BODY_R - 0.2 : -BODY_R - FIN_REACH + 0.2, w: 1.6, d: FIN_REACH, r: 0.6 }
  return S(k.slabOf(plan, ROCKET_BASE + FIN_FROM, FIN_TO - FIN_FROM, P, 2), { tone: 'mid' })
}

const rocket = scene => {
  const { P, S, L } = scene
  const F = rocketFrame()
  const seams = [30, 52, 74].map(s => G.arcOf(F, s, BODY_R, P)).join('')
  const backFins = [[-1, 0], [0, -1]].map(direction => fin(scene, direction))
  const frontFins = [[1, 0], [0, 1]].map(direction => fin(scene, direction))
  return `<g data-part="rocket">${[
    ...backFins,
    S(G.solidOf(ROCKET_PROFILE, F, P), { tone: 'hi', lit: true, inner: L(seams, { tone: 'faint' }) }),
    L(G.circleOf(G.frameOf([0, 0, ROCKET_BASE + 40], [1, 0, 0], [0, 1, 0], [0, 0, 1]), BODY_R, 2.2, P, 24), { tone: 'lo' }),
    ...frontFins
  ].join('')}</g>`
}

const cart = scene => {
  const { P, S, L, D, at, byDepth } = scene
  const rails = RAIL_Y.map(y => S(k.slabOf({ x: -100, y: y - 1.6, w: 102, d: 3.2, r: 0.8 }, 0, 1.4, P, 2), { tone: 'lo' }))
  const wheelAt = ([x, y]) => {
    const F = G.frameAlong([x, y - 1.6, CART_Z - 2.4 + 1.4], [0, 1, 0])
    return S(G.disc(0, 3.2, 3.6, F, P), { tone: 'mid' })
  }
  const wheels = byDepth([-84, -12].flatMap(x => RAIL_Y.map(y => [x, y])))
  const F = G.frameOf([SPARE_TAIL, SPARE_Y, SPARE_AXIS], [1, 0, 0], [0, 1, 0], [0, 0, 1])
  const finSlab = (plan, z, h) => S(k.slabOf(plan, z, h, P, 2), { tone: 'mid' })
  const finX = SPARE_TAIL + FIN_FROM
  const finW = FIN_TO - FIN_FROM
  const backFin = finSlab({ x: finX, y: SPARE_Y - BODY_R - FIN_REACH + 0.2, w: finW, d: FIN_REACH, r: 0.6 }, SPARE_AXIS - 0.8, 1.6)
  const lowFin = finSlab({ x: finX, y: SPARE_Y - 0.8, w: finW, d: 1.6, r: 0.6 }, CART_TOP + 0.2, SPARE_AXIS - BODY_R - CART_TOP)
  const upFin = finSlab({ x: finX, y: SPARE_Y - 0.8, w: finW, d: 1.6, r: 0.6 }, SPARE_AXIS + BODY_R - 0.2, FIN_REACH)
  const frontFin = finSlab({ x: finX, y: SPARE_Y + BODY_R - 0.2, w: finW, d: FIN_REACH, r: 0.6 }, SPARE_AXIS - 0.8, 1.6)
  const cradle = x => S(k.slabOf({ x: x - 3, y: SPARE_Y - 7, w: 6, d: 14, r: 1 }, CART_TOP, SPARE_AXIS - BODY_R + 1.2 - CART_TOP, P, 2, 0.4), { tone: 'mid' })
  return [
    ...rails,
    D(RAIL_Y.flatMap(y => [-96, -2].map(x => at([x, y, 1.4]))), { size: 0.4 }),
    ...wheels.slice(0, 2).map(wheelAt),
    S(k.slabOf(CART, CART_Z, CART_TOP - CART_Z, P, 3, 0.5), { tone: 'mid', inner: L(k.sideSeam(CART, CART_Z + 1.6, P, 3), { tone: 'faint' }) }),
    D(k.corners(CART, 3).map(([x, y]) => at([x, y, CART_TOP])), { size: 0.45 }),
    ...wheels.slice(2).map(wheelAt),
    ...CRADLES.map(cradle),
    `<g data-part="spare">${[
      backFin,
      lowFin,
      S(G.solidOf(ROCKET_PROFILE, F, P), { tone: 'hi', inner: L([30, 52, 74].map(s => G.arcOf(F, s, BODY_R, P)).join(''), { tone: 'faint' }) }),
      upFin,
      frontFin
    ].join('')}</g>`,
    S(k.slabOf({ x: CART.x + CART.w - 2, y: SPARE_Y - 1.6, w: 8, d: 3.2, r: 1.2 }, CART_Z + 1, 2.4, P, 2), { tone: 'lo' }),
    S(k.cylinder(CART.x + CART.w + 7, SPARE_Y, 2.6, CART_Z - 1, 8, P, 20), { tone: 'lo' })
  ].join('')
}

const table = scene => {
  const { P, S, L, D, at, byDepth } = scene
  const legs = byDepth(k.corners(TABLE, TABLE_LEG_INSET))
  const far = legs.slice(0, 3)
  const near = legs.slice(3)
  const leg = ([x, y]) => S(k.slabOf({ x: x - 2, y: y - 2, w: 4, d: 4, r: 0.8 }, 0, TABLE_Z, P, 2), { tone: 'mid', crease: 'none' })
  return {
    under: [
      S(k.slabOf(k.insetPlan(TABLE, 6), 0, 3, P, 3), { tone: 'lo' }),
      ...far.map(leg)
    ].join(''),
    over: [
      ...near.map(leg),
      S(k.slabOf(TABLE, TABLE_Z, TABLE_TOP - TABLE_Z, P, 4, 0.6), { tone: 'mid', inner: L(k.sideSeam(TABLE, TABLE_Z + 2, P, 4), { tone: 'faint' }) }),
      L(k.ring(0, 0, 6.4, TABLE_TOP, P, 40), { tone: 'lo' }),
      D(k.corners(TABLE, 3.4).map(([x, y]) => at([x, y, TABLE_TOP])), { size: 0.45 })
    ].join('')
  }
}

const tower = scene => {
  const { P, S, L, D, at, byDepth } = scene
  const posts = byDepth([
    [TOWER.x, TOWER.y],
    [TOWER.x + TOWER.w, TOWER.y],
    [TOWER.x, TOWER.y + TOWER.d],
    [TOWER.x + TOWER.w, TOWER.y + TOWER.d]
  ])
  const post = ([x, y]) => S(k.cylinder(x, y, 1.8, 0, TOWER_TOP, P, 16), { tone: 'mid', crease: 'none' })
  const girders = LEVELS.map(z => S(k.slabOf({ ...TOWER, r: 1 }, z, 3, P, 2), { tone: 'mid' }))
  const nearX = TOWER.x + TOWER.w
  const nearY = TOWER.y + TOWER.d
  const braces = []
  LEVELS.forEach((z, index) => {
    const next = LEVELS[index + 1] ?? TOWER_TOP
    const from = z + 3
    braces.push(k.segment([nearX, TOWER.y, from], [nearX, TOWER.y + TOWER.d, next], P))
    braces.push(k.segment([TOWER.x, nearY, from], [nearX, nearY, next], P))
  })
  return {
    back: [
      `<path class="iso-halo" d="${k.haloOf(TOWER, 0, 2, P)}"/>`,
      S(k.slabOf(k.insetPlan(TOWER, -4), 0, 2, P, 3, 0.4), { tone: 'lo' }),
      ...posts.slice(0, 3).map(post),
      ...girders,
      L(braces.join(''), { tone: 'lo' }),
      post(posts[3]),
      S(k.slabOf({ x: TOWER.x - 2, y: TOWER.y - 2, w: TOWER.w + 4, d: TOWER.d + 4, r: 1.6 }, TOWER_TOP, 3, P, 3, 0.5), { tone: 'mid' }),
      S(k.cylinder(TOWER.x + TOWER.w / 2, TOWER.y + TOWER.d / 2, 2.4, TOWER_TOP + 3, 5, P, 20), { tone: 'hi' }),
      D([at([TOWER.x + TOWER.w / 2, TOWER.y + TOWER.d / 2, TOWER_TOP + 8])], { size: 0.6, tone: 'hi' })
    ].join(''),
    arm: `<g data-part="arm">${[
      S(k.slabOf({ x: TOWER.x + TOWER.w - 2, y: -2, w: -BODY_R - (TOWER.x + TOWER.w - 2), d: 4, r: 1 }, ARM_Z, 4, P, 2), { tone: 'mid' }),
      S(k.slabOf({ x: -BODY_R - 3, y: -3.4, w: 3, d: 6.8, r: 1 }, ARM_Z - 1, 6, P, 2), { tone: 'lo' })
    ].join('')}</g>`,
    sleeve: S(k.slabOf({ x: TOWER.x + TOWER.w - 1, y: -4, w: 6, d: 8, r: 1 }, ARM_Z - 2, 8, P, 2, 0.4), { tone: 'mid' })
  }
}

const tank = scene => {
  const { P, S, L, D, at } = scene
  const [x, y] = TANK
  const F = G.frameOf([x, y, 4], [0, 0, 1], [1, 0, 0], [0, 1, 0])
  const dome = [[0, TANK_R], [TANK_TOP - 18, TANK_R], [TANK_TOP - 14, TANK_R - 0.6, 1], [TANK_TOP - 10, TANK_R - 2.6, 1], [TANK_TOP - 7, TANK_R - 6, 1], [TANK_TOP - 5, TANK_R - 10, 1], [TANK_TOP - 4, 0.4, 1]]
  const hub = [x, y]
  const top = TANK_TOP + 4
  const spokes = [0, 1, 2].map(i => {
    const angle = (i * Math.PI * 2) / 3
    return k.lineOnTop([x + Math.cos(angle) * 1.6, y + Math.sin(angle) * 1.6], [x + Math.cos(angle) * 5.6, y + Math.sin(angle) * 5.6], top, P)
  }).join('')
  return [
    S(k.cylinder(x, y, TANK_R + 2, 0, 4, P, 56, 0.6), { tone: 'lo' }),
    S(G.solidOf(dome, F, P), { tone: 'mid', inner: L([14, 30].map(s => G.arcOf(F, s, TANK_R, P)).join(''), { tone: 'faint' }) }),
    D(G.dotsOf(F, 3, TANK_R, 24, P, { fade: [0.04, 0.42] }), { size: 0.45 }),
    S(k.cylinder(hub[0], hub[1], 2, TANK_TOP - 2, 4, P, 16), { tone: 'mid' }),
    S(k.cylinder(hub[0], hub[1], 6.2, top - 1.2, 1.2, P, 40), { tone: 'mid', crease: 'none' }),
    L(k.ring(hub[0], hub[1], 5.6, top, P, 40) + k.ring(hub[0], hub[1], 1.6, top, P, 16) + spokes, { tone: 'lo' }),
    D([at([x, y + TANK_R + 1, 4])], { size: 0.45 })
  ].join('')
}

const desk = scene => {
  const { P, S, L, D, at } = scene
  const face = DESK.y + DESK.d
  const matrix = k.sideMatrix([DESK.x, face], 0, P, 'left')
  const { x, w, z, h } = DISPLAY
  const left = x - DESK.x
  return [
    S(k.slabOf(DESK, 0, DESK_TOP, P, 4, 0.6), { tone: 'mid', inner: L(k.sideSeam(DESK, DESK_TOP - 4, P, 4), { tone: 'faint' }) }),
    D(k.corners(DESK, 3.4).map(([px, py]) => at([px, py, DESK_TOP])), { size: 0.45 }),
    knurledKnob(scene, [DESK.x + 10, DESK.y + 9], DESK_TOP, { r: 3.6, h: 3 }),
    L(k.lineOnTop([DESK.x + 10, DESK.y + 9], [DESK.x + 13.6, DESK.y + 9], DESK_TOP + 3, P), { tone: 'hi' }),
    S(k.slabOf({ x: DESK.x + 22, y: DESK.y + 6, w: 6, d: 6, r: 1 }, DESK_TOP, 1.6, P, 2), { tone: 'lo' }),
    S(k.cylinder(DESK.x + 36, DESK.y + 9, 4.2, DESK_TOP, 1.4, P, 32), { tone: 'lo' }),
    S(k.cylinder(DESK.x + 36, DESK.y + 9, 3.2, DESK_TOP + 1.4, 2.4, P, 32, 0.4), { tone: 'hi' }),
    `<g transform="${matrix}"><rect class="iso-shade" data-shade="0" x="${left}" y="${-(z + h)}" width="${w}" height="${h}" rx="1"/><rect class="iso-line" data-tone="lo" x="${left}" y="${-(z + h)}" width="${w}" height="${h}" rx="1" fill="none"/><text class="iso-face-text" data-tone="hi" data-part="display" x="${left + w / 2}" y="${-z - 3.2}" font-size="7.6" text-anchor="middle" letter-spacing="1.2">T-3</text></g>`
  ].join('')
}

export default {
  id: 'everyone-ships',
  fig: 'Fig 02',
  title: 'Launch pad',
  hint: 'Hover to run the countdown',
  label: 'A model rocket on a launch mount beside a service tower. The tower arm pulls back, the console counts down, the rocket climbs out of the frame, and the next one is set on the pad.',
  build () {
    const scene = createScene({ points: extent, azimuth: 40 })
    const { vector } = scene
    const mount = table(scene)
    const service = tower(scene)
    const body = [
      basePlate(scene, PLATE),
      rulerStrip(scene, { x: 6, y: PLATE.y + PLATE.d - 15, w: 84, d: 7, r: 1 }),
      labelPlate(scene, { x: -92, y: PLATE.y + 10, w: 34, d: 16, r: 1.4 }),
      service.back,
      tank(scene),
      service.arm,
      service.sleeve,
      mount.under,
      mount.over,
      rocket(scene),
      desk(scene),
      cart(scene)
    ]
    return {
      body,
      motion: {
        period: 6,
        retract: ARM_RETRACT,
        climb: 260,
        x: vector([1, 0, 0]),
        z: vector([0, 0, 1])
      },
      readout: 'shipped 0 · on the pad'
    }
  }
}
