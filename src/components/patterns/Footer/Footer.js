import React from 'react'
import {
  Container,
  Hide,
  LinkSolid,
  Caps,
  Box,
  Button,
  Flex,
  Input,
  Text
} from 'components/elements'

import { Mail, Slack, GitHub, Twitter } from 'react-feather'
import { layout, transition, colors } from 'theme'
import { Microlink } from 'components/logos'
import styled from 'styled-components'

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
        <Box px={0} pb={[3, 3, 3, 0]}>
          <Flex pb={[3, 3, 3, 0]} flexDirection='column'>
            <Flex pb={3} justifyContent='center'>
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
              data-event-action='Status'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/status'
              children='Status'
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
              data-event-action='Tech Support'
              fontSize={[0, 0, 0, 1]}
              mr={2}
              mb={[0, 0, 0, 3]}
              href='/chat'
              children='Tech Support'
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
            <Hide breakpoints={[0, 1, 2]}>
              <Flex alignItems='center'>
                <Flex flexDirection='column'>
                  <Text color={textColor} fontSize={1}>
                    Questions?
                  </Text>
                  <LinkSolid
                    theme={theme}
                    data-event-category='Footer'
                    data-event-action='Questions'
                    mt={3}
                    px={0}
                    href='mailto:hello@microlink.io'
                    children='We’d love to hear from you'
                  />
                </Flex>
              </Flex>
            </Hide>
            <Flex py={[3, 3, 3, 4]} alignItems='center'>
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
            <Flex
              alignItems='center'
              justifyContent={['center', 'center', 'center', 'inherit']}
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
