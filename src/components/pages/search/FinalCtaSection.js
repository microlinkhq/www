import React from 'react'
import { FileText, Image as ImageIcon } from 'react-feather'

import { colors, layout, theme, transition } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Container from 'components/elements/Container'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'

import { SEARCH_LAYOUT_WIDE_MAX_WIDTH } from './'
import { SectionCaption } from './Sections'
import { MOBILE_SECTION_BLEED } from './constants'

const SECTION_HEADING_FONT_SIZE_LARGE = ['36px', '42px', '42px', '42px']

const FinalCtaSection = () => (
  <Box
    as='section'
    id='final-cta'
    css={theme({
      bg: 'blue0',
      borderTop: 1,
      borderBottom: 1,
      borderColor: 'blue5',
      py: [5, 5, 6, 6],
      ...MOBILE_SECTION_BLEED
    })}
  >
    <Container
      css={theme({
        px: [3, 3, 0, 0],
        py: 0,
        maxWidth: ['100%', '100%', layout.large, SEARCH_LAYOUT_WIDE_MAX_WIDTH]
      })}
    >
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            '1fr',
            '1fr',
            'minmax(0, 44fr) minmax(0, 56fr)',
            'minmax(0, 44fr) minmax(0, 56fr)'
          ],
          alignItems: 'center',
          columnGap: [0, 0, 5, 6],
          rowGap: [5, 5, 0, 0],
          width: '100%'
        })}
      >
        <Box
          css={theme({
            width: '100%',
            minWidth: 0,
            maxWidth: ['100%', '100%', layout.small, layout.small]
          })}
        >
          <SectionCaption bg='blue0' color={colors.blue6}>
            Connect everything
          </SectionCaption>
          <Text
            as='h2'
            css={theme({
              m: 0,
              color: 'black',
              fontWeight: 'bold',
              letterSpacing: 1,
              lineHeight: [1, 1, 0, 0],
              fontSize: SECTION_HEADING_FONT_SIZE_LARGE,
              textAlign: 'left'
            })}
          >
            Plug <span css={theme({ color: 'blue6' })}>Microlink</span>
            <br />
            into your workflow
          </Text>
          <Text
            as='p'
            css={theme({
              m: 0,
              mt: 3,
              color: 'black80',
              fontSize: [1, 1, 2, 2],
              lineHeight: 2,
              textAlign: 'left',
              maxWidth: layout.small
            })}
          >
            Combine Search with <Link href='/metadata'>Metadata</Link>,{' '}
            <Link href='/screenshot'>Screenshot</Link>, and{' '}
            <Link href='/markdown'>Markdown</Link> to turn discovered URLs into
            richer outputs for structured fields, visual captures, and AI-ready
            page content, all under the same paid Microlink plan.
          </Text>
          <Flex css={theme({ mt: [4, 4, 5, 5] })}>
            <ArrowLink
              href='/pricing'
              css={theme({
                color: 'blue6',
                fontWeight: 'bold',
                fontSize: [1, 1, 2, 2]
              })}
            >
              See all plans
            </ArrowLink>
          </Flex>
        </Box>

        <Box css={theme({ width: '100%', minWidth: 0, maxWidth: '100%' })}>
          <Box
            css={theme({
              display: 'grid',
              gridTemplateColumns: [
                'repeat(2, minmax(0, 1fr))',
                'repeat(2, minmax(0, 1fr))',
                'repeat(4, minmax(0, 1fr))',
                'repeat(4, minmax(0, 1fr))'
              ],
              alignItems: 'stretch',
              gap: [3, 3, 2, 3],
              width: '100%',
              maxWidth: '100%'
            })}
          >
            {[
              {
                label: 'Metadata',
                href: '/metadata',
                icon: <FileText size={54} strokeWidth={2} aria-hidden='true' />
              },
              {
                label: 'Screenshot',
                href: '/screenshot',
                icon: <ImageIcon size={54} strokeWidth={2} aria-hidden='true' />
              },
              {
                label: 'Markdown',
                href: '/markdown',
                icon: (
                  <Text
                    as='span'
                    css={theme({
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      m: 0,
                      width: '54px',
                      height: '54px',
                      color: 'blue6',
                      fontWeight: 'bold',
                      fontSize: 2,
                      fontFamily: 'mono',
                      lineHeight: 1,
                      border: 2,
                      borderColor: 'blue6',
                      borderRadius: 2,
                      boxSizing: 'border-box'
                    })}
                  >
                    M↓
                  </Text>
                )
              }
            ].map(product => (
              <Flex
                as='a'
                key={product.label}
                href={product.href}
                css={theme({
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  width: '100%',
                  minWidth: 0,
                  height: ['170px', '170px', '170px', '180px'],
                  borderRadius: 4,
                  bg: 'white',
                  border: 1,
                  borderColor: 'blue5',
                  textDecoration: 'none',
                  color: 'black',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  transition: `transform ${transition.short}`,
                  _hover: {
                    transform: 'translateY(-4px)'
                  },
                  _active: {
                    transform: 'translateY(-1px)'
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                    transform: 'none',
                    _hover: {
                      transform: 'none'
                    },
                    _active: {
                      transform: 'none'
                    }
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${colors.blue6}`,
                    outlineOffset: '2px'
                  }
                })}
              >
                <Box
                  css={theme({
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'blue6',
                    minHeight: '72px'
                  })}
                >
                  {product.icon}
                </Box>
                <Text
                  as='span'
                  css={theme({
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2],
                    lineHeight: 1
                  })}
                >
                  {product.label}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
)

export default FinalCtaSection
