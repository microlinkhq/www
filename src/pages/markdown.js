import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { layout, radii, theme } from 'theme'
import { cdnUrl } from 'helpers/cdn-url'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'

import Layout from 'components/patterns/Layout'

const PIPELINE_STEPS = [
  {
    tag: 'Primary',
    title: 'Markdown for Agents',
    description:
      'Fetches the URL with Accept: text/markdown. Microlink returns clean Markdown directly from the edge, no parsing required.',
    snippet: "fetch(url, { headers: { Accept: 'text/markdown' } })"
  },
  {
    tag: 'Fallback 1',
    title: 'Microlink AI',
    description:
      'If content negotiation returns HTML, we convert it into Markdown using Microlink AI processing.',
    snippet: 'microlink.markdown.convert({ name: "page.html", blob: htmlBlob })'
  },
  {
    tag: 'Fallback 2',
    title: 'Browser Rendering',
    description:
      'For JS-heavy pages, render via browser automation and extract full-page content before conversion.',
    snippet: "POST /browser-rendering/markdown { url: 'https://...' }"
  }
]

const BUILT_FOR = [
  'AI agents that browse and summarize the web',
  'RAG pipelines that need clean document chunks',
  'Training data preparation for LLMs',
  'Documentation migration and static site generators',
  'Knowledge base builders and research tools',
  'Content archival in human-readable format'
]

const Mono = styled(Text)(
  theme({
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2
  })
)

const Section = ({ children, id }) => (
  <Container
    id={id}
    as='section'
    css={theme({
      width: '100%',
      maxWidth: layout.normal,
      px: [0, 0, 0, 0],
      pt: [5, 5, 6, 6]
    })}
  >
    {children}
  </Container>
)

const Divider = () => (
  <Box
    css={theme({
      mt: [5, 5, 6, 6],
      borderTop: '1px solid',
      borderColor: 'black10'
    })}
  />
)

