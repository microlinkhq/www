import React, { useEffect, useMemo, useState } from 'react'
import { borders, colors, layout, space, theme } from 'theme'
import Hide from 'components/elements/Hide'
import { cdnUrl } from 'helpers/cdn-url'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import { useQueryState } from 'components/hook/use-query-state'
import styled from 'styled-components'
import take from 'lodash/take'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Image from 'components/elements/Image/Image'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import Block from 'components/patterns/Block/Block'
import Caption from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'

const FEATURES = [
  {
    title: 'Token Efficient by Default',
    description:
      'Return clean markdown instead of HTML noise, so your agents spend context budget on meaning, not markup.'
  },
  {
    title: 'Simple API Surface',
    description:
      'One URL in, markdown out. Keep ingestion and retrieval pipelines predictable with less glue code.'
  },
  {
    title: 'Built for Agent Workloads',
    description:
      'Purpose-built for crawling, summarization, RAG indexing, and large-scale data preparation.'
  },
  {
    title: 'Streaming Friendly',
    description:
      'Compact markdown payloads move cleanly through queues, workers, and inference services.'
  },
  {
    title: 'Metadata Included',
    description:
      'Pair markdown content with structured metadata for better ranking, chunking, and traceability.'
  },
  {
    title: 'Fast Integration',
    description:
      'Ship quickly from browser demos, server workers, or SDK clients with minimal setup.'
  }
]

const Timings = ({ previewUrl }) => {
  return (
    <Flex
      forwardedAs='section'
      id='timings'
      flexDirection='column'
      css={theme({
        p: [5, 5, 6, 6],
        width: '100%',
        'background-image':
          'radial-gradient(circle at center right, rgb(253, 97, 39) 0%, rgb(253, 97, 39) 14.286%,rgb(251, 108, 38) 14.286%, rgb(251, 108, 38) 28.572%,rgb(249, 118, 37) 28.572%, rgb(249, 118, 37) 42.858%,rgb(247, 129, 37) 42.858%, rgb(247, 129, 37) 57.144%,rgb(245, 140, 36) 57.144%, rgb(245, 140, 36) 71.43%,rgb(243, 150, 35) 71.43%, rgb(243, 150, 35) 85.716%,rgb(241, 161, 34) 85.716%, rgb(241, 161, 34) 100.002%)',
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
    >
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text css={theme({ pb: 2, color: 'orange1', textAlign: 'center' })}>
          80% fewer tokens than raw HTML, 5x content per context window
        </Text>
        <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
          HTML into markdown <br /> ready for AI
        </Subhead>
        <Text css={theme({ pt: 2, color: 'orange1', textAlign: 'center' })}>
          Consider not just human visitors, but agents as first-class citizens.
        </Text>
      </Flex>
    </Flex>
  )
}

const Resume = () => (
  <Container
    as='section'
    id='resume'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6]
    })}
  >
    <Subhead css={theme({ px: [3, 3, 0, 0] })} variant='gradient'>
      Production-ready markdown extraction
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink Markdown</b> turns any URL into clean markdown for AI
      ingestion. Process cleaner inputs for chunking, summarization, and
      retrieval without adding brittle parsing layers.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Token efficiency'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Better token economics
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Reduce context waste by replacing HTML-heavy responses with compact
            markdown your models can use immediately.
          </Text>
        </Flex>
      }
    />

    <Block
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Drop-in for existing pipelines
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Feed markdown directly into RAG, indexing, and orchestration flows
            with minimal transformation overhead.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Easy integration'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Operational simplicity'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Less infrastructure to maintain
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Skip custom scrapers and HTML cleanup jobs. Keep extraction logic
            small while you scale usage over time.
          </Text>
        </Flex>
      }
    />
  </Container>
)

const Separator = styled(Box)`
  width: 1px;
  ${theme({ mt: [1, 1, 0, 0], mx: [3, 3, 4, 4] })}
`

