import * as k from './kit/iso-kit.mjs'

export const WIDTH = 600
export const HEIGHT = 400

const PLATE_HEIGHT = 12
const FOOT_HEIGHT = 5
const FOOT_INSET = 22
const SCREW_INSET = 10
const RULER_BASELINE = 1.2

export const createScene = ({ points, azimuth = 45, elevation = 30, pad = 30 }) => {
  const P = k.fitProjection(points, WIDTH, HEIGHT, { pad, azimuth, elevation })
  const at = point => k.iso(point, P)
  const depth = point => k.depthOf([point[0], point[1], point[2] ?? 0], P)
  return {
    P,
    at,
    S: (paths, style) => k.solidSvg(paths, style),
    L: (d, style) => k.lineSvg(d, style),
    D: (list, style) => k.dotsSvg(list, style),
    byDepth: list => [...list].sort((a, b) => depth(a) - depth(b)),
    vector: by => k.axisVector(P, by).map(value => Math.round(value * 1000) / 1000)
  }
}

export const plateExtent = plan => [
  ...k.boxCorners(plan, -PLATE_HEIGHT - FOOT_HEIGHT, 0)
]

export const basePlate = (scene, plan) => {
  const { P, S, L, D, at, byDepth } = scene
  const out = [
    `<path class="iso-halo" d="${k.haloOf(plan, -PLATE_HEIGHT - FOOT_HEIGHT, PLATE_HEIGHT, P)}"/>`
  ]
  for (const [x, y] of byDepth(k.corners(plan, FOOT_INSET))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_HEIGHT - FOOT_HEIGHT, 1.6, P, 28), { tone: 'lo' }))
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_HEIGHT - FOOT_HEIGHT + 1.6, FOOT_HEIGHT - 1.6, P, 28), { tone: 'mid' }))
  }
  out.push(S(k.slabOf(plan, -PLATE_HEIGHT, PLATE_HEIGHT, P, 8, 1.6), { tone: 'mid' }))
  out.push(L(k.planOutline(k.insetPlan(plan, 5), 0, P), { tone: 'lo' }))
  const screws = k.corners(plan, SCREW_INSET)
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(''), { tone: 'lo' }))
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }))
  return out.join('')
}

export const rulerStrip = (scene, strip) => {
  const { P, S, L, D, at } = scene
  const out = [S(k.slabOf(strip, 0, 0.6, P, 3), { tone: 'lo' })]
  const baseline = strip.y + RULER_BASELINE
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, baseline, 0.6, [1.8, 3], P)
  out.push(L(k.lineOnTop([strip.x, baseline], [strip.x + strip.w, baseline], 0.6, P), { tone: 'lo' }))
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }))
  out.push(D([at([strip.x + 2, strip.y + strip.d / 2, 0.6]), at([strip.x + strip.w - 2, strip.y + strip.d / 2, 0.6])], { size: 0.45 }))
  return out.join('')
}

export const labelPlate = (scene, plan) => {
  const { P, S, L, D, at } = scene
  const top = 0.8
  const out = [S(k.slabOf(plan, 0, top, P, 4), { tone: 'lo', crease: 'none' })]
  out.push(L(k.planOutline(k.insetPlan(plan, 1.6), top, P, 4), { tone: 'faint' }))
  const rules = [0.62, 0.46, 0.3]
  rules.forEach((share, index) => {
    const y = plan.y + plan.d * (0.32 + index * 0.18)
    out.push(L(k.lineOnTop([plan.x + 4, y], [plan.x + 4 + (plan.w - 12) * (share / 0.62), y], top, P), { tone: 'lo', free: true }))
  })
  out.push(D([at([plan.x + plan.w - 3.4, plan.y + 3.4, top]), at([plan.x + plan.w - 3.4, plan.y + plan.d - 3.4, top])], { size: 0.45 }))
  return out.join('')
}

export const knurledKnob = (scene, [x, y], z, { r = 4, h = 4 } = {}) => {
  const { P, S, L } = scene
  return [
    S(k.cylinder(x, y, r, z, h, P, 32), { tone: 'mid' }),
    L(k.knurl(x, y, r, z, z + h, 30, P), { tone: 'lo' })
  ].join('')
}
