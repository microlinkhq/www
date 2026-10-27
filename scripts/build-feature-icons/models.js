'use strict'

const G = require('./teardown/geometry.js')

const CAMERA = { azimuth: -122, elevation: 30, roll: 0 }
const SURFACE_OFFSET = 0.06

const circleProfile = (cx, cy, radius, segments = 48) =>
  Array.from({ length: segments }, (_, index) => {
    const angle = (index / segments) * G.TAU
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  })

const frontCircle = (part, [x, y, z], radius, role = 'detail') =>
  G.circle(part, [x, y - SURFACE_OFFSET, z], radius, [0, -1, 0], {
    role,
    segments: 48
  })

const frontRectangle = (part, y, [x0, z0], [x1, z1], role = 'detail') =>
  G.polyline(
    part,
    [
      [x0, y - SURFACE_OFFSET, z0],
      [x1, y - SURFACE_OFFSET, z0],
      [x1, y - SURFACE_OFFSET, z1],
      [x0, y - SURFACE_OFFSET, z1]
    ],
    { closed: true, role }
  )

const placeIn = (part, frame, build) =>
  G.merge(part, G.transform(build(G.piece()), frame))

const scale = () => {
  const BLADE = { width: 60, depth: 36, height: 9 }
  const BLADES = 3
  const GAP = 0.1
  const LIFT = 7
  const parts = []

  const plinth = G.part('plinth', 'Rack plinth')
  G.box(plinth, [-2, -2, -3], [BLADE.width + 2, BLADE.depth + 2, -GAP], {
    radius: 2
  })
  parts.push(plinth)

  for (let index = 0; index < BLADES; index++) {
    const z0 = index * (BLADE.height + GAP)
    const blade = G.part(`blade-${index + 1}`, `Server blade ${index + 1}`)
    G.box(blade, [0, 0, z0], [BLADE.width, BLADE.depth, z0 + BLADE.height], {
      radius: 1.5
    })
    for (let bay = 0; bay < 4; bay++) {
      const x0 = 6 + bay * 9
      frontRectangle(blade, 0, [x0, z0 + 2.5], [x0 + 7, z0 + 6.5])
    }
    frontCircle(blade, [47, 0, z0 + 4.5], 1.2)
    frontCircle(blade, [53, 0, z0 + 4.5], 1.2)
    const isNewest = index === BLADES - 1
    blade.explosion = [0, 0, (index + 1) * LIFT + (isNewest ? LIFT : 0)]
    parts.push(blade)
  }

  const top = BLADES * (BLADE.height + GAP)
  const arrow = G.part('arrow', 'Capacity arrow')
  placeIn(
    arrow,
    {
      ...G.plane('xz'),
      origin: [BLADE.width / 2, BLADE.depth / 2 + 1, top + 4]
    },
    piece =>
      G.extrude(
        piece,
        [
          [-3, 0],
          [3, 0],
          [3, 11],
          [8, 11],
          [0, 20],
          [-8, 11],
          [-3, 11]
        ],
        { depth: 2 }
      )
  )
  arrow.explosion = [0, 0, (BLADES + 3) * LIFT]
  parts.push(arrow)

  return { parts, accent: [`blade-${BLADES}`, 'arrow'] }
}

