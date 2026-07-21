import React from 'react'

import { colors, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'

import { PricingCard, SEARCH_LAYOUT_WIDE_MAX_WIDTH } from './'
import { PricingCheck, SectionCaption } from './Sections'
import { MOBILE_SECTION_BLEED, SECTION_HEADING_FONT_SIZE } from './constants'

const PRICE_DISPLAY_FONT_SIZE = ['36px', '42px', 5, 5]

const PricingSection = () => (
  <Box
    as='section'
    id='pricing'
    css={theme({
      bg: 'orange0',
      py: [5, 5, 6, 6],
      borderTop: 1,
      borderBottom: 1,
      borderColor: 'orange5',
      ...MOBILE_SECTION_BLEED
    })}
  >
    <Container
      css={theme({
        py: 0,
        maxWidth: ['100%', '100%', layout.large, SEARCH_LAYOUT_WIDE_MAX_WIDTH]
      })}
    >
      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['center', 'center', 'flex-start', 'flex-start'],
          width: '100%',
          minWidth: 0,
          gap: [4, 4, 0, 0]
        })}
      >
        <Box
          css={theme({
            width: ['100%', '100%', '48%', '48%'],
            flexShrink: 0,
            minWidth: 0
          })}
        >
          <SectionCaption color={colors.orange7}>Pricing</SectionCaption>
          <Text
            as='h2'
            css={theme({
              m: 0,
              color: 'black',
              fontWeight: 'bold',
              letterSpacing: 1,
              lineHeight: [1, 1, 0, 0],
              fontSize: SECTION_HEADING_FONT_SIZE,
              textAlign: 'left'
            })}
          >
            One dollar,
            <br />
            <span css={theme({ color: 'orange7' })}>one thousand requests</span>
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
            Search has no free tier because reliable result collection depends
            on managed proxy capacity, regional routing, and production
            safeguards on every call.
          </Text>
        </Box>

        <PricingCard as='section'>
          <Text
            as='h3'
            css={theme({
              m: 0,
              color: 'black',
              fontWeight: 'bold',
              fontSize: [2, 2, 3, 3]
            })}
          >
            Pro
          </Text>

          <Flex css={theme({ alignItems: 'baseline' })}>
            <Text
              css={theme({
                color: 'black',
                fontSize: PRICE_DISPLAY_FONT_SIZE,
                fontWeight: 'bold',
                lineHeight: 0,
                mb: 2
              })}
            >
              €39
            </Text>
            <Text
              css={theme({
                m: 0,
                color: 'black60',
                fontSize: [0, 0, 1, 1]
              })}
            >
              /month
            </Text>
          </Flex>

          <Text
            css={theme({
              color: 'black',
              fontWeight: 'bold',
              fontSize: [1, 1, 2, 2],
              lineHeight: 1
            })}
          >
            46,000 requests/month
          </Text>

          <Box css={theme({ py: 4 })}>
            <PricingCheck>Managed proxy-backed requests</PricingCheck>
            <PricingCheck>10 supported search surfaces</PricingCheck>
            <PricingCheck>Structured normalized results</PricingCheck>
            <PricingCheck>Location and period controls</PricingCheck>
            <PricingCheck>
              Pagination with <code>.next()</code>
            </PricingCheck>
            <PricingCheck>
              Optional page Markdown or HTML enrichment
            </PricingCheck>
          </Box>

          <Flex
            css={theme({
              color: 'orange7',
              fontSize: ['18px', '18px', '20px', '20px']
            })}
          >
            <ArrowLink
              href='/pricing'
              css={theme({
                fontWeight: 'bold'
              })}
            >
              See all plans
            </ArrowLink>
          </Flex>
        </PricingCard>
      </Flex>
    </Container>
  </Box>
)

export default PricingSection
