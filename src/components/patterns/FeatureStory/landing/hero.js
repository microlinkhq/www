import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Button from 'components/elements/Button/Button'
import Heading from 'components/elements/Heading'

import { Caption } from 'components/patterns/CustomerStory/primitives'

import { FeatureBreadcrumbs, PlanSupportBar } from './shell'

export const FeatureHero = ({
  name,
  title,
  description,
  primaryCta,
  secondaryCta,
  plans,
  heroMark
}) => (
  <Box as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <FeatureBreadcrumbs name={name} />
    <Flex
      css={theme({
        gap: [4, 4, 5, 5],
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start']
      })}
    >
      <Box css={theme({ flex: '1 1 auto', minWidth: 0 })}>
        <Heading variant={null} css={theme({ textAlign: 'left' })}>
          {title}
        </Heading>
        <Caption
          forwardedAs='p'
          titleize={false}
          css={theme({
            pt: [3, 3, 4, 4],
            textAlign: 'left',
            maxWidth: layout.large,
            mx: 0
          })}
        >
          {description}
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            gap: 3,
            flexWrap: 'wrap',
            alignItems: 'center'
          })}
        >
          <Button
            as={Link}
            href={primaryCta.href}
            variant='gradient'
            css={theme({ textDecoration: 'none' })}
          >
            {primaryCta.label}
          </Button>
          <Button
            as={Link}
            href={secondaryCta.href}
            variant='white'
            css={theme({ textDecoration: 'none', color: 'black' })}
          >
            {secondaryCta.label}
          </Button>
        </Flex>
        {plans && <PlanSupportBar plans={plans} />}
      </Box>
      {heroMark && (
        <Flex
          aria-hidden='true'
          css={theme({
            display: ['none', 'none', 'flex', 'flex'],
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 auto',
            width: '220px',
            pt: 4
          })}
        >
          {heroMark}
        </Flex>
      )}
    </Flex>
  </Box>
)
