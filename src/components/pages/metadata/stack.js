import React from 'react'
import styled from 'styled-components'
import {
  SECTION_VERTICAL_SPACING,
  borders,
  colors,
  layout,
  shadows,
  theme,
  transition
} from 'theme'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Focus as FocusIcon } from 'components/icons/Focus'
import { ACCENT, Caption, FIRST_URL, HERO_LAYOUT, Subhead } from './shared'

const CARD_TITLE_FONT_SIZE = [2, 2, 3, 3]

const STACK_UTILITIES = [
  {
    key: 'markdown',
    eyebrow: 'Metadata × Markdown',
    title: 'Clean content for LLMs and RAG pipelines',
    description:
      'Strip pages down to clean Markdown for embeddings, summarization, or content ingestion — and ship the structured metadata alongside as front-matter. Your AI pipeline gets both the readable body and the trustworthy source signals in one request.',
    href: '/markdown',
    cta: 'Explore Markdown API',
    accentColor: colors.orange7,
    accentSoft: colors.orange0,
    apiCall: 'api.microlink.io?meta&markdown&url=',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <path d='M7 15V9l3 3 3-3v6' />
        <path d='M17 9v6m0 0l-2-2m2 2l2-2' />
      </svg>
    )
  },
  {
    key: 'screenshot',
    eyebrow: 'Metadata × Screenshot',
    title: 'Visual link previews, every time',
    description:
      'Pair structured metadata with a real browser screenshot when og:image is missing, low-resolution, or mismatched. Render rich link previews and social cards that always look intentional — even for pages without proper Open Graph tags.',
    href: '/screenshot',
    cta: 'Explore Screenshot API',
    accentColor: colors.red6,
    accentSoft: colors.red0,
    apiCall: 'api.microlink.io?meta&screenshot&url=',
    icon: <FocusIcon width='24' height='24' />
  },
  {
    key: 'embed',
    eyebrow: 'Metadata × Embed',
    title: 'Rich previews and oEmbed players in one call',
    description:
      'Pair the unified metadata with a ready-to-paste iframe from 300+ oEmbed providers — YouTube, Spotify, X, Vimeo, Figma, CodeSandbox. Render previews your way with the metadata fields, or drop in the optional SDK for zero-code embeds.',
    href: '/embed',
    cta: 'Explore Embed API',
    accentColor: ACCENT,
    accentSoft: colors.blue0,
    apiCall: 'api.microlink.io?meta&iframe&url=',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <polygon points='10 9 16 12 10 15' fill='currentColor' stroke='none' />
      </svg>
    )
  },
  {
    key: 'palette',
    eyebrow: 'Metadata × Palette & Logo',
    title: 'Brand-aware UI without manual art direction',
    description:
      'Add palette=true to extract dominant colors from the og:image or logo, and get the logo / favicon URLs in the same response. Theme link cards, chat unfurls, and notification UI to match the source — pixel by pixel, brand by brand.',
    href: '/logo',
    cta: 'Read palette docs',
    accentColor: colors.cyan7,
    accentSoft: colors.cyan0,
    apiCall: 'api.microlink.io?meta&palette&url=',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.6-1.4-.4-.4-.6-.9-.6-1.4 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z' />
        <circle cx='7.5' cy='10.5' r='1' />
        <circle cx='12' cy='7.5' r='1' />
        <circle cx='16.5' cy='10.5' r='1' />
      </svg>
    )
  }
]

const StackCard = styled('a')`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    p: [3, 3, 4, 4],
    bg: 'white',
    borderRadius: 3,
    gap: 3
  })};
  position: relative;
  text-decoration: none;
  color: inherit;
  border: ${borders[1]} ${colors.black10};
  box-shadow: ${shadows[1]};
  transition: transform ${transition.medium}, box-shadow ${transition.medium},
    border-color ${transition.medium};
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accent }) => $accent};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform ${transition.medium};
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: ${shadows[3]};
    border-color: ${colors.black20};
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:focus-visible {
      transform: none;
    }
  }
`

const StackIconWrap = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: 2
  })};
  background: ${({ $soft }) => $soft};
  color: ${({ $accent }) => $accent};
  flex-shrink: 0;

  & > svg {
    display: block;
    width: 22px !important;
    height: 22px !important;
    flex-shrink: 0;
  }
