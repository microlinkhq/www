import React, { useEffect, useMemo, useState } from 'react'
import {
  Check,
  Edit3,
  FileText,
  GitMerge,
  Hexagon,
  Image as ImageIcon,
  Search as SearchIcon,
  Target
} from 'react-feather'

import { colors, gradient, layout, theme, transition } from 'theme'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import List from 'components/patterns/List/List'
import ArrowLink from 'components/patterns/ArrowLink'

import GOOGLE_VERTICAL_EXAMPLES_DATA from 'helpers/google-examples'
import {
  FAQ_ENTRIES,
  GOOGLE_VERTICALS,
  GOOGLE_VERTICAL_EXAMPLES,
  GUIDE_URL,
  HERO_IMAGE,
  PACKAGE_URL,
  STRUCTURED_DATA,
  SUPPORTED_GOOGLE_SERVICES
} from 'helpers/search-landing'

import {
  createTablistKeyHandler,
  getVerticalExampleOptions,
  getVerticalPreviewResult,
  parseJsonPayload
} from 'components/pages/search/utils'

import {
  ActionRow,
  HeroResultBrand,
  PricingCard,
  TutorialTimeline,
  VerticalExampleGrid,
  VerticalExampleOption,
  VerticalExampleOptionIcon,
  VerticalExamplePanel,
  VerticalExampleShell,
  VerticalOutputTab,
  VerticalPreviewContent,
  VerticalResultList,
  VerticalTabButton
} from 'components/pages/search'

import { HeroResultCard } from 'components/pages/search/ResultCards'

import {
  PricingCheck,
  RetrievalFeatureCard,
  SectionCaption,
  TutorialStep
} from 'components/pages/search/Sections'

const HERO_LAYOUT_MAX_WIDTH = [
  '100%',
  '100%',
  '100%',
  `calc(${layout.large} * 1.7)`
]

const VERTICAL_RESPONSE_HEIGHT = '100%'

const VERTICAL_OUTPUT_TABS = [
  { id: 'json', label: 'JSON' },
  { id: 'preview', label: 'Preview' }
]

const heroProofListItemCss = theme({
  m: 0,
  mb: 0,
  color: 'black80',
  fontSize: [1, 1, 2, 2],
  textAlign: 'left',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
})

const HERO_PROOF_POINTS = [
  '10 Google surfaces — Search, News, Maps, Shopping, Scholar, and more.',
  'Structured JSON with optional Markdown and HTML for any result.',
  'Managed proxies and regional routing on every request.',
  'Pagination, geolocation, and time filters built in.'
]

const INTEGRATION_TUTORIAL_STEPS = [
  {
    step: '1',
    title: 'Install and initialize',
    icon: Target,
    description:
      'Install @microlink/google and initialize with your API key. One client handles every Google surface.',
    panel: {
      type: 'code',
      language: 'bash',
      content: 'npm i @microlink/google'
    }
  },
  {
    step: '2',
    title: 'Run the first query',
    icon: Hexagon,
    description:
      'Pass a query and pick a surface with the type option. The response shape stays the same across search, news, images, maps, and more.',
    panel: {
      type: 'code',
      language: 'javascript',
      content: `
      const google = require('@microlink/google')({
        apiKey: process.env.MICROLINK_API_KEY
      })

      const page = await google('ai agents', {
  type: 'search'
})

console.log(page.results)`
    }
  },
  {
    step: '3',
    title: 'Paginate and enrich',
    icon: GitMerge,
    description:
      'Chain pages with .next() and fetch full markup with .html() or .markdown() only for the results that deserve deeper inspection.',
    panel: {
      type: 'features',
      items: [
        'Any surface, any locale. LLM-ready Markdown on demand.',
        'Use .next() to paginate through all result pages.',
        'Fetch .html() or .markdown() only when a workflow needs the full page.',
        'Lightweight results first, deeper content second — fewer tokens, lower cost.'
      ]
    }
  }
]

const FINAL_CTA_BADGES = [
  '10 Google surfaces in one client',
  'Managed proxies included',
  'Built for agents and retrieval pipelines'
]

const focusElement = id => {
  const el = typeof document !== 'undefined' && document.getElementById(id)
  if (el) el.focus()
}

