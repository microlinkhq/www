import React from 'react'
import { ArrowRight } from 'react-feather'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, layout, theme, transition } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from '../Caption/Caption'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const CardLink = styled(Link)`
  ${theme({
    display: 'block',
    height: '100%',
    textDecoration: 'none',
    color: 'inherit',
    touchAction: 'manipulation',
    _hover: { color: 'inherit' }
  })};
  -webkit-tap-highlight-color: transparent;

  a {
    display: block;
    height: 100%;
  }
`

const Card = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    height: '100%',
    bg: 'white',
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    p: [3, 3, 4, 4]
  })};
  transition: border-color ${transition.medium}, box-shadow ${transition.medium};

  ${CardLink}:hover &,
  ${CardLink}:focus-within & {
    border-color: var(--lang-accent);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`

const Arrow = styled(Flex)`
  ${theme({ alignItems: 'center', flexShrink: 0 })};

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${transition.medium};

    ${CardLink}:hover &,
    ${CardLink}:focus-within & {
      transform: translateX(2px);
    }
  }
`

const LangCard = ({ label, tagline, href, accent }) => (
  <CardLink href={href} style={{ '--lang-accent': accent }}>
    <Card>
      <Text
        as='h3'
        css={theme({
          fontWeight: 'bold',
          color: 'black',
          lineHeight: 1
        })}
      >
        {label}
      </Text>
      <Text
        css={theme({
          pt: 2,
          pb: 3,
          fontSize: [1, 1, 2, 2],
          color: 'black60',
          flex: 1
        })}
      >
        {tagline}
      </Text>
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 2,
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold'
        })}
        style={{ color: 'var(--lang-accent)' }}
      >
        <Text as='span' css={theme({ fontSize: 'inherit' })}>
          {`Read the ${label} guide`}
        </Text>
        <Arrow>
          <ArrowRight size={16} />
        </Arrow>
      </Flex>
    </Card>
  </CardLink>
)

export const LangLandings = ({ id, title, caption, langs, accent }) => (
  <Container
    as='section'
    id={id}
    css={theme({
      alignItems: 'center',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      maxWidth: '100%'
    })}
  >
    <Box
      css={theme({
        width: '100%',
        maxWidth: layout.normal,
        mx: 'auto',
        textAlign: 'center',
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead titleize={false} css={theme({ textAlign: 'center' })}>
        {title}
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({ pt: [3, 3, 4, 4], textAlign: 'center' })}
      >
        {caption}
      </Caption>
    </Box>
    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        mx: 'auto',
        gap: [3, 3, 4, 4],
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch'
      })}
    >
      {langs.map(({ lang, label, tagline, href }) => (
        <Box key={lang} css={theme({ flex: 1, minWidth: 0 })}>
          <LangCard
            label={label}
            tagline={tagline}
            href={href}
            accent={accent}
          />
        </Box>
      ))}
    </Flex>
  </Container>
)

export const LangLandingsNav = ({ langs, current, label, accent }) => {
  const siblings = langs.filter(item => item.lang !== current)
  if (siblings.length === 0) return null

  return (
    <Flex
      as='nav'
      aria-label={label}
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2,
        fontSize: [1, 1, 2, 2],
        color: 'black60'
      })}
    >
      <Text as='span' css={theme({ fontSize: 'inherit' })}>
        {`${label}:`}
      </Text>
      {siblings.map(({ lang, label: langLabel, href }, index) => (
        <Flex key={lang} css={theme({ alignItems: 'center', gap: 2 })}>
          {index > 0 && (
            <Text
              as='span'
              css={theme({ fontSize: 'inherit', color: 'black30' })}
            >
              ·
            </Text>
          )}
          <Link href={href} style={{ color: accent }}>
            {langLabel}
          </Link>
        </Flex>
      ))}
    </Flex>
  )
}

export default LangLandings
