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
  Shield,
  Zap
} from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

const ICON_MAP = {
  globe: Globe,
  code: Code,
  mouse: MousePointer,
  shield: Shield,
  radar: Activity,
  clock: Clock,
  list: List,
  lock: Lock
}

const Glyph = ({ name, size, color }) => {
  if (name === 'js') {
    return (
      <Text
        css={theme({
          fontFamily: 'mono',
          fontSize: size >= 28 ? 2 : 0,
          fontWeight: 'bold',
          lineHeight: 1,
          color
        })}
      >
        JS
      </Text>
    )
  }

  if (name === 'shield') {
    const bolt = Math.max(8, Math.round(size * 0.5))
    return (
      <Box css={theme({ position: 'relative', display: 'flex' })}>
        <Shield size={size} strokeWidth={2} />
        <Box
          css={theme({
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color
          })}
        >
          <Zap size={bolt} fill='currentColor' strokeWidth={0} />
        </Box>
      </Box>
    )
  }

  const Icon = ICON_MAP[name] || Globe
  return <Icon size={size} strokeWidth={2} />
}

export const FeatureIconTile = ({ name, bg, size = 36, color, ...props }) => {
  const ink = color || (name === 'js' ? 'black' : 'white')
  const glyphSize = Math.round(size * 0.45)

  return (
    <Flex
      aria-hidden='true'
      css={theme({
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: 3,
        bg,
        color: ink,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      })}
      {...props}
    >
      <Glyph name={name} size={glyphSize} color={ink} />
    </Flex>
  )
}
