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
  <Container px={[2, 0]}>
    <Flex
      as='footer'
      py={[4, 5]}
      mx='auto'
      bg='white'
      flexDirection={['column', 'row']}
      justifyContent='space-between'
      alignItems='center'
      {...props}
    >
      <Box px={0} pb={[3, 0]}>
        <Flex pb={[3, 0]} flexDirection='column'>
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
          <Flex alignItems={['center', 'inherit']} flexDirection='column'>
            <Flex py={['24px', 3]}>
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
                  <ButtonOutline color='black'>
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
      <Box pt={[3, 0]} pb={[3, 0]} px={0}>
        <Flex flexDirection={['row', 'column']}>
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='https://docs.microlink.io/api/#introduction'
            children='API'
          />
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='https://microlinkhq.checklyhq.com'
            children='Status Page'
          />
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='https://github.com/microlinkhq/open/issues/new?template=Bug_report.md'
            children='Bug Reports'
          />
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='/chat'
            children='Tech Support'
          />
        </Flex>
      </Box>
      <Box pb={[3, 0]} px={0}>
        <Flex flexDirection={['row', 'column']}>
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='https://docs.microlink.io/sdk/'
            children='SDK'
          />
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='/#pricing'
            children='Pricing'
          />
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='https://github.com/microlinkhq/open/issues/new?template=Feature_request.md'
            children='Feature Requests'
          />
          <LinkSolid
            fontSize={[0, 1]}
            mr={2}
            mb={[0, 3]}
            href='/design'
            children='Design'
          />
        </Flex>
      </Box>
      <Box px={0}>
        <Flex flexDirection='column'>
          <Hide breakpoints={[0, 1]}>
            <Flex alignItems='center'>
              <Flex flexDirection='column'>
                <Text color='black50' fontSize={1}>
                  Questions?
                </Text>
                <LinkSolid
                  mt={3}
                  px={0}
                  href='mailto:hello@microlink.io'
                  children='We’d love to hear from you'
                />
              </Flex>
            </Flex>
          </Hide>
          <Flex py={[3, 4]} alignItems='center'>
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
              children='Terms'
            />
            <LinkSolid
              fontWeight='normal'
              fontSize={0}
              href='/privacy'
              children='Privacy'
            />
          </Flex>
          <Flex alignItems='center' justifyContent={['center', 'inherit']}>
            <IconWrapper as='a' href='/chat' mr={3}>
              <Slack color={colors.black80} size={20} />
            </IconWrapper>
            <IconWrapper
              rel='noopener noreferrer'
              target='_blank'
              as='a'
              href='https://github.com/microlinkhq'
              mr={3}
            >
              <GitHub color={colors.black80} size={20} />
            </IconWrapper>
            <IconWrapper
              rel='noopener noreferrer'
              target='_blank'
              as='a'
              href='mailto:hello@microlink.io'
              mr={3}
            >
              <Mail color={colors.black80} size={20} />
            </IconWrapper>
            <IconWrapper
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
