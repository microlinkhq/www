'use strict'

const { isbot } = require('isbot')
const path = require('path')

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

const fn = async () => {
  const allAgents =
    'https://raw.githubusercontent.com/arcjet/well-known-bots/main/well-known-bots.json'

  const res = await fetch(allAgents)
  const data = await res.json()

  const ai = data.filter(item => item.categories.includes('ai'))
  const rest = data.filter(item => !item.categories.includes('ai'))

  return {
    updatedAt: Date.now(),
    user: require('top-user-agents'),
    crawler: toUserAgent(rest).filter(isbot),
    ai: toUserAgent(ai)
  }
}

module.exports = () =>
  require('../create-provider').fromCode(fn, {
    dist: path.resolve(__dirname, '../../../static/user-agents.json')
  })
