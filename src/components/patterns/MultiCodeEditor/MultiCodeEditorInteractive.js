import If from 'components/elements/If'
import { theme } from 'theme'

import { useCodeLanguage } from 'components/hook/use-code-language'
import { useLocalStorage } from 'components/hook/use-local-storage'
import React, { useState, useCallback, useMemo } from 'react'
import { mqlCode } from 'helpers/mql-code'

import Terminal, { TERMINAL_WIDTH } from 'components/elements/Terminal/Terminal'

import SeoCodeSnippets from './interactive/seo-code-snippets'
import TerminalActions from './interactive/terminal-actions'
import ViewNavigation from './interactive/view-navigation'
import ContentArea from './interactive/content-area'
import FadeOverlay from './interactive/fade-overlay'
import Toolbar from './interactive/toolbar'
import { useExecuteRequest } from './interactive/use-execute-request'
import {
  showResponseFade,
  useAutoExecute,
  useCurrentViewText
} from './interactive/hooks'

const SDK_PREAMBLE_HEIGHT = 118
const DEFAULT_LANGUAGE = 'JavaScript'

function MultiCodeEditorInteractive ({
  mqlCode: mqlCodeProps,
  height = 180,
  editable = false,
  autoExecute = false,
  bodyPreviewOnly = false,
  defaultResponseData,
  onLoadingChange,
  headerContent,
  showWindowButtons = true,
  showAction = true,
  contentId,
  contentRole,
  contentLabelledBy
}) {
  const { url, binding, ...mqlOpts } = mqlCodeProps || {}

  const codeSnippets = useMemo(
    () =>
      url ? mqlCode(url, { ...mqlOpts, ...(binding && { binding }) }) : {},
    [url, binding, mqlOpts]
  )

  const availableLanguages = useMemo(
    () => Object.keys(codeSnippets),
    [codeSnippets]
  )

  const [language, setLanguage] = useCodeLanguage(
    availableLanguages,
    availableLanguages.includes(DEFAULT_LANGUAGE)
      ? DEFAULT_LANGUAGE
      : availableLanguages[0] || ''
  )

  const [code, setCode] = useState(codeSnippets[language] || '')
  const [responseData, setResponseData] = useState(defaultResponseData ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const normalizedDefaultView = bodyPreviewOnly ? 'body' : 'code'
  const [activeView, setActiveView] = useState(normalizedDefaultView)
  const [isExpanded, setIsExpanded] = useState(false)

  const [apiKey, setApiKey] = useLocalStorage('mql-api-key', '')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  const requestKey = JSON.stringify(mqlCodeProps ?? null)
  const [previousDefaults, setPreviousDefaults] = useState({
    normalizedDefaultView,
    requestKey
  })
  if (
    previousDefaults.normalizedDefaultView !== normalizedDefaultView ||
    previousDefaults.requestKey !== requestKey
  ) {
    setPreviousDefaults({ normalizedDefaultView, requestKey })
    setActiveView(normalizedDefaultView)
    setResponseData(defaultResponseData ?? null)
    setIsLoading(false)
    setShowApiKeyInput(false)
    setIsExpanded(false)
  }

  const snippet = codeSnippets[language] || ''
  const [previousSnippet, setPreviousSnippet] = useState(snippet)
  if (url && snippet !== previousSnippet) {
    setPreviousSnippet(snippet)
    setCode(snippet)
  }

  const [previousLanguage, setPreviousLanguage] = useState(language)
  if (language !== previousLanguage) {
    setPreviousLanguage(language)
    setActiveView(normalizedDefaultView)
  }

  const parseCodeAndExecute = useExecuteRequest({
    url,
    mqlOpts,
    requestKey,
    onLoadingChange,
    setIsLoading,
    setResponseData,
    setShowApiKeyInput
  })

  const handleApiKeySubmit = useCallback(
    newApiKey => {
      setApiKey(newApiKey)
      setShowApiKeyInput(false)
      parseCodeAndExecute(newApiKey)
    },
    [setApiKey, parseCodeAndExecute]
  )

  const executeRequest = useCallback(() => {
    if (!isLoading) {
      parseCodeAndExecute(apiKey).then(applied => {
        if (!applied) return
        setActiveView('body')
        setIsExpanded(false)
      })
    }
  }, [isLoading, parseCodeAndExecute, apiKey])

  useAutoExecute({
    autoExecute,
    url,
    mqlOpts,
    normalizedDefaultView,
    executeRequest
  })

  const handleViewClick = useCallback(
    view => {
      if (activeView === view && !isExpanded) {
        setIsExpanded(true)
      } else if (activeView === view && isExpanded) {
        setIsExpanded(false)
      } else {
        setActiveView(view)
      }
    },
    [activeView, isExpanded]
  )

  const handleOpenInBrowser = useCallback(() => {
    const queryParams = new URLSearchParams()
    queryParams.set('url', url)
    Object.entries(mqlOpts).forEach(([key, value]) => {
      if (key === 'apiKey') return
      if (typeof value === 'object' && value !== null) {
        queryParams.set(key, JSON.stringify(value))
      } else {
        queryParams.set(key, String(value))
      }
    })
    const apiUrl = `https://api.microlink.io?${queryParams.toString()}`
    window.open(apiUrl, '_blank')
  }, [url, mqlOpts])

  const handleLanguageChange = useCallback(
    event => setLanguage(event.target.value),
    [setLanguage]
  )

  const getCurrentViewText = useCurrentViewText({
    activeView,
    code,
    responseData
  })

  const MemoizedActionComponent = useCallback(
    () =>
      bodyPreviewOnly
        ? null
        : (
          <TerminalActions
            showApiKeyInput={showApiKeyInput}
            setShowApiKeyInput={setShowApiKeyInput}
            setActiveView={setActiveView}
            handleOpenInBrowser={handleOpenInBrowser}
            getCurrentViewText={getCurrentViewText}
          />
          ),
    [bodyPreviewOnly, showApiKeyInput, handleOpenInBrowser, getCurrentViewText]
  )

  const componentHeight = isExpanded
    ? `${(height + SDK_PREAMBLE_HEIGHT) * 2}px`
    : `${height + SDK_PREAMBLE_HEIGHT}px`

  if (!url && !responseData) {
    return null
  }

  return (
    <>
      <SeoCodeSnippets
        codeSnippets={codeSnippets}
        url={url}
        mqlOpts={mqlOpts}
      />

      <div>
        <Terminal
          blinkCursor={false}
          text={getCurrentViewText()}
          ActionComponent={MemoizedActionComponent}
          headerContent={headerContent}
          showWindowButtons={showWindowButtons}
          showAction={showAction}
          contentId={contentId}
          contentRole={contentRole}
          contentLabelledBy={contentLabelledBy}
          css={theme({ width: TERMINAL_WIDTH })}
          style={{ position: 'relative' }}
          role='application'
          aria-label='Interactive code editor and API testing tool'
        >
          <div
            style={{ height: componentHeight }}
            aria-live='polite'
            aria-busy={isLoading}
          >
            <If
              condition={showResponseFade(responseData, showApiKeyInput)}
              render={() => <FadeOverlay $position='top' aria-hidden='true' />}
            />

            <ContentArea
              activeView={activeView}
              code={code}
              setCode={setCode}
              editable={editable}
              responseData={responseData}
              apiKey={apiKey}
              onApiKeySubmit={handleApiKeySubmit}
              setApiKey={setApiKey}
              showApiKeyInput={showApiKeyInput}
              language={language}
              codeSnippets={codeSnippets}
            />

            <If
              condition={showResponseFade(responseData, showApiKeyInput)}
              render={() => (
                <FadeOverlay $position='bottom' aria-hidden='true' />
              )}
            />
          </div>

          {!bodyPreviewOnly && activeView === 'code' && (
            <Toolbar
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
              onExecute={executeRequest}
              isLoading={isLoading}
              availableLanguages={availableLanguages}
            />
          )}
        </Terminal>

        {!bodyPreviewOnly && responseData && (
          <ViewNavigation
            activeView={activeView}
            onViewClick={handleViewClick}
            isExpanded={isExpanded}
            showApiKeyInput={showApiKeyInput}
          />
        )}
      </div>
    </>
  )
}

export default MultiCodeEditorInteractive
