import React from 'react'
import styled from 'styled-components'

import { JavaScript } from 'components/icons/JavaScript'
import { Jekyll } from 'components/icons/Jekyll'
import { Vue } from 'components/icons/Vue'
import { Hugo } from 'components/icons/Hugo'
import { Eleventy } from 'components/icons/Eleventy'
import { _React as ReactIcon } from 'components/icons/React'
import {
  Layers as LayersIcon,
  Zap as ZapIcon,
  Sliders as SlidersIcon
} from 'react-feather'

import { cdnUrl } from 'helpers/cdn-url'
import { withTitle } from 'helpers/hoc/with-title'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Card from 'components/elements/Card/Card'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Microlink from 'components/patterns/Microlink/Microlink'
import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'

import { colors, layout, space, theme } from 'theme'

// ─── HOCs ────────────────────────────────────────────────────────────────────

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = 'red6'
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]
const SECTION_MAX_WIDTH = '1200px'

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=9P6rdqiybaw'
const SPOTIFY_URL = 'https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw'
const VERCEL_URL = 'https://vercel.com/home'
const SOUNDCLOUD_URL =
  'https://soundcloud.com/beautybrainsp/beauty-brain-swag-bandicoot'
const GITHUB_URL = 'https://github.com/balderdashy/sails'
const INSTAGRAM_URL = 'https://www.instagram.com/p/BeV6tOhFUor/'
const STRIPE_URL = 'https://stripe.com'

const INTEGRATIONS = [
  { logo: 'React', url: '/docs/sdk/integrations/react/' },
  { logo: 'Vue', url: '/docs/sdk/integrations/vue/' },
  { logo: 'JavaScript', url: '/docs/sdk/integrations/vanilla/' }
]

const Icons = {
  JavaScript,
  Jekyll,
  Vue,
  Hugo,
  Eleventy,
  React: ReactIcon
}

// ─── Background pattern ──────────────────────────────────────────────────────

const DashedGridOverlay = styled(Box)`
  ${theme({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 })}
  height: 1200px;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
`

// ─── Shared primitives ───────────────────────────────────────────────────────

const SectionContainer = ({ id, children, css: cssProp, ...props }) => (
  <Container
    as='section'
    id={id}
    css={theme({
      bg: 'transparent',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center',
      position: 'relative',
      ...cssProp
    })}
    {...props}
  >
    {children}
  </Container>
)

const Eyebrow = ({ children, css: cssProp }) => (
  <Caps
    css={theme({
      color: ACCENT,
      fontWeight: 'bold',
      fontSize: [0, 1, 1, 1],
      pb: [2, 2, 3, 3],
      letterSpacing: 2,
      ...cssProp
    })}
  >
    {children}
  </Caps>
)

const SectionHead = ({
  eyebrow,
  title,
  caption,
  align = 'center',
  maxWidth = layout.normal
}) => (
  <Box
    css={theme({
      textAlign: align,
      width: '100%',
      maxWidth,
      mx: align === 'center' ? 'auto' : undefined,
      pb: [4, 4, 5, 5]
    })}
  >
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Subhead
      titleize={false}
      css={theme({
        fontSize: ['28px', '34px', '42px', '46px'],
        textAlign: align
      })}
    >
      {title}
    </Subhead>
    {caption && (
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: align,
          maxWidth: align === 'center' ? layout.normal : undefined,
          mx: align === 'center' ? 'auto' : undefined
        })}
      >
        {caption}
      </Caption>
    )}
  </Box>
)

const PreviewFrame = styled(Box)`
  ${theme({
    width: '100%',
    bg: 'white',
    borderRadius: 3,
    overflow: 'hidden',
    px: [3, 3, 4, 4],
    pt: [3, 3, 4, 4],
    pb: 1
  })}

  .microlink_card,
  .microlink_card__iframe,
  .microlink_card__iframe iframe {
    width: 100%;
    max-width: 100%;
  }
`

