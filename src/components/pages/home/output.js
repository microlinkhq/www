import Box from 'components/elements/Box'
import Dot from 'components/elements/Dot/Dot'
import Flex from 'components/elements/Flex'
import Microlink from 'components/patterns/Microlink/Microlink'
import { HeroCard } from 'components/pages/embed/PreviewCards'
import { HeroSearchResultCard } from 'components/pages/search/ResultCards'
import { lighthouseViewerUrl } from 'helpers/lighthouse'
import { prefersReducedMotion } from 'helpers/reduced-motion'
import { theme, fonts, colors, gradient, space } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { getApiUrl } from '@microlink/mql'

const MONO = fonts.mono

const CARD_SHADOW = '0 18px 50px -22px rgba(40,10,60,.45)'

const MEDIA_MAX_HEIGHT = 440
const STAGE_PADDING = parseInt(space[4], 10)

export const PANEL_HEIGHT = `${MEDIA_MAX_HEIGHT + STAGE_PADDING * 2}px`

const PanelContent = styled(Box)`
  ${theme({
    minHeight: 'inherit',
    display: 'flex',
    flexDirection: 'column'
  })};
`

const Stage = styled(Flex)`
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(#f4f4f6 0% 25%, #fafafb 0% 50%) 50% /
    22px 22px;
`

const mediaBox = (width, height) =>
  width > 0 && height > 0
    ? {
        width: `min(100%, calc(${MEDIA_MAX_HEIGHT}px * ${width / height}))`,
        aspectRatio: `${width} / ${height}`
      }
    : { maxWidth: '100%', maxHeight: `${MEDIA_MAX_HEIGHT}px` }

