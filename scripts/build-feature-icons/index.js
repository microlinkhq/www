'use strict'

const { execFileSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const { render } = require('./teardown/projection.js')
const { CAMERA, ICONS } = require('./models')

const OUTPUT_DIR = path.join(__dirname, '../../static/images/icons/features')
const DISPLAY_BOX = { width: 240, height: 168 }
const PADDING_PX = 3
const PALETTE = {
  outline: '#343a40',
  edge: '#495057',
  paper: '#fff',
  accentInk: [
    ['0%', '#f76698'],
    ['60%', '#c03fa2'],
    ['100%', '#8c1bab']
  ],
  accentFill: ['#ffdeeb', '#e5dbff'],
  glow: '#b197fc'
}
const STROKE_PX = {
  outline: 1.4,
  edge: 1,
  detail: 0.75,
  texture: 0.5,
  axis: 0.75
}
const AXIS_DASH_PX = [5, 2, 1, 2]
const GLOW = { widthRatio: 0.46, heightPx: 14, opacity: 0.5 }
const ACCENT_INK_ID = 'accent-ink'
const ACCENT_FILL_ID = 'accent-fill'
const GLOW_ID = 'glow'

const round = value => Number(value.toFixed(3))

const strokeStyles = unitsPerPx =>
  Object.entries(STROKE_PX)
    .map(
      ([role, px]) =>
        `[data-line-role="${role}"]{stroke-width:${round(px * unitsPerPx)}}`
    )
    .join('') +
  `[data-line-role="axis"]{stroke-linecap:butt;stroke-dasharray:${AXIS_DASH_PX.map(
    px => round(px * unitsPerPx)
  ).join(' ')}}`

const inkStyles = accent =>
  `path{fill:none;stroke:${PALETTE.edge};stroke-linejoin:round;stroke-linecap:round}` +
  `[data-line-role="outline"]{stroke:${PALETTE.outline}}` +
  accent
    .map(id => `[data-item="${id}"] path{stroke:url(#${ACCENT_INK_ID})}`)
    .join('')

const fillStyles = accent =>
  `[data-fill]{fill:${PALETTE.paper};stroke:none}` +
  accent.map(id => `[data-fill="${id}"]{fill:url(#${ACCENT_FILL_ID})}`).join('')

const stops = colors =>
  colors
    .map(
      ([offset, color, opacity = 1]) =>
        `<stop offset="${offset}" stop-color="${color}" stop-opacity="${opacity}"/>`
    )
    .join('')

const accentSpan = (markup, accent) => {
  const xs = accent.flatMap(id => {
    const group = markup.match(
      new RegExp(`<g[^>]*data-item="${id}"[^>]*>([\\s\\S]*?)</g>`)
    )
    if (!group) return []
    return [...group[1].matchAll(/ d="([^"]*)"/g)].flatMap(([, d]) =>
      [...d.matchAll(/(-?[\d.]+)[ ,](-?[\d.]+)/g)].map(([, x]) => Number(x))
    )
  })
  return xs.length ? [Math.min(...xs), Math.max(...xs)] : [0, 1]
}

const definitions = ([x1, x2]) =>
  '<defs>' +
  `<linearGradient id="${ACCENT_INK_ID}" gradientUnits="userSpaceOnUse" x1="${round(
    x1
  )}" x2="${round(x2)}" y1="0" y2="0">${stops(
    PALETTE.accentInk
  )}</linearGradient>` +
  `<linearGradient id="${ACCENT_FILL_ID}" gradientUnits="userSpaceOnUse" x1="${round(
    x1
  )}" x2="${round(x2)}" y1="0" y2="0">${stops([
    ['0%', PALETTE.accentFill[0]],
    ['100%', PALETTE.accentFill[1]]
  ])}</linearGradient>` +
  `<radialGradient id="${GLOW_ID}">${stops([
    ['0%', PALETTE.glow, GLOW.opacity],
    ['100%', PALETTE.glow, 0]
  ])}</radialGradient>` +
  '</defs>'

const glow = (bounds, unitsPerPx) =>
  `<ellipse cx="${round(bounds.x + bounds.width / 2)}" cy="${round(
    bounds.y + bounds.height
  )}" rx="${round(bounds.width * GLOW.widthRatio)}" ry="${round(
    GLOW.heightPx * unitsPerPx
  )}" fill="url(#${GLOW_ID})"/>`

const stripPartMetadata = markup =>
  markup
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/ id="[^"]*"/g, '')
    .replace(/ data-name="[^"]*"/g, '')

const toSvg = ({ title, accent }, { markup, bounds }) => {
  const pxPerUnit = Math.min(
    (DISPLAY_BOX.width - PADDING_PX * 2) / bounds.width,
    (DISPLAY_BOX.height - PADDING_PX - GLOW.heightPx) / bounds.height
  )
  const unitsPerPx = 1 / pxPerUnit
  const pad = PADDING_PX * unitsPerPx
  const glowPad = GLOW.heightPx * unitsPerPx
  const viewBox = [
    bounds.x - pad,
    bounds.y - pad,
    bounds.width + pad * 2,
    bounds.height + pad + glowPad
  ].map(round)
  const width = Math.round(viewBox[2] * pxPerUnit)
  const height = Math.round(viewBox[3] * pxPerUnit)
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox.join(
      ' '
    )}">` +
    `<title>${title}</title>` +
    `<style>${inkStyles(accent)}${strokeStyles(unitsPerPx)}${fillStyles(
      accent
    )}</style>` +
    definitions(accentSpan(markup, accent)) +
    glow(bounds, unitsPerPx) +
    stripPartMetadata(markup) +
    '</svg>\n'
  )
}

const renderIcon = (icon, explosion = 1) => {
  const { parts, trails = [], accent = [] } = icon.build()
  const result = render(parts, {
    explosion,
    camera: CAMERA,
    trails,
    fill: true
  })
  return toSvg({ title: icon.title, accent }, result)
}

const writeProof = (proofDir, name, svg) => {
  const svgFile = path.join(proofDir, `${name}.svg`)
  fs.writeFileSync(svgFile, svg)
  execFileSync('rsvg-convert', [
    '-z',
    '4',
    '-b',
    PALETTE.paper,
    '-o',
    path.join(proofDir, `${name}.png`),
    svgFile
  ])
}

const optimize = files =>
  execFileSync('npx', ['optimo', ...files], { stdio: 'ignore' })

const build = ({ proofDir } = {}) => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  if (proofDir) fs.mkdirSync(proofDir, { recursive: true })
  const files = ICONS.map(icon => {
    const svg = renderIcon(icon)
    const file = path.join(OUTPUT_DIR, `${icon.id}.svg`)
    fs.writeFileSync(file, svg)
    if (proofDir) {
      writeProof(proofDir, `${icon.id}-exploded`, svg)
      writeProof(proofDir, `${icon.id}-assembled`, renderIcon(icon, 0))
    }
    return file
  })
  optimize(files)
  return files.map(file => ({ file, bytes: fs.statSync(file).size }))
}

module.exports = { build, renderIcon, OUTPUT_DIR, PALETTE }

if (require.main === module) {
  const proofFlag = process.argv.find(arg => arg.startsWith('--proof='))
  const proofDir = proofFlag && path.resolve(proofFlag.split('=')[1])
  for (const { file, bytes } of build({ proofDir })) {
    console.log(`${path.relative(process.cwd(), file)} ${bytes} bytes`)
  }
}
