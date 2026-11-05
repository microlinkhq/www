import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync,
  cpSync,
  existsSync,
  lstatSync,
  lutimesSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  readlinkSync,
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

const HEADER_BYTES = 512

const isHiddenName = name => path.basename(name).startsWith('.')

const stampTree = directory => {
  for (const entry of readdirSync(directory)) {
    const target = path.join(directory, entry)
    const stat = lstatSync(target)
    if (stat.isSymbolicLink()) {
      lutimesSync(target, EPOCH, EPOCH)
      continue
    }
    if (stat.isDirectory()) stampTree(target)
    utimesSync(target, EPOCH, EPOCH)
  }
}

const linkStaysInside = (root, linkPath) => {
  const link = readlinkSync(linkPath)
  if (path.isAbsolute(link)) return false
  const resolved = path.resolve(path.dirname(linkPath), link)
  const base = path.resolve(root)
  return resolved === base || resolved.startsWith(`${base}${path.sep}`)
}

const assertContainedSymlinks = root => {
  const walk = current => {
    for (const entry of readdirSync(current)) {
      const target = path.join(current, entry)
      const stat = lstatSync(target)
      if (stat.isSymbolicLink()) {
        if (!linkStaysInside(root, target)) {
          throw new Error(
            `Skill symlink escapes the skill directory: ${path.relative(
              root,
              target
            )}`
          )
        }
        continue
      }
      if (stat.isDirectory()) walk(target)
    }
  }
  walk(root)
}

const listArchivePaths = directory => {
  const paths = []
  const walk = current => {
    for (const entry of readdirSync(current)) {
      if (entry.startsWith('.')) continue
      const target = path.join(current, entry)
      paths.push(path.relative(directory, target))
      if (lstatSync(target).isDirectory()) walk(target)
    }
  }
  walk(directory)
  return paths.sort()
}

const readOctal = (block, offset, length) => {
  const text = block
    .subarray(offset, offset + length)
    .toString('ascii')
    .split('\0', 1)[0]
    .trim()
  return text ? Number.parseInt(text, 8) : 0
}

const writeOctal = (block, offset, value, length) => {
  block.write(value.toString(8).padStart(length - 1, '0'), offset, 'ascii')
  block[offset + length - 1] = 0
}

const normalizeUstar = buffer => {
  const parts = []
  let offset = 0
  while (offset + HEADER_BYTES <= buffer.length) {
    const block = buffer.subarray(offset, offset + HEADER_BYTES)
    if (block.every(byte => byte === 0)) break
    const header = Buffer.from(block)
    const type = header[156]
    const size = readOctal(header, 124, 12)
    const mode = type === 53 ? 0o755 : type === 50 ? 0o777 : 0o644
    if (type === 53) {
      const name = header.subarray(0, 100).toString('utf8').replace(/\0.*/, '')
      if (name && !name.endsWith('/')) {
        header.fill(0, 0, 100)
        header.write(`${name}/`, 0, 'utf8')
      }
    }
    writeOctal(header, 100, mode, 8)
    writeOctal(header, 108, 0, 8)
    writeOctal(header, 116, 0, 8)
    writeOctal(header, 124, size, 12)
    writeOctal(header, 136, 0, 12)
    header.fill(0x20, 148, 156)
    header.fill(0, 265, 345)
    const prefixBlank = header
      .subarray(345, 500)
      .every(byte => byte === 0 || byte === 0x20)
    if (prefixBlank) header.fill(0, 345, 500)
    header.write('ustar', 257, 'ascii')
    header[262] = 0
    header[263] = 48
    header[264] = 48
    let sum = 0
    for (const byte of header) sum += byte
    header.write(sum.toString(8).padStart(6, '0'), 148, 'ascii')
    header[154] = 0
    header[155] = 0x20
    parts.push(header)
    offset += HEADER_BYTES
    if (type === 48 || type === 0) {
      const bytes = Math.ceil(size / HEADER_BYTES) * HEADER_BYTES
      parts.push(Buffer.from(buffer.subarray(offset, offset + bytes)))
      offset += bytes
    }
  }
  parts.push(Buffer.alloc(HEADER_BYTES * 2))
  return Buffer.concat(parts)
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
        recursive: true,
        verbatimSymlinks: true,
        filter: source => !isHiddenName(source)
      })
    }
    stampTree(staged)
    assertContainedSymlinks(staged)
    const archive = path.join(staging, 'archive.tar')
    execFileSync(
      'tar',
      [
        '--format',
        'ustar',
        '--no-recursion',
        '-cf',
        archive,
        '-C',
        staged,
        '--',
        ...listArchivePaths(staged)
      ],
      { env: { ...process.env, COPYFILE_DISABLE: '1' } }
    )
    writeFileSync(
      target,
      gzipSync(normalizeUstar(readFileSync(archive)), { mtime: 0 })
    )
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
  if (!existsSync(skillDir)) return null
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
