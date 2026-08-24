import { createHash } from 'node:crypto'

const SITE_URL = 'https://microlink.io'

export const SKILLS_INDEX_SCHEMA =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

export const skillPathname = name =>
  `/.well-known/agent-skills/${name}/SKILL.md`

export const digestOf = contents =>
  `sha256:${createHash('sha256').update(contents).digest('hex')}`

export const buildSkillsIndex = skills => ({
  $schema: SKILLS_INDEX_SCHEMA,
  skills: skills.map(({ name, description, contents }) => ({
    name,
    type: 'skill-md',
    description,
    url: `${SITE_URL}${skillPathname(name)}`,
    digest: digestOf(contents)
  }))
})