const CaptionMono = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black60',
    pt: 2,
    textAlign: 'center',
    letterSpacing: 0
  })}
`

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

const Hero = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: '100%',
      pt: [3, 3, 4, 4],
      px: [3, 3, 4, 4]
    })}
  >
    <Caps
      css={theme({
        color: ACCENT,
        fontWeight: 'bold',
        fontSize: [0, 1, 1, 1],
        pb: [2, 2, 3, 3],
        letterSpacing: 2
      })}
    >
      Microlink SDK
    </Caps>
    <Subhead
      titleize={false}
      css={theme({
        fontSize: ['34px', '42px', '54px', '62px'],
        maxWidth: SECTION_MAX_WIDTH,
        textAlign: 'center'
      })}
    >
      Beautiful link previews,
      <LineBreak />
      <span css={theme({ color: ACCENT })}>one component</span> away.
    </Subhead>

    <Caption
      forwardedAs='div'
      titleize={false}
      css={theme({
        pt: [3, 3, 4, 4],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      Turn any URL into a rich, themeable preview — under 10 KB, drop-in for
      React, Vue, and Vanilla.
    </Caption>

    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        gap: [2, 3, 3, 3],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: ['column', 'row', 'row', 'row'],
        fontSize: [2, 2, 3, 3]
      })}
    >
      <ArrowLink href='/docs/sdk/getting-started/overview/'>
        Read the docs
      </ArrowLink>
    </Flex>
  </Container>
)

// ─── 2. Why SDK (preview + vertical icon list) ───────────────────────────────

const PILLARS = [
  {
    Icon: LayersIcon,
    title: 'Common surface',
    description:
      'Same props in React, Vue, and Vanilla. Switch stacks without re-learning the SDK.'
  },
  {
    Icon: ZapIcon,
    title: 'Lightweight & fast',
    description:
      'Less than 10 KB gzipped. No polyfills, no CSS injection. Lazy loads under the fold by default.'
  },
  {
    Icon: SlidersIcon,
    title: 'Customizable style',
    description:
      'Themeable through CSS variables and BEM classes. Plays well with styled-components, Tailwind, or plain CSS.'
  }
]

const PillarIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: ACCENT
  })}
`

