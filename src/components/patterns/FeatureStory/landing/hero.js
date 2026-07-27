import { layout, theme } from 'theme'
import React from 'react'
import { ChevronRight } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Button from 'components/elements/Button/Button'
import Heading from 'components/elements/Heading'
import FeatherIcon from 'components/icons/Feather'

import { Caption } from 'components/patterns/CustomerStory/primitives'

import { FeatureBreadcrumbs, PlanSupportBar } from './shell'

const CtaLabel = ({ children }) => (
  <Flex as='span' css={theme({ alignItems: 'center', gap: 1 })}>
    {children}
    <FeatherIcon icon={ChevronRight} />
  </Flex>
)

export const FeatureHero = ({
  name,
  title,
  description,
  primaryCta,
  secondaryCta,
  plans
}) => (
  <Box as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <FeatureBreadcrumbs name={name} />
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
      {(primaryCta || secondaryCta) && (
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            gap: 3,
            flexWrap: 'wrap',
            alignItems: 'center'
          })}
        >
          {primaryCta && (
            <Button
              as={Link}
              href={primaryCta.href}
              variant='gradient'
              css={theme({ textDecoration: 'none' })}
            >
              <CtaLabel>{primaryCta.label}</CtaLabel>
            </Button>
          )}
          {secondaryCta && (
            <Button
              as={Link}
              href={secondaryCta.href}
              variant='white'
              css={theme({ textDecoration: 'none', color: 'black' })}
            >
              <CtaLabel>{secondaryCta.label}</CtaLabel>
            </Button>
          )}
        </Flex>
      )}
      {plans && <PlanSupportBar plans={plans} />}
    </Box>
  </Box>
)
