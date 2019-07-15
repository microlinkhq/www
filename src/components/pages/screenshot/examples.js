import { Image as ImageIcon, Link as LinkIcon } from 'react-feather'
import {
  Subhead,
  Flex,
  Input,
  Text,
  Box,
  ButtonSecondary,
  Container,
  Caps,
  Image
} from 'components/elements'

import { Header, DemoLinks } from 'components/patterns'
import { Safari, HourGlass } from 'components/icons'
import React, { useState, Fragment } from 'react'
import demoLinks from '@microlink/demo-links'
import { transition, colors } from 'theme'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import { getHostname } from 'helpers'
import { navigate } from 'gatsby'
import isColor from 'is-color'
import { get } from 'lodash'

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

const DEMO_LINK_KEYWORD = 'Netflix'
const DEMO_LINK_URL = demoLinks[DEMO_LINK_KEYWORD].url
const HUMANIZE_DEMO_LINK = humanizeUrl(DEMO_LINK_URL)
const CDN_URL = `https://cdn.microlink.io/screenshot/browser/dark/${DEMO_LINK_KEYWORD.toLowerCase()}.png`

const SearchBox = ({
  onSubmit,
  url,
  refUrl,
  refWaitFor,
  refOverlay,
  refBackground,
  isLoading
}) => {
  const [inputBg, setInputBg] = useState(get(refBackground, 'current.value'))
  const [inputUrl, setInputUrl] = useState(url || HUMANIZE_DEMO_LINK)
  const hostnameUrl = getHostname(inputUrl)

  const urlIconComponent =
    inputUrl && hostnameUrl ? (
      <Image src={`https://logo.clearbit.com/${hostnameUrl}`} size={16} />
    ) : (
      <LinkIcon color={colors.black50} size={16} />
    )

  const backgroundIconComponent = isColor(inputBg) ? (
    <Box
      borderRadius={1}
      width='14px'
      height='14px'
      style={{ top: '-2px', position: 'relative', background: inputBg }}
    />
  ) : (
    <ImageIcon color={colors.black50} size={16} />
  )

  return (
    <Container py={5} px={4}>
      <Subhead>Take screenshot of any website</Subhead>

      <Flex pt={4} pb={3} as='form' justifyContent='center' onSubmit={onSubmit}>
        <Input
          fontSize={2}
          iconComponent={urlIconComponent}
          id='screenshot-demo-url'
          innerRef={refUrl}
          mr='6px'
          onChange={event => setInputUrl(event.target.value)}
          placeholder='Visit URL'
          suggestions={[{ value: 'microlink.io' }, { value: 'kikobeats.com' }]}
          type='text'
          value={inputUrl}
          width='100px'
        />

        <Box ml={2}>
          <Input
            placeholder='Wait for'
            id='screenshot-demo-waitfor'
            type='text'
            fontSize={2}
            width='74px'
            mr='6px'
            innerRef={refWaitFor}
            iconComponent={<HourGlass color={colors.black50} width='11px' />}
            suggestions={[{ value: '0s' }, { value: '1.5s' }, { value: '3s' }]}
          />
        </Box>

        <Box ml={2}>
          <Input
            placeholder='Overlay'
            id='screenshot-demo-overlay'
            type='text'
            fontSize={2}
            width='73px'
            mr='6px'
            innerRef={refOverlay}
            iconComponent={<Safari color={colors.black50} width='16px' />}
            suggestions={[
              { value: 'none' },
              { value: 'dark' },
              { value: 'light' }
            ]}
          />
        </Box>

        <Box ml={2}>
          <Input
            placeholder='Background'
            id='screenshot-demo-background'
            type='text'
            fontSize={2}
            width='105px'
            mr='6px'
            onChange={event => setInputBg(event.target.value)}
            innerRef={refBackground}
            iconComponent={backgroundIconComponent}
            suggestions={[
              { value: 'transparent' },
              { value: '#c1c1c1' },
              {
                value:
                  'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'
              }
            ]}
          />
        </Box>

        <ButtonSecondary ml={2} loading={isLoading}>
          <Caps fontSize={1} children='GO' />
        </ButtonSecondary>
      </Flex>

      <Box textAlign='center'>
        <Box mb={'-12px'}>
          <Text fontSize={2}>into a snapshot</Text>
        </Box>
        <Image src={CDN_URL} />
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
    borderColor='pinkest'
    borderTop='1px solid'
    borderBottom='1px solid'
  >
    <Header pb={5} title='Examples' caption='click to see a real example.' />
    <Box pt={4}>
      <DemoLinks
        children={demoLinks}
        onClick={({ brand }) => navigate(`/screenshot/${brand.toLowerCase()}`)}
      />
    </Box>
  </Container>
)

export default ({
  demoLinks,
  onSubmit,
  url,
  refUrl,
  refWaitFor,
  refOverlay,
  refBackground,
  isLoading
}) => (
  <Fragment>
    <SearchBox
      onSubmit={onSubmit}
      url={url}
      refUrl={refUrl}
      refWaitFor={refWaitFor}
      refOverlay={refOverlay}
      refBackground={refBackground}
      isLoading={isLoading}
    />
    <Examples demoLinks={demoLinks} />
  </Fragment>
)
