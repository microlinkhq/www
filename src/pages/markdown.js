import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import React, { useEffect, useMemo, useState } from 'react'
import { borders, colors, layout, space, theme } from 'theme'
import { useMounted } from 'components/hook/use-mounted'
import Hide from 'components/elements/Hide'
import { cdnUrl } from 'helpers/cdn-url'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import { useQueryState } from 'components/hook/use-query-state'
import styled from 'styled-components'
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
import humanizeUrl from 'humanize-url'

const SUGGESTIONS = ['https://microlink.io'].map(url => ({
  value: humanizeUrl(url)
}))

const DEFAULT_MD = `# Browser as API

## **Microlink** turns any link into screenshots, PDFs, previews, or structured data. No more Puppeteer clusters. Open source roots.

[](https://microlink.io/logo)

## Logo

### Get and embed favicons from any web

[](https://microlink.io/screenshot)

## Screenshot

### Turn websites into screenshots

[](https://microlink.io/sdk)

## SDK

### Create beautiful link previews

[](https://microlink.io/insights)

## Insights

### Performance metrics powered by Lighthouse

[](https://microlink.io/metadata)

## Metadata

### Get unified metadata

[](https://microlink.io/pdf)

## PDF

### PDF made simple

240

###

CDN Edges

1B

###

reqs per month

46TB

###

data served

99.9%

###

uptime

240

###

CDN Edges

1B

###

reqs per month

46TB

###

data served

## Production ready, browser as a service

### There are hidden costs to run your own infrastructure — Give your team an extra boost in performance, ease of use, browser automation made simple at cost pricing, full control via .

- #### Powerful & Scalable





  Cloud-based solution with superior operational performance.





- #### Costless Solution





  Starts free. No upfront costs, scalable pricing as you go, growing with your business.





- #### Global CDN





  Edge storage distributed over +240 nodes backed by CloudFlare Network.





- #### Developer First





  For developers, with top-notch industry technologies, language-agnostic.





- #### Fully programmable





  Easy to integrate with any existing stack or cloud in just a few minutes.





- #### Declarative Usage





  Simple documentation and interactive code examples that enable quick implementations.





- #### Optimized hardware





  No servers to maintain; no shared browsers between requests.





- #### Built-in cache





  Enabled by default, no additional caching setup required.





- #### Security compliance





  Request isolation with no shared browsers between requests.





- #### Powerful & Scalable





  Cloud-based solution with superior operational performance.





- #### Costless Solution





  Starts free. No upfront costs, scalable pricing as you go, growing with your business.





- #### Global CDN





  Edge storage distributed over +240 nodes backed by CloudFlare Network.





- #### Developer First





  For developers, with top-notch industry technologies, language-agnostic.





- #### Fully programmable





  Easy to integrate with any existing stack or cloud in just a few minutes.





- #### Declarative Usage





  Simple documentation and interactive code examples that enable quick implementations.





- #### Optimized hardware





  No servers to maintain; no shared browsers between requests.





- #### Built-in cache





  Enabled by default, no additional caching setup required.





- #### Security compliance





  Request isolation with no shared browsers between requests.





## Pricing

### Every plan comes with API access & 24/7 tech support. Use the forever free plan to try the service, no credit-card required.

## Free

50

-

  [](https://microlink.io/sdk)
  ### Microlink SDK



-

  [](https://microlink.io/pdf)
  ### Microlink PDF



-

  [](https://microlink.io/insights)
  ### Microlink insights



-

  [](https://microlink.io/recipes)
  ### Microlink recipes



-

  [](https://microlink.io/metadata)
  ### Microlink metadata



-

  [](https://microlink.io/screenshot)
  ### Microlink screenshot



[Get started](https://microlink.io/docs/api/getting-started/overview)

## Pro

-

  Everything in Free



-

  [](https://microlink.io/docs/api/parameters/ttl)
  ### Configurable TTL



-

  [](https://microlink.io/docs/api/parameters/headers)
  ### Custom HTTP headers



-

  [](https://microlink.io/docs/api/parameters/proxy)
  ### Automatic proxy resolution



## Enterprise

Starts from

-

  Everything in Pro



-

  [](https://microlink.io/enterprise)
  ### Custom API endpoint



-

  [](https://microlink.io/enterprise)
  ### Dedicated CDN distribution



-

  [](https://microlink.io/enterprise)
  ### S3 like storage integration



[See details](https://microlink.io/enterprise)

## FAQs

### Frequently asked questions.

### [Can I use microlink for free?](https://microlink.io/#can-i-use-microlink-for-free)

Absolutely. We have a forever free [endpoint](https://microlink.io/docs/api/basics/endpoint) you can use. It’s the best way to start using the service.

The free plan runs under some limitations to avoid abusive usage of the platform, like burst rate, limited concurrency rate and daily rate limit.

The free plan should be enough for small projects or low API quota.

### [How different is the free plan compared with the Pro plan?](https://microlink.io/#how-different-is-the-free-plan-compared-with-the-pro-plan)

The pro plan is ready to be used at scale, with better performance and unlocked features such as [headers](https://microlink.io/docs/api/parameters/headers), [ttl](https://microlink.io/docs/api/parameters/ttl) or [proxy](https://microlink.io/docs/api/parameters/proxy).

A Pro plan comes with an associated API key and configurable quota. You only pay as you need.

### [What if I don't know how much API quota I need?](https://microlink.io/#what-if-i-dont-know-how-much-api-quota-i-need)

No problem, just start with the smallest pro plan, and at the moment you need more, you can upgrade your plan.

### [How do I get an API key?](https://microlink.io/#how-do-i-get-an-api-key)

After your payment, we send you the API key associated with the email you signed up.

The API key needs to be attached to all your requests:

- In [Microlink SDK](https://microlink.io/docs/sdk/getting-started/overview), attach it as [apiKey](https://microlink.io/docs/sdk/parameters/api-key).
- In [Microlink API](https://microlink.io/docs/api/getting-started/overview), attach it as a [header](https://microlink.io/docs/api/basics/authentication).

### [What's your SLA level?](https://microlink.io/#whats-your-sla-level)

Our Service-Level Agreements commitment is 99.9% (three nines). You can see the live [status](https://microlink.io/status) of the service.

### [How do I know my plan usage?](https://microlink.io/#how-do-i-know-my-plan-usage)

We notify you automatically when you reach 80% or more of your usage plan, offering to upgrade your plan to one more suitable based on your plan usage.

### [What if I want to change my plan?](https://microlink.io/#what-if-i-want-to-change-my-plan)

You can upgrade, downgrade, or cancel your monthly account at any time with no further obligation by sending an email to [](mailto:hello@microlink.io)

hello@microlink.io

with the email you signed up.

### [How is the payment processed?](https://microlink.io/#how-is-the-payment-processed)

We use Stripe to process your payment. It’s the same payment provider used in products such as Twitter, Pinterest, and Lyft. We do not handle your credit card information directly.

### [Can I update my card details?](https://microlink.io/#can-i-update-my-card-details)

Yes, send an email to [](mailto:hello@microlink.io)

hello@microlink.io

requesting the change. You will receive a link where you'll be able to securely update your details.

### [Can I cancel my subscription?](https://microlink.io/#can-i-cancel-my-subscription)

Yes, by sending an email to [](mailto:hello@microlink.io)

hello@microlink.io

. Your request will be processed within 24hrs.

### [Other questions?](https://microlink.io/#other-questions)

We’re always available at [](mailto:hello@microlink.io)

hello@microlink.io

.`

