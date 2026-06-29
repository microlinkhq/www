import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Microlink from 'components/patterns/Microlink/Microlink'
import { HeroSearchResultCard } from 'components/pages/search/ResultCards'
import GOOGLE_EXAMPLES from 'data/google-examples'
import { theme, fonts } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const INK = '#0A0A0A'
const VIOLET = '#9B26D6'
const MUTED = '#9A9AA0'
const BODY = '#3D3D42'
const BORDER = '#EFEFF1'
const GRADIENT = 'linear-gradient(99deg,#FF1E8C,#B026E0)'
const MONO = fonts.mono

/* ------------------------------ media renderers ----------------------------- */

// neutral stage that lets a screenshot / logo breathe and sit centered
const Stage = styled(Flex)`
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(#f4f4f6 0% 25%, #fafafb 0% 50%) 50% /
    22px 22px;
`

const ImageOutput = ({ url, alt, contain }) => (
  <Stage css={theme({ p: 4, maxHeight: '480px', overflow: 'auto' })}>
    <Box
      as='img'
      src={url}
      alt={alt}
      loading='lazy'
      css={theme({
        maxWidth: '100%',
        maxHeight: '440px',
        objectFit: contain ? 'contain' : 'initial',
        borderRadius: 4,
        boxShadow: '0 18px 50px -22px rgba(40,10,60,.45)'
      })}
    />
  </Stage>
)

// an animated screenshot is a short looping clip — play it like a gif
const AnimatedOutput = ({ url }) => (
  <Stage css={theme({ p: 4, maxHeight: '480px', overflow: 'auto' })}>
    <Box
      as='video'
      src={url}
      autoPlay
      loop
      muted
      playsInline
      css={theme({
        maxWidth: '100%',
        maxHeight: '440px',
        borderRadius: 4,
        boxShadow: '0 18px 50px -22px rgba(40,10,60,.45)'
      })}
    />
  </Stage>
)

const Swatch = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
`

const LogoOutput = ({ logo, palette }) => (
  <Box>
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
          borderTop: `1px solid ${BORDER}`
        })}
      >
        {palette.map(color => (
          <Flex key={color} css={theme({ alignItems: 'center', gap: 2 })}>
            <Swatch css={{ background: color }} />
            <Box
              as='span'
              css={theme({ fontFamily: 'mono', fontSize: 0, color: MUTED })}
            >
              {color}
            </Box>
          </Flex>
        ))}
      </Flex>
    )}
  </Box>
)

const PdfOutput = ({ url }) => (
  <Box
    as='iframe'
    src={url}
    title='PDF output'
    css={theme({ width: '100%', height: '520px', border: 0, display: 'block' })}
  />
)

/* ------------------------------ preview card ------------------------------- */

const Card = ({ data, fallbackUrl }) => {
  const image = data.image?.url || data.screenshot?.url
  const logo = data.logo?.url
  const title = data.title || data.publisher || fallbackUrl
  const link = data.url || fallbackUrl

  return (
    <Box css={theme({ p: 4 })}>
      <Box
        css={theme({
          maxWidth: '520px',
          mx: 'auto',
          border: `1px solid ${BORDER}`,
          borderRadius: 8,
          overflow: 'hidden',
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
              width: '100%',
              maxHeight: '260px',
              objectFit: 'cover',
              display: 'block',
              borderBottom: `1px solid ${BORDER}`
            })}
          />
        )}
        <Box css={theme({ p: 3 })}>
          <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
            {logo && (
              <Box
                as='img'
                src={logo}
                alt=''
                loading='lazy'
                css={theme({ width: '18px', height: '18px', borderRadius: 2 })}
              />
            )}
            <Box
              as='span'
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                color: MUTED,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              })}
            >
              {link}
            </Box>
          </Flex>
          {title && (
            <Box
              as='span'
              css={theme({
                display: 'block',
                fontSize: 2,
                fontWeight: 'bold',
                color: INK,
                letterSpacing: '-.01em',
                mb: data.description ? 2 : 0
              })}
            >
              {title}
            </Box>
          )}
          {data.description && (
            <Box
              as='p'
              css={theme({ m: 0, fontSize: 1, color: BODY, lineHeight: 1.5 })}
            >
              {data.description}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

/* --------------------------------- embed --------------------------------- */

// the official embeddable SDK card (iframe / video / audio / image / logo)
const EmbedOutput = ({ url }) => (
  <Box css={theme({ p: 4, display: 'flex', justifyContent: 'center' })}>
    <Microlink url={url} size='large' />
  </Box>
)

/* ------------------------------- metadata -------------------------------- */

// the normalized metadata as a structured field list (vs the link-preview
// card, which is the visual unfurl)
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
    <Box css={theme({ p: 4, maxHeight: '480px', overflow: 'auto' })}>
      {fields.map(([label, value]) => (
        <Flex
          key={label}
          css={theme({
            gap: 3,
            py: 2,
            borderBottom: `1px solid ${BORDER}`
          })}
        >
          <Box
            as='span'
            css={theme({
              width: '108px',
              flexShrink: 0,
              fontFamily: 'mono',
              fontSize: 0,
              color: MUTED
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
                  color: VIOLET,
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
                css={theme({ fontSize: 1, color: BODY, lineHeight: 1.5 })}
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
                  color: MUTED,
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
                  border: `1px solid ${BORDER}`,
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

/* -------------------------------- search --------------------------------- */

const ProBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: ${GRADIENT};
  border-radius: 999px;
  padding: 3px 10px;
`

