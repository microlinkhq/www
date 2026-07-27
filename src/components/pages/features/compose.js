import { breakpoints, theme, shadows, textGradient } from 'theme'
import React from 'react'
import styled from 'styled-components'
import { Check } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Button from 'components/elements/Button/Button'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import {
  ACCENT,
  Caption,
  Eyebrow,
  FEATURES,
  FeatureIcon,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

const INPUTS = FEATURES.map(({ paramDisplay, param, icon, iconColor }) => ({
  label: paramDisplay || param,
  icon,
  iconColor
}))

const OUTPUTS = [
  'JSON data',
  'Screenshot',
  'PDF',
  'Markdown',
  'Logs',
  'Response info'
]

const Band = styled(Box)`
  ${theme({
    bg: 'gray1',
    borderRadius: [0, 0, 4, 4],
    py: [4, 4, 5, 5],
    px: [3, 3, 4, 4]
  })}
`

const ComposeGrid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: center;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  }
`

const FunnelVisual = () => (
  <Flex
    aria-hidden='true'
    css={theme({
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3
    })}
  >
    <Flex css={theme({ flexDirection: 'column', gap: 2, flex: '1 1 0' })}>
      {INPUTS.map(({ label, icon, iconColor }) => (
        <Flex key={label} css={theme({ alignItems: 'center', gap: 2 })}>
          <FeatureIcon name={icon} color={iconColor} size={14} />
          <Text
            css={theme({
              fontFamily: 'mono',
              fontSize: 0,
              color: 'black70'
            })}
          >
            {label}
          </Text>
        </Flex>
      ))}
    </Flex>

    <Flex
      css={theme({
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        bg: 'white',
        border: 1,
        borderColor: ACCENT.bgEdge,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      })}
      style={{ boxShadow: shadows[1] }}
    >
      <FeatureIcon name='globe' color='secondary' size={24} />
    </Flex>

    <Flex css={theme({ flexDirection: 'column', gap: 2, flex: '1 1 0' })}>
      {OUTPUTS.map(label => (
        <Flex key={label} css={theme({ alignItems: 'center', gap: 2 })}>
          <Box css={theme({ color: 'close', flexShrink: 0 })}>
            <Check size={14} />
          </Box>
          <Text
            css={theme({
              fontFamily: 'mono',
              fontSize: 0,
              color: 'black70'
            })}
          >
            {label}
          </Text>
        </Flex>
      ))}
    </Flex>
  </Flex>
)

export const Compose = () => (
  <Section id='compose' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Band>
        <ComposeGrid>
          <Box>
            <Eyebrow css={theme({ pb: 3, display: 'block' })}>
              One request. Many capabilities.
            </Eyebrow>
            <Subhead css={theme({ textAlign: 'left' })}>
              Compose features. Get <span css={textGradient}>everything</span>{' '}
              back.
            </Subhead>
            <Caption
              forwardedAs='p'
              titleize={false}
              css={theme({
                pt: [3, 3, 4, 4],
                textAlign: 'left',
                maxWidth: '28em',
                mx: 0
              })}
            >
              Every parameter composes on the same endpoint. Extract data,
              capture media, forward headers, cache the result — one response.
            </Caption>
            <Box css={theme({ pt: [3, 3, 4, 4] })}>
              <Button
                as={Link}
                href='/docs/api/getting-started/overview'
                variant='gradient'
                css={theme({ textDecoration: 'none' })}
              >
                See example response →
              </Button>
            </Box>
          </Box>
          <FunnelVisual />
        </ComposeGrid>
      </Band>
    </SectionInner>
  </Section>
)
