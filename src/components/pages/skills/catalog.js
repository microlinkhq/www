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

const withSkills = (category, skills) => ({
  ...category,
  icon: CATEGORY_ICONS[category.id],
  skills
})

const skillsIn = id =>
  enrichedSkills.filter(skill => SKILL_CATEGORY[skill.slug] === id)

const uncategorizedSkills = enrichedSkills.filter(
  skill => !SKILL_CATEGORY[skill.slug]
)

export const groupedSkills = [
  ...SKILL_CATEGORIES.map(category =>
    withSkills(category, skillsIn(category.id))
  ),
  withSkills(UNCATEGORIZED_CATEGORY, uncategorizedSkills)
].filter(category => category.skills.length > 0)
