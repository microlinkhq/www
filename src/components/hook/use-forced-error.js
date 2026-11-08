import { useEffect } from 'react'
import { useQueryState } from 'components/hook/use-query-state'
import { toForcedError } from 'helpers/api-error'

export const useForcedError = setError => {
  const [{ state }] = useQueryState()

  useEffect(() => {
    const forcedError = toForcedError(state)
    if (forcedError) setError(forcedError)
  }, [state, setError])
}
