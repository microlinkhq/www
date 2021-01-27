import React from 'react'
import {
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

import { Mail, Slack, GitHub, Twitter } from 'react-feather'
import { layout, transition, colors } from 'theme'
import Healthcheck from '../Healthcheck/Healthcheck'
import { Microlink } from 'components/logos'
import styled from 'styled-components'
import { Choose } from 'react-extras'

const IconWrapper = styled(Box)`
  cursor: pointer;
  opacity: 0.75;
  transition: all ${transition.medium};

  &:hover {
    opacity: 1;
    > svg {
      stroke: ${colors.black};
    }
  }
`

const LIGHT_THEME = {
  bg: 'white',
  textColor: 'black60',
  buttonColor: 'white',
  buttonBg: 'black',
  inputIconColor: colors.black40,
  iconColor: colors.black80
}

const DARK_THEME = {
  bg: 'black',
  textColor: 'white60',
  buttonColor: 'black',
  buttonBg: 'white',
  inputIconColor: colors.white40,
  iconColor: colors.white80
}

export default ({ theme, ...props }) => {
  const isDark = theme === 'dark'
  const {
    bg,
    textColor,
    buttonColor,
    buttonBg,
    inputIconColor,
    iconColor
  } = isDark ? DARK_THEME : LIGHT_THEME

  return (
    <Container px={0} maxWidth={layout.large} pb={Container.defaultProps.pt}>
      <Flex
        as='footer'
        bg={bg}
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent='space-between'
        alignItems='center'
        {...props}
      >
        <Box px={0}>
          <Flex flexDirection='column'>
            <Flex justifyContent='center'>
              <Microlink />
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
              <Text color={textColor} fontSize={1} pt={3}>
                Turn websites into data
              </Text>
            </Flex>
            <Flex
              alignItems={['center', 'center', 'center', 'inherit']}
              flexDirection='column'
            >
              <Flex pt={3}>
                <form
                  action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
                  method='post'
                >
                  <Flex>
                    <Input
                      type='email'
                      name='EMAIL'
                      placeholder='you@domain.com'
                      width='8rem'
                      fontSize={0}
                      iconComponent={<Mail color={inputIconColor} size={16} />}
                      theme={theme}
                    />

                    <Button
                      ml={2}
                      data-event-category='Footer'
                      data-event-action='Be Notified'
                      bg={buttonBg}
                      color={buttonColor}
                    >
                      <Caps fontSize={0}>Be Notified</Caps>
                    </Button>
                  </Flex>
                </form>
              </Flex>
              <Text textAlign='center' color={textColor} fontSize={1} pt={3}>
                Early access & updates on new releases.
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box mt={[2, 0, 0, 0]} pt={[3, 3, 3, 0]} pb={[3, 3, 3, 0]} px={0}>
          <Flex flexDirection={['row', 'row', 'row', 'column']}>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='API'
              fontSize={[0, 0, 0, 1]}
              mr={[2, 2, 2, 0]}
              mb={[0, 0, 0, 3]}
              href='/docs/api/getting-started/overview'
            >
              API
            </LinkSolid>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Blog'
              fontSize={[0, 0, 0, 1]}
              mr={[2, 2, 2, 0]}
              mb={[0, 0, 0, 3]}
              href='/blog'
            >
              Blog
            </LinkSolid>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Chat'
              fontSize={[0, 0, 0, 1]}
              mr={[2, 2, 2, 0]}
              mb={[0, 0, 0, 3]}
              href='/chat'
            >
              Chat
            </LinkSolid>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Status'
              fontSize={[0, 0, 0, 1]}
              href='/status'
            >
              Status
            </LinkSolid>
          </Flex>
        </Box>
        <Box mb={[2, 0, 0, 0]} pb={[3, 3, 3, 0]} px={0}>
          <Flex flexDirection={['row', 'row', 'row', 'column']}>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='SDK'
              fontSize={[0, 0, 0, 1]}
              mr={[2, 2, 2, 0]}
              mb={[0, 0, 0, 3]}
              href='/docs/sdk/getting-started/overview/'
            >
              SDK
            </LinkSolid>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Pricing'
              fontSize={[0, 0, 0, 1]}
              mr={[2, 2, 2, 0]}
              mb={[0, 0, 0, 3]}
              href='/#pricing'
            >
              Pricing
            </LinkSolid>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Open Source'
              fontSize={[0, 0, 0, 1]}
              mr={[2, 2, 2, 0]}
              mb={[0, 0, 0, 3]}
              href='/oss'
            >
              Open Source
            </LinkSolid>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Bug Reports'
              fontSize={[0, 0, 0, 1]}
              href='https://github.com/microlinkhq/open/issues/new?template=Bug_report.md'
            >
              Bug Reports
            </LinkSolid>
          </Flex>
        </Box>
        <Box px={0}>
          <Flex flexDirection='column'>
            <Flex
              alignItems='center'
              justifyContent={['center', 'inherit', 'inherit', 'inherit']}
            >
              <Flex flexDirection='column'>
                <Healthcheck>
                  {({ isHealthy, isLoading }) => {
                    if (isLoading) {
                      return (
                        <LinkSolid
                          theme={theme}
                          px={0}
                          data-event-category='Footer'
                          data-event-action='Status'
                          href='/status'
                        >
                          <Text fontSize={[0, 0, 0, 1]}>Status Page</Text>
                        </LinkSolid>
                      )
                    }

                    return (
                      <Link
                        theme={theme}
                        px={0}
                        data-event-category='Footer'
                        data-event-action='Status'
                        href='/status'
                        color={colors[textColor]}
                      >
                        <Text
                          pb={[3, 3, 3, 0]}
                          fontSize={[0, 0, 0, 1]}
                          color='inherit'
                        >
                          <Choose>
                            <Choose.When condition={isHealthy}>
                              <Dot.Success mr={2} />
                              All Systems Operational
                            </Choose.When>
                            <Choose.Otherwise>
                              <Dot.Warning mr={2} />
                              System Performance Degradation
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
              <Flex alignItems='center' py={[0, 0, 0, 4]}>
                <Text color={textColor} mr={2} pb='2px' fontSize={1}>
                  © Microlink
                </Text>
                <LinkSolid
                  theme={theme}
                  fontWeight='normal'
                  mr={2}
                  fontSize={0}
                  href='/tos'
                  data-event-category='Footer'
                  data-event-action='Terms'
                >
                  Terms
                </LinkSolid>
                <LinkSolid
                  theme={theme}
                  fontWeight='normal'
                  fontSize={0}
                  data-event-category='Footer'
                  data-event-action='Privacy'
                  href='/privacy'
                >
                  Privacy
                </LinkSolid>
              </Flex>
            </Hide>

            <Flex
              alignItems='center'
              justifyContent={['center', 'center', 'center', 'inherit']}
              mt={[3, 0, 0, 0]}
            >
              <IconWrapper
                data-event-category='Footer'
                data-event-action='Slack'
                as='a'
                href='/chat'
                mr={3}
              >
                <Slack color={iconColor} size={20} />
              </IconWrapper>
              <IconWrapper
                data-event-category='Footer'
                data-event-action='GitHub'
                rel='noopener noreferrer'
                target='_blank'
                as='a'
                href='https://github.com/microlinkhq'
                mr={3}
              >
                <GitHub color={iconColor} size={20} />
              </IconWrapper>
              <IconWrapper
                data-event-category='Footer'
                data-event-action='Email'
                rel='noopener noreferrer'
                target='_blank'
                as='a'
                href='mailto:hello@microlink.io'
                mr={3}
              >
                <Mail color={iconColor} size={20} />
              </IconWrapper>
              <IconWrapper
                mr={0}
                data-event-category='Footer'
                data-event-action='Twitter'
                rel='noopener noreferrer'
                target='_blank'
                as='a'
                href='https://twitter.com/microlinkhq'
              >
                <Twitter color={iconColor} size={20} />
              </IconWrapper>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}
