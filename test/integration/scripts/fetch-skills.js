import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import provider from '../../../scripts/fetch-data/providers/fetch-skills.js'

const { getSkillDates } = provider

const createSkillsRepo = commits => {
  const repoDir = mkdtempSync(path.join(tmpdir(), 'skills-repo-'))
  const git = (args, env = {}) =>
    execFileSync('git', ['-C', repoDir, ...args], {
      env: { ...process.env, ...env }
    })
  git(['init', '-q'])
  for (const { slug, body, date } of commits) {
    mkdirSync(path.join(repoDir, slug), { recursive: true })
    writeFileSync(path.join(repoDir, slug, 'SKILL.md'), body)
    git(['add', '.'])
    git(
      [
        '-c',
        'user.name=test',
        '-c',
        'user.email=test@test',
        'commit',
        '-q',
        '-m',
        `${slug}: ${body}`
      ],
      { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date }
    )
  }
  return repoDir
}

describe('getSkillDates', () => {
  const repoDir = createSkillsRepo([
    { slug: 'optimo', body: 'v1', date: '2026-02-11T00:09:03+01:00' },
    { slug: 'optimo', body: 'v2', date: '2026-05-26T15:26:42+02:00' },
    { slug: 'difftool', body: 'v1', date: '2026-10-27T17:38:42+01:00' }
  ])

  test('dates a skill by the first and last commit touching its SKILL.md', async () => {
    expect(await getSkillDates('optimo', repoDir)).toEqual({
      date: '2026-02-10T23:09:03.000Z',
      modified: '2026-05-26T13:26:42.000Z'
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
})