const Pillars = () => (
  <SectionContainer id='why' css={theme({ mt: 4 })}>
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['stretch', 'stretch', 'stretch', 'center'],
        gap: [4, 4, 5, 5]
      })}
    >
      <Box css={theme({ flex: 1, minWidth: 0, width: '100%' })}>
        <Microlink url={YOUTUBE_URL} size='large' media='video' />
      </Box>
      <Box
        css={theme({
          flex: 1,
          minWidth: 0,
          width: '100%',
          textAlign: ['center', 'center', 'center', 'left']
        })}
      >
        <Caps
          css={theme({
            color: ACCENT,
            fontWeight: 'bold',
            fontSize: [0, 1, 1, 1],
            pb: [2, 2, 3, 3],
            letterSpacing: 2
          })}
        >
          Why the SDK
        </Caps>
        <Subhead
          titleize={false}
          css={theme({
            fontSize: ['28px', '34px', '42px', '46px'],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          Three things in <span css={theme({ color: ACCENT })}>mind</span>.
        </Subhead>
        <Caption
          forwardedAs='div'
          titleize={false}
          css={theme({
            pt: [2, 2, 3, 3],
            fontSize: [1, 2, 2, 2],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          Designed to drop into any web stack and stay out of the way.
        </Caption>
        <Flex
          css={theme({
            flexDirection: 'column',
            gap: [3, 3, 4, 4],
            pt: 4
          })}
        >
          {PILLARS.map(({ Icon, title, description }) => (
            <Flex
              key={title}
              css={theme({
                alignItems: 'flex-start',
                gap: 3,
                justifyContent: ['center', 'center', 'center', 'flex-start']
              })}
            >
              <PillarIcon>
                <Icon size={20} />
              </PillarIcon>
              <Flex
                css={theme({
                  flexDirection: 'column',
                  gap: 1,
                  minWidth: 0,
                  flex: ['0 1 auto', '0 1 auto', '0 1 auto', '1 1 0%'],
                  maxWidth: ['420px', '460px', '480px', 'none'],
                  textAlign: ['left', 'left', 'left', 'left']
                })}
              >
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [2, 2, '18px', '18px'],
                    color: 'black',
                    lineHeight: 1
                  })}
                >
                  {title}
                </Text>
                <Text
                  css={theme({
                    fontSize: [1, 1, '15px', '15px'],
                    color: 'black70',
                    lineHeight: 2
                  })}
                >
                  {description}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  </SectionContainer>
)

// ─── 3. Quickstart (install + basic usage) ───────────────────────────────────

const Quickstart = () => (
  <SectionContainer id='quickstart'>
    <SectionHead
      title={
        <>
          <span css={theme({ color: ACCENT })}>Install</span> once, pass a{' '}
          <span css={theme({ color: ACCENT })}>url</span>, get a card.
        </>
      }
      caption='Same API across React, Vue, and Vanilla — the SDK fetches the metadata, picks the best media, and renders a card that already looks good on any background.'
    />
    <Box
      css={theme({
        width: '100%',
        maxWidth: layout.normal,
        mx: 'auto'
      })}
    >
      <Box css={{ textAlign: 'center' }}>
        <Eyebrow>Step 01 · Install</Eyebrow>
      </Box>
      <Box
        css={theme({
          display: 'flex',
          justifyContent: 'center',
          pb: [4, 4, 5, 5]
        })}
      >
        <MultiCodeEditor
          languages={{
            React: 'npm install @microlink/react styled-components',
            Vue: 'npm install @microlink/vue react react-dom styled-components',
            Vanilla:
              '<script src="https://cdn.jsdelivr.net/npm/@microlink/vanilla@latest/dist/microlink.min.js"></script>'
          }}
        />
      </Box>

      <Box css={{ textAlign: 'center' }}>
        <Eyebrow>Step 02 · The basic card</Eyebrow>
      </Box>
      <Box
        css={theme({
          display: 'flex',
          justifyContent: 'center',
          pb: [3, 3, 4, 4]
        })}
      >
        <MultiCodeEditor
          languages={{
            React: `import Microlink from '@microlink/react'

<Microlink url='${STRIPE_URL}' />`,
            Vue: `<template>
  <Microlink url="${STRIPE_URL}" />
</template>`,
            Vanilla: `<a href="${STRIPE_URL}" class="link-preview"></a>

<script>
  microlink('.link-preview')
</script>`
          }}
        />
      </Box>
      <Box css={{ textAlign: 'center' }}>
        <Link href='https://github.com/microlinkhq/sdk'>See on GitHub</Link>
      </Box>
    </Box>
  </SectionContainer>
)

// ─── 5. Sizes ────────────────────────────────────────────────────────────────

const Sizes = () => (
  <SectionContainer id='size'>
    <SectionHead
      eyebrow='size'
      title={
        <>
          Three sizes that <span css={theme({ color: ACCENT })}>fit</span>{' '}
          anywhere.
        </>
      }
      caption='Pick small for inline references, normal for body content, large for hero blocks.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.normal,
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: [4, 4, 5, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <PreviewFrame css={theme({ pt: 4, border: 'none', boxShadow: 'none' })}>
          <Microlink url={VERCEL_URL} size='small' media='logo' />
          <CaptionMono css={theme({ mb: 5 })}>size="small"</CaptionMono>
          <Microlink url={VERCEL_URL} size='normal' media='logo' />
          <CaptionMono css={theme({ mb: 5 })}>size="normal"</CaptionMono>
          <Microlink url={VERCEL_URL} size='large' />
          <CaptionMono>size="large"</CaptionMono>
        </PreviewFrame>
      </Flex>
    </Flex>
  </SectionContainer>
)

// ─── 6. Media types ──────────────────────────────────────────────────────────

const MEDIA_VARIANTS = [
  { media: 'image', url: STRIPE_URL, label: 'image' },
  { media: 'logo', url: GITHUB_URL, label: 'logo' },
  { media: 'video', url: YOUTUBE_URL, label: 'video' },
  { media: 'audio', url: SOUNDCLOUD_URL, label: 'audio' },
  { media: 'iframe', url: YOUTUBE_URL, label: 'iframe' }
]

const Media = () => (
  <SectionContainer id='media'>
    <SectionHead
      eyebrow='media'
      title={
        <>
          One prop, every <span css={theme({ color: ACCENT })}>format</span>.
        </>
      }
      caption='Image, logo, video, audio, or the provider iframe. The SDK falls back automatically when a media type is missing.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        flexWrap: 'wrap',
        gap: [3, 3, 4, 4],
        justifyContent: 'center'
      })}
    >
      {MEDIA_VARIANTS.map(({ media, url, label }, index) => (
        <Flex
          key={label}
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            flex:
              index === 4
                ? ['1 1 100%', '1 1 100%', '0 1 50%', '0 1 50%']
                : [
                    '1 1 100%',
                    '1 1 100%',
                    '1 1 calc(50% - 16px)',
                    '1 1 calc(50% - 16px)'
                  ],
            minWidth: 0
          })}
        >
          <PreviewFrame>
            <Microlink url={url} media={media} size='normal' />
          </PreviewFrame>
          <CaptionMono>{`media="${label}"`}</CaptionMono>
        </Flex>
      ))}
    </Flex>
  </SectionContainer>
)

