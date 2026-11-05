import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { gunzipSync } from 'node:zlib'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import {
  AGENT_SKILLS_SCHEMA,
  isValidSkillName,
  publishAgentSkills,
  writeAgentSkills
} from '../../../src/helpers/agent-skills.js'

const DIGEST = /^sha256:[0-9a-f]{64}$/

const sha256 = file =>
  `sha256:${createHash('sha256').update(fs.readFileSync(file)).digest('hex')}`

const writeFiles = (root, files) => {
  for (const [relative, content] of Object.entries(files)) {
    const file = path.join(root, relative)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, content)
  }
}

const artifactPath = (outputDir, url) =>
  path.join(outputDir, url.replace('/.well-known/agent-skills/', ''))

let tmp
let repoDir
let outputDir

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-skills-'))
  repoDir = path.join(tmp, 'repo')
  outputDir = path.join(tmp, 'public/.well-known/agent-skills')
  writeFiles(repoDir, {
    'single/SKILL.md': '---\nname: single\n---\n# Single\n',
    'bundle/SKILL.md': '---\nname: bundle\n---\nSee [ref](references/api.md)\n',
    'bundle/references/api.md': '# API\n',
    'bundle/.DS_Store': 'junk',
    'empty/README.md': 'no skill here',
    'Bad_Name/SKILL.md': '# bad'
  })
})

afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }))

const SKILLS = [
  { slug: 'single', name: 'single', description: 'One file.' },
  { slug: 'bundle', name: 'bundle', description: 'Has references.' },
  { slug: 'empty', name: 'empty', description: 'No SKILL.md.' },
  { slug: 'Bad_Name', name: 'Bad_Name', description: 'Invalid name.' },
  { slug: 'renamed', name: 'other', description: 'Name does not match dir.' }
]

