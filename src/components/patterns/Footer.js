import React from 'react'
import { Hide, LinkSolid, Caps, Small, Box, Row, PrimaryButton, Flex, Input, Text } from 'components/elements'
import { Microlink } from 'components/logos'
import { Mail, Slack, Github, Twitter } from 'react-feather'
import styled from 'styled-components'
import { transition, colors } from 'theme'

const InputWrapper = styled(Flex)`
border: 0;
border-color: #abb4bd;
box-shadow: 0 1px 2px rgba(0,0,0,0.24);
border-radius: 4px;
border: 0;
appearance: none;
`

const IconWrapper = styled(Box)`
  cursor: pointer;
  opacity: .75;
  transition: all ${transition.short};

  &:hover {
    opacity: 1;
    > svg  {
      stroke: ${colors.black};
    }
  }
`

export default props => (
  <Row is='footer' px={3} py={5} mx='auto' bg='white' flexDirection={['column', 'row']} justifyContent='space-around' alignItems='center' {...props}>
    <Box px={0}>
      <Flex pb={[3, 0]} flexDirection='column'>
        <Flex pb={3} justifyContent='center'><Microlink /></Flex>
        <Flex flexDirection='column'>
          <Text color='black50' fontSize={1} children='Extract structured data from any website.' />
        </Flex>
        <Flex alignItems={['center', 'inherit']} flexDirection='column'>
          <Flex py={['24px', 3]}>
            <form
              action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
              method='post'>
              <Flex>
                <InputWrapper alignItems='center' mr={2}>
                  <Box px={2} pt={1}><Mail color={colors.black50} size={16} /></Box>
                  <Input
                    name='EMAIL'
                    placeholder='you@domain.com'
                    width='9rem'
                    py={1}
                    px={0}
                    fontSize={0} />
                </InputWrapper>
                <PrimaryButton>
                  <Caps fontSize={0} children='Subscribe' />
                </PrimaryButton>
              </Flex>
            </form>
          </Flex>
          <Text color='black50' fontSize={0} children='Early access & updates on new releases.' />
        </Flex>
      </Flex>
    </Box>
    <Box pt={[3, 0]} pb={3} px={0}>
      <Flex flexDirection={['row', 'column']}>
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/privacy' children='API' />
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/privacy' children='Status Page' />
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/terms' children='Bug Reports' />
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/terms' children='Tech Support' />

      </Flex>
    </Box>
    <Box pb={[3, 0]} px={0}>
      <Flex flexDirection={['row', 'column']}>
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/terms' children='SDK' />
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/terms' children='Pricing' />
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/privacy' children='Feature Requests' />
        <LinkSolid fontSize={1} mr={2} mb={[0, 3]} href='/privacy' children='Gallery' />
      </Flex>
    </Box>
    <Box px={0}>
      <Flex flexDirection='column'>
        <Hide breakpoints={[0, 1]}>
          <Flex alignItems='center'>
            <Flex flexDirection='column'>
              <Small color='black50' fontSize={1}>Questions?</Small>
              <LinkSolid mt={3} px={0} children='We’d love to hear from you' />
            </Flex>
          </Flex>
        </Hide>
        <Flex py={[3, 4]} alignItems='center'>
          <Small color='black80' mr={2} children='© Microlink' style={{opacity: '.75'}} pb={'2px'} />
          <LinkSolid fontWeight='normal' mr={2} fontSize={0} href='/tos' children='Terms' />
          <LinkSolid fontWeight='normal' fontSize={0} href='/privacy' children='Privacy' />
        </Flex>
        <Flex alignItems='center' justifyContent={['center', 'inherit']}>
          <IconWrapper mr={3}><Slack color={colors.black80} size={20} /></IconWrapper>
          <IconWrapper mr={3}><Github color={colors.black80} size={20} /></IconWrapper>
          <IconWrapper mr={3}><Mail color={colors.black80} size={20} /></IconWrapper>
          <IconWrapper><Twitter color={colors.black80} size={20} /></IconWrapper>
        </Flex>
      </Flex>
    </Box>
  </Row>
)
