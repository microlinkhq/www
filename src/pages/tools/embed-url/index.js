import { borders, colors, layout, theme, space } from 'theme'
import React from 'react'
import { Globe, ArrowRight, Code, Clipboard } from 'react-feather'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'

import { StepCard, SectionIcon, UseCaseCard } from 'components/pages/screenshot'

import { EmbedTool } from 'components/pages/embed-url'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const FEATURES_LIST = [
  {
    title: 'Real provider players',
    description:
      "YouTube, Spotify, Vimeo, X, Figma and 300+ more — get the site's actual interactive embed, ready to paste."
  },
  {
    title: 'Customize without code',
    description:
      'Click any text in the preview to edit it. Switch card styles, fonts, and colors with toggles — no CSS to write.'
  },
  {
    title: 'Free, no signup, no key',
    description:
      'Generate up to 50 embeds per day for free. No account, no API key, no watermark — paste the HTML and go.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a link',
    description:
      'YouTube, Tiktok, Figma, a blog post, a tweet — drop in any URL and the preview loads instantly.'
  },
  {
    icon: Code,
    title: 'Tweak the preview',
    description:
      'Click on the title, description, or any text to edit it. Switch card styles, fonts, and colors.'
  },
  {
    icon: Clipboard,
    title: 'Copy the HTML',
    description:
      'Paste the snippet into your blog, docs, newsletter, MDX, or any HTML editor.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Works for any link',
    description:
      "Real iframe player when the site supports it, a clean preview card when it doesn't. One tool, every URL."
  },
  {
    title: '300+ supported sites',
    description: (
      <>
        YouTube, Spotify, Vimeo, X, Figma, TikTok, CodePen, and hundreds more —
        browse <Link href='/embed/providers'>popular providers</Link> or see the
        full{' '}
        <Link href='/docs/api/parameters/iframe/#providers-supported'>
          provider list
        </Link>
        .
      </>
    )
  },
  {
    title: 'Click-to-edit',
    description:
      'Edit the title, description, author, and site name right in the preview. The copy snippet updates as you type.'
  },
  {
    title: 'Style it to match your site',
    description: (
      <>
        Pick a card layout, theme the colors, set fonts and borders — no CSS.
        Power users can drop in the <Link href='/sdk'>Microlink SDK</Link> for
        full control.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 embeds per day for free. No login, no API key, no branding stripped from the output.'
  },
  {
    title: 'API for your app',
    description: (
      <>
        Built on the <Link href='/embed'>Microlink Embed API</Link> — call the
        same endpoint from any backend, edge runtime, or SDK like{' '}
        <Link href='https://www.npmjs.com/package/@microlink/mql'>
          @microlink/mql
        </Link>
        .
      </>
    )
  }
]

const USE_CASES = [
  {
    title: 'For Docs & Knowledge Bases',
    items: [
      'Embed YouTube tutorials, CodeSandbox demos, Figma boards inline',
      'Drop iframe HTML directly into MDX or Markdown',
      'Keep previews consistent across your docs site',
      'No per-provider integration — one snippet pattern'
    ],
    link: {
      href: '/embed',
      alt: 'Microlink Embed API landing',
      text: 'Explore the Embed API'
    }
  },
  {
    title: 'For Newsletters & Blogs',
    items: [
      'Generate rich previews for any link you share',
      'Use iframes when the provider supports them, cards otherwise',
      'Pair with the vanilla SDK script for static sites',
      'Paste the HTML into Ghost, WordPress, Substack, or static MD'
    ],
    link: {
      href: '/docs/guides/embed',
      alt: 'Embed guide',
      text: 'Read the embed guide'
    }
  },
  {
    title: 'For Dashboards & Apps',
    items: [
      'Render link previews server-side or client-side with the same payload',
      'Drop in <Microlink /> for React, Vue, or vanilla JS',
      'Lazy-load embeds with IntersectionObserver out of the box',
      'Theme the card via CSS variables to match your design system'
    ],
    link: {
      href: '/sdk',
      alt: 'Microlink SDK landing',
      text: 'Use the SDK'
    }
  }
]

/* ─── Hero Section ─────────────────────────────────────── */

const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
    })}
  >
    <Heading
      css={theme({
        px: [3, 3],
        maxWidth: layout.large,
        fontSize: [3, '35px', '40px', '50px']
      })}
    >
      Embed Code Generator
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, '26px', '28px']
      })}
    >
      Turn any URL into an iframe embed or a custom preview card — copy the HTML
      and paste it anywhere.
    </Caption>
  </Flex>
)

