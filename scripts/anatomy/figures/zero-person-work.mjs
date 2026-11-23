import * as k from '../kit/iso-kit.mjs'
import * as G from '../kit/lathe.mjs'

import { basePlate, createScene, knurledKnob, labelPlate, plateExtent, rulerStrip } from '../scene.mjs'

const PLATE = { x: -150, y: -74, w: 300, d: 148, r: 8 }

const BEAM_Z = 22
const BEAM_TOP = 30
const BEAMS = [{ x: -122, y: -31, w: 244, d: 6, r: 1.2 }, { x: -122, y: 25, w: 244, d: 6, r: 1.2 }]
const LEGS = [-108, 108]
const BELT = { x: -118, y: -24, w: 236, d: 48, r: 2 }
const BELT_Z = 26
const BELT_TOP = 29
const DRUM_X = [-118, 118]
const DRUM_R = 3

const CARD = { w: 28, d: 32 }
const CARD_TOP = BELT_TOP + 1.2
const PITCH = 48
const CARDS = [-144, -96, -48, 0, 48, 96]
const FADE_FROM = 96
const FADE_TO = 120

const POST_Y = 46
const POST_R = 4
const BAR_Z = 98
const BAR_TOP = 106
const GUIDE = { x: -8, y: -8, w: 16, d: 16, r: 2 }
const GUIDE_Z = 80
const HEAD = { x: -11, y: -11, w: 22, d: 22, r: 1.6 }
const DIE = { x: -10, y: -10, w: 20, d: 20, r: 1.2 }
const DIE_Z = 48
const HEAD_Z = 50
const HEAD_TOP = 58
const TRAVEL = DIE_Z - CARD_TOP

const MOTOR_X = DRUM_X[0]
const MOTOR_FROM = 35
const MOTOR_TO = 60
const MOTOR_R = 11

const CRANK_Y = 48
const COUNTER = { x: 7, y: 38, w: 34, d: 18, r: 2 }
const COUNTER_TOP = 18
const COUNTER_WINDOW = { x: 12, w: 24, z: 6, h: 8 }

const extent = [
  ...plateExtent(PLATE),
  [0, -POST_Y - 4, BAR_TOP],
  [0, POST_Y + 4, BAR_TOP],
  [MOTOR_X, MOTOR_TO, BELT_Z + MOTOR_R]
]

const markOf = (scene, x) => {
  const { P, L } = scene
  const r = 6
  const diagonal = r * Math.SQRT1_2
  return [
    L(k.ring(x, 0, r, CARD_TOP, P, 40), { tone: 'hi' }),
    L(k.ring(x, 0, r - 2, CARD_TOP, P, 32), { tone: 'mid' }),
    L(k.lineOnTop([x - diagonal, -diagonal], [x + diagonal, diagonal], CARD_TOP, P), { tone: 'hi' }),
    L(k.lineOnTop([x - diagonal, diagonal], [x + diagonal, -diagonal], CARD_TOP, P), { tone: 'hi' })
  ].join('')
}

const cardOf = (scene, x, index) => {
  const { P, S, L } = scene
  const plan = { x: x - CARD.w / 2, y: -CARD.d / 2, w: CARD.w, d: CARD.d, r: 1 }
  const hidden = Math.abs(x) > FADE_FROM ? ' opacity="0"' : ''
  return `<g data-card="${index}"${hidden}>${[
    S(k.slabOf(plan, BELT_TOP, CARD_TOP - BELT_TOP, P, 3), { tone: 'hi', crease: 'lo' }),
    L(k.planOutline(k.insetPlan(plan, 2.4), CARD_TOP, P, 3), { tone: 'faint' }),
    `<g data-mark="${index}"${x > 0 ? '' : ' opacity="0"'}>${markOf(scene, x)}</g>`
  ].join('')}</g>`
}

const frame = scene => {
  const { P, S, byDepth } = scene
  const out = []
  for (const [x, y] of byDepth(LEGS.flatMap(x => BEAMS.map(beam => [x, beam.y + beam.d / 2])))) {
    out.push(S(k.cylinder(x, y, 4.6, 0, 1.6, P, 24), { tone: 'lo' }))
    out.push(S(k.cylinder(x, y, 2.8, 1.6, BEAM_Z - 1.6, P, 20), { tone: 'mid', crease: 'none' }))
  }
  return out.join('')
}

const beam = (scene, plan) => {
  const { P, S, D, at } = scene
  return [
    S(k.slabOf(plan, BEAM_Z, BEAM_TOP - BEAM_Z, P, 3, 0.4), { tone: 'mid' }),
    D(LEGS.map(x => at([x, plan.y + plan.d / 2, BEAM_TOP])), { size: 0.45 })
  ].join('')
}

const drum = (scene, x) => {
  const { P, S } = scene
  const F = G.frameAlong([x, BELT.y, BELT_Z], [0, 1, 0])
  return S(G.disc(0, BELT.d, DRUM_R, F, P), { tone: 'mid', crease: 'none' })
}

