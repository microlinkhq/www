import { Link as LinkIcon } from 'react-feather'
import {
  Box,
  ButtonSecondary,
  Caps,
  Container,
  Flex,
  Image,
  Input,
  Text,
  ClearbitLogo
} from 'components/elements'

import { Header, DemoLinks, Microlink } from 'components/patterns'
import { borders, transition, colors } from 'theme'
import React, { useState } from 'react'
import demoLinks from '@microlink/demo-links'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import prependHttp from 'prepend-http'
import { debounceComponent, getHostname } from 'helpers'
import { navigate } from 'gatsby'
import isUrl from 'is-url-http'

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

const MicrolinkDebounce = debounceComponent(Microlink)

const DEMO_LINK_KEYWORD = 'Instagram'
const DEMO_LINK_URL = demoLinks[DEMO_LINK_KEYWORD].url
const HUMANIZE_DEMO_LINK = humanizeUrl(DEMO_LINK_URL)

const SearchBox = ({ onSubmit, url, isLoading }) => {
  const [inputValue, setInputValue] = useState(url || HUMANIZE_DEMO_LINK)
  const hostnameUrl = getHostname(inputValue)

  const urlIconComponent =
    inputValue && hostnameUrl ? (
      <ClearbitLogo size='16px' companyName={hostnameUrl} />
    ) : (
      <LinkIcon color={colors.black50} size='16px' />
    )

  return (
    <Container py={5} px={4}>
      <Header
        subtitle='Enter an URL, receive data'
        caption='Turn websites into rich media'
      />

      <Flex
        pt={2}
        pb={3}
        as='form'
        justifyContent='center'
        onSubmit={event => {
          event.preventDefault()
          const url = prependHttp(inputValue)
          onSubmit(isUrl(url) ? url : undefined)
        }}
      >
        <Input
          fontSize={2}
          iconComponent={urlIconComponent}
          id='embed-demo-url'
          placeholder='Enter an URL...'
          suggestions={[{ value: HUMANIZE_DEMO_LINK }]}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          width='12rem'
        />

        <ButtonSecondary ml={2} loading={isLoading}>
          <Caps fontSize={1} children='Embed it' />
        </ButtonSecondary>
      </Flex>

      <Box textAlign='center'>
        <Box pb={3}>
          <Text fontSize={2}>into rich media</Text>
        </Box>

        <MicrolinkDebounce
          url={
            isUrl(prependHttp(inputValue))
              ? prependHttp(inputValue)
              : DEMO_LINK_URL
          }
          media={['video', 'image', 'logo']}
        />
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

export default ({ demoLinks, onSubmit, url, isLoading }) => (
  <>
    <SearchBox onSubmit={onSubmit} url={url} isLoading={isLoading} />
    <Examples demoLinks={demoLinks} />
  </>
)