const edge = () => {
  const RADIUS = 24
  const LIFT = 8
  const NODE_RADIUS = 2.2
  const NODE_TRAVEL = 10
  const parts = []

  const globe = G.part('globe', 'Globe')
  const profile = Array.from({ length: 49 }, (_, index) => {
    const angle = (index / 48) * Math.PI
    return [-RADIUS * Math.cos(angle), RADIUS * Math.sin(angle)]
  })
  G.lathe(globe, profile, { axis: 'z', segments: 120, creaseAngle: 30 })
  for (const latitude of [-40, -15, 15, 40]) {
    const angle = (latitude * Math.PI) / 180
    G.circle(
      globe,
      [0, 0, RADIUS * Math.sin(angle)],
      RADIUS * Math.cos(angle) + SURFACE_OFFSET,
      [0, 0, 1],
      { role: 'detail', segments: 120 }
    )
  }
  for (const longitude of [0, 45, 90, 135]) {
    const angle = (longitude * Math.PI) / 180
    G.circle(
      globe,
      [0, 0, 0],
      RADIUS + SURFACE_OFFSET,
      [Math.cos(angle), Math.sin(angle), 0],
      { role: 'detail', segments: 120 }
    )
  }
  globe.explosion = [0, 0, LIFT]
  parts.push(globe)

  const stand = G.part('stand', 'Stand')
  G.lathe(
    stand,
    [
      [0, 0],
      [0, 16],
      [2.5, 16],
      [2.5, 3],
      [8, 3],
      [8, 0]
    ],
    { axis: 'z', at: [0, 0, -RADIUS - 8.1], segments: 120 }
  )
  parts.push(stand)

  const NODES = [
    [-150, 30],
    [-115, 52],
    [-95, 8],
    [-165, -4],
    [-70, 34]
  ]
  NODES.forEach(([azimuth, elevation], index) => {
    const a = (azimuth * Math.PI) / 180
    const e = (elevation * Math.PI) / 180
    const direction = [
      Math.cos(e) * Math.cos(a),
      Math.cos(e) * Math.sin(a),
      Math.sin(e)
    ]
    const center = direction.map(n => n * (RADIUS + NODE_RADIUS))
    const node = G.part(`node-${index + 1}`, `Edge location ${index + 1}`)
    placeIn(node, { origin: center, ...G.along('z') }, piece =>
      G.lathe(
        piece,
        Array.from({ length: 25 }, (_, step) => {
          const angle = (step / 24) * Math.PI
          return [-NODE_RADIUS * Math.cos(angle), NODE_RADIUS * Math.sin(angle)]
        }),
        { segments: 48, creaseAngle: 40 }
      )
    )
    node.explosion = G.add(
      direction.map(n => n * NODE_TRAVEL),
      [0, 0, LIFT]
    )
    parts.push(node)
  })

  return { parts, accent: NODES.map((_, index) => `node-${index + 1}`) }
}

const developer = () => {
  const WIDTH = 72
  const HEIGHT = 50
  const DEPTH = 3
  const parts = []

  const editor = G.part('window', 'Editor window')
  placeIn(editor, { ...G.plane('xz'), origin: [0, DEPTH, 0] }, piece =>
    G.extrude(piece, G.roundedRectangle(WIDTH, HEIGHT, 4), { depth: DEPTH })
  )
  const titleBar = HEIGHT / 2 - 7
  G.line(
    editor,
    [-WIDTH / 2, -SURFACE_OFFSET, titleBar],
    [WIDTH / 2, -SURFACE_OFFSET, titleBar],
    'detail'
  )
  for (const x of [-WIDTH / 2 + 5, -WIDTH / 2 + 10, -WIDTH / 2 + 15]) {
    frontCircle(editor, [x, 0, HEIGHT / 2 - 3.5], 1.3)
  }
  parts.push(editor)

  const code = G.part('code', 'Code lines')
  const LINES = [
    [0, 26],
    [4, 30],
    [4, 20],
    [8, 24],
    [4, 12],
    [0, 18]
  ]
  LINES.forEach(([indent, length], index) => {
    const z = titleBar - 5 - index * 5.6
    const x0 = -WIDTH / 2 + 7 + indent
    G.box(code, [x0, -1.5, z - 2.4], [x0 + length, -0.1, z])
  })
  code.explosion = [0, -10, 0]
  parts.push(code)

  const badge = G.part('badge', 'Agent badge')
  const BADGE_RADIUS = 9.5
  const BADGE_CENTER = [WIDTH / 2 - 4, -0.1, -HEIGHT / 2 + 4]
  placeIn(badge, { origin: BADGE_CENTER, ...G.along('y') }, piece =>
    G.lathe(
      piece,
      [
        [0, 0],
        [0, BADGE_RADIUS],
        [-3, BADGE_RADIUS],
        [-3, 0]
      ],
      { segments: 96 }
    )
  )
  const face = BADGE_CENTER[1] - 3 - SURFACE_OFFSET
  const glyph = (points, role = 'edge') =>
    G.polyline(
      badge,
      points.map(([x, z]) => [BADGE_CENTER[0] + x, face, BADGE_CENTER[2] + z]),
      { role }
    )
  glyph([
    [-2.6, 3.2],
    [-5.6, 0],
    [-2.6, -3.2]
  ])
  glyph([
    [2.6, 3.2],
    [5.6, 0],
    [2.6, -3.2]
  ])
  glyph([
    [1.1, 4],
    [-1.1, -4]
  ])
  badge.explosion = [0, -24, 0]
  parts.push(badge)

  return { parts, accent: ['badge'] }
}

