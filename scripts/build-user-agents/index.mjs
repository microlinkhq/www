/* global fetch */

import cloudflareBotsDirectory from 'cloudflare-bot-directory'
import topUserAgents from 'top-user-agents'
import { once } from '../../src/helpers/once.js'

import { extractBotName } from './extract-bot.mjs'

const sortAlphabetically = (a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())

const SOURCES = [
  // [
  //   'aiRobotsTxt',
  //   'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/haproxy-block-ai-bots.txt',
  //   text => {
  //     return { ai: text.split('\n') }
  //   }
  // ],
  [
    'wellKnownBots',
    'https://raw.githubusercontent.com/arcjet/well-known-bots/main/well-known-bots.json',
    text => {
      const items = JSON.parse(text)

      const toUserAgent = items => {
        const agents = items.map(item => item.instances.accepted).flat()
        const uniqueAgents = new Map()

        for (const agent of agents) {
          const normalizedAgent = agent.trim()
          const lowercasedAgent = normalizedAgent.toLowerCase()
          if (!uniqueAgents.has(lowercasedAgent)) {
            uniqueAgents.set(lowercasedAgent, normalizedAgent)
          }
        }

        return Array.from(uniqueAgents.values()).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        )
      }

      const ai = items.filter(item => item.categories.includes('ai'))
      const rest = items.filter(item => !item.categories.includes('ai'))

      return {
        crawler: toUserAgent(rest),
        ai: toUserAgent(ai)
      }
    }
  ],
  [
    'crawlerAgents',
    'https://raw.githubusercontent.com/monperrus/crawler-user-agents/refs/heads/master/crawler-user-agents.json',
    text => {
      const items = JSON.parse(text)
      return {
        crawler: items.map(item => item.instances).flat()
      }
    }
  ]
].reduce((acc, [key, url, mapper = value => value]) => {
  acc[key] = once(() =>
    fetch(url)
      .then(res => res.text())
      .then(mapper)
  )
  return acc
}, {})

const buildAI = async () => {
  const result = (await SOURCES.wellKnownBots().then(({ ai }) => ai)).reduce(
    (acc, userAgent) => {
      const output = extractBotName(userAgent)
      if (output) {
        if (!acc.includes(output)) {
          acc.push(output)
        }
      }
      return acc
    },
    []
  )

  cloudflareBotsDirectory
    .filter(bot => bot.category.startsWith('AI'))
    .map(bot => bot.userAgentPatterns)
    .flat()
    .map(bot => bot.toLowerCase().replace(/\/$/, ''))
    .forEach(aiBot => {
      if (!result.includes(aiBot)) result.push(aiBot)
    })

  return result.sort(sortAlphabetically)
}

const buildCrawler = async ai => {
  /* wellKnownBots as crawlers tagged */
  const result = (
    await SOURCES.wellKnownBots().then(({ crawler }) => crawler)
  ).reduce((acc, crawlerAgent) => {
    const crawler = extractBotName(crawlerAgent)
    if (crawler && !ai.includes(crawler) && !acc.includes(crawler)) {
      acc.push(crawler)
    }
    return acc
  }, [])

  ;(await SOURCES.crawlerAgents().then(({ crawler }) => crawler)).forEach(
    crawlerAgent => {
      const crawler = extractBotName(crawlerAgent)
      if (crawler && !ai.includes(crawler) && !result.includes(crawler)) {
        result.push(crawler)
      }
    }
  )

  cloudflareBotsDirectory
    .filter(bot => !bot.category.startsWith('AI'))
    .map(bot => bot.userAgentPatterns)
    .flat()
    .map(bot => bot.toLowerCase().replace(/\/$/, ''))
    .forEach(crawler => {
      if (!ai.includes(crawler) && !result.includes(crawler)) {
        result.push(crawler)
      }
    })

  return result.sort(sortAlphabetically)
}

export const buildUserAgents = async () => {
  const ai = await buildAI()
  return {
    ai,
    crawler: await buildCrawler(ai),
    updatedAt: Date.now(),
    user: topUserAgents
  }
}