// Search API is Pro + query-based; the free demo replays a recorded example
// (the same data the /search page uses), rendered with the real result card
const SEARCH_EXAMPLE = GOOGLE_EXAMPLES.search[0]

const SearchOutput = () => (
  <Box css={theme({ p: 4, maxHeight: '480px', overflow: 'auto' })}>
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        mb: 4,
        pb: 3,
        borderBottom: `1px solid ${BORDER}`
      })}
    >
      <ProBadge>Pro</ProBadge>
      <Box as='span' css={theme({ fontSize: 0, color: MUTED })}>
        Example results — query live Google data on the{' '}
        <Box
          as='a'
          href='/search'
          css={theme({ color: VIOLET, textDecoration: 'none' })}
        >
          Pro plan
        </Box>
      </Box>
    </Flex>
    <Flex css={theme({ flexDirection: 'column', gap: 4 })}>
      {SEARCH_EXAMPLE.payload.slice(0, 4).map(result => (
        <HeroSearchResultCard key={result.url} data={result} />
      ))}
    </Flex>
  </Box>
)

/* --------------------------------- raw text -------------------------------- */

// scrollable monospace block for raw source output (HTML / markdown)
const RawText = styled(Box)`
  max-height: 480px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
`

/* ------------------------------- lighthouse ------------------------------- */

// embed the official Lighthouse report viewer; it expects the full Microlink
// API request URL (the GET line) as its `url` param, not the bare target
const LighthouseOutput = ({ apiUrl }) => (
  <Box
    as='iframe'
    title='Lighthouse report'
    src={`https://lighthouse.microlink.io/?url=${encodeURIComponent(apiUrl)}`}
    css={theme({
      width: '100%',
      height: '560px',
      border: 0,
      display: 'block',
      background: '#fff'
    })}
  />
)

/* ----------------------------- technologies ------------------------------- */

const TechCard = styled(Flex)`
  align-items: center;
  gap: 10px;
  width: 232px;
  border: 1px solid ${BORDER};
  border-radius: 10px;
`

