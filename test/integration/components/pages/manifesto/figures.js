import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { createFakeFigureRoot } from '../../../../utils/fake-figure-root'
import { createBalanceScalePose } from '../../../../../src/components/pages/manifesto/anatomy/motion/everyone-profitable'
import { createLaunchPadPose } from '../../../../../src/components/pages/manifesto/anatomy/motion/everyone-ships'
import { createMarbleRunPose } from '../../../../../src/components/pages/manifesto/anatomy/motion/make-fast-faster'
import { createTypewriterPose } from '../../../../../src/components/pages/manifesto/anatomy/motion/no-meetings'
import { createTorqueWrenchPose } from '../../../../../src/components/pages/manifesto/anatomy/motion/own-outcomes'
import { createStampingJigPose } from '../../../../../src/components/pages/manifesto/anatomy/motion/zero-person-work'

const FIGURES_DIR = path.join(
  process.cwd(),
  'src/components/pages/manifesto/figures'
)
const BUILD_SCRIPT = path.join(process.cwd(), 'scripts/anatomy/build.mjs')
const FIGURE_IDS = [
  'zero-person-work',
  'everyone-ships',
  'everyone-profitable',
  'own-outcomes',
  'no-meetings',
  'make-fast-faster'
]

const readJson = (dir, name) =>
  JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'))
const figureOf = id => readJson(FIGURES_DIR, `${id}.json`)
const manifest = readJson(FIGURES_DIR, 'manifest.json')

const poseFor = (id, createPose) => {
  const { html, motion } = figureOf(id)
  const root = createFakeFigureRoot(html)
  const pose = createPose(motion)(root)
  const at = phase => {
    pose(phase * motion.period)
    return root
  }
  return { motion, root, at }
}

const readoutOf = root => root.querySelector('[data-readout]').textContent

describe('generated figures', () => {
  test('the committed JSON is exactly what scripts/anatomy/build.mjs produces', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'manifesto-figures-'))
    execFileSync(process.execPath, [BUILD_SCRIPT, '--out', out], {
      stdio: 'ignore'
    })
    for (const name of [
      'manifest.json',
      'iso-css.json',
      ...FIGURE_IDS.map(id => `${id}.json`)
    ]) {
      expect(readJson(out, name), name).toEqual(readJson(FIGURES_DIR, name))
    }
  }, 60000)

  test.each(FIGURE_IDS)(
    '%s is an accessible 600 × 400 figure that matches its manifest entry',
    id => {
      const { html } = figureOf(id)
      const entry = manifest[id]
      expect(html).toContain('viewBox="0 0 600 400"')
      expect(html).toContain('role="img"')
      expect(html).toContain(`aria-label="${entry.label}"`)
      expect(html).toContain(`data-readout>${entry.readout}<`)
      expect(html).not.toContain('—')
    }
  )

  test('--only builds that figure and does not rewrite the manifest', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'manifesto-only-'))
    execFileSync(
      process.execPath,
      [BUILD_SCRIPT, '--out', out, '--only=zero-person-work'],
      { stdio: 'ignore' }
    )
    expect(fs.existsSync(path.join(out, 'zero-person-work.json'))).toBe(true)
    expect(fs.existsSync(path.join(out, 'iso-css.json'))).toBe(true)
    expect(fs.existsSync(path.join(out, 'everyone-ships.json'))).toBe(false)
    expect(fs.existsSync(path.join(out, 'manifest.json'))).toBe(false)
  })

  test('--preview writes a standalone page for the figure', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'manifesto-preview-'))
    const preview = fs.mkdtempSync(
      path.join(os.tmpdir(), 'manifesto-preview-html-')
    )
    execFileSync(
      process.execPath,
      [
        BUILD_SCRIPT,
        '--out',
        out,
        '--only=zero-person-work',
        '--preview',
        preview
      ],
      { stdio: 'ignore' }
    )
    const html = fs.readFileSync(
      path.join(preview, 'zero-person-work.html'),
      'utf8'
    )
    expect(html).toContain('<!doctype html>')
    expect(html).toContain('Stamping jig')
  })

  test('figures are numbered in page order', () => {
    expect(FIGURE_IDS.map(id => manifest[id].fig)).toEqual([
      'Fig 01',
      'Fig 02',
      'Fig 03',
      'Fig 04',
      'Fig 05',
      'Fig 06'
    ])
  })
})

