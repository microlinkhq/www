import { theme } from 'theme'
import React from 'react'
import {
  Activity,
  Clock,
  Code,
  Globe,
  List,
  Lock,
  MousePointer,
  Shield
} from 'react-feather'

import Box from 'components/elements/Box'

const ICON_MAP = {
  globe: Globe,
  code: Code,
  js: Code,
  mouse: MousePointer,
  shield: Shield,
  radar: Activity,
  clock: Clock,
  list: List,
  lock: Lock
}

export const FeatureIcon = ({ name, color, size = 20, ...props }) => {
  const Icon = ICON_MAP[name] || Globe
  return (
    <Box
      aria-hidden='true'
      css={theme({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color || 'secondary',
        flexShrink: 0
      })}
      {...props}
    >
      <Icon size={size} />
    </Box>
  )
}
