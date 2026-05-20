import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { borders, colors, radii, theme, transition } from 'theme'

import LinkPreviewRaw from '@microlink/react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'

import {
  siProducthunt,
  siSoundcloud,
  siSpotify,
  siTed,
  siVimeo,
  siYoutube
} from 'simple-icons'

import { HeroCard } from './PreviewCards'

const YOUTUBE_DEMO_DATA = {
  title: 'Wormholes Explained – Breaking Spacetime',
  description:
    'To support Kurzgesagt and learn more about Brilliant, go to https://www.brilliant.org/nutshell and sign up for free.',
  url: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
  publisher: 'YouTube',
  author: 'Kurzgesagt – In a Nutshell',
  image: {
    url: 'https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/img.youtube.com!vi!9P6rdqiybaw!maxresdefault.jpg.jpg',
    palette: ['#C004F9', '#EEEEA7', '#25047C', '#740296', '#808018', '#2C0494'],
    background_color: '#EEEEA7',
    color: '#AC04DF',
    alternative_color: '#2C0494'
  },
  logo: {
    url: 'https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/logo.clearbit.com!youtube.com.png',
    palette: ['#FC0404', '#FC8484', '#830101', '#970101', '#950303'],
    background_color: '#FC0404',
    color: '#320000'
  },
  iframe: {
    html: '<iframe width="640" height="360" src="https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    scripts: []
  }
}

const SPOTIFY_DEMO_DATA = {
  title: 'Beat It',
  description: 'Spotify Web',
  url: 'https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw',
  publisher: 'Spotify',
  author: 'Michael Jackson',
  image: {
    url: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27332a7d87248d1b75463483df5',
    palette: ['#D6D4C4', '#9FABA8', '#877563', '#171C1E', '#7B9096', '#5B6A67'],
    background_color: '#D6D4C4',
    color: '#171C1E',
    alternative_color: '#625548'
  },
  logo: {
    url: 'https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png',
    palette: ['#1ED760', '#1ED860', '#1ED961', '#1EDB62', '#1EDA61'],
    background_color: '#1ED760',
    color: '#0C5526'
  },
  iframe: {
    html: '<iframe style="border-radius: 12px" width="100%" height="152" title="Spotify Embed: Beat It" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src="https://open.spotify.com/embed/track/3BovdzfaX4jb5KFQwoPfAw?utm_source=oembed"></iframe>',
    scripts: []
  }
}

const VIMEO_DEMO_DATA = {
  title: "Converse All Star Modern - Director's Cut",
  description:
    'Past meets present is the main concept of the new Converse collection. Inspired by a particular environment each sneaker get transformed from the original retro version to a totally brand new one.',
  url: 'https://vimeo.com/186386161',
  publisher: 'vimeo.com',
  author: 'pleid',
  image: {
    url: 'https://cdn.microlink.io/data/assets/vimeo.com!186386161/i.vimeocdn.com!filter!overlay!src0=https!i.vimeocdn.com!video!596415462_1280x720.jpg&src1=https!f.vi',
    palette: ['#9E6039', '#EBD6B9', '#4E220E', '#A3724F', '#CCBCA9', '#554029'],
    background_color: '#EBD6B9',
    color: '#4E220E',
    alternative_color: '#824F2F'
  },
  logo: {
    url: 'https://cdn.microlink.io/data/assets/vimeo.com!186386161/logo.clearbit.com!vimeo.com.png',
    palette: ['#887676', '#C1B7B7', '#473D3D', '#545454', '#514747'],
    background_color: '#887676',
    color: '#0F0D0D'
  },
  iframe: {
    html: '<iframe src="https://player.vimeo.com/video/186386161?app_id=122963" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title="Converse All Star Modern"></iframe>',
    scripts: []
  }
}