describe('figure motion tells the truth', () => {
  test('stamping jig: one card stamped per cycle, marks only on cards past the ram', () => {
    const { motion, root, at } = poseFor(
      'zero-person-work',
      createStampingJigPose
    )
    const already = motion.cards.filter(x => x > 0).length
    expect(motion.prestamped).toBe(already)
    expect(readoutOf(at(0.05))).toBe(`by hand 1 · by the jig ${already}`)
    expect(readoutOf(at(0.3))).toBe(`by hand 1 · by the jig ${already + 1}`)
    expect(readoutOf(at(3.3))).toBe(`by hand 1 · by the jig ${already + 4}`)
    expect(root.querySelector('[data-part="counter"]').textContent).toBe(
      String(already + 4).padStart(4, '0')
    )
    at(0.05)
    const marks = root.querySelectorAll('[data-mark]')
    motion.cards.forEach((x, index) => {
      expect(marks[index].attributes.opacity, `card at ${x}`).toBe(
        x > 0 ? '1' : '0'
      )
    })
  })

  test('launch pad: counts down, then counts a launch the moment the rocket lifts', () => {
    const { root, at } = poseFor('everyone-ships', createLaunchPadPose)
    const display = () =>
      root.querySelector('[data-part="display"]').textContent
    expect(display(at(0.05))).toBe('ARM')
    expect(display(at(0.14))).toBe('T-3')
    expect(display(at(0.2))).toBe('T-2')
    expect(display(at(0.26))).toBe('T-1')
    expect(readoutOf(at(0.29))).toBe('shipped 0 · countdown')
    expect(readoutOf(at(0.31))).toBe('shipped 1 · climbing')
    expect(readoutOf(at(1.31))).toBe('shipped 2 · climbing')
  })

  test('balance scale: pays for itself exactly when earnings reach the cost', () => {
    const { motion, root, at } = poseFor(
      'everyone-profitable',
      createBalanceScalePose
    )
    const landing = index => 0.06 + index * 0.055 + 0.001
    expect(readoutOf(at(landing(motion.cost - 2)))).toBe(
      `earned ${motion.cost - 1} of ${motion.cost} · not yet`
    )
    expect(readoutOf(at(landing(motion.cost - 1)))).toBe(
      `earned ${motion.cost} of ${motion.cost} · pays for itself`
    )
    const lift = () =>
      Number(
        root
          .querySelector('[data-part="pan-earned"]')
          .attributes.transform.match(/translate\(\S+ (\S+)\)/)[1]
      )
    at(0.01)
    const empty = lift()
    at(0.8)
    const full = lift()
    expect(full).toBeGreaterThan(empty)
  })

  test('torque wrench: reaches the target torque only at the end of the last stroke', () => {
    const { motion, root, at } = poseFor('own-outcomes', createTorqueWrenchPose)
    expect(readoutOf(at(0.05))).toBe('bolt 1 · loose')
    const middle = readoutOf(at(0.4)).match(/turning · (\d+) of (\d+) Nm/)
    expect(Number(middle[1])).toBeLessThan(motion.target)
    expect(readoutOf(at(0.659))).toBe(
      `turning · ${motion.target} of ${motion.target} Nm`
    )
    expect(readoutOf(at(0.75))).toBe(`seated · ${motion.target} Nm · striped`)
    expect(root.querySelector('[data-part="stripe"]').attributes.opacity).toBe(
      '1.000'
    )
  })

  test('typewriter: types every line, then ships the page to the tray', () => {
    const { motion, root, at } = poseFor('no-meetings', createTypewriterPose)
    expect(readoutOf(at(0.01))).toBe(`line 1 of ${motion.lines} · meetings 0`)
    expect(readoutOf(at(0.8))).toBe(
      `line ${motion.lines} of ${motion.lines} · meetings 0`
    )
    expect(readoutOf(at(0.83))).toBe('page shipped · meetings 0')
    const full = (motion.margin + motion.chars * motion.step).toFixed(2)
    root
      .querySelectorAll('[data-line]')
      .forEach(line => expect(line.attributes.x2).toBe(full))
    at(0.95)
    const shown = root
      .querySelectorAll('[data-sheet]')
      .filter(sheet => sheet.attributes.opacity === '1.000')
    expect(shown).toHaveLength(motion.stacked + 1)
  })

  test('marble run: removing the gates cuts the run to its free-fall time', () => {
    const { motion, root, at } = poseFor(
      'make-fast-faster',
      createMarbleRunPose
    )
    at(0.9)
    const gated = Number(
      root.querySelector('[data-part="time-gated"]').textContent
    )
    const direct = Number(
      root.querySelector('[data-part="time-direct"]').textContent
    )
    expect(direct).toBeCloseTo(
      Math.sqrt((2 * motion.length) / motion.acceleration),
      1
    )
    expect(gated).toBeGreaterThan(direct + motion.waits[0] + motion.waits[1])
    expect(readoutOf(root)).toBe(
      `with gates ${gated.toFixed(1)} s · without ${direct.toFixed(1)} s`
    )
  })
})
