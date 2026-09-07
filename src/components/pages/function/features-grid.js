import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Subhead } from 'components/patterns/ProductStory'
import { SECTION_VERTICAL_SPACING, colors, layout, theme } from 'theme'
import React from 'react'
import {
  Activity,
  AlertCircle,
  Clock,
  Code,
  FilePlus,
  Globe,
  Layers,
  Lock,
  Minimize2,
  MousePointer,
  Package,
  Shield,
  Terminal,
  Type,
  Zap
} from 'react-feather'

import { FEATURES, FEATURES_INTRO } from './product-shared'

const ICONS = {
  Activity,
  AlertCircle,
  Clock,
  Code,
  FilePlus,
  Globe,
  Layers,
  Lock,
  Minimize2,
  MousePointer,
  Package,
  Shield,
  Terminal,
  Type,
  Zap
}

const Feature = ({ icon, title, description }) => {
  const Icon = ICONS[icon]
  return (
    <Box
      as='li'
      css={theme({
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 3,
        rowGap: 1,
        alignItems: 'center'
      })}
    >
      <Box
        aria-hidden='true'
        css={theme({
          display: 'flex',
          alignItems: 'center',
          lineHeight: 0
        })}
      >
        <Icon size={20} strokeWidth={1.5} color={colors.black80} />
      </Box>
      <Text
        as='h3'
        css={theme({
          fontWeight: 'bold',
          color: 'black',
          lineHeight: 0
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          gridColumn: 2,
          color: 'black60'
        })}
      >
        {description}
      </Text>
    </Box>
  )
}

export const FunctionFeaturesGrid = () => (
  <Flex
    as='section'
    id='features'
    flexDirection='column'
    css={theme({
      alignItems: 'center',
      px: [3, 3, 4, 4],
      py: SECTION_VERTICAL_SPACING,
      borderTop: 1,
      borderTopColor: 'black05'
    })}
  >
    <Flex
      flexDirection='column'
      css={theme({
        width: '100%',
        maxWidth: layout.large
      })}
    >
      <Flex
        flexDirection='column'
        css={theme({
          alignItems: ['center', 'center', 'flex-start'],
          textAlign: ['center', 'center', 'left'],
          mb: [4, 4, 5]
        })}
      >
        <Subhead titleize={false}>{FEATURES_INTRO.title}</Subhead>
        <Text
          css={theme({
            pt: [3, 3, 4],
            maxWidth: layout.small,
            color: 'black60'
          })}
        >
          {FEATURES_INTRO.caption}
        </Text>
      </Flex>
      <Box
        as='ul'
        css={theme({
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', 'repeat(3, 1fr)'],
          columnGap: [4, 4, 4],
          rowGap: [4, 4, 4]
        })}
      >
        {FEATURES.map(item => (
          <Feature key={item.title} {...item} />
        ))}
      </Box>
    </Flex>
  </Flex>
)
