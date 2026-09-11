import { useCallback, useRef, useState } from 'react'

import { ENTRY_FILE } from './shared'
import { formatSyntaxError } from './syntax-errors'
import { serializeError, withScript } from './with-script'

export const useEvaluate = ({ apiKey, onSettled, getSyntaxErrors } = {}) => {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState(null)
  const [logs, setLogs] = useState(null)
  const [http, setHttp] = useState(null)
  const [elapsed, setElapsed] = useState(null)
  const runningRef = useRef(false)

  const evaluate = useCallback(
    async files => {
      if (runningRef.current) return
      runningRef.current = true
      setStatus('running')
      const started = performance.now()
      try {
        const syntaxErrors = await getSyntaxErrors?.(files)
        if (syntaxErrors?.length) {
          setValue(serializeError(formatSyntaxError(syntaxErrors)))
          setLogs({})
          setHttp(null)
          setElapsed(Math.round(performance.now() - started))
          setStatus('error')
          return
        }
        const result = await withScript(files, {
          apiKey,
          entry: ENTRY_FILE
        })
        setValue(result.value)
        setLogs(result.logs)
        setHttp(result.http)
        setElapsed(Math.round(performance.now() - started))
        setStatus(result.status)
        onSettled?.(files)
      } catch (error) {
        setValue(serializeError(error))
        setLogs({})
        setHttp(null)
        setElapsed(Math.round(performance.now() - started))
        setStatus('error')
      } finally {
        runningRef.current = false
      }
    },
    [apiKey, getSyntaxErrors, onSettled]
  )

  return { status, value, logs, http, elapsed, evaluate }
}
