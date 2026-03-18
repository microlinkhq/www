import { layout, colors, theme, transition } from 'theme'
import { issueUrl } from 'helpers/issue-url'
import FeatherIcon from 'components/icons/Feather'
import React, { useState, useCallback } from 'react'

import IntersectionObserver from '../../elements/IntersectionObserver'
import Healthcheck from '../Healthcheck/Healthcheck'

import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Caps from 'components/elements/Caps'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import Input from 'components/elements/Input/Input'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import Dot from 'components/elements/Dot/Dot'
import { ChevronDown, Mail } from 'react-feather'
import styled from 'styled-components'

const FOOTER_COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Insights', href: '/insights' },
      { label: 'Logo', href: '/logo' },
      { label: 'Markdown', href: '/markdown' },
      { label: 'Metadata', href: '/metadata' },
      { label: 'PDF', href: '/pdf' },
      { label: 'Screenshot', href: '/screenshot' },
      { label: 'Unavatar', href: 'https://unavatar.io' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Community', href: '/community' },
      { label: 'Benchmark', href: '/benchmarks/screenshot-api' },
      { label: 'Open Source', href: '/oss' },
      { label: 'Skills', href: '/skills' },
      { label: 'User Agents', href: '/user-agents' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Bug Reports', href: issueUrl.bug() },
      { label: 'Contact', href: 'mailto:hello@microlink.io' },
      { label: 'GitHub', href: 'https://github.com/microlinkhq' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/microlink' },
      { label: 'X/Twitter', href: 'https://x.com/microlinkhq' }
    ],
    groups: [
      {
        title: 'Legal',
        links: [
          { label: 'DPA', href: '/dpa' },
          { label: 'Privacy policy', href: '/privacy' },
          { label: 'Terms of service', href: '/tos' }
        ]
      }
    ]
  },
  {
    title: 'Comparisons',
    links: []
  },
  {
    title: 'Tools',
    links: [
      { label: 'SDK', href: '/sdk' },
      { label: 'Sharing Debugger', href: '/tools/sharing-debugger' },
      { label: 'Website Screenshot', href: '/tools/website-screenshot' },
      {
        label: 'Full page Screenshot',
        href: '/tools/website-screenshot/full-page'
      },
      { label: 'Bulk Screenshots', href: '/tools/website-screenshot/bulk' },
      {
        label: 'Animated Screenshot',
        href: '/tools/website-screenshot/animated'
      },
      { label: 'Geolocation', href: 'https://geolocation.microlink.io' }
    ]
  }
]

const primaryColor = colors.black60
const secondaryColor = colors.black40

const dotStyle = theme({
  pl: 2,
  fontSize: 0,
  color: 'black50',
  transition: `color ${transition.medium}`,
  _hover: { color: 'black' }
})

const linkStyles = theme({
  color: primaryColor,
  textDecoration: 'none',
  fontSize: 1,
  display: 'inline-block',
  opacity: 1,
  _hover: {
    color: 'black',
    opacity: 1,
    '& svg': {
      stroke: 'black'
    }
  }
})

const StatusPage = () => (
  <Link
    data-event-location='Footer'
    data-event-name='Status'
    href='/status'
    css={theme({
      px: 0,
      color: primaryColor,
      textDecoration: 'none',
      opacity: 1
    })}
  >
    <Text css={theme({ fontSize: 1 })}>Status</Text>
  </Link>
)

const Health = () => (
  <Healthcheck>
    {({ isHealthy, isLoading }) => {
      if (isLoading) return <StatusPage />
      return (
        <Link
          data-event-location='Footer'
          data-event-name='Status'
          href='/status'
        >
          <Flex css={theme({ alignItems: 'center' })}>
            <Choose>
              <Choose.When condition={isHealthy}>
                <Dot.Success />
                <Text css={dotStyle}>All systems operational</Text>
              </Choose.When>
              <Choose.Otherwise>
                <Dot.Warning />
                <Text css={dotStyle}>System performance degradation</Text>
              </Choose.Otherwise>
            </Choose>
          </Flex>
        </Link>
      )
    }}
  </Healthcheck>
)

const DisclosurePanel = styled(Box)`
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;
  transition: opacity ${transition.short}, transform ${transition.short};

  &[data-open='true'] {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`

const DisclosureChevron = styled(ChevronDown)`
  transition: transform ${transition.short};

  &[data-open='true'] {
    transform: rotate(180deg);
  }
`

const FooterLinkList = ({ links }) => (
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
          css={linkStyles}
        >
          {label}
        </Link>
      </Box>
    ))}
  </Flex>
)

const FooterGroup = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <Box css={{ position: 'relative' }}>
      <Text
        onClick={toggle}
        aria-expanded={isOpen}
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer'
        })}
      >
        <Text as='span' css={linkStyles}>
          {title}
        </Text>
        <DisclosureChevron size={12} data-open={isOpen} />
      </Text>
      <DisclosurePanel
        data-open={isOpen}
        css={theme({
          position: 'absolute',
          left: 0,
          mt: 2,
          background: colors.white,
          border: `1px solid ${colors.black10}`,
          borderRadius: 2,
          px: 3,
          py: 3,
          zIndex: 1,
          minWidth: '180px'
        })}
      >
        <FooterLinkList links={links} />
      </DisclosurePanel>
    </Box>
  )
}

const FooterColumn = ({ title, links, groups }) => (
  <Box>
    <Caps
      css={theme({
        fontSize: 0,
        color: secondaryColor,
        mb: 3,
        letterSpacing: 3
      })}
    >
      {title}
    </Caps>
    <Flex
      css={theme({
        flexDirection: 'column',
        gap: 2
      })}
    >
      <FooterLinkList links={links} />
      {groups &&
        groups.map(group => <FooterGroup key={group.title} {...group} />)}
    </Flex>
  </Box>
)

const activeColumns = FOOTER_COLUMNS.filter(
  col => col.links.length > 0 || (col.groups && col.groups.length > 0)
)

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
          px: 3,
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
            mt: [3, 3, 4, 4],
            pt: [3, 3, 4, 4],
            borderTop: `1px solid ${colors.black05}`,
            flexDirection: ['column', 'column', 'row', 'row'],
            justifyContent: 'space-between',
            alignItems: ['flex-start', 'flex-start', 'center', 'center'],
            gap: 3
          })}
        >
          <Flex
            css={theme({
              alignItems: 'center',
              flexWrap: 'wrap'
            })}
          >
            <Text
              css={theme({
                color: 'black50',
                fontSize: 0,
                pr: 2
              })}
            >
              &copy; {new Date().getFullYear()} Microlink
            </Text>
            <IntersectionObserver
              placeholder={() => <StatusPage />}
              onView={() => <Health />}
            />
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
                    color={secondaryColor}
                    size={[0, 0, 1, 1]}
                  />
                }
                css={theme({ fontSize: 0, width: '8rem' })}
                labelCss={{
                  borderColor: colors.black10,
                  '&:hover': { borderColor: secondaryColor },
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