// ─── 7. Direction ────────────────────────────────────────────────────────────

const DIRECTIONS = ['ltr', 'rtl']

const Direction = () => (
  <SectionContainer id='direction'>
    <SectionHead
      eyebrow='direction'
      title={
        <>
          Flip the card for <span css={theme({ color: ACCENT })}>RTL</span>{' '}
          languages.
        </>
      }
      caption='Mirror the layout for Arabic, Hebrew, or any right-to-left context.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        flexDirection: ['column', 'column', 'row', 'row'],
        gap: [3, 3, 4, 4]
      })}
    >
      {DIRECTIONS.map(dir => (
        <Flex
          key={dir}
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            minWidth: 0,
            width: '100%'
          })}
        >
          <PreviewFrame>
            <Microlink url={VERCEL_URL} media='logo' direction={dir} />
          </PreviewFrame>
          <CaptionMono>{`direction="${dir}"`}</CaptionMono>
        </Flex>
      ))}
    </Flex>
  </SectionContainer>
)

// ─── 8. Contrast ─────────────────────────────────────────────────────────────

const Contrast = () => (
  <SectionContainer id='contrast'>
    <SectionHead
      eyebrow='contrast'
      title={
        <>
          High-contrast cards from{' '}
          <span css={theme({ color: ACCENT })}>brand colors</span>.
        </>
      }
      caption='Microlink extracts the dominant colors from the preview image to build an accessible high-contrast variant.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        flexDirection: ['column', 'column', 'row', 'row'],
        gap: [3, 3, 4, 4]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          minWidth: 0,
          width: '100%'
        })}
      >
        <PreviewFrame>
          <Microlink url={GITHUB_URL} size='large' />
        </PreviewFrame>
        <CaptionMono>default</CaptionMono>
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          minWidth: 0,
          width: '100%'
        })}
      >
        <PreviewFrame>
          <Microlink url={GITHUB_URL} size='large' contrast />
        </PreviewFrame>
        <CaptionMono>contrast</CaptionMono>
      </Flex>
    </Flex>
  </SectionContainer>
)

// ─── 9. Lazy ─────────────────────────────────────────────────────────────────

