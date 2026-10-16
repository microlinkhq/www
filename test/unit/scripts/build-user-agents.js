import { expect, describe, it } from 'vitest'

import { parseWellKnownBots } from '../../../scripts/build-user-agents'

const bot = ({ categories = ['tool'], patterns = [], samples = [] }) => ({
  id: 'bot',
  categories,
  pattern: { accepted: patterns, forbidden: [] },
  instances: { accepted: samples, rejected: [] }
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

const parse = items => parseWellKnownBots(JSON.stringify(items))

describe('parseWellKnownBots', () => {
  it('splits user agents into ai and crawler by category', () => {
    expect(
      parse([
        bot({ categories: ['ai'], samples: ['GPTBot/1.0'] }),
        bot({ categories: ['search-engine'], samples: ['Googlebot/2.1'] })
      ])
    ).toEqual({ ai: ['GPTBot/1.0'], crawler: ['Googlebot/2.1'] })
  })

  it('prefers sample user agents over patterns', () => {
    expect(
      parse([bot({ patterns: ['AhrefsBot\\/'], samples: ['AhrefsBot/7.0'] })])
        .crawler
    ).toEqual(['AhrefsBot/7.0'])
  })

  it('falls back to a literal pattern when there are no samples', () => {
    expect(
      parse([bot({ categories: ['ai'], patterns: ['AISearchBot'] })]).ai
    ).toEqual(['AISearchBot'])
  })

  it('unescapes literal characters and drops a trailing slash', () => {
    expect(
      parse([
        bot({ patterns: ['web-archive-net\\.com\\.bot'] }),
        bot({ patterns: ['Googlebot\\/'] })
      ]).crawler
    ).toEqual(['Googlebot', 'web-archive-net.com.bot'])
  })

  it('skips patterns that are regexes or multi-word', () => {
    expect(
      parse([
        bot({ patterns: ['Mediapartners \\(Googlebot\\)'] }),
        bot({ patterns: ['[wW]get'] }),
        bot({ patterns: ['AdsBot-Google([^-]|$)'] }),
        bot({ patterns: ['gnam gnam spider'] })
      ]).crawler
    ).toEqual([])
  })

  it('skips signing identities that have no user agent', () => {
    expect(
      parse([
        signingIdentity,
        bot({ categories: ['ai'], samples: ['ClaudeBot/1.0'] })
      ])
    ).toEqual({ ai: ['ClaudeBot/1.0'], crawler: [] })
  })

  it('dedupes case-insensitively and sorts alphabetically', () => {
    expect(
      parse([
        bot({ samples: ['zbot', ' Abot '] }),
        bot({ samples: ['ZBOT', 'mbot'] })
      ]).crawler
    ).toEqual(['Abot', 'mbot', 'zbot'])
  })
})
