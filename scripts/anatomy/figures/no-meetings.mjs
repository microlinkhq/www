import * as k from '../kit/iso-kit.mjs'
import * as G from '../kit/lathe.mjs'

import { basePlate, createScene, labelPlate, plateExtent, rulerStrip } from '../scene.mjs'

const PLATE = { x: -96, y: -58, w: 228, d: 116, r: 10 }

const BASE = { x: -60, y: -36, w: 120, d: 80, r: 7 }
const BASE_TOP = 8
const HOUSING = { x: -58, y: -36, w: 116, d: 34, r: 6 }
const HOUSING_TOP = 30
const ROWS = [
  { y: 8, top: 20, offset: 0 },
  { y: 18, top: 16, offset: 3 },
  { y: 28, top: 12, offset: 6 }
]
const KEYS_PER_ROW = 9
const KEY_GAP = 10
const KEY_R = 3.4
const CAP_H = 1.6
const STEM = 3

const RAIL = { x: -62, y: -32, w: 124, d: 6, r: 1.2 }
const RAIL_TOP = HOUSING_TOP + 3
const PLATEN_Y = -18
const PLATEN_Z = RAIL_TOP + 8
const PLATEN_R = 7
const PLATEN_HALF = 56
const PAPER = { x: -34, w: 68, y: PLATEN_Y - PLATEN_R - 0.6, bottom: PLATEN_Z, top: PLATEN_Z + 62 }
const LINES = 5
const LINE_GAP = 7
const FIRST_LINE = 12
const CHARS = 16
const CHAR_STEP = 3.4
const MARGIN = 6
const REST_SHIFT = -(PAPER.x + MARGIN)
const REST_TYPED = [CHARS, CHARS, 9]

const TRAY = { x: 88, y: -18, w: 38, d: 50, r: 2 }
const TRAY_Z = 3
const SHEETS = 6
const SHEET_H = 0.9

const extent = [...plateExtent(PLATE), [PAPER.x + REST_SHIFT, PAPER.y, PAPER.top], [PAPER.x + PAPER.w + REST_SHIFT, PAPER.y, PAPER.top], [PLATEN_HALF + 10 + REST_SHIFT, PLATEN_Y, PLATEN_Z + 8]]

const keyOf = (scene, x, y, top, index) => {
  const { P, S, L } = scene
  return `<g data-key="${index}">${[
    S(k.cylinder(x, y, 1, top, STEM, P, 12), { tone: 'mid', crease: 'none' }),
    S(k.cylinder(x, y, KEY_R, top + STEM, CAP_H, P, 28, 0.3), { tone: 'hi', crease: 'lo' }),
    L(k.ring(x, y, KEY_R - 1, top + STEM + CAP_H, P, 24), { tone: 'faint' })
  ].join('')}</g>`
}

const keyboard = scene => {
  const { P, S, L } = scene
  const out = []
  let index = 0
  for (const row of ROWS) {
    const plan = { x: -54, y: row.y - 5, w: 108, d: 10, r: 1.6 }
    out.push(S(k.slabOf(plan, BASE_TOP, row.top - BASE_TOP, P, 3, 0.4), { tone: 'mid', inner: L(k.sideSeam(plan, BASE_TOP + 2, P, 3), { tone: 'faint' }) }))
    for (let i = 0; i < KEYS_PER_ROW; i++) {
      const x = -40 + row.offset + i * KEY_GAP - 3
      out.push(keyOf(scene, x, row.y, row.top, index++))
    }
  }
  const bar = { x: -24, y: 37, w: 48, d: 4.4, r: 1.6 }
  out.push(...[-14, 14].map(x => S(k.cylinder(x, 39.2, 0.9, BASE_TOP, 3, P, 12), { tone: 'mid', crease: 'none' })))
  out.push(`<g data-key="space">${S(k.slabOf(bar, BASE_TOP + 3, 2, P, 3, 0.4), { tone: 'hi', crease: 'lo' })}</g>`)
  return { svg: out.join(''), count: index }
}

