import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, describe, expect, test } from 'vitest'
import provider from '../../../scripts/fetch-data/providers/fetch-skills.js'

const { createFrontmatter, getSkillDates, getSkills, upsertSkillsRepository } =
  provider

const roots = []
const remember = dir => {
  roots.push(dir)
  return dir
}

afterAll(() => {
  for (const root of roots) rmSync(root, { recursive: true, force: true })
})

const git = (repoDir, args, env = {}) =>
  execFileSync('git', ['-C', repoDir, ...args], {
    env: { ...process.env, ...env }
  })

const fileUrl = dir => `file://${dir}`

const commitAll = (repoDir, message, date) => {
  git(repoDir, ['add', '-A'])
  git(
    repoDir,
    [
      '-c',
      'user.name=test',
      '-c',
      'user.email=test@test',
      'commit',
      '-q',
      '-m',
      message
    ],
    { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date }
  )
}

const createOrigin = () => {
  const repoDir = remember(mkdtempSync(path.join(tmpdir(), 'skills-origin-')))
  git(repoDir, ['init', '-q', '-b', 'master'])
  return repoDir
}

const addSkill = (repoDir, slug, body, date) => {
  mkdirSync(path.join(repoDir, slug), { recursive: true })
  writeFileSync(path.join(repoDir, slug, 'SKILL.md'), body)
  commitAll(repoDir, slug, date)
}

const FIRST = '2026-02-11T00:09:03+01:00'
const SECOND = '2026-05-26T15:26:42+02:00'
const FIRST_ISO = '2026-02-10T23:09:03.000Z'
const SECOND_ISO = '2026-05-26T13:26:42.000Z'

const createSkillsRepo = commits => {
  const repoDir = createOrigin()
  for (const { slug, body, date } of commits) { addSkill(repoDir, slug, body, date) }
  return repoDir
}

const renameSkill = (repoDir, from, to, date) => {
  mkdirSync(path.join(repoDir, to))
  git(repoDir, ['mv', path.join(from, 'SKILL.md'), path.join(to, 'SKILL.md')])
  commitAll(repoDir, 'rename', date)
}

const isShallow = repoDir =>
  git(repoDir, ['rev-parse', '--is-shallow-repository']).toString().trim() ===
  'true'

const cloneDestination = () =>
  path.join(remember(mkdtempSync(path.join(tmpdir(), 'skills-clone-'))), 'repo')

describe('getSkillDates', () => {
  const repoDir = createSkillsRepo([
    { slug: 'optimo', body: 'v1', date: FIRST },
    { slug: 'optimo', body: 'v2', date: SECOND },
    { slug: 'difftool', body: 'v1', date: '2026-10-27T17:38:42+01:00' }
  ])

  test('dates a skill by the first and last commit touching its SKILL.md', async () => {
    expect(await getSkillDates('optimo', repoDir)).toEqual({
      date: FIRST_ISO,
      modified: SECOND_ISO
    })
  })

  test('ignores commits to other skills', async () => {
    expect(await getSkillDates('difftool', repoDir)).toEqual({
      date: '2026-10-27T16:38:42.000Z',
      modified: '2026-10-27T16:38:42.000Z'
    })
  })

  test('returns no dates for a skill without history', async () => {
    expect(await getSkillDates('missing', repoDir)).toEqual({})
  })

  test('is independent of when the build runs', async () => {
    const first = await getSkillDates('optimo', repoDir)
    const second = await getSkillDates('optimo', repoDir)
    expect(second).toEqual(first)
    expect(new Date(first.modified).getTime()).toBeLessThan(Date.now() - 1000)
  })

  test('follows a renamed skill file back to its first commit', async () => {
    const repoDir = createOrigin()
    addSkill(repoDir, 'oldname', 'same body\n', FIRST)
    renameSkill(repoDir, 'oldname', 'optimo', SECOND)

    expect(await getSkillDates('optimo', repoDir)).toEqual({
      date: FIRST_ISO,
      modified: SECOND_ISO
    })
  })
})

