import { expect, describe, it } from 'vitest'

import { buildUserAgents } from '../../scripts/build-user-agents'

describe('buildUserAgents', () => {
  it('crawler should not include well known AI agents', async () => {
    const { crawler } = await buildUserAgents()

    const wellKnownAIAgents = [
      'ChatGPT',
      'Claude',
      'Gemini',
      'Bard',
      'MistralAI',
      'Perplexity',
      'Cohere',
      'Anthropic',
      'Mixtral',
      'OpenAI',
      'Llama',
      'Meta-LLM'
    ]

    for (const agentName of wellKnownAIAgents) {
      expect(
        crawler.some(agent => {
          const test = !agent.toLowerCase().includes(agentName.toLowerCase())
          if (!test) console.log(`Failed ${agentName} for ${agent}`)
          return test
        })
      ).toBe(true)
    }
  })

  it('crawler should not include crawlers starting with a number', async () => {
    const { crawler } = await buildUserAgents()
    expect(crawler.some(crawler => /^[0-9]/.test(crawler))).toBe(false)
  })

  it('crawler should not include crawlers containing "(" or ")"', async () => {
    const { crawler } = await buildUserAgents()
    expect(
      crawler.some(crawler => crawler.includes('(') || crawler.includes(')'))
    ).toBe(false)
  })
})
