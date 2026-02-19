import { layout, theme, transition, borders, colors } from 'theme'
import React from 'react'
import styled from 'styled-components'
import {
  Camera,
  Maximize,
  Grid,
  Smartphone,
  Share2,
  ArrowRight,
  ChevronRight
} from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'

import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'

import { withTitle } from 'helpers/hoc/with-title'
import { cdnUrl } from 'helpers/cdn-url'

const Heading = withTitle(HeadingBase)
const Caption = withTitle(CaptionBase)

const TOOLS = [
  {
    category: 'Screenshots',
    description:
      'Turn any URL into a pixel-perfect image. Choose the right tool for your workflow — single captures, full-page scrolls, bulk exports, or mobile viewports.',
    tools: [
      {
        title: 'Website Screenshot',
        description:
          'The fastest way to capture any website. Paste a URL, pick a viewport, and get a high-resolution PNG or JPEG in seconds. Supports custom overlays and backgrounds.',
        href: '/tools/website-screenshot',
        icon: Camera,
        image: cdnUrl('screenshot/browser/dark/apple.png'),
        featured: true
        // tags: ['Free', 'No login']
      },
      {
        title: 'Full Page Screenshot',
        description:
          'Scroll-capture an entire page from top to bottom in one image. Perfect for design reviews, archiving, and documentation.',
        href: '/tools/website-screenshot/full-page',
        icon: Maximize,
        image: '/images/screenshot-scroll.png',
        animation: ['scale(1) translateY(-65%)', 'scale(1)'],
        styles: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          marginTop: '340px',
          width: '250px',
          objectFit: 'cover',
          transition: 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'top center'
        }
      },
      {
        title: 'Bulk Screenshots',
        description:
          'Paste up to 50 URLs and capture them all at once. Download every screenshot as a ZIP file. Great for competitive analysis and monitoring.',
        href: '/tools/website-screenshot/bulk',
        icon: Grid,
        image: '/images/screenshot-bulk.png',
        animation: ['scale(1.5) rotate(0deg)', 'scale(1.3) rotate(-10deg)'],
        styles: {
          maxHeight: '100%',
          objectFit: 'contain',
          transition: `transform ${transition.long}`,
          transformOrigin: 'center center'
        }
      },
      {
        title: 'Mobile Screenshot',
        description:
          'Emulate real mobile devices and capture responsive layouts. Test how your site looks on iPhone, Pixel, and more.',
        href: '/tools/website-screenshot/mobile',
        icon: Smartphone,
        image: '/images/screenshot-mobile.png',
        animation: ['scale(1.1) translateY(-8%)', 'scale(1.4)'],
        styles: {
          mt: '310px',
          maxWidth: '290px',
          objectFit: 'contain',
          transition: `transform ${transition.long}`,
          transformOrigin: 'center center'
        }
      }
    ]
  },
  {
    category: 'Metadata',
    description:
      'Inspect, debug, and validate the metadata behind any URL. See exactly what search engines and social platforms see before you publish.',
    tools: [
      {
        title: 'Sharing Debugger',
        description:
          'Validate Open Graph, Twitter Cards, JSON-LD, microdata, and every other meta tag in one place. Preview how your URL renders on Facebook, X, LinkedIn, Slack, and more — before you hit publish.',
        href: '/tools/sharing-debugger',
        icon: Share2,
        image: 'https://cdn.microlink.io/illustrations/abstract-delivery.svg',
        featured: true,
        tags: ['Free', 'No login']
      }
    ]
  }
]

const CardBase = styled(Box)(
  theme({
    borderRadius: 3,
    border: 1,
    borderColor: 'black05',
    bg: 'white',
    overflow: 'hidden',
    transition: `border-color ${transition.medium}, box-shadow ${transition.medium}`,
    _hover: {
      borderColor: 'black20',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
    }
  })
)

const Tag = styled(Text)(
  theme({
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'blue7',
    bg: 'blue0',
    px: 2,
    py: '3px',
    borderRadius: 1,
    lineHeight: '1',
    display: 'inline-block'
  })
)

const ImagePreview = styled(Box)(
  theme({
    bg: 'gray0',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
)

const ArrowIndicator = ({ isHover, size = 18 }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      bg: isHover ? 'blue0' : 'gray0',
      color: isHover ? 'link' : 'black30',
      transition: `all ${transition.medium}`,
      flexShrink: 0
    })}
  >
    {isHover ? <ArrowRight size={size} /> : <ChevronRight size={size} />}
  </Flex>
)

