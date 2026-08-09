import React from 'react'
import styled, { keyframes } from 'styled-components'
import { shadows, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

export const DEMO_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const windowIn = (start, end = 92) => keyframes`
  0%, ${start}% { opacity: 0; transform: translateY(4px); }
  ${start + 4}%, ${end}% { opacity: 1; transform: translateY(0); }
  ${Math.min(end + 4, 100)}%, 100% { opacity: 0; transform: translateY(4px); }
`

export const phaseWindow = (from, to) => keyframes`
  0%, ${from}% { opacity: ${from === 0 ? 1 : 0}; }
  ${Math.min(from + 4, 100)}%, ${to}% { opacity: 1; }
  ${Math.min(to + 4, 100)}%, 100% { opacity: ${to >= 96 ? 1 : 0}; }
`

export const caretBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const Card = styled(Box)(
  theme({
    width: '100%',
    mx: 'auto',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: shadows[3],
    fontFamily: 'sans'
  })
)

const Header = styled(Flex)(
  theme({
    alignItems: 'center',
    gap: 2,
    px: 3,
    py: '10px',
    bg: 'gray0',
    borderBottom: 1,
    borderBottomColor: 'gray2'
  })
)

const Dot = styled(Box)(
  theme({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    bg: 'gray3',
    flexShrink: 0
  })
)

const HeaderUrl = styled(Text)(
  theme({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'black50',
    minWidth: 0
  }),
  'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
)

const Footer = styled(Box)(
  theme({
    px: 3,
    py: '10px',
    borderTop: 1,
    borderTopColor: 'gray2',
    fontFamily: 'mono',
    fontSize: '12px',
    display: 'grid',
    alignItems: 'center'
  })
)

export const DemoCard = ({ url, footer, maxWidth = '440px', children }) => (
  <Card aria-hidden='true' css={{ maxWidth }}>
    {url && (
      <Header>
        <Flex css={theme({ gap: 1 })}>
          <Dot />
          <Dot />
          <Dot />
        </Flex>
        <HeaderUrl as='span'>{url}</HeaderUrl>
      </Header>
    )}
    {children}
    <Footer>{footer}</Footer>
  </Card>
)