const TED_DEMO_DATA = {
  title: 'What I learned from 100 days of rejection',
  description:
    'Jia Jiang adventures boldly into a territory so many of us fear: rejection. By seeking out rejection for 100 days -- from asking a stranger to borrow $100 to requesting a "burger refill" at a restaurant.',
  url: 'https://www.ted.com/talks/jia_jiang_what_i_learned_from_100_days_of_rejection',
  publisher: 'ted.com',
  author: 'Jia Jiang',
  image: {
    url: 'https://cdn.microlink.io/data/assets/ted.com!talks!jia_jiang_what_i_learned_from_100_days_of_rejection/pi.tedcdn.com!r!talkstar-photos.s3.amazonaws.com!uploads!c4a42ee3-cf78-419d-88a0-cd5194b4432a!JiaJia',
    palette: ['#AE6C4C', '#DAAA94', '#795C0F', '#AB7462', '#C8ACCC', '#263253'],
    background_color: '#AE6C4C',
    color: '#140F02',
    alternative_color: '#FFFFFF'
  },
  logo: {
    url: 'https://cdn.microlink.io/data/assets/ted.com!talks!jia_jiang_what_i_learned_from_100_days_of_rejection/logo.clearbit.com!ted.com.png',
    palette: ['#E42C1C', '#F49A93', '#76160E', '#881910', '#8A170E'],
    background_color: '#E42C1C',
    color: '#100302'
  },
  iframe: {
    html: '<iframe src="https://embed.ted.com/talks/jia_jiang_what_i_learned_from_100_days_of_rejection" width="560" height="316" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
    scripts: []
  }
}

const SOUNDCLOUD_DEMO_DATA = {
  title: 'Wake Me Up',
  description:
    "Avicii's 2013 anthem — over a billion plays on SoundCloud and counting. Uploaded by the official Avicii channel.",
  url: 'https://soundcloud.com/aviciiofficial/wake-me-up',
  publisher: 'SoundCloud',
  author: 'Avicii',
  image: {
    url: 'https://api.microlink.io/?url=https%3A%2F%2Fsoundcloud.com%2Faviciiofficial%2Fwake-me-up&embed=image.url',
    palette: ['#FF5500', '#1A1A1A', '#FFFFFF', '#FF7733', '#333333', '#FFB088'],
    background_color: '#FF5500',
    color: '#FFFFFF',
    alternative_color: '#1A1A1A'
  },
  logo: {
    url: 'https://api.microlink.io/?url=https%3A%2F%2Fsoundcloud.com&embed=logo.url',
    palette: ['#FF5500', '#FF7733', '#CC4400', '#FFB088', '#993300'],
    background_color: '#FF5500',
    color: '#FFFFFF'
  },
  iframe: {
    html: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/aviciiofficial/wake-me-up&color=%23ff5500&inverse=false&auto_play=false&show_user=true"></iframe>',
    scripts: []
  }
}

const PRODUCTHUNT_DEMO_DATA = {
  lang: 'en',
  title: 'Notion: The all-in-one workspace | Product Hunt',
  description:
    'Notion is an all-in-one workspace that combines note-taking, project management, and task organization. It allows users to create customized databases, documents, and calendars to streamline their personal and professional workflows.',
  url: 'https://www.producthunt.com/products/notion',
  publisher: 'Product Hunt',
  author: 'Simon Last and Jake Teton-Landis and Gilbert Zhang',
  image: {
    url: 'https://ph-files.imgix.net/ec03bc21-2f1c-492f-aa41-69bee47d631a.jpeg?auto=format&fit=crop&frame=1&h=512&w=1024',
    type: 'jpg',
    size: 72322,
    height: 512,
    width: 1024,
    size_pretty: '72.3 kB',
    palette: ['#DA552F', '#FFFFFF', '#1A1A1A', '#FF7E5A', '#7E2F12', '#FFD9CB'],
    background_color: '#DA552F',
    color: '#FFFFFF',
    alternative_color: '#1A1A1A'
  },
  logo: {
    url: 'https://ph-static.imgix.net/ph-favicon-brand-500.ico',
    type: 'ico',
    size: 238142,
    height: 240,
    width: 240,
    size_pretty: '238 kB',
    palette: ['#DA552F', '#FF7E5A', '#7E2F12', '#FFD9CB', '#A03A1A'],
    background_color: '#DA552F',
    color: '#FFFFFF'
  },
  iframe: {
    html: '<iframe style="border: none;" src="https://cards.producthunt.com/cards/products/notion" width="500" height="405" frameborder="0" scrolling="no" allowfullscreen></iframe>',
    scripts: []
  }
}

const HERO_DEMOS = [
  {
    id: 'ted',
    label: 'TED',
    url: TED_DEMO_DATA.url,
    icon: siTed,
    data: TED_DEMO_DATA
  },
  {
    id: 'soundcloud',
    label: 'SoundCloud',
    url: SOUNDCLOUD_DEMO_DATA.url,
    icon: siSoundcloud,
    data: SOUNDCLOUD_DEMO_DATA
  },
  {
    id: 'producthunt',
    label: 'Product Hunt',
    url: PRODUCTHUNT_DEMO_DATA.url,
    icon: siProducthunt,
    data: PRODUCTHUNT_DEMO_DATA
  },
  {
    id: 'spotify',
    label: 'Spotify',
    url: SPOTIFY_DEMO_DATA.url,
    icon: siSpotify,
    data: SPOTIFY_DEMO_DATA
  },
  {
    id: 'vimeo',
    label: 'Vimeo',
    url: VIMEO_DEMO_DATA.url,
    icon: siVimeo,
    data: VIMEO_DEMO_DATA
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: YOUTUBE_DEMO_DATA.url,
    icon: siYoutube,
    data: YOUTUBE_DEMO_DATA
  }
]

