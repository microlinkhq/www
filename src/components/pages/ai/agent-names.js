import React from 'react'
import { theme } from 'theme'
import { UNAVATAR_FALLBACK, UNAVATAR_TOKEN } from 'helpers/unavatar'

import Box from 'components/elements/Box'

export const SKILL_AGENTS = [
  { name: 'Claude', domain: 'claude.ai' },
  { name: 'Cursor', domain: 'cursor.com' },
  { name: 'ChatGPT', domain: 'chatgpt.com' }
]

export const FAQ_AGENTS = SKILL_AGENTS.map(agent =>
  agent.name === 'Claude' ? { ...agent, name: 'Claude Code' } : agent
)

export const agentLead = (agents = SKILL_AGENTS) =>
  agents.map(agent => agent.name).join(', ')

const nameCss = theme({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  whiteSpace: 'nowrap',
  verticalAlign: 'middle'
})

const AgentIcon = ({ domain }) => (
  <Box
    as='img'
    alt=''
    width={16}
    height={16}
    decoding='async'
    src={`https://unavatar.io/domain/${domain}?token=${UNAVATAR_TOKEN}&fallback=${UNAVATAR_FALLBACK}`}
    css={theme({
      display: 'block',
      width: '16px',
      height: '16px',
      borderRadius: 2,
      flexShrink: 0
    })}
  />
)

export const AgentNames = ({ agents = SKILL_AGENTS }) =>
  agents.map((agent, index) => (
    <React.Fragment key={agent.name}>
      {index > 0 && ', '}
      <Box as='span' css={nameCss}>
        <AgentIcon domain={agent.domain} />
        {agent.name}
      </Box>
    </React.Fragment>
  ))
