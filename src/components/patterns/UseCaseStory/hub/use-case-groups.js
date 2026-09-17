import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'

import ArrowLink from 'components/patterns/ArrowLink'
import { Eyebrow, StoryTag } from 'components/patterns/CustomerStory/chrome'

import { CardGrid, UseCaseCard } from './use-case-card'
import { VerticalIconTile } from '../landing/vertical-icon'
import {
  ACCENT,
  VERTICALS,
  partnerUseCases,
  useCasePath,
  useCasesByVertical
} from '../use-cases'

const groupLink = css => theme({ color: 'link', fontWeight: 'bold', ...css })

const JumpNav = ({ verticals }) => (
  <Flex
    as='nav'
    aria-label='Use cases by product'
    css={theme({ flexWrap: 'wrap', gap: 2, pb: [3, 3, 4, 4] })}
  >
    {verticals.map(vertical => (
      <StoryTag
        key={vertical.slug}
        as='a'
        href={`#${vertical.slug}`}
        accent={ACCENT}
        css={theme({ textDecoration: 'none' })}
      >
        {vertical.product}
      </StoryTag>
    ))}
  </Flex>
)

const VerticalGroup = ({ vertical, entries }) => (
  <Box
    id={vertical.slug}
    css={theme({ pb: [4, 4, 5, 5], scrollMarginTop: 4 })}
  >
    <Flex css={theme({ alignItems: 'center', gap: 2, pb: 2 })}>
      <VerticalIconTile vertical={vertical} size={28} />
      <Eyebrow accent={ACCENT}>{vertical.product}</Eyebrow>
    </Flex>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {vertical.name} use cases
    </Subhead>
    <CardGrid>
      {entries.map(entry => (
        <UseCaseCard key={entry.slug} entry={entry} />
      ))}
    </CardGrid>
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <ArrowLink
        href={useCasePath(vertical.slug)}
        css={groupLink({ fontSize: [1, 2, 2, 2] })}
      >
        All {vertical.name.toLowerCase()} use cases
      </ArrowLink>
    </Box>
  </Box>
)

const PartnerRecipes = ({ entries }) => (
  <Box id='partner-recipes' css={theme({ scrollMarginTop: 4 })}>
    <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
      Recipes with partners
    </Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      Combine Microlink with other APIs
    </Subhead>
    <CardGrid>
      {entries.map(entry => (
        <UseCaseCard key={entry.slug} entry={entry} />
      ))}
    </CardGrid>
  </Box>
)

export const UseCaseGroups = () => {
  const groups = VERTICALS.map(vertical => ({
    vertical,
    entries: useCasesByVertical(vertical.slug)
  })).filter(({ entries }) => entries.length > 0)
  const partners = partnerUseCases()

  return (
    <>
      {groups.length > 1 && (
        <JumpNav verticals={groups.map(({ vertical }) => vertical)} />
      )}
      {groups.map(({ vertical, entries }) => (
        <VerticalGroup
          key={vertical.slug}
          vertical={vertical}
          entries={entries}
        />
      ))}
      {partners.length > 0 && <PartnerRecipes entries={partners} />}
    </>
  )
}