const fallbackCopy = text => {
  try {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  } catch {
    return false
  }
}

const HeroDemoButton = styled('button')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    px: 2,
    py: 1,
    borderRadius: 4,
    bg: 'white',
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black70',
    fontWeight: 'bold'
  })};
  border: ${borders[1]} ${colors.black10};
  cursor: pointer;
  letter-spacing: 0;
  transition: color ${transition.short}, background ${transition.short},
    border-color ${transition.short};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  & svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &:hover {
    color: ${colors.black};
    border-color: ${colors.black40};
  }

  &[aria-pressed='true'] {
    color: ${colors.white};
    background: ${colors.black};
    border-color: ${colors.black};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

const ExampleShell = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: '100%',
    borderRadius: 3,
    overflow: 'hidden'
  })};
  min-width: 0;
  background: ${({ $flat }) => ($flat ? 'transparent' : colors.white)};
  box-shadow: ${({ $flat }) =>
    $flat ? 'none' : `0 8px 32px ${colors.black10}`};
`

const ExampleToolbar = styled(Flex)`
  ${theme({
    width: '100%',
    px: [2, 3, 3, 3],
    pt: 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    bg: 'white',
    flexWrap: 'wrap'
  })};
`

const ToggleGroup = styled(Flex)`
  ${theme({ alignItems: 'center', gap: 0 })};
  background: ${colors.black05};
  padding: 4px;
  border-radius: ${radii[3]};
`

const ToggleButton = styled('button')`
  ${theme({
    px: [3, 3, 4, 4],
    py: 2,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold'
  })};
  min-width: 60px;
  letter-spacing: 0;
  background: ${({ $active }) => ($active ? colors.white : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  box-shadow: ${({ $active }) =>
    $active ? `0 1px 2px ${colors.black10}` : 'none'};
  border: none;
  border-radius: ${radii[2]};
  cursor: pointer;
  transition: color ${transition.short}, background ${transition.short};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    color: ${colors.black};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

const ExampleBody = styled(Box)`
  ${theme({
    width: '100%',
    height: ['320px', '360px', '400px', '440px'],
    bg: 'white'
  })};
  display: flex;
  flex-direction: column;
  position: relative;
`

const EXAMPLE_PREVIEW_MAX_WIDTH = '620px'

const ExampleIframeFrame = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: '100%',
    px: [2, 3, 4, 4],
    pt: [2, 2, 3, 3],
    pb: [1, 1, 2, 2]
  })};
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & iframe {
    display: block;
    width: 100%;
    max-width: ${EXAMPLE_PREVIEW_MAX_WIDTH};
    border: 0;
    border-radius: ${radii[2]};
  }

  & .microlink_card,
  & .microlink_card__iframe,
  & .microlink_card__iframe iframe {
    width: 100%;
    max-width: ${EXAMPLE_PREVIEW_MAX_WIDTH};
  }
`

const ExampleDemoSelector = styled(Flex)`
  ${theme({
    width: '100%',
    px: [2, 3, 3, 3],
    pt: 0,
    pb: [3, 3, 4, 4],
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    flexWrap: 'wrap',
    bg: 'white'
  })};
`

const ExampleFooter = styled(Flex)`
  ${theme({
    width: '100%',
    bg: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    px: [2, 3, 3, 3],
    py: '10px',
    minWidth: 0
  })};
  border-top: ${borders[1]} ${colors.black05};
