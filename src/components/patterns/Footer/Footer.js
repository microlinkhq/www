import { layout, colors, theme } from 'theme'
import { Microlink } from 'components/logos'
import { issueUrl } from 'helpers/issue-url'
import FeatherIcon from 'components/icons/Feather'
import React from 'react'

import IntersectionObserver from '../../elements/IntersectionObserver'
import Healthcheck from '../Healthcheck/Healthcheck'

import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Hide from 'components/elements/Hide'
import Caps from 'components/elements/Caps'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import Input from 'components/elements/Input/Input'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link/base'
import { LinkSolid } from 'components/elements/Link/solid'
import Dot from 'components/elements/Dot/Dot'
import { Mail } from 'react-feather'

const LIGHT_THEME = {
  background: 'white',
  textColor: 'black60',
  inputIconColor: colors.black40,
  iconColor: colors.black80
}

const DARK_THEME = {
  background: 'black',
  textColor: 'white60',
  inputIconColor: colors.white40,
  iconColor: colors.white80
}

const StatusPage = ({ isDark }) => {
  return (
    <LinkSolid
      isDark={isDark}
      data-event-location='Footer'
      data-event-name='Status'
      href='/status'
      css={theme({
        px: 0
      })}
    >
      <Text
        css={theme({
          fontSize: [0, 0, 0, 1]
        })}
      >
        Status Page
      </Text>
    </LinkSolid>
  )
}

const Health = ({ isDark, textColor }) => (
  <Healthcheck>
    {({ isHealthy, isLoading }) => {
      if (isLoading) return <StatusPage isDark={isDark} />
      return (
        <Link
          data-event-location='Footer'
          data-event-name='Status'
          href='/status'
          css={theme({
            px: 0,
            color: colors[textColor]
          })}
        >
          <Text
            css={theme({
              fontSize: [0, 0, 0, 1],
              pb: [3, 3, 3, 0]
            })}
          >
            <Choose>
              <Choose.When condition={isHealthy}>
                <Dot.Success
                  css={theme({
                    mr: 2
                  })}
                />
                All systems operational
              </Choose.When>
              <Choose.Otherwise>
                <Dot.Warning
                  css={theme({
                    mr: 2
                  })}
                />
                System performance degradation
              </Choose.Otherwise>
            </Choose>
          </Text>
        </Link>
      )
    }}
  </Healthcheck>
)

