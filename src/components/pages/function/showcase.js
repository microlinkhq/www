import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, shadows, theme } from 'theme'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import {
  Caption,
  Subhead,
  STORY_LAYOUT
} from 'components/patterns/ProductStory'

import { SHOWCASE } from './product-shared'

const EDITOR_FRAME = {
  '& > div, & > div > div:first-child': {
    width: '100%'
  },
  '& > div > div:first-child': {
    boxShadow: shadows[4]
  }
}

const ShowcaseFeature = ({ title, description, href, cta, mql }) => (
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
        alignItems: ['center', 'center', 'center', 'flex-start']
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          textAlign: ['center', 'center', 'center', 'left'],
          width: '100%'
        })}
      >
        {title}
      </Subhead>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          textAlign: ['center', 'center', 'center', 'left'],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        {description}
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          width: '100%',
          fontSize: [2, 2, 3, 3],
          justifyContent: ['center', 'center', 'center', 'flex-start']
        })}
      >
        <ArrowLink href={href}>{cta || 'Read the docs'}</ArrowLink>
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
            width: ['100%', '100%', '85%', '100%'],
            justifyContent: 'center',
            pt: [0, 0, 4, 4],
            pb: [4, 4, 4, 5],
            px: [2, 3, 0, 0]
          }),
          EDITOR_FRAME
        ]}
      >
        <MultiCodeEditorInteractive height={320} mqlCode={mql} />
      </Flex>
    </Flex>
  </Flex>
)

export const FunctionShowcase = () => (
  <Container
    as='section'
    id='how'
    css={theme({
      alignItems: 'center',
      width: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      flexDirection='column'
      css={theme({
        width: '100%',
        gap: [5, 5, 5, 5]
      })}
    >
      <Flex
        flexDirection='column'
        css={theme({
          width: '100%',
          maxWidth: STORY_LAYOUT.maxWidth,
          mx: 'auto',
          alignItems: 'center',
          textAlign: 'center',
          px: [3, 3, 4, 0]
        })}
      >
        <Subhead titleize={false}>{SHOWCASE.title}</Subhead>
        <Caption
          forwardedAs='p'
          titleize={false}
          css={theme({
            pt: [3, 3, 4, 4],
            mx: 'auto',
            maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
          })}
        >
          {SHOWCASE.caption}
        </Caption>
      </Flex>
      {SHOWCASE.items.map(item => (
        <ShowcaseFeature key={item.title} {...item} />
      ))}
    </Flex>
  </Container>
)
