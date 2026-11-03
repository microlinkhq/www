import React from 'react'
import { CallToAction as FreeKeyCallToAction } from 'components/patterns/CallToAction'

const NEXT_STEPS = [
  { href: '/docs/api/getting-started/mcp', label: 'Set up MCP' },
  { href: '/docs/api/getting-started/overview', label: 'Read the docs' }
]

const CallToAction = () => (
  <FreeKeyCallToAction
    id='get-started'
    outcome='turning any link into what you need'
    cta='home:footer-cta'
    links={NEXT_STEPS}
  />
)

export default CallToAction