const body = scene => {
  const { P, S, L, D, at, byDepth } = scene
  const out = []
  for (const [x, y] of byDepth(k.corners(BASE, 9))) {
    out.push(S(k.cylinder(x, y, 4, 0, 2, P, 20), { tone: 'lo' }))
  }
  out.push(S(k.slabOf(BASE, 2, BASE_TOP - 2, P, 6, 0.6), { tone: 'mid', inner: L(k.sideSeam(BASE, 4, P, 6), { tone: 'faint' }) }))
  out.push(S(k.slabOf(HOUSING, BASE_TOP, HOUSING_TOP - BASE_TOP, P, 6, 0.8), { tone: 'mid', inner: L(k.sideSeam(HOUSING, HOUSING_TOP - 6, P, 6), { tone: 'faint' }) }))
  const vents = [-40, -30, -20, -10, 0, 10, 20, 30].map(x => k.planOutline({ x, y: -12, w: 6, d: 1.6, r: 0.8 }, HOUSING_TOP, P, 3)).join('')
  out.push(L(vents, { tone: 'lo' }))
  out.push(D(k.corners(HOUSING, 4).map(([x, y]) => at([x, y, HOUSING_TOP])), { size: 0.45 }))
  out.push(S(k.slabOf(RAIL, HOUSING_TOP, RAIL_TOP - HOUSING_TOP, P, 3, 0.4), { tone: 'lo' }))
  out.push(k.faceTextSvg(k.topMatrix([-48, -4], HOUSING_TOP, P, 'x'), 'NO. 5', { size: 3, tone: 'lo' }))
  return out.join('')
}

const spool = (scene, x) => {
  const { P, S, L } = scene
  return [
    S(k.cylinder(x, -6, 6, HOUSING_TOP, 3, P, 32, 0.4), { tone: 'lo' }),
    L(k.ring(x, -6, 2, HOUSING_TOP + 3, P, 16), { tone: 'mid' })
  ].join('')
}

const carriage = scene => {
  const { P, S, L, D, at } = scene
  const axis = G.frameAlong([-PLATEN_HALF, PLATEN_Y, PLATEN_Z], [1, 0, 0])
  const knobLeft = G.frameAlong([-PLATEN_HALF - 9, PLATEN_Y, PLATEN_Z], [1, 0, 0])
  const knobRight = G.frameAlong([PLATEN_HALF, PLATEN_Y, PLATEN_Z], [1, 0, 0])
  const sled = { x: -PLATEN_HALF - 2, y: RAIL.y - 1, w: PLATEN_HALF * 2 + 4, d: 8, r: 1.4 }
  const face = PAPER.y + 0.6
  const matrix = k.sideMatrix([PAPER.x, face], 0, P, 'left')
  const lines = Array.from({ length: LINES }, (_, index) => {
    const y = -(PAPER.top - FIRST_LINE - index * LINE_GAP)
    const typed = REST_TYPED[index] ?? 0
    return `<line class="iso-line" data-tone="${index === 0 ? 'hi' : 'mid'}" data-line="${index}" data-free="" x1="${MARGIN}" y1="${y}" x2="${MARGIN + typed * CHAR_STEP}" y2="${y}" style="stroke-width:1.4"/>`
  }).join('')
  const ribs = knob => G.ribsOf(knob, 0, 9, 6, 24, P, { fade: [0.1, 0.55], seams: true })
  return `<g data-part="carriage" transform="${k.translateAlong(P, [REST_SHIFT, 0, 0])}">${[
    S(k.slabOf(sled, RAIL_TOP, 3, P, 3), { tone: 'mid' }),
    S(k.slabOf({ x: -PLATEN_HALF - 2, y: PLATEN_Y - 3, w: 3, d: 6, r: 1 }, RAIL_TOP + 3, PLATEN_Z - RAIL_TOP - 3, P, 2), { tone: 'mid' }),
    S(k.slabOf({ x: PLATEN_HALF - 1, y: PLATEN_Y - 3, w: 3, d: 6, r: 1 }, RAIL_TOP + 3, PLATEN_Z - RAIL_TOP - 3, P, 2), { tone: 'mid' }),
    S(G.disc(0, 9, 6, knobLeft, P), { tone: 'mid', inner: k.fadedSvg(ribs(knobLeft), { tone: 'lo' }) }),
    S(k.slabOf({ x: PAPER.x, y: PAPER.y - 0.6, w: PAPER.w, d: 0.6, r: 0.2 }, PAPER.bottom, PAPER.top - PAPER.bottom, P, 1), { tone: 'mid', crease: 'none' }),
    `<g transform="${matrix}">${lines}</g>`,
    S(G.disc(0, PLATEN_HALF * 2, PLATEN_R, axis, P), { tone: 'lo', crease: 'none', inner: L([20, 92].map(s => G.arcOf(axis, s, PLATEN_R, P)).join(''), { tone: 'faint' }) }),
    S(G.disc(0, 9, 6, knobRight, P), { tone: 'mid', inner: k.fadedSvg(ribs(knobRight), { tone: 'lo' }) }),
    S(G.disc(-1.6, PLATEN_HALF * 2 - 8, 1.1, G.frameAlong([-PLATEN_HALF + 4, PLATEN_Y + PLATEN_R + 1.4, PLATEN_Z + 4], [1, 0, 0]), P), { tone: 'mid', crease: 'none' }),
    S(k.slabOf({ x: -PLATEN_HALF - 12, y: PLATEN_Y + 2, w: 3, d: 3, r: 1 }, PLATEN_Z, 16, P, 2), { tone: 'mid' }),
    S(k.cylinder(-PLATEN_HALF - 10.5, PLATEN_Y + 3.5, 2.4, PLATEN_Z + 16, 5, P, 20), { tone: 'lo' }),
    D([at([PAPER.x + PAPER.w / 2, PLATEN_Y + PLATEN_R + 1.4, PLATEN_Z + 4])], { size: 0.45 })
  ].join('')}</g>`
}

