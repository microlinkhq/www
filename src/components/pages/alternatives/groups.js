import { layout, SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import Caption from 'components/patterns/Caption/Caption'
import {
  CardGrid,
  UseCaseCard
} from 'components/patterns/UseCaseStory/hub/use-case-card'

import { ALTERNATIVE_GROUPS, alternativeHref } from 'helpers/alternatives'

const toCardEntry = ({ slug, name, shortName = name, summary }) => ({
  slug,
  name,
  blurb: summary,
  cta: `Microlink vs ${shortName}`
})

const Group = ({ id, title, caption, accent, alternatives }) => (
  <Box
    as='section'
    id={id}
    aria-labelledby={`${id}-title`}
    css={theme({
      width: '100%',
      maxWidth: layout.large,
      mx: 'auto',
      px: [3, 3, 4, 4],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Subhead id={`${id}-title`}>{title}</Subhead>
    <Caption
      forwardedAs='p'
      css={theme({ pt: [3, 3, 4, 4], mx: 'auto', maxWidth: layout.small })}
    >
      {caption}
    </Caption>
    <CardGrid css={theme({ pt: [4, 4, 5, 5] })}>
      {alternatives.map(alternative => (
        <UseCaseCard
          key={alternative.slug}
          entry={toCardEntry(alternative)}
          href={alternativeHref(alternative.slug)}
          accent={accent}
        />
      ))}
    </CardGrid>
  </Box>
)

export const Groups = () =>
  ALTERNATIVE_GROUPS.map(group => <Group key={group.id} {...group} />)