const ImageOutput = ({ url, alt, width, height }) => (
  <Stage css={theme({ p: 4, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}>
    <Box
      as='img'
      src={url}
      alt={alt}
      loading='lazy'
      css={theme({
        ...mediaBox(width, height),
        borderRadius: 4,
        boxShadow: CARD_SHADOW
      })}
    />
  </Stage>
)

const AnimatedOutput = ({ url, width, height }) => {
  const videoRef = useRef(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const isReduced = prefersReducedMotion()
    setReduced(isReduced)
    if (isReduced && videoRef.current) videoRef.current.pause()
  }, [url])

  return (
    <Stage css={theme({ p: 4, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}>
      <Box
        as='video'
        ref={videoRef}
        src={url}
        autoPlay={!reduced}
        loop
        muted
        playsInline
        controls={reduced}
        css={theme({
          ...mediaBox(width, height),
          borderRadius: 4,
          boxShadow: CARD_SHADOW
        })}
      />
    </Stage>
  )
}

const Swatch = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
`

const LogoOutput = ({ logo, palette }) => (
  <PanelContent css={theme({ justifyContent: 'center' })}>
    <Stage css={theme({ p: 5, minHeight: '220px' })}>
      <Box
        as='img'
        src={logo}
        alt='logo'
        loading='lazy'
        css={theme({
          maxWidth: '160px',
          maxHeight: '160px',
          objectFit: 'contain'
        })}
      />
    </Stage>
    {Array.isArray(palette) && palette.length > 0 && (
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          p: 3,
          borderTop: 1,
          borderTopColor: 'gray1'
        })}
      >
        {palette.map(color => (
          <Flex key={color} css={theme({ alignItems: 'center', gap: 2 })}>
            <Swatch css={{ background: color }} />
            <Box
              as='span'
              css={theme({ fontFamily: 'mono', fontSize: 0, color: 'gray7' })}
            >
              {color}
            </Box>
          </Flex>
        ))}
      </Flex>
    )}
  </PanelContent>
)

const PdfOutput = ({ url }) => (
  <Box
    as='iframe'
    src={url}
    title='PDF output'
    css={theme({
      width: '100%',
      height: PANEL_HEIGHT,
      border: 0,
      display: 'block'
    })}
  />
)

const Card = ({ data, fallbackUrl }) => (
  <PanelContent
    css={theme({ p: 4, justifyContent: 'center', alignItems: 'center' })}
  >
    <HeroCard data={{ url: fallbackUrl, ...data }} />
  </PanelContent>
)

const EmbedOutput = ({ url, data }) => (
  <PanelContent
    css={theme({ p: 4, justifyContent: 'center', alignItems: 'center' })}
  >
    <Microlink url={url} size='large' fetchData={!data} setData={data} />
  </PanelContent>
)

const MetadataOutput = ({ data }) => {
  const fields = [
    ['title', data.title],
    ['description', data.description],
    ['author', data.author],
    ['publisher', data.publisher],
    ['date', data.date],
    ['lang', data.lang],
    ['url', data.url]
  ].filter(([, value]) => value)
  const media = [
    ['image', data.image?.url],
    ['logo', data.logo?.url]
  ].filter(([, value]) => value)

  return (
    <Box css={theme({ p: 4, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}>
      {fields.map(([label, value]) => (
        <Flex
          key={label}
          css={theme({
            gap: 3,
            py: 2,
            borderBottom: 1,
            borderBottomColor: 'gray1'
          })}
        >
          <Box
            as='span'
            css={theme({
              width: '108px',
              flexShrink: 0,
              fontFamily: 'mono',
              fontSize: 0,
              color: 'gray7'
            })}
          >
            {label}
          </Box>
          {label === 'url'
            ? (
              <Box
                as='a'
                href={value}
                target='_blank'
                rel='noopener noreferrer'
                css={theme({
                  fontSize: 1,
                  color: 'grape7',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                })}
              >
                {value}
              </Box>
              )
            : (
              <Box
                as='span'
                css={theme({ fontSize: 1, color: 'gray8', lineHeight: 1.5 })}
              >
                {value}
              </Box>
              )}
        </Flex>
      ))}

      {media.length > 0 && (
        <Flex css={theme({ gap: 4, pt: 4, flexWrap: 'wrap' })}>
          {media.map(([label, url]) => (
            <Box key={label}>
              <Box
                as='span'
                css={theme({
                  display: 'block',
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: 'gray7',
                  mb: 2
                })}
              >
                {label}
              </Box>
              <Box
                as='img'
                src={url}
                alt={label}
                loading='lazy'
                css={theme({
                  height: '72px',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  borderRadius: 6,
                  border: 1,
                  borderColor: 'gray1',
                  background: '#fafafb'
                })}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  )
}

const ProBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: ${gradient};
  border-radius: 999px;
  padding: 3px 10px;
`

const SearchOutput = ({ data }) => (
  <Box css={theme({ p: 4, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}>
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        mb: 4,
        pb: 3,
        borderBottom: 1,
        borderBottomColor: 'gray1'
      })}
    >
      <ProBadge>Pro</ProBadge>
      <Box as='span' css={theme({ fontSize: 0, color: 'gray7' })}>
        Example results — query live Google data on the{' '}
        <Box
          as='a'
          href='/search'
          css={theme({ color: 'grape7', textDecoration: 'none' })}
        >
          Pro plan
        </Box>
      </Box>
    </Flex>
    <Flex css={theme({ flexDirection: 'column', gap: 4 })}>
      {(data.results || []).slice(0, 4).map(result => (
        <HeroSearchResultCard key={result.url} data={result} />
      ))}
    </Flex>
  </Box>
)

const RawText = styled(Box)`
  max-height: ${PANEL_HEIGHT};
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
`

const LighthouseOutput = ({ url }) => (
  <Box
    as='iframe'
    title='Lighthouse report'
    src={lighthouseViewerUrl(
      getApiUrl(url, { insights: true, embed: 'insights.lighthouse' })[0]
    )}
    css={theme({
      width: '100%',
      height: PANEL_HEIGHT,
      border: 0,
      display: 'block',
      background: '#fff'
    })}
  />
)

const TechCard = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3,
    border: 1,
    borderColor: 'gray1',
    borderRadius: '10px'
  })};
