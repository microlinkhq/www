import React, { useState } from 'react'
import styled from 'styled-components'
import {
  SECTION_VERTICAL_SPACING,
  breakpoints,
  layout,
  theme,
  shadows,
  transition
} from 'theme'

import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import List from 'components/patterns/List/List'
import { Eyebrow } from 'components/patterns/FeatureStory'
import { HeroEditorTabs } from 'components/patterns/MultiCodeEditor/hero-editor-tabs'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import {
  Heading,
  Caption,
  STORY_LAYOUT,
  CENTERED_TO_LEFT,
  CENTERED_TO_START
} from 'components/patterns/ProductStory'

import { HERO, HERO_EXAMPLES, HERO_PROOF } from './shared'

const EDITOR_CARD_WIDTH = layout.small
const EDITOR_CARD_HEIGHT = 168

const EditorStage = styled(Flex)`
  ${theme({
    width: ['100%', '100%', EDITOR_CARD_WIDTH, EDITOR_CARD_WIDTH],
    maxWidth: '100%',
    justifyContent: 'center',
    pb: [4, 4, 4, 5],
    px: [2, 3, 0, 0]
  })};

  & > div,
  & > div > div:first-child {
    width: 100%;
  }

  & [role='application'] {
    box-shadow: ${shadows[4]};
  }

  @media (min-width: ${breakpoints[2]}) {
    @media (hover: hover) and (pointer: fine) {
      @media (prefers-reduced-motion: no-preference) {
        & [role='application'] {
          transform: perspective(1000px) rotateX(10deg) rotateY(0deg)
            scale3d(1, 1, 1);
          transition: transform ${transition.medium};
        }

        &:hover [role='application'],
        &:focus-within [role='application'] {
          transform: perspective(1000px) rotateX(-0deg) rotateY(0deg)
            scale3d(1, 1, 1);
        }
      }
    }
  }
`

const proofItemCss = theme({
  m: 0,
  mb: 0,
  color: 'black80',
  fontSize: [1, 1, 2, 2],
  textAlign: 'left'
})

export const Hero = () => {
  const [exampleIndex, setExampleIndex] = useState(0)
  const active = HERO_EXAMPLES[exampleIndex]

  return (
    <Container
      as='section'
      id='hero'
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
          <Eyebrow
            as='p'
            css={theme({
              textAlign: 'center',
              width: '100%'
            })}
          >
            {HERO.eyebrow}
          </Eyebrow>
          <Heading
            variant={null}
            css={theme({
              px: [2, 3, 4, 0],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: CENTERED_TO_LEFT,
              color: 'black'
            })}
          >
            {HERO.title}
          </Heading>
          <Caption
            forwardedAs='p'
            titleize={false}
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              textAlign: CENTERED_TO_LEFT
            })}
          >
            {HERO.description}
          </Caption>
          <Flex
            css={theme({
              pt: [4, 4, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              gap: 3,
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['stretch', 'stretch', 'center', 'center'],
              justifyContent: CENTERED_TO_START
            })}
          >
            <Button as='a' href={HERO.ctaHref}>
              {HERO.ctaLabel}
            </Button>
            <Button as='a' href={HERO.docsHref} variant='white'>
              {HERO.docsLabel}
            </Button>
          </Flex>
          <List
            css={theme({
              pt: [4, 4, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              alignItems: CENTERED_TO_START
            })}
          >
            {HERO_PROOF.map((point, index) => (
              <List.Item
                key={point}
                isLast={index === HERO_PROOF.length - 1}
                css={proofItemCss}
              >
                {point}
              </List.Item>
            ))}
          </List>
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
          <EditorStage>
            <MultiCodeEditorInteractive
              height={EDITOR_CARD_HEIGHT}
              mqlCode={active.mqlCode}
              contentId='api-hero-editor'
              contentRole='tabpanel'
              contentLabelledBy={`api-hero-tab-${exampleIndex}`}
              headerContent={
                <HeroEditorTabs
                  examples={HERO_EXAMPLES}
                  selectedIndex={exampleIndex}
                  onSelect={setExampleIndex}
                  ariaLabel='API examples'
                  idPrefix='api-hero-tab'
                  controlsId='api-hero-editor'
                />
              }
            />
          </EditorStage>
        </Flex>
      </Flex>
    </Container>
  )
}
