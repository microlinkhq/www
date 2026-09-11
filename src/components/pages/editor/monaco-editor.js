import React, { useEffect, useRef } from 'react'
import Monaco, { loader } from '@monaco-editor/react'

import { formatSource } from './format'
import { editorOptions, setupMonaco } from './monaco-setup'
import { editorLanguage } from './shared'
import { collectSyntaxErrors, ensureModels } from './syntax-errors'

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
  }
})

const MonacoEditor = ({
  files,
  activeFile,
  onFilesChange,
  onEvaluate,
  onReady
}) => {
  const filesRef = useRef(files)
  const onEvaluateRef = useRef(onEvaluate)
  const activeFileRef = useRef(activeFile)
  const monacoRef = useRef(null)

  useEffect(() => {
    filesRef.current = files
    if (monacoRef.current) ensureModels(monacoRef.current, files)
  }, [files])

  useEffect(() => {
    onEvaluateRef.current = onEvaluate
  }, [onEvaluate])

  useEffect(() => {
    activeFileRef.current = activeFile
  }, [activeFile])

  return (
    <Monaco
      path={activeFile}
      language={editorLanguage(activeFile)}
      value={files[activeFile] || ''}
      theme='microlink'
      options={editorOptions}
      loading={null}
      beforeMount={setupMonaco}
      onChange={value => {
        filesRef.current = {
          ...filesRef.current,
          [activeFile]: value ?? ''
        }
        onFilesChange(activeFile, value ?? '')
      }}
      onMount={(editor, monaco) => {
        monacoRef.current = monaco
        ensureModels(monaco, filesRef.current)
        onReady?.({
          getFiles: () => filesRef.current,
          getSyntaxErrors: nextFiles =>
            collectSyntaxErrors(monaco, nextFiles || filesRef.current)
        })
        editor.addAction({
          id: 'run-prettier',
          label: 'Format with Prettier',
          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
          run: async current => {
            current.setValue(
              await formatSource(current.getValue(), activeFileRef.current)
            )
          }
        })
        editor.addAction({
          id: 'run-code',
          label: 'Run editor code',
          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
          run: () => onEvaluateRef.current(filesRef.current)
        })
      }}
    />
  )
}

export default MonacoEditor