const MarkdownPage = () => {
  const [url, setUrl] = useState('')

  const previewUrl = useMemo(() => {
    const value = url.trim()
    if (!value) return 'https://markdown.new/any-url-here'

    const hasProtocol = /^https?:\/\//i.test(value)
    return `https://markdown.new/${hasProtocol ? value : `https://${value}`}`
  }, [url])

  return (
    <Layout css={theme({ maxWidth: ['100%', layout.small], mx: 'auto' })}>
      <Box css={theme({ bg: 'white', color: 'black', minHeight: '100%' })}>
        <Flex
          as='section'
          css={theme({
            flexDirection: 'column',
            alignItems: 'center'
          })}
        >
          <Heading>Markdown for Agents</Heading>
          <Caption
            forwardedAs='h2'
            css={theme({ pt: '20px', px: [4, 0], fontSize: '25px' })}
          >
            The web was built for humans. AI agents need structured data. We
            convert any URL to clean Markdown using content negotiation,
            AI-assisted conversion, and full browser fallback.
          </Caption>

          <Caption forwardedAs='h3' css={theme({ pt: 3, display: 'flex' })}>
            <Text as='strong' css={theme({ fontWeight: 'bold', mr: 2 })}>
              80%
            </Text>
            <Text css={theme({})}>fewer tokens than raw HTML</Text>
          </Caption>

          <Box
            as='form'
            onSubmit={event => event.preventDefault()}
            css={theme({
              mt: [4, 4, 5, 5],
              width: '100%',
              border: 1,
              borderColor: 'black10',
              borderRadius: 3,
              p: 3,
              bg: 'gray0'
            })}
          >
            <Flex css={theme({ gap: 2, flexDirection: ['column', 'row'] })}>
              <Input
                id='markdown-url'
                placeholder='Paste any URL (e.g., https://microlink.io/blog)'
                value={url}
                onChange={event => setUrl(event.target.value)}
                css={theme({ flex: 1, width: '100%', fontSize: 1 })}
              />
              <Button variant='black' type='submit' css={theme({ px: 4 })}>
                Convert
              </Button>
            </Flex>
          </Box>

          <Box
            css={theme({
              mt: 3,
              width: '100%',
              border: 1,
              borderColor: 'black10',
              borderRadius: 3,
              p: 4,
              bg: 'gray0'
            })}
          >
            <Mono css={theme({ color: 'black90', textAlign: 'center' })}>
              {previewUrl}
            </Mono>
            <Text
              css={theme({
                color: 'black60',
                textAlign: 'center',
                mt: 2,
                fontSize: 1
              })}
            >
              Prepend <b>markdown.new/</b> to any URL in your browser for
              instant conversion.
            </Text>
          </Box>
        </Flex>

        <Divider />

        <Section id='pipeline'>
          <Subhead css={theme({ color: 'black90' })}>
            Three-Tier Conversion Pipeline
          </Subhead>
          <Text
            css={theme({
              color: 'black70',
              textAlign: 'center',
              mt: 3,
              px: [3, 3, 5, 5]
            })}
          >
            We try the fastest path first and fall back automatically, so each
            request gets the best possible Markdown.
          </Text>

          <Flex
            css={theme({
              mt: 4,
              flexDirection: ['column', 'column', 'row', 'row'],
              border: 1,
              borderColor: 'black10',
              borderRadius: 3,
              bg: 'white',
              overflow: 'hidden'
            })}
          >
            {PIPELINE_STEPS.map((step, index) => (
              <Box
                key={step.title}
                css={theme({
                  flex: 1,
                  p: 4,
                  borderRight:
                    index < PIPELINE_STEPS.length - 1 ? '1px solid' : 0,
                  borderBottom: ['1px solid', '1px solid', 0, 0],
                  borderColor: 'black10'
                })}
              >
                <Caps css={theme({ color: 'orange7', fontSize: 0 })}>
                  {step.tag}
                </Caps>
                <Text
                  as='h3'
                  css={theme({
                    color: 'black90',
                    fontWeight: 'bold',
                    mt: 2,
                    fontSize: 2
                  })}
                >
                  {step.title}
                </Text>
                <Text css={theme({ mt: 2, color: 'black60', fontSize: 1 })}>
                  {step.description}
                </Text>
                <Box
                  css={theme({
                    mt: 3,
                    border: 1,
                    borderColor: 'black10',
                    borderRadius: 2,
                    p: 2,
                    bg: 'black90'
                  })}
                >
                  <Mono css={theme({ color: 'green4' })}>{step.snippet}</Mono>
                </Box>
              </Box>
            ))}
          </Flex>
        </Section>

        <Divider />

        <Section id='why'>
          <Subhead css={theme({ color: 'black90' })}>
            Why Markdown Matters for AI
          </Subhead>
          <Text css={theme({ color: 'black70', textAlign: 'center', mt: 3 })}>
            Feeding raw HTML to an LLM burns tokens on markup and layout noise.
          </Text>

          <Flex
            css={theme({
              mt: 4,
              border: 1,
              borderColor: 'black10',
              borderRadius: 3,
              bg: 'gray0',
              overflow: 'hidden',
              flexDirection: ['column', 'row']
            })}
          >
            <Box
              css={theme({
                flex: 1,
                p: 4,
                borderRight: [0, '1px solid'],
                borderColor: 'black10'
              })}
            >
              <Caps css={theme({ color: 'black50', fontSize: 0 })}>
                HTML — 12-15 tokens
              </Caps>
              <Mono css={theme({ color: 'black70', mt: 2 })}>
                {'<h2 class="section-title" id="about">About Us</h2>'}
              </Mono>
              <Text
                css={theme({ mt: 3, color: 'black90', fontWeight: 'bold' })}
              >
                16,180
                <Text
                  as='span'
                  css={theme({ color: 'black60', fontSize: 1, ml: 1 })}
                >
                  tokens for a blog post
                </Text>
              </Text>
            </Box>
            <Box css={theme({ flex: 1, p: 4 })}>
              <Caps css={theme({ color: 'orange7', fontSize: 0 })}>
                Markdown — 3 tokens
              </Caps>
              <Mono css={theme({ color: 'orange8', mt: 2 })}>## About Us</Mono>
              <Text
                css={theme({ mt: 3, color: 'black90', fontWeight: 'bold' })}
              >
                3,150
                <Text
                  as='span'
                  css={theme({ color: 'black60', fontSize: 1, ml: 1 })}
                >
                  tokens for the same post
                </Text>
              </Text>
            </Box>
          </Flex>

          <Flex
            css={theme({
              mt: 4,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 3
            })}
          >
            {[
              ['80%', 'Token reduction'],
              ['5x', 'More context per window'],
              ['0', 'External dependencies']
            ].map(([value, label]) => (
              <Box key={value} css={theme({ minWidth: ['100%', '30%'] })}>
                <Text
                  css={theme({
                    color: 'orange7',
                    fontSize: [4, 4, 5, 5],
                    fontWeight: 'bold',
                    textAlign: 'center'
                  })}
                >
                  {value}
                </Text>
                <Text
                  css={theme({
                    color: 'black60',
                    textAlign: 'center',
                    fontSize: 1
                  })}
                >
                  {label}
                </Text>
              </Box>
            ))}
          </Flex>
        </Section>

        <Divider />

        <Section id='response'>
          <Subhead css={theme({ color: 'black90' })}>What You Get Back</Subhead>
          <Text
            css={theme({
              color: 'black70',
              textAlign: 'center',
              mt: 3,
              px: [3, 3, 5, 5]
            })}
          >
            Clean Markdown with headers and token metadata via
            <Mono as='span' css={theme({ color: 'black90', ml: 1 })}>
              x-markdown-tokens
            </Mono>
            .
          </Text>

          <Box
            css={theme({
              mt: 4,
              border: 1,
              borderColor: 'black10',
              borderRadius: 3,
              bg: 'gray0',
              overflow: 'hidden'
            })}
          >
            <Flex
              css={theme({
                alignItems: 'center',
                px: 3,
                py: 2,
                borderBottom: '1px solid',
                borderColor: 'black10'
              })}
            >
              <Box
                css={theme({
                  width: '8px',
                  height: '8px',
                  borderRadius: radii[5],
                  bg: 'green5',
                  mr: 2
                })}
              />
              <Mono css={theme({ color: 'black60' })}>HTTP/2 200</Mono>
            </Flex>
            <Box css={theme({ p: 3, bg: 'black95' })}>
              <Mono css={theme({ color: 'cyan4' })}>
                content-type: text/markdown; charset=utf-8 x-markdown-tokens:
                725
              </Mono>
              <Mono css={theme({ color: 'white95', mt: 2 })}>
                {
                  '> title: Markdown for Agents — Introducing Markdown for Agents. The way content and businesses are discovered online is changing rapidly...'
                }
              </Mono>
            </Box>
          </Box>
        </Section>

        <Divider />

        <Section id='built-for'>
          <Subhead css={theme({ color: 'black90' })}>Built For</Subhead>
          <Text
            css={theme({
              color: 'black70',
              textAlign: 'center',
              mt: 3,
              px: [3, 3, 5, 5]
            })}
          >
            Developers, AI agents, and teams building the next generation of
            intelligent applications.
          </Text>

          <Flex
            css={theme({
              mt: 4,
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center'
            })}
          >
            {BUILT_FOR.map(item => (
              <Flex
                key={item}
                css={theme({
                  width: ['100%', 'calc(50% - 8px)'],
                  border: 1,
                  borderColor: 'black10',
                  borderRadius: 3,
                  bg: 'gray0',
                  p: 3,
                  alignItems: 'center'
                })}
              >
                <Text css={theme({ color: 'orange7', mr: 2 })}>→</Text>
                <Text css={theme({ color: 'black80', fontSize: 1 })}>
                  {item}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Section>

        <Flex
          css={theme({
            mt: [5, 5, 6, 6],
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 3
          })}
        >
          <Link href='/docs/api/getting-started/overview'>API docs</Link>
          <Link href='/blog'>Microlink blog</Link>
          <Link href='/terms'>Terms</Link>
          <Link href='/privacy'>Privacy</Link>
        </Flex>
      </Box>
    </Layout>
  )
}

export const Head = () => (
  <Meta
    title='Markdown for Agents'
    description='Convert any URL to clean Markdown with a three-tier conversion pipeline optimized for AI agents and LLM workflows.'
    image={cdnUrl('banner/metadata.jpeg')}
    schemaType='SoftwareApplication'
  />
)

export default MarkdownPage