const belt = scene => {
  const { P, S, L } = scene
  const slats = []
  for (let x = BELT.x + 10; x < BELT.x + BELT.w - 4; x += 12) {
    slats.push(k.lineOnTop([x, BELT.y], [x, BELT.y + BELT.d], BELT_TOP, P))
  }
  return [
    drum(scene, DRUM_X[0]),
    S(k.slabOf(BELT, BELT_Z, BELT_TOP - BELT_Z, P, 3), { tone: 'lo', inner: L(slats.join(''), { tone: 'faint' }) }),
    drum(scene, DRUM_X[1])
  ].join('')
}

const post = (scene, y) => {
  const { P, S, L, D, at } = scene
  return [
    S(k.cylinder(0, y, 7, 0, 3, P, 32, 0.5), { tone: 'mid' }),
    D([at([0, y - 5, 3]), at([0, y + 5, 3]), at([-5, y, 3]), at([5, y, 3])], { size: 0.4 }),
    S(k.cylinder(0, y, POST_R, 3, BAR_Z - 3, P, 28), { tone: 'mid', crease: 'none' }),
    L([24, 48, 72].map(z => k.sideArc(0, y, POST_R, z, P, 20)).join(''), { tone: 'faint' })
  ].join('')
}

const ram = scene => {
  const { P, S, L, D, at } = scene
  return `<g data-part="ram">${[
    S(k.cylinder(0, 0, 2.6, HEAD_TOP, BAR_Z - HEAD_TOP, P, 24), { tone: 'hi', crease: 'none', lit: true }),
    S(k.cylinder(0, 0, 3.8, HEAD_TOP + 6, 2.4, P, 24), { tone: 'mid' }),
    S(k.slabOf(DIE, DIE_Z, HEAD_Z - DIE_Z, P, 3), { tone: 'mid', crease: 'none' }),
    S(k.slabOf(HEAD, HEAD_Z, HEAD_TOP - HEAD_Z, P, 4, 0.6), { tone: 'hi', lit: true }),
    L(k.sideSeam(HEAD, HEAD_Z + 3, P, 4), { tone: 'faint' }),
    D(k.corners(HEAD, 3.4).map(([x, y]) => at([x, y, HEAD_TOP])), { size: 0.45 })
  ].join('')}</g>`
}

const gantry = scene => {
  const { P, S, L, D, at } = scene
  const bar = { x: -9, y: -POST_Y - 4, w: 18, d: (POST_Y + 4) * 2, r: 2 }
  return [
    S(k.slabOf(GUIDE, GUIDE_Z, BAR_Z - GUIDE_Z, P, 4, 0.5), { tone: 'mid', inner: L(k.sideSeam(GUIDE, GUIDE_Z + 6, P, 4), { tone: 'faint' }) }),
    S(k.cylinder(0, 0, 3.6, GUIDE_Z - 2, 2, P, 24), { tone: 'lo' }),
    S(k.slabOf(bar, BAR_Z, BAR_TOP - BAR_Z, P, 4, 0.8), { tone: 'mid' }),
    L(k.planOutline(k.insetPlan(bar, 3), BAR_TOP, P, 4), { tone: 'faint' }),
    D([-POST_Y, -POST_Y + 6, POST_Y - 6, POST_Y].map(y => at([0, y, BAR_TOP])), { size: 0.5 }),
    knurledKnob(scene, [0, 0], BAR_TOP, { r: 4.4, h: 3.6 }),
    L(k.lineOnTop([0, 0], [4.4, 0], BAR_TOP + 3.6, P), { tone: 'hi' })
  ].join('')
}

const motor = scene => {
  const { P, S, L, D } = scene
  const F = G.frameAlong([MOTOR_X, 0, BELT_Z], [0, 1, 0])
  const body = G.disc(MOTOR_FROM + 3, MOTOR_TO - 3, MOTOR_R, F, P)
  const ribs = G.ribsOf(F, MOTOR_FROM + 5, MOTOR_TO - 5, MOTOR_R, 28, P, { fade: [0.1, 0.55], seams: true })
  const mount = { x: MOTOR_X - 12, y: MOTOR_FROM + 4, w: 24, d: MOTOR_TO - MOTOR_FROM - 8, r: 2 }
  return [
    S(k.slabOf(mount, 0, BELT_Z - MOTOR_R + 1, P, 3, 0.5), { tone: 'lo' }),
    D(k.corners(mount, 3).map(([x, y]) => scene.at([x, y, BELT_Z - MOTOR_R + 1])), { size: 0.45 }),
    S(G.disc(BEAMS[1].y + BEAMS[1].d, BEAMS[1].y + BEAMS[1].d + 1.6, 4.4, F, P), { tone: 'mid' }),
    S(G.disc(BEAMS[1].y + BEAMS[1].d + 1.6, MOTOR_FROM, 2, F, P), { tone: 'hi', crease: 'none' }),
    S(G.disc(MOTOR_FROM, MOTOR_FROM + 3, MOTOR_R - 1.4, F, P), { tone: 'mid' }),
    S(body, { tone: 'mid', inner: k.fadedSvg(ribs, { tone: 'lo' }) }),
    S(G.disc(MOTOR_TO - 3, MOTOR_TO, MOTOR_R - 1.4, F, P), { tone: 'mid' }),
    D(G.dotsOf(F, MOTOR_TO, MOTOR_R - 4, 6, P, { all: true }), { size: 0.45 }),
    L(G.circleOf(F, MOTOR_TO, 2.6, P, 32), { tone: 'lo' })
  ].join('')
}

