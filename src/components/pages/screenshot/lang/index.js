import { colors, layout, theme, borders } from 'theme'
import React from 'react'
import styled from 'styled-components'
import { Check as CheckIcon, X as XIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { withTitle } from 'helpers/hoc/with-title'
import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'
import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS as TOOL_CATALOG } from 'components/patterns/Tools/toolCatalog'

import ScreenshotDemo from './ScreenshotDemo'

// Flattened tool catalog, so the playground section can pull the matching
// FeaturedToolCard by href (same card the /screenshot landing renders).
const ALL_TOOLS = TOOL_CATALOG.flatMap(section => section.tools)

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

// Shared layout tokens — the page mirrors the /integrations/sdk landing: one
// centered column, generous vertical rhythm, red accent on headline keywords.
const ACCENT = 'red6'
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]
const SECTION_MAX_WIDTH = '1100px'
const CONTENT_WIDTH = layout.normal

// Force the CodeEditor (and its header row) to fill its centered container.
const CODE_FULL_WIDTH = {
  '& > div, & > div > div:first-child': { width: '100%' }
}

// ── Background pattern ────────────────────────────────────────────────────────
// Dashed grid that fades out below the hero, lifted from the SDK landing so the
// two pages read as a family.
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

// ── Shared primitives ─────────────────────────────────────────────────────────
const SectionContainer = ({ id, children, css: cssProp, ...props }) => (
  <Container
    as='section'
    id={id}
    css={theme({
      bg: 'transparent',
      maxWidth: '100%',
      pt: SECTION_VERTICAL_SPACING,
      pb: SECTION_VERTICAL_SPACING,
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

const SectionHead = ({ title, caption, maxWidth = CONTENT_WIDTH, pt }) => (
  <Box
    css={theme({
      textAlign: 'center',
      width: '100%',
      maxWidth,
      mx: 'auto',
      pt,
      pb: [4, 4, 5, 5]
    })}
  >
    <Subhead
      titleize={false}
      css={theme({
        textAlign: 'center'
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
          textAlign: 'center',
          maxWidth: CONTENT_WIDTH,
          mx: 'auto'
        })}
      >
        {caption}
      </Caption>
    )}
  </Box>
)

const Breadcrumb = ({ items }) => (
  <Flex
    as='nav'
    aria-label='Breadcrumb'
    css={theme({
      gap: 2,
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: [1, 1, 2, 2],
      pb: [3, 3, 4, 4],
      justifyContent: 'center'
    })}
  >
    {items.map((item, index) => (
      <Flex key={item.label} css={theme({ alignItems: 'center', gap: 2 })}>
        {index > 0 && (
          <Text as='span' css={theme({ color: 'black30' })}>
            /
          </Text>
        )}
        {item.href
          ? (
            <Link href={item.href}>{item.label}</Link>
            )
          : (
            <Text as='span' css={theme({ color: 'black60' })}>
              {item.label}
            </Text>
            )}
      </Flex>
    ))}
  </Flex>
)

// ── Hero (centered, code-free) ────────────────────────────────────────────────
const Hero = ({ hero, breadcrumb }) => (
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
    {breadcrumb && <Breadcrumb items={breadcrumb} />}
    <Heading
      titleize={false}
      variant='unset'
      css={theme({
        maxWidth: SECTION_MAX_WIDTH,
        textAlign: 'center'
      })}
    >
      {hero.title}
    </Heading>
    <Caption
      forwardedAs='div'
      titleize={false}
      css={theme({
        pt: [3, 3, 4, 4],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      {hero.subtitle}
    </Caption>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        gap: [3, 3, 4, 4],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: ['column', 'row', 'row', 'row'],
        fontSize: [2, 2, 3, 3]
      })}
    >
      <ArrowLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ArrowLink>
      <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
    </Flex>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        width: '100%',
        maxWidth: '820px',
        mx: 'auto',
        justifyContent: 'center'
      })}
    >
      <ScreenshotDemo alt={hero.demoAlt} />
    </Flex>
  </Container>
)

// ── Quickstart (vertical, progressively deeper code) ──────────────────────────
const Quickstart = ({ quickstart }) => (
  <SectionContainer id='quickstart'>
    <SectionHead
      title={quickstart.title}
      caption={quickstart.caption}
      pt={[4, 4, 5, 5]}
    />
    <Box css={theme({ width: '100%', maxWidth: CONTENT_WIDTH, mx: 'auto' })}>
      {quickstart.steps.map((step, index) => (
        <Box
          key={step.title}
          css={theme({
            pb: index === quickstart.steps.length - 1 ? 0 : [4, 4, 5, 5]
          })}
        >
          <Box css={{ textAlign: 'center' }}>
            <Eyebrow>{`Step 0${index + 1} · ${step.title}`}</Eyebrow>
          </Box>
          {step.description && (
            <Text
              css={theme({
                pb: [3, 3, 4, 4],
                fontSize: [1, 2, 2, 2],
                color: 'black70',
                textAlign: 'center',
                maxWidth: layout.small,
                mx: 'auto'
              })}
            >
              {step.description}
            </Text>
          )}
          <Box css={[theme({ width: '100%' }), CODE_FULL_WIDTH]}>
            <CodeEditor
              autoHeight
              language={step.code.language}
              title={step.code.title}
            >
              {step.code.source}
            </CodeEditor>
          </Box>
        </Box>
      ))}
    </Box>
  </SectionContainer>
)

