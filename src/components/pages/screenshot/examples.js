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

import { useTransition, animated, config } from 'react-spring'
import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Header, DemoLinks } from 'components/patterns'
import { Safari, HourGlass } from 'components/icons'
import { transition, colors, borders } from 'theme'
import demoLinks from '@microlink/demo-links'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import { getHostname } from 'helpers'
import { navigate } from 'gatsby'
import isColor from 'is-color'
import { get } from 'lodash'

const DEMO_LINKS = [
  { theme: 'dark', keyword: 'Netflix' },
  { theme: 'dark', keyword: 'Apple' },
  { theme: 'light', keyword: 'Change' },
  { theme: 'light', keyword: 'MDN' },
  { theme: 'light', keyword: 'TheVerge' },
  { theme: 'dark', keyword: 'Time' },
  { theme: 'light', keyword: 'TechCrunch' }
].map(item => {
  return {
    ...item,
    humanizedUrl: humanizeUrl(demoLinks[item.keyword].url),
    cdnUrl: `https://cdn.microlink.io/screenshot/browser/${
      item.theme
    }/${item.keyword.toLowerCase()}.png`
  }
})

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

const INTERVAL = 5000

const BLUR_IN = 'blur(15px)'
const BLUR_OUT = 'blur(0px)'

const bgStyle = `
position: absolute;
top: 0px;
left: 0px;
`

const AnimatedImage = animated(Image)

const DemoSlider = ({ children: slides }) => {
  const [height, setHeight] = useState(null)
  const [index, set] = useState(0)
  const imgEl = useRef(null)

  const transitions = useTransition(slides[index], item => item.keyword, {
    initial: { opacity: 0, filter: BLUR_IN },
    from: { opacity: 0, filter: BLUR_IN },
    enter: { opacity: 1, filter: BLUR_OUT },
    leave: { opacity: 0, filter: BLUR_IN },
    config: config.molasses
  })

  const handleResize = () =>
    setHeight(document.getElementById('animated-image').clientHeight)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(
    () =>
      void setInterval(
        () => set(state => (state + 1) % slides.length),
        INTERVAL
      ),
    []
  )

  return (
    <Flex
      mt={[2, 1, 1, 1]}
      style={{
        position: 'relative',
        height
      }}
    >
      {height ? (
        transitions.map(({ item, props, key }) => (
          <AnimatedImage
            id='animated-image'
            key={key}
            src={item.cdnUrl}
            style={props}
            css={bgStyle}
          />
        ))
      ) : (
        <Image
          ref={imgEl}
          src={slides[0].cdnUrl}
          onLoad={() => setHeight(imgEl.current.clientHeight)}
        />
      )}
    </Flex>
  )
}

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
  const [inputUrl, setInputUrl] = useState(url)
  const hostnameUrl = getHostname(inputUrl)

  const urlIconComponent =
    inputUrl && hostnameUrl ? (
      <Image src={`https://logo.clearbit.com/${hostnameUrl}`} size={16} />
    ) : (
      <LinkIcon color={colors.black50} size={16} />
    )

  const backgroundIconComponent = isColor(inputBg) ? (
    <Box
      border={borders[1]}
      borderColor={'black10'}
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
      <Subhead>Take a screenshot of any website</Subhead>

      <Flex
        pt={4}
        pb={3}
        as='form'
        justifyContent='center'
        onSubmit={onSubmit}
        flexDirection={['column', 'row', 'row', 'row']}
      >
        <Box ml={2} mb={[3, 0, 0, 0]}>
          <Input
            fontSize={2}
            iconComponent={urlIconComponent}
            id='screenshot-demo-url'
            innerRef={refUrl}
            mr='6px'
            onChange={event => setInputUrl(event.target.value)}
            placeholder='Visit URL'
            suggestions={DEMO_LINKS.map(({ humanizedUrl }) => ({
              value: humanizedUrl
            }))}
            type='text'
            value={inputUrl}
            width='100px'
          />
        </Box>

        <Box ml={2} mb={[3, 0, 0, 0]}>
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

        <Box ml={2} mb={[3, 0, 0, 0]}>
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

        <Box ml={2} mb={[3, 0, 0, 0]}>
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
        <DemoSlider children={DEMO_LINKS} />
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
    borderTop={borders[1]}
    borderBottom={borders[1]}
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
