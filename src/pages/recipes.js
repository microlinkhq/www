import { DotsBackground, Layout, Caption } from 'components/patterns'
import { colors, space, layout, toPx, toRaw, fontSizes } from 'theme'
import { cdnUrl, issueUrl, formatNumber } from 'helpers'
import byFeature from '@microlink/recipes/by-feature'
import React, { useState, useEffect } from 'react'
import kebabCase from 'lodash/kebabCase'
import recipes from '@microlink/recipes'
import styled from 'styled-components'
import { Eye } from 'react-feather'
import { getDomain } from 'tldts'

import { Logo } from 'components/pages/recipes'

import {
  Box,
  Button,
  Caps,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  Meta,
  Subhead,
  Text
} from 'components/elements'

const RECIPES_BY_FEATURES_KEYS = Object.keys(byFeature)

const CARD_WIDTH = 300
const CARDS_PER_ROW = 3

const width = [...Array(4).keys()].map(() => CARD_WIDTH)

const maxWidth = width.map(w => toPx(toRaw(space[3]) * 4 + w * CARDS_PER_ROW))

const CustomLink = styled(Link)`
  color: inherit;
  :hover:not([disabled]) {
    color: inherit;
  }
`

const allRecipes = Object.keys(recipes).sort()

export const Head = () => (
  <Meta
    description='Just start with code. Instant integration, automating any site in a few lines.'
    image={cdnUrl('banner/recipes.jpeg')}
  />
)

const RecipesPage = () => {
  const [counters, setCounters] = useState(null)
  const isLoaded = counters !== null

  useEffect(() => {
    window
      .fetch(`https://count.vercel.app/recipes/${allRecipes.join(',')}`)
      .then(response => response.json())
      .then(setCounters)
      .catch(() => undefined)
  }, [])

  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Layout footer={{ bg: 'transparent' }}>
        <Flex
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          pt={2}
          px={3}
        >
          <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Heading titleize={false} maxWidth={layout.large}>
              Recipes
            </Heading>
            <Caption
              as='h2'
              pt={[3, 3, 4, 4]}
              pb={[3, 3, 4, 4]}
              px={[4, 4, 0, 0]}
              titleize={false}
              maxWidth={[
                layout.small,
                layout.small,
                layout.small,
                layout.small
              ]}
            >
              Just start with code — Instant integration, automating any site in
              a few lines.
            </Caption>
          </Flex>
          <Flex
            pt={[3, 3, 4, 4]}
            maxWidth={maxWidth}
            justifyContent='center'
            flexWrap='wrap'
          >
            {allRecipes.map((recipeName, index) => {
              const { meta } = recipes[recipeName]
              const count = isLoaded && counters[index]

              const isProvider = !RECIPES_BY_FEATURES_KEYS.includes(recipeName)
              const url = isProvider && meta.examples[0]
              const domain = url ? getDomain(url) : 'microlink.io'
              const description = isProvider
                ? `Interact with ${domain}`
                : meta.description

              return (
                <Card
                  key={recipeName}
                  flexDirection='column'
                  p={3}
                  width={width}
                  height='inherit'
                  mb={3}
                  mr={[0, 3, 3, 3]}
                >
                  <CustomLink href={`/recipes/${kebabCase(recipeName)}`}>
                    <Flex alignItems='center'>
                      <Box pr={2}>
                        <Logo
                          isProvider={isProvider}
                          domain={domain}
                          {...meta}
                        />
                      </Box>
                      <Text fontSize={1} fontWeight='bold'>
                        {meta.name}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        mt={3}
                        fontSize={0}
                        css={`
                          min-height: 56px;
                        `}
                      >
                        {description}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems='center'
                      style={{ visibility: isLoaded ? 'inherit' : 'hidden' }}
                    >
                      <Eye size={fontSizes[0]} color={colors.black50} />
                      <Text pl={1} color={colors.black50} fontSize={0}>
                        {formatNumber(count)}
                      </Text>
                    </Flex>
                  </CustomLink>
                </Card>
              )
            })}
          </Flex>
          <Flex
            pt={Container.defaultProps.pt}
            justifyContent='space-between'
            alignItems='center'
            flexDirection={['column', 'column', 'row', 'row']}
            width='100%'
            maxWidth={layout.large}
          >
            <Subhead>Miss something?</Subhead>
            <Box pt={[4, 4, 0, 0]}>
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