// ── Framework integration (tabbed) ────────────────────────────────────────────
// The example labels double as MultiCodeEditor tabs, so the reader jumps between
// frameworks in place. Vanilla Node.js is the last tab.
const Framework = ({ framework }) => {
  const languages = framework.examples.reduce((acc, example) => {
    acc[example.label] = example.code.source
    return acc
  }, {})

  return (
    <SectionContainer id='framework'>
      <SectionHead title={framework.title} caption={framework.caption} />
      <Box css={theme({ width: '100%', maxWidth: CONTENT_WIDTH, mx: 'auto' })}>
        <Box css={[theme({ width: '100%' }), CODE_FULL_WIDTH]}>
          <MultiCodeEditor languages={languages} />
        </Box>
        {framework.footnote && (
          <Text
            css={theme({
              pt: [3, 3, 4, 4],
              fontSize: [0, 0, 1, 1],
              color: 'black60',
              textAlign: 'center'
            })}
          >
            {framework.footnote.text}{' '}
            <Text
              as='code'
              css={theme({ fontFamily: 'mono', color: 'black80' })}
            >
              {framework.footnote.code}
            </Text>
          </Text>
        )}
      </Box>
    </SectionContainer>
  )
}

// ── Comparison ────────────────────────────────────────────────────────────────
const ComparisonColumn = ({ column }) => {
  const positive = column.tone === 'positive'
  const Icon = positive ? CheckIcon : XIcon
  const iconColor = positive ? colors.close : colors.red6
  return (
    <Box
      css={theme({
        flex: 1,
        bg: 'white',
        borderRadius: 4,
        border: `${borders[1]} ${positive ? colors.red6 : colors.black10}`,
        boxShadow: positive
          ? `0 16px 40px ${colors.black10}`
          : `0 8px 24px ${colors.black05}`,
        p: [3, 4, 4, 4]
      })}
    >
      <Caps
        as='h3'
        css={theme({
          fontWeight: 'bold',
          fontSize: [1, 1, 2, 2],
          color: positive ? 'red6' : 'black60',
          pb: 3
        })}
      >
        {column.heading}
      </Caps>
      <Flex as='ul' css={theme({ flexDirection: 'column', gap: 3, pl: 0 })}>
        {column.points.map(point => (
          <Flex
            as='li'
            key={point}
            css={theme({ alignItems: 'flex-start', gap: 2, listStyle: 'none' })}
          >
            <Box
              css={theme({
                flex: 'none',
                lineHeight: 0,
                pt: ['5px', '5px', '8px', '8px']
              })}
            >
              <Icon size={18} color={iconColor} />
            </Box>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: positive ? 'black80' : 'black60'
              })}
            >
              {point}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

const Comparison = ({ comparison }) => (
  <SectionContainer id='why'>
    <SectionHead title={comparison.title} caption={comparison.caption} />
    <Flex
      css={theme({
        width: '100%',
        maxWidth: SECTION_MAX_WIDTH,
        mx: 'auto',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch',
        gap: [3, 3, 4, 4]
      })}
    >
      {comparison.columns.map(column => (
        <ComparisonColumn key={column.heading} column={column} />
      ))}
    </Flex>
  </SectionContainer>
)

// ── Try it live ───────────────────────────────────────────────────────────────
const ToolCta = ({ tool }) => {
  const card = ALL_TOOLS.find(item => item.href === tool.cta.href)
  return (
    <SectionContainer id='playground'>
      <SectionHead title={tool.title} caption={tool.caption} />
      {card && (
        <Box
          css={theme({
            width: '100%',
            maxWidth: ['100%', '550px', '600px', '600px'],
            mx: 'auto'
          })}
        >
          <FeaturedToolCard
            {...card}
            cardCss={{ height: '100%' }}
            titleCss={{ fontSize: [2, 2, 2, 2] }}
            descriptionCss={{ color: 'black60' }}
          />
        </Box>
      )}
    </SectionContainer>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCta = ({ cta }) => (
  <SectionContainer id='get-started'>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        mx: 'auto'
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          textAlign: 'center'
        })}
      >
        {cta.title}
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center'
        })}
      >
        {cta.caption}
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center',
          fontSize: ['24px', '28px', '30px', '32px']
        })}
      >
        <ArrowLink href={cta.primary.href}>{cta.primary.label}</ArrowLink>
        {cta.secondary && (
          <Box css={theme({ fontSize: [2, 2, 3, 3] })}>
            <Link href={cta.secondary.href}>{cta.secondary.label}</Link>
          </Box>
        )}
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {cta.badges.map(label => (
          <Flex
            key={label}
            css={theme({
              alignItems: 'center',
              gap: 1,
              color: 'black80',
              fontSize: [0, 0, 1, 1]
            })}
          >
            <CheckIcon size={16} color={colors.close} />
            <Text as='span'>{label}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </SectionContainer>
)

// ── Page + Head ───────────────────────────────────────────────────────────────
const ScreenshotLang = ({ config }) => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero hero={config.hero} breadcrumb={config.breadcrumb} />
      <Quickstart quickstart={config.quickstart} />
      <Framework framework={config.framework} />
      <Comparison comparison={config.comparison} />
      <Features
        css={theme({ bg: 'transparent', pt: [4, 4, 5, 5], pb: [3, 3, 4, 4] })}
        title={
          <Subhead
            titleize={false}
            css={theme({
              width: '100%',
              textAlign: 'left'
            })}
          >
            {config.features.title}
          </Subhead>
        }
        caption={config.features.caption}
        features={config.features.items}
      />
      <ToolCta tool={config.tool} />
      <Faq
        title={config.faq.title}
        caption={config.faq.caption}
        css={theme({ bg: 'transparent', pb: [4, 4, 5, 5] })}
        questions={config.faq.questions}
      />
      <FinalCta cta={config.cta} />
    </Box>
  </Layout>
)

export const LangHead = ({ config }) => (
  <Meta
    title={config.meta.title}
    description={config.meta.description}
    image={config.meta.image}
    structured={config.meta.structured}
  />
)

export default ScreenshotLang