/* ─── How It Works ─────────────────────────────────────── */

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: 0,
      pb: [2, 2, 3, 3],
      mt: 2
    })}
  >
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 3, 3, '28px']
      })}
    >
      How to generate embed code for any URL
    </Caption>
    <Flex
      css={theme({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: [2, 2, 3, 4],
        pt: [2, 2, 3, 3]
      })}
    >
      {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
        <StepCard key={title} css={theme({ px: 1, py: [3, 3, 4, 4] })}>
          <SectionIcon icon={Icon} />
          <Caps
            as='h3'
            css={theme({ fontWeight: 'regular', pb: 2, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </StepCard>
      ))}
    </Flex>
  </Container>
)

/* ─── Explanation ────────────────────────────────────── */

const Explanation = () => (
  <Container
    as='section'
    id='why-choose'
    css={theme({
      alignItems: 'center',
      pb: [4, 4, 5, 5],
      pt: [4, 4, 5, 5],
      mt: [3, 3, 4, 4],
      bg: 'pinky'
    })}
  >
    <Subhead css={theme({ fontSize: [3, '30px', '35px', '45px'] })}>
      Why this is the best embed code generator for any URL
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
    >
      {REASON_TO_USE.map(({ title, description }) => (
        <UseCaseCard key={title}>
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 1 })}>
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </UseCaseCard>
      ))}
    </Box>
    <Caption
      css={theme({
        pt: [4, 4, 5, 5],
        px: [1, 1, 3, 3],
        fontSize: '24px',
        maxWidth: layout.large
      })}
    >
      <Text css={theme({ fontSize: 3, color: 'black' })}>
        How can an embed code generator be free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This tool runs on the <Link href='/embed'>Microlink Embed API</Link> —
        the same infrastructure powering rich previews and iframe embeds at
        scale. Free for everyday use, no credit card.
      </Text>
    </Caption>
  </Container>
)

/* ─── Use Cases ───────────────────────────────────────── */