const Lazy = () => (
  <SectionContainer id='lazy'>
    <SectionHead
      eyebrow='lazy'
      title={
        <>
          Only fetch when the card
          <br />
          <span css={theme({ color: ACCENT })}>scrolls into view</span>.
        </>
      }
      caption='Lazy loading is on by default. Pass IntersectionObserver options to fine-tune the trigger.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: [3, 3, 4, 5]
      })}
    >
      <PreviewFrame
        css={theme({
          width: '100%',
          maxWidth: '650px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <Microlink url={SPOTIFY_URL} lazy={{ threshold: 0.5 }} media='audio' />
      </PreviewFrame>
      <Box
        css={theme({
          width: '100%',
          minWidth: 0,
          display: 'flex',
          justifyContent: 'center'
        })}
      >
        <MultiCodeEditor
          languages={{
            React: `<Microlink
  url='${SPOTIFY_URL}'
  lazy={{ threshold: 0.5 }}
  media='audio'
/>`,
            Vue: `<Microlink
  url="${SPOTIFY_URL}"
  :lazy="{ threshold: 0.5 }"
  media='audio'
/>`,
            Vanilla: `microlink('.link-preview', {
  lazy: { threshold: 0.5 }
  media='audio'
})`
          }}
        />
      </Box>
    </Flex>
  </SectionContainer>
)

// ─── 10. setData / fetchData ─────────────────────────────────────────────────

const CustomData = () => (
  <SectionContainer id='set-data'>
    <SectionHead
      eyebrow='setData & fetchData'
      title={
        <>
          Bring your <span css={theme({ color: ACCENT })}>own data</span>.
        </>
      }
      caption='Pass setData to merge or replace fields. Disable fetchData to skip the network call entirely.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: [3, 3, 4, 5]
      })}
    >
      <PreviewFrame
        css={theme({
          width: '100%',
          maxWidth: '650px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <Microlink
          url={INSTAGRAM_URL}
          media='video'
          size='large'
          setData={{
            title: 'Hi there, friend.',
            description: 'Replace the description with anything you want.'
          }}
        />
      </PreviewFrame>
      <Box
        css={theme({
          width: '100%',
          minWidth: 0,
          display: 'flex',
          justifyContent: 'center'
        })}
      >
        <CodeEditor language='jsx'>
          {`import Microlink from '@microlink/react'

<Microlink
  url='https://www.instagram.com/p/BeV6tOhFUor/'
  media='video'
  size='large'
  setData={{ title: 'Hi there, friend.', description: 'Replace the description with anything you want.' }}
/>`}
        </CodeEditor>
      </Box>
    </Flex>
  </SectionContainer>
)

// ─── 11. Styling ─────────────────────────────────────────────────────────────

const StyledMicrolinkWrap = styled(Box)`
  --microlink-background-color: #0b0d10;
  --microlink-color: #ffffff;
  --microlink-border: 1px solid #1f2329;
  --microlink-hover-background-color: #1f2329;
  --microlink-hover-border-color: ${colors.yellow};
`

const Styling = () => (
  <SectionContainer id='styling'>
    <SectionHead
      eyebrow='Styling'
      title={
        <>
          Theme it with{' '}
          <span css={theme({ color: ACCENT })}>CSS variables</span>.
        </>
      }
      caption='No CSS is injected into your app. Override the defaults with a few custom properties or target the BEM classes directly.'
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: [3, 3, 4, 5]
      })}
    >
      <PreviewFrame
        css={theme({
          width: '100%',
          maxWidth: '650px'
        })}
      >
        <StyledMicrolinkWrap>
          <Microlink url={VERCEL_URL} media='logo' size='normal' />
        </StyledMicrolinkWrap>
      </PreviewFrame>
      <Box
        css={theme({
          width: '100%',
          minWidth: 0,
          display: 'flex',
          justifyContent: 'center'
        })}
      >
        <CodeEditor language='css'>
          {`.microlink_card {
  --microlink-background-color: #0b0d10;
  --microlink-color: #ffffff;
  --microlink-border: 1px solid #1f2329;
  --microlink-hover-background-color: #1f2329;
  --microlink-hover-border-color: #fcc419;
}`}
        </CodeEditor>
      </Box>
    </Flex>
  </SectionContainer>
)

