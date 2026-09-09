export const SKILL_CATEGORIES = [
  {
    id: 'consuming',
    title: 'Consuming',
    description:
      'SDK, CLI, MCP, and HTTP APIs for Microlink products and avatar resolution.',
    accent: 'red'
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
  microlink: 'consuming',
  'microlink-mcp': 'consuming',
  'microlink-api': 'consuming',
  'unavatar-api': 'consuming',
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
