const STORAGE_KEY = 'microlink.cli.apiKey'
const ESC = String.fromCharCode(27)
const SPINNER = new RegExp(`${ESC}\\[K|${ESC}\\[\\?25|[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏]`)

const isSpinnerChunk = chunk => SPINNER.test(String(chunk))

const toCrlf = value => String(value).replace(/\n/g, '\r\n')

const hostServices = () => ({
  env: {},
  readFile () {
    throw new Error('`--file` is not available in the browser playground')
  },
  readApiKey () {
    const value = globalThis.localStorage?.getItem(STORAGE_KEY)
    return value || undefined
  },
  writeConfig (data) {
    if (data?.apiKey) {
      globalThis.localStorage?.setItem(STORAGE_KEY, data.apiKey)
    }
  },
  clearConfig () {
    const had = Boolean(globalThis.localStorage?.getItem(STORAGE_KEY))
    globalThis.localStorage?.removeItem(STORAGE_KEY)
    return had
  },
  async login () {
    throw new Error(
      'login is not available here. Pass --api-key, or run microlink login in your terminal.'
    )
  },
  exit (code) {
    return code
  }
})

export const createBrowserHost = (term, chunks) => {
  const writeLive = chunk => term.write(toCrlf(chunk))
  const collect = chunk => {
    if (chunks) chunks.push(String(chunk))
    else writeLive(chunk)
  }
  return {
    ...hostServices(),
    isTTY: true,
    hasColors: true,
    stdout: { write: collect },
    stderr: {
      write (chunk) {
        if (isSpinnerChunk(chunk)) writeLive(chunk)
        else collect(chunk)
      }
    }
  }
}

export const createSilentHost = chunks => {
  const collect = chunk => {
    if (!isSpinnerChunk(chunk)) chunks.push(String(chunk))
  }
  return {
    ...hostServices(),
    isTTY: false,
    hasColors: false,
    stdout: { write: collect },
    stderr: { write: collect }
  }
}
