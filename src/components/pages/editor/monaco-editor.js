import React, { useRef } from 'react'
import Monaco, { loader } from '@monaco-editor/react'

import { formatSource } from './format'
import { editorOptions, setupMonaco } from './monaco-setup'

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
  filesRef.current = files

  return (
    <Monaco
      path={activeFile}
      language='javascript'
      value={files[activeFile] || ''}
      theme='microlink'
      options={editorOptions}
      loading={null}
      beforeMount={setupMonaco}
      onChange={value => onFilesChange(activeFile, value ?? '')}
      onMount={(editor, monaco) => {
        onReady?.({
          getFiles: () => filesRef.current
        })
        editor.addAction({
          id: 'run-prettier',
          label: 'Format with Prettier',
          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
          run: async current => {
            current.setValue(await formatSource(current.getValue()))
          }
        })
        editor.addAction({
          id: 'run-code',
          label: 'Run editor code',
          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
          run: () => onEvaluate(filesRef.current)
        })
      }}
    />
  )
}

export default MonacoEditor
