import userAgents from '../../../../static/user-agents.json'

const formatCount = list => list.length.toLocaleString('en-US')

export const USER_AGENTS_COUNT = {
  user: formatCount(userAgents.user),
  ai: formatCount(userAgents.ai),
  crawler: formatCount(userAgents.crawler)
}
