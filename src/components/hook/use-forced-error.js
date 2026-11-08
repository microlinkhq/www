import { useQueryState } from 'components/hook/use-query-state'
import { toForcedError } from 'helpers/api-error'

export const useForcedError = error => {
  const [{ state }] = useQueryState()
  return toForcedError(state) || error
}
