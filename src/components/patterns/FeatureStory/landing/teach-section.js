import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { Eyebrow } from '../primitives'
import { FeatureSection } from './shell'

const TeachBlock = ({ title, children }) => (
  <Box css={theme({ minWidth: 0, pb: [3, 3, 4, 4] })}>
    <Text
      as='h3'
      css={theme({
        fontFamily: 'sans',
        fontWeight: 'bold',
        fontSize: 2,
        color: 'black',
        pb: 2,
        m: 0
      })}
    >
      {title}
    </Text>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black70',
        lineHeight: 2,
        maxWidth: layout.normal
      })}
    >
      {children}
    </Text>
  </Box>
)

export const TeachSection = ({
  eyebrow = 'When to use',
  title,
  when,
  preferLighter,
  compose,
  hubHref = '/features'
}) => (
  <FeatureSection id='teach'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {title}
    </Subhead>
    {when && <TeachBlock title='Use this when'>{when}</TeachBlock>}
    {preferLighter && (
      <TeachBlock title='Prefer something lighter first'>
        {preferLighter}
      </TeachBlock>
    )}
    {compose && <TeachBlock title='Compose with'>{compose}</TeachBlock>}
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: 1,
        color: 'black60',
        lineHeight: 2,
        pt: 2
      })}
    >
      Part of the <Link href={hubHref}>shared Microlink primitive set</Link>.
    </Text>
  </FeatureSection>
)