`

const TechnologiesOutput = ({ technologies }) => {
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return <Empty>No technologies detected on this page.</Empty>
  }
  return (
    <PanelContent
      css={theme({ p: 3, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}
    >
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 3,
          width: '100%',
          my: 'auto'
        })}
      >
        {technologies.map(tech => (
          <TechCard key={tech.name} css={theme({ p: 3 })}>
            {tech.logo && (
              <Box
                as='img'
                src={tech.logo}
                alt=''
                loading='lazy'
                css={theme({
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                  flexShrink: 0
                })}
              />
            )}
            <Box css={theme({ flex: 1, minWidth: 0, overflow: 'hidden' })}>
              <Box
                as={tech.url ? 'a' : 'span'}
                href={tech.url}
                target='_blank'
                rel='noopener noreferrer'
                css={theme({
                  display: 'block',
                  fontSize: 1,
                  fontWeight: 'bold',
                  color: 'black',
                  textDecoration: 'none'
                })}
              >
                {tech.name}
              </Box>
              {Array.isArray(tech.categories) && (
                <Box
                  as='span'
                  css={theme({
                    display: 'block',
                    fontSize: 0,
                    color: 'gray7',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  })}
                >
                  {tech.categories.join(', ')}
                </Box>
              )}
            </Box>
          </TechCard>
        ))}
      </Box>
    </PanelContent>
  )
}

const MonoTextOutput = ({ text }) => (
  <RawText
    css={theme({ p: 4, fontFamily: 'mono', fontSize: 0, color: 'gray8' })}
  >
    {text}
  </RawText>
)

const TextOutput = ({ text }) => (
  <Box
    css={theme({
      p: 4,
      maxHeight: PANEL_HEIGHT,
      overflow: 'auto',
      fontSize: 1,
      lineHeight: 1.7,
      color: 'gray8',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    })}
  >
    {text}
  </Box>
)

const mediaUrl = media =>
  typeof media === 'string' ? media : media && media.url

const fmtTime = seconds => {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const eq = keyframes`
  0%, 100% { transform: scaleY(0.35) }
  50% { transform: scaleY(1) }
`

const EqBar = styled.span`
  display: block;
  width: 3px;
  height: 18px;
  border-radius: 2px;
  background: ${gradient};
  transform-origin: bottom;
  animation: ${eq} 0.9s ease-in-out infinite;
  animation-play-state: ${props => (props.$playing ? 'running' : 'paused')};
  &:nth-child(2) {
    animation-delay: 0.15s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.45s;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const PlayButton = styled.button`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: ${gradient};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 150ms ease, filter 150ms ease;
  &:hover {
    filter: brightness(1.06);
  }
  &:active {
    transform: scale(0.94);
  }
  &:focus-visible {
    outline: 2px solid ${colors.grape7};
    outline-offset: 2px;
  }
`

const ProgressTrack = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: ${colors.gray1};
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid ${colors.grape7};
    outline-offset: 3px;
  }
