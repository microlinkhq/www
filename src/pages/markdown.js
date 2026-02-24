import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { borders, colors, fonts, layout, space, theme } from 'theme'
import { useMounted } from 'components/hook/use-mounted'
import { useClipboard } from 'components/hook/use-clipboard'
import { useUrlInput } from 'components/hook/use-url-input'
import { hasDomainLikeHostname, normalizeUrl } from 'helpers/url-input'
import { useQueryState } from 'components/hook/use-query-state'
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
import Notification from 'components/elements/Notification/Notification'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Block from 'components/patterns/Block/Block'
import Caption from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import humanizeUrl from 'humanize-url'
import LineBreak from 'components/elements/LineBreak'

const SUGGESTIONS = [
  'https://www.tmaker.io/blog/million-dollar-mindset-shift-going-into-2026',
  'https://docs.stripe.com/get-started/api-request'
].map(url => ({
  value: humanizeUrl(url)
}))

const DEFAULT_URL = 'https://microlink.io'

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
    title: 'Token efficient by default',
    description:
      'Return clean markdown instead of HTML noise so your agents spend context budget on meaning, not markup. 80% fewer tokens on average.'
  },
  {
    title: 'Works on any website',
    description:
      'Convert any public URL to markdown without the target site needing CDN opt-in or special configuration. The entire web is your dataset.'
  },
  {
    title: 'Built for agent workloads',
    description:
      'Purpose-built for AI crawling, summarization, RAG indexing, LangChain, LlamaIndex, and large-scale LLM data preparation.'
  },
  {
    title: 'Streaming friendly',
    description:
      'Compact markdown payloads move cleanly through queues, workers, and inference services with lower latency than HTML.'
  },
  {
    title: 'Metadata included',
    description:
      'Pair markdown content with structured metadata — title, description, author, date — for better chunking, ranking, and traceability.'
  },
  {
    title: 'Fast integration',
    description:
      'Ship quickly from browser demos, server workers, or SDK clients. One URL in, clean markdown out. Minimal glue code.'
  }
]

