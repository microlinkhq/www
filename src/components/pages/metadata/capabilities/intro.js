import React from 'react'
import { layout, theme } from 'theme'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import { ACCENT, Caption, HERO_LAYOUT, Subhead } from '../shared'
import { CapabilityList } from './items'

export const CapabilitiesIntro = () => (
  <Flex
    css={theme({
      flexDirection: 'column',
      width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
      justifyContent: 'center',
      alignItems: ['center', 'center', 'center', 'flex-start'],
      gap: [3, 3, 4, 4]
    })}
  >
    <Subhead
      css={theme({
        textAlign: ['center', 'center', 'center', 'left'],
        width: '100%'
      })}
    >
      Build social previews
      <LineBreak />
      <span css={{ color: ACCENT }}>that actually render</span>
    </Subhead>
    <Caption
      forwardedAs='div'
      css={theme({
        maxWidth: layout.small,
        textAlign: ['center', 'center', 'center', 'left']
      })}
    >
      Microlink returns a unified JSON response — plus the brand color palette,
      logo, and favicon. Everything you need to render a pixel-perfect link
      preview or URL preview on the first try.
    </Caption>
    <CapabilityList />
  </Flex>
)
