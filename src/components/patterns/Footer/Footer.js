import { layout, colors, theme } from 'theme'
import { issueUrl } from 'helpers/issue-url'
import FeatherIcon from 'components/icons/Feather'
import React from 'react'

import Container from 'components/elements/Container'
import Caps from 'components/elements/Caps'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import Input from 'components/elements/Input/Input'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { Mail } from 'react-feather'

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Markdown', href: '/markdown' },
      { label: 'Metadata', href: '/metadata' },
      { label: 'Screenshot', href: '/screenshot' },
      { label: 'PDF', href: '/pdf' },
      { label: 'Insights', href: '/insights' },
      { label: 'Logo', href: '/logo' },
      { label: 'Enterprise', href: '/enterprise' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Recipes', href: '/recipes' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Community', href: '/community' },
      { label: 'Open Source', href: '/oss' },
      { label: 'Skills', href: '/skills' },
      { label: 'Formats', href: '/formats' },
      { label: 'User Agents', href: '/user-agents' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Terms', href: '/tos' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Status', href: '/status' }
    ]
  },
  {
    title: 'Comparisons',
    links: []
  },
  {
    title: 'Tools',
    links: [
      { label: 'Sharing Debugger', href: '/tools/sharing-debugger' },
      { label: 'SDK', href: '/sdk' },
      { label: 'API', href: '/docs/api/getting-started/overview' },
      { label: 'Bug Reports', href: issueUrl.bug() }
    ]
  }
]

const SOCIAL_LINKS = [
  {
    href: 'https://x.com/microlinkhq',
    children: 'X',
    title: '@microlinkhq on x.com'
  },
  {
    href: 'https://github.com/microlinkhq',
    children: 'GitHub',
    title: '@microlinkhq on GitHub'
  },
  {
    href: 'mailto:hello@microlink.io',
    children: 'Email',
    title: 'hello@microlink.io'
  }
]

const textColor = colors.black60
const headerColor = colors.black80
const inputIconColor = colors.black40

const FooterColumn = ({ title, links }) => (
  <Box>
    <Caps
      css={theme({
        fontSize: 0,
        fontWeight: 'bold',
        color: headerColor,
        mb: 3,
        letterSpacing: '0.1em'
      })}
    >
      {title}
    </Caps>
    <Flex
      as='ul'
      css={theme({
        flexDirection: 'column',
        listStyle: 'none',
        m: 0,
        p: 0,
        gap: 2
      })}
    >
      {links.map(({ label, href }) => (
        <Box as='li' key={href}>
          <Link
            href={href}
            data-event-location='Footer'
            data-event-name={label}
            css={theme({
              color: textColor,
              textDecoration: 'none',
              fontSize: 1,
              display: 'inline-block',
              opacity: 1,
              '&:hover': {
                color: colors.black,
                opacity: 1
              }
            })}
          >
            {label}
          </Link>
        </Box>
      ))}
    </Flex>
  </Box>
)

const activeColumns = FOOTER_COLUMNS.filter(col => col.links.length > 0)

const Footer = ({ ...props }) => {
  return (
    <Container
      css={theme({
        px: 0,
        maxWidth: layout.large,
        pb: [5, 5, 6, 6]
      })}
    >
      <Box
        css={theme({
          background: colors.white,
          borderRadius: 3,
          px: [4, 4, 5, 5],
          pt: [4, 4, 5, 5],
          pb: [4, 4, 4, 4]
        })}
        {...props}
      >
        <Box
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px 24px',
            '@media (min-width: 768px)': {
              gridTemplateColumns: `repeat(${activeColumns.length}, 1fr)`
            }
          }}
        >
          {activeColumns.map(column => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </Box>

        <Flex
          css={theme({
            mt: [4, 4, 5, 5],
            pt: [3, 3, 3, 3],
            borderTop: `1px solid ${colors.black10}`,
            flexDirection: ['column', 'column', 'row', 'row'],
            justifyContent: 'space-between',
            alignItems: ['flex-start', 'flex-start', 'center', 'center'],
            gap: 3
          })}
        >
          <Flex
            css={theme({
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap'
            })}
          >
            {SOCIAL_LINKS.map((linkProps, index) => (
              <Link
                key={linkProps.children}
                data-event-location='Footer'
                data-event-name={linkProps.children}
                externalIcon={false}
                css={theme({
                  color: textColor,
                  textDecoration: 'none',
                  fontSize: 1,
                  opacity: 1,
                  '&:hover': {
                    color: colors.black,
                    opacity: 1
                  },
                  ...(index > 0 && { pl: 1 })
                })}
                {...linkProps}
              />
            ))}
            <Text
              css={theme({
                color: textColor,
                fontSize: 1,
                pl: 1
              })}
            >
              &copy; {new Date().getFullYear()} Microlink
            </Text>
          </Flex>

          <form
            action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
            method='post'
          >
            <Flex css={theme({ alignItems: 'center' })}>
              <Input
                type='email'
                name='EMAIL'
                placeholder='you@domain.com'
                iconComponent={
                  <FeatherIcon
                    icon={Mail}
                    color={inputIconColor}
                    size={[0, 0, 1, 1]}
                  />
                }
                css={theme({ fontSize: 0, width: '8rem' })}
                labelCss={{
                  borderColor: colors.black10,
                  '&:hover': { borderColor: colors.black40 },
                  '&:focus-within': {
                    borderColor: colors.black80,
                    boxShadow: 'none'
                  }
                }}
                required
              />
              <Button
                data-event-location='Footer'
                data-event-name='Be Notified'
                variant='black'
                css={theme({ ml: 2 })}
              >
                <Caps css={theme({ fontSize: 0 })}>Be Notified</Caps>
              </Button>
            </Flex>
          </form>
        </Flex>
      </Box>
    </Container>
  )
}

export default Footer
