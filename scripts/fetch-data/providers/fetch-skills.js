'use strict'

const { execFile } = require('node:child_process')
const { existsSync } = require('node:fs')
const { mkdir, readdir, readFile, rm, writeFile } = require('node:fs/promises')
const path = require('node:path')
const { promisify } = require('node:util')
const jsonFuture = require('json-future')

const run = promisify(execFile)

const SKILLS_REPO_URL = 'https://github.com/microlinkhq/skills.git'
const SKILLS_REPO_DIR = path.resolve(__dirname, '../../../data/skills-repo')
const SKILLS_CONTENT_DIR = path.resolve(
  __dirname,
  '../../../data/skills-content'
)
const SKILLS_DATA_PATH = path.resolve(__dirname, '../../../data/skills.json')

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n?/

const unquote = value => value.replace(/^['"]|['"]$/g, '')

const parseFrontmatter = input => {
  const match = input.match(FRONTMATTER_REGEX)

  if (!match) {
    return {
      meta: {},
      body: input.trim()
    }
  }

  const meta = match[1]
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .reduce((acc, line) => {
      const splitIndex = line.indexOf(':')
      if (splitIndex === -1) return acc

      const key = line.slice(0, splitIndex).trim()
      const value = line.slice(splitIndex + 1).trim()

      acc[key] = unquote(value)
      return acc
    }, {})

  return {
    meta,
    body: input.slice(match[0].length).trim()
  }
}

const createFrontmatter = ({ title, description }) => `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
---
`

const upsertSkillsRepository = async () => {
  if (existsSync(path.join(SKILLS_REPO_DIR, '.git'))) {
    await run('git', ['-C', SKILLS_REPO_DIR, 'pull', '--ff-only'])
    return
  }

  await mkdir(path.dirname(SKILLS_REPO_DIR), { recursive: true })
  await run('git', ['clone', '--depth', '1', SKILLS_REPO_URL, SKILLS_REPO_DIR])
}

const parseSkill = async slug => {
  const filepath = path.join(SKILLS_REPO_DIR, slug, 'SKILL.md')
  const source = await readFile(filepath, 'utf8')
  const { meta, body } = parseFrontmatter(source)

  const name = meta.name || slug
  const description =
    meta.description || `Usage guide and implementation patterns for ${name}.`

  return {
    slug,
    name,
    description,
    githubUrl: `https://github.com/microlinkhq/skills/blob/master/${slug}/SKILL.md`,
    markdown: body
  }
}

const getSkills = async () => {
  const entries = await readdir(SKILLS_REPO_DIR, { withFileTypes: true })

  const skills = await Promise.all(
    entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .map(async slug => {
        try {
          return await parseSkill(slug)
        } catch (_) {
          return null
        }
      })
  )

  return skills
    .filter(Boolean)
    .sort((left, right) => left.name.localeCompare(right.name))
}

const writeSkillPages = async skills => {
  await mkdir(SKILLS_CONTENT_DIR, { recursive: true })

  const existingFiles = await readdir(SKILLS_CONTENT_DIR)
  const nextFiles = new Set()

  await Promise.all(
    skills.map(async skill => {
      const filename = `${skill.slug}.md`
      nextFiles.add(filename)

      const content = [
        createFrontmatter({
          title: skill.name,
          description: skill.description
        }),
        skill.markdown,
        ''
      ].join('\n')

      await writeFile(path.join(SKILLS_CONTENT_DIR, filename), content)
    })
  )

  await Promise.all(
    existingFiles
      .filter(filename => filename.endsWith('.md') && !nextFiles.has(filename))
      .map(filename => rm(path.join(SKILLS_CONTENT_DIR, filename)))
  )
}

module.exports = async () => {
  await upsertSkillsRepository()

  const skills = await getSkills()

  await writeSkillPages(skills)

  await jsonFuture.saveAsync(
    SKILLS_DATA_PATH,
    skills.map(({ markdown, ...skill }) => skill)
  )

  return skills
}
