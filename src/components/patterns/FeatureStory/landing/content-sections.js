import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'
import { Check } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import ArrowLink from 'components/patterns/ArrowLink'
import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'

import { ACCENT } from '../features'
import { BodyText, Eyebrow } from '../primitives'
import { FeatureSection } from './shell'

const CheckItem = ({ children }) => (
  <Flex as='li' css={theme({ gap: 2, alignItems: 'flex-start' })}>
    <Box
      aria-hidden='true'
      css={theme({ color: 'link', flexShrink: 0, pt: '2px' })}
    >
      <Check size={18} />
    </Box>
    <Text
      css={theme({ fontSize: [1, 1, 2, 2], color: 'black80', lineHeight: 2 })}
    >
      {children}
    </Text>
  </Flex>
)

export const OverviewSection = ({
  title,
  body,
  bullets,
  sample,
  sampleTitle
}) => (
  <FeatureSection id='overview'>
    {title && (
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>{title}</Eyebrow>
    )}
    <Flex
      css={theme({
        gap: [4, 4, 5, 5],
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch'
      })}
    >
      <Box css={theme({ flex: '1 1 0', minWidth: 0 })}>
        {typeof body === 'string'
          ? (
            <BodyText>{body}</BodyText>
            )
          : (
            <Box
              css={theme({
                fontSize: [2, 2, 2, 2],
                lineHeight: 2,
                color: 'black',
                maxWidth: layout.large
              })}
            >
              {body}
            </Box>
            )}
        {bullets?.length > 0 && (
          <Box
            as='ul'
            css={theme({
              listStyle: 'none',
              p: 0,
              m: 0,
              pt: [3, 3, 4, 4],
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            })}
          >
            {bullets.map(bullet => (
              <CheckItem key={typeof bullet === 'string' ? bullet : bullet.key}>
                {typeof bullet === 'string' ? bullet : bullet.label}
              </CheckItem>
            ))}
          </Box>
        )}
      </Box>
      {sample && (
        <Box css={theme({ flex: '1 1 0', minWidth: 0 })}>
          <CodeEditor
            title={sampleTitle || 'response.json'}
            language='json'
            css={theme({ width: '100%' })}
          >
            {sample}
          </CodeEditor>
        </Box>
      )}
    </Flex>
  </FeatureSection>
)

const StepCard = styled(Box)`
  ${theme({
    flex: '1 1 0',
    minWidth: 0,
    textAlign: 'left'
  })}
`

export const HowItWorksSection = ({ steps }) => (
  <FeatureSection id='how-it-works'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>How it works</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      Four steps. One request.
    </Subhead>
    <Flex
      css={theme({
        gap: [3, 3, 4, 4],
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch'
      })}
    >
      {steps.map(({ title, description, icon }, index) => (
        <StepCard key={title}>
          <Flex css={theme({ alignItems: 'center', gap: 2, pb: 2 })}>
            <Flex
              aria-hidden='true'
              css={theme({
                width: '36px',
                height: '36px',
                borderRadius: 2,
                bg: ACCENT.bgSoft,
                border: 1,
                borderColor: ACCENT.bgEdge,
                alignItems: 'center',
                justifyContent: 'center',
                color: 'secondary'
              })}
            >
              {icon || (
                <Text
                  css={theme({
                    fontFamily: 'mono',
                    fontSize: 0,
                    fontWeight: 'bold'
                  })}
                >
                  {String(index + 1).padStart(2, '0')}
                </Text>
              )}
            </Flex>
            <Text
              css={theme({ fontWeight: 'bold', fontSize: 2, color: 'black' })}
            >
              {title}
            </Text>
          </Flex>
          <Text css={theme({ fontSize: 1, color: 'black70', lineHeight: 2 })}>
            {description}
          </Text>
        </StepCard>
      ))}
    </Flex>
  </FeatureSection>
)

export const QuickStartSection = ({
  languages,
  description,
  playgroundHref,
  playgroundLabel = 'Try it in Playground →'
}) => (
  <FeatureSection id='quick-start'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>Quick start</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      Copy, paste, run.
    </Subhead>
    <Flex
      css={theme({
        gap: [4, 4, 5, 5],
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'flex-start'
      })}
    >
      <Box css={theme({ flex: '1 1 65%', minWidth: 0, width: '100%' })}>
        <MultiCodeEditor languages={languages} />
      </Box>
      <Box css={theme({ flex: '1 1 35%', minWidth: 0 })}>
        {description && (
          <Text
            css={theme({
              fontSize: 1,
              color: 'black70',
              lineHeight: 2,
              pb: 3
            })}
          >
            {description}
          </Text>
        )}
        {playgroundHref && (
          <ArrowLink
            href={playgroundHref}
            css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
          >
            {playgroundLabel}
          </ArrowLink>
        )}
      </Box>
    </Flex>
  </FeatureSection>
)