const DEFAULT_RESPONSE_DATA = {
  body: new TextEncoder().encode(DEFAULT_MD),
  headers: { 'content-type': 'text/markdown; charset=utf-8' }
}

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

const Timings = () => (
  <Box
    as='section'
    id='timings'
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
  </Box>
)

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

const Analytics = () => (
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
          <Stat key={stat.name} isLast={index === stats.length - 1} {...stat} />
        ))}
      </Flex>
    </Hide>
    <Hide breakpoints={[2, 3]}>
      <Flex css={{ width: '100%', justifyContent: 'space-around' }}>
        {stats.slice(0, -1).map((stat, index) => (
          <Stat key={stat.name} isLast={index === stats.length - 2} {...stat} />
        ))}
      </Flex>
    </Hide>
  </Block>
)

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
  const isMounted = useMounted()
  const [draftUrl, setDraftUrl] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const mountedQuery = isMounted ? query : undefined
  const committedUrl = useMemo(
    () => (mountedQuery?.url ? prependHttp(mountedQuery.url) : ''),
    [mountedQuery?.url]
  )

  const normalizedDraftUrl = useMemo(() => {
    const value = draftUrl.trim()
    if (!value) return ''
    return prependHttp(value)
  }, [draftUrl])

  const isValidUrl = useMemo(
    () => isUrl(normalizedDraftUrl),
    [normalizedDraftUrl]
  )
  const interactiveMqlCode = useMemo(() => {
    if (!committedUrl) return {}
    return {
      url: committedUrl,
      force: true,
      data: {
        markdown: {
          attr: 'markdown'
        }
      },
      embed: 'markdown',
      meta: false
    }
  }, [committedUrl])

  const iconQuery = useMemo(() => {
    if (!isUrl(normalizedDraftUrl)) return undefined

    try {
      return new URL(normalizedDraftUrl).hostname
    } catch (_) {
      return undefined
    }
  }, [normalizedDraftUrl])

  useEffect(() => {
    if (!mountedQuery?.url) return
    setIsFetching(true)
    setDraftUrl(mountedQuery.url)
  }, [mountedQuery?.url])

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
                  if (normalizedDraftUrl !== committedUrl) setIsFetching(true)
                  setQuery({ url: normalizedDraftUrl })
                }
              }}
            >
              <Box>
                <Input
                  id='markdown-url'
                  css={theme({
                    fontSize: 2,
                    width: ['100%', '100%', 128]
                  })}
                  iconComponent={<InputIcon query={iconQuery} />}
                  placeholder='Paste URL'
                  type='text'
                  value={draftUrl}
                  onChange={event => setDraftUrl(event.target.value)}
                  suggestions={SUGGESTIONS}
                  autoFocus
                />
              </Box>

              <Button
                css={theme({ mt: [3, 0, 0, 0], ml: [0, 2, 2, 2] })}
                loading={isFetching}
              >
                <Caps css={theme({ fontSize: 1 })}>Convert</Caps>
              </Button>
            </Flex>
          </Flex>

          <MultiCodeEditorInteractive
            mqlCode={interactiveMqlCode}
            defaultResponseData={DEFAULT_RESPONSE_DATA}
            autoExecute={!!committedUrl}
            onLoadingChange={setIsFetching}
            defaultView='body'
            height={350}
            css={theme({
              mt: 3,
              width: [`calc(100vw - ${space[4]})`, layout.small]
            })}
          />
        </Flex>

        <Analytics />

        <Timings />

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
    image={cdnUrl('banner/markdown.jpeg')}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/markdown',
        name: 'Microlink Markdown API',
        description:
          'Convert any URL into clean Markdown for AI agents, RAG ingestion, and token-efficient content processing.',
        url: 'https://microlink.io/markdown',
        applicationCategory: ['DeveloperApplication', 'API'],
        keywords: [
          'markdown API',
          'URL to markdown',
          'webpage to markdown',
          'RAG ingestion',
          'AI agent content extraction',
          'LLM preprocessing',
          'token-efficient content',
          'structured markdown'
        ],
        about: [
          { '@type': 'Thing', name: 'Markdown Conversion API' },
          { '@type': 'Thing', name: 'AI Agent Content Processing' },
          { '@type': 'Thing', name: 'RAG Data Preparation' },
          { '@type': 'Thing', name: 'Structured Content Extraction' }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://microlink.io/markdown#faq',
        url: 'https://microlink.io/markdown',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Microlink Markdown?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink Markdown is an extraction API that takes a URL and returns markdown content ready for AI workflows. Use it for crawling, summarization, and RAG ingestion where clean text beats noisy HTML.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I integrate it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Integration is straightforward: send a URL through the API client and read the markdown field from the response. For production, run it server-side to keep credentials safe and control throughput.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I process private pages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Process authenticated pages when your integration includes the required credentials. Keep API keys and auth tokens out of the browser and proxy secure requests through your backend.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where can I see all parameters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Visit Microlink API documentation for parameter details, request examples, and SDK usage guides. You will find examples for metadata, screenshots, PDFs, and markdown extraction in one consistent API surface.'
            }
          }
        ]
      }
    ]}
  />
)

export default MarkdownPage
