import { Link as LinkIcon } from 'react-feather'
import {
  Box,
  ButtonSecondary,
  Caps,
  Container,
  Flex,
  Image,
  Input,
  Text
} from 'components/elements'

import { Header, DemoLinks, Microlink } from 'components/patterns'
import { borders, transition, colors } from 'theme'
import React, { useState } from 'react'
import demoLinks from '@microlink/demo-links'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import { getHostname } from 'helpers'
import { navigate } from 'gatsby'

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.5;
  transition: opacity ${transition.short};
  &:hover {
    opacity: 1;
  }
`

LogoWrap.defaultProps = {
  display: 'inline-block'
}

const DEMO_LINK_KEYWORD = 'Instagram'
const DEMO_LINK_URL = demoLinks[DEMO_LINK_KEYWORD].url
const HUMANIZE_DEMO_LINK = humanizeUrl(DEMO_LINK_URL)

const SearchBox = ({ onSubmit, url, innerRef, isLoading }) => {
  const [inputUrl, setInputUrl] = useState(url || HUMANIZE_DEMO_LINK)
  const hostnameUrl = getHostname(inputUrl)

  const urlIconComponent =
    inputUrl && hostnameUrl ? (
      <Image src={`https://logo.clearbit.com/${hostnameUrl}`} size='16px' />
    ) : (
      <LinkIcon color={colors.black50} size='16px' />
    )

  return (
    <Container py={5} px={4}>
      <Header
        subtitle='Enter an URL, receive data'
        caption='Turn websites into rich media'
      />

      <Flex pt={2} pb={3} as='form' justifyContent='center' onSubmit={onSubmit}>
        <Input
          fontSize={2}
          iconComponent={urlIconComponent}
          id='embed-demo-url'
          innerRef={innerRef}
          placeholder='Enter an URL...'
          suggestions={[{ value: HUMANIZE_DEMO_LINK }]}
          value={inputUrl}
          onChange={event => setInputUrl(event.target.value)}
          width='12rem'
        />

        <ButtonSecondary ml={2} loading={isLoading}>
          <Caps fontSize={1} children='Go' />
        </ButtonSecondary>
      </Flex>

      <Box textAlign='center'>
        <Box pb={3}>
          <Text fontSize={2}>into rich media</Text>
        </Box>
        <Microlink media={['video']} url={DEMO_LINK_URL} />
      </Box>
    </Container>
  )
}

const Examples = ({ demoLinks }) => (
  <Container
    py={5}
    px={4}
    maxWidth='100%'
    bg='pinky'
    borderTop={`${borders[1]} ${colors.pinkest}`}
    borderBottom={`${borders[1]} ${colors.pinkest}`}
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
  <>
    <SearchBox
      onSubmit={onSubmit}
      url={url}
      innerRef={innerRef}
      isLoading={isLoading}
    />
    <Examples demoLinks={demoLinks} />
  </>
)
