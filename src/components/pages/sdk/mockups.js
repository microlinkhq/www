import { colors, fonts, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

const MockPanel = styled(Box)`
  font-family: ${fonts.sans};
  ${theme({ bg: 'white', borderRadius: 2, p: 3, width: '100%' })}
  max-width: 440px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 12px 20px -8px rgb(0 0 0 / 0.12);
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

export const ContentMockup = ({ accent }) => (
  <MockPanel aria-hidden='true'>
    <FieldLabel $color={accent.icon}>URL in, asset out</FieldLabel>
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.screenshot(url, {'{ fullPage: true }'})
    </CodeStrip>
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
          <SkeletonBar
            css={{ width: '50%', height: '6px', marginLeft: '6px' }}
          />
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
    <FooterRow>
      <Flex css={theme({ alignItems: 'center', gap: '6px' })}>
        <MiniChip>png</MiniChip>
        <MiniChip>1280×800</MiniChip>
        <MiniChip>54.2 kB</MiniChip>
      </Flex>
      <Hint>cdn.microlink.io/…</Hint>
    </FooterRow>
    <FooterRow>
      <Hint>Same call shape for pdf, logo, markdown, and embed</Hint>
    </FooterRow>
  </MockPanel>
)

export const CollectionsMockup = ({ accent }) => (
  <MockPanel aria-hidden='true'>
    <FieldLabel $color={accent.icon}>One sweep, every match</FieldLabel>
    <CodeStrip css={theme({ mt: 2 })}>
      await microlink.links(url, {"{ selectorAll: 'nav a' }"})
    </CodeStrip>
    <ListBox css={theme({ mt: 2 })}>
      <MonoLine>https://example.com/docs</MonoLine>
      <MonoLine>https://example.com/pricing</MonoLine>
      <MonoLine>https://example.com/blog</MonoLine>
      <MonoLine>https://example.com/changelog</MonoLine>
      <MonoLine>https://example.com/community</MonoLine>
      <MonoLine>https://example.com/enterprise</MonoLine>
    </ListBox>
    <FooterRow>
      <Hint>Absolute, deduped URLs</Hint>
      <Count $color={accent.icon}>24 links</Count>
    </FooterRow>
    <FooterRow>
      <Flex css={theme({ alignItems: 'center', gap: '6px' })}>
        <MiniChip>.images()</MiniChip>
        <MiniChip>.videos()</MiniChip>
        <MiniChip>.audios()</MiniChip>
        <MiniChip>.emails()</MiniChip>
      </Flex>
    </FooterRow>
  </MockPanel>
)

export const SpecializedMockup = ({ accent }) => (
  <MockPanel aria-hidden='true'>
    <FieldLabel $color={accent.icon}>Structured answers</FieldLabel>
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
      <ResultTitle css={theme({ mt: 2 })}>
        Elise S2 vs S3: what changed
      </ResultTitle>
      <Hint>pistonheads.com</Hint>
    </ListBox>
    <FooterRow>
      <Flex css={theme({ alignItems: 'center', gap: '6px', flexWrap: 'wrap' })}>
        <MiniChip>page.next()</MiniChip>
        <MiniChip>result.markdown()</MiniChip>
        <MiniChip>knowledgeGraph</MiniChip>
      </Flex>
    </FooterRow>
    <FooterRow>
      <Hint>Also news, images, shopping, scholar, maps, and autocomplete</Hint>
    </FooterRow>
  </MockPanel>
)
