import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import {
  METHOD_GROUPS,
  Section,
  SectionHeader
} from 'components/pages/client/shared'

import { space, theme } from 'theme'

const CARD_WIDTH = ['100%', `calc(50% - ${space[2]})`, '272px', '272px']

const MethodCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    gap: 2,
    width: CARD_WIDTH,
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

const MethodGroup = ({ label, caption, accent, methods }) => (
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
    <Flex
      as='ul'
      style={{
        '--method-accent': accent.dot,
        '--method-shadow': accent.shadow
      }}
      css={theme({
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
        pt: [3, 3, 4, 4],
        px: 0,
        pb: 0,
        m: 0,
        width: '100%'
      })}
    >
      {methods.map(method => (
        <MethodItem key={method.title} method={method} accent={accent} />
      ))}
    </Flex>
  </Box>
)

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