describe('writeAgentSkills', () => {
  test('writes a v0.2.0 index with only publishable skills', () => {
    const index = writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    const onDisk = JSON.parse(
      fs.readFileSync(path.join(outputDir, 'index.json'), 'utf8')
    )
    expect(onDisk).toEqual(index)
    expect(index.$schema).toBe(AGENT_SKILLS_SCHEMA)
    expect(index.skills.map(skill => skill.name)).toEqual(['single', 'bundle'])
  })

  test('single-file skills are served as skill-md with the digest of the served bytes', () => {
    const { skills } = writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    const single = skills.find(skill => skill.name === 'single')
    expect(single).toEqual({
      name: 'single',
      type: 'skill-md',
      description: 'One file.',
      url: '/.well-known/agent-skills/single/SKILL.md',
      digest: sha256(path.join(repoDir, 'single/SKILL.md'))
    })
    expect(sha256(artifactPath(outputDir, single.url))).toBe(single.digest)
  })

  test('skills with supporting files are a root-level tar.gz without dotfiles', () => {
    const { skills } = writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    const bundle = skills.find(skill => skill.name === 'bundle')
    expect(bundle.type).toBe('archive')
    expect(bundle.url).toBe('/.well-known/agent-skills/bundle.tar.gz')
    const archive = artifactPath(outputDir, bundle.url)
    expect(sha256(archive)).toBe(bundle.digest)
    const entries = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .map(entry => entry.replace(/\/$/, ''))
    expect(entries).toContain('SKILL.md')
    expect(entries).toContain('references/api.md')
    expect(entries.some(entry => entry.includes('.DS_Store'))).toBe(false)
    expect(
      entries.some(entry => entry.startsWith('/') || entry.includes('..'))
    ).toBe(false)
  })

  test('rerunning clears artifacts of skills that disappeared', () => {
    writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    writeAgentSkills({ skills: SKILLS.slice(0, 1), repoDir, outputDir })
    expect(fs.existsSync(path.join(outputDir, 'bundle.tar.gz'))).toBe(false)
    expect(fs.readdirSync(outputDir).sort()).toEqual(['index.json', 'single'])
  })

  test('stamping archive mtimes does not follow symlinks', () => {
    const outside = path.join(tmp, 'outside.txt')
    fs.writeFileSync(outside, 'secret')
    const before = fs.statSync(outside).mtimeMs
    fs.symlinkSync(outside, path.join(repoDir, 'bundle/outside-link'))
    expect(() =>
      writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    ).toThrow(/escapes the skill directory/)
    expect(fs.statSync(outside).mtimeMs).toBe(before)
  })

  test('omits a skill whose directory is missing and still writes the index', () => {
    const index = writeAgentSkills({
      skills: [
        ...SKILLS,
        { slug: 'missing', name: 'missing', description: 'No directory.' }
      ],
      repoDir,
      outputDir
    })
    expect(index.skills.map(skill => skill.name)).toEqual(['single', 'bundle'])
    expect(fs.existsSync(path.join(outputDir, 'index.json'))).toBe(true)
  })

  test('keeps relative symlinks and drops nested dotfiles', () => {
    fs.symlinkSync('references/api.md', path.join(repoDir, 'bundle/link.md'))
    writeFiles(repoDir, {
      'bundle/references/.env': 'SECRET',
      'bundle/references/.hidden/note.md': 'hidden'
    })
    const { skills } = writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    const extracted = path.join(tmp, 'extracted')
    fs.mkdirSync(extracted)
    execFileSync('tar', [
      '-xzf',
      artifactPath(
        outputDir,
        skills.find(skill => skill.name === 'bundle').url
      ),
      '-C',
      extracted
    ])
    expect(fs.readlinkSync(path.join(extracted, 'link.md'))).toBe(
      'references/api.md'
    )
    expect(fs.existsSync(path.join(extracted, 'references/.env'))).toBe(false)
    expect(
      fs.existsSync(path.join(extracted, 'references/.hidden/note.md'))
    ).toBe(false)
  })

  test('rejects a relative symlink that leaves the skill directory', () => {
    fs.writeFileSync(path.join(repoDir, 'outside.txt'), 'secret')
    fs.symlinkSync('../outside.txt', path.join(repoDir, 'bundle/escape.md'))
    expect(() =>
      writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    ).toThrow(/escapes the skill directory/)
  })

  test('archive entry order is sorted and owners stay zero across file modes', () => {
    writeFiles(repoDir, {
      'ordered/SKILL.md': '---\nname: ordered\n---\n',
      'ordered/references/z.md': 'z\n',
      'ordered/references/a.md': 'a\n'
    })
    const skill = {
      slug: 'ordered',
      name: 'ordered',
      description: 'Ordered files.'
    }
    const publish = () =>
      writeAgentSkills({
        skills: [...SKILLS, skill],
        repoDir,
        outputDir
      }).skills.find(entry => entry.name === 'ordered')
    fs.chmodSync(path.join(repoDir, 'ordered/SKILL.md'), 0o600)
    fs.chmodSync(path.join(repoDir, 'ordered/references'), 0o700)
    const restrictive = publish()
    fs.chmodSync(path.join(repoDir, 'ordered/SKILL.md'), 0o644)
    fs.chmodSync(path.join(repoDir, 'ordered/references'), 0o755)
    const permissive = publish()
    expect(permissive.digest).toBe(restrictive.digest)
    const entries = execFileSync(
      'tar',
      ['-tzf', artifactPath(outputDir, permissive.url)],
      { encoding: 'utf8' }
    )
      .split('\n')
      .filter(Boolean)
    expect(entries).toEqual([...entries].sort())
    expect(entries).toContain('references/a.md')
    expect(entries).toContain('references/z.md')
    expect(entries.indexOf('references/a.md')).toBeLessThan(
      entries.indexOf('references/z.md')
    )
    const archive = gunzipSync(
      fs.readFileSync(artifactPath(outputDir, permissive.url))
    )
    let offset = 0
    while (offset + 512 <= archive.length) {
      const block = archive.subarray(offset, offset + 512)
      if (block.every(byte => byte === 0)) break
      const uid = Number.parseInt(
        block.subarray(108, 116).toString('ascii').replace(/\0/g, '').trim(),
        8
      )
      const gid = Number.parseInt(
        block.subarray(116, 124).toString('ascii').replace(/\0/g, '').trim(),
        8
      )
      expect(uid).toBe(0)
      expect(gid).toBe(0)
      expect(block.subarray(265, 329).every(byte => byte === 0)).toBe(true)
      const size = Number.parseInt(
        block.subarray(124, 136).toString('ascii').replace(/\0/g, '').trim() ||
          '0',
        8
      )
      offset += 512
      if (block[156] === 48 || block[156] === 0) {
        offset += Math.ceil(size / 512) * 512
      }
    }
  })

  test('archive bytes stay stable across copies made a second apart', async () => {
    const first = writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    await new Promise(resolve => setTimeout(resolve, 1100))
    const second = writeAgentSkills({ skills: SKILLS, repoDir, outputDir })
    expect(second.skills.find(skill => skill.name === 'bundle').digest).toBe(
      first.skills.find(skill => skill.name === 'bundle').digest
    )
  })

  test('archives a supporting file whose name tar would treat as an option', () => {
    writeFiles(repoDir, {
      'dashed/SKILL.md': '---\nname: dashed\n---\n',
      'dashed/--exclude=SKILL.md': 'kept\n'
    })
    const { skills } = writeAgentSkills({
      skills: [
        ...SKILLS,
        { slug: 'dashed', name: 'dashed', description: 'Dash name.' }
      ],
      repoDir,
      outputDir
    })
    const dashed = skills.find(skill => skill.name === 'dashed')
    const entries = execFileSync(
      'tar',
      ['-tzf', artifactPath(outputDir, dashed.url)],
      { encoding: 'utf8' }
    )
    expect(entries).toContain('SKILL.md')
    expect(entries).toContain('--exclude=SKILL.md')
  })
})