`

const SEEK_STEP = 5
const makeSeekKeyHandler = (mediaRef, duration, setCurrent) => e => {
  const el = mediaRef.current
  if (!el || !duration) return
  let next = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    next = Math.min(duration, el.currentTime + SEEK_STEP)
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    next = Math.max(0, el.currentTime - SEEK_STEP)
  } else if (e.key === 'PageUp') {
    next = Math.min(duration, el.currentTime + SEEK_STEP * 2)
  } else if (e.key === 'PageDown') {
    next = Math.max(0, el.currentTime - SEEK_STEP * 2)
  } else if (e.key === 'Home') {
    next = 0
  } else if (e.key === 'End') {
    next = duration
  }
  if (next === null) return
  e.preventDefault()
  el.currentTime = next
  setCurrent(next)
}

const useMediaPlayback = (mediaRef, src, initialDuration) => {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(initialDuration || 0)

  useEffect(() => {
    const el = mediaRef.current
    if (!el) return undefined
    setPlaying(false)
    setCurrent(0)
    const onTime = () => setCurrent(el.currentTime)
    const onMeta = () => setDuration(el.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnd = () => {
      setPlaying(false)
      setCurrent(0)
    }
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnd)
    }
  }, [mediaRef, src])

  const toggle = () => {
    const el = mediaRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  const seek = event => {
    const el = mediaRef.current
    if (!el || !duration) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width)
    )
    el.currentTime = ratio * duration
    setCurrent(el.currentTime)
  }

  return {
    playing,
    current,
    duration,
    toggle,
    seek,
    onSeekKeyDown: makeSeekKeyHandler(mediaRef, duration, setCurrent)
  }
}

const PlayIcon = ({ playing, size = 16 }) =>
  playing
    ? (
      <svg width={size} height={size} viewBox='0 0 24 24' fill='#fff'>
        <rect x='6' y='5' width='4' height='14' rx='1' />
        <rect x='14' y='5' width='4' height='14' rx='1' />
      </svg>
      )
    : (
      <svg width={size} height={size} viewBox='0 0 24 24' fill='#fff'>
        <path d='M8 5v14l11-7z' />
      </svg>
      )

const AudioOutput = ({ data }) => {
  const src = mediaUrl(data.audio)
  const audioRef = useRef(null)
  const { playing, current, duration, toggle, seek, onSeekKeyDown } =
    useMediaPlayback(audioRef, src, data.audio?.duration)

  const pct = duration ? (current / duration) * 100 : 0
  const image = data.image?.url
  const title = data.title || 'Audio'
  const subtitle = [data.author, data.publisher].filter(Boolean).join(' · ')

  return (
    <PanelContent css={theme({ p: 4 })}>
      <Flex
        css={theme({
          maxWidth: '480px',
          mx: 'auto',
          my: 'auto',
          width: '100%',
          alignItems: 'center',
          gap: 3,
          p: 3,
          border: 1,
          borderColor: 'gray1',
          borderRadius: 12,
          background: '#fff',
          boxShadow: '0 18px 50px -28px rgba(40,10,60,.4)'
        })}
      >
        {image && (
          <Box
            as='img'
            src={image}
            alt={title}
            loading='lazy'
            css={theme({
              width: '76px',
              height: '76px',
              borderRadius: 8,
              objectFit: 'cover',
              flexShrink: 0,
              boxShadow: '0 6px 18px -8px rgba(40,10,60,.45)'
            })}
          />
        )}

        <Box css={theme({ flex: 1, minWidth: 0 })}>
          <Flex
            css={theme({
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 2
            })}
          >
            <Box css={theme({ minWidth: 0 })}>
              <Box
                as='span'
                css={theme({
                  display: 'block',
                  fontSize: 1,
                  fontWeight: 'bold',
                  color: 'black',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                })}
              >
                {title}
              </Box>
              {subtitle && (
                <Box
                  as='span'
                  css={theme({
                    display: 'block',
                    fontSize: 0,
                    color: 'gray7',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  })}
                >
                  {subtitle}
                </Box>
              )}
            </Box>
            <Flex
              css={theme({
                alignItems: 'flex-end',
                gap: '3px',
                height: '18px',
                flexShrink: 0
              })}
            >
              {[0, 1, 2, 3].map(i => (
                <EqBar key={i} $playing={playing} />
              ))}
            </Flex>
          </Flex>

          <Flex css={theme({ alignItems: 'center', gap: 2, mt: 3 })}>
            <PlayButton
              type='button'
              onClick={toggle}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              <PlayIcon playing={playing} />
            </PlayButton>
            <ProgressTrack
              role='slider'
              tabIndex={0}
              aria-label='Seek audio'
              aria-valuemin={0}
              aria-valuemax={Math.round(duration) || 0}
              aria-valuenow={Math.round(current)}
              aria-valuetext={`${fmtTime(current)} of ${fmtTime(duration)}`}
              onClick={seek}
              onKeyDown={onSeekKeyDown}
            >
              <Box
                css={{
                  height: '100%',
                  borderRadius: '999px',
                  background: gradient,
                  width: `${pct}%`
                }}
              />
            </ProgressTrack>
            <Box
              as='span'
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                color: 'gray7',
                whiteSpace: 'nowrap'
              })}
            >
              {fmtTime(current)} / {fmtTime(duration)}
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Box
        as='audio'
        ref={audioRef}
        src={src}
        preload='metadata'
        css={{ display: 'none' }}
      />
    </PanelContent>
  )
}

const TitleBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 12px 14px;
  font-size: 14px;
  ${theme({ fontWeight: 'bold' })};
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
  pointer-events: none;
`

const ControlBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`

const BarButton = styled.button`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 150ms ease;
  &:active {
    transform: scale(0.9);
  }
  &:focus-visible {
    outline: 2px solid ${colors.grape7};
    outline-offset: 2px;
    border-radius: 6px;
  }
