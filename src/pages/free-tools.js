import { layout, theme, borders, colors } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'

import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import CategorySection from 'components/patterns/Tools/CategorySection'
import { TOOLS } from 'components/patterns/Tools/toolCatalog'

const ITEM_LIST = TOOLS.flatMap(section =>
  section.tools.map(tool => ({
    url: `https://microlink.io${tool.href}`,
    name: tool.title
  }))
)

export const Head = () => (
  <Meta
    title='Free Tools for Developers — No Sign Up Required'
    description='Free tools for developers: website screenshot generator, URL to PDF converter, URL to markdown, metadata debugger, sitemap extractor and more. No account, no credit card — paste a URL and go.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': 'https://microlink.io/free-tools',
        name: 'Free Tools for Developers',
        description:
          'A collection of free tools for developers: website screenshot generator, URL to PDF converter, URL to markdown, metadata debugger, sitemap extractor and more. No account required.',
        url: 'https://microlink.io/free-tools',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: ITEM_LIST.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: item.url,
            name: item.name
          }))
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tools, no account required'
        }
      }
    ]}
  />
)

const FreeToolsPage = () => (
  <Layout>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center'
      })}
    >
      <Flex
        css={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Heading>Free Tools</Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [2],
            px: [4, null, 0],
            maxWidth: layout.large
          })}
        >
          Useful things you can do with a URL, right now, for free.
        </Caption>
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black80',
            pt: 3,
            textAlign: 'center',
            maxWidth: layout.normal,
            lineHeight: 2,
            px: [4, null, 0]
          })}
        >
          Every tool below runs on the <b>Microlink API</b> and is free to use
          with <b>no sign up</b> and <b>no credit card</b> — paste a URL and
          get the result. They are the same primitives developers use
          programmatically: screenshots, PDFs, Markdown extraction, metadata
          and embeds.
        </Text>
      </Flex>

      <Box
        css={theme({
          width: '100%',
          maxWidth: layout.large,
          px: [3, 3, 4, 4],
          pt: [4, null, 5]
        })}
      >
        {TOOLS.map(section => (
          <CategorySection key={section.category} {...section} />
        ))}
      </Box>

      <Box
        css={theme({
          width: '100%',
          maxWidth: layout.large,
          px: [3, 3, 4, 4],
          pb: [1, 1, 2, 2],
          pt: [3, null, 4],
          borderTop: `${borders[1]} ${colors.black05}`,
          textAlign: 'center'
        })}
      >
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black80',
            pt: [4, null, 5]
          })}
        >
          Need these as an API instead of a web page? Every tool here is one
          HTTP call — read the <Link href='/docs'>documentation</Link> or see{' '}
          <Link href='/pricing'>pricing</Link> for higher volumes.
        </Text>
      </Box>
    </Flex>
  </Layout>
)

export default FreeToolsPage
