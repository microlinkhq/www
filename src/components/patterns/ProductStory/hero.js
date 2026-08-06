import React, { useState } from 'react'
import styled from 'styled-components'
import {
  SECTION_VERTICAL_SPACING,
  colors,
  layout,
  theme,
  shadows,
  transition
} from 'theme'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'

import {
  Heading,
  Caption,
  STORY_LAYOUT,
  CENTERED_TO_LEFT,
  CENTERED_TO_START
} from './shared'

const EDITOR_FRAME = {
  '& > div, & > div > div:first-child': {
    width: '100%'
  },
  '& > div > div:first-child': {
    boxShadow: shadows[4]
  }
}

const ExamplePill = styled('button')(
  theme({
    px: 3,
    py: [2, 2, 1, 1],
    borderRadius: 2,
    border: 1,
    borderColor: 'black10',
    bg: 'white',
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black60'
  }),
  `
    cursor: pointer;
    touch-action: manipulation;
    white-space: nowrap;
    transition: color ${transition.medium}, border-color ${transition.medium};

    &:hover {
      color: ${colors.black80};
      border-color: ${colors.black20};
    }

    &[aria-pressed='true'] {
      color: var(--story-accent);
      border-color: var(--story-accent);
    }

    &:focus-visible {
      outline: 2px solid ${colors.link};
      outline-offset: 2px;
    }
  `
)

export const ProductHero = ({
  title,
  description,
  ctaHref,
  ctaLabel = 'Get Started',
  mqlCode,
  examples,
  accent,
  editorHeight = 320
}) => {
  const [exampleIndex, setExampleIndex] = useState(0)
  const activeMqlCode = examples ? examples[exampleIndex].mqlCode : mqlCode

  return (
    <Container
      as='section'
      id='hero'
      style={accent ? { '--story-accent': accent } : undefined}
      css={theme({
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        pt: [4, 4, 4, 5],
        pb: SECTION_VERTICAL_SPACING,
        px: [1, 1, 5, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: STORY_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: STORY_LAYOUT.gap
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', STORY_LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: CENTERED_TO_START
          })}
        >
          <Heading
            css={theme({
              px: [2, 3, 4, 0],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: CENTERED_TO_LEFT
            })}
          >
            {title}
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              textAlign: CENTERED_TO_LEFT
            })}
          >
            {description}
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: CENTERED_TO_START
            })}
          >
            <ArrowLink href={ctaHref}>{ctaLabel}</ArrowLink>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', STORY_LAYOUT.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          {examples && (
            <Flex
              role='group'
              aria-label='Conversion examples'
              css={theme({
                pt: [0, 0, 4, 4],
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center'
              })}
            >
              {examples.map(({ label }, index) => (
                <ExamplePill
                  key={label}
                  type='button'
                  aria-pressed={index === exampleIndex}
                  onClick={() => setExampleIndex(index)}
                >
                  {label}
                </ExamplePill>
              ))}
            </Flex>
          )}
          <Flex
            css={[
              theme({
                width: ['100%', '100%', '85%', '100%'],
                justifyContent: 'center',
                pt: examples ? [3, 3, 3, 3] : [0, 0, 4, 4],
                pb: [4, 4, 4, 5],
                px: [2, 3, 0, 0]
              }),
              EDITOR_FRAME
            ]}
          >
            <MultiCodeEditorInteractive
              key={exampleIndex}
              height={editorHeight}
              mqlCode={activeMqlCode}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
