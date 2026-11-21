import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import * as k from './kit/iso-kit.mjs'
import { HEIGHT, WIDTH } from './scene.mjs'
import { stageOf } from './stage.mjs'
import FIGURES from './figures/index.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const outAt = process.argv.indexOf('--out')
const OUT = outAt > -1 ? process.argv[outAt + 1] : join(HERE, '../../src/components/pages/manifesto/figures')
const previewAt = process.argv.indexOf('--preview')
const previewDir = previewAt > -1 ? process.argv[previewAt + 1] : null
const only = process.argv.find(arg => arg.startsWith('--only='))?.slice(7)

const plateOf = (figure, svg, readout) =>
  k.plateHtml({
    fig: figure.fig,
    title: figure.title,
    hint: figure.hint,
    readout,
    body: stageOf(figure, svg)
  })

const writeJson = (name, data) => writeFileSync(join(OUT, name), `${JSON.stringify(data)}\n`)

mkdirSync(OUT, { recursive: true })
writeJson('iso-css.json', { css: k.ISO_CSS })

const manifest = {}
for (const figure of FIGURES) {
  manifest[figure.id] = { fig: figure.fig, title: figure.title, hint: figure.hint, label: figure.label, width: WIDTH, height: HEIGHT }
  if (only && figure.id !== only) continue
  const { body, motion, readout } = figure.build()
  const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label: figure.label, body })
  const html = plateOf(figure, svg, readout)
  manifest[figure.id].readout = readout
  writeJson(`${figure.id}.json`, { html, motion })
  if (previewDir) {
    mkdirSync(previewDir, { recursive: true })
    writeFileSync(join(previewDir, `${figure.id}.html`), k.pageHtml({ title: figure.title, theme: 'light', body: html, width: 560 }))
  }
  console.log(`wrote ${figure.id} (${Math.round(html.length / 1024)} KB)`)
}

if (!only) writeJson('manifest.json', manifest)