const crank = scene => {
  const { P, S, L, D, at } = scene
  const cradles = [98, 128].map(x => ({ x, y: CRANK_Y - 6, w: 5, d: 12, r: 1 }))
  const shaft = { x: 90, y: CRANK_Y - 2, w: 52, d: 4, r: 1.8 }
  const arm = { x: 138, y: CRANK_Y - 2, w: 4, d: 20, r: 1.8 }
  const grip = [140, CRANK_Y + 16]
  return [
    ...cradles.map(plan => S(k.slabOf(plan, 0, 10, P, 3, 0.4), { tone: 'mid', inner: L(k.sideSeam(plan, 3, P, 3), { tone: 'faint' }) })),
    D(cradles.map(plan => at([plan.x + 2.5, plan.y + 1.8, 10])), { size: 0.4 }),
    S(k.slabOf(shaft, 10, 4, P, 3), { tone: 'lo' }),
    S(k.cylinder(shaft.x + 2, CRANK_Y, 3, 9.6, 4.8, P, 20), { tone: 'lo' }),
    S(k.slabOf(arm, 10, 4, P, 3), { tone: 'lo' }),
    S(k.cylinder(grip[0], grip[1], 2.8, 14, 12, P, 24), { tone: 'lo' }),
    L(k.knurl(grip[0], grip[1], 2.8, 14, 26, 16, P), { tone: 'faint' })
  ].join('')
}

const counter = scene => {
  const { P, S, L, D, at } = scene
  const face = COUNTER.y + COUNTER.d
  const matrix = k.sideMatrix([COUNTER.x, face], 0, P, 'left')
  const { x, w, z, h } = COUNTER_WINDOW
  return [
    S(k.slabOf(COUNTER, 0, COUNTER_TOP, P, 4, 0.6), { tone: 'mid', inner: L(k.sideSeam(COUNTER, COUNTER_TOP - 4, P, 4), { tone: 'faint' }) }),
    D(k.corners(COUNTER, 3.4).map(([px, py]) => at([px, py, COUNTER_TOP])), { size: 0.45 }),
    knurledKnob(scene, [COUNTER.x + COUNTER.w - 7, COUNTER.y + 7], COUNTER_TOP, { r: 3, h: 3 }),
    `<g transform="${matrix}"><rect class="iso-shade" data-shade="0" x="${x - COUNTER.x}" y="${-(z + h)}" width="${w}" height="${h}" rx="1"/><rect class="iso-line" data-tone="lo" x="${x - COUNTER.x}" y="${-(z + h)}" width="${w}" height="${h}" rx="1" fill="none"/>${[1, 2, 3].map(i => `<line class="iso-line" data-tone="faint" x1="${x - COUNTER.x + (w / 4) * i}" y1="${-(z + h)}" x2="${x - COUNTER.x + (w / 4) * i}" y2="${-z}"/>`).join('')}<text class="iso-face-text" data-tone="hi" data-part="counter" x="${x - COUNTER.x + w / 2}" y="${-z - 2.1}" font-size="5.6" text-anchor="middle" letter-spacing="3.3">${String(CARDS.filter(x => x > 0).length).padStart(4, '0')}</text></g>`
  ].join('')
}

export default {
  id: 'zero-person-work',
  fig: 'Fig 01',
  title: 'Stamping jig',
  hint: 'Hover to run the belt',
  label: 'A stamping jig over a conveyor belt. A motor drives the belt, and each card that passes under the ram gets the same mark. The hand crank used for the first card rests in its cradle on the base.',
  build () {
    const scene = createScene({ points: extent, azimuth: 42 })
    const { P, vector } = scene
    const body = [
      basePlate(scene, PLATE),
      rulerStrip(scene, { x: -94, y: PLATE.y + PLATE.d - 15, w: 184, d: 7, r: 1 }),
      labelPlate(scene, { x: -140, y: PLATE.y + 8, w: 34, d: 16, r: 1.4 }),
      post(scene, -POST_Y),
      frame(scene),
      beam(scene, BEAMS[0]),
      belt(scene),
      `<g data-part="cards">${CARDS.map((x, index) => cardOf(scene, x, index)).join('')}</g>`,
      beam(scene, BEAMS[1]),
      crank(scene),
      ram(scene),
      motor(scene),
      post(scene, POST_Y),
      counter(scene),
      gantry(scene)
    ]
    return {
      body,
      motion: {
        period: 3.2,
        pitch: PITCH,
        cards: CARDS,
        prestamped: CARDS.filter(x => x > 0).length,
        travel: TRAVEL,
        fadeFrom: FADE_FROM,
        fadeTo: FADE_TO,
        x: vector([1, 0, 0]),
        z: vector([0, 0, 1])
      },
      readout: `by hand 1 · by the jig ${CARDS.filter(x => x > 0).length}`,
      P
    }
  }
}
