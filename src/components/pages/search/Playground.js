import React, { useEffect, useMemo, useState } from 'react'
import {
  Award,
  BookOpen,
  Edit3,
  FileText,
  Image as ImageIcon,
  Map,
  MapPin,
  Search,
  ShoppingBag,
  Type,
  Video
} from 'react-feather'

import { theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import GOOGLE_EXAMPLES from 'data/google-examples'
import {
  GOOGLE_VERTICALS,
  SUPPORTED_GOOGLE_SERVICES
} from 'helpers/search-landing'

import {
  createTablistKeyHandler,
  getVerticalExampleOptions,
  getVerticalPreviewResult,
  parseJsonPayload
} from './utils'

import {
  HeroResultBrand,
  VerticalExampleGrid,
  VerticalExampleOption,
  VerticalExampleOptionIcon,
  VerticalExamplePanel,
  VerticalOutputTab,
  VerticalPreviewContent,
  VerticalResultList,
  VerticalTabButton,
  VerticalExampleShell
} from './'

import VerticalTablist from './VerticalTablist'

import { HeroResultCard } from './ResultCards'

const VERTICAL_OUTPUT_TABS = [
  { id: 'json', label: 'JSON' },
  { id: 'preview', label: 'Preview' }
]

const SURFACE_ICONS = {
  search: Search,
  news: FileText,
  images: ImageIcon,
  videos: Video,
  places: MapPin,
  maps: Map,
  shopping: ShoppingBag,
  scholar: BookOpen,
  patents: Award,
  autocomplete: Type
}

const SurfaceIcon = ({ icon, size, style }) => {
  const Icon = SURFACE_ICONS[icon]
  return Icon
    ? (
      <Icon
        size={size}
        aria-hidden='true'
        style={{ display: 'block', flexShrink: 0, ...style }}
      />
      )
    : null
}

const visuallyHiddenCss = theme({
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
})

const focusElement = id => {
  const el = typeof document !== 'undefined' && document.getElementById(id)
  if (!el) return
  el.focus()
  el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

const PlaygroundExamplesPanel = ({
  activeVerticalService,
  activeSurfaceLabel,
  activeVerticalExample,
  activeVerticalExamples,
  activeVerticalExampleIndex,
  setActiveVerticalExampleIndex,
  handleExampleKeyDown
}) => (
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
            <SurfaceIcon icon={activeVerticalService.icon} size={28} />
          </HeroResultBrand>
        )}
        <Box css={theme({ minWidth: 0 })}>
          <Text
            as='h3'
            css={theme({
              m: 0,
              color: 'black',
              fontSize: [2, 2, 3, 3],
              fontWeight: 'bold',
              lineHeight: 1
            })}
          >
            {activeSurfaceLabel}
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
            Found results for "{activeVerticalExample.label}" with structured
            data, ready for your workflow.
          </Text>
        </Box>
      </Flex>
    </Box>

    <Flex
      css={theme({
        px: [3, 3, 4, 4],
        minWidth: 0,
        flex: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: 0
      })}
    >
      <VerticalResultList role='group' aria-label='Example queries'>
        {activeVerticalExamples.map((example, index) => {
          const isActive = index === activeVerticalExampleIndex

          return (
            <Box as='li' key={example.id}>
              <VerticalExampleOption
                id={`vertical-example-${example.id}`}
                type='button'
                $active={isActive}
                aria-pressed={isActive}
                onClick={() => setActiveVerticalExampleIndex(index)}
                onKeyDown={event => handleExampleKeyDown(event, index)}
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
    </Flex>
  </VerticalExamplePanel>
)

const PlaygroundOutputPanels = ({
  codeExampleLabel,
  jsonOutputLabel,
  activeVerticalExample,
  activeVerticalPayload,
  activeVerticalPreview,
  activeOutputTab,
  setActiveOutputTab,
  handleOutputTabKeyDown
}) => (
  <Flex
    css={theme({
      alignSelf: 'stretch',
      minHeight: 0,
      height: ['auto', 'auto', 'auto', '100%'],
      maxHeight: ['none', 'none', 'none', '100%'],
      flexDirection: 'column',
      gap: 3,
      overflow: 'hidden'
    })}
  >
    <VerticalExamplePanel
      css={theme({
        border: 1,
        borderColor: 'black10',
        height: ['auto', 'auto', 'auto', '190px'],
        flexShrink: 0
      })}
    >
      <Flex
        id='vertical-output-panel-code'
        aria-label={codeExampleLabel}
        css={theme({
          flexDirection: 'column',
          flex: ['none', 'none', 'none', 1],
          minHeight: 0,
          height: ['auto', 'auto', 'auto', '100%'],
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
          aria-label={codeExampleLabel}
          css={theme({
            width: '100%',
            height: ['auto', 'auto', 'auto', '100%'],
            minHeight: 0,
            flex: ['none', 'none', 'none', 1],
            border: 0,
            borderRadius: 0,
            pt: 1
          })}
        >
          {activeVerticalExample.code}
        </CodeEditor>
      </Flex>
    </VerticalExamplePanel>

    <VerticalExamplePanel
      css={theme({
        border: 1,
        borderColor: 'black10',
        flex: ['none', 'none', 'none', 1],
        minHeight: ['320px', '320px', '320px', 0],
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
              onKeyDown={event => handleOutputTabKeyDown(event, index)}
            >
              {tab.label}
            </VerticalOutputTab>
          )
        })}
      </Flex>

      {activeOutputTab === 'json' && (
        <Flex
          id='vertical-output-panel-json'
          role='tabpanel'
          aria-labelledby='vertical-output-tab-json'
          css={theme({
            flexDirection: 'column',
            flex: 1,
            minHeight: ['280px', '280px', '280px', 0],
            height: ['auto', 'auto', 'auto', 0],
            maxHeight: ['480px', '480px', '480px', 'none'],
            overflow: ['auto', 'auto', 'auto', 'hidden'],
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
            aria-label={jsonOutputLabel}
            css={theme({
              width: '100%',
              height: ['auto', 'auto', 'auto', '100%'],
              minHeight: ['240px', '240px', '240px', 0],
              flex: ['none', 'none', 'none', 1],
              overflowY: ['visible', 'visible', 'visible', 'auto'],
              overflowX: 'hidden',
              border: 0,
              borderRadius: 0,
              pt: 2
            })}
          >
            {JSON.stringify(activeVerticalPayload, null, 2)}
          </CodeEditor>
        </Flex>
      )}

      {activeOutputTab === 'preview' && (
        <Flex
          id='vertical-output-panel-preview'
          role='tabpanel'
          aria-labelledby='vertical-output-tab-preview'
          css={theme({
            flexDirection: 'column',
            height: ['auto', 'auto', 'auto', 0],
            minHeight: ['280px', '280px', '280px', 0],
            maxHeight: ['480px', '480px', '480px', 'none'],
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
                overflow: 'hidden'
              })}
            >
              <HeroResultCard result={activeVerticalPreview} />
            </Box>
          </VerticalPreviewContent>
        </Flex>
      )}
    </VerticalExamplePanel>
  </Flex>
)

const Playground = () => {
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

  const activeVerticalExamples = useMemo(
    () =>
      getVerticalExampleOptions(
        activeVertical.id,
        GOOGLE_EXAMPLES[activeVertical.id]
      ),
    [activeVertical.id]
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

  const handleExampleKeyDown = useMemo(
    () =>
      createTablistKeyHandler({
        items: activeVerticalExamples,
        onSelect: id => {
          const index = activeVerticalExamples.findIndex(
            example => example.id === id
          )
          if (index >= 0) setActiveVerticalExampleIndex(index)
        },
        focusTab: id => focusElement(`vertical-example-${id}`)
      }),
    [activeVerticalExamples]
  )

  const activeSurfaceLabel = activeVerticalService?.label ?? activeVertical.name

  const playgroundStatus = `Showing ${activeSurfaceLabel} example: ${activeVerticalExample.label}`

  const codeExampleLabel = `Example code for ${activeSurfaceLabel}: ${activeVerticalExample.label}`

  const jsonOutputLabel = `JSON response for ${activeSurfaceLabel}: ${activeVerticalExample.label}`

  return (
    <Box
      id='playground'
      as='section'
      aria-label='Google SERP API playground'
      css={theme({ mt: 4 })}
    >
      <Text aria-live='polite' aria-atomic='true' css={visuallyHiddenCss}>
        {playgroundStatus}
      </Text>
      <VerticalExampleShell $accentColor={activeVertical.accentColor}>
        <VerticalTablist aria-label='Supported search surfaces'>
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
                aria-controls='vertical-example-grid'
                onClick={() => setActiveVerticalId(vertical.id)}
                onKeyDown={event => handleVerticalTabKeyDown(event, index)}
              >
                {verticalService && (
                  <SurfaceIcon
                    icon={verticalService.icon}
                    size={14}
                    style={{ marginTop: '-1px', marginRight: '2px' }}
                  />
                )}
                {vertical.name}
              </VerticalTabButton>
            )
          })}
        </VerticalTablist>

        <VerticalExampleGrid id='vertical-example-grid'>
          <PlaygroundExamplesPanel
            activeVerticalService={activeVerticalService}
            activeSurfaceLabel={activeSurfaceLabel}
            activeVerticalExample={activeVerticalExample}
            activeVerticalExamples={activeVerticalExamples}
            activeVerticalExampleIndex={activeVerticalExampleIndex}
            setActiveVerticalExampleIndex={setActiveVerticalExampleIndex}
            handleExampleKeyDown={handleExampleKeyDown}
          />
          <PlaygroundOutputPanels
            codeExampleLabel={codeExampleLabel}
            jsonOutputLabel={jsonOutputLabel}
            activeVerticalExample={activeVerticalExample}
            activeVerticalPayload={activeVerticalPayload}
            activeVerticalPreview={activeVerticalPreview}
            activeOutputTab={activeOutputTab}
            setActiveOutputTab={setActiveOutputTab}
            handleOutputTabKeyDown={handleOutputTabKeyDown}
          />
        </VerticalExampleGrid>
      </VerticalExampleShell>
    </Box>
  )
}

export default Playground
