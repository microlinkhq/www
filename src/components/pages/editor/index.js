import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { fonts, theme, touchTargets } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { useLocalStorage } from 'components/hook/use-local-storage'

import FileBar from './chrome'
import {
  DEFAULT_EXAMPLE,
  DEFAULT_FILES,
  EXAMPLES,
  exampleIdForFiles
} from './examples'
import { Pane, PaneBody, PaneFooter } from './pane'
import Results from './results'
import { ENTRY_FILE, nextFileName } from './shared'
import Templates from './templates'
import { useEvaluate } from './use-evaluate'
import { readSharedFiles, writeShareQuery } from './use-share'

const MonacoEditor = lazy(() => import('./monaco-editor'))

const NEW_FILE_SOURCE = "export const name = 'helper'\n"

const Editor = () => {
  const [mounted, setMounted] = useState(false)
  const [files, setFiles] = useState(DEFAULT_FILES)
  const [activeFile, setActiveFile] = useState(ENTRY_FILE)
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const [apiKey, setApiKey] = useLocalStorage('mql-api-key', '')
  const [copyLabel, setCopyLabel] = useState('Copy')
  const editorApi = useRef(null)
  const filesRef = useRef(DEFAULT_FILES)
  const templateRef = useRef(DEFAULT_EXAMPLE.files)
  const shareEpochRef = useRef(0)

  const snapshot = useCallback(
    () => editorApi.current?.getFiles() || filesRef.current,
    []
  )

  const replaceFiles = useCallback((next, nextActive = ENTRY_FILE) => {
    filesRef.current = next
    setFiles(next)
    setActiveFile(nextActive)
  }, [])

  const commitShare = useCallback(async files => {
    const epoch = shareEpochRef.current
    return writeShareQuery(files, () => epoch === shareEpochRef.current)
  }, [])

  const onSettled = useCallback(
    nextFiles => {
      commitShare(nextFiles)
    },
    [commitShare]
  )

  const getSyntaxErrors = useCallback(async files => {
    if (!editorApi.current?.getSyntaxErrors) return []
    return editorApi.current.getSyntaxErrors(files)
  }, [])

  const { status, value, logs, http, elapsed, evaluate } = useEvaluate({
    apiKey,
    onSettled,
    getSyntaxErrors
  })

  useEffect(() => {
    let cancelled = false
    readSharedFiles().then(shared => {
      if (cancelled) return
      if (shared && shared[ENTRY_FILE]) {
        filesRef.current = shared
        templateRef.current = shared
        setFiles(shared)
        setActiveFile(ENTRY_FILE)
      }
      setMounted(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const onFileChange = useCallback((name, source) => {
    filesRef.current = { ...filesRef.current, [name]: source }
    setFiles(filesRef.current)
  }, [])

  const onRun = useCallback(() => {
    evaluate(snapshot())
  }, [evaluate, snapshot])

  const onReset = useCallback(() => {
    replaceFiles({ ...templateRef.current })
  }, [replaceFiles])

  const onAddFile = useCallback(() => {
    const current = snapshot()
    const name = nextFileName(current)
    const next = { ...current, [name]: NEW_FILE_SOURCE }
    filesRef.current = next
    setFiles(next)
    setActiveFile(name)
  }, [snapshot])

  const onCloseFile = useCallback(
    name => {
      if (name === ENTRY_FILE) return
      const current = snapshot()
      const { [name]: _removed, ...next } = current
      filesRef.current = next
      setFiles(next)
      if (activeFile === name) setActiveFile(ENTRY_FILE)
    },
    [activeFile, snapshot]
  )

  const onTemplate = useCallback(
    id => {
      const example = EXAMPLES.find(item => item.id === id)
      if (!example) return
      shareEpochRef.current += 1
      templateRef.current = example.files
      replaceFiles({ ...example.files })
      commitShare(example.files)
    },
    [commitShare, replaceFiles]
  )

  const onCopy = useCallback(async text => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyLabel('Copied')
      window.setTimeout(() => setCopyLabel('Copy'), 1500)
    } catch (_) {
      setCopyLabel('Copy')
    }
  }, [])

  useEffect(() => {
    const onKeyDown = event => {
      if (!(event.metaKey || event.ctrlKey)) return
      if (event.key === 'Enter') {
        event.preventDefault()
        onRun()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onRun])

  return (
    <Flex
      css={theme({
        flexDirection: ['column', 'column', 'row', 'row'],
        flex: 1,
        minHeight: 0,
        height: '100%',
        gap: 3
      })}
    >
      <Text
        as='h1'
        css={theme({
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        })}
      >
        Microlink Editor
      </Text>
      <Pane>
        <FileBar
          files={files}
          activeFile={activeFile}
          onSelect={setActiveFile}
          onAdd={onAddFile}
          onClose={onCloseFile}
          onReset={onReset}
          onRun={onRun}
          isRunning={status === 'running'}
        />
        <PaneBody>
          {mounted && (
            <Suspense fallback={null}>
              <MonacoEditor
                files={files}
                activeFile={activeFile}
                onFilesChange={onFileChange}
                onEvaluate={evaluate}
                onReady={api => {
                  editorApi.current = api
                }}
              />
            </Suspense>
          )}
        </PaneBody>
        <PaneFooter>
          <Templates
            open={templatesOpen}
            selectedId={exampleIdForFiles(files)}
            onToggle={setTemplatesOpen}
            onSelect={onTemplate}
          />
          <Flex css={theme({ alignItems: 'center', gap: 3, minWidth: 0 })}>
            <Box
              as='input'
              id='editor-api-key'
              type='password'
              name='api-key'
              autoComplete='off'
              spellCheck={false}
              placeholder='API key…'
              aria-label='API key'
              value={apiKey}
              onChange={event => setApiKey(event.target.value.trim())}
              css={theme({
                fontSize: 0,
                fontFamily: fonts.sans,
                color: 'black',
                bg: 'white',
                border: 1,
                borderColor: 'black10',
                borderRadius: 2,
                px: 2,
                py: 1,
                minHeight: [touchTargets.minHeight, '32px', '32px', '32px'],
                width: ['96px', '120px', '140px', '160px']
              })}
            />
          </Flex>
        </PaneFooter>
      </Pane>
      <Results
        status={status}
        value={value}
        logs={logs}
        http={http}
        elapsed={elapsed}
        onCopy={onCopy}
        copyLabel={copyLabel}
      />
    </Flex>
  )
}

export default Editor