`

const ExampleFooterText = styled('span')`
  ${theme({
    fontSize: ['13px', '13px', '14px', '14px'],
    fontFamily: 'mono',
    letterSpacing: 0,
    flex: 1,
    minWidth: 0,
    color: 'black70'
  })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  strong {
    color: ${colors.black};
    font-weight: bold;
  }
`

const ExampleCopyButton = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'black60'
  })};
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, transform ${transition.short};

  &:hover {
    color: ${colors.black};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[2]};
    border-radius: ${radii[2]};
  }

  svg.icon-check {
    color: ${colors.green5};
  }
`

export const InteractiveExample = ({
  flat = false,
  hideFooter = false
} = {}) => {
  const [source, setSource] = useState('iframe')
  const [activeDemo, setActiveDemo] = useState(HERO_DEMOS[0])
  const [isCopied, setIsCopied] = useState(false)
  const copyTimerRef = useRef(null)

  const demoUrl = activeDemo.url
  const iframeHtml = activeDemo.data?.iframe?.html || ''

  const apiUrl = `https://api.microlink.io?iframe&url=${demoUrl}`
  const metadataUrl = `https://api.microlink.io?url=${demoUrl}`
  const sdkLine = `<Microlink url='${demoUrl}' />`
  const copyText =
    source === 'iframe' ? apiUrl : source === 'sdk' ? sdkLine : metadataUrl

  const handleCopy = () => {
    const markCopied = () => {
      setIsCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setIsCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(copyText)
        .then(markCopied)
        .catch(() => {
          if (fallbackCopy(copyText)) markCopied()
        })
    } else if (fallbackCopy(copyText)) {
      markCopied()
    }
  }

  return (
    <ExampleShell $flat={flat}>
      <ExampleToolbar>
        <ToggleGroup role='tablist' aria-label='Embed source'>
          <ToggleButton
            type='button'
            role='tab'
            aria-selected={source === 'iframe'}
            $active={source === 'iframe'}
            onClick={() => setSource('iframe')}
          >
            Iframe
          </ToggleButton>
          <ToggleButton
            type='button'
            role='tab'
            aria-selected={source === 'sdk'}
            $active={source === 'sdk'}
            onClick={() => setSource('sdk')}
          >
            SDK
          </ToggleButton>
          <ToggleButton
            type='button'
            role='tab'
            aria-selected={source === 'custom'}
            $active={source === 'custom'}
            onClick={() => setSource('custom')}
          >
            Custom
          </ToggleButton>
        </ToggleGroup>
      </ExampleToolbar>
      <ExampleBody>
        {source === 'iframe' && (
          <ExampleIframeFrame
            key={`iframe-${demoUrl}`}
            dangerouslySetInnerHTML={{ __html: iframeHtml }}
          />
        )}
        {source === 'sdk' && (
          <ExampleIframeFrame>
            <LinkPreviewRaw
              key={`sdk-${demoUrl}`}
              url={demoUrl}
              size='large'
              media={['video', 'audio', 'image', 'logo']}
              fetchData={false}
              setData={activeDemo.data}
            />
          </ExampleIframeFrame>
        )}
        {source === 'custom' && (
          <ExampleIframeFrame>
            <HeroCard key={`custom-${demoUrl}`} data={activeDemo.data} />
          </ExampleIframeFrame>
        )}
      </ExampleBody>
      <ExampleDemoSelector role='radiogroup' aria-label='Pick an example URL'>
        {HERO_DEMOS.map(demo => {
          const isActive = activeDemo.id === demo.id
          return (
            <HeroDemoButton
              key={demo.id}
              type='button'
              role='radio'
              aria-checked={isActive}
              aria-pressed={isActive}
              onClick={() => setActiveDemo(demo)}
            >
              <svg
                aria-hidden='true'
                viewBox='0 0 24 24'
                fill={isActive ? 'currentColor' : `#${demo.icon.hex}`}
              >
                <path d={demo.icon.path} />
              </svg>
              <span>{demo.label}</span>
            </HeroDemoButton>
          )
        })}
      </ExampleDemoSelector>
      {!hideFooter && (
        <ExampleFooter>
          <ExampleFooterText>
            {source === 'iframe' && (
              <>
                <strong>https://api.microlink.io?iframe&url=</strong>
                {demoUrl}
              </>
            )}
            {source === 'sdk' && (
              <>
                <strong>{"<Microlink url='"}</strong>
                {demoUrl}
                <strong>{"' />"}</strong>
              </>
            )}
            {source === 'custom' && (
              <>
                <strong>https://api.microlink.io</strong>
                {`?url=${demoUrl}`}
              </>
            )}
          </ExampleFooterText>
          <ExampleCopyButton
            type='button'
            onClick={handleCopy}
            aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
          >
            {isCopied ? (
              <svg
                className='icon-check'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M3 8l3.5 3.5L13 4.5'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
                />
              </svg>
            )}
          </ExampleCopyButton>
        </ExampleFooter>
      )}
    </ExampleShell>
  )
}
