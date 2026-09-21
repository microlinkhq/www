import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Terminal from 'components/elements/Terminal/Terminal'
import List from 'components/patterns/List/List'
import ArrowLink from 'components/patterns/ArrowLink'
import { Eyebrow } from 'components/patterns/FeatureStory'
import {
  Heading,
  Caption,
  STORY_LAYOUT
} from 'components/patterns/ProductStory'

import { HERO, HERO_PROOF, INSTALL_PROMPT } from './shared'

const EDITOR_FRAME = {
  '& > div, & > div > div:first-child': {
    width: '100%'
  }
}

const proofItemCss = theme({
  color: 'black80',
  fontSize: [1, 1, 2, 2],
  textAlign: 'left'
})

const InstallPanel = () => (
  <Box
    css={theme({
      fontFamily: 'sans',
      px: [3, 4],
      py: [3, 4],
      textAlign: 'left',
      whiteSpace: 'normal'
    })}
  >
    <Text
      css={theme({
        color: 'black',
        fontSize: 1,
        fontWeight: 'regular',
        lineHeight: 2
      })}
    >
      Paste this into your agent.
    </Text>
    <Text
      css={theme({
        mt: 1,
        color: 'black60',
        fontSize: 0,
        lineHeight: 2
      })}
    >
      Claude, Cursor, ChatGPT, Codex, or any agent that loads skills.
    </Text>
    <Box
      css={theme({
        mt: 3,
        px: 3,
        py: 3,
        bg: 'gray1',
        border: 1,
        borderColor: 'black10',
        borderRadius: 2,
        overflow: 'auto'
      })}
    >
      <Text
        as='pre'
        css={theme({
          color: 'black80',
          fontFamily: 'mono',
          fontSize: 0,
          lineHeight: 2,
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap'
        })}
      >
        {INSTALL_PROMPT}
      </Text>
    </Box>
    <Text
      css={theme({
        mt: 3,
        color: 'black60',
        fontSize: 0,
        hyphens: 'none'
      })}
    >
      One skill. It covers every Microlink product.
    </Text>
  </Box>
)

export const Hero = () => (
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
          <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
            <ArrowLink href={HERO.skillHref}>{HERO.skillLabel}</ArrowLink>
          </Flex>
          <List css={theme({ pt: 4, alignItems: 'flex-start' })}>
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
        <Flex
          css={[
            theme({
              width: '100%',
              maxWidth: '700px',
              justifyContent: 'center',
              pb: [4, 4, 4, 5],
              px: [2, 3, 0, 0]
            }),
            EDITOR_FRAME
          ]}
        >
          <Terminal
            autoHeight
            blinkCursor={false}
            text={INSTALL_PROMPT}
            contentId='ai-hero-install'
          >
            <InstallPanel />
          </Terminal>
        </Flex>
      </Flex>
    </Flex>
  </Container>
)
