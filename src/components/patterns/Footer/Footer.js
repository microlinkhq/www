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
import ChecklyStatus from '../ChecklyStatus/ChecklyStatus'
import { Microlink } from 'components/logos'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import get from 'dlv'

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
  textColor: 'black50',
  buttonColor: 'white',
  buttonBg: 'black',
  inputIconColor: colors.black40,
  iconColor: colors.black80
}

const DARK_THEME = {
  bg: 'black',
  textColor: 'white50',
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
    <Container maxWidth={layout.large}>
      <Flex
        as='footer'
        py={[0, 0, 4, 4]}
        bg={bg}
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent='space-between'
        alignItems='center'
        {...props}
      >
        <Box px={0}>
          <Flex flexDirection='column'>
            <Flex pb={2} justifyContent='center'>
              <Microlink />
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
              <Text
                color={textColor}
                fontSize={1}
                children='Turn websites into data'
              />
            </Flex>
            <Flex
              alignItems={['center', 'center', 'center', 'inherit']}
              flexDirection='column'
            >
              <Flex py={['24px', '24px', '24px', 3]}>
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
                      <Caps fontSize={0} children='Be Notified' />
                    </Button>
                  </Flex>
                </form>
              </Flex>
              <Text
                textAlign='center'
                color={textColor}
                fontSize={1}
                children='Early access & updates on new releases.'
              />
            </Flex>
          </Flex>
        </Box>
        <Box pt={[3, 3, 3, 0]} pb={[3, 3, 3, 0]} px={0}>
          <Flex flexDirection={['row', 'row', 'row', 'column']}>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='API'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/docs/api/getting-started/overview'
              children='API'
            />
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Integrations'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/integrations'
              children='Integrations'
            />
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Bug Reports'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='https://github.com/microlinkhq/open/issues/new?template=Bug_report.md'
              children='Bug Reports'
            />
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Stats'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/stats'
              children='Stats'
            />
          </Flex>
        </Box>
        <Box pb={[3, 3, 3, 0]} px={0}>
          <Flex flexDirection={['row', 'row', 'row', 'column']}>
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='SDK'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/docs/sdk/getting-started/overview/'
              children='SDK'
            />
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Blog'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/blog'
              children='Blog'
            />
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Feature Requests'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='https://github.com/microlinkhq/open/issues/new?template=Feature_request.md'
              children='Feature Requests'
            />
            <LinkSolid
              theme={theme}
              data-event-category='Footer'
              data-event-action='Pricing'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/#pricing'
              children='Pricing'
            />
          </Flex>
        </Box>
        <Box px={0}>
          <Flex flexDirection='column'>
            <Flex
              alignItems='center'
              justifyContent={['center', 'inherit', 'inherit', 'inherit']}
            >
              <Flex flexDirection='column'>
                <ChecklyStatus>
                  {({ data }) => {
                    const apiStatus = data || 'error'
                    if (apiStatus === 'error') {
                      return (
                        <LinkSolid
                          theme={theme}
                          px={0}
                          data-event-category='Footer'
                          data-event-action='Status'
                          href='/status'
                          children='Status'
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
                        children='Status'
                        color={colors[textColor]}
                      >
                        <Text fontSize={[0, 0, 0, 1]} color='inherit'>
                          <Choose>
                            <Choose.When condition={apiStatus === 'good'}>
                              <Dot.Success mr={2} />
                              All Systems Operational
                            </Choose.When>
                            <Choose.When condition={apiStatus === 'degraded'}>
                              <Dot.Warning mr={2} />
                              System Performance Degradation
                            </Choose.When>
                            <Choose.When condition={apiStatus === 'failing'}>
                              <Dot.Error mr={2} />
                              System Perfomance Issue
                            </Choose.When>
                          </Choose>
                        </Text>
                      </Link>
                    )
                  }}
                </ChecklyStatus>
              </Flex>
            </Flex>

            <Hide breakpoints={[0, 1, 2]}>
              <Flex alignItems='center' my={[0, 0, 0, 4]}>
                <Text
                  color={textColor}
                  mr={2}
                  children='© Microlink'
                  pb='2px'
                  fontSize={1}
                />
                <LinkSolid
                  theme={theme}
                  fontWeight='normal'
                  mr={2}
                  fontSize={0}
                  href='/tos'
                  data-event-category='Footer'
                  data-event-action='Terms'
                  children='Terms'
                />
                <LinkSolid
                  theme={theme}
                  fontWeight='normal'
                  fontSize={0}
                  data-event-category='Footer'
                  data-event-action='Privacy'
                  href='/privacy'
                  children='Privacy'
                />
              </Flex>
            </Hide>

            <Flex
              alignItems='center'
              justifyContent={['center', 'center', 'center', 'inherit']}
              mb={[0, 0, 0, 3]}
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
