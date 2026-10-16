import { expect, describe, it } from 'vitest'

import { parseWellKnownBots } from '../../../scripts/build-user-agents'

const bot = ({ categories, accepted }) => ({
  id: accepted[0].toLowerCase(),
  categories,
  pattern: { accepted: [], forbidden: [] },
  instances: { accepted, rejected: [] }
})

const signingIdentity = {
  id: 'chatgpt-agent',
  categories: ['ai'],
  pattern: { accepted: [], forbidden: [] },
  verification: [
    {
      type: 'web-bot-auth',
      directory:
        'https://chatgpt.com/.well-known/http-message-signatures-directory'
    }
  ]
}

describe('parseWellKnownBots', () => {
  it('splits user agents into ai and crawler by category', () => {
    const text = JSON.stringify([
      bot({ categories: ['ai'], accepted: ['GPTBot/1.0'] }),
      bot({ categories: ['search-engine'], accepted: ['Googlebot/2.1'] })
    ])

    expect(parseWellKnownBots(text)).toEqual({
      ai: ['GPTBot/1.0'],
      crawler: ['Googlebot/2.1']
    })
  })

  it('skips signing identities that have no user agent instances', () => {
    const text = JSON.stringify([
      signingIdentity,
      bot({ categories: ['ai'], accepted: ['ClaudeBot/1.0'] })
    ])

    expect(parseWellKnownBots(text)).toEqual({
      ai: ['ClaudeBot/1.0'],
      crawler: []
    })
  })

  it('dedupes case-insensitively and sorts alphabetically', () => {
    const text = JSON.stringify([
      bot({ categories: ['tool'], accepted: ['zbot', ' Abot '] }),
      bot({ categories: ['tool'], accepted: ['ZBOT', 'mbot'] })
    ])

    expect(parseWellKnownBots(text).crawler).toEqual(['Abot', 'mbot', 'zbot'])
  })
})
