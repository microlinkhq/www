import createClient from 'microlink.io'

const MICROLINK_HOSTS = new Set(['api.microlink.io', 'pro.microlink.io'])
const CONSOLE_METHODS = ['log', 'debug', 'info', 'warn', 'error']

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

const toProUrl = url =>
  url
    .replace('https://api.microlink.io', 'https://pro.microlink.io')
    .replace('http://api.microlink.io', 'https://pro.microlink.io')

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

const rewriteSpecifiers = source =>
  source
    .replace(/(from\s+['"])\.\/([^'"]+)(['"])/g, '$1$2$3')
    .replace(
      /(from\s+['"])https:\/\/esm\.sh\/microlink\.io(?:@[^'"]*)?(['"])/g,
      '$1microlink.io$2'
    )

const formatLogArg = arg => {
  if (typeof arg === 'string') return arg
  if (typeof arg !== 'object' || arg == null) return String(arg)
  if (typeof arg.message === 'string' && (arg.stack || arg.name)) {
    return arg.stack || `${arg.name}: ${arg.message}`
  }
  try {
    const json = JSON.stringify(arg)
    return json === undefined ? String(arg) : json
  } catch (_) {
    return String(arg)
  }
}

const patchConsole = (consoleRef, logs) => {
  const native = Object.fromEntries(
    CONSOLE_METHODS.map(method => [method, consoleRef[method].bind(consoleRef)])
  )
  for (const method of CONSOLE_METHODS) {
    consoleRef[method] = (...args) => {
      const input = args.map(formatLogArg).join(' ')
      if (Array.isArray(logs[method])) logs[method].push(input)
      else logs[method] = [input]
    }
  }
  return () => {
    for (const method of CONSOLE_METHODS) consoleRef[method] = native[method]
  }
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

const createShimUrl = (win, apiKey) => {
  win.__microlinkCreateClient = (opts = {}) =>
    createClient({ ...(apiKey ? { apiKey } : {}), ...opts })
  return URL.createObjectURL(
    new Blob(['export default globalThis.__microlinkCreateClient\n'], {
      type: 'text/javascript'
    })
  )
}

const injectImportMap = (doc, imports) => {
  const script = doc.createElement('script')
  script.type = 'importmap'
  script.textContent = JSON.stringify({ imports })
  doc.head.appendChild(script)
  return script
}

const runEntry = (doc, win, entry) =>
  new Promise((resolve, reject) => {
    win.__editorCallback = resolve
    const script = doc.createElement('script')
    script.type = 'module'
    script.textContent = `import('${entry}').then(async mod => {
      let status
      let value
      try {
        if (!('default' in mod)) throw new Error('Editor code must export default from ${entry}')
        const raw = typeof mod.default === 'function' ? mod.default() : mod.default
        value = await Promise.resolve(raw)
        status = 'success'
      } catch (error) {
        value = error
        status = 'error'
      } finally {
        globalThis.__editorCallback({ status, value })
      }
    }).catch(error => {
      globalThis.__editorCallback({ status: 'error', value: error })
    })`
    script.onerror = () => reject(new Error('Editor module failed to load'))
    doc.body.appendChild(script)
  })

const evalInFrame = async (iframe, files, { apiKey, entry }) => {
  const win = iframe.contentWindow
  const doc = iframe.contentDocument
  const logs = Object.create(null)
  let http = null
  const restoreConsole = patchConsole(win.console, logs)
  const assignHttp = next => {
    http = next
  }
  let restoreIframeFetch = () => {}
  let restoreParentFetch = () => {}
  const blobUrls = []

  try {
    restoreIframeFetch = installFetch(win, assignHttp, apiKey)
    restoreParentFetch = installFetch(window, assignHttp, apiKey)

    const shimUrl = createShimUrl(win, apiKey)
    blobUrls.push(shimUrl)
    const imports = { 'microlink.io': shimUrl }

    for (const [name, source] of Object.entries(files)) {
      const url = URL.createObjectURL(
        new Blob([`// ${Date.now()}\n${rewriteSpecifiers(source)}`], {
          type: 'text/javascript'
        })
      )
      imports[name] = url
      blobUrls.push(url)
    }

    injectImportMap(doc, imports)

    const { status, value } = await runEntry(doc, win, entry)
    return {
      status,
      value: status === 'error' ? serializeError(value) : value,
      logs,
      http
    }
  } finally {
    restoreConsole()
    restoreIframeFetch()
    restoreParentFetch()
    delete win.__microlinkCreateClient
    delete win.__editorCallback
    blobUrls.forEach(url => URL.revokeObjectURL(url))
  }
}

export const withScript = (files, { apiKey, entry = 'main.mjs' } = {}) =>
  new Promise(resolve => {
    if (!files || !files[entry]) {
      resolve({
        status: 'error',
        value: serializeError(`Missing entry file ${entry}`),
        logs: {},
        http: null
      })
      return
    }

    const iframe = document.createElement('iframe')
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
    iframe.title = 'Editor runtime'
    iframe.setAttribute('aria-hidden', 'true')
    iframe.style.cssText =
      'position:absolute;width:0;height:0;border:0;visibility:hidden'
    iframe.srcdoc = '<!doctype html><title>Editor runtime</title>'

    const finish = result => {
      iframe.remove()
      resolve(result)
    }

    iframe.onload = () => {
      evalInFrame(iframe, files, { apiKey, entry }).then(finish, error =>
        finish({
          status: 'error',
          value: serializeError(error),
          logs: {},
          http: null
        })
      )
    }
    iframe.onerror = () =>
      finish({
        status: 'error',
        value: serializeError(new Error('Editor runtime failed to start')),
        logs: {},
        http: null
      })
    document.body.appendChild(iframe)
  })
