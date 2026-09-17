import React, { useState } from 'react'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, layout, theme, shadows } from 'theme'

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
  STORY_LAYOUT
} from 'components/patterns/ProductStory'

import { HERO, HERO_EXAMPLES, HERO_PROOF } from './shared'

const EDITOR_ASPECT_RATIO = 1.586

const EditorStage = styled(Flex)`
  ${theme({
    width: '100%',
    maxWidth: '700px',
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
    aspect-ratio: ${EDITOR_ASPECT_RATIO} / 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  & [role='tabpanel'] {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  & [role='tabpanel'] > div {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  & [role='tabpanel'] [aria-live] {
    flex: 1;
    min-height: 0;
    height: auto !important;
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
            alignItems: 'center',
            px: [2, 3, 4, 0]
          })}
        >
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: layout.small
            })}
          >
            <Eyebrow as='p' css={theme({ textAlign: 'center' })}>
              {HERO.eyebrow}
            </Eyebrow>
            <Heading
              variant={null}
              css={theme({
                textAlign: 'center',
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
                textAlign: 'center'
              })}
            >
              {HERO.description}
            </Caption>
            <Flex
              css={theme({
                pt: [4, 4, 4, 4],
                width: '100%',
                gap: 3,
                flexDirection: ['column', 'column', 'row', 'row'],
                alignItems: ['stretch', 'stretch', 'center', 'center'],
                justifyContent: 'center'
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
                alignItems: 'flex-start'
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
              mqlCode={active.mqlCode}
              showAction={false}
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
