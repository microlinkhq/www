import { colors, fonts, theme } from 'theme'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { prefersReducedMotion } from 'helpers/reduced-motion'

const SLIDE_MS = 320

const useRotation = (length, interval) => {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let swapTimer
    const timer = setInterval(() => {
      setLeaving(true)
      swapTimer = setTimeout(() => {
        setIndex(previous => (previous + 1) % length)
        setLeaving(false)
      }, SLIDE_MS)
    }, interval)
    return () => {
      clearInterval(timer)
      clearTimeout(swapTimer)
    }
  }, [length, interval])

  return { index, leaving }
}

const MockPanel = styled(Box)`
  font-family: ${fonts.sans};
  ${theme({ bg: 'white', borderRadius: 2, p: 3, width: '100%' })}
  max-width: 440px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 12px 20px -8px rgb(0 0 0 / 0.12);
  overflow: hidden;
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(28px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: none;
  }

  to {
    opacity: 0;
    transform: translateX(-28px);
  }
`

const VariantSlide = styled(Box)`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${props => (props.$leaving ? slideOut : slideIn)} ${SLIDE_MS}ms
      ${props => (props.$leaving ? 'ease-in' : 'ease-out')} both;
  }
`

const CodeStrip = styled(Box)`
  ${theme({ borderRadius: 2 })}
  padding: 8px 10px;
  background: ${colors.gray9};
  font-family: ${fonts.mono};
  font-size: 12px;
  line-height: 1.7;
  color: ${colors.white80};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CodeLine = styled(Text)`
  font-family: ${fonts.mono};
  font-size: 12px;
  line-height: 1.7;
  color: ${colors.white80};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FieldLabel = styled(Text)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  color: ${props => props.$color};
`

const MonoLine = styled(Text)`
  font-family: ${fonts.mono};
  font-size: 12px;
  line-height: 1.8;
  color: ${colors.black60};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Hint = styled(Text)`
  font-size: 11px;
  line-height: 1.4;
  color: ${colors.black40};
`

const MiniChip = styled(Box)`
  ${theme({ border: 1, borderColor: 'black10', borderRadius: 2, bg: 'white' })}
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: ${colors.black70};
  white-space: nowrap;
`

const ListBox = styled(Box)`
  ${theme({ border: 1, borderColor: 'black10', borderRadius: 2, bg: 'white' })}
  padding: 8px 10px;
`

const SkeletonBar = styled(Box)`
  height: 8px;
  border-radius: 4px;
  background: ${colors.black05};
`

const SkeletonBlock = styled(Box)`
  height: 44px;
  border-radius: 4px;
  background: ${colors.black05};
`

const BrowserDot = styled(Box)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${colors.black10};
  flex-shrink: 0;
`

const ResultTitle = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  color: ${colors.black80};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FooterRow = styled(Flex)`
  ${theme({ alignItems: 'center', justifyContent: 'space-between', gap: 1 })}
  margin-top: 10px;
`

const Count = styled(Hint)`
  font-weight: 700;
  color: ${props => props.$color};
`

const ThumbGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
`

const Thumb = styled(Box)`
  aspect-ratio: 4 / 3;
  border-radius: 4px;
  background: ${colors.black05};
`

const PanelHeader = ({ accent, label, method }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1
    })}
  >
    <FieldLabel $color={accent.icon}>{label}</FieldLabel>
    <MiniChip>.{method}()</MiniChip>
  </Flex>
)

const BrowserFrame = () => (
  <Box
    css={theme({ mt: 2, bg: 'gray0', borderRadius: 2, p: 2 })}
    style={{ border: `1px solid ${colors.black05}` }}
  >
    <Box css={theme({ bg: 'white', borderRadius: 2, overflow: 'hidden' })}>
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: '7px',
          bg: 'gray1'
        })}
      >
        <BrowserDot />
        <BrowserDot />
        <BrowserDot />
        <SkeletonBar css={{ width: '50%', height: '6px', marginLeft: '6px' }} />
      </Flex>
      <Box css={theme({ p: '10px' })}>
        <SkeletonBar css={theme({ width: '80%', mb: '6px' })} />
        <SkeletonBar css={theme({ width: '55%', mb: '8px' })} />
        <SkeletonBlock css={theme({ mb: '8px' })} />
        <SkeletonBar css={theme({ width: '70%', mb: '6px' })} />
        <SkeletonBar css={{ width: '60%' }} />
      </Box>
    </Box>
  </Box>
)

const ChipRow = ({ children, ...props }) => (
  <Flex
    css={theme({ alignItems: 'center', gap: '6px', flexWrap: 'wrap' })}
    {...props}
  >
    {children}
  </Flex>
)

