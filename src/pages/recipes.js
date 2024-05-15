import { DotsBackground, Layout, Caption } from 'components/patterns'
import { colors, space, layout, toPx, toRaw, fontSizes, theme } from 'theme'
import { cdnUrl, issueUrl, formatNumber } from 'helpers'
import React, { useState, useEffect } from 'react'
import kebabCase from 'lodash/kebabCase'
import { Eye } from 'react-feather'
import { getDomain } from 'tldts'

import { Logo } from 'components/pages/recipes'

import {
  Box,
  Button,
  Caps,
  Card,
  Flex,
  Heading,
  Link,
  Meta,
  Subhead,
  Text
} from 'components/elements'

import recipes from '../../data/recipes.json'

const allRecipesKeys = recipes.map(([key]) => key)

const CARD_WIDTH = 300
const CARDS_PER_ROW = 3

const width = [...Array(4).keys()].map(() => CARD_WIDTH)

const maxWidth = width.map(w => toPx(toRaw(space[3]) * 4 + w * CARDS_PER_ROW))

export const Head = () => (
  <Meta
    description='Just start with code. Instant integration, automating any site in a few lines.'
    image={cdnUrl('banner/recipes.jpeg')}
  />
)

const RecipesPage = () => {
  const [counters, setCounters] = useState()
  const isLoaded = counters !== null

  useEffect(() => {
    window
      .fetch(`https://count.vercel.app/recipes/${allRecipesKeys.join(',')}`)
      .then(response => response.json())
      .then(setCounters)
      .catch(() => undefined)
  }, [])

  return (
    <DotsBackground>
      <Layout footer={{ style: { background: 'transparent' } }}>
        <Flex
          css={theme({
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 2,
            px: 3
          })}
        >
          <Flex
            css={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heading titleize={false} css={{ maxWidth: layout.large }}>
              Recipes
            </Heading>
            <Caption
              forwardedAs='h2'
              css={theme({
                py: [3, null, 4],
                px: [4, null, 0],
                maxWidth: layout.small
              })}
              titleize={false}
            >
              Just start with code — Instant integration, automating any site in
              a few lines.
            </Caption>
          </Flex>
          <Flex
            css={theme({
              pt: [3, null, 4],
              maxWidth,
              justifyContent: 'center',
              flexWrap: 'wrap'
            })}
          >
            {recipes.map(([recipeName, meta], index) => {
              const count = isLoaded && counters[index]
              const isProvider = meta.type === 'provider'
              const url = isProvider && meta.examples[0]
              const domain = url ? getDomain(url) : 'microlink.io'
              const description = isProvider
                ? `Interact with ${domain}`
                : meta.description

              return (
                <Card
                  key={recipeName}
                  css={theme({
                    flexDirection: 'column',
                    p: 3,
                    width,
                    height: 'inherit',
                    mb: 3,
                    mr: [0, 3],
                    color: 'black',
                    _hover: {
                      color: 'black'
                    }
                  })}
                >
                  <Link
                    css={theme({
                      color: 'inherit',
                      _hover: { color: 'inherit' }
                    })}
                    href={`/recipes/${kebabCase(recipeName)}`}
                  >
                    <Flex css={{ alignItems: 'center' }}>
                      <Box css={theme({ pr: 2 })}>
                        <Logo
                          isProvider={isProvider}
                          domain={domain}
                          {...meta}
                        />
                      </Box>
                      <Text css={theme({ fontSize: 1, fontWeight: 'bold' })}>
                        {meta.name}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        css={theme({
                          mt: 3,
                          fontSize: 0,
                          minHeight: '56px'
                        })}
                      >
                        {description}
                      </Text>
                    </Flex>
                    <Flex
                      css={{ alignItems: 'center' }}
                      style={{ visibility: isLoaded ? 'inherit' : 'hidden' }}
                    >
                      <Eye size={fontSizes[0]} color={colors.black50} />
                      <Text
                        css={theme({ pl: 1, color: 'black50', fontSize: 0 })}
                      >
                        {formatNumber(count)}
                      </Text>
                    </Flex>
                  </Link>
                </Card>
              )
            })}
          </Flex>
          <Flex
            css={theme({
              pt: [5, null, 6],
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: ['column', null, 'row'],
              width: '100%',
              maxWidth: layout.large
            })}
          >
            <Subhead>Miss something?</Subhead>
            <Box css={theme({ pt: [4, null, 0] })}>
              <Button
                onClick={() =>
                  window.open(issueUrl.bug(), '_blank', 'noopener noreferrer')
                }
              >
                <Caps>Request an Integration</Caps>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}

export default RecipesPage