const Footer = ({ isDark, ...props }) => {
  const { background, textColor, inputIconColor } = isDark
    ? DARK_THEME
    : LIGHT_THEME

  return (
    <Container
      css={theme({
        px: 0,
        maxWidth: layout.large,
        pb: [5, 5, 6, 6]
      })}
    >
      <Flex
        css={theme({
          background,
          flexDirection: ['column', 'column', 'column', 'row'],
          justifyContent: 'space-between',
          alignItems: 'center'
        })}
        {...props}
      >
        <Box css={theme({ px: 0 })}>
          <Flex css={theme({ flexDirection: 'column' })}>
            <Flex css={theme({ justifyContent: 'center' })}>
              <Microlink />
            </Flex>
            <Flex
              css={theme({ flexDirection: 'column', alignItems: 'center' })}
            >
              <Text css={theme({ color: textColor, fontSize: 1, pt: 3 })}>
                Turn websites into data
              </Text>
            </Flex>
            <Flex
              css={theme({
                alignItems: ['center', 'center', 'center', 'inherit'],
                flexDirection: 'column'
              })}
            >
              <Flex
                css={theme({
                  pt: 3
                })}
              >
                <form
                  action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
                  method='post'
                >
                  <Flex>
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
                      isDark={isDark}
                      css={theme({ fontSize: 0, width: '8rem' })}
                      required
                    />

                    <Button
                      data-event-location='Footer'
                      data-event-name='Be Notified'
                      variant={isDark ? 'white' : 'black'}
                      css={theme({ ml: 2 })}
                    >
                      <Caps
                        css={theme({
                          fontSize: 0
                        })}
                      >
                        Be Notified
                      </Caps>
                    </Button>
                  </Flex>
                </form>
              </Flex>
              <Text
                css={theme({
                  textAlign: 'center',
                  color: textColor,
                  fontSize: 1,
                  pt: 3
                })}
              >
                Get early access & updates on new releases.
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          css={theme({
            mt: [2, 0, 0, 0],
            pt: [3, 3, 3, 0],
            pb: [3, 3, 3, 0],
            px: 0
          })}
        >
          <Flex
            css={theme({
              flexDirection: ['row', 'row', 'row', 'column']
            })}
          >
            {[
              { children: 'API', href: '/docs/api/getting-started/overview' },
              { children: 'Blog', href: '/blog' },
              { children: 'Community', href: '/community' },
              { children: 'Status', href: '/status' }
            ].map(({ href, children }) => (
              <LinkSolid
                key={href}
                isDark={isDark}
                href={href}
                data-event-name={children}
                data-event-location='Footer'
                css={theme({
                  fontSize: [0, 0, 0, 1],
                  mr: [2, 2, 2, 0],
                  mb: [0, 0, 0, 3]
                })}
              >
                {children}
              </LinkSolid>
            ))}
          </Flex>
        </Box>
        <Box
          css={theme({
            mb: [2, 0, 0, 0],
            pb: [3, 3, 3, 0],
            px: 0
          })}
        >
          <Flex
            css={theme({
              flexDirection: ['row', 'row', 'row', 'column']
            })}
          >
            {[
              { children: 'SDK', href: '/docs/sdk/getting-started/overview/' },
              { children: 'Pricing', href: '/#pricing' },
              { children: 'Open Source', href: '/oss' },
              { children: 'Bug Reports', href: issueUrl.bug() }
            ].map(({ href, children }) => (
              <LinkSolid
                key={href}
                isDark={isDark}
                href={href}
                data-event-name={children}
                data-event-location='Footer'
                css={theme({
                  fontSize: [0, 0, 0, 1],
                  mr: [2, 2, 2, 0],
                  mb: [0, 0, 0, 3]
                })}
              >
                {children}
              </LinkSolid>
            ))}
          </Flex>
        </Box>
        <Box css={theme({ px: 0 })}>
          <Flex css={theme({ flexDirection: 'column' })}>
            <Flex
              css={theme({
                alignItems: 'center',
                justifyContent: ['center', 'inherit', 'inherit', 'inherit']
              })}
            >
              <Flex
                css={theme({
                  flexDirection: 'column'
                })}
              >
                <IntersectionObserver
                  placeholder={() => <StatusPage isDark={isDark} />}
                  onView={() => (
                    <Health isDark={isDark} textColor={textColor} />
                  )}
                />
              </Flex>
            </Flex>

            <Hide breakpoints={[0, 1, 2]}>
              <Flex
                css={theme({
                  alignItems: 'center',
                  py: [0, 0, 0, 4]
                })}
              >
                <Text
                  css={theme({
                    color: textColor,
                    mr: 2,
                    pb: '2px',
                    fontSize: 1
                  })}
                >
                  © Microlink
                </Text>
                {[
                  {
                    href: '/tos',
                    children: 'Terms'
                  },
                  {
                    href: '/privacy',
                    children: 'Privacy'
                  }
                ].map(({ href, children }) => (
                  <LinkSolid
                    key={href}
                    isDark={isDark}
                    href={href}
                    data-event-name={children}
                    data-event-location='Footer'
                    css={theme({
                      fontWeight: 'normal',
                      mr: 2,
                      fontSize: 1
                    })}
                  >
                    {children}
                  </LinkSolid>
                ))}
              </Flex>
            </Hide>

            <Flex
              css={theme({
                alignItems: 'center',
                justifyContent: ['center', 'center', 'center', 'inherit'],
                mt: [3, 0, 0, 0]
              })}
            >
              {[
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
              ].map((props, index) => (
                <LinkSolid
                  data-event-location='Footer'
                  data-event-name={props.children}
                  isDark={isDark}
                  key={props.children}
                  css={theme({
                    pl: index > 0 ? 2 : 0,
                    fontSize: 1
                  })}
                  icon
                  {...props}
                />
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

export default Footer