const ContentScreenshot = ({ accent }) => (
  <>
    <PanelHeader
      accent={accent}
      label='URL in, asset out'
      method='screenshot'
    />
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.screenshot(url, {'{ fullPage: true }'})
    </CodeStrip>
    <BrowserFrame />
    <FooterRow>
      <ChipRow>
        <MiniChip>png</MiniChip>
        <MiniChip>1280×800</MiniChip>
        <MiniChip>54.2 kB</MiniChip>
      </ChipRow>
      <Hint>cdn.microlink.io/…</Hint>
    </FooterRow>
  </>
)

const ContentPdf = ({ accent }) => (
  <>
    <PanelHeader accent={accent} label='URL in, asset out' method='pdf' />
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.pdf(url, {"{ format: 'A4' }"})
    </CodeStrip>
    <Box
      css={theme({ mt: 2, bg: 'gray0', borderRadius: 2, p: 2 })}
      style={{ border: `1px solid ${colors.black05}` }}
    >
      <Box
        css={theme({
          bg: 'white',
          borderRadius: 2,
          p: '12px',
          maxWidth: '150px',
          mx: 'auto'
        })}
        style={{ border: `1px solid ${colors.black05}` }}
      >
        <SkeletonBar css={theme({ width: '70%', mb: '8px' })} />
        <SkeletonBar css={theme({ width: '100%', mb: '6px' })} />
        <SkeletonBar css={theme({ width: '100%', mb: '6px' })} />
        <SkeletonBar css={theme({ width: '85%', mb: '10px' })} />
        <SkeletonBar css={theme({ width: '100%', mb: '6px' })} />
        <SkeletonBar css={{ width: '60%' }} />
      </Box>
    </Box>
    <FooterRow>
      <ChipRow>
        <MiniChip>pdf</MiniChip>
        <MiniChip>A4</MiniChip>
        <MiniChip>312 kB</MiniChip>
      </ChipRow>
      <Hint>cdn.microlink.io/…</Hint>
    </FooterRow>
  </>
)

const ContentMetadata = ({ accent }) => (
  <>
    <PanelHeader accent={accent} label='URL in, asset out' method='metadata' />
    <CodeStrip css={theme({ mt: 2 })}>await microlink.metadata(url)</CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <MonoLine>title: &apos;Example Domain&apos;</MonoLine>
      <MonoLine>description: &apos;This domain is for use in…&apos;</MonoLine>
      <MonoLine>publisher: &apos;IANA&apos;</MonoLine>
      <MonoLine>image: {'{ url, 1200×630 }'}</MonoLine>
      <MonoLine>logo: {'{ url, 128×128 }'}</MonoLine>
    </ListBox>
    <FooterRow>
      <Hint>Normalized from Open Graph, Twitter Cards, and JSON-LD</Hint>
    </FooterRow>
  </>
)