const TechnologiesOutput = ({ technologies }) => {
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return <Empty>No technologies detected on this page.</Empty>
  }
  return (
    <Box css={theme({ p: 3, maxHeight: '480px', overflow: 'auto' })}>
      <Flex
        css={theme({
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2
        })}
      >
        {technologies.map(tech => (
          <TechCard key={tech.name} css={theme({ p: 2 })}>
            {tech.logo && (
              <Box
                as='img'
                src={tech.logo}
                alt=''
                loading='lazy'
                css={theme({
                  width: '30px',
                  height: '30px',
                  objectFit: 'contain',
                  flexShrink: 0
                })}
              />
            )}
            <Box css={theme({ overflow: 'hidden' })}>
              <Box
                as={tech.url ? 'a' : 'span'}
                href={tech.url}
                target='_blank'
                rel='noopener noreferrer'
                css={theme({
                  display: 'block',
                  fontSize: 0,
                  fontWeight: 600,
                  color: INK,
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
                    fontSize: '12px',
                    color: MUTED,
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
      </Flex>
    </Box>
  )
}

/* ---------------------------------- html ---------------------------------- */

const HtmlOutput = ({ html }) => (
  <RawText css={theme({ p: 4, fontFamily: 'mono', fontSize: 0, color: BODY })}>
    {html}
  </RawText>
)

/* ---------------------------------- text ---------------------------------- */

const TextOutput = ({ text }) => (
  <Box
    css={theme({
      p: 4,
      maxHeight: '480px',
      overflow: 'auto',
      fontSize: 1,
      lineHeight: 1.7,
      color: BODY,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    })}
  >
    {text}
  </Box>
)

/* ------------------------------ video / audio ----------------------------- */

const mediaUrl = media =>
  typeof media === 'string' ? media : media && media.url

// m:ss
const fmtTime = seconds => {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

// bouncing equalizer bars — a nod to the classic mini-player look
const eq = keyframes`
  0%, 100% { transform: scaleY(0.35) }
  50% { transform: scaleY(1) }
`

const EqBar = styled.span`
  display: block;
  width: 3px;
  height: 18px;
  border-radius: 2px;
  background: ${GRADIENT};
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
  background: ${GRADIENT};
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
`

const ProgressTrack = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: ${BORDER};
  cursor: pointer;
`

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

// a compact, mini-winamp style player built from the response metadata:
// album art, title / author, transport, scrubber and an equalizer
const AudioOutput = ({ data }) => {
  const src = mediaUrl(data.audio)
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(data.audio?.duration || 0)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined
    const onTime = () => setCurrent(el.currentTime)
    const onMeta = () => setDuration(el.duration)
    const onEnd = () => {
      setPlaying(false)
      setCurrent(0)
    }
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnd)
    }
  }, [src])

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  const seek = event => {
    const el = audioRef.current
    if (!el || !duration) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width)
    )
    el.currentTime = ratio * duration
    setCurrent(el.currentTime)
  }

  const pct = duration ? (current / duration) * 100 : 0
  const image = data.image?.url
  const title = data.title || 'Audio'
  const subtitle = [data.author, data.publisher].filter(Boolean).join(' · ')

  return (
    <Box css={theme({ p: 4 })}>
      <Flex
        css={theme({
          maxWidth: '480px',
          mx: 'auto',
          alignItems: 'center',
          gap: 3,
          p: 3,
          border: `1px solid ${BORDER}`,
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
                  color: INK,
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
                    color: MUTED,
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
            <ProgressTrack onClick={seek}>
              <Box
                css={{
                  height: '100%',
                  borderRadius: '999px',
                  background: GRADIENT,
                  width: `${pct}%`
                }}
              />
            </ProgressTrack>
            <Box
              as='span'
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                color: MUTED,
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
    </Box>
  )
}

/* --------------------------------- video --------------------------------- */

const TitleBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 600;
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
`

// framed video with a centered play overlay, a title bar, and an overlaid
// transport / scrubber — built from the response metadata
const VideoOutput = ({ data }) => {
  const src = mediaUrl(data.video)
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(data.video?.duration || 0)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return undefined
    const onTime = () => setCurrent(el.currentTime)
    const onMeta = () => setDuration(el.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [src])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  const seek = event => {
    const el = videoRef.current
    if (!el || !duration) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width)
    )
    el.currentTime = ratio * duration
    setCurrent(el.currentTime)
  }

  const pct = duration ? (current / duration) * 100 : 0
  const title = [data.title, data.publisher].filter(Boolean).join(' · ')

  return (
    <Box css={theme({ p: 4 })}>
      <Box
        css={theme({
          position: 'relative',
          maxWidth: '640px',
          mx: 'auto',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 18px 50px -22px rgba(40,10,60,.45)'
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
            onClick={seek}
            css={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <Box
              css={{
                height: '100%',
                borderRadius: '999px',
                background: GRADIENT,
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
    </Box>
  )
}

/* -------------------------------- function -------------------------------- */

const CodeBlock = styled(Box)`
  max-height: 320px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
`

// the four runtime phases the sandbox reports, in execution order
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

const Stat = ({ label, value }) => (
  <Box css={theme({ textAlign: 'center' })}>
    <Box
      as='span'
      css={theme({
        display: 'block',
        fontFamily: 'mono',
        fontSize: 3,
        fontWeight: 'bold',
        color: INK,
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
        color: MUTED
      })}
    >
      {label}
    </Box>
  </Box>
)

const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
`

// visualises the sandbox profiling: headline stats, a single stacked
// execution timeline, and a per-phase duration breakdown
const Profiling = ({ profiling }) => {
  const { cpu, memory, size, phases = {} } = profiling
  const total =
    phases.total || PHASE_META.reduce((sum, [k]) => sum + (phases[k] || 0), 0)
  const segments = PHASE_META.filter(([k]) => phases[k] > 0)
  const pct = ms => (total ? (ms / total) * 100 : 0)

  return (
    <Box css={theme({ p: 4, borderBottom: `1px solid ${BORDER}` })}>
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
        <Stat label='Memory' value={fmtBytes(memory)} />
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
              borderBottom: `1px solid ${BORDER}`
            })}
          >
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <Dot css={{ background: color }} />
              <Box as='span' css={theme({ fontSize: 0, color: INK })}>
                {label}
              </Box>
            </Flex>
            <Flex css={theme({ alignItems: 'center', gap: 3 })}>
              <Box
                as='span'
                css={theme({ fontFamily: 'mono', fontSize: 0, color: BODY })}
              >
                {fmtMs(phases[k])}
              </Box>
              <Box
                as='span'
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: MUTED,
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
  // an array of links is the canonical demo — render it as a clickable list
  const isLinkList =
    Array.isArray(value) && value.every(v => /^https?:\/\//.test(v))

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
              color: VIOLET,
              textDecoration: 'none',
              py: 2,
              borderBottom: `1px solid ${BORDER}`,
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
      css={theme({ p: 4, fontFamily: 'mono', fontSize: 0, color: BODY })}
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

/* ------------------------------- dispatcher ------------------------------- */

const Empty = ({ children }) => (
  <Box css={theme({ p: 4 })}>
    <Box
      as='span'
      css={theme({ fontFamily: 'mono', fontSize: 0, color: MUTED })}
    >
      {children}
    </Box>
  </Box>
)

const Output = ({ req }) => {
  const data = req.body?.data || {}
  const vertical = req.D.vertical

  switch (vertical) {
    case 'screenshot':
      return data.screenshot?.url
        ? (
          <ImageOutput url={data.screenshot.url} alt='screenshot' />
          )
        : (
          <Empty>No screenshot in this response.</Empty>
          )

    case 'animated':
      return data.screenshot?.animated?.url
        ? (
          <AnimatedOutput url={data.screenshot.animated.url} />
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
          <RawText
            css={theme({ p: 4, fontFamily: 'mono', fontSize: 0, color: BODY })}
          >
            {data.markdown}
          </RawText>
          )
        : (
          <Empty>No markdown in this response.</Empty>
          )

    case 'html':
      return data.html
        ? (
          <HtmlOutput html={data.html} />
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
      return <LighthouseOutput apiUrl={req.apiUrl} />

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
      return <EmbedOutput url={req.D.fullUrl} />

    case 'metadata':
      return <MetadataOutput data={data} />

    case 'preview':
      return <Card data={data} fallbackUrl={req.D.fullUrl} />

    case 'search':
      return <SearchOutput />

    default:
      return <Card data={data} fallbackUrl={req.D.fullUrl} />
  }
}

export default Output
