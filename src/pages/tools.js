import { layout, theme, borders, colors } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'

import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { FeaturedToolCard, ToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS } from 'components/patterns/Tools/toolCatalog'

import { withTitle } from 'helpers/hoc/with-title'
import { cdnUrl } from 'helpers/cdn-url'

const Heading = withTitle(HeadingBase)
const Caption = withTitle(CaptionBase)

const CategorySection = ({ category, description, tools }) => {
  const featured = tools.find(t => t.featured)
  const rest = tools.filter(t => !t.featured)

  return (
    <Box as='section' css={theme({ mb: [4, 4, 5, 5] })}>
      <Box css={theme({ mb: [3, 3, 4, 4] })}>
        <Text
          as='h2'
          css={theme({
            fontSize: [3, 3, '38px', '38px'],
            fontWeight: 'bold',
            color: 'black',
            letterSpacing: 1
          })}
        >
          {category}
        </Text>
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black80',
            mt: 2,
            lineHeight: 2,
            maxWidth: layout.normal
          })}
        >
          {description}
        </Text>
      </Box>

      {featured && (
        <Box css={theme({ mb: 3 })}>
          <FeaturedToolCard {...featured} />
        </Box>
      )}

      {rest.length > 0 && (
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: [
              '1fr',
              '1fr',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)'
            ],
            gap: 3
          })}
        >
          {rest.map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export const Head = () => (
  <Meta
    title='Free Online Tools for Developers'
    description='A curated collection of free developer tools by Microlink. Screenshot generators, metadata debuggers, and more. No login required.'
    image={cdnUrl('banner/tools.jpeg')}
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': 'https://microlink.io/tools',
        name: 'Microlink Developer Tools',
        description:
          'A curated collection of free developer tools. Screenshot generators, metadata debuggers, and more.',
        url: 'https://microlink.io/tools',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              url: 'https://microlink.io/tools/website-screenshot',
              name: 'Website Screenshot Generator'
            },
            {
              '@type': 'ListItem',
              position: 2,
              url: 'https://microlink.io/tools/website-screenshot/full-page',
              name: 'Full Page Screenshot'
            },
            {
              '@type': 'ListItem',
              position: 3,
              url: 'https://microlink.io/tools/website-screenshot/bulk',
              name: 'Bulk Screenshots'
            },
            {
              '@type': 'ListItem',
              position: 4,
              url: 'https://microlink.io/tools/website-screenshot/mobile',
              name: 'Mobile Screenshot'
            },
            {
              '@type': 'ListItem',
              position: 5,
              url: 'https://microlink.io/tools/sharing-debugger',
              name: 'Sharing Debugger'
            }
          ]
        }
      }
    ]}
  />
)

const ToolsPage = () => (
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
        <Heading titleize={false}>Microlink Tools</Heading>
        <Caption
          forwardedAs='h2'
          titleize={false}
          css={theme({
            pt: [2],
            px: [4, null, 0],
            maxWidth: layout.large
          })}
        >
          Explore a handful of things Microlink's API can do for you.
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
          Every tool on this page is fully <b>functional</b>, completely{' '}
          <b>free</b>, and requires <b>no account</b>. Try them out and see
          firsthand how fast <b>Microlink</b> performs in real-world scenarios.
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
          More tools are on the way.{' '}
          <Link href='mailto:hello@microlink.io'>Let&nbsp;us&nbsp;know</Link>{' '}
          what you'd like to see next.
        </Text>
      </Box>
    </Flex>
  </Layout>
)

export default ToolsPage
