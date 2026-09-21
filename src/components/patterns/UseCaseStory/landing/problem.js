import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import {
  Figure,
  FigureImage,
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'

import { inline } from './inline-links'
import { apiUrlFor } from './request'
import { ACCENT } from '../use-cases'

const LiveImage = ({ figure }) => (
  <FigureImage
    src={apiUrlFor(figure.request)}
    alt={figure.alt}
    width={figure.width}
    height={figure.height}
    loading='eager'
    decoding='async'
    css={theme({ maxWidth: figure.maxWidth || '800px', bg: 'black05' })}
  />
)

const ContainedImage = ({ figure }) => (
  <Box
    css={theme({
      position: 'relative',
      width: '100%',
      maxWidth: figure.maxWidth || '800px',
      mx: 'auto',
      borderRadius: 3,
      boxShadow: 1,
      bg: 'black05',
      overflow: 'hidden',
      aspectRatio: `${figure.width} / ${figure.height}`
    })}
  >
    <FigureImage
      src={apiUrlFor(figure.request)}
      alt={figure.alt}
      width={figure.width}
      height={figure.height}
      loading='eager'
      decoding='async'
      css={theme({
        position: 'absolute',
        inset: 0,
        maxWidth: '100%',
        height: '100%',
        objectFit: 'contain',
        boxShadow: 'none',
        borderRadius: 0
      })}
    />
  </Box>
)

const LiveFigure = ({ figure }) => (
  <Figure css={theme({ pt: 0, pb: 5 })}>
    {figure.fit === 'contain'
      ? (
        <ContainedImage figure={figure} />
        )
      : (
        <LiveImage figure={figure} />
        )}
    {figure.caption && (
      <Text
        as='figcaption'
        css={theme({
          color: 'black60',
          fontSize: 0,
          pt: 3,
          textAlign: 'center'
        })}
      >
        {inline(figure.caption)}
      </Text>
    )}
  </Figure>
)

export const ProblemSection = ({ problem }) => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      {problem.figure && <LiveFigure figure={problem.figure} />}
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        {problem.eyebrow || 'The problem'}
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        {problem.title}
      </Subhead>
      {problem.paragraphs.map((paragraph, index) => (
        <Text
          as='p'
          key={paragraph}
          css={theme({
            pb: index < problem.paragraphs.length - 1 ? 4 : 0
          })}
        >
          {inline(paragraph)}
        </Text>
      ))}
      {problem.live && (
        <Box css={theme({ pt: [3, 3, 4, 4] })}>
          <ArrowLink
            href={apiUrlFor(problem.live.request)}
            css={theme({
              color: 'link',
              fontWeight: 'bold',
              fontSize: [1, 2, 2, 2]
            })}
          >
            {problem.live.label}
          </ArrowLink>
        </Box>
      )}
    </SectionInner>
  </Section>
)
