import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { borders, colors, layout, radii, theme, transition } from 'theme'

const CLIENTS = [
  {
    name: 'Community',
    description: 'Fan engagement platform',
    url: 'https://community.com',
    logo: (
      <img
        src='/images/clients/community.com.png'
        alt='Community'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Impact',
    description: 'Partnership management',
    url: 'https://impact.com',
    logo: (
      <img
        src='/images/clients/impact.com.png'
        alt='Impact'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Mirror',
    description: 'Web3 publishing platform',
    url: 'https://mirror.xyz',
    logo: (
      <img
        src='/images/clients/mirror.xyz.png'
        alt='Mirror'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Padlet',
    description: 'Visual collaboration tool',
    url: 'https://padlet.com',
    logo: (
      <img
        src='/images/clients/padlet.com.png'
        alt='Padlet'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'SkedSocial',
    description: 'Marketing platform',
    url: 'https://skedsocial.com',
    logo: (
      <img
        src='/images/clients/skedsocial.com.png'
        alt='Sked Social'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  }
]

const ClientLogo = styled(Flex)`
  ${theme({ textDecoration: 'none' })};
  color: inherit;
  transition: transform ${transition.short};

  &:hover {
    transform: translateY(-${radii[1]}) scale(1.05);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
    border-radius: ${radii[3]};
  }
`

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const Clients = () => (
  <Container
    as='section'
    id='clients'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4]
    })}
  >
    <Caps
      css={theme({
        fontSize: [0, 1, 1, 1],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3,
        textAlign: 'center'
      })}
    >
      Trusted by teams shipping to production
    </Caps>

    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 4, 0],
        flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [4, 4, 5, 5],
        maxWidth: layout.large,
        width: '100%'
      })}
    >
      {CLIENTS.map(({ name, description, logo, url }) => (
        <ClientLogo
          as='a'
          key={name}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${name}`}
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          })}
        >
          <Box css={theme({ color: 'black' })}>{logo}</Box>
          <Text
            css={theme({
              fontWeight: 'bold',
              fontSize: 1,
              color: 'black'
            })}
          >
            {name}
          </Text>
          <Text
            css={theme({ fontSize: 0, color: 'black80', textAlign: 'center' })}
          >
            {description}
          </Text>
        </ClientLogo>
      ))}
    </Flex>
  </Container>
)

export default Clients
