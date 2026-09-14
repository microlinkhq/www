import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import { Eyebrow } from 'components/patterns/FeatureStory'

import { QUICKSTART, SectionBlock } from './shared'

export const Quickstart = () => (
  <SectionBlock
    id='quickstart'
    title={QUICKSTART.title}
    caption={QUICKSTART.caption}
  >
    <Eyebrow as='p' css={theme({ pb: [3, 3, 4, 4] })}>
      {QUICKSTART.eyebrow}
    </Eyebrow>
    <Box
      as='ol'
      css={theme({
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: [4, 4, 4, 4]
      })}
    >
      {QUICKSTART.steps.map((step, index) => (
        <Flex
          as='li'
          key={step.title}
          css={theme({
            alignItems: 'flex-start',
            gap: 3
          })}
        >
          <Flex
            aria-hidden='true'
            css={theme({
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: '32px',
              height: '32px',
              borderRadius: 5,
              border: 1,
              borderColor: 'black10',
              color: 'black80',
              fontFamily: 'mono',
              fontSize: 1,
              fontWeight: 'bold'
            })}
          >
            {index + 1}
          </Flex>
          <Box css={theme({ minWidth: 0, pt: '2px' })}>
            <Text
              as='h3'
              css={theme({
                m: 0,
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              {step.title}
            </Text>
            <Text
              css={theme({
                pt: 2,
                color: 'black70',
                lineHeight: 2
              })}
            >
              {step.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
    <Flex css={theme({ pt: [4, 4, 5, 5] })}>
      <ArrowLink href={QUICKSTART.docsHref}>{QUICKSTART.docsLabel}</ArrowLink>
    </Flex>
  </SectionBlock>
)
