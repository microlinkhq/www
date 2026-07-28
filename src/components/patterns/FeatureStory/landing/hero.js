import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Heading from 'components/elements/Heading'

import { Caption } from 'components/patterns/CustomerStory/primitives'

import { FeatureBreadcrumbs, PlanSupportBar } from './shell'

export const FeatureHero = ({ title, description, plans }) => (
  <Box as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <FeatureBreadcrumbs name={title} />
    <Box css={theme({ maxWidth: layout.large })}>
      <Heading variant={null} css={theme({ textAlign: 'left' })}>
        {title}
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
      {plans && <PlanSupportBar plans={plans} />}
    </Box>
  </Box>
)
