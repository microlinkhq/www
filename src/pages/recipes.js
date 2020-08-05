import { DotsBackground, Headline, Layout } from 'components/patterns'
import byFeature from '@microlink/recipes/by-feature'
import kebabCase from 'lodash/kebabCase'
import recipes from '@microlink/recipes'
import styled from 'styled-components'
import { getDomain } from 'tldts'
import { toPx } from 'theme'
import React from 'react'

import {
  Image,
  Link,
  Card,
  Box,
  Flex,
  Text,
  Unavatar
} from 'components/elements'

const LOGO_SIZE = ['40px', '40px', '60px', '60px']
const CARD_SIZE = [0.5, 0.5, 0.6, 0.6]
const CARD_ITEMS_PER_ROW = 4.5
const RECIPES_BY_FEATURES_KEYS = Object.keys(byFeature)

const CARDS_MAX_WIDTH = CARD_SIZE.map(n =>
  toPx(Card.width * n * CARD_ITEMS_PER_ROW)
)

const CustomLink = styled(Link)`
  color: inherit;

  :hover:not([disabled]) {
    color: inherit;
  }
`

const Logo = ({ isGeneric, domain, logo }) => {
  if (!isGeneric || !logo) {
    return (
      <Unavatar
        style={{ borderRadius: '50%' }}
        height={LOGO_SIZE}
        width={LOGO_SIZE}
        query={domain}
      />
    )
  }

  return <Image height={LOGO_SIZE} width={LOGO_SIZE} src={logo} />
}

export default ({ meta }) => {
  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Layout footer={{ bg: 'transparent' }} {...meta}>
        <Flex
          pt={[0, 0, 0, 3]}
          px={3}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            pb={4}
          >
            <Headline
              title='Recipes'
              caption='Build something with just a few of lines'
              pb={2}
            />
            <Text>
              Missing someting?{' '}
              <Link href='https://github.com/microlinkhq/recipes'>
                add your own
              </Link>
              ✨
            </Text>
          </Flex>

          <Flex
            maxWidth={CARDS_MAX_WIDTH}
            justifyContent='center'
            flexWrap='wrap'
          >
            {Object.keys(recipes)
              .sort()
              .map(recipeName => {
                const { meta } = recipes[recipeName]
                const isGeneric = RECIPES_BY_FEATURES_KEYS.includes(recipeName)
                const url = isGeneric
                  ? 'https://microlink.io'
                  : meta.examples[0]
                const domain = getDomain(url)

                return (
                  <Card
                    ratio={CARD_SIZE}
                    key={recipeName}
                    mb={4}
                    mr={4}
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <CustomLink href={`/recipes/${kebabCase(recipeName)}`}>
                      <Flex pb={[2, 2, 3, 3]} justifyContent='center'>
                        <Logo isGeneric={isGeneric} domain={domain} {...meta} />
                      </Flex>
                      <Box px={4}>
                        <Text textAlign='center' fontWeight='regular'>
                          {meta.name}
                        </Text>
                        <Text textAlign='center' black='60'>
                          {isGeneric
                            ? meta.description
                            : `Interact with ${domain}`}
                        </Text>
                      </Box>
                    </CustomLink>
                  </Card>
                )
              })}
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}
