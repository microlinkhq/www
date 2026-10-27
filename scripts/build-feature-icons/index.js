'use strict'

const { execFileSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const { render } = require('./teardown/projection.js')
const { CAMERA, ICONS } = require('./models')

const OUTPUT_DIR = path.join(__dirname, '../../static/images/icons/features')
const DISPLAY_BOX = { width: 240, height: 168 }
const PADDING_PX = 3
const INK = '#16161d'
const PAPER = '#fff'
const ACCENT = '#e5dbff'
const STROKE_PX = {
  outline: 1.5,
  edge: 1,
  detail: 0.75,
  texture: 0.5,
  axis: 0.75
}
const AXIS_DASH_PX = [5, 2, 1, 2]

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

const fillStyles = accent =>
  `[data-fill]{fill:${PAPER};stroke:none}` +
  accent.map(id => `[data-fill="${id}"]{fill:${ACCENT}}`).join('')

const stripPartMetadata = markup =>
  markup
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/ id="[^"]*"/g, '')
    .replace(/ data-name="[^"]*"/g, '')

const toSvg = ({ title, accent }, { markup, bounds }) => {
  const pxPerUnit = Math.min(
    DISPLAY_BOX.width / bounds.width,
    DISPLAY_BOX.height / bounds.height
  )
  const unitsPerPx = 1 / pxPerUnit
  const pad = PADDING_PX * unitsPerPx
  const viewBox = [
    bounds.x - pad,
    bounds.y - pad,
    bounds.width + pad * 2,
    bounds.height + pad * 2
  ].map(round)
  const width = Math.round(viewBox[2] * pxPerUnit)
  const height = Math.round(viewBox[3] * pxPerUnit)
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox.join(
      ' '
    )}" role="img">` +
    `<title>${title}</title>` +
    `<style>path{fill:none;stroke:${INK};stroke-linejoin:round;stroke-linecap:round}${strokeStyles(
      unitsPerPx
    )}${fillStyles(accent)}</style>` +
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
    PAPER,
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

module.exports = { build, renderIcon, OUTPUT_DIR }

if (require.main === module) {
  const proofFlag = process.argv.find(arg => arg.startsWith('--proof='))
  const proofDir = proofFlag && path.resolve(proofFlag.split('=')[1])
  for (const { file, bytes } of build({ proofDir })) {
    console.log(`${path.relative(process.cwd(), file)} ${bytes} bytes`)
  }
}
