import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Heading from 'components/elements/Heading'

import { Caption } from 'components/patterns/CustomerStory/primitives'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

import { FeatureBreadcrumbs } from './shell'

export const FeatureHero = ({ title, description, tag }) => (
  <Box as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <FeatureBreadcrumbs name={title} />
    <Box css={theme({ maxWidth: layout.large })}>
      <Heading variant={null} css={theme({ textAlign: 'left' })}>
        {title}
        {tag === 'PRO' && (
          <ProBadge
            css={theme({ ml: 3, top: ['8px', '8px', '12px', '12px'] })}
          />
        )}
      </Heading>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          textAlign: 'left',
          maxWidth: layout.normal,
          mx: 0,
          fontFamily: 'sans'
        })}
      >
        {description}
      </Caption>
    </Box>
  </Box>
)
