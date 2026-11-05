import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync,
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  utimesSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

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

const EPOCH = new Date(0)

const stampTree = directory => {
  for (const entry of readdirSync(directory)) {
    const target = path.join(directory, entry)
    if (lstatSync(target).isDirectory()) stampTree(target)
    utimesSync(target, EPOCH, EPOCH)
  }
}

const writeSkillArchive = ({ name, skillDir, entries, outputDir }) => {
  const filename = `${name}.tar.gz`
  const target = path.join(outputDir, filename)
  const staging = mkdtempSync(path.join(tmpdir(), 'agent-skill-'))
  try {
    const staged = path.join(staging, 'skill')
    mkdirSync(staged)
    for (const entry of entries) {
      cpSync(path.join(skillDir, entry), path.join(staged, entry), {
        recursive: true
      })
    }
    stampTree(staged)
    const archive = path.join(staging, 'archive.tar')
    execFileSync(
      'tar',
      ['--format', 'ustar', '-cf', archive, '-C', staged, '--', ...entries],
      { env: { ...process.env, COPYFILE_DISABLE: '1' } }
    )
    writeFileSync(target, gzipSync(readFileSync(archive), { mtime: 0 }))
  } finally {
    rmSync(staging, { recursive: true, force: true })
  }
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

export const publishAgentSkills = ({
  skillsPath,
  repoDir,
  outputDir,
  warn,
  info
}) => {
  if (!existsSync(skillsPath)) {
    warn('Skipped agent skills index: data/skills.json is missing')
    return null
  }
  const skills = JSON.parse(readFileSync(skillsPath, 'utf8'))
  const index = writeAgentSkills({ skills, repoDir, outputDir })
  info(
    `Generated agent skills index with ${index.skills.length}/${skills.length} skills`
  )
  return index
}
