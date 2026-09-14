export const RUNTIME_SANDBOX = 'allow-scripts'

export const FN_MARKER = '__editorFn'

export const MESSAGE = {
  RUN: 'run',
  RESULT: 'result',
  MQL: 'mql',
  MQL_RESULT: 'mql-result'
}

export const encodeRpcValue = value => {
  if (typeof value === 'function') {
    return { [FN_MARKER]: true, source: value.toString() }
  }
  if (Array.isArray(value)) return value.map(encodeRpcValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, next]) => [key, encodeRpcValue(next)])
    )
  }
  return value
}

export const decodeRpcValue = value => {
  if (value && value[FN_MARKER] === true && typeof value.source === 'string') {
    return value.source
  }
  if (Array.isArray(value)) return value.map(decodeRpcValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, next]) => [key, decodeRpcValue(next)])
    )
  }
  return value
}

const RUNTIME_BOOTSTRAP = `
function (parentOrigin) {
  var CONSOLE_METHODS = ['log', 'debug', 'info', 'warn', 'error']
  var FN_MARKER = '__editorFn'
  var pending = new Map()
  var requestId = 0
  var runId = null

  var serializeError = function (error) {
    if (!error) return { name: 'Error', message: 'Unknown error' }
    if (typeof error === 'string') return { name: 'Error', message: error }
    var extra = {}
    var keys = ['code', 'status', 'statusCode', 'description', 'data', 'headers', 'url', 'more']
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (error[key] !== undefined) extra[key] = error[key]
    }
    return Object.assign(
      {
        name: error.name || 'Error',
        message: error.message || String(error),
        stack: error.stack
      },
      extra
    )
  }

  var encodeRpcValue = function (value) {
    if (typeof value === 'function') {
      var encoded = { source: value.toString() }
      encoded[FN_MARKER] = true
      return encoded
    }
    if (Array.isArray(value)) return value.map(encodeRpcValue)
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(function (entry) {
          return [entry[0], encodeRpcValue(entry[1])]
        })
      )
    }
    return value
  }

  var formatLogArg = function (arg) {
    if (typeof arg === 'string') return arg
    if (typeof arg !== 'object' || arg == null) return String(arg)
    if (typeof arg.message === 'string' && (arg.stack || arg.name)) {
      return arg.stack || arg.name + ': ' + arg.message
    }
    try {
      var json = JSON.stringify(arg)
      return json === undefined ? String(arg) : json
    } catch (_) {
      return String(arg)
    }
  }

  var patchConsole = function (consoleRef, logs) {
    var native = Object.fromEntries(
      CONSOLE_METHODS.map(function (method) {
        return [method, consoleRef[method].bind(consoleRef)]
      })
    )
    CONSOLE_METHODS.forEach(function (method) {
      consoleRef[method] = function () {
        var input = Array.prototype.slice.call(arguments).map(formatLogArg).join(' ')
        if (Array.isArray(logs[method])) logs[method].push(input)
        else logs[method] = [input]
      }
    })
    return function () {
      CONSOLE_METHODS.forEach(function (method) {
        consoleRef[method] = native[method]
      })
    }
  }

  var rpcMql = function (method, args, opts) {
    return new Promise(function (resolve, reject) {
      var id = ++requestId
      pending.set(id, { resolve: resolve, reject: reject })
      window.parent.postMessage(
        {
          type: 'mql',
          id: runId,
          requestId: id,
          method: method,
          args: encodeRpcValue(args),
          opts: opts
        },
        parentOrigin
      )
    })
  }

  var createClient = function (opts) {
    return new Proxy(
      {},
      {
        get: function (_, prop) {
          if (prop === 'then') return undefined
          return function () {
            return rpcMql(prop, Array.prototype.slice.call(arguments), opts || {})
          }
        }
      }
    )
  }

  var runEntry = function (doc, entry) {
    return new Promise(function (resolve, reject) {
      window.__editorCallback = resolve
      var script = doc.createElement('script')
      script.type = 'module'
      script.textContent =
        "import('" +
        entry +
        "').then(async function (mod) {" +
        "  var status;" +
        "  var value;" +
        "  try {" +
        "    if (!('default' in mod)) throw new Error('Editor code must export default from " +
        entry +
        "');" +
        "    var raw = typeof mod.default === 'function' ? mod.default() : mod.default;" +
        "    value = await Promise.resolve(raw);" +
        "    status = 'success';" +
        "  } catch (error) {" +
        "    value = error;" +
        "    status = 'error';" +
        "  } finally {" +
        "    globalThis.__editorCallback({ status: status, value: value });" +
        "  }" +
        "}).catch(function (error) {" +
        "  globalThis.__editorCallback({ status: 'error', value: error });" +
        "})"
      script.onerror = function () {
        reject(new Error('Editor module failed to load'))
      }
      doc.body.appendChild(script)
    })
  }

  var run = async function (payload) {
    var logs = Object.create(null)
    var restoreConsole = patchConsole(window.console, logs)
    var blobUrls = []
    try {
      var shimUrl = URL.createObjectURL(
        new Blob(['export default globalThis.__microlinkCreateClient\\n'], {
          type: 'text/javascript'
        })
      )
      blobUrls.push(shimUrl)
      window.__microlinkCreateClient = createClient
      var imports = { 'microlink.io': shimUrl }
      Object.keys(payload.files).forEach(function (name) {
        var url = URL.createObjectURL(
          new Blob(['// ' + Date.now() + '\\n' + payload.files[name]], {
            type: 'text/javascript'
          })
        )
        imports[name] = url
        blobUrls.push(url)
      })
      var map = document.createElement('script')
      map.type = 'importmap'
      map.textContent = JSON.stringify({ imports: imports })
      document.head.appendChild(map)
      var outcome = await runEntry(document, payload.entry)
      return {
        type: 'result',
        status: outcome.status,
        value: outcome.status === 'error' ? serializeError(outcome.value) : outcome.value,
        logs: logs
      }
    } finally {
      restoreConsole()
      delete window.__microlinkCreateClient
      delete window.__editorCallback
      blobUrls.forEach(function (url) {
        URL.revokeObjectURL(url)
      })
    }
  }

  window.addEventListener('message', async function (event) {
    if (event.source !== window.parent) return
    if (event.origin !== parentOrigin) return
    var data = event.data
    if (!data) return
    if (data.type === 'mql-result') {
      var waiter = pending.get(data.requestId)
      if (!waiter) return
      pending.delete(data.requestId)
      if (data.status === 'error') {
        var error = new Error(
          (data.value && data.value.message) || 'Microlink request failed'
        )
        Object.assign(error, data.value)
        waiter.reject(error)
      } else {
        waiter.resolve(data.value)
      }
      return
    }
    if (data.type !== 'run') return
    runId = data.id
    try {
      var result = await run(data)
      result.id = data.id
      window.parent.postMessage(result, parentOrigin)
    } catch (error) {
      window.parent.postMessage(
        {
          type: 'result',
          id: data.id,
          status: 'error',
          value: serializeError(error),
          logs: {}
        },
        parentOrigin
      )
    }
  })
}
`.trim()

export const createRuntimeSrcdoc = parentOrigin =>
  '<!doctype html><title>Editor runtime</title><script>(' +
  RUNTIME_BOOTSTRAP +
  ')(' +
  JSON.stringify(parentOrigin) +
  ')</script>'
