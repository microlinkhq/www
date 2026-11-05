import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import path from 'node:path'

export const AGENT_SKILLS_SCHEMA =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

export const AGENT_SKILLS_PATHNAME = '/.well-known/agent-skills'

const SKILL_FILE = 'SKILL.md'

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const MAX_SKILL_NAME_LENGTH = 64

export const isValidSkillName = name =>
  typeof name === 'string' &&
  name.length <= MAX_SKILL_NAME_LENGTH &&
  SKILL_NAME.test(name)

export const sha256Digest = buffer =>
  `sha256:${createHash('sha256').update(buffer).digest('hex')}`

export const buildAgentSkillsIndex = skills => ({
  $schema: AGENT_SKILLS_SCHEMA,
  skills: skills.map(({ name, type, description, url, digest }) => ({
    name,
    type,
    description,
    url,
    digest
  }))
})

const listSkillEntries = skillDir =>
  readdirSync(skillDir)
    .filter(entry => !entry.startsWith('.'))
    .sort()

const writeSkillMd = ({ name, skillDir, outputDir }) => {
  const targetDir = path.join(outputDir, name)
  mkdirSync(targetDir, { recursive: true })
  const target = path.join(targetDir, SKILL_FILE)
  copyFileSync(path.join(skillDir, SKILL_FILE), target)
  return {
    type: 'skill-md',
    url: `${AGENT_SKILLS_PATHNAME}/${name}/${SKILL_FILE}`,
    digest: sha256Digest(readFileSync(target))
  }
}

const writeSkillArchive = ({ name, skillDir, entries, outputDir }) => {
  const filename = `${name}.tar.gz`
  const target = path.join(outputDir, filename)
  execFileSync('tar', ['-czf', target, '-C', skillDir, ...entries], {
    env: { ...process.env, COPYFILE_DISABLE: '1' }
  })
  return {
    type: 'archive',
    url: `${AGENT_SKILLS_PATHNAME}/${filename}`,
    digest: sha256Digest(readFileSync(target))
  }
}

const writeSkillArtifact = ({ name, skillDir, outputDir }) => {
  const entries = listSkillEntries(skillDir)
  if (!entries.includes(SKILL_FILE)) return null
  return entries.length === 1
    ? writeSkillMd({ name, skillDir, outputDir })
    : writeSkillArchive({ name, skillDir, entries, outputDir })
}

export const writeAgentSkills = ({ skills, repoDir, outputDir }) => {
  rmSync(outputDir, { recursive: true, force: true })
  mkdirSync(outputDir, { recursive: true })

  const published = skills
    .filter(({ slug, name }) => slug === name && isValidSkillName(name))
    .map(({ slug, name, description }) => {
      const artifact = writeSkillArtifact({
        name,
        skillDir: path.join(repoDir, slug),
        outputDir
      })
      return artifact && { name, description, ...artifact }
    })
    .filter(Boolean)

  const index = buildAgentSkillsIndex(published)
  writeFileSync(
    path.join(outputDir, 'index.json'),
    `${JSON.stringify(index, null, 2)}\n`
  )
  return index
}