const Timings = () => (
  <Box
    as='section'
    id='timings'
    css={theme({
      p: [4, 4, 5, 5],
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
      <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
        HTML into markdown <br /> for AI pipelines
      </Subhead>
      <Text
        css={theme({
          mt: 4,
          color: 'orange1',
          textAlign: 'center',
          fontSize: [1, 1, '24px']
        })}
      >
        Any URL. Any site. No target-site setup required.
      </Text>
    </Flex>
  </Box>
)

const getShowcaseMqlCode = targetUrl => ({
  url: hasDomainLikeHostname(targetUrl) ? targetUrl : DEFAULT_URL,
  force: true,
  data: {
    markdown: {
      attr: 'markdown'
    }
  },
  embed: 'markdown',
  meta: false
})

const CodeShowcase = ({ targetUrl }) => {
  const showcaseMqlCode = useMemo(
    () => getShowcaseMqlCode(targetUrl),
    [targetUrl]
  )

  return (
    <Block
      forwardedAs='section'
      id='code-showcase'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        py: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: [3, 3, 4, 4]
        })}
      >
        <Subhead
          css={theme({
            textAlign: 'center',
            px: [4, 0],
            fontSize: [4, 4, 5, 5]
          })}
          variant='gradient'
        >
          One API call. Clean markdown out.
        </Subhead>
        <Caption
          css={theme({
            px: [4, 4, 0, 0],
            textAlign: 'center',
            maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
          })}
        >
          A typical page: 20,000 HTML tokens → 4,000 markdown tokens
        </Caption>
        <Flex
          css={theme({
            pt: [2, 2, 3, 3],
            flexDirection: 'column',
            alignItems: 'center',
            gap: [3, 3, 4, 4],
            width: '100%'
          })}
        >
          <MultiCodeEditorInteractive
            key={showcaseMqlCode.url}
            mqlCode={showcaseMqlCode}
            defaultResponseData={DEFAULT_RESPONSE_DATA}
            autoExecute={false}
            height={280}
            css={theme({
              width: [`calc(100vw - ${space[4]})`, layout.small]
            })}
          />
        </Flex>
      </Flex>
    </Block>
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
      HTML to markdown API, production-ready
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink Markdown</b> converts any URL to clean markdown. Feed LLM
      workflows with cleaner inputs for chunking, summarization, RAG indexing,
      and retrieval without brittle parsing layers.
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
            A typical page drops from 20,000 HTML tokens to 4,000 markdown
            tokens. Fit 5x more content into every LLM context window and cut
            your inference costs at scale.
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
            Feed clean markdown directly into LangChain, LlamaIndex, RAG
            pipelines, and orchestration flows. No HTML cleanup steps, no custom
            parsers, no transformation overhead.
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
            Skip custom scrapers, HTML cleanup jobs, and brittle parsing layers.
            One API call extracts clean markdown from any URL — no target-site
            setup, no maintenance as the web changes.
          </Text>
        </Flex>
      }
    />
  </Container>
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
              Microlink Markdown is an extraction API that takes any URL and
              returns clean markdown content ready for AI workflows.
            </div>
            <div>
              Use it for crawling, summarization, and RAG ingestion where clean
              text beats noisy HTML.
            </div>
          </>
        )
      },
      {
        question: 'Why do AI agents prefer markdown over HTML?',
        answer: (
          <>
            <div>
              Markdown's explicit structure lets AI models focus on meaning, not
              markup, which improves comprehension and reduces LLM API costs at
              scale. Avoid handling HTML noise and focus on the content.
            </div>
          </>
        )
      },
      {
        question: 'How much do I save on tokens by converting to markdown?',
        answer: (
          <>
            <div>
              On average, markdown reduces token usage by 80% compared to raw
              HTML. A page costing 20,000 tokens as HTML costs around 4,000
              tokens as markdown. Giving you 5x more content per context window.
            </div>
            <div>
              This directly lowers your LLM API costs and increases how much
              information you can process per request.
            </div>
          </>
        )
      },
      {
        question: 'Does it work on any website?',
        answer: (
          <>
            <div>
              Yes. Microlink extracts markdown from any public URL. The target
              website does not need to natively serve markdown or have any
              special CDN or server-level configuration.
            </div>
            <div>
              Unlike solutions that require opt-in at the infrastructure layer,
              Microlink works on the entire web immediately.
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
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [isFetching, setIsFetching] = useState(false)
  const [warning, setWarning] = useState(null)
  const warningId = useRef(0)
  const mountedQuery = isMounted ? query : undefined
  const {
    iconQuery,
    inputUrl,
    isValidInputUrl,
    normalizedInputUrl,
    setInputUrl
  } = useUrlInput(mountedQuery?.url)
  const targetUrl = useMemo(
    () => normalizeUrl(mountedQuery?.url),
    [mountedQuery?.url]
  )
  const hasValidTargetUrl = useMemo(
    () => hasDomainLikeHostname(targetUrl),
    [targetUrl]
  )

  const interactiveMqlCode = useMemo(() => {
    if (!hasValidTargetUrl) return {}
    return {
      url: targetUrl,
      force: true,
      data: {
        markdown: {
          attr: 'markdown'
        }
      },
      embed: 'markdown',
      meta: false
    }
  }, [hasValidTargetUrl, targetUrl])
  const snippetText = useMemo(
    () =>
      `curl https://markdown.microlink.io/${targetUrl || DEFAULT_URL}`[
        targetUrl
      ]
  )

  useEffect(() => {
    if (!mountedQuery?.url) {
      setIsFetching(false)
      return
    }
    const normalizedMountedUrl = normalizeUrl(mountedQuery.url)
    setIsFetching(hasDomainLikeHostname(normalizedMountedUrl))
  }, [mountedQuery?.url])

  return (
    <Layout>
      {warning && <Notification.Warning key={warning.id} {...warning} />}
      <Box css={theme({ bg: 'white', color: 'black', minHeight: '100%' })}>
        <Flex
          as='section'
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            px: [4, 4, 0, 0],
            maxWidth: ['100%', layout.large],
            mx: 'auto',
            pb: [5, 5, 6, 6]
          })}
        >
          <Heading css={theme({ fontSize: [3, 4] })}>
            Structured Markdown <LineBreak breakpoints={[0, 1]} /> built for
            Agents
          </Heading>

          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            Convert any URL to clean markdown with 80% fewer tokens than raw
            HTML. Built for AI agent crawling, LLM ingestion, and RAG pipelines
            without parsers or custom scrapers.
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
                setWarning(null)
                if (isValidInputUrl) {
                  if (normalizedInputUrl !== targetUrl) setIsFetching(true)
                  setQuery({ url: inputUrl.trim() })
                  return
                }
                warningId.current += 1
                setWarning({
                  id: warningId.current,
                  children: 'The URL value is not valid'
                })
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
                  value={inputUrl}
                  onChange={event => setInputUrl(event.target.value)}
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
            autoExecute={hasValidTargetUrl}
            onLoadingChange={setIsFetching}
            bodyPreviewOnly
            height={350}
            css={theme({
              mt: 3,
              width: [`calc(100vw - ${space[4]})`, layout.small]
            })}
          />
          <Box css={theme({ pt: 4, width: '100%', maxWidth: layout.small })}>
            <Tooltip
              type='copy'
              tooltipsOpts={Tooltip.TEXT.OPTIONS}
              content={
                <Tooltip.Content>{Tooltip.TEXT.COPY('cURL')}</Tooltip.Content>
              }
            >
              <Input
                readOnly
                onClick={event => {
                  event.target.select()
                  toClipboard({
                    copy: snippetText,
                    text: Tooltip.TEXT.COPIED('cURL')
                  })
                }}
                style={{ cursor: 'copy' }}
                css={theme({
                  fontSize: 1,
                  fontFamily: fonts.mono,
                  cursor: 'copy',
                  width: '100%',
                  color: 'black60'
                })}
                value={snippetText}
              />
            </Tooltip>
          </Box>
          <ClipboardComponent />
        </Flex>

        <Timings />

        <CodeShowcase targetUrl={targetUrl} />

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
              Convert any URL to markdown on the same API surface your team
              already uses for metadata, screenshots, and PDFs — no new
              infrastructure, no target-site setup. Start with{' '}
              <Link href='/docs/api/getting-started/overview'>
                Microlink API docs
              </Link>{' '}
              and ship in minutes.
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
    title='HTML to markdown API for AI agents'
    description='Convert any URL to clean markdown — 80% fewer tokens than raw HTML. Built for AI agent crawling, RAG pipelines, and LLM ingestion without custom parsers or brittle scrapers.'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/markdown',
        name: 'Microlink Markdown API',
        description:
          'Convert any URL into clean markdown — 80% fewer tokens than raw HTML. Purpose-built for AI agents, RAG ingestion, and LLM content processing at scale.',
        url: 'https://microlink.io/markdown',
        applicationCategory: ['DeveloperApplication', 'API'],
        keywords: [
          'markdown API',
          'HTML to markdown API',
          'URL to markdown',
          'convert URL to markdown',
          'webpage to markdown',
          'markdown for AI agents',
          'RAG ingestion',
          'AI agent content extraction',
          'LLM preprocessing',
          'LLM content ingestion',
          'token-efficient content',
          'structured markdown',
          'markdown for LLM'
        ],
        about: [
          { '@type': 'Thing', name: 'HTML to Markdown Conversion' },
          { '@type': 'Thing', name: 'Markdown Conversion API' },
          { '@type': 'Thing', name: 'AI Agent Content Processing' },
          { '@type': 'Thing', name: 'RAG Data Preparation' },
          { '@type': 'Thing', name: 'Structured Content Extraction' },
          { '@type': 'Thing', name: 'Token-Efficient LLM Content Extraction' }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': 'https://microlink.io/markdown#howto',
        name: 'How to convert any URL to markdown for AI agents',
        description:
          'Use Microlink to convert any URL to clean markdown optimized for AI agents, RAG pipelines, and LLM ingestion — no target-site setup required.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Install the MQL client or use the REST API',
            text: 'Install the Microlink Query Language (MQL) client for Node.js or call the REST API directly from any language.'
          },
          {
            '@type': 'HowToStep',
            name: 'Pass any URL with the markdown parameter',
            text: 'Send any public URL to the API with the markdown extraction parameter. Microlink fetches and processes the page automatically — no setup required on the target site.'
          },
          {
            '@type': 'HowToStep',
            name: 'Receive clean markdown',
            text: 'Get back clean, structured markdown ready for your AI agent, RAG pipeline, or LLM ingestion workflow — 80% fewer tokens than the raw HTML version, no post-processing required.'
          }
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
              text: 'Microlink Markdown is an extraction API that takes any URL and returns clean markdown content ready for AI workflows. Use it for crawling, summarization, and RAG ingestion where clean text beats noisy HTML.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why do AI agents prefer markdown over HTML?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "HTML pages are padded with navigation bars, script tags, class attributes, and styling that carry zero semantic value for AI. A typical blog post costs 20,000 tokens as HTML but only 4,000 tokens as markdown — an 80% reduction. Markdown's explicit structure lets AI models focus on meaning, not markup, which improves comprehension and reduces LLM API costs at scale."
            }
          },
          {
            '@type': 'Question',
            name: 'How much do I save on tokens by converting to markdown?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'On average, markdown reduces token usage by 80% compared to raw HTML. A page that costs 20,000 tokens as HTML costs around 4,000 tokens as markdown, giving you 5x more content per context window. This directly lowers your LLM API costs and increases the amount of information you can process per request.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Microlink work on any website without special setup?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Microlink extracts markdown from any public URL — the target website does not need to natively serve markdown or have any special CDN or server-level configuration. Unlike solutions that require opt-in at the infrastructure layer, Microlink works on the entire web immediately.'
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
