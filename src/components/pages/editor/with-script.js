import createClient from 'microlink.io'

import {
  createRuntimeSrcdoc,
  decodeRpcValue,
  MESSAGE,
  RUNTIME_SANDBOX
} from './runtime-frame'
import { toModuleSource } from './to-module-source'

const MICROLINK_HOSTS = new Set(['api.microlink.io', 'pro.microlink.io'])

export const serializeError = error => {
  if (!error) return { name: 'Error', message: 'Unknown error' }
  if (typeof error === 'string') return { name: 'Error', message: error }
  const extra = {}
  for (const key of [
    'code',
    'status',
    'statusCode',
    'description',
    'data',
    'headers',
    'url',
    'more'
  ]) {
    if (error[key] !== undefined) extra[key] = error[key]
  }
  return {
    name: error.name || 'Error',
    message: error.message || String(error),
    stack: error.stack,
    ...extra
  }
}

const requestUrl = input => {
  if (typeof input === 'string') return input
  if (input && typeof input.url === 'string') return input.url
  return ''
}

const isMicrolinkApi = url => {
  try {
    return MICROLINK_HOSTS.has(
      new URL(url, 'https://api.microlink.io').hostname
    )
  } catch (_) {
    return false
  }
}

const toProUrl = url => {
  try {
    const parsed = new URL(url, 'https://api.microlink.io')
    if (!MICROLINK_HOSTS.has(parsed.hostname)) return url
    parsed.protocol = 'https:'
    parsed.hostname = 'pro.microlink.io'
    return parsed.href
  } catch (_) {
    return url
  }
}

const mergeHeaders = (input, init, apiKey) => {
  const headers = new Headers(
    typeof input === 'string' ? undefined : input.headers
  )
  if (init && init.headers) {
    new Headers(init.headers).forEach((value, key) => {
      headers.set(key, value)
    })
  }
  headers.set('x-api-key', apiKey)
  return headers
}

const wrapFetch =
  (nativeFetch, apiKey) =>
    (input, init = {}) => {
      const url = requestUrl(input)
      if (!apiKey || !isMicrolinkApi(url)) return nativeFetch(input, init)
      const nextUrl = toProUrl(url)
      const headers = mergeHeaders(input, init, apiKey)
      if (typeof input === 'string') {
        return nativeFetch(nextUrl, { ...init, headers })
      }
      return nativeFetch(new Request(nextUrl, input), { ...init, headers })
    }

const captureHttp = (assign, wrap) => {
  return async (input, init) => {
    const response = await wrap(input, init)
    if (isMicrolinkApi(response.url || requestUrl(input))) {
      assign({
        statusCode: response.status,
        headers: Object.fromEntries(response.headers.entries())
      })
    }
    return response
  }
}

const installFetch = (target, assign, apiKey) => {
  const native = target.fetch.bind(target)
  target.fetch = captureHttp(assign, wrapFetch(native, apiKey))
  return () => {
    target.fetch = native
  }
}

const compileFiles = async files => {
  const compiled = {}
  for (const [name, source] of Object.entries(files)) {
    compiled[name] = await toModuleSource(name, source)
  }
  return compiled
}

const cloneForFrame = value => {
  try {
    structuredClone(value)
    return value
  } catch (_) {
    return JSON.parse(JSON.stringify(value))
  }
}

const callMicrolink = async (apiKey, data) => {
  const client = createClient({
    ...(apiKey ? { apiKey } : {}),
    ...data.opts
  })
  const method = client[data.method]
  if (typeof method !== 'function') {
    throw new Error(`Unknown microlink method ${data.method}`)
  }
  return cloneForFrame(await method.apply(client, decodeRpcValue(data.args)))
}

const emptyResult = (value, extra = {}) => ({
  status: 'error',
  value: serializeError(value),
  logs: {},
  http: null,
  ...extra
})

export const withScript = (files, { apiKey, entry = 'main.mjs' } = {}) =>
  new Promise(resolve => {
    if (!files || !files[entry]) {
      resolve(emptyResult(`Missing entry file ${entry}`))
      return
    }

    const runId = Math.random().toString(36).slice(2)
    const iframe = document.createElement('iframe')
    iframe.setAttribute('sandbox', RUNTIME_SANDBOX)
    iframe.title = 'Editor runtime'
    iframe.setAttribute('aria-hidden', 'true')
    iframe.style.cssText =
      'position:absolute;width:0;height:0;border:0;visibility:hidden'
    iframe.srcdoc = createRuntimeSrcdoc(window.location.origin)

    let settled = false
    let restoreParentFetch = () => {}
    let http = null

    const finish = result => {
      if (settled) return
      settled = true
      window.removeEventListener('message', onMessage)
      restoreParentFetch()
      iframe.remove()
      resolve(result)
    }

    const onMessage = event => {
      if (event.source !== iframe.contentWindow) return
      const data = event.data
      if (!data || data.id !== runId) return
      if (data.type === MESSAGE.MQL) {
        callMicrolink(apiKey, data).then(
          value => {
            iframe.contentWindow.postMessage(
              {
                type: MESSAGE.MQL_RESULT,
                id: runId,
                requestId: data.requestId,
                status: 'success',
                value
              },
              '*'
            )
          },
          error => {
            iframe.contentWindow.postMessage(
              {
                type: MESSAGE.MQL_RESULT,
                id: runId,
                requestId: data.requestId,
                status: 'error',
                value: serializeError(error)
              },
              '*'
            )
          }
        )
        return
      }
      if (data.type === MESSAGE.RESULT) {
        finish({
          status: data.status,
          value: data.value,
          logs: data.logs || {},
          http
        })
      }
    }

    iframe.onload = () => {
      window.addEventListener('message', onMessage)
      restoreParentFetch = installFetch(
        window,
        next => {
          http = next
        },
        apiKey
      )
      compileFiles(files).then(
        compiled => {
          iframe.contentWindow.postMessage(
            { type: MESSAGE.RUN, id: runId, files: compiled, entry },
            '*'
          )
        },
        error => finish(emptyResult(error))
      )
    }
    iframe.onerror = () =>
      finish(emptyResult(new Error('Editor runtime failed to start')))
    document.body.appendChild(iframe)
  })
