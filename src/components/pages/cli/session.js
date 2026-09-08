import { prefersReducedMotion } from 'helpers/reduced-motion'

import { createBrowserHost } from './browser-host'
import { openPager, pagerRows, toPagerLines } from './pager'
import { CLI_COMMAND, isCompactCli } from './shared'
import { parseCommand } from './tokenize'

const PROMPT = `${CLI_COMMAND} `

export const createCliSession = ({ term, run, attractCommands }) => {
  let disposed = false
  let running = false
  let attracting = false
  let pager = null
  let buffer = ''
  let history = []
  let historyIndex = -1
  const timeouts = []

  const delay = ms =>
    new Promise(resolve => {
      timeouts.push(setTimeout(resolve, ms))
    })
  const cancelled = () => disposed || !attracting

  const resetInput = () => {
    buffer = ''
    historyIndex = -1
  }

  const prompt = () => {
    resetInput()
    term.write(PROMPT)
  }

  const rewriteLine = next => {
    term.write('\x1b[2K\r' + PROMPT + next)
    buffer = next
  }

  const remember = line => {
    history = history.at(-1) === line ? history : [...history, line]
  }

  const stepHistory = delta => {
    if (delta < 0) {
      if (!history.length) return
      if (historyIndex < 0) historyIndex = history.length
      historyIndex = Math.max(0, historyIndex - 1)
      rewriteLine(history[historyIndex])
      return
    }
    if (historyIndex < 0) return
    historyIndex += 1
    if (historyIndex >= history.length) {
      historyIndex = -1
      rewriteLine('')
      return
    }
    rewriteLine(history[historyIndex])
  }

  const execute = async (argv, { page = false } = {}) => {
    if (argv[0] === 'clear' && argv.length === 1) {
      term.clear()
      prompt()
      return
    }
    term.write('\r\n')
    running = true
    const chunks = []
    try {
      await run(argv, createBrowserHost(term, chunks))
    } catch (error) {
      if (!disposed) chunks.push(`\n${error.message || error}\n`)
    } finally {
      running = false
      const text = chunks.join('')
      if (!disposed && text.trim()) {
        const overflows = toPagerLines(text).length > pagerRows(term)
        if ((page || overflows) && !isCompactCli()) {
          pager = openPager(term, text)
          if (attracting) {
            await pager.autoScroll({
              delay,
              instant: prefersReducedMotion(),
              stop: () => disposed || !attracting
            })
          }
          if (!pager.closed) await pager.finished
          pager = null
        } else {
          term.write(text.replace(/\n/g, '\r\n'))
        }
      }
      if (!disposed && !attracting) prompt()
    }
  }

  const onData = data => {
    if (disposed) return
    if (attracting) {
      attracting = false
      if (!pager && !running) {
        rewriteLine('')
        historyIndex = -1
        return
      }
    }
    if (pager) {
      pager.handle(data)
      return
    }
    if (data === '\x03' || data === '\x1b') {
      if (running) return
      term.write('^C\r\n')
      prompt()
      return
    }
    if (running) return
    if (data === '\r') {
      const line = buffer
      if (!line.trim()) {
        term.write('\r\n')
        prompt()
        return
      }
      remember(line)
      const parsed = parseCommand(line)
      execute(parsed.argv, { page: parsed.page })
      return
    }
    if (data === '\x7f') {
      if (!buffer) return
      buffer = buffer.slice(0, -1)
      term.write('\b \b')
      return
    }
    if (data === '\x1b[A') {
      stepHistory(-1)
      return
    }
    if (data === '\x1b[B') {
      stepHistory(1)
      return
    }
    if (data < '\x20') return
    buffer += data
    term.write(data)
  }

  const typeLine = async (text, instant) => {
    if (cancelled()) return false
    if (instant) {
      buffer = text
      term.write(text)
    } else {
      for (const char of text) {
        await delay(70)
        if (cancelled()) return false
        buffer += char
        term.write(char)
      }
      await delay(280)
      if (cancelled()) return false
    }
    remember(text)
    return true
  }

  const runAttract = async () => {
    const instant = prefersReducedMotion()
    attracting = true
    await delay(instant ? 0 : 400)
    while (!cancelled()) {
      for (const argv of attractCommands) {
        if (cancelled()) break
        const typed = await typeLine(
          `${CLI_COMMAND} ${argv.join(' ')} | less`,
          instant
        )
        if (!typed || cancelled()) break
        await execute(argv, { page: true })
        if (cancelled()) break
        await delay(instant ? 600 : 1800)
        if (cancelled()) break
        term.clear()
        resetInput()
        if (cancelled()) break
        await delay(instant ? 200 : 400)
      }
    }
  }

  return {
    onData,
    async start () {
      if (attractCommands?.length) await runAttract()
      else {
        prompt()
        term.focus()
      }
    },
    dispose () {
      disposed = true
      attracting = false
      pager?.close()
      timeouts.forEach(clearTimeout)
    }
  }
}
