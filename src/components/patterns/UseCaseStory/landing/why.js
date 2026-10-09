import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import {
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'
import { WhyCard } from 'components/patterns/CustomerStory/WhyCards'

import { inline } from './inline-links'
import { ACCENT } from '../use-cases'

const UseCaseItem = styled(Text).attrs({ as: 'p' })`
  ${theme({ color: 'black70', lineHeight: 2 })}
`

export const WhySection = ({ why, eyebrow = 'Why it works' }) => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          {eyebrow}
        </Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>{why.title}</Subhead>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          {inline(why.intro)}
        </Text>
      </Box>

      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        {why.cards.map(({ kicker, title, body, note }, index) => (
          <React.Fragment key={kicker}>
            <WhyCard
              accent={ACCENT}
              number={index + 1}
              kicker={kicker}
              title={title}
              body={body}
            />
            {note && <UseCaseItem>{inline(note)}</UseCaseItem>}
          </React.Fragment>
        ))}
      </Flex>
    </SectionInner>
  </Section>
)