`

const PlayOverlay = styled.button`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: rgba(10, 10, 10, 0.55);
  backdrop-filter: blur(2px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
  transition: transform 150ms ease, background 150ms ease;
  &:hover {
    background: rgba(10, 10, 10, 0.72);
  }
  &:active {
    transform: scale(0.94);
  }
  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`

const VideoOutput = ({ data }) => {
  const src = mediaUrl(data.video)
  const videoRef = useRef(null)
  const { playing, current, duration, toggle, seek, onSeekKeyDown } =
    useMediaPlayback(videoRef, src, data.video?.duration)

  const pct = duration ? (current / duration) * 100 : 0
  const title = [data.title, data.publisher].filter(Boolean).join(' · ')

  return (
    <PanelContent css={theme({ p: 4 })}>
      <Box
        css={theme({
          position: 'relative',
          maxWidth: '640px',
          mx: 'auto',
          my: 'auto',
          width: '100%',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#000',
          boxShadow: CARD_SHADOW
        })}
      >
        <Box
          as='video'
          ref={videoRef}
          src={src}
          playsInline
          preload='metadata'
          onClick={toggle}
          css={{
            display: 'block',
            width: '100%',
            maxHeight: '440px',
            cursor: 'pointer'
          }}
        />

        {title && <TitleBar>{title}</TitleBar>}

        {!playing && (
          <PlayOverlay type='button' onClick={toggle} aria-label='Play'>
            <PlayIcon playing={false} size={26} />
          </PlayOverlay>
        )}

        <ControlBar>
          <BarButton
            type='button'
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <PlayIcon playing={playing} size={18} />
          </BarButton>
          <ProgressTrack
            role='slider'
            tabIndex={0}
            aria-label='Seek video'
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 0}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${fmtTime(current)} of ${fmtTime(duration)}`}
            onClick={seek}
            onKeyDown={onSeekKeyDown}
            css={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <Box
              css={{
                height: '100%',
                borderRadius: '999px',
                background: gradient,
                width: `${pct}%`
              }}
            />
          </ProgressTrack>
          <Box
            as='span'
            css={{
              fontFamily: MONO,
              fontSize: '13px',
              color: '#fff',
              whiteSpace: 'nowrap'
            }}
          >
            {fmtTime(current)} / {fmtTime(duration)}
          </Box>
        </ControlBar>
      </Box>
    </PanelContent>
  )
}

const CodeBlock = styled(Box)`
  max-height: ${PANEL_HEIGHT};
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
`

const PHASE_META = [
  ['install', 'Install', '#9A9AA0'],
  ['build', 'Build', '#2D7FF9'],
  ['spawn', 'Spawn', '#F59E0B'],
  ['run', 'Run', '#16A34A']
]

const fmtMs = ms =>
  ms == null ? '—' : ms >= 100 ? `${Math.round(ms)}ms` : `${ms.toFixed(1)}ms`

const fmtBytes = bytes => {
  if (bytes == null) return '—'
  return bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const fmtMb = mb => (mb == null ? '—' : `${Math.round(mb)} MB`)

const Stat = ({ label, value }) => (
  <Box css={theme({ textAlign: 'center' })}>
    <Box
      as='span'
      css={theme({
        display: 'block',
        fontFamily: 'mono',
        fontSize: 3,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: '-.02em'
      })}
    >
      {value}
    </Box>
    <Box
      as='span'
      css={theme({
        fontSize: '11px',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'gray7'
      })}
    >
      {label}
    </Box>
  </Box>
)

const Profiling = ({ profiling }) => {
  const { cpu, memory, size, phases = {} } = profiling
  const total =
    phases.total || PHASE_META.reduce((sum, [k]) => sum + (phases[k] || 0), 0)
  const segments = PHASE_META.filter(([k]) => phases[k] > 0)
  const pct = ms => (total ? (ms / total) * 100 : 0)

  return (
    <Box css={theme({ p: 4, borderBottom: 1, borderBottomColor: 'gray1' })}>
      <Flex
        css={theme({
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: 3,
          mb: 4
        })}
      >
        <Stat label='Total' value={fmtMs(total)} />
        <Stat label='CPU' value={fmtMs(cpu)} />
        <Stat label='Memory' value={fmtMb(memory)} />
        <Stat label='Size' value={fmtBytes(size)} />
      </Flex>

      <Flex
        css={theme({
          height: '12px',
          borderRadius: '999px',
          overflow: 'hidden',
          background: '#F0F0F2'
        })}
      >
        {segments.map(([k, , color]) => (
          <Box
            key={k}
            title={`${k} ${fmtMs(phases[k])}`}
            css={{ width: `${pct(phases[k])}%`, background: color }}
          />
        ))}
      </Flex>

      <Box css={theme({ mt: 3 })}>
        {segments.map(([k, label, color]) => (
          <Flex
            key={k}
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              borderBottom: 1,
              borderBottomColor: 'gray1'
            })}
          >
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <Dot
                css={{
                  width: '9px',
                  height: '9px',
                  flexShrink: 0,
                  background: color
                }}
              />
              <Box as='span' css={theme({ fontSize: 0, color: 'black' })}>
                {label}
              </Box>
            </Flex>
            <Flex css={theme({ alignItems: 'center', gap: 3 })}>
              <Box
                as='span'
                css={theme({ fontFamily: 'mono', fontSize: 0, color: 'gray8' })}
              >
                {fmtMs(phases[k])}
              </Box>
              <Box
                as='span'
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: 'gray7',
                  width: '42px',
                  textAlign: 'right'
                })}
              >
                {Math.round(pct(phases[k]))}%
              </Box>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

