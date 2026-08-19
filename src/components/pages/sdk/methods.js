import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import {
  ContentMockup,
  CollectionsMockup,
  SpecializedMockup
} from 'components/pages/sdk/mockups'

import {
  METHOD_GROUPS,
  Section,
  SectionHeader
} from 'components/pages/sdk/shared'

import { colors, space, theme } from 'theme'

const GROUP_MOCKUPS = {
  content: ContentMockup,
  collections: CollectionsMockup,
  specialized: SpecializedMockup
}

const MethodCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    gap: 2,
    width: '100%',
    p: 3,
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    listStyle: 'none',
    textAlign: 'left'
  })}
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: var(--method-accent);
    box-shadow: 0 16px 32px -20px var(--method-shadow);
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
`

const MethodIconChip = ({ accent, children }) => (
  <Flex
    css={theme({
      width: space[4],
      height: space[4],
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      bg: accent.chipBg,
      border: 1,
      borderColor: accent.chipBorder,
      borderRadius: 3
    })}
    aria-hidden='true'
  >
    {children}
  </Flex>
)

const MethodItem = ({ method, accent }) => {
  const Icon = method.icon

  return (
    <MethodCard as='li'>
      <Flex css={theme({ alignItems: 'center', gap: 2 })}>
        <MethodIconChip accent={accent}>
          <Icon
            size={18}
            strokeWidth={2.25}
            color={accent.icon}
            aria-hidden='true'
          />
        </MethodIconChip>
        <Text
          as='h4'
          css={theme({
            m: 0,
            fontFamily: 'mono',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black80'
          })}
        >
          .{method.title}()
        </Text>
      </Flex>
      <Text
        css={theme({
          m: 0,
          color: 'black60',
          fontSize: 0,
          lineHeight: 2
        })}
      >
        {method.description}
      </Text>
    </MethodCard>
  )
}

const GroupStage = ({ accent, children }) => (
  <Flex
    aria-hidden='true'
    css={theme({
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 0,
      p: [3, 3, 4, 4],
      borderRadius: 3,
      border: 1,
      borderColor: 'black05'
    })}
    style={{
      background: `linear-gradient(135deg, ${
        colors[accent.chipBg]
      } 0%, #ffffff 85%)`
    }}
  >
    {children}
  </Flex>
)

const MethodGroup = ({ id, label, caption, accent, methods }) => {
  const Mockup = GROUP_MOCKUPS[id]

  return (
    <Box css={theme({ pt: [4, 4, 5, 5], width: '100%' })}>
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        })}
      >
        <Box
          css={theme({
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            bg: accent.dot,
            flexShrink: 0
          })}
          aria-hidden='true'
        />
        <Caps
          as='h3'
          css={theme({
            fontWeight: 'bold',
            color: 'black70',
            letterSpacing: 2
          })}
        >
          {label}
        </Caps>
      </Flex>
      <Text
        css={theme({
          m: 0,
          pt: 2,
          color: 'black60',
          textAlign: 'center'
        })}
      >
        {caption}
      </Text>
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            'minmax(0, 1fr)',
            'minmax(0, 1fr)',
            'minmax(0, 5fr) minmax(0, 7fr)',
            'minmax(0, 5fr) minmax(0, 7fr)'
          ],
          gap: [3, 3, 4, 4],
          pt: [3, 3, 4, 4],
          alignItems: 'stretch',
          width: '100%'
        })}
      >
        {Mockup && (
          <GroupStage accent={accent}>
            <Mockup accent={accent} />
          </GroupStage>
        )}
        <Box
          as='ul'
          style={{
            '--method-accent': accent.dot,
            '--method-shadow': accent.shadow
          }}
          css={theme({
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr'],
            gap: 3,
            alignItems: 'stretch',
            px: 0,
            py: 0,
            m: 0,
            minWidth: 0,
            width: '100%'
          })}
        >
          {methods.map(method => (
            <MethodItem key={method.title} method={method} accent={accent} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const Methods = () => (
  <Section id='methods'>
    <SectionHeader
      title='Every product is a method.'
      caption='All of them follow the same contract: same authentication, same errors, same response shape.'
    />
    <Box
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        width: '100%'
      })}
    >
      {METHOD_GROUPS.map(({ id, label, caption, accent, methods }) => (
        <MethodGroup
          key={id}
          id={id}
          label={label}
          caption={caption}
          accent={accent}
          methods={methods}
        />
      ))}
    </Box>
  </Section>
)

export default Methods
