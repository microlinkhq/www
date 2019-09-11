import { Image as ImageIcon, Link as LinkIcon } from 'react-feather'
import {
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
import React, { useEffect, useState } from 'react'
import { Header, DemoLinks } from 'components/patterns'
import { Safari, HourGlass } from 'components/icons'
import { aspectRatio, getHostname } from 'helpers'
import { borders, transition, colors } from 'theme'
import demoLinks from '@microlink/demo-links'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import isColor from 'is-color'
import { noop, get } from 'lodash'

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
  display: 'inline-block'
}

const INTERVAL = 3500

const bgStyle = `
position: absolute;
top: 0px;
left: 0px;
will-change: opacity;
`

const AnimatedImage = animated(Image)

const DemoSlider = ({ children: slides }) => {
  const [height, setHeight] = useState(null)
  const [index, setIndex] = useState(0)

  const transitions = useTransition(slides[index], item => item.keyword, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  })

  const handleResize = () => {
    const el = document.querySelector('#animated-image-container img')
    if (el) setHeight(el.clientHeight)
  }

  const onLoad = () => {
    const el = document.querySelector('#animated-image-container img')
    if (el) setHeight(el.clientHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(
    () =>
      /* eslint-disable no-void */
      void setInterval(
        () => setIndex(state => (state + 1) % slides.length),
        INTERVAL
      ),
    /* eslint-enable no-void */ []
  )

  return (
    <Flex
      id='animated-image-container'
      mt={height ? [2, 1, 1, 1] : 4}
      style={{ position: 'relative' }}
      height={height ? `${height}px` : aspectRatio.heights}
      width={aspectRatio.widths}
    >
      {transitions.map(({ item, props, key }) => (
        <AnimatedImage
          key={key}
          src={item.cdnUrl}
          style={props}
          css={bgStyle}
          lazyHeight={aspectRatio.heights}
          lazyWidth={aspectRatio.widths}
          onLoad={key === 0 ? onLoad : noop}
        />
      ))}
    </Flex>
  )
}

const SearchBox = ({
  onSubmit,
  onChange,
  previewUrl,
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
      <Image src={`https://logo.clearbit.com/${hostnameUrl}`} size='16px' />
    ) : (
      <LinkIcon color={colors.black50} size='16px' />
    )

  const backgroundIconComponent = isColor(inputBg) ? (
    <Box
      border={1}
      borderColor='black10'
      borderRadius={1}
      width='14px'
      height='14px'
      style={{ top: '-2px', position: 'relative', background: inputBg }}
    />
  ) : (
    <ImageIcon color={colors.black50} size='16px' />
  )

  return (
    <Container py={5} px={4}>
      <Header
        subtitle='Take a screenshot of any website'
        caption='Turn websites into a snapshot'
      />

      <Flex
        pt={2}
        pb={3}
        as='form'
        justifyContent='center'
        onChange={onChange}
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
              { value: '#c1c1c1' },
              {
                value:
                  'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'
              },
              {
                value: 'https://source.unsplash.com/random/1920x1080'
              }
            ]}
          />
        </Box>

        <ButtonSecondary ml={2} loading={isLoading}>
          <Caps fontSize={1} children='Take it' />
        </ButtonSecondary>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        <Box mb='-12px'>
          <Text fontSize={2}>into a snapshot</Text>
        </Box>
        {previewUrl ? (
          <Image
            mt={4}
            width={aspectRatio.widths}
            lazyHeight={aspectRatio.heights}
            lazyWidth={aspectRatio.widths}
            src={previewUrl}
          />
        ) : (
          <DemoSlider children={DEMO_LINKS} />
        )}
      </Flex>
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
        onClick={({ brand }) => navigate(`/screenshot/${brand.toLowerCase()}`)}
      />
    </Box>
  </Container>
)

export default ({
  demoLinks,
  onSubmit,
  onChange,
  url,
  refUrl,
  refWaitFor,
  refOverlay,
  refBackground,
  isLoading,
  previewUrl
}) => (
  <>
    <SearchBox
      previewUrl={previewUrl}
      onSubmit={onSubmit}
      onChange={onChange}
      url={url}
      refUrl={refUrl}
      refWaitFor={refWaitFor}
      refOverlay={refOverlay}
      refBackground={refBackground}
      isLoading={isLoading}
    />
    <Examples demoLinks={demoLinks} />
  </>
)
