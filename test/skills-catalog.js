import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  SKILL_CATEGORIES,
  SKILL_CATEGORY,
  UNCATEGORIZED_CATEGORY
} from '../src/components/pages/skills/taxonomy.js'

const SKILLS_PATH = path.join(process.cwd(), 'data/skills.json')
const skills = fs.existsSync(SKILLS_PATH)
  ? JSON.parse(fs.readFileSync(SKILLS_PATH, 'utf8'))
  : null

const categoryIds = SKILL_CATEGORIES.map(category => category.id)
const slugs = (skills ?? []).map(skill => skill.slug)

describe('skills taxonomy is explicit', () => {
  test.skipIf(!skills)('every skill is assigned a category', () => {
    const unassigned = slugs.filter(slug => !SKILL_CATEGORY[slug])

    expect(
      unassigned,
      unassigned.length
        ? `\n\nThese skills would silently fall into "${
          UNCATEGORIZED_CATEGORY.title
        }":\n  ${unassigned.join(
          '\n  '
        )}\n\nAdd each one to SKILL_CATEGORY in src/components/pages/skills/taxonomy.js.\n`
        : undefined
    ).toEqual([])
  })

  test.skipIf(!skills)(
    'no assignment refers to a skill that no longer exists',
    () => {
      const stale = Object.keys(SKILL_CATEGORY).filter(
        slug => !slugs.includes(slug)
      )

      expect(stale).toEqual([])
    }
  )

  test('every assignment points at a real category', () => {
    const unknown = Object.entries(SKILL_CATEGORY)
      .filter(([, id]) => !categoryIds.includes(id))
      .map(([slug, id]) => `${slug} -> ${id}`)

    expect(unknown).toEqual([])
  })

  test('every category holds at least one skill', () => {
    const assigned = new Set(Object.values(SKILL_CATEGORY))
    const empty = categoryIds.filter(id => !assigned.has(id))

    expect(empty).toEqual([])
  })

  test('category ids and accents are unique', () => {
    expect(new Set(categoryIds).size).toBe(categoryIds.length)
    expect(categoryIds).not.toContain(UNCATEGORIZED_CATEGORY.id)
  })

  test('skills are filed by purpose, not by keyword collision', () => {
    expect(SKILL_CATEGORY['microlink-google']).toBe('apis')
    expect(SKILL_CATEGORY['microlink-api']).toBe('apis')
    expect(SKILL_CATEGORY['unavatar-api']).toBe('apis')
    expect(SKILL_CATEGORY.optimo).toBe('automation')
    expect(SKILL_CATEGORY.metascraper).toBe('automation')
    expect(SKILL_CATEGORY['use-pnpm']).toBe('infrastructure')
  })
})