describe('createFrontmatter', () => {
  test('writes the history dates and omits them when absent', () => {
    const dated = createFrontmatter({
      title: 'Optimo',
      description: 'Usage',
      date: FIRST_ISO,
      modified: SECOND_ISO
    })
    expect(dated).toContain(`date: ${JSON.stringify(FIRST_ISO)}`)
    expect(dated).toContain(`modified: ${JSON.stringify(SECOND_ISO)}`)

    const undated = createFrontmatter({
      title: 'Optimo',
      description: 'Usage'
    })
    expect(undated).not.toContain('date:')
    expect(undated).not.toContain('modified:')
  })
})

describe('getSkills', () => {
  test('skips a directory with no SKILL.md', async () => {
    const repoDir = createOrigin()
    addSkill(repoDir, 'optimo', 'v1', FIRST)
    mkdirSync(path.join(repoDir, 'notes'))

    const skills = await getSkills(repoDir)
    expect(skills).toEqual([
      expect.objectContaining({
        slug: 'optimo',
        date: FIRST_ISO,
        modified: FIRST_ISO
      })
    ])
  })

  test('fails the fetch when a skill date lookup fails', async () => {
    const repoDir = remember(mkdtempSync(path.join(tmpdir(), 'skills-repo-')))
    mkdirSync(path.join(repoDir, 'optimo'))
    writeFileSync(path.join(repoDir, 'optimo', 'SKILL.md'), 'hello')

    await expect(getSkills(repoDir)).rejects.toThrow(/not a git repository/)
  })

  test('does not treat a missing git binary as a missing skill', async () => {
    const repoDir = createOrigin()
    addSkill(repoDir, 'optimo', 'v1', FIRST)
    const pathEnv = process.env.PATH
    process.env.PATH = ''
    try {
      await expect(getSkills(repoDir)).rejects.toThrow()
    } finally {
      process.env.PATH = pathEnv
    }
  })
})

describe('upsertSkillsRepository', () => {
  test('clones a full blobless history, including renames', async () => {
    const origin = createOrigin()
    addSkill(origin, 'oldname', 'same body\n', FIRST)
    renameSkill(origin, 'oldname', 'optimo', SECOND)
    const repoDir = cloneDestination()

    await upsertSkillsRepository(repoDir, fileUrl(origin))

    expect(
      git(repoDir, ['config', '--get', 'remote.origin.partialclonefilter'])
        .toString()
        .trim()
    ).toBe('blob:none')
    expect(isShallow(repoDir)).toBe(false)
    expect(await getSkillDates('optimo', repoDir)).toEqual({
      date: FIRST_ISO,
      modified: SECOND_ISO
    })
  })

  test('fast-forwards an existing clone without unshallowing it', async () => {
    const origin = createOrigin()
    addSkill(origin, 'optimo', 'v1', FIRST)
    const repoDir = cloneDestination()
    await upsertSkillsRepository(repoDir, fileUrl(origin))
    addSkill(origin, 'optimo', 'v2', SECOND)

    await upsertSkillsRepository(repoDir, fileUrl(origin))

    expect(await getSkillDates('optimo', repoDir)).toEqual({
      date: FIRST_ISO,
      modified: SECOND_ISO
    })
  })

  test('unshallows a cached shallow clone before reading history', async () => {
    const origin = createOrigin()
    addSkill(origin, 'optimo', 'v1', FIRST)
    addSkill(origin, 'optimo', 'v2', SECOND)
    const repoDir = remember(
      mkdtempSync(path.join(tmpdir(), 'skills-shallow-'))
    )
    execFileSync('git', [
      'clone',
      '-q',
      '--depth',
      '1',
      fileUrl(origin),
      repoDir
    ])
    expect(isShallow(repoDir)).toBe(true)

    await upsertSkillsRepository(repoDir, fileUrl(origin))

    expect(isShallow(repoDir)).toBe(false)
    expect(await getSkillDates('optimo', repoDir)).toEqual({
      date: FIRST_ISO,
      modified: SECOND_ISO
    })
  })
})
