import { DotsBackground, Layout, Caption } from 'components/patterns'
import byFeature from '@microlink/recipes/by-feature'
import kebabCase from 'lodash/kebabCase'
import recipes from '@microlink/recipes'
import styled from 'styled-components'
import { layout, toPx } from 'theme'
import { getDomain } from 'tldts'
import React from 'react'

import {
  Box,
  Button,
  Caps,
  Card,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Subhead,
  Text,
  Unavatar
} from 'components/elements'

const LOGO_SIZE = ['50px', '50px', '60px', '80px']
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
          px={3}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Flex
            pt={5}
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Heading titleize={false} maxWidth={layout.large}>
              Code made simple
            </Heading>
            <Caption
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
              Everything works better together — Break the code barrier,
              automating any site in a few lines.
            </Caption>
          </Flex>
          <Flex
            pt={[3, 3, 4, 4]}
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

                const description = isGeneric
                  ? meta.description
                  : `Interact with ${domain}`

                return (
                  <Card
                    px={4}
                    ratio={CARD_SIZE}
                    key={recipeName}
                    mb={4}
                    mr={4}
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <CustomLink href={`/recipes/${kebabCase(recipeName)}`}>
                      <Flex justifyContent='center'>
                        <Logo isGeneric={isGeneric} domain={domain} {...meta} />
                      </Flex>
                      <Box>
                        <Box py={3}>
                          <Text textAlign='center' fontWeight='bold'>
                            {meta.name}
                          </Text>
                          <Text
                            px={[0, 0, 4, 4]}
                            textAlign='center'
                            fontSize={1}
                            children={description}
                          />
                        </Box>
                        {/* <Flex
                          justifyContent='center'
                          alignItems='center'
                          flexWrap='wrap'
                        >
                          {['marketing', 'ecommerce', 'live'].map(children => (
                            <Badge
                              border='0.5px solid'
                              borderColor='black10'
                              key={children}
                              children={children}
                              bg='gray1'
                              fontWeight='regular'
                              color='black'
                              mr={2}
                              mb={2}
                            />
                          ))}
                        </Flex> */}
                      </Box>
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
              <Button href='https://github.com/microlinkhq/recipes/issues/new'>
                <Caps>Request an Integration</Caps>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}
