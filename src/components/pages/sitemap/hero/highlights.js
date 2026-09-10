import React from 'react'
import { FileText, Shield, Zap } from 'react-feather'
import { space, theme } from 'theme'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

const ITEMS = [
  { Icon: Zap, label: 'Respects robots.txt' },
  { Icon: FileText, label: 'Finds all sitemap files' },
  { Icon: Shield, label: 'Fast and free' }
]

export const Highlights = () => (
  <Flex
    as='ul'
    css={theme({
      listStyle: 'none',
      m: 0,
      mt: [3, 3, 4, 4],
      p: 0,
      px: 3,
      gap: [3, 3, 4, 4],
      flexWrap: 'wrap',
      justifyContent: 'center'
    })}
  >
    {ITEMS.map(({ Icon, label }) => (
      <Flex as='li' key={label} css={theme({ alignItems: 'center', gap: 2 })}>
        <Flex
          aria-hidden
          css={theme({
            alignItems: 'center',
            justifyContent: 'center',
            width: space[4],
            height: space[4],
            borderRadius: '50%',
            bg: 'pinkest',
            color: 'secondary',
            flexShrink: 0
          })}
        >
          <Icon size={14} />
        </Flex>
        <Text css={theme({ fontSize: 1, color: 'black60' })}>{label}</Text>
      </Flex>
    ))}
  </Flex>
)