const Stat = ({ value, name, isLast }) => (
  <Flex>
    <Flex css={theme({ alignItems: 'center', flexDirection: 'column' })}>
      <Subhead
        forwardedAs='div'
        css={theme({ fontSize: [3, 4], color: 'black' })}
      >
        {value}
      </Subhead>
      <Caption css={theme({ pt: [2, 3], color: 'pink', opacity: 0.8 })}>
        <Caps css={theme({ fontWeight: 'bold', fontSize: [0, 2, 3, 3] })}>
          {name}
        </Caps>
      </Caption>
    </Flex>
    {!isLast && <Separator />}
  </Flex>
)

const stats = [
  { value: '80% fewer', name: 'Token reduction' },
  { value: '5x more', name: 'content per context window' }
]

const Analytics = () => {
  return (
    <Block
      forwardedAs='section'
      id='analytics'
      css={theme({
        flexDirection: 'column',
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
    >
      <Hide breakpoints={[0, 1]}>
        <Flex css={{ width: '100%', justifyContent: 'space-around' }}>
          {stats.map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 1}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Flex css={{ width: '100%', justifyContent: 'space-around' }}>
          {take(stats, stats.length - 1).map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 2}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
    </Block>
  )
}

const ProductInformation = () => (
  <Faq
    title='Product Information'
    caption='Answers to common questions about Microlink Markdown.'
    css={theme({
      pb: [5, 5, 6, 6],
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.black10}`,
      borderBottom: `${borders[1]} ${colors.black10}`
    })}
    questions={[
      {
        question: 'What is Microlink Markdown?',
        answer: (
          <>
            <div>
              Microlink Markdown is an extraction API that takes a URL and
              returns markdown content ready for AI workflows.
            </div>
            <div>
              Use it for crawling, summarization, and RAG ingestion where clean
              text beats noisy HTML.
            </div>
          </>
        )
      },
      {
        question: 'How do I integrate it?',
        answer: (
          <>
            <div>
              Integration is straightforward: send a URL through the API client
              and read the markdown field from the response.
            </div>
            <div>
              For production, run it server-side to keep credentials safe and
              control throughput.
            </div>
          </>
        )
      },
      {
        question: 'Can I process private pages?',
        answer: (
          <>
            <div>
              Yes. Process authenticated pages when your integration includes
              the required credentials.
            </div>
            <div>
              Keep API keys and auth tokens out of the browser and proxy secure
              requests through your backend.
            </div>
          </>
        )
      },
      {
        question: 'Where can I see all parameters?',
        answer: (
          <>
            <div>
              Visit{' '}
              <Link href='/docs/api/getting-started/overview'>
                Microlink API documentation
              </Link>{' '}
              for parameter details, request examples, and SDK usage guides.
            </div>
            <div>
              You will find examples for metadata, screenshots, PDFs, and
              markdown extraction in one consistent API surface.
            </div>
          </>
        )
      }
    ]}
  />
)

const MarkdownPage = () => {
  const [query, setQuery] = useQueryState()
  const [url, setUrl] = useState('')
  const [submittedUrl, setSubmittedUrl] = useState('')

  const normalizedUrl = useMemo(() => {
    const value = url.trim()
    if (!value) return ''
    return prependHttp(value)
  }, [url])

  const isValidUrl = useMemo(() => isUrl(normalizedUrl), [normalizedUrl])

  const iconQuery = useMemo(() => {
    if (!isValidUrl) return undefined

    try {
      return new URL(normalizedUrl).hostname
    } catch (_) {
      return undefined
    }
  }, [isValidUrl, normalizedUrl])

  useEffect(() => {
    if (!query?.url) return
    setUrl(query.url)
    setSubmittedUrl(prependHttp(query.url))
  }, [query?.url])

  const previewUrl = useMemo(() => {
    if (!isValidUrl) return 'https://markdown.microlink.io/any-url-here'
    return `https://markdown.microlink.io/${normalizedUrl}`
  }, [isValidUrl, normalizedUrl])

  return (
    <Layout>
      <Box css={theme({ bg: 'white', color: 'black', minHeight: '100%' })}>
        <Flex
          as='section'
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            px: [4, 4, 0, 0],
            maxWidth: ['100%', layout.small],
            mx: 'auto',
            pb: [5, 5, 6, 6]
          })}
        >
          <Heading>Markdown for Agents</Heading>

          <Caption
            forwardedAs='h2'
            css={theme({ pt: '20px', px: [4, 0], fontSize: '25px' })}
          >
            Discovery is shifting from search results to AI agents. Convert any
            URL into clean markdown so models consume signal instead of markup
            noise.
          </Caption>

          {/* <Caption forwardedAs='h3' css={theme({ pt: 3, display: 'flex' })}>
            <Text as='strong' css={theme({ fontWeight: 'bold', mr: 2 })}>
              80%
            </Text>
            <Text>fewer tokens than raw HTML</Text>
          </Caption> */}

          <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
            <Flex
              as='form'
              css={theme({
                pt: [3, 3, 4, 4],
                pb: 4,
                mx: [0, 0, 'auto', 'auto'],
                justifyContent: 'center',
                flexDirection: ['column', 'column', 'row', 'row'],
                width: '100%'
              })}
              onSubmit={event => {
                event.preventDefault()
                if (isValidUrl) {
                  setQuery({ url: normalizedUrl })
                  setSubmittedUrl(normalizedUrl)
                }
              }}
            >
              <Box>
                <Input
                  id='markdown-url'
                  css={theme({
                    fontSize: 2,
                    width: ['100%', '100%', 128, 128]
                  })}
                  iconComponent={<InputIcon query={iconQuery} />}
                  placeholder='Paste any URL (e.g., https://microlink.io/blog)'
                  type='text'
                  value={url}
                  onChange={event => setUrl(event.target.value)}
                />
              </Box>

              <Button css={theme({ mt: [3, 0, 0, 0], ml: [0, 2, 2, 2] })}>
                <Caps css={theme({ fontSize: 1 })}>Convert</Caps>
              </Button>
            </Flex>
          </Flex>

          {submittedUrl && (
            <MultiCodeEditorInteractive
              key={submittedUrl}
              mqlCode={{
                url: submittedUrl,
                data: {
                  markdown: {
                    attr: 'markdown'
                  }
                },
                embed: 'markdown',
                meta: false
              }}
              autoExecute
              defaultView='body'
              height={350}
              css={theme({
                mt: 3,
                width: [`calc(100vw - ${space[4]})`, layout.small]
              })}
            />
          )}
        </Flex>

        <Analytics />

        <Timings previewUrl={previewUrl} />

        <Features
          css={theme({ px: 4 })}
          title={
            <Subhead css={{ width: '100%', textAlign: 'left' }}>
              Structured content for agents,{' '}
              <span
                css={theme({
                  display: 'block',
                  color: 'orange7',
                  width: '100%',
                  textAlign: 'left'
                })}
              >
                without brittle scraping logic.
              </span>
            </Subhead>
          }
          caption={
            <>
              Convert URLs to markdown on the same API surface your team already
              uses for metadata, screenshots, and PDFs. Start with{' '}
              <Link href='/docs/api/getting-started/overview'>
                Microlink API docs
              </Link>{' '}
              and ship faster.
            </>
          }
          features={FEATURES}
        />
        <Resume />
        <ProductInformation />
      </Box>
    </Layout>
  )
}

export const Head = () => (
  <Meta
    title='Markdown for Agents'
    description='Convert any URL to clean Markdown optimized for AI agents, RAG ingestion, and token-efficient processing.'
    image={cdnUrl('banner/metadata.jpeg')}
    schemaType='SoftwareApplication'
  />
)

export default MarkdownPage
