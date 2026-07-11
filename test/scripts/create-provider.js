import { expect, describe, it } from 'vitest'
import { mkdtemp, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'

import { fromCode } from '../../scripts/fetch-data/create-provider'
import { dists } from '../../scripts/fetch-data/clean'

const tmpFile = async () =>
  path.join(await mkdtemp(path.join(tmpdir(), 'create-provider-')), 'data.json')

const DATA = [{ reqs_pretty: '200M', cdn_edges: 337 }]

describe('fromCode', () => {
  it('writes when the file is missing', async () => {
    const dist = await tmpFile()
    let calls = 0
    await fromCode(async () => ++calls && DATA, { dist })
    expect(calls).toBe(1)
    expect(JSON.parse(await readFile(dist))).toEqual(DATA)
  })

  it('skips when a non-empty file exists', async () => {
    const dist = await tmpFile()
    await writeFile(dist, JSON.stringify(DATA))
    let calls = 0
    await fromCode(async () => ++calls && DATA, { dist })
    expect(calls).toBe(0)
  })

  it('rewrites when the existing file is empty', async () => {
    const dist = await tmpFile()
    await writeFile(dist, '')
    let calls = 0
    await fromCode(async () => ++calls && DATA, { dist })
    expect(calls).toBe(1)
    expect(JSON.parse(await readFile(dist))).toEqual(DATA)
  })
})

describe('clean', () => {
  const ROOT = path.resolve(__dirname, '../..')
  const relative = filepath => path.relative(ROOT, filepath)

  it('collects every provider output', () => {
    expect(dists().map(relative).sort()).toEqual([
      'data/analytics.json',
      'data/demo-links.json',
      'data/formats.json',
      'data/oss.json',
      'data/recipes.json',
      'data/skills-content',
      'data/skills-repo',
      'data/skills.json',
      'static/data/hero-demo',
      'static/user-agents.json'
    ])
  })

  it('never targets git-tracked data files', () => {
    const tracked = [
      'data/authors.yaml',
      'data/healthcheck.json',
      'data/git-timestamps-created.json',
      'data/git-timestamps-modified.json'
    ]
    const generated = dists().map(relative)
    tracked.forEach(filepath => expect(generated).not.toContain(filepath))
  })

  it('only targets paths inside data/ or static/', () => {
    dists().forEach(filepath => {
      const rel = relative(filepath)
      expect(rel.startsWith('data/') || rel.startsWith('static/')).toBe(true)
    })
  })
})
