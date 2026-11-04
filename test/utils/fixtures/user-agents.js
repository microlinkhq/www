const ai = ['gptbot', 'claudebot', 'perplexitybot']

const crawler = [
  'googlebot',
  'ahrefsbot',
  'uptimerobot',
  ...Array.from({ length: 997 }, (_, index) => `crawler-${index}`)
]

const user = Array.from({ length: 1000 }, (_, index) => `ua-${index}`)

export default { ai, crawler, updatedAt: 0, user }
