import If from 'components/elements/If'
import { theme } from 'theme'

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
  useAutoExecute,
  useCurrentViewText,
  useLanguageSync
} from './interactive/hooks'

const SDK_PREAMBLE_HEIGHT = 118

function MultiCodeEditorInteractive ({
  mqlCode: mqlCodeProps,
  height = 180,
  editable = false,
  autoExecute = false,
  bodyPreviewOnly = false,
  defaultResponseData,
  onLoadingChange
}) {
  const { url, ...mqlOpts } = mqlCodeProps || {}

  const codeSnippets = useMemo(
    () => (url ? mqlCode(url, mqlOpts) : {}),
    [url, mqlOpts]
  )

  const [languageIndex, setLanguageIndex] = useLocalStorage(
    'multi_code_editor_index',
    2
  )

  const availableLanguages = Object.keys(codeSnippets)
  const [language, setLanguage] = useState(
    availableLanguages[languageIndex] || ''
  )

  const currentLanguage = availableLanguages.includes(language)
    ? language
    : availableLanguages[0] || ''

  const [code, setCode] = useState(codeSnippets[currentLanguage] || '')
  const [responseData, setResponseData] = useState(defaultResponseData ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const normalizedDefaultView = bodyPreviewOnly ? 'body' : 'code'
  const [activeView, setActiveView] = useState(normalizedDefaultView)
  const [isExpanded, setIsExpanded] = useState(false)

  const [apiKey, setApiKey] = useLocalStorage('mql-api-key', '')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  const [previousDefaults, setPreviousDefaults] = useState({
    normalizedDefaultView,
    url
  })
  if (
    previousDefaults.normalizedDefaultView !== normalizedDefaultView ||
    previousDefaults.url !== url
  ) {
    setPreviousDefaults({ normalizedDefaultView, url })
    setActiveView(normalizedDefaultView)
  }

  const snippet = codeSnippets[currentLanguage] || ''
  const [previousSnippet, setPreviousSnippet] = useState(snippet)
  if (url && snippet !== previousSnippet) {
    setPreviousSnippet(snippet)
    setCode(snippet)
  }

  useLanguageSync({
    url,
    bodyPreviewOnly,
    availableLanguages,
    codeSnippets,
    setLanguage,
    setCode,
    setActiveView,
    setLanguageIndex
  })

  const parseCodeAndExecute = useExecuteRequest({
    url,
    mqlOpts,
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
      parseCodeAndExecute(apiKey).then(() => {
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
    e => {
      const newLanguage = e.target.value
      setLanguage(newLanguage)
      setCode(codeSnippets[newLanguage])
      setActiveView(bodyPreviewOnly ? 'body' : 'code')

      window.dispatchEvent(
        new CustomEvent('mql-language-change', {
          detail: { key: 'mql-code-editor-language', newValue: newLanguage }
        })
      )
    },
    [bodyPreviewOnly, codeSnippets]
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
              condition={
                showApiKeyInput ||
                !responseData?.headers['content-type'].includes('image/')
              }
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
              condition={
                showApiKeyInput ||
                !responseData?.headers['content-type'].includes('image/')
              }
              render={() => (
                <FadeOverlay $position='bottom' aria-hidden='true' />
              )}
            />
          </div>

          {!bodyPreviewOnly && activeView === 'code' && (
            <Toolbar
              currentLanguage={currentLanguage}
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