const FunctionValue = ({ value, result }) => {
  const isLinkList =
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(v => /^https?:\/\//.test(v))

  if (isLinkList) {
    return (
      <Box css={theme({ p: 3, maxHeight: '320px', overflow: 'auto' })}>
        {value.map((href, i) => (
          <Box
            key={i}
            as='a'
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            css={theme({
              display: 'block',
              fontFamily: 'mono',
              fontSize: 0,
              color: 'grape7',
              textDecoration: 'none',
              py: 2,
              borderBottom: 1,
              borderBottomColor: 'gray1',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            })}
          >
            {href}
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <CodeBlock
      css={theme({ p: 4, fontFamily: 'mono', fontSize: 0, color: 'gray8' })}
    >
      {JSON.stringify(value ?? result, null, 2)}
    </CodeBlock>
  )
}

const FunctionOutput = ({ result }) => (
  <Box>
    {result?.profiling && <Profiling profiling={result.profiling} />}
    <FunctionValue value={result?.value} result={result} />
  </Box>
)

const Empty = ({ children }) => (
  <PanelContent css={theme({ p: 4 })}>
    <Box
      as='span'
      css={theme({
        fontFamily: 'mono',
        fontSize: 0,
        color: 'gray7',
        my: 'auto'
      })}
    >
      {children}
    </Box>
  </PanelContent>
)

const Output = ({ req }) => {
  const data = req.body?.data || {}
  const vertical = req.D.vertical

  switch (vertical) {
    case 'screenshot':
      return data.screenshot?.url
        ? (
          <ImageOutput
            url={data.screenshot.url}
            alt='screenshot'
            width={data.screenshot.width}
            height={data.screenshot.height}
          />
          )
        : (
          <Empty>No screenshot in this response.</Empty>
          )

    case 'animated':
      return data.screenshot?.animated?.url
        ? (
          <AnimatedOutput
            url={data.screenshot.animated.url}
            width={data.screenshot.animated.width}
            height={data.screenshot.animated.height}
          />
          )
        : (
          <Empty>No animated screenshot in this response.</Empty>
          )

    case 'pdf':
      return data.pdf?.url
        ? (
          <PdfOutput url={data.pdf.url} />
          )
        : (
          <Empty>No PDF in this response.</Empty>
          )

    case 'logo':
      return data.logo?.url
        ? (
          <LogoOutput
            logo={data.logo.url}
            palette={data.logo.palette || data.palette || data.image?.palette}
          />
          )
        : (
          <Empty>No logo in this response.</Empty>
          )

    case 'markdown':
      return data.markdown
        ? (
          <MonoTextOutput text={data.markdown} />
          )
        : (
          <Empty>No markdown in this response.</Empty>
          )

    case 'html':
      return data.html
        ? (
          <MonoTextOutput text={data.html} />
          )
        : (
          <Empty>No HTML in this response.</Empty>
          )

    case 'text':
      return data.text
        ? (
          <TextOutput text={data.text} />
          )
        : (
          <Empty>No text in this response.</Empty>
          )

    case 'lighthouse':
      return <LighthouseOutput url={req.D.fullUrl} />

    case 'technologies':
      return <TechnologiesOutput technologies={data.insights?.technologies} />

    case 'function':
      return data.function
        ? (
          <FunctionOutput result={data.function} />
          )
        : (
          <Empty>The function returned no value.</Empty>
          )

    case 'video':
      return mediaUrl(data.video)
        ? (
          <VideoOutput data={data} />
          )
        : (
          <Empty>No video found on this page.</Empty>
          )

    case 'audio':
      return mediaUrl(data.audio)
        ? (
          <AudioOutput data={data} />
          )
        : (
          <Empty>No audio found on this page.</Empty>
          )

    case 'embed':
      return <EmbedOutput url={req.D.fullUrl} data={data} />

    case 'metadata':
      return <MetadataOutput data={data} />

    case 'search':
      return <SearchOutput data={data} />

    default:
      return <Card data={data} fallbackUrl={req.D.fullUrl} />
  }
}

export default Output
