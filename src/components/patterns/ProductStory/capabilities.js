import React from 'react'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, space, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import { Subhead, STORY_LAYOUT } from './shared'

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};
  color: var(--capability-accent);
`

export const ProductCapabilities = ({
  title,
  titleAccent,
  titleBreak = true,
  caption,
  items,
  accent,
  visual
}) => (
  <Container
    id='capabilities'
    as='section'
    style={{ '--capability-accent': accent }}
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      px: [3, 3, 4, 5],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: STORY_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: [4, 4, 5, STORY_LAYOUT.gap[3]]
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', STORY_LAYOUT.mainWidth],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Box css={theme({ width: ['100%', '100%', '80%', '100%'] })}>
          {visual}
        </Box>
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', STORY_LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          gap: [3, 3, 4, 4]
        })}
      >
        <Subhead
          css={theme({
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          {title}
          {titleBreak ? <LineBreak /> : ' '}
          <span css={{ color: 'var(--capability-accent)' }}>{titleAccent}</span>
        </Subhead>
        {caption && (
          <Text
            as='p'
            css={theme({
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            {caption}
          </Text>
        )}
        <Flex
          css={[
            theme({
              gap: [3, 3, 3, 4],
              width: '100%',
              flexDirection: ['column', 'column', 'row', 'column'],
              flexWrap: ['nowrap', 'nowrap', 'wrap', 'nowrap']
            }),
            {
              '@media (min-width: 768px) and (max-width: 1199px)': {
                '& > *': { width: 'calc(50% - 12px)' }
              }
            }
          ]}
        >
          {items.map(({ icon: Icon, title: itemTitle, description }) => (
            <CapabilityItem key={itemTitle}>
              <CapabilityIcon>
                <Icon size={20} aria-hidden='true' />
              </CapabilityIcon>
              <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2]
                  })}
                >
                  {itemTitle}
                </Text>
                <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
                  {description}
                </Text>
              </Flex>
            </CapabilityItem>
          ))}
        </Flex>
      </Flex>
    </Flex>
  </Container>
)
