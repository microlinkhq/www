const STORAGE_KEY = 'microlink.cli.apiKey'
const ESC = String.fromCharCode(27)
const SPINNER = new RegExp(`${ESC}\\[K|${ESC}\\[\\?25|[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏]`)

const isSpinnerChunk = chunk => SPINNER.test(String(chunk))

const toCrlf = value => String(value).replace(/\n/g, '\r\n')

export const createBrowserHost = (term, output) => {
  const writeLive = chunk => term.write(toCrlf(chunk))
  const writeOut = chunk => {
    if (output) {
      const text = String(chunk)
      output.all.push(text)
      output.stdout.push(text)
    } else writeLive(chunk)
  }
  const writeErr = chunk => {
    writeLive(chunk)
    if (output && !isSpinnerChunk(chunk)) output.all.push(String(chunk))
  }
  return {
    stdout: { write: writeOut },
    stderr: { write: writeErr },
    env: {},
    isTTY: true,
    hasColors: true,
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
  }
}
