import {
  Activity,
  Code,
  Globe,
  Grid,
  Layers,
  Link,
  Monitor,
  Package,
  Play,
  Search,
  Terminal,
  UploadCloud,
  Zap
} from 'react-feather'
import { siGoogle, siKubernetes } from 'simple-icons'
import React from 'react'

import { Sparkles } from 'components/icons/Sparkles'
import Svg from 'components/elements/Svg'
import { enrichedSkills } from 'helpers/skills'

import {
  SKILL_CATEGORIES,
  SKILL_CATEGORY,
  UNCATEGORIZED_CATEGORY
} from './taxonomy'

const brandIcon = icon => {
  const BrandIcon = ({ color, ...props }) => (
    <Svg viewBox='0 0 24 24' fill={color || 'currentColor'} {...props}>
      <path d={icon.path} />
    </Svg>
  )

  return BrandIcon
}

const Kubernetes = brandIcon(siKubernetes)
const Google = brandIcon(siGoogle)

const CATEGORY_ICONS = {
  apis: Code,
  automation: Globe,
  infrastructure: Layers,
  agent: Terminal,
  'other-skills': Grid
}

const SKILL_ICONS = {
  browserless: Monitor,
  'create-local-skill': Terminal,
  'html-get': Code,
  'k8s-hpa-cost-tuning': Kubernetes,
  keyvhq: Zap,
  metascraper: Search,
  'microlink-api': Link,
  'microlink-google': Google,
  'nodejs-performance': Activity,
  optimo: Sparkles,
  'run-skill': Play,
  'unavatar-api': UploadCloud,
  'use-pnpm': Package
}

export const getSkillIcon = (slug, fallback) => SKILL_ICONS[slug] || fallback

const withIcon = category => ({
  ...category,
  icon: CATEGORY_ICONS[category.id],
  skills: []
})

export const groupedSkills = (() => {
  const groups = SKILL_CATEGORIES.map(withIcon)
  const byId = new Map(groups.map(category => [category.id, category]))
  const uncategorized = []

  enrichedSkills.forEach(skill => {
    const group = byId.get(SKILL_CATEGORY[skill.slug])

    if (group) {
      group.skills.push(skill)
      return
    }

    uncategorized.push(skill)
  })

  const nonEmptyGroups = groups.filter(category => category.skills.length > 0)

  if (uncategorized.length > 0) {
    nonEmptyGroups.push({
      ...withIcon(UNCATEGORIZED_CATEGORY),
      skills: uncategorized
    })
  }

  return nonEmptyGroups
})()