`

const StackEyebrow = styled('span')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: 1
  })};
  color: ${({ $accent }) => $accent};
  text-transform: uppercase;
`

const StackApiCode = styled('code')`
  ${theme({
    display: 'block',
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black70',
    bg: 'gray0',
    px: 2,
    py: 2,
    borderRadius: 2,
    mt: 'auto'
  })};
  border: ${borders[1]} ${colors.black05};
  word-break: break-all;
  line-height: 1.5;

  & .stack-api-param {
    color: ${({ $accent }) => $accent};
    font-weight: bold;
  }
`

const StackCta = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold'
  })};
  color: ${({ $accent }) => $accent};
  gap: 6px;
  transition: gap ${transition.short};

  ${StackCard}:hover &,
  ${StackCard}:focus-visible & {
    gap: 10px;
  }

  &::after {
    content: '→';
    display: inline-block;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${StackCard}:hover &,
    ${StackCard}:focus-visible & {
      gap: 6px;
    }
  }
`

const renderStackApi = (apiCall, currentUrl) => {
  const parts = apiCall.split(
    /(\bmeta&\b|\bscreenshot\b|\bpdf\b|\bmarkdown\b|\bpalette\b)/g
  )
  const url = currentUrl || FIRST_URL
  return (
    <>
      {parts.map((part, i) =>
        /^(meta&|screenshot|pdf|markdown|palette)$/.test(part)
          ? (
            <span key={`${part}-${i}`} className='stack-api-param'>
              {part}
            </span>
            )
          : (
              part
            )
      )}
      {url}
    </>
  )
}

export const Stack = ({ currentUrl }) => {
  return (
    <Container
      id='stack'
      as='section'
      css={theme({
        alignItems: 'center',
        width: '100%',
        py: SECTION_VERTICAL_SPACING,
        px: [3, 3, 4, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: [4, 4, 5, 5]
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
            maxWidth: layout.large,
            mx: 'auto'
          })}
        >
          <Caps
            css={theme({
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black60',
              letterSpacing: 2
            })}
          >
            One API, every layer of context
          </Caps>
          <Subhead
            css={theme({
              textAlign: 'center'
            })}
          >
            Metadata is the foundation.
            <br />
            <span css={{ color: ACCENT }}>Stack the rest on top.</span>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              textAlign: 'center',
              maxWidth: layout.normal,
              mx: 'auto'
            })}
          >
            Use the metadata API on its own to power link previews, knowledge
            graphs, content moderation, or SEO tooling. Combine it with the
            other Microlink utilities in a single request to enrich the response
            with screenshots, PDFs, clean Markdown, and brand colors — no extra
            roundtrips, same predictable JSON, same browser session.
          </Caption>
        </Flex>
        <Box
          css={theme({
            display: 'grid',
            width: '100%',
            gridTemplateColumns: [
              '1fr',
              '1fr',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)'
            ],
            gap: [3, 3, 4, 4]
          })}
        >
          {STACK_UTILITIES.map(item => (
            <StackCard
              key={item.key}
              href={item.href}
              $accent={item.accentColor}
              aria-label={`${item.title} — ${item.cta}`}
            >
              <Flex
                css={theme({
                  alignItems: 'center',
                  gap: 3
                })}
              >
                <StackIconWrap
                  $accent={item.accentColor}
                  $soft={item.accentSoft}
                >
                  {item.icon}
                </StackIconWrap>
                <Flex
                  css={theme({
                    flexDirection: 'column',
                    gap: 1,
                    minWidth: 0
                  })}
                >
                  <StackEyebrow $accent={item.accentColor}>
                    {item.eyebrow}
                  </StackEyebrow>
                  <Subhead
                    titleize={false}
                    css={theme({
                      fontSize: CARD_TITLE_FONT_SIZE,
                      textAlign: 'left'
                    })}
                  >
                    {item.title}
                  </Subhead>
                </Flex>
              </Flex>
              <Text
                css={theme({
                  textAlign: 'left'
                })}
              >
                {item.description}
              </Text>
              <StackApiCode $accent={item.accentColor}>
                {renderStackApi(item.apiCall, currentUrl)}
              </StackApiCode>
              <StackCta $accent={item.accentColor}>{item.cta}</StackCta>
            </StackCard>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}
