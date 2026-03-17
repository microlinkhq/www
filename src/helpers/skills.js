import skills from '../../data/skills.json'

export const SKILLS_PAGE_URL = 'https://microlink.io/skills'
export const SKILLS_REPO_URL = 'https://github.com/microlinkhq/skills'

const FRONTMATTER_REGEX = /^---\n[\s\S]*?\n---\n?/i
const STOP_WORDS = new Set([
  'agent',
  'agents',
  'automation',
  'automations',
  'built',
  'common',
  'for',
  'from',
  'guide',
  'implementation',
  'reusable',
  'skill',
  'skills',
  'the',
  'this',
  'that',
  'their',
  'these',
  'use',
  'user',
  'users',
  'using',
  'when',
  'with',
  'workflow',
  'workflows'
])

export const stripFrontmatter = value =>
  (value || '').replace(FRONTMATTER_REGEX, '')

export const getBaseDescription = value =>
  value ? value.split(/\s+Use when\s+/i)[0].trim() : undefined

export const getUseWhenText = value => {
  if (!value) return ''
  const parts = value.split(/\s+Use when\s+/i)
  return parts[1] ? parts[1].trim() : ''
}

const normalizeIntent = value =>
  value
    .replace(/^the user (mentions|asks for)\s+/i, '')
    .replace(/^mentions?\s+/i, '')
    .replace(/^asks for\s+/i, '')
    .replace(/^users?\s+ask(?:s)?\s+to\s+/i, '')
    .replace(/^ask(?:s)?\s+to\s+/i, '')
    .replace(/^users?\s+need(?:s)?\s+to\s+/i, '')
    .replace(/^users?\s+want(?:s)?\s+to\s+/i, '')
    .replace(/^need(?:s)?\s+to\s+/i, '')
    .replace(/^to\s+/i, '')
    .replace(/^(and|or)\s+/i, '')
    .replace(/^then\s+/i, '')
    .replace(/\.$/, '')
    .trim()

const splitTopLevelComma = value => {
  const items = []
  let current = ''
  let depthRound = 0
  let depthSquare = 0

  for (const char of value) {
    if (char === '(') depthRound += 1
    if (char === ')' && depthRound > 0) depthRound -= 1
    if (char === '[') depthSquare += 1
    if (char === ']' && depthSquare > 0) depthSquare -= 1

    if (char === ',' && depthRound === 0 && depthSquare === 0) {
      items.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  const tail = current.trim()
  if (tail) items.push(tail)

  return items
}

export const getTriggerPhrases = value => {
  const useWhen = getUseWhenText(value)
  if (!useWhen) return []

  return splitTopLevelComma(useWhen)
    .map(normalizeIntent)
    .filter(Boolean)
    .slice(0, 6)
}

export const getBestFor = value => {
  const intents = getTriggerPhrases(value).slice(0, 2)
  if (intents.length === 0) return undefined
  const sentence =
    intents.length === 1 ? intents[0] : `${intents[0]} or ${intents[1]}`
  return sentence.endsWith('.') ? sentence : `${sentence}.`
}

export const enrichedSkills = skills
  .map(skill => ({
    ...skill,
    summary: getBaseDescription(skill.description) || skill.description,
    bestFor: getBestFor(skill.description)
  }))
  .sort((left, right) => left.name.localeCompare(right.name))

const tokenize = value =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .map(token => token.trim())
    .filter(token => token.length > 2 && !STOP_WORDS.has(token))

const scoreOverlap = (left, right) => {
  if (!left.length || !right.length) return 0
  const rightSet = new Set(right)
  return left.reduce(
    (count, token) => (rightSet.has(token) ? count + 1 : count),
    0
  )
}

export const relatedSkillIndex = enrichedSkills.map(skill => ({
  ...skill,
  tokens: tokenize(`${skill.name} ${skill.slug} ${skill.summary || ''}`)
}))

export const getRelatedSkills = ({ skillSlug, description, limit = 3 }) => {
  const targetTokens = tokenize(`${skillSlug || ''} ${description || ''}`)

  const byScore = relatedSkillIndex
    .filter(skill => skill.slug !== skillSlug)
    .map(skill => ({
      ...skill,
      score: scoreOverlap(targetTokens, skill.tokens)
    }))
    .filter(skill => skill.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)

  if (byScore.length > 0) return byScore

  return relatedSkillIndex
    .filter(skill => skill.slug !== skillSlug)
    .slice(0, limit)
}
