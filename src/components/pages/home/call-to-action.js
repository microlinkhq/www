import React from 'react'
import { colors, theme } from 'theme'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import { CallToAction as FreeKeyCallToAction } from 'components/patterns/CallToAction'

const NEXT_STEPS = [
  { href: '/docs/api/getting-started/mcp', label: 'Set up MCP' },
  { href: '/docs/api/getting-started/overview', label: 'Read the docs' }
]

const CallToAction = () => (
  <FreeKeyCallToAction
    id='get-started'
    accent={colors.grape7}
    outcome='turning any link into what you need'
    cta='home:footer-cta'
  >
    <Flex
      as='ul'
      aria-label='Other ways to start'
      css={theme({
        gap: [3, 3, 4, 4],
        flexWrap: 'wrap',
        justifyContent: 'center',
        listStyle: 'none',
        m: 0,
        p: 0
      })}
    >
      {NEXT_STEPS.map(({ href, label }) => (
        <Text as='li' key={href}>
          <Link href={href}>{label}</Link>
        </Text>
      ))}
    </Flex>
  </FreeKeyCallToAction>
)

export default CallToAction
