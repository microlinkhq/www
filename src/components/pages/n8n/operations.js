import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import {
  ACCENT_CHIP,
  OPERATIONS,
  Section,
  SectionHeader
} from 'components/pages/n8n/shared'

import { colors, space, theme, transition } from 'theme'

const OperationCard = styled(Flex)`
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
  transition: border-color ${transition.short}, box-shadow ${transition.short};

  &:hover {
    border-color: ${colors[ACCENT_CHIP.border]};
    box-shadow: 0 16px 32px -20px ${ACCENT_CHIP.shadow};
  }

  @media (prefers-reduced-motion: no-preference) {
    @media (hover: hover) and (pointer: fine) {
      transition: transform ${transition.short},
        border-color ${transition.short}, box-shadow ${transition.short};

      &:hover {
        transform: translateY(-1px);
      }
    }
  }
`

const OperationIconChip = ({ children }) => (
  <Flex
    css={theme({
      width: space[4],
      height: space[4],
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      bg: ACCENT_CHIP.bg,
      border: 1,
      borderColor: ACCENT_CHIP.border,
      borderRadius: 3
    })}
    aria-hidden='true'
  >
    {children}
  </Flex>
)

const OperationItem = ({ operation }) => {
  const Icon = operation.icon

  return (
    <OperationCard as='li'>
      <Flex css={theme({ alignItems: 'center', gap: 2 })}>
        <OperationIconChip>
          <Icon
            size={18}
            strokeWidth={2.25}
            color={colors[ACCENT_CHIP.icon]}
            aria-hidden='true'
          />
        </OperationIconChip>
        <Text
          as='h3'
          css={theme({
            m: 0,
            fontFamily: 'mono',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black80'
          })}
        >
          {operation.name}
        </Text>
      </Flex>
      <Text
        css={theme({
          m: 0,
          color: 'black',
          fontSize: 0,
          fontWeight: 'bold',
          lineHeight: 2
        })}
      >
        {operation.description}
      </Text>
      <Text
        css={theme({
          m: 0,
          color: 'black60',
          fontSize: 0,
          lineHeight: 2
        })}
      >
        {operation.detail}
      </Text>
    </OperationCard>
  )
}

const Operations = () => (
  <Section id='operations'>
    <SectionHeader
      title='One node, nine operations.'
      caption='Pick the operation, pass the URL. The API decides when a page needs a real browser, so content that only exists after JavaScript runs is still read.'
    />
    <Box
      as='ul'
      css={theme({
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr) minmax(0, 1fr)',
          'repeat(3, minmax(0, 1fr))',
          'repeat(3, minmax(0, 1fr))'
        ],
        gap: 3,
        alignItems: 'stretch',
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        mt: [4, 4, 5, 5],
        mb: 0,
        px: 0,
        py: 0,
        width: '100%'
      })}
    >
      {OPERATIONS.map(operation => (
        <OperationItem key={operation.value} operation={operation} />
      ))}
    </Box>
  </Section>
)

export default Operations
