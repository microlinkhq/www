import { theme } from 'theme'
import React from 'react'
import { Code, Search } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Camera } from 'components/icons/Camera'
import { Globe } from 'components/icons/Globe'
import { Markdown } from 'components/icons/Markdown'
import { PDF } from 'components/icons/PDF'
import { ShieldUser } from 'components/icons/ShieldUser'

const ICONS = {
  camera: Camera,
  code: Code,
  globe: Globe,
  markdown: Markdown,
  pdf: PDF,
  search: Search,
  shield: ShieldUser
}

export const VerticalIconTile = ({ vertical, size = 40, ...props }) => {
  const Icon = ICONS[vertical.icon] || Globe
  const glyph = Math.round(size * 0.5)

  return (
    <Flex
      aria-hidden='true'
      css={theme({
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: 2,
        bg: vertical.iconBg,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      })}
      {...props}
    >
      <Icon width={glyph} height={glyph} aria-hidden='true' />
    </Flex>
  )
}
