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
const SKILL_REPO_BLOB_URL = 'https://github.com/microlinkhq/skills/blob/master'

const SKILL_FRONTMATTER_DEFAULTS = {
  browserless: {
    website: 'https://browserless.js.org/',
    githubUrl: 'https://github.com/microlinkhq/browserless'
  },
  metascraper: {
    website: 'https://metascraper.js.org/',
    githubUrl: 'https://github.com/microlinkhq/metascraper'
  },
  keyvhq: {
    website: 'https://keyvhq.js.org/',
    githubUrl: 'https://github.com/microlinkhq/keyvhq'
  },
  'microlink-api': {
    website: 'https://microlink.io/docs/api/getting-started/overview'
  },
  optimo: {
    githubUrl: 'https://github.com/microlinkhq/optimo'
  },
  'html-get': {
    githubUrl: 'https://github.com/microlinkhq/html-get'
  },
  unavatar: {
    website: 'https://unavatar.io/',
    githubUrl: 'https://github.com/microlinkhq/unavatar'
  }
}

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n?/

const unquote = value => value.replace(/^['"]|['"]$/g, '')
const getSkillUrl = slug => `${SKILL_REPO_BLOB_URL}/${slug}/SKILL.md`

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

const createFrontmatter = ({
  title,
  description,
  website,
  githubUrl,
  skillUrl,
  date,
  modified
}) => {
  const values = [
    ['title', title],
    ['description', description],
    ['website', website],
    ['githubUrl', githubUrl],
    ['skillUrl', skillUrl],
    ['date', date],
    ['modified', modified]
  ].filter(([, value]) => value)

  return `---
${values.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}
---
`
}

const gitIn = (repoDir, ...args) => run('git', ['-C', repoDir, ...args])
const git = (...args) => gitIn(SKILLS_REPO_DIR, ...args)

const isShallowRepository = async () =>
  (await git('rev-parse', '--is-shallow-repository')).stdout.trim() === 'true'

const upsertSkillsRepository = async () => {
  if (existsSync(path.join(SKILLS_REPO_DIR, '.git'))) {
    if (await isShallowRepository()) await git('fetch', '--unshallow')
    await git('pull', '--ff-only')
    return
  }

  await mkdir(path.dirname(SKILLS_REPO_DIR), { recursive: true })
  await run('git', [
    'clone',
    '--filter=blob:none',
    SKILLS_REPO_URL,
    SKILLS_REPO_DIR
  ])
}

const toIsoDate = value => new Date(value).toISOString()

const getSkillDates = async (slug, repoDir = SKILLS_REPO_DIR) => {
  const { stdout } = await gitIn(
    repoDir,
    'log',
    '--format=%cI',
    '--',
    path.join(slug, 'SKILL.md')
  )
  const commitDates = stdout.split('\n').filter(Boolean)
  if (commitDates.length === 0) return {}
  return {
    date: toIsoDate(commitDates[commitDates.length - 1]),
    modified: toIsoDate(commitDates[0])
  }
}

const parseSkill = async slug => {
  const filepath = path.join(SKILLS_REPO_DIR, slug, 'SKILL.md')
  const source = await readFile(filepath, 'utf8')
  const { meta, body } = parseFrontmatter(source)
  const metadata = {
    ...SKILL_FRONTMATTER_DEFAULTS[slug],
    ...meta
  }

  const name = metadata.name || slug
  const description =
    metadata.description ||
    `Usage guide and implementation patterns for ${name}.`
  const githubUrl = metadata.githubUrl || metadata.github

  return {
    ...(await getSkillDates(slug)),
    slug,
    name,
    description,
    website: metadata.website,
    githubUrl,
    skillUrl: getSkillUrl(slug),
    markdown: body
  }
}

const getSkills = async () => {
  const entries = await readdir(SKILLS_REPO_DIR, { withFileTypes: true })

  const skills = await Promise.all(
    entries
      .filter(
        entry =>
          entry.isDirectory() &&
          !entry.name.startsWith('.') &&
          entry.name !== 'README.md'
      )
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
          description: skill.description,
          website: skill.website,
          githubUrl: skill.githubUrl,
          skillUrl: skill.skillUrl,
          date: skill.date,
          modified: skill.modified
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

module.exports.getSkillDates = getSkillDates
module.exports.dist = [SKILLS_DATA_PATH, SKILLS_CONTENT_DIR, SKILLS_REPO_DIR]
