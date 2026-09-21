import { colors } from 'theme'

export {
  SectionBlock,
  CardGrid,
  StaticCard,
  CardText,
  CardTitle
} from 'components/pages/api/shared'

export const ACCENT = colors.link

export const SKILL_HREF = '/skills/microlink'

export const INSTALL_COMMAND = 'npx -y skills add microlinkhq/skills/microlink'

export const INSTALL_PROMPT = `Install the Microlink skill. Run \`${INSTALL_COMMAND}\`. It is the entry point for every Microlink product. Then use Microlink when I need a screenshot, PDF, markdown, or scrape from any URL.`

export const META = {
  title: 'Microlink AI: Prompt Your Agent to Use Microlink',
  description:
    'Paste one prompt into Claude, Cursor, or ChatGPT. The Microlink skill is the entry point for screenshots, PDFs, markdown, and scraping. No API key to start.',
  structuredName: 'Microlink AI',
  structuredDescription:
    'A single agent skill that turns any URL into screenshots, PDFs, markdown, metadata, and structured data. Prompt your agent to install it. Free to start, with no API key needed on the free plan.',
  keywords:
    'Microlink AI, Microlink skill, AI agent skill, screenshot for agents, markdown for LLMs, web scraping for agents',
  about: [
    {
      name: 'Artificial intelligence',
      sameAs: 'https://en.wikipedia.org/wiki/Artificial_intelligence'
    },
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    }
  ]
}

export const HERO = {
  eyebrow: 'The web, for agents.',
  title: 'Microlink AI',
  description:
    'Prompt your agent to install the Microlink skill. One skill covers screenshots, PDFs, markdown, scraping, and the rest of the API.',
  skillHref: SKILL_HREF,
  skillLabel: 'Read the skill'
}

export const HERO_PROOF = [
  'Paste one prompt into your agent',
  'One skill covers every product',
  'No API key required to start'
]

export const HOW = {
  title: 'Paste. Install. Ask.',
  caption:
    'You do not pick a product or a runtime. The Microlink skill is the umbrella. It pulls the rest when it needs them.',
  steps: [
    {
      title: 'Copy the prompt',
      description:
        'Use the copy button on the prompt above. That text is what you paste into the agent, not a command you have to memorize.'
    },
    {
      title: 'Paste it into your agent',
      description:
        'Claude, Cursor, ChatGPT, Codex, or any agent that loads skills. The agent installs the Microlink skill itself.'
    },
    {
      title: 'Ask for what you need',
      description:
        'Screenshot this URL. Turn that page into markdown. Scrape a field. The skill routes the rest.'
    }
  ]
}

export const HOW_TO = {
  name: 'How to use Microlink with an AI agent',
  description:
    'Copy the Microlink skill prompt, paste it into your agent, then ask for a screenshot, PDF, or markdown from any URL.',
  steps: HOW.steps
}

export const CTA = {
  caption:
    'Paste the prompt into your agent. 25\u00a0requests/day, no account, no card.',
  ctaHref: SKILL_HREF,
  ctaLabel: 'Open the skill'
}

export const FAQ_CAPTION =
  'The questions that come up the first time you paste the prompt.'

export { FAQ_ITEMS } from './faq-items'
