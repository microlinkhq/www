import { layout, colors, themeCss } from 'theme'
import { Microlink } from 'components/logos'
import { Mail } from 'react-feather'
import { issueUrl } from 'helpers'
import React from 'react'

import Healthcheck from '../Healthcheck/Healthcheck'

import {
  Choose,
  Container,
  Hide,
  Caps,
  Box,
  Button,
  Flex,
  Input,
  Text,
  LinkSolid,
  Link,
  Dot
} from 'components/elements'

const LIGHT_THEME = {
  bg: 'white',
  textColor: 'black60',
  inputIconColor: colors.black40,
  iconColor: colors.black80
}

const DARK_THEME = {
  bg: 'black',
  textColor: 'white60',
  inputIconColor: colors.white40,
  iconColor: colors.white80
}

const Footer = ({ theme, ...props }) => {
  const isDark = theme === 'dark'
  const { bg, textColor, inputIconColor } = isDark ? DARK_THEME : LIGHT_THEME

  return (
    <Container
      css={themeCss({
        px: 0,
        maxWidth: layout.large,
        pb: Container.defaultProps.pt
      })}
    >
      <Flex
        css={themeCss({
          bg,
          flexDirection: ['column', 'column', 'column', 'row'],
          justifyContent: 'space-between',
          alignItems: 'center'
        })}
        {...props}
      >
        <Box css={themeCss({ px: 0 })}>
          <Flex css={themeCss({ flexDirection: 'column' })}>
            <Flex css={themeCss({ justifyContent: 'center' })}>
              <Microlink />
            </Flex>
            <Flex
              css={themeCss({ flexDirection: 'column', alignItems: 'center' })}
            >
              <Text css={themeCss({ color: textColor, fontSize: 1, pt: 3 })}>
                Turn websites into data
              </Text>
            </Flex>
            <Flex
              css={themeCss({
                alignItems: ['center', 'center', 'center', 'inherit'],
                flexDirection: 'column'
              })}
            >
              <Flex
                css={themeCss({
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
                      iconComponent={<Mail color={inputIconColor} size={16} />}
                      isDark={isDark}
                      css={themeCss({ fontSize: 1, width: '8rem' })}
                      required
                    />

                    <Button
                      data-event-location='Footer'
                      data-event-name='Be Notified'
                      variant={isDark ? 'white' : 'black'}
                      css={themeCss({ ml: 2 })}
                    >
                      <Caps
                        css={themeCss({
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
                css={themeCss({
                  textAlign: 'center',
                  color: textColor,
                  fontSize: 1,
                  pt: 3
                })}
              >
                Early access & updates on new releases.
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          css={themeCss({
            mt: [2, 0, 0, 0],
            pt: [3, 3, 3, 0],
            pb: [3, 3, 3, 0],
            px: 0
          })}
        >
          <Flex
            css={themeCss({
              flexDirection: ['row', 'row', 'row', 'column']
            })}
          >
            {[
              { children: 'API', href: '/docs/api/getting-started/overview' },
              { children: 'Blog', href: '/blog' },
              { children: 'Chat', href: '/community' },
              { children: 'Status', href: '/status' }
            ].map(({ href, children }) => (
              <LinkSolid
                key={href}
                isDark={isDark}
                href={href}
                data-event-name='Footer'
                data-event-location={children}
                css={themeCss({
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
          css={themeCss({
            mb: [2, 0, 0, 0],
            pb: [3, 3, 3, 0],
            px: 0
          })}
        >
          <Flex
            css={themeCss({
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
                data-event-name='Footer'
                data-event-location={children}
                css={themeCss({
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
        <Box css={themeCss({ px: 0 })}>
          <Flex css={themeCss({ flexDirection: 'column' })}>
            <Flex
              css={themeCss({
                alignItems: 'center',
                justifyContent: ['center', 'inherit', 'inherit', 'inherit']
              })}
            >
              <Flex
                css={themeCss({
                  flexDirection: 'column'
                })}
              >
                <Healthcheck>
                  {({ isHealthy, isLoading }) => {
                    if (isLoading) {
                      return (
                        <LinkSolid
                          isDark={isDark}
                          data-event-location='Footer'
                          data-event-name='Status'
                          href='/status'
                          css={themeCss({
                            px: 0
                          })}
                        >
                          <Text
                            css={themeCss({
                              fontSize: [0, 0, 0, 1]
                            })}
                          >
                            Status Page
                          </Text>
                        </LinkSolid>
                      )
                    }

                    return (
                      <Link
                        data-event-location='Footer'
                        data-event-name='Status'
                        href='/status'
                        css={themeCss({
                          color: colors[textColor],
                          px: 0
                        })}
                      >
                        <Text
                          css={themeCss({
                            pb: [3, 3, 3, 0],
                            fontSize: [0, 0, 0, 1],
                            color: 'inherit'
                          })}
                        >
                          <Choose>
                            <Choose.When condition={isHealthy}>
                              <Dot.Success
                                css={themeCss({
                                  mr: 2
                                })}
                              />
                              All systems operational
                            </Choose.When>
                            <Choose.Otherwise>
                              <Dot.Warning
                                css={themeCss({
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
              </Flex>
            </Flex>

            <Hide breakpoints={[0, 1, 2]}>
              <Flex
                css={themeCss({
                  alignItems: 'center',
                  py: [0, 0, 0, 4]
                })}
              >
                <Text
                  css={themeCss({
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
                    data-event-name='Footer'
                    data-event-location={children}
                    css={themeCss({
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
              css={themeCss({
                alignItems: 'center',
                justifyContent: ['center', 'center', 'center', 'inherit'],
                mt: [3, 0, 0, 0]
              })}
            >
              {[
                {
                  href: 'https://github.com/microlinkhq',
                  children: 'GitHub',
                  title: '@microlinkhq on GitHub'
                },
                {
                  href: 'https://twitter.com/microlinkhq',
                  children: 'Twitter',
                  title: '@microlinkhq on Twitter'
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
                  css={themeCss({
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
