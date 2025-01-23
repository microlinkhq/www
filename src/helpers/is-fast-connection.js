import get from 'dlv'
import { isSSR } from './is-ssr'

export const isFastConnection = isSSR
  ? undefined
  : get(window, 'navigator.connection.effectiveType') === '4g'