const ContentMarkdown = ({ accent }) => (
  <>
    <PanelHeader accent={accent} label='URL in, asset out' method='markdown' />
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.markdown(url, {"{ selector: 'article' }"})
    </CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <MonoLine># Example Domain</MonoLine>
      <MonoLine>This domain is for use in illustrative</MonoLine>
      <MonoLine>examples in documents.</MonoLine>
      <MonoLine>- [More information…](https://iana.org)</MonoLine>
    </ListBox>
    <FooterRow>
      <Hint>Clean Markdown, ready for LLM context windows</Hint>
    </FooterRow>
  </>
)

const CollectionsLinks = ({ accent }) => (
  <>
    <PanelHeader
      accent={accent}
      label='One sweep, every match'
      method='links'
    />
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.links(url, {"{ selectorAll: 'nav a' }"})
    </CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <MonoLine>https://example.com/docs</MonoLine>
      <MonoLine>https://example.com/pricing</MonoLine>
      <MonoLine>https://example.com/blog</MonoLine>
      <MonoLine>https://example.com/changelog</MonoLine>
      <MonoLine>https://example.com/community</MonoLine>
    </ListBox>
    <FooterRow>
      <Hint>Absolute, deduped URLs</Hint>
      <Count $color={accent.icon}>24 links</Count>
    </FooterRow>
  </>
)

const CollectionsEmails = ({ accent }) => (
  <>
    <PanelHeader
      accent={accent}
      label='One sweep, every match'
      method='emails'
    />
    <CodeStrip css={theme({ mt: 2 })}>await microlink.emails(url)</CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <MonoLine>hello@example.com</MonoLine>
      <MonoLine>press@example.com</MonoLine>
      <MonoLine>support@example.com</MonoLine>
      <MonoLine>careers@example.com</MonoLine>
    </ListBox>
    <FooterRow>
      <Hint>From mailto: links and plain text</Hint>
      <Count $color={accent.icon}>4 emails</Count>
    </FooterRow>
  </>
)

const CollectionsImages = ({ accent }) => (
  <>
    <PanelHeader
      accent={accent}
      label='One sweep, every match'
      method='images'
    />
    <CodeStrip css={theme({ mt: 2 })}>await microlink.images(url)</CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <ThumbGrid>
        <Thumb />
        <Thumb />
        <Thumb />
        <Thumb />
        <Thumb />
        <Thumb />
        <Thumb />
        <Thumb />
      </ThumbGrid>
    </ListBox>
    <FooterRow>
      <Hint>Collected from src and srcset</Hint>
      <Count $color={accent.icon}>18 images</Count>
    </FooterRow>
  </>
)

const SpecializedSearch = ({ accent }) => (
  <>
    <PanelHeader accent={accent} label='Structured answers' method='search' />
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.search(&apos;lotus elise s2&apos;, {"{ type: 'news' }"})
    </CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <ResultTitle>Lotus Elise — Wikipedia</ResultTitle>
      <Hint>en.wikipedia.org</Hint>
      <ResultTitle css={theme({ mt: 2 })}>
        Lotus Elise S2 buying guide
      </ResultTitle>
      <Hint>evo.co.uk</Hint>
    </ListBox>
    <FooterRow>
      <ChipRow>
        <MiniChip>page.next()</MiniChip>
        <MiniChip>result.markdown()</MiniChip>
        <MiniChip>knowledgeGraph</MiniChip>
      </ChipRow>
    </FooterRow>
  </>
)

const SpecializedRun = ({ accent }) => (
  <>
    <PanelHeader accent={accent} label='Structured answers' method='run' />
    <Box
      css={theme({ mt: 2, borderRadius: 2 })}
      style={{ background: colors.gray9, padding: '8px 10px' }}
    >
      <CodeLine>
        await microlink.run(url, async ({'{ page }'}) =&gt; {'{'}
      </CodeLine>
      <CodeLine>{'  '}await page.waitForSelector(&apos;h1&apos;)</CodeLine>
      <CodeLine>
        {'  '}return page.$eval(&apos;h1&apos;, el =&gt; el.textContent)
      </CodeLine>
      <CodeLine>{'}'})</CodeLine>
    </Box>
    <ListBox css={theme({ mt: 2 })}>
      <MonoLine>value: &apos;Example Domain&apos;</MonoLine>
    </ListBox>
    <FooterRow>
      <ChipRow>
        <MiniChip>isFulfilled</MiniChip>
        <MiniChip>logging</MiniChip>
        <MiniChip>profiling</MiniChip>
      </ChipRow>
    </FooterRow>
  </>
)

const SpecializedTechnologies = ({ accent }) => (
  <>
    <PanelHeader
      accent={accent}
      label='Structured answers'
      method='technologies'
    />
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.technologies(url)
    </CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <ChipRow>
        <MiniChip>Cloudflare</MiniChip>
        <MiniChip>React</MiniChip>
        <MiniChip>Gatsby</MiniChip>
        <MiniChip>styled-components</MiniChip>
        <MiniChip>Stripe</MiniChip>
        <MiniChip>Vercel</MiniChip>
      </ChipRow>
    </ListBox>
    <FooterRow>
      <Hint>Fingerprinted from the live page</Hint>
      <Count $color={accent.icon}>12 technologies</Count>
    </FooterRow>
  </>
)

const CONTENT_VARIANTS = [
  ContentScreenshot,
  ContentPdf,
  ContentMetadata,
  ContentMarkdown
]

const COLLECTIONS_VARIANTS = [
  CollectionsLinks,
  CollectionsEmails,
  CollectionsImages
]

const SPECIALIZED_VARIANTS = [
  SpecializedSearch,
  SpecializedRun,
  SpecializedTechnologies
]

const RotatingMockup = ({ accent, variants, interval }) => {
  const { index, leaving } = useRotation(variants.length, interval)
  const Variant = variants[index]

  return (
    <MockPanel aria-hidden='true'>
      <VariantSlide key={index} $leaving={leaving}>
        <Variant accent={accent} />
      </VariantSlide>
    </MockPanel>
  )
}

export const ContentMockup = ({ accent }) => (
  <RotatingMockup accent={accent} variants={CONTENT_VARIANTS} interval={4000} />
)

export const CollectionsMockup = ({ accent }) => (
  <RotatingMockup
    accent={accent}
    variants={COLLECTIONS_VARIANTS}
    interval={4600}
  />
)

export const SpecializedMockup = ({ accent }) => (
  <RotatingMockup
    accent={accent}
    variants={SPECIALIZED_VARIANTS}
    interval={5200}
  />
)
