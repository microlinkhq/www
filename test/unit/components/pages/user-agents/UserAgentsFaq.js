import { describe, expect, test } from 'vitest'

import { getFaqQuestions } from '../../../../../src/components/pages/user-agents/UserAgentsFaq'
import { USER_AGENTS_COUNT } from '../../../../../src/components/pages/user-agents/counts'
import toPlainText from '../../../../../src/components/patterns/Faq/to-plain-text'
import userAgents from '../../../../../static/user-agents.json'

const answerOf = question =>
  toPlainText(getFaqQuestions().find(faq => faq.question === question).answer)

describe('user agents page copy', () => {
  test('counts match the published data', () => {
    expect(USER_AGENTS_COUNT).toEqual({
      user: userAgents.user.length.toLocaleString('en-US'),
      ai: userAgents.ai.length.toLocaleString('en-US'),
      crawler: userAgents.crawler.length.toLocaleString('en-US')
    })
  })

  test('the bot names given as examples are in their lists', () => {
    const answer = answerOf('What is in the list?')
    for (const name of ['gptbot', 'claudebot', 'perplexitybot']) {
      expect(answer).toContain(name)
      expect(userAgents.ai).toContain(name)
    }
    for (const name of ['googlebot', 'ahrefsbot', 'uptimerobot']) {
      expect(answer).toContain(name)
      expect(userAgents.crawler).toContain(name)
    }
  })

  test('the code example picks from the user list of the endpoint', () => {
    const answer = answerOf('How do I use the list in my code?')
    expect(Object.keys(userAgents).sort()).toEqual([
      'ai',
      'crawler',
      'updatedAt',
      'user'
    ])
    expect(answer).toContain('const { user } = await fetch(')
    expect(answer).toContain('user[Math.floor(Math.random() * user.length)]')
  })

  test('every question has a plain text answer for the FAQ schema', () => {
    for (const { question, answer } of getFaqQuestions()) {
      expect(question).toMatch(/\?$/)
      const text = toPlainText(answer)
      expect(text.length).toBeGreaterThan(20)
      expect(text).not.toMatch(/[a-z][.:][A-Z]/)
    }
  })
})
