import React from 'react'
import { layout, theme } from 'theme'

import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'

import {
  AlternativeSection,
  AlternativeSectionInner
} from './alternative-section'
import { ComparisonTable } from './comparison'
import { GradientText } from './section'

const COMPARISON_TITLE = (
  <>
    <GradientText>Feature by&nbsp;feature</GradientText>,
    <br />
    side by&nbsp;side.
  </>
)

export const AlternativeComparison = ({
  title = COMPARISON_TITLE,
  caption,
  columns,
  rows,
  competitorKey,
  lastVerified
}) => (
  <AlternativeSection
    as='section'
    id='comparison'
    css={theme({
      borderTop: 1,
      borderTopColor: 'black05',
      borderBottom: 1,
      borderBottomColor: 'black05'
    })}
  >
    <AlternativeSectionInner>
      <Subhead css={theme({ pb: [2, 2, 3, 3] })}>{title}</Subhead>
      <Caption
        css={theme({
          pt: 2,
          pb: [3, 3, 4, 4],
          maxWidth: layout.normal,
          color: 'black'
        })}
      >
        {caption}
      </Caption>
      <ComparisonTable
        columns={columns}
        rows={rows}
        competitorKey={competitorKey}
        featureLabel='Feature'
      />
      <Text
        css={theme({
          pt: 4,
          pb: 4,
          fontSize: 0,
          color: 'black60',
          lineHeight: 2,
          textAlign: 'center'
        })}
      >
        Last verified: {lastVerified}. Competitor features from public docs and
        pricing. A dash marks a feature not&nbsp;offered.
      </Text>
    </AlternativeSectionInner>
  </AlternativeSection>
)
