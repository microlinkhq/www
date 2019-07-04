import { Search as SearchIcon } from 'react-feather'
import {
  Subhead,
  Flex,
  Input,
  Link,
  Text,
  Box,
  ButtonSecondary,
  Container,
  Caps
} from 'components/elements'
import React, { Fragment } from 'react'
import { transition, colors } from 'theme'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import demoLinks from '@microlink/demo-links'
import humanizeUrl from 'humanize-url'
import { Header, DemoLinks, Microlink } from 'components/patterns'

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.5;
  transition: opacity ${transition.short};
  &:hover {
    opacity: 1;
  }
`

LogoWrap.defaultProps = {
  ...Box.defaultProps,
  display: 'inline-block'
}

const DEMO_LINK_KEYWORD = 'Instagram'
const DEMO_LINK_URL = demoLinks[DEMO_LINK_KEYWORD].url
const HUMANIZE_DEMO_LINK = humanizeUrl(DEMO_LINK_URL)

const SearchBox = ({ onSubmit, url, innerRef, isLoading }) => (
  <Container py={5} px={4}>
    <Subhead>Enter an URL, receive data</Subhead>

    <Flex
      pt={4}
      pb={3}
      as='form'
      justifyContent='center'
      onSubmit={onSubmit}
      autoComplete='on'
    >
      <Input
        defaultValue={url}
        fontSize={2}
        name='url'
        id='url'
        autoComplete='on'
        innerRef={innerRef}
        required
        type='url'
        placeholder='Type an URL...'
        width='12rem'
        iconComponent={<SearchIcon color={colors.black50} size={16} />}
      />

      <ButtonSecondary ml={2} loading={isLoading}>
        <Caps fontSize={1} children='Enter' />
      </ButtonSecondary>
    </Flex>

    <Box textAlign='center'>
      <Box pt={2} pb={3}>
        <Link href={DEMO_LINK_URL}>{HUMANIZE_DEMO_LINK}</Link>
        <Text pt={2} fontSize={2}>
          into rich media
        </Text>
      </Box>
      <Microlink media={['video']} url={DEMO_LINK_URL} />
    </Box>
  </Container>
)

const Examples = ({ demoLinks }) => (
  <Container
    py={5}
    px={4}
    maxWidth='100%'
    bg='pinky'
    borderColor='pinkest'
    borderTop='1px solid'
    borderBottom='1px solid'
  >
    <Header pb={5} title='Examples' caption='click to see a real example.' />
    <Box pt={4}>
      <DemoLinks
        children={demoLinks}
        onClick={({ brand }) => navigate(`/embed/${brand.toLowerCase()}`)}
      />
    </Box>
  </Container>
)

export default ({ demoLinks, onSubmit, url, innerRef, isLoading }) => (
  <Fragment>
    <SearchBox
      onSubmit={onSubmit}
      url={url}
      innerRef={innerRef}
      isLoading={isLoading}
    />
    <Examples demoLinks={demoLinks} />
  </Fragment>
)
