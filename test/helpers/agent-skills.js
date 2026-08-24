import { describe, expect, test } from 'vitest'

import {
  SKILLS_INDEX_SCHEMA,
  buildSkillsIndex,
  digestOf,
  skillPathname
} from '../../src/helpers/agent-skills.js'

const SKILL = {
  name: 'microlink-api',
  description: 'Use the Microlink API to turn any URL into data.',
  contents: '---\nname: microlink-api\n---\n\nBody.\n'
}

describe('the agent skills index', () => {
  const index = buildSkillsIndex([SKILL])
  const [entry] = index.skills

  test('declares the discovery schema tools verify against', () => {
    expect(index.$schema).toBe(SKILLS_INDEX_SCHEMA)
  })

  test('types every entry and points it at a served SKILL.md', () => {
    expect(entry.name).toBe('microlink-api')
    expect(entry.type).toBe('skill-md')
    expect(entry.description).toBe(SKILL.description)
    expect(entry.url).toBe(
      `https://microlink.io${skillPathname('microlink-api')}`
    )
  })

  test('digests the exact bytes it publishes', () => {
    expect(entry.digest).toBe(
      'sha256:29095d62ef2de62e85c4cdfbc00be9f820671161b8ca687af2fd089b52b59c07'
    )
    expect(entry.digest).toMatch(/^sha256:[0-9a-f]{64}$/)
    expect(digestOf(SKILL.contents)).toBe(entry.digest)
    expect(digestOf(`${SKILL.contents} `)).not.toBe(entry.digest)
  })
})
