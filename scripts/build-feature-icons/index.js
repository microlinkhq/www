'use strict'

const path = require('path')
const fs = require('fs')

const { render, createCamera } = require('./teardown/projection.js')
const { CAMERA, ICONS } = require('./models')

const OUTPUT_FILE = path.join(
  __dirname,
  '../../src/components/pages/home/feature-icons/geometry.json'
)
const DISPLAY_BOX = { width: 240, height: 168 }
const PADDING_PX = 3
const GLOW_HEIGHT_PX = 14
const GLOW_WIDTH_RATIO = 0.46
const HOVER_SPREAD = 0.45
const DECIMALS = 1

const round = (value, decimals = DECIMALS) => Number(value.toFixed(decimals))

const SCALE = 10 ** DECIMALS
const POINTS_PER_SEGMENT = { M: 1, L: 1, C: 3 }

const formatTenths = value =>
  String(value / SCALE)
    .replace(/^0\./, '.')
    .replace(/^-0\./, '-.')

const joinNumbers = numbers =>
  numbers
    .map(formatTenths)
    .reduce(
      (out, text, index) =>
        index === 0 || text.startsWith('-') ? out + text : `${out} ${text}`,
      ''
    )

const mapPath = (d, map) => {
  let current = [0, 0]
  let subpathStart = current
  return [...d.matchAll(/([MLCZ])([^MLCZ]*)/g)]
    .map(([, command, body]) => {
      if (command === 'Z') {
        current = subpathStart
        return 'z'
      }
      const numbers = body.trim().split(/\s+/).map(Number)
      const points = []
      for (let i = 0; i < numbers.length; i += 2) {
        points.push(
          map([numbers[i], numbers[i + 1]]).map(n => Math.round(n * SCALE))
        )
      }
      if (command === 'M') subpathStart = points[0]
      const perSegment = POINTS_PER_SEGMENT[command]
      const relative = []
      for (let i = 0; i < points.length; i += perSegment) {
        const segment = points.slice(i, i + perSegment)
        relative.push(
          ...segment.flatMap(([x, y]) => [x - current[0], y - current[1]])
        )
        current = segment[segment.length - 1]
      }
      return command.toLowerCase() + joinNumbers(relative)
    })
    .join('')
}

const pathsOf = markup =>
  Object.fromEntries(
    [
      ...markup.matchAll(/data-line-role="([a-z]+)" fill="none" d="([^"]*)"/g)
    ].map(([, role, d]) => [role, d])
  )

const fillOf = markup =>
  (markup.match(/data-fill="[^"]*"[^>]* d="([^"]*)"/) || [])[1]

const isolate = (parts, part, sheet) => {
  const solo = render(parts, { camera: CAMERA, isolated: part.id, fill: true })
  const ratio = sheet.scale / solo.scale
  const xs = []
  const toSheet = ([x, y]) => {
    const point = [
      sheet.offset[0] + (x - solo.offset[0]) * ratio,
      sheet.offset[1] + (y - solo.offset[1]) * ratio
    ]
    xs.push(point[0])
    return point
  }
  const fill = fillOf(solo.markup)
  return {
    fill: fill ? mapPath(fill, toSheet) : null,
    lines: Object.fromEntries(
      Object.entries(pathsOf(solo.markup)).map(([role, d]) => [
        role,
        mapPath(d, toSheet)
      ])
    ),
    span: [Math.min(...xs), Math.max(...xs)]
  }
}

const paintOrder = parts => {
  const { markup } = render(parts, { camera: CAMERA, fill: true })
  const painted = [...markup.matchAll(/data-fill="([^"]*)"/g)].map(
    ([, id]) => id
  )
  const hidden = parts.map(part => part.id).filter(id => !painted.includes(id))
  return [...hidden, ...painted].map(id => parts.find(part => part.id === id))
}

const accentSpan = parts => {
  const spans = parts.filter(part => part.accent).map(part => part.span)
  return [
    Math.min(...spans.map(([min]) => min)),
    Math.max(...spans.map(([, max]) => max))
  ].map(n => round(n))
}

const renderIcon = icon => {
  const { parts, accent = [] } = icon.build()
  const camera = createCamera(CAMERA)
  const sheet = render(parts, { camera: CAMERA })
  const { bounds } = sheet
  const pxPerUnit = Math.min(
    (DISPLAY_BOX.width - PADDING_PX * 2) / bounds.width,
    (DISPLAY_BOX.height - PADDING_PX - GLOW_HEIGHT_PX) / bounds.height
  )
  const unitsPerPx = 1 / pxPerUnit
  const viewBox = [
    bounds.x - PADDING_PX * unitsPerPx,
    bounds.y - PADDING_PX * unitsPerPx,
    bounds.width + PADDING_PX * 2 * unitsPerPx,
    bounds.height + (PADDING_PX + GLOW_HEIGHT_PX) * unitsPerPx
  ]

  const drawn = paintOrder(parts).map(part => {
    const [dx, dy] = camera.project(part.explosion)
    return {
      id: part.id,
      accent: accent.includes(part.id),
      shift: [dx, dy].map(n => round(n * sheet.scale * HOVER_SPREAD, 2)),
      ...isolate(parts, part, sheet)
    }
  })

  return {
    title: icon.title,
    width: Math.round(viewBox[2] * pxPerUnit),
    height: Math.round(viewBox[3] * pxPerUnit),
    viewBox: viewBox.map(n => round(n, 2)),
    unitsPerPx: round(unitsPerPx, 4),
    glow: {
      cx: round(bounds.x + bounds.width / 2),
      cy: round(bounds.y + bounds.height),
      rx: round(bounds.width * GLOW_WIDTH_RATIO),
      ry: round(GLOW_HEIGHT_PX * unitsPerPx)
    },
    accentSpan: accentSpan(drawn),
    parts: drawn.map(({ span, ...part }) => part)
  }
}

const generate = () =>
  Object.fromEntries(ICONS.map(icon => [icon.id, renderIcon(icon)]))

const serialize = icons => JSON.stringify(icons) + '\n'

const build = () => {
  const contents = serialize(generate())
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, contents)
  return { file: OUTPUT_FILE, bytes: Buffer.byteLength(contents) }
}

module.exports = {
  build,
  generate,
  serialize,
  mapPath,
  OUTPUT_FILE,
  HOVER_SPREAD
}

if (require.main === module) {
  const { file, bytes } = build()
  console.log(`${path.relative(process.cwd(), file)} ${bytes} bytes`)
}