const programmable = () => {
  const SIZE = 40
  const HALF = SIZE / 2
  const PINS = 6
  const PIN_PITCH = 5.4
  const LIFT = 9
  const parts = []

  const substrate = G.part('substrate', 'Package substrate')
  G.box(substrate, [-HALF, -HALF, 0], [HALF, HALF, 3], { radius: 1 })
  for (let side = 0; side < 4; side++) {
    const frame = {
      xAxis: [
        Math.cos((side * Math.PI) / 2),
        Math.sin((side * Math.PI) / 2),
        0
      ],
      yAxis: [
        -Math.sin((side * Math.PI) / 2),
        Math.cos((side * Math.PI) / 2),
        0
      ],
      zAxis: [0, 0, 1]
    }
    for (let pin = 0; pin < PINS; pin++) {
      const offset = (pin - (PINS - 1) / 2) * PIN_PITCH
      placeIn(substrate, frame, piece => {
        G.box(
          piece,
          [offset - 0.9, -HALF - 4, 1],
          [offset + 0.9, -HALF + 0.5, 2]
        )
        return G.box(
          piece,
          [offset - 0.9, -HALF - 4, -2.5],
          [offset + 0.9, -HALF - 3, 1]
        )
      })
    }
  }
  parts.push(substrate)

  const die = G.part('die', 'Silicon die')
  G.box(die, [-8, -8, 3.1], [8, 8, 5])
  for (const at of [-4, 0, 4]) {
    G.line(
      die,
      [at, -8, 5 + SURFACE_OFFSET],
      [at, 8, 5 + SURFACE_OFFSET],
      'texture'
    )
    G.line(
      die,
      [-8, at, 5 + SURFACE_OFFSET],
      [8, at, 5 + SURFACE_OFFSET],
      'texture'
    )
  }
  die.explosion = [0, 0, LIFT]
  parts.push(die)

  const lid = G.part('lid', 'Heat spreader')
  G.box(lid, [-15, -15, 5.1], [15, 15, 7.6], { radius: 2 })
  G.circle(lid, [-10.5, -10.5, 7.6 + SURFACE_OFFSET], 1.4, [0, 0, 1], {
    role: 'detail',
    segments: 48
  })
  lid.explosion = [0, 0, LIFT * 2.4]
  parts.push(lid)

  return {
    parts,
    trails: [{ a: [0, 0, 5], b: [0, 0, 5.1], from: 'die', to: 'lid' }],
    accent: ['die']
  }
}

const cache = () => {
  const RADIUS = 22
  const HEIGHT = 10
  const LEVELS = 3
  const LIFT = 14
  const parts = []
  const camera = (CAMERA.azimuth * Math.PI) / 180
  const facing = [Math.cos(camera), Math.sin(camera), 0]

  for (let index = 0; index < LEVELS; index++) {
    const z0 = index * (HEIGHT + 0.1)
    const level = G.part(`level-${index + 1}`, `Cache layer ${index + 1}`)
    G.lathe(
      level,
      [
        [0, 0],
        [0, RADIUS],
        [HEIGHT, RADIUS],
        [HEIGHT, 0]
      ],
      { axis: 'z', at: [0, 0, z0], segments: 144 }
    )
    const indicator = facing.map(n => n * (RADIUS + SURFACE_OFFSET))
    G.circle(
      level,
      [indicator[0], indicator[1], z0 + HEIGHT / 2],
      1.3,
      facing,
      {
        role: 'detail',
        segments: 48
      }
    )
    level.explosion = [0, 0, index * LIFT]
    parts.push(level)
  }

  return { parts, accent: [`level-${LEVELS}`] }
}

