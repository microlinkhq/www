import { layout, theme } from 'theme'
import React from 'react'
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
  bullets,
  sample,
  sampleTitle,
  sampleLanguage = 'json',
  samples,
  sampleAliases
}) => (
  <FeatureSection id='overview'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    {title && (
      <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
        {title}
      </Subhead>
    )}
    <Box css={theme({ maxWidth: layout.large })}>
      {typeof body === 'string'
        ? (
          <BodyText>{body}</BodyText>
          )
        : (
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
          )}
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
          {bullets.map((bullet, index) => {
            const content =
              typeof bullet === 'string' || React.isValidElement(bullet)
                ? bullet
                : bullet.label
            const key =
              typeof bullet === 'string'
                ? bullet
                : bullet.key || `bullet-${index}`
            return <CheckItem key={key}>{content}</CheckItem>
          })}
        </Box>
      )}
    </Box>
    {samples && (
      <Box css={theme({ pt: [4, 4, 5, 5], width: '100%', minWidth: 0 })}>
        <MultiCodeEditor
          languages={samples}
          aliases={sampleAliases}
          storageKey='feature-overview-samples'
          defaultIndex={0}
        />
      </Box>
    )}
    {!samples && sample && (
      <Box css={theme({ pt: [4, 4, 5, 5], maxWidth: layout.large })}>
        <CodeEditor
          title={sampleTitle || 'response.json'}
          language={sampleLanguage}
          css={theme({ width: '100%' })}
        >
          {sample}
        </CodeEditor>
      </Box>
    )}
  </FeatureSection>
)

export const HowItWorksSection = ({
  eyebrow = 'How it works',
  title,
  steps
}) => (
  <FeatureSection id='how-it-works'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {title}
    </Subhead>
    <Box
      as='ol'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: [4, 4, 5, 5]
      })}
    >
      {steps.map(({ title, description, icon }, index) => (
        <Flex
          as='li'
          key={title}
          css={theme({ gap: 3, alignItems: 'flex-start', minWidth: 0 })}
        >
          <Flex
            aria-hidden='true'
            css={theme({
              width: '40px',
              height: '40px',
              borderRadius: 2,
              bg: ACCENT.bgSoft,
              border: 1,
              borderColor: ACCENT.bgEdge,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'secondary',
              flexShrink: 0
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
          <Box css={theme({ minWidth: 0, pt: 1 })}>
            <Text
              css={theme({
                fontFamily: 'sans',
                fontWeight: 'bold',
                fontSize: 2,
                color: 'black',
                pb: 2
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
              {description}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  </FeatureSection>
)

export const QuickStartSection = ({
  eyebrow = 'Quick start',
  title,
  languages,
  description,
  playgroundHref,
  playgroundLabel = 'Try it in Playground'
}) => (
  <FeatureSection id='quick-start'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {title}
    </Subhead>
    {(description || playgroundHref) && (
      <Box css={theme({ pb: [3, 3, 4, 4], maxWidth: layout.normal })}>
        {description && (
          <Text
            css={theme({
              fontFamily: 'sans',
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 2,
              pb: playgroundHref ? 3 : 0
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
    )}
    <Box css={theme({ width: '100%', minWidth: 0 })}>
      <MultiCodeEditor languages={languages} />
    </Box>
  </FeatureSection>
)

export const ProductsSection = ({
  eyebrow = 'Products',
  title,
  description,
  products
}) => (
  <FeatureSection id='products'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {title}
    </Subhead>
    {description && (
      <Text
        css={theme({
          fontFamily: 'sans',
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 2,
          pb: [3, 3, 4, 4],
          maxWidth: layout.normal
        })}
      >
        {description}
      </Text>
    )}
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr)',
          'repeat(2, minmax(0, 1fr))',
          'repeat(2, minmax(0, 1fr))'
        ],
        gap: [3, 3, 4, 4]
      })}
    >
      {products.map(({ method, description: productDescription, snippet }) => (
        <Box
          key={method}
          css={theme({
            p: [3, 3, 4, 4],
            border: 1,
            borderColor: 'gray2',
            borderRadius: 3,
            bg: 'white',
            minWidth: 0
          })}
        >
          <Text
            as='code'
            css={theme({
              fontFamily: 'mono',
              fontSize: 1,
              fontWeight: 'bold',
              color: 'secondary',
              display: 'block',
              pb: 2
            })}
          >
            {method}
          </Text>
          <Text
            css={theme({
              fontFamily: 'sans',
              fontSize: 1,
              color: 'black70',
              lineHeight: 2,
              pb: 3
            })}
          >
            {productDescription}
          </Text>
          {snippet && (
            <Box
              as='pre'
              css={theme({
                m: 0,
                p: 3,
                bg: 'gray1',
                borderRadius: 2,
                fontFamily: 'mono',
                fontSize: 0,
                color: 'black70',
                overflowX: 'auto',
                lineHeight: 2
              })}
            >
              {snippet}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  </FeatureSection>
)