const typeGuide = scene => {
  const { P, S, L } = scene
  const guide = { x: -5, y: PLATEN_Y + PLATEN_R + 1, w: 10, d: 4, r: 1 }
  return [
    S(k.slabOf(guide, HOUSING_TOP, 4, P, 2, 0.3), { tone: 'mid' }),
    `<g data-part="strike">${L(k.planOutline(k.insetPlan(guide, 2.4), HOUSING_TOP + 4, P, 2), { tone: 'lit' })}</g>`
  ].join('')
}

const tray = scene => {
  const { P, S, L, D, at } = scene
  const out = [
    S(k.slabOf(TRAY, 0, TRAY_Z, P, 3, 0.5), { tone: 'mid' }),
    D(k.corners(TRAY, 3).map(([x, y]) => at([x, y, TRAY_Z])), { size: 0.45 })
  ]
  const sheet = { x: TRAY.x + 4, y: TRAY.y + 4, w: TRAY.w - 8, d: TRAY.d - 8, r: 0.6 }
  for (let index = 0; index < SHEETS; index++) {
    const z = TRAY_Z + index * SHEET_H
    out.push(`<g data-sheet="${index}" opacity="${index < 2 ? 1 : 0}">${S(k.slabOf(sheet, z, SHEET_H, P, 1), { tone: 'hi', crease: 'lo' })}${L([0.3, 0.42, 0.54].map(share => k.lineOnTop([sheet.x + 5, sheet.y + sheet.d * share], [sheet.x + sheet.w - 8, sheet.y + sheet.d * share], z + SHEET_H, P)).join(''), { tone: 'faint', free: true })}</g>`)
  }
  const lip = { x: TRAY.x + TRAY.w - 3, y: TRAY.y, w: 3, d: TRAY.d, r: 1 }
  const back = { x: TRAY.x, y: TRAY.y, w: TRAY.w, d: 3, r: 1 }
  out.unshift(S(k.slabOf(back, TRAY_Z, 8, P, 2), { tone: 'mid' }))
  out.push(S(k.slabOf(lip, TRAY_Z, 8, P, 2, 0.3), { tone: 'mid' }))
  return out.join('')
}

export default {
  id: 'no-meetings',
  fig: 'Fig 05',
  title: 'Typewriter',
  hint: 'Hover to type the page',
  label: 'A typewriter. Each key that strikes moves the carriage one letter to the left and the line on the paper grows; at the end of a line the carriage returns. When the page is full it goes to the outbox tray, where the stack of shipped pages grows.',
  build () {
    const scene = createScene({ points: extent, azimuth: 36 })
    const { vector } = scene
    const keys = keyboard(scene)
    const out = [
      basePlate(scene, PLATE),
      rulerStrip(scene, { x: -84, y: PLATE.y + PLATE.d - 15, w: 104, d: 7, r: 1 }),
      labelPlate(scene, { x: -84, y: PLATE.y + 8, w: 34, d: 16, r: 1.4 }),
      body(scene),
      carriage(scene),
      spool(scene, -44),
      spool(scene, 44),
      typeGuide(scene),
      keys.svg,
      tray(scene)
    ]
    return {
      body: out,
      motion: {
        period: 11,
        lines: LINES,
        chars: CHARS,
        step: CHAR_STEP,
        margin: MARGIN,
        rest: REST_SHIFT,
        keys: keys.count,
        sheets: SHEETS,
        stacked: 2,
        press: 1.4,
        x: vector([1, 0, 0]),
        z: vector([0, 0, 1])
      },
      readout: `line ${REST_TYPED.length} of ${LINES} · meetings 0`
    }
  }
}
