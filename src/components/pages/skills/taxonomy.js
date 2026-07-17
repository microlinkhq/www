export const accentBand = accent => `${accent}0`
export const accentTile = accent => `${accent}1`
export const accentBorder = accent => `${accent}2`
export const accentBorderHover = accent => `${accent}3`
export const accentIcon = accent => `${accent}8`
export const accentText = accent => `${accent}9`

export const SKILL_CATEGORIES = [
  {
    id: 'apis',
    title: 'APIs',
    description:
      'Hosted endpoints for URL metadata, structured data, and avatar resolution.',
    accent: 'teal'
  },
  {
    id: 'automation',
    title: 'Automation',
    description:
      'Browser control, HTML retrieval, metadata parsing, caching, and media pipelines.',
    accent: 'blue'
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description:
      'Kubernetes scaling, Node.js performance tuning, and package workflows.',
    accent: 'violet'
  },
  {
    id: 'agent',
    title: 'Agent',
    description: 'Authoring, installing, and running reusable agent skills.',
    accent: 'indigo'
  }
]

export const UNCATEGORIZED_CATEGORY = {
  id: 'other-skills',
  title: 'Other Skills',
  description: 'Additional skills for specialized workflows.',
  accent: 'gray'
}

export const SKILL_CATEGORY = {
  'microlink-api': 'apis',
  'microlink-google': 'apis',
  'unavatar-api': 'apis',
  browserless: 'automation',
  'html-get': 'automation',
  metascraper: 'automation',
  keyvhq: 'automation',
  optimo: 'automation',
  'k8s-hpa-cost-tuning': 'infrastructure',
  'nodejs-performance': 'infrastructure',
  'use-pnpm': 'infrastructure',
  'create-local-skill': 'agent',
  'run-skill': 'agent'
}