const UseCasesSection = () => (
  <Container
    as='section'
    id='use-cases'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6],
      pt: [4, 4, 5, 5]
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      What you can do with the embed link generator
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From documentation sites to newsletters to product dashboards — embedding
      URLs powers content workflows across every team.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      {USE_CASES.map(({ title, items, link }) => (
        <Box
          key={title}
          css={theme({
            p: 4,
            border: 1,
            borderColor: 'black10',
            borderRadius: 3,
            bg: 'white'
          })}
        >
          <Caps
            as='h3'
            titleize='false'
            css={theme({ fontWeight: 'bold', pb: 3, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Box
            as='ul'
            css={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: space[2]
            }}
          >
            {items.map(item => (
              <Flex
                key={item}
                as='li'
                css={{
                  alignItems: 'baseline',
                  gap: space[2]
                }}
              >
                <ArrowRight
                  size={12}
                  css={{ flexShrink: 0, position: 'relative', top: 1 }}
                />
                <Text
                  css={theme({
                    fontSize: 1,
                    color: 'black60',
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              </Flex>
            ))}
          </Box>
          {link
            ? (
              <Box css={theme({ pt: 3 })}>
                <Link href={link.href} aria-label={link.alt}>
                  {link.text}
                </Link>
              </Box>
              )
            : null}
        </Box>
      ))}
    </Box>
  </Container>
)

/* ─── Banner ─────────────────────────────────────────── */

const Banner = () => (
  <Block
    forwardedAs='section'
    id='pricing'
    flexDirection='column'
    css={theme({
      px: 4,
      maxHeight: '800px',
      pb: 0,
      pt: 5,
      width: '100%',
      overflow: 'hidden',
      backgroundImage: `radial-gradient(
        circle at center right,
        #1d1f4f 0%,
        #1d1f4f 48%,
        #272a73 48%,
        #272a73 52%,
        #303597 52%,
        #303597 65%,
        #3940bb 65%,
        #3940bb 79%,
        #3e55ff 79%,
        #3e55ff 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    })}
    blockOne={
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
          Embed API{' '}
          <span css={theme({ display: 'block', color: 'white60' })}>
            for developers
          </span>
        </Subhead>
      </Flex>
    }
    blockTwo={
      <Flex
        css={theme({
          py: [4, 4, 5, 5],
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxHeight: ['200px', '300px', '400px', '650px'],
          overflow: 'hidden'
        })}
      >
        <ArrowLink
          href='/embed'
          css={theme({
            color: 'white',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Explore the Embed API
        </ArrowLink>
      </Flex>
    }
  />
)

/* ─── API Docs Card ───────────────────────────────────── */

const EmbedApiDocsCard = () => (
  <Container
    as='section'
    id='api-docs'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [2, 2, 3, 3],
      pt: [5, 5, 5, 5],
      mb: [4, 4, 5, 5]
    })}
  >
    <Box
      css={theme({
        width: '100%',
        p: [3, 4],
        borderRadius: 3,
        textAlign: 'center'
      })}
    >
      <Flex css={theme({ justifyContent: 'center', pb: 4 })}>
        <SectionIcon icon={Code} />
      </Flex>
      <Subhead css={theme({ fontSize: 4 })}>
        Embed Code Generator API Documentation
      </Subhead>
      <Caption
        css={theme({
          pt: 3,
          maxWidth: layout.normal,
          mx: 'auto',
          fontSize: 3
        })}
      >
        Read the full embed guide — iframe parameter, custom HTML/CSS,
        AI-generated previews, and the Microlink SDK across React, Vue, and
        vanilla JS.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          fontSize: [2, 2, 3, 3]
        })}
      >
        <ArrowLink href='/docs/guides/embed'>Embed guide</ArrowLink>
      </Flex>
    </Box>
  </Container>
)

/* ─── Product Information (FAQ) ────────────────────────── */

const ProductInformation = () => (
  <Faq
    title='FAQ'
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [2, 2, 4, 4],
      pb: 4,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question: 'What is an embed code generator?',
        answer: (
          <>
            <div>
              An embed code generator turns a URL into ready-to-paste HTML so a
              link appears as a rich preview — an interactive iframe player, a
              card with the page's title, image, and description, or both —
              instead of a plain text link.
            </div>
            <div>
              This tool is a free embed code generator that works for any URL:
              paste the link, pick iframe or card, customize the look, copy the
              HTML.
            </div>
          </>
        )
      },
      {
        question: 'How do I generate embed code for a link?',
        answer: (
          <>
            <div>
              Paste your URL into the input above and press Generate. The tool
              calls the <Link href='/embed'>Microlink Embed API</Link>, detects
              whether the site exposes an iframe player, and returns the HTML
              snippet. Click <strong>Copy code</strong> and paste it into any
              HTML, MDX, or rich-text editor.
            </div>
            <div>
              For sites without an iframe, the generator falls back to a
              customizable preview card — same one-click copy.
            </div>
          </>
        )
      },
      {
        question: 'How is this different from an iframe maker?',
        answer: (
          <>
            <div>
              A traditional iframe maker only wraps a URL in an{' '}
              <code>&lt;iframe src="..."&gt;</code> tag, which breaks for sites
              that block framing (most major sites do).
            </div>
            <div>
              This embed code generator detects the provider's real embed
              endpoint via oEmbed for 300+ supported sites — YouTube, Spotify,
              Vimeo, X, TikTok, Figma, CodePen and more — so the iframe actually
              works. When no embed is available, it returns a styled preview
              card instead of a broken frame.
            </div>
          </>
        )
      },
      {
        question: 'What does the embed code generator do?',
        answer: (
          <>
            <div>
              Paste any link and the tool generates a ready-to-paste HTML
              snippet. For sites with an interactive embed — YouTube, Spotify,
              Figma, X, and 300+ more — you get the provider's real player. For
              everything else, you get a clean preview card.
            </div>
            <div>
              You can customize the card right in the browser: click any text in
              the preview to edit it, switch styles, fonts, and colors, then
              copy the snippet and paste it into your blog, docs, MDX,
              newsletter, or any HTML editor.
            </div>
          </>
        )
      },
      {
        question: 'Can I customize the preview before I copy it?',
        answer: (
          <>
            <div>
              Yes — switch to <strong>Card</strong> mode and the customization
              panel appears. Pick a layout (Standard, Wide, Compact), choose
              light or dark theme, tweak colors, fonts, sizes, and borders.
            </div>
            <div>
              You can also <strong>click any text</strong> in the preview — the
              title, description, site name, or author — and edit it inline. The
              HTML snippet updates as you go.
            </div>
          </>
        )
      },
      {
        question: 'How does the iframe parameter work?',
        answer: (
          <>
            <div>
              Pass <code>&iframe</code> on the Microlink API request. The
              response includes an{' '}
              <Link href='/docs/guides/embed/iframe'>
                <code>iframe.html</code> field
              </Link>{' '}
              with the provider's real player markup — YouTube, Spotify, Vimeo,
              X, TikTok, Figma, and the rest.
            </div>
            <div>
              No per-provider URL gymnastics — Microlink normalizes oEmbed
              across 300+ supported sites.
            </div>
          </>
        )
      },
      {
        question: 'Which providers are supported?',
        answer: (
          <>
            <div>
              300+ verified oEmbed providers including YouTube, Spotify, Twitter
              / X, Instagram, TikTok, GitHub, CodePen, CodeSandbox, Vimeo,
              SoundCloud, Figma, Reddit, Pinterest, Medium, TED, Twitch, and
              more. Browse our{' '}
              <Link href='/embed/providers'>popular provider tools</Link> for
              dedicated embed generators.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/api/parameters/iframe/#providers-supported'>
                full provider list
              </Link>{' '}
              — it grows automatically, no SDK upgrade needed.
            </div>
          </>
        )
      },
      {
        question: 'What happens if a URL has no iframe?',
        answer: (
          <>
            <div>
              The tool falls back to a Microlink SDK card and gives you a
              vanilla HTML snippet that includes the{' '}
              <code>microlink.min.js</code> script from jsDelivr. Paste it
              anywhere — the SDK upgrades the link into a card on page load.
            </div>
            <div>
              For React or Vue, drop in the{' '}
              <Link href='/sdk'>Microlink SDK</Link> component instead — same
              data, framework-native rendering.
            </div>
          </>
        )
      },
      {
        question: 'Can I customize the embed look?',
        answer: (
          <>
            <div>
              Yes. The <Link href='/sdk'>Microlink SDK</Link> exposes CSS
              variables (<code>--microlink-background-color</code>,{' '}
              <code>--microlink-max-width</code>) and stable BEM class hooks for
              styling cards.
            </div>
            <div>
              For more control, fetch the metadata directly and build your own
              card — see the{' '}
              <Link href='/docs/guides/embed/sdk'>SDK guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'What if a URL has no image to preview?',
        answer: (
          <>
            <div>
              Microlink can capture a screenshot on demand — pass{' '}
              <code>screenshot=true</code> and the response includes a{' '}
              <code>screenshot.url</code> you can use as the fallback image.
              Every URL ends up with a usable visual.
            </div>
            <div>
              See the <Link href='/screenshot'>screenshot API</Link> for options
              like full page, dark mode, viewport, and format.
            </div>
          </>
        )
      },
      {
        question: 'Is the embed code generator free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Cached
              responses are served instantly from 240+ Cloudflare edge nodes and
              don't count against your limit.
            </div>
            <div>
              For production volume, see <Link href='/pricing'>Pro plans</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Can I integrate URL embedding into my app?',
        answer: (
          <>
            <div>
              Yes. This tool is built on the{' '}
              <Link href='/embed'>Microlink Embed API</Link> — a plain HTTPS GET
              endpoint. Call it from any backend, edge runtime, browser, or
              static site.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK for Node.js, or drop in the{' '}
              <Link href='/sdk'>Microlink SDK</Link> for React, Vue, or vanilla
              JS.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Embed Code Generator — Embed any URL as an Iframe or Card'
    noSuffix
    description='Free embed code generator. Paste any URL — get a ready-to-paste iframe or custom preview card. Works for YouTube, Spotify, X, Figma, and 300+ providers. No signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url',
        name: 'Embed Code Generator',
        description:
          'Free embed code generator. Paste any URL — get a ready-to-paste iframe or custom preview card. Works for YouTube, Spotify, X, Figma, and 300+ providers. No signup.',
        url: 'https://microlink.io/tools/embed-url',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed code generator',
          'embed code maker',
          'embed link',
          'embed link generator',
          'embed url',
          'embed a link',
          'link embedder',
          'iframe maker',
          'iframe code generator',
          'iframe embed code',
          'iframe generator',
          'url to embed code',
          'embed website',
          'website embed code',
          'embed any url',
          'create embed code',
          'oembed generator',
          'url preview',
          'link preview'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 requests per day'
        },
        featureList: [
          'Embed any URL as iframe HTML',
          'Microlink SDK card fallback',
          'Copy ready-to-paste HTML',
          '300+ oEmbed providers',
          'Edge-cached responses',
          'No login required'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is an embed code generator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "An embed code generator turns a URL into ready-to-paste HTML so a link appears as a rich preview — an interactive iframe player, a card with the page's title, image, and description, or both — instead of a plain text link. This tool is a free embed code generator that works for any URL."
            }
          },
          {
            '@type': 'Question',
            name: 'How do I generate embed code for a link?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste your URL into the input and press Generate. The tool calls the Microlink Embed API, detects whether the site exposes an iframe player, and returns the HTML snippet. Click Copy code and paste it into any HTML, MDX, or rich-text editor. For sites without an iframe, the generator falls back to a customizable preview card.'
            }
          },
          {
            '@type': 'Question',
            name: 'How is this different from an iframe maker?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "A traditional iframe maker only wraps a URL in an iframe tag, which breaks for sites that block framing. This embed code generator detects the provider's real embed endpoint via oEmbed for 300+ supported sites, so the iframe actually works. When no embed is available, it returns a styled preview card instead of a broken frame."
            }
          },
          {
            '@type': 'Question',
            name: 'What does the embed code generator do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste any URL and the tool calls the Microlink Embed API with the iframe parameter. When the provider supports an iframe embed, you get the ready-to-paste HTML. For URLs without a player, the tool falls back to a Microlink SDK card preview with a vanilla SDK snippet.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does the iframe parameter work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Pass &iframe on the Microlink API request. The response includes an iframe.html field with the provider's real player markup — YouTube, Spotify, Vimeo, X, TikTok, Figma, and the rest. Microlink normalizes oEmbed across 300+ supported sites."
            }
          },
          {
            '@type': 'Question',
            name: 'What happens if a URL has no iframe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool falls back to a Microlink SDK card and gives you a vanilla HTML snippet that includes microlink.min.js from jsDelivr. Paste it anywhere — the SDK upgrades the link into a card on page load.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the embed tool free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes — 50 requests per day, no login, no credit card. Cached responses are served from 240+ Cloudflare edge nodes and don't count against your limit."
            }
          }
        ]
      }
    ]}
  />
)

/* ─── Page Composition ─────────────────────────────────── */

const EmbedUrlPage = () => (
  <Layout>
    <Hero />
    <EmbedTool />
    <HowItWorks />
    <Explanation />
    <UseCasesSection />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Embed Any Link{' '}
          <span
            css={{
              display: 'block',
              color: '#3e55ff',
              width: '100%',
              textAlign: 'left'
            }}
          >
            iframe maker, link embedder, oEmbed at scale.
          </span>
        </Subhead>
      }
      caption={
        <>
          One API to embed any URL — iframe HTML when supported, Microlink SDK
          card otherwise. See the <Link href='/embed'>embed landing</Link> for
          the full picture.
        </>
      }
      features={FEATURES_LIST}
    />
    <EmbedApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default EmbedUrlPage
