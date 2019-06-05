import React from 'react'
import {
  Container,
  Hide,
  LinkSolid,
  Caps,
  Box,
  ButtonOutline,
  Flex,
  Input,
  Text
} from 'components/elements'
import { Microlink } from 'components/logos'
import { Mail, Slack, GitHub, Twitter } from 'react-feather'
import styled from 'styled-components'
import { transition, colors } from 'theme'

const InputWrapper = styled(Flex)`
  border: 0;
  border-color: #abb4bd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  border: 0;
  appearance: none;
`

const IconWrapper = styled(Box)`
  cursor: pointer;
  opacity: 0.75;
  transition: all ${transition.short};

  &:hover {
    opacity: 1;
    > svg {
      stroke: ${colors.black};
    }
  }
`

export default props => (
  <Container px={[2, 2, 2, 0]}>
    <Flex
      as='footer'
      py={[4, 4, 4, 5]}
      mx='auto'
      bg='white'
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
              color='black50'
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
                  <InputWrapper alignItems='center' mr={2}>
                    <Box px={2} pt={1}>
                      <Mail color={colors.black50} size={16} />
                    </Box>
                    <Input
                      type='email'
                      name='EMAIL'
                      placeholder='you@domain.com'
                      width='9rem'
                      py={1}
                      px={0}
                      fontSize={0}
                    />
                  </InputWrapper>
                  <ButtonOutline
                    data-event-category='Footer'
                    data-event-action='Subscribe'
                    color='black'
                  >
                    <Caps fontSize={0} children='Subscribe' />
                  </ButtonOutline>
                </Flex>
              </form>
            </Flex>
            <Text
              textAlign='center'
              color='black50'
              fontSize={1}
              children='Early access & updates on new releases.'
            />
          </Flex>
        </Flex>
      </Box>
      <Box pt={[3, 3, 3, 0]} pb={[3, 3, 3, 0]} px={0}>
        <Flex flexDirection={['row', 'row', 'row', 'column']}>
          <LinkSolid
            data-event-category='Footer'
            data-event-action='API'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='/docs/api/getting-started/overview'
            children='API'
          />
          <LinkSolid
            data-event-category='Footer'
            data-event-action='Status'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='https://status.microlink.io'
            children='Status'
          />
          <LinkSolid
            data-event-category='Footer'
            data-event-action='Bug Reports'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='https://github.com/microlinkhq/open/issues/new?template=Bug_report.md'
            children='Bug Reports'
          />
          <LinkSolid
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
            data-event-category='Footer'
            data-event-action='SDK'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='/docs/sdk/getting-started/overview/'
            children='SDK'
          />
          <LinkSolid
            data-event-category='Footer'
            data-event-action='Pricing'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='/#pricing'
            children='Pricing'
          />
          <LinkSolid
            data-event-category='Footer'
            data-event-action='Feature Requests'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='https://github.com/microlinkhq/open/issues/new?template=Feature_request.md'
            children='Feature Requests'
          />
          <LinkSolid
            data-event-category='Footer'
            data-event-action='Design'
            fontSize={[0, 0, 0, 1]}
            mr={2}
            mb={[0, 0, 0, 3]}
            href='/design'
            children='Design'
          />
        </Flex>
      </Box>
      <Box px={0}>
        <Flex flexDirection='column'>
          <Hide breakpoints={[0, 1, 2]}>
            <Flex alignItems='center'>
              <Flex flexDirection='column'>
                <Text color='black50' fontSize={1}>
                  Questions?
                </Text>
                <LinkSolid
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
              color='black80'
              mr={2}
              children='© Microlink'
              style={{ opacity: '.75' }}
              pb={'2px'}
              fontSize={1}
            />
            <LinkSolid
              fontWeight='normal'
              mr={2}
              fontSize={0}
              href='/tos'
              data-event-category='Footer'
              data-event-action='Terms'
              children='Terms'
            />
            <LinkSolid
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
              <Slack color={colors.black80} size={20} />
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
              <GitHub color={colors.black80} size={20} />
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
              <Mail color={colors.black80} size={20} />
            </IconWrapper>
            <IconWrapper
              data-event-category='Footer'
              data-event-action='Twitter'
              rel='noopener noreferrer'
              target='_blank'
              as='a'
              href='https://twitter.com/microlinkhq'
            >
              <Twitter color={colors.black80} size={20} />
            </IconWrapper>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  </Container>
)
