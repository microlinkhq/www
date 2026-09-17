import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'

import { inline } from './inline-links'
import { VerticalIconTile } from './vertical-icon'
import { ACCENT, useCasePath } from '../use-cases'

const crumbStyle = {
  fontFamily: 'mono',
  color: ACCENT.text,
  fontSize: 0,
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
}

export const UseCaseBreadcrumbs = ({ crumbs }) => (
  <Flex
    as='nav'
    aria-label='Breadcrumb'
    css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}
  >
    {crumbs.map(({ label, href }, index) => (
      <React.Fragment key={label}>
        {index > 0 && (
          <Text
            as='span'
            aria-hidden='true'
            css={theme({ ...crumbStyle, color: 'gray5' })}
          >
            /
          </Text>
        )}
        {href
          ? (
            <Link
              href={href}
              css={theme({ ...crumbStyle, textDecoration: 'none' })}
            >
              {label}
            </Link>
            )
          : (
            <Text as='span' css={theme(crumbStyle)}>
              {label}
            </Text>
            )}
      </React.Fragment>
    ))}
  </Flex>
)

export const UseCaseHero = ({ vertical, hero }) => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <UseCaseBreadcrumbs
        crumbs={[
          { label: 'Use cases', href: '/use-cases' },
          { label: vertical.name, href: useCasePath(vertical.slug) }
        ]}
      />
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <VerticalIconTile vertical={vertical} size={40} />
        <Text
          css={theme({
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1
          })}
        >
          {vertical.product} · Use case
        </Text>
      </Flex>
      <Heading
        variant={null}
        css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
      >
        {hero.title}
      </Heading>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {inline(hero.intro)}
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href={hero.cta.href}
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          {hero.cta.label}
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)
