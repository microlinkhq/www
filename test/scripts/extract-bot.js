import { expect, describe, it } from 'vitest'

import { extractBotName } from '../../scripts/build-user-agents/extract-bot'

describe('extractBotName', () => {
  it('get bot name', () => {
    expect(
      extractBotName(
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      )
    ).toBe('googlebot')
    expect(
      extractBotName(
        'facebookexternalhit/1.0 (+http://www.facebook.com/externalhit_uatext.php)'
      )
    ).toBe('facebookexternalhit')
    expect(extractBotName('YouBot (+http://www.you.com)')).toBe('youbot')
    expect(
      extractBotName('SentiBot www.sentibot.eu (compatible with Googlebot)')
    ).toBe('sentibot')

    expect(extractBotName('CCBot/2.0 (http://commoncrawl.org/faq/)')).toBe(
      'ccbot'
    )
    expect(
      extractBotName(
        'Mozilla/5.0 (compatible; Gluten Free Crawler/1.0; +http://glutenfreepleasure.com/)'
      )
    ).toBe('gluten free crawler')
    expect(extractBotName('2ip bot/1.1 (+http://2ip.io)')).toBe('2ip bot')
  })
})