const FeaturedTool = ({
  title,
  description,
  href,
  icon: Icon,
  image,
  tags
}) => {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <Link
      href={href}
      css={theme({
        textDecoration: 'none',
        color: 'inherit',
        _hover: { color: 'inherit' },
        display: 'block'
      })}
    >
      <CardBase
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        onTouchCancel={() => setIsHover(false)}
        css={theme({ borderColor: 'black10' })}
      >
        <ImagePreview
          css={theme({
            height: ['180px', '200px', '260px', '260px'],
            borderBottom: 1,
            borderColor: 'black05'
          })}
        >
          <Image
            src={image}
            alt={title}
            css={theme({
              maxHeight: '100%',
              objectFit: 'contain',
              transition: `transform ${transition.long}`
            })}
            style={{
              transform: isHover
                ? 'scale(1.67) translateY(16%)'
                : 'scale(1.35) translateY(15%)'
            }}
          />
        </ImagePreview>

        <Flex
          css={theme({
            p: [3, 3, 4, 4],
            flexDirection: 'column',
            gap: 3
          })}
        >
          <Flex
            css={theme({
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 3
            })}
          >
            <Box css={{ flex: 1, minWidth: 0 }}>
              <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
                <Flex
                  css={theme({
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: 2,
                    bg: 'blue0',
                    color: 'blue7',
                    flexShrink: 0
                  })}
                >
                  <Icon size={16} />
                </Flex>
                <Text
                  css={theme({
                    fontSize: [2, 2, 3, 3],
                    fontWeight: 'bold',
                    color: 'black'
                  })}
                >
                  {title}
                </Text>
              </Flex>
              <Text
                css={theme({
                  fontSize: [0, 0, 1, 1],
                  color: 'black60',
                  lineHeight: 2
                })}
              >
                {description}
              </Text>
              {tags && (
                <Flex css={theme({ gap: 2, mt: 3, flexWrap: 'wrap' })}>
                  {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Flex>
              )}
            </Box>
            <ArrowIndicator isHover={isHover} />
          </Flex>
        </Flex>
      </CardBase>
    </Link>
  )
}

const Tool = ({
  title,
  description,
  href,
  icon: Icon,
  image,
  animation = ['scale(1.05)', 'scale(1)'],
  styles = {}
}) => {
  const [isHover, setIsHover] = React.useState(false)

  const transform = isHover ? animation[0] : animation[1]

  return (
    <Link
      href={href}
      css={theme({
        textDecoration: 'none',
        color: 'inherit',
        _hover: { color: 'inherit' },
        display: 'block',
        height: '100%'
      })}
    >
      <CardBase
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        onTouchCancel={() => setIsHover(false)}
        css={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <ImagePreview
          css={theme({
            height: ['120px', '140px', '150px', '150px'],
            borderBottom: 1,
            borderColor: 'black05'
          })}
        >
          <Image
            src={image}
            alt={title}
            css={theme({
              ...styles,
              transform
            })}
          />
        </ImagePreview>

        <Flex
          css={theme({
            p: 3,
            flexDirection: 'column',
            flex: 1
          })}
        >
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            })}
          >
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <Flex
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: 2,
                  bg: 'gray0',
                  color: 'gray7',
                  flexShrink: 0
                })}
              >
                <Icon size={14} />
              </Flex>
              <Text
                css={theme({
                  fontSize: 1,
                  fontWeight: 'bold',
                  color: 'black'
                })}
              >
                {title}
              </Text>
            </Flex>
            <ArrowIndicator isHover={isHover} size={14} />
          </Flex>
          <Text
            css={theme({
              fontSize: 0,
              color: 'black50',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </Flex>
      </CardBase>
    </Link>
  )
}

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
            color: 'black50',
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
          <FeaturedTool {...featured} />
        </Box>
      )}

      {rest.length > 0 && (
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: [
              '1fr',
              '1fr',
              'repeat(3, 1fr)',
              'repeat(3, 1fr)'
            ],
            gap: 3
          })}
        >
          {rest.map(tool => (
            <Tool key={tool.href} {...tool} />
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
            color: 'black50',
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
            color: 'black50',
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