const security = () => {
  const WIDTH = 40
  const HEIGHT = 32
  const DEPTH = 16
  const SHACKLE_SPAN = 12
  const SHACKLE_RADIUS = 2.6
  const KEYWAY = { x: 0, z: 15, radius: 4.6 }
  const parts = []

  const body = G.part('body', 'Lock body')
  placeIn(body, { ...G.plane('xz'), origin: [0, DEPTH / 2, 0] }, piece =>
    G.extrude(
      piece,
      G.roundedRectangle(WIDTH, HEIGHT, 4, { center: [0, HEIGHT / 2] }),
      {
        depth: DEPTH,
        holes: [circleProfile(KEYWAY.x, KEYWAY.z, KEYWAY.radius)]
      }
    )
  )
  for (const x of [-SHACKLE_SPAN, SHACKLE_SPAN]) {
    G.circle(
      body,
      [x, 0, HEIGHT + SURFACE_OFFSET],
      SHACKLE_RADIUS + 0.2,
      [0, 0, 1],
      {
        role: 'detail',
        segments: 48
      }
    )
  }
  parts.push(body)

  const shackle = G.part('shackle', 'Shackle')
  const arc = Array.from({ length: 33 }, (_, index) => {
    const angle = Math.PI - (index / 32) * Math.PI
    return [
      SHACKLE_SPAN * Math.cos(angle),
      0,
      HEIGHT + 12 + SHACKLE_SPAN * Math.sin(angle)
    ]
  })
  G.sweep(
    shackle,
    [[-SHACKLE_SPAN, 0, HEIGHT - 6], ...arc, [SHACKLE_SPAN, 0, HEIGHT - 6]],
    circleProfile(0, 0, SHACKLE_RADIUS, 32)
  )
  shackle.explosion = [0, 0, 12]
  parts.push(shackle)

  const cylinder = G.part('cylinder', 'Key cylinder')
  const FRONT = -DEPTH / 2 - 1
  placeIn(
    cylinder,
    { origin: [KEYWAY.x, FRONT, KEYWAY.z], ...G.along('y') },
    piece =>
      G.lathe(
        piece,
        [
          [0, 0],
          [0, KEYWAY.radius + 1],
          [1, KEYWAY.radius + 1],
          [1, KEYWAY.radius - 0.05],
          [DEPTH - 2, KEYWAY.radius - 0.05],
          [DEPTH - 2, 0]
        ],
        { segments: 96 }
      )
  )
  const face = FRONT - SURFACE_OFFSET
  G.circle(cylinder, [KEYWAY.x, face, KEYWAY.z + 1], 1.3, [0, -1, 0], {
    role: 'detail',
    segments: 48
  })
  G.polyline(
    cylinder,
    [
      [KEYWAY.x - 0.6, face, KEYWAY.z + 0.2],
      [KEYWAY.x - 1, face, KEYWAY.z - 2.6],
      [KEYWAY.x + 1, face, KEYWAY.z - 2.6],
      [KEYWAY.x + 0.6, face, KEYWAY.z + 0.2]
    ],
    { role: 'detail' }
  )
  cylinder.explosion = [0, -16, 0]
  parts.push(cylinder)

  return {
    parts,
    trails: [
      {
        a: [KEYWAY.x, FRONT, KEYWAY.z],
        b: [KEYWAY.x, -DEPTH / 2, KEYWAY.z],
        from: 'cylinder'
      }
    ],
    accent: ['cylinder']
  }
}

module.exports = {
  CAMERA,
  ICONS: [
    { id: 'scale', title: 'Server blades stacking up', build: scale },
    { id: 'edge', title: 'Globe with edge locations', build: edge },
    {
      id: 'developer',
      title: 'Editor window with code layers',
      build: developer
    },
    { id: 'programmable', title: 'Chip package teardown', build: programmable },
    { id: 'cache', title: 'Stacked cache layers', build: cache },
    { id: 'security', title: 'Padlock teardown', build: security }
  ]
}
