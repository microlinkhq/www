import { theme, shadows, transition, shadowInk, colors } from 'theme'
import React from 'react'
import styled, { css } from 'styled-components'
import { ChevronRight } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'

import { ACCENT } from '../features'
import { Eyebrow } from '../primitives'
import { FeatureSection } from './shell'

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

const paramCardStyle = [
  theme({
    display: 'block',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    color: 'inherit',
    textDecoration: 'none',
    boxShadow: shadows[0],
    _hover: { color: 'inherit' }
  }),
  css`
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium}, transform ${transition.medium};

    > a {
      display: block;
      color: inherit;
      text-decoration: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${colors.gray4};
        box-shadow: ${CARD_HOVER_SHADOW};
      }

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  `
]

const ParamCardLink = styled(Link)(...paramCardStyle)
const ParamCardStatic = styled(Box)(
  theme({
    display: 'block',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    color: 'inherit',
    boxShadow: shadows[0]
  })
)

const ParamCardBody = ({ name, type, description, linked }) => (
  <>
    <Flex
      css={theme({
        gap: 3,
        alignItems: 'center',
        flexWrap: 'wrap',
        pb: 2
      })}
    >
      <Text
        as='code'
        css={theme({
          fontFamily: 'mono',
          fontSize: 1,
          fontWeight: 'bold',
          color: 'secondary',
          bg: ACCENT.bgSoft,
          px: 2,
          py: 1,
          borderRadius: 2
        })}
      >
        {name}
      </Text>
      <Text
        css={theme({
          fontFamily: 'mono',
          fontSize: 0,
          color: 'gray6'
        })}
      >
        {type}
      </Text>
      {linked && (
        <Box
          aria-hidden='true'
          css={theme({ ml: 'auto', color: 'secondary', flexShrink: 0 })}
        >
          <FeatherIcon icon={ChevronRight} />
        </Box>
      )}
    </Flex>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black80',
        lineHeight: 2
      })}
    >
      {description}
    </Text>
  </>
)

export const ParamsSection = ({ eyebrow = 'Parameters', title, rows }) => (
  <FeatureSection id='parameters'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {title}
    </Subhead>
    <Box
      as='ul'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      })}
    >
      {rows.map(row => (
        <Box as='li' key={row.name} css={theme({ minWidth: 0 })}>
          {row.href
            ? (
              <ParamCardLink href={row.href} externalIcon={false}>
                <ParamCardBody
                  name={row.name}
                  type={row.type}
                  description={row.description}
                  linked
                />
              </ParamCardLink>
              )
            : (
              <ParamCardStatic>
                <ParamCardBody
                  name={row.name}
                  type={row.type}
                  description={row.description}
                />
              </ParamCardStatic>
              )}
        </Box>
      ))}
    </Box>
  </FeatureSection>
)
