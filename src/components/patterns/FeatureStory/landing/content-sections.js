import { layout, theme } from 'theme'
import React from 'react'
import { Check } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow } from '../primitives'
import { FeatureSection } from './shell'

const CheckItem = ({ children }) => (
  <Flex as='li' css={theme({ gap: 2, alignItems: 'flex-start' })}>
    <Flex
      aria-hidden='true'
      css={theme({
        color: 'link',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: [1, 1, 2, 2],
        height: '2em'
      })}
    >
      <Check size={18} />
    </Flex>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black80',
        lineHeight: 2
      })}
    >
      {children}
    </Text>
  </Flex>
)

export const OverviewSection = ({
  eyebrow = 'Overview',
  title,
  body,
  bullets
}) => (
  <FeatureSection id='overview'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    {title && (
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        {title}
      </Subhead>
    )}
    <Box css={theme({ maxWidth: layout.large })}>
      <Box
        css={theme({
          fontFamily: 'sans',
          fontSize: [2, 2, 2, 2],
          lineHeight: 2,
          color: 'black'
        })}
      >
        {body}
      </Box>
      {bullets?.length > 0 && (
        <Box
          as='ul'
          css={theme({
            listStyle: 'none',
            p: 0,
            m: 0,
            pt: [4, 4, 4, 4],
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          })}
        >
          {bullets.map(bullet =>
            typeof bullet === 'string'
              ? (
                <CheckItem key={bullet}>{bullet}</CheckItem>
                )
              : (
                <CheckItem key={bullet.key}>{bullet.label}</CheckItem>
                )
          )}
        </Box>
      )}
    </Box>
  </FeatureSection>
)
