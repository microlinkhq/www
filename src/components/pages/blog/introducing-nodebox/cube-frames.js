export const CUBE_QUARTER_TURN_MS = 1500
export const CUBE_FRAME_COUNT = 25
export const CUBE_TOP_COLOR = '#ea6195'
export const CUBE_LIT_COLOR = '#e11d68'
export const CUBE_SHADE_COLOR = '#b41753'

const CENTER = 12
const HALF_DIAGONAL = 9
const TOP_DEPTH = 5
const EDGE_HEIGHT = 5
const START_YAW = Math.PI / 4
const QUARTER_TURN = Math.PI / 2
const RESTING_SIDE = Math.SQRT1_2
const PRECISION = 100

const SCREEN_X = HALF_DIAGONAL / Math.SQRT2
const SCREEN_DEPTH = TOP_DEPTH / Math.SQRT2

const SIDE_NORMALS = [
  { x: 0, z: 1 },
  { x: 1, z: 0 },
  { x: 0, z: -1 },
  { x: -1, z: 0 }
]

const TOP_CORNERS = [
  { x: -1, y: 1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 1, z: 1 }
]

const round = value => Math.round(value * PRECISION) / PRECISION

const project = ({ x, y, z }, yaw) => {
  const across = x * Math.cos(yaw) - z * Math.sin(yaw)
  const depth = x * Math.sin(yaw) + z * Math.cos(yaw)
  return [
    round(CENTER + SCREEN_X * across),
    round(CENTER - EDGE_HEIGHT * y + SCREEN_DEPTH * depth)
  ]
}

const pathOf = points => `M${points.map(([x, y]) => `${x} ${y}`).join('L')}Z`

const channel = (hex, index) =>
  parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16)

const mix = (from, to, amount) =>
  `#${[0, 1, 2]
    .map(index =>
      Math.round(
        channel(from, index) +
          (channel(to, index) - channel(from, index)) * amount
      )
    )
    .map(value => value.toString(16).padStart(2, '0'))
    .join('')}`

const clamp = value => Math.min(1, Math.max(0, value))

const sideFace = (normal, yaw) => {
  const tangent = { x: -normal.z, z: normal.x }
  const corners = [
    { x: normal.x + tangent.x, y: 1, z: normal.z + tangent.z },
    { x: normal.x - tangent.x, y: 1, z: normal.z - tangent.z },
    { x: normal.x - tangent.x, y: -1, z: normal.z - tangent.z },
    { x: normal.x + tangent.x, y: -1, z: normal.z + tangent.z }
  ]
  const facing = normal.x * Math.sin(yaw) + normal.z * Math.cos(yaw)
  const sideways = normal.x * Math.cos(yaw) - normal.z * Math.sin(yaw)
  const points = corners.map(corner => project(corner, yaw))
  const edgeX = round(CENTER + SCREEN_X * sideways)
  const visible = facing > 0
  return {
    d: pathOf(visible ? points : points.map(([, y]) => [edgeX, y])),
    fill: mix(
      CUBE_LIT_COLOR,
      CUBE_SHADE_COLOR,
      clamp((sideways / RESTING_SIDE + 1) / 2)
    ),
    visible
  }
}

export const cubeFrame = turn => {
  const yaw = START_YAW + turn * QUARTER_TURN
  return {
    top: pathOf(TOP_CORNERS.map(corner => project(corner, yaw))),
    sides: SIDE_NORMALS.map(normal => sideFace(normal, yaw))
  }
}

export const CUBE_FRAMES = Array.from(
  { length: CUBE_FRAME_COUNT },
  (_, index) => cubeFrame(index / (CUBE_FRAME_COUNT - 1))
)

export const CUBE_ANIMATION = {
  top: CUBE_FRAMES.map(frame => frame.top).join(';'),
  sides: SIDE_NORMALS.map((_, side) => ({
    d: CUBE_FRAMES.map(frame => frame.sides[side].d).join(';'),
    fill: CUBE_FRAMES.map(frame => frame.sides[side].fill).join(';')
  }))
}