describe('publishAgentSkills', () => {
  test('warns and writes nothing when the skills file is missing', () => {
    const warn = vi.fn()
    const info = vi.fn()
    expect(
      publishAgentSkills({
        skillsPath: path.join(tmp, 'missing.json'),
        repoDir,
        outputDir,
        warn,
        info
      })
    ).toBeNull()
    expect(warn).toHaveBeenCalledWith(
      'Skipped agent skills index: data/skills.json is missing'
    )
    expect(info).not.toHaveBeenCalled()
    expect(fs.existsSync(outputDir)).toBe(false)
  })

  test('publishes the skills file it is given', () => {
    const skillsPath = path.join(tmp, 'skills.json')
    fs.writeFileSync(skillsPath, JSON.stringify(SKILLS.slice(0, 1)))
    const warn = vi.fn()
    const info = vi.fn()
    const index = publishAgentSkills({
      skillsPath,
      repoDir,
      outputDir,
      warn,
      info
    })
    expect(index.skills.map(skill => skill.name)).toEqual(['single'])
    expect(warn).not.toHaveBeenCalled()
    expect(info).toHaveBeenCalledWith(
      'Generated agent skills index with 1/1 skills'
    )
    expect(fs.existsSync(path.join(outputDir, 'index.json'))).toBe(true)
  })

  test('the production build publishes through this helper', () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'gatsby-node.js'),
      'utf8'
    )
    expect(source).toContain('publishAgentSkills(')
  })
})

describe('isValidSkillName', () => {
  test.each(['a', 'a'.repeat(64), 'use-pnpm', 'k8s-hpa-cost-tuning'])(
    'accepts %s',
    name => {
      expect(isValidSkillName(name)).toBe(true)
    }
  )

  test.each(['', '-a', 'a-', 'a--b', 'A', 'a_b', 'a'.repeat(65), undefined])(
    'rejects %j',
    name => {
      expect(isValidSkillName(name)).toBe(false)
    }
  )
})

const SKILLS_DATA = path.join(process.cwd(), 'data/skills.json')
const SKILLS_REPO = path.join(process.cwd(), 'data/skills-repo')
const hasRealSkills = fs.existsSync(SKILLS_DATA) && fs.existsSync(SKILLS_REPO)

describe('real microlinkhq/skills checkout', () => {
  test.skipIf(!hasRealSkills)('publishes every skill listed on /skills', () => {
    const skills = JSON.parse(fs.readFileSync(SKILLS_DATA, 'utf8'))
    const index = writeAgentSkills({ skills, repoDir: SKILLS_REPO, outputDir })
    expect(index.skills.map(skill => skill.name)).toEqual(
      skills.map(skill => skill.name)
    )
    for (const skill of index.skills) {
      expect(skill.digest).toMatch(DIGEST)
      expect(skill.description.length).toBeGreaterThan(0)
      expect(skill.description.length).toBeLessThanOrEqual(1024)
      expect(sha256(artifactPath(outputDir, skill.url))).toBe(skill.digest)
    }
  })
})