// ─── 12. API key ─────────────────────────────────────────────────────────────

const ApiKey = () => (
  <SectionContainer id='api-key'>
    <SectionHead
      eyebrow='apiKey'
      title={
        <>
          Ship to production with an{' '}
          <span css={theme({ color: ACCENT })}>API key</span>.
        </>
      }
      caption={
        <>
          The SDK works without authentication — 50 free requests a day. For
          higher quotas, configurable TTL, custom headers and proxy, attach an
          API key from any <Link href='/pricing'>paid plan</Link>.
        </>
      }
    />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: [3, 3, 4, 5]
      })}
    >
      <MultiCodeEditor
        languages={{
          React: `<Microlink
  url='${YOUTUBE_URL}'
  apiKey='YOUR_API_KEY'
/>`,
          Vue: `// register globally with a default key
Vue.use(Microlink, { apiKey: 'YOUR_API_KEY' })`,
          Vanilla: `microlink('.link-preview', {
  apiKey: 'YOUR_API_KEY'
})`
        }}
      />
    </Flex>
  </SectionContainer>
)

// ─── 13. Integrations ────────────────────────────────────────────────────────

const IntegrationCard = styled(Card)`
  &:hover {
    border-color: ${colors.red6};
  }
`

const Integrations = () => (
  <SectionContainer id='integrations'>
    <SectionHead
      eyebrow='Integrations'
      title={
        <>
          Built for <span css={theme({ color: ACCENT })}>developers</span>.
        </>
      }
      caption='Official packages for the most common stacks. Same component, same props.'
    />
    <Flex
      css={theme({
        pt: 0,
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: [3, 3, 4, 4],
        maxWidth: SECTION_MAX_WIDTH,
        width: '100%'
      })}
    >
      {INTEGRATIONS.map(({ url, logo }) => {
        const LogoComponent = Icons[logo]
        return (
          <IntegrationCard
            key={logo}
            css={{ flexDirection: 'column', justifyContent: 'center' }}
            ratio={[0.45, 0.45, 0.32, 0.28]}
          >
            <Link href={url}>
              <Flex css={{ justifyContent: 'center' }}>
                <LogoComponent width='40px' />
              </Flex>
              <Flex
                css={theme({
                  pt: 3,
                  width: '100%',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center'
                })}
              >
                <Text css={theme({ color: 'black', fontWeight: 'bold' })}>
                  Microlink SDK
                </Text>
                <Text css={theme({ color: 'black70', fontSize: 1 })}>
                  for {logo}
                </Text>
              </Flex>
            </Link>
          </IntegrationCard>
        )
      })}
    </Flex>
    <Box css={theme({ fontSize: [2, 2, 3], pt: [4, 4, 5, 5] })}>
      <ArrowLink href='/docs/sdk/getting-started/overview/'>
        Read the docs
      </ArrowLink>
    </Box>
  </SectionContainer>
)

// ─── Head / SEO ──────────────────────────────────────────────────────────────

export const Head = () => (
  <Meta
    title='SDK'
    description='Beautiful link previews in one component. Microlink SDK turns any URL into a rich, themeable preview for React, Vue, and Vanilla — under 10 KB.'
    image={cdnUrl('banner/sdk.jpeg')}
  />
)

// ─── Page ────────────────────────────────────────────────────────────────────

const SdkPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Pillars />
      <Quickstart />
      <Sizes />
      <Media />
      <Direction />
      <Contrast />
      <Lazy />
      <CustomData />
      <Styling />
      <ApiKey />
      <Integrations />
    </Box>
  </Layout>
)

export default SdkPage