const GooglePage = () => {
  const [activeVerticalId, setActiveVerticalId] = useState(
    GOOGLE_VERTICALS[0].id
  )
  const [activeVerticalExampleIndex, setActiveVerticalExampleIndex] =
    useState(0)
  const [activeOutputTab, setActiveOutputTab] = useState('json')

  const activeVertical =
    GOOGLE_VERTICALS.find(vertical => vertical.id === activeVerticalId) ??
    GOOGLE_VERTICALS[0]

  const activeVerticalService =
    SUPPORTED_GOOGLE_SERVICES.find(
      service => service.id === activeVertical.id
    ) ?? null

  const baseVerticalExample = useMemo(
    () =>
      GOOGLE_VERTICAL_EXAMPLES_DATA[activeVertical.id] ??
      GOOGLE_VERTICAL_EXAMPLES[activeVertical.id] ?? { code: '', payload: '' },
    [activeVertical.id]
  )

  const activeVerticalExamples = useMemo(
    () => getVerticalExampleOptions(activeVertical.id, baseVerticalExample),
    [activeVertical.id, baseVerticalExample]
  )

  const activeVerticalExample = activeVerticalExamples[
    activeVerticalExampleIndex
  ] ??
    activeVerticalExamples[0] ?? { code: '', payload: '' }

  const activeVerticalPayload = useMemo(
    () => parseJsonPayload(activeVerticalExample.payload),
    [activeVerticalExample.payload]
  )

  const activeVerticalPreview = useMemo(
    () => getVerticalPreviewResult(activeVertical.id, activeVerticalPayload),
    [activeVertical.id, activeVerticalPayload]
  )

  useEffect(() => {
    setActiveOutputTab('json')
    setActiveVerticalExampleIndex(0)
  }, [activeVerticalId])

  const handleVerticalTabKeyDown = useMemo(
    () =>
      createTablistKeyHandler({
        items: GOOGLE_VERTICALS,
        onSelect: setActiveVerticalId,
        focusTab: id => focusElement(`google-vertical-chip-${id}`)
      }),
    []
  )

  const handleOutputTabKeyDown = useMemo(
    () =>
      createTablistKeyHandler({
        items: VERTICAL_OUTPUT_TABS,
        onSelect: setActiveOutputTab,
        focusTab: id => focusElement(`vertical-output-tab-${id}`)
      }),
    []
  )

  return (
    <Layout>
      <Container
        as='section'
        id='google-verticals'
        css={theme({ pt: 0, maxWidth: HERO_LAYOUT_MAX_WIDTH })}
      >
        <Box css={theme({ width: '100%', mx: 'auto' })}>
          <Box
            css={theme({
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              mx: 'auto'
            })}
          >
            <Text
              as='h2'
              css={theme({
                m: 0,
                color: 'black',
                fontWeight: 'bold',
                letterSpacing: 1,
                lineHeight: [1, 1, 0, 0],
                fontSize: [4, 4, 5, 5],
                textAlign: 'center'
              })}
            >
              Google as an API <br />
              <span
                style={{
                  background: gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                for AI agents
              </span>
            </Text>
            <Text
              as='p'
              css={theme({
                m: 0,
                mt: 3,
                maxWidth: '100%',
                mx: 'auto',
                color: 'black80',
                fontSize: [2, 2, 3, 3],
                lineHeight: 2,
                textAlign: 'center'
              })}
            >
              One client for Search, News, Maps, Shopping, and Scholar.
              Structured output your agents can consume without parsing HTML.
            </Text>
          </Box>

          <Box id='playground' as='section' css={theme({ mt: [4, 4, 5, 5] })}>
            <VerticalExampleShell $accentColor={activeVertical.accentColor}>
              <Flex
                role='tablist'
                aria-label='Supported search surfaces'
                css={theme({
                  flexWrap: 'nowrap',
                  alignItems: 'stretch',
                  justifyContent: [
                    'flex-start',
                    'flex-start',
                    'center',
                    'center'
                  ],
                  gap: [1, 1, 2, 2],
                  width: '100%',
                  overflowX: 'auto',
                  overflowY: 'hidden'
                })}
              >
                {GOOGLE_VERTICALS.map((vertical, index) => {
                  const verticalService = SUPPORTED_GOOGLE_SERVICES.find(
                    service => service.id === vertical.id
                  )

                  return (
                    <VerticalTabButton
                      key={vertical.id}
                      id={`google-vertical-chip-${vertical.id}`}
                      type='button'
                      $active={activeVertical.id === vertical.id}
                      $activeColor={vertical.accentColor}
                      aria-pressed={activeVertical.id === vertical.id}
                      onClick={() => setActiveVerticalId(vertical.id)}
                      onKeyDown={event =>
                        handleVerticalTabKeyDown(event, index)
                      }
                    >
                      {verticalService && (
                        <Box
                          as='img'
                          src={verticalService.iconUrl}
                          alt=''
                          aria-hidden='true'
                          css={theme({
                            width: '14px',
                            height: '14px',
                            flexShrink: 0
                          })}
                        />
                      )}
                      {vertical.name}
                    </VerticalTabButton>
                  )
                })}
              </Flex>

              <VerticalExampleGrid>
                <VerticalExamplePanel
                  css={theme({
                    alignSelf: 'flex-start',
                    minHeight: 0,
                    height: 'auto',
                    justifyContent: 'flex-start',
                    border: 1,
                    borderColor: 'black10'
                  })}
                >
                  <Box
                    css={theme({
                      px: [3, 3, 4, 4],
                      py: [3, 3, 4, 4],
                      borderBottom: 1,
                      borderBottomColor: 'black10'
                    })}
                  >
                    <Flex css={theme({ alignItems: 'flex-start', gap: 3 })}>
                      {activeVerticalService && (
                        <HeroResultBrand $size='64px'>
                          <Box
                            as='img'
                            src={activeVerticalService.iconUrl}
                            alt=''
                            aria-hidden='true'
                          />
                        </HeroResultBrand>
                      )}
                      <Box css={theme({ minWidth: 0 })}>
                        <Text
                          as='h4'
                          css={theme({
                            m: 0,
                            color: 'black',
                            fontSize: [2, 2, 3, 3],
                            fontWeight: 'bold',
                            lineHeight: 1
                          })}
                        >
                          {activeVerticalService?.label ?? activeVertical.name}
                        </Text>
                        <Text
                          as='p'
                          css={theme({
                            m: 0,
                            mt: 2,
                            color: 'black70',
                            fontSize: [1, 1, 2, 2],
                            lineHeight: 2
                          })}
                        >
                          Found results for "{activeVerticalExample.label}" with
                          structured data, ready for your workflow.
                        </Text>
                      </Box>
                    </Flex>
                  </Box>

                  <Box
                    css={theme({
                      px: [3, 3, 4, 4],
                      minWidth: 0,
                      flex: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      minHeight: 0
                    })}
                  >
                    <VerticalResultList>
                      {activeVerticalExamples.map((example, index) => {
                        const isActive = index === activeVerticalExampleIndex

                        return (
                          <Box as='li' key={example.id}>
                            <VerticalExampleOption
                              type='button'
                              $active={isActive}
                              aria-pressed={isActive}
                              onClick={() =>
                                setActiveVerticalExampleIndex(index)
                              }
                            >
                              <VerticalExampleOptionIcon
                                $active={isActive}
                                aria-hidden='true'
                              >
                                <Edit3 />
                              </VerticalExampleOptionIcon>
                              <Box css={theme({ minWidth: 0, pt: 1 })}>
                                <Text
                                  as='p'
                                  css={theme({
                                    m: 0,
                                    color: isActive ? 'link' : 'black70',
                                    fontSize: [1, 1, 2, 2],
                                    fontWeight: 'bold',
                                    lineHeight: 1
                                  })}
                                >
                                  {example.label}
                                </Text>
                                <Text
                                  as='p'
                                  css={theme({
                                    m: 0,
                                    mt: 2,
                                    color: 'black70',
                                    fontSize: [0, 0, 1, 1],
                                    lineHeight: 2
                                  })}
                                >
                                  {example.description}
                                </Text>
                              </Box>
                            </VerticalExampleOption>
                          </Box>
                        )
                      })}
                    </VerticalResultList>
                  </Box>
                </VerticalExamplePanel>

                <Box
                  css={theme({
                    alignSelf: 'stretch',
                    minHeight: 0,
                    height: VERTICAL_RESPONSE_HEIGHT,
                    maxHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    overflow: 'hidden'
                  })}
                >
                  <VerticalExamplePanel
                    css={theme({
                      border: 1,
                      borderColor: 'black10',
                      height: ['160px', '160px', '180px', '190px'],
                      flexShrink: 0
                    })}
                  >
                    <Box
                      id='vertical-output-panel-code'
                      role='tabpanel'
                      aria-label='Code example'
                      css={theme({
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: 0,
                        height: '100%',
                        py: 3
                      })}
                    >
                      <CodeEditor
                        language='javascript'
                        showFade={false}
                        showHeader={false}
                        showWindowButtons={false}
                        showTitle={false}
                        showAction={false}
                        css={theme({
                          width: '100%',
                          height: '100%',
                          minHeight: 0,
                          flex: 1,
                          border: 0,
                          borderRadius: 0,
                          pt: 1
                        })}
                      >
                        {activeVerticalExample.code}
                      </CodeEditor>
                    </Box>
                  </VerticalExamplePanel>

                  <VerticalExamplePanel
                    css={theme({
                      border: 1,
                      borderColor: 'black10',
                      flex: 1,
                      minHeight: 0,
                      overflow: 'hidden'
                    })}
                  >
                    <Flex
                      role='tablist'
                      aria-label='Output format'
                      css={theme({
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 2,
                        bg: 'transparent',
                        borderBottom: 1,
                        borderBottomColor: 'black10',
                        px: [3, 3, 4, 4],
                        py: 3,
                        flexShrink: 0
                      })}
                    >
                      {VERTICAL_OUTPUT_TABS.map((tab, index) => {
                        const isActive = activeOutputTab === tab.id
                        return (
                          <VerticalOutputTab
                            key={tab.id}
                            id={`vertical-output-tab-${tab.id}`}
                            type='button'
                            role='tab'
                            $active={isActive}
                            aria-selected={isActive}
                            aria-controls={`vertical-output-panel-${tab.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveOutputTab(tab.id)}
                            onKeyDown={event =>
                              handleOutputTabKeyDown(event, index)
                            }
                          >
                            {tab.label}
                          </VerticalOutputTab>
                        )
                      })}
                    </Flex>

                    {activeOutputTab === 'json' && (
                      <Box
                        id='vertical-output-panel-json'
                        role='tabpanel'
                        aria-labelledby='vertical-output-tab-json'
                        css={theme({
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          minHeight: 0,
                          height: 0,
                          overflow: 'hidden',
                          py: [2, 2, 3, 3]
                        })}
                      >
                        <CodeEditor
                          language='json'
                          showFade={false}
                          showHeader={false}
                          showWindowButtons={false}
                          showTitle={false}
                          showAction={false}
                          css={theme({
                            width: '100%',
                            height: '100%',
                            minHeight: 0,
                            flex: 1,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            border: 0,
                            borderRadius: 0,
                            pt: 2
                          })}
                        >
                          {JSON.stringify(activeVerticalPayload, null, 2)}
                        </CodeEditor>
                      </Box>
                    )}

                    {activeOutputTab === 'preview' && (
                      <Box
                        id='vertical-output-panel-preview'
                        role='tabpanel'
                        aria-labelledby='vertical-output-tab-preview'
                        css={theme({
                          bg: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          height: 0,
                          minHeight: 0,
                          flex: 1,
                          minWidth: 0,
                          overflowY: 'auto',
                          overflowX: 'hidden'
                        })}
                      >
                        <VerticalPreviewContent>
                          <Box
                            css={theme({
                              px: [3, 3, 4, 4],
                              bg: 'white',
                              overflow: 'hidden'
                            })}
                          >
                            <HeroResultCard result={activeVerticalPreview} />
                          </Box>
                        </VerticalPreviewContent>
                      </Box>
                    )}
                  </VerticalExamplePanel>
                </Box>
              </VerticalExampleGrid>
            </VerticalExampleShell>
          </Box>

          <Box id='features' as='section' css={theme({ pt: [4, 4, 5, 5] })}>
            <Box
              as='ul'
              css={theme({
                listStyle: 'none',
                p: 0,
                m: 0,
                mt: 4,
                width: 'max-content',
                maxWidth: '100%',
                mx: 'auto'
              })}
            >
              {HERO_PROOF_POINTS.map((point, index) => (
                <List.Item
                  key={point}
                  css={heroProofListItemCss}
                  $isLast={index === HERO_PROOF_POINTS.length - 1}
                >
                  {point}
                </List.Item>
              ))}
            </Box>
          </Box>

          <Flex id='cta' css={theme({ justifyContent: 'center' })}>
            <ActionRow
              css={theme({
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <Button as='a' href='/pricing'>
                Get the API keys
              </Button>
              <ArrowLink
                href={GUIDE_URL}
                css={theme({ fontSize: [1, 1, 2, 2] })}
              >
                View docs
              </ArrowLink>
            </ActionRow>
          </Flex>
        </Box>
      </Container>

      <Box
        as='section'
        id='retrieval-workflows'
        css={theme({ bg: 'white', py: 7 })}
      >
        <Container
          css={theme({
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ],
            pt: 0,
            px: [3, 3, 0, 0]
          })}
        >
          <Flex
            css={theme({
              width: '100%',
              maxWidth: [
                '100%',
                '100%',
                layout.large,
                `calc(${layout.large} * 1.63)`
              ],
              mx: 'auto',
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['stretch', 'stretch', 'center', 'center']
            })}
          >
            <Box
              css={theme({
                width: ['100%', '100%', '42%', '42%'],
                flexShrink: 0,
                pt: [0, 0, 2, 2]
              })}
            >
              <SectionCaption color={colors.red7}>
                Built for agentic workflows
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: [1, 1, 0, 0],
                  fontSize: [3, 4, 4, 4],
                  textAlign: 'left'
                })}
              >
                Search first, <br />
                <span css={theme({ color: 'red7' })}>fetch later</span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: ['100%', '100%', layout.small, layout.small]
                })}
              >
                Start with lightweight results. Expand into full HTML or
                Markdown only when your workflow needs deeper context.
              </Text>
            </Box>

            <Box
              css={theme({
                width: ['100%', '100%', '58%', '58%'],
                display: 'grid',
                ml: 6,
                gap: 4
              })}
            >
              <RetrievalFeatureCard
                icon='markdown'
                accent='blue'
                title='Ship LLM-ready Markdown'
                css={theme({ pb: 4 })}
                description='Every result can return its full page as clean Markdown or HTML. No extra parsing, no fragile selectors.'
              />
              <RetrievalFeatureCard
                icon='bolt'
                accent='blue'
                title='Lazy-load the web'
                css={theme({ pb: 4 })}
                description='Get structured results first, then fetch full-page content only for the URLs that matter. Your agent stays fast and your token budget stays low.'
              />
              <RetrievalFeatureCard
                icon='search'
                accent='teal'
                title='Turn Search into a document discovery engine'
                css={theme({ pb: 0 })}
                description={
                  <>
                    Use Google operators like <code>site:</code>,{' '}
                    <code>intitle:</code>, and <code>filetype:</code> to find
                    papers, docs, changelogs, and PDFs across the open web.
                  </>
                }
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        as='section'
        id='pricing'
        css={theme({
          bg: 'orange0',
          py: 6,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'orange5'
        })}
      >
        <Container
          css={theme({
            py: 0,
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ]
          })}
        >
          <Flex
            css={theme({
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['center', 'center', 'flex-start', 'flex-start'],
              width: '100%'
            })}
          >
            <Box
              css={theme({
                width: ['100%', '100%', '48%', '48%'],
                flexShrink: 0
              })}
            >
              <SectionCaption color={colors.orange7}>
                Simple, predictable pricing
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: [1, 1, 0, 0],
                  fontSize: [3, 4, 4, 4],
                  textAlign: 'left'
                })}
              >
                One dollar,
                <br />
                <span css={theme({ color: 'orange7' })}>
                  one thousand requests
                </span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: layout.small
                })}
              >
                Every request runs through managed proxies with regional
                routing. That infrastructure is included from the first call —
                no free tier, no surprises at scale.
              </Text>
            </Box>

            <PricingCard as='section'>
              <Text
                as='h3'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: [2, 2, 3, 3]
                })}
              >
                Pro
              </Text>

              <Flex css={theme({ alignItems: 'baseline' })}>
                <Text
                  css={theme({
                    color: 'black',
                    fontSize: [4, 4, 5, 5],
                    fontWeight: 'bold',
                    lineHeight: 0,
                    mb: 2
                  })}
                >
                  $39
                </Text>
                <Text
                  css={theme({
                    m: 0,
                    color: 'black60',
                    fontSize: [0, 0, 1, 1]
                  })}
                >
                  /month
                </Text>
              </Flex>

              <Text
                css={theme({
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 1
                })}
              >
                40,000 requests/month included
              </Text>

              <Box css={theme({ py: 4 })}>
                <PricingCheck>Managed proxy-backed requests</PricingCheck>
                <PricingCheck>10 requests saved as snippets</PricingCheck>
                <PricingCheck>Structured normalized results</PricingCheck>
                <PricingCheck>Location and geocode controls</PricingCheck>
                <PricingCheck>
                  Pagination with <code>next()</code>
                </PricingCheck>
                <PricingCheck>
                  Optional plugins: Markdown or HTML via{' '}
                  <code>microlink/html</code> and <code>microlink/md</code>
                </PricingCheck>
              </Box>

              <Flex
                css={theme({
                  color: 'orange7',
                  fontSize: ['18px', '18px', '20px', '20px']
                })}
              >
                <ArrowLink
                  href='/pricing'
                  css={theme({
                    fontWeight: 'bold'
                  })}
                >
                  See all plans
                </ArrowLink>
              </Flex>
            </PricingCard>
          </Flex>
        </Container>
      </Box>

      <Box
        as='section'
        id='google-api-integration'
        css={theme({ bg: 'white', py: 5 })}
      >
        <Container
          css={theme({
            p: 0,
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ]
          })}
        >
          <Flex
            css={theme({
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['center', 'center', 'flex-start', 'flex-start'],
              width: '100%'
            })}
          >
            <Box
              css={theme({
                width: ['100%', '100%', '48%', '48%'],
                flexShrink: 0
              })}
            >
              <SectionCaption color={colors.green7}>Get started</SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: [1, 1, 0, 0],
                  fontSize: [3, 3, '36px', '36px'],
                  textAlign: 'left'
                })}
              >
                Three steps to
                <br />
                <span css={theme({ color: 'green7' })}>your first search</span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: layout.small
                })}
              >
                Install the package, pick a Google surface, and start getting
                structured results. Paginate or enrich only when you need more.
              </Text>
            </Box>

            <Box
              css={theme({
                width: ['100%', '100%', '52%', '52%'],
                minWidth: 0
              })}
            >
              <TutorialTimeline>
                {INTEGRATION_TUTORIAL_STEPS.map(step => (
                  <TutorialStep key={step.step} step={step} />
                ))}
              </TutorialTimeline>

              <ActionRow
                css={theme({
                  mt: [4, 4, 5, 5],
                  ml: [0, 0, '104px', '104px'],
                  justifyContent: 'flex-start'
                })}
              >
                <Button as='a' href={PACKAGE_URL}>
                  Install @microlink/google
                </Button>
                <ArrowLink href={GUIDE_URL}>Read the guide</ArrowLink>
              </ActionRow>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        as='section'
        id='final-cta'
        css={theme({
          bg: 'blue0',
          py: [5, 5, 6, 7]
        })}
      >
        <Container
          css={theme({
            px: 0,
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ]
          })}
        >
          <Box
            css={theme({
              display: 'grid',
              gridTemplateColumns: [
                '1fr',
                '1fr',
                'minmax(0, 44fr) minmax(0, 56fr)',
                'minmax(0, 44fr) minmax(0, 56fr)'
              ],
              alignItems: 'center',
              columnGap: [0, 0, 5, 6],
              rowGap: [5, 5, 0, 0],
              width: '100%'
            })}
          >
            <Box
              css={theme({
                width: '100%',
                minWidth: 0,
                maxWidth: ['100%', '100%', layout.small, layout.small]
              })}
            >
              <SectionCaption bg='blue0' color={colors.blue6}>
                Connect everything
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: 1,
                  fontSize: [4, 4, '42px', '42px'],
                  textAlign: 'left'
                })}
              >
                Plug <span css={theme({ color: 'blue6' })}>Microlink</span>
                <br />
                <span css={theme({ whiteSpace: 'nowrap' })}>
                  into your workflow
                </span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: layout.small
                })}
              >
                Use <Link href='/search'>Search</Link> to find URLs. Use{' '}
                <Link href='/metadata'>Metadata</Link>,{' '}
                <Link href='/screenshot'>Screenshot</Link>, or{' '}
                <Link href='/markdown'>Markdown</Link> to extract what is on
                them. Same API key, same plan.
              </Text>
              <Flex css={theme({ mt: [4, 4, 5, 5] })}>
                <ArrowLink
                  href='/pricing'
                  css={theme({
                    color: 'blue6',
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2]
                  })}
                >
                  See all plans
                </ArrowLink>
              </Flex>
            </Box>

            <Box css={theme({ width: '100%', minWidth: 0, maxWidth: '100%' })}>
              <Box
                css={theme({
                  display: 'grid',
                  gridTemplateColumns: [
                    'repeat(2, minmax(0, 1fr))',
                    'repeat(2, minmax(0, 1fr))',
                    'repeat(4, minmax(0, 1fr))',
                    'repeat(4, minmax(0, 1fr))'
                  ],
                  alignItems: 'stretch',
                  gap: [3, 3, 2, 3],
                  width: '100%',
                  maxWidth: '100%'
                })}
              >
                {[
                  {
                    label: 'Search',
                    href: '/search',
                    icon: <SearchIcon size={58} strokeWidth={2} aria-hidden='true' />
                  },
                  {
                    label: 'Metadata',
                    href: '/metadata',
                    icon: <FileText size={54} strokeWidth={2} aria-hidden='true' />
                  },
                  {
                    label: 'Screenshot',
                    href: '/screenshot',
                    icon: <ImageIcon size={54} strokeWidth={2} aria-hidden='true' />
                  },
                  {
                    label: 'Markdown',
                    href: '/markdown',
                    icon: (
                      <Text
                        as='span'
                        css={theme({
                          m: 0,
                          color: 'blue6',
                          fontWeight: 'bold',
                          fontSize: [4, 4, 4, 4],
                          fontFamily: 'mono',
                          lineHeight: 1,
                          border: 2,
                          borderColor: 'blue6',
                          borderRadius: 2,
                          px: 2,
                          py: 1
                        })}
                      >
                        M↓
                      </Text>
                    )
                  }
                ].map(product => (
                  <Box
                    as='a'
                    key={product.label}
                    href={product.href}
                    css={theme({
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      width: '100%',
                      minWidth: 0,
                      height: ['170px', '170px', '170px', '180px'],
                      borderRadius: 4,
                      bg: 'white',
                      border: 0,
                      boxShadow: `0 4px 12px ${colors.black05}`,
                      textDecoration: 'none',
                      color: 'black',
                      transition: `box-shadow ${transition.short}`,
                      '&:hover': {
                        boxShadow: `0 8px 24px ${colors.black10}`
                      },
                      '&:focus-visible': {
                        outline: `2px solid ${colors.blue6}`,
                        outlineOffset: '2px'
                      }
                    })}
                  >
                    <Box
                      css={theme({
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'blue6',
                        minHeight: '72px'
                      })}
                    >
                      {product.icon}
                    </Box>
                    <Text
                      as='span'
                      css={theme({
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: [1, 1, 2, 2],
                        lineHeight: 1
                      })}
                    >
                      {product.label}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Faq
        title='Product Information'
        caption='Everything you need to know about Microlink Search, pricing, and supported surfaces.'
        css={theme({ mt: [5, 5, 6, 6], bg: 'white' })}
        questions={FAQ_ENTRIES.map(({ question, answers }) => ({
          question,
          answer: (
            <>
              {answers.map((answer, index) => (
                <div key={`${question}-${index}`}>{answer}</div>
              ))}
            </>
          )
        }))}
      />

      <Flex
        css={theme({
          py: [4, 4, 5, 5],
          gap: [3, 3, 5, 5],
          flexWrap: 'wrap',
          justifyContent: 'center',
          borderTop: 1,
          borderTopColor: 'black05'
        })}
      >
        {FINAL_CTA_BADGES.map(label => (
          <Flex
            key={label}
            css={theme({
              alignItems: 'center',
              gap: 2,
              color: 'black80',
              fontSize: [0, 0, 1, 1]
            })}
          >
            <Check size={14} color={colors.black60} aria-hidden='true' />
            <Text as='span'>{label}</Text>
          </Flex>
        ))}
      </Flex>
      <Container
        css={theme({
          justifyContent: 'center',
          pt: [3, 3, 4, 4],
          maxWidth: layout.small
        })}
      >
        <Text
          as='p'
          css={theme({
            m: 0,
            color: 'black60',
            fontSize: [0, 0, 1, 1],
            lineHeight: 2,
            textAlign: 'center'
          })}
        >
          Google is a trademark of Google LLC. Microlink Search is an
          independent product and is not affiliated with or endorsed by Google.
        </Text>
      </Container>
    </Layout>
  )
}

export const Head = () => (
  <Meta
    title='Google Search API for AI Agents and LLM Workflows'
    description='Query Google Search, News, Maps, Shopping, and Scholar from one client. Get structured JSON your agents can use without parsing HTML.'
    image={HERO_IMAGE}
    structured={STRUCTURED_DATA}
  />
)

export default GooglePage
