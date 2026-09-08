import { prefersReducedMotion } from 'helpers/reduced-motion'

import { createBrowserHost } from './browser-host'
import { openPager } from './pager'
import { CLI_COMMAND, isCompactCli } from './shared'
import { parseCommand } from './tokenize'

const PROMPT = `${CLI_COMMAND} `

export const createCliSession = ({
  term,
  run,
  attractCommands,
  onPin,
  surface
}) => {
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

  const wipe = () => {
    term.write('\x1b[2J\x1b[3J\x1b[H')
    term.clear()
    term.scrollToTop()
    if (surface) surface.scrollLeft = 0
  }

  let pinOverlay = false
  const marks = []

  const commandAt = y => {
    let found = null
    for (const mark of marks) {
      if (mark.line < y) found = mark
    }
    return found
  }

  const paintPins = viewLine => {
    const y = viewLine ?? term.buffer.active.viewportY
    const mark = commandAt(y)
    onPin?.({
      command: mark ? mark.text : '',
      prompt: pinOverlay ? `${PROMPT}${buffer}` : '',
      viewLine
    })
  }

  let holdView = null

  const scrollDisp = term.onScroll(() => {
    if (holdView != null) {
      term.scrollToLine(holdView)
      return
    }
    if (pinOverlay) paintPins()
  })

  const revealInput = () => {
    if (pinOverlay) {
      paintPins()
      return
    }
    term.scrollToBottom()
    if (surface) surface.scrollLeft = 0
  }

  const prompt = () => {
    resetInput()
    term.write('\x1b[?25h' + PROMPT)
  }

  const rewriteLine = next => {
    buffer = next
    if (!pinOverlay) term.write('\x1b[2K\r' + PROMPT + next)
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
    } else {
      if (historyIndex < 0) return
      historyIndex += 1
      if (historyIndex >= history.length) {
        historyIndex = -1
        rewriteLine('')
      } else rewriteLine(history[historyIndex])
    }
    paintPins()
  }

  const write = chunk =>
    new Promise(resolve => {
      term.write(chunk, resolve)
    })

  const execute = async (argv, { page = false } = {}) => {
    if (argv[0] === 'clear' && argv.length === 1) {
      pinOverlay = false
      marks.length = 0
      paintPins()
      wipe()
      prompt()
      return
    }
    const commandLine = term.buffer.active.baseY + term.buffer.active.cursorY
    await write('\r\n')
    running = true
    const chunks = []
    try {
      await run(argv, createBrowserHost(term, chunks))
    } catch (error) {
      if (!disposed) chunks.push(`\n${error.message || error}\n`)
    } finally {
      running = false
      const text = chunks.join('')
      let usedPager = false
      if (!disposed && text.trim()) {
        if (page && !isCompactCli()) {
          usedPager = true
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
          await write(text.replace(/\n/g, '\r\n'))
        }
      }
      if (!disposed && !attracting) {
        if (usedPager) prompt()
        else {
          resetInput()
          pinOverlay = true
          marks.push({
            line: commandLine,
            text: `${PROMPT}${history.at(-1) || ''}`
          })
          term.write('\x1b[?25l')
          const viewLine = commandLine + 1
          holdView = viewLine
          paintPins(viewLine)
          const stick = () => term.scrollToLine(viewLine)
          stick()
          window.requestAnimationFrame(stick)
          timeouts.push(setTimeout(stick, 50))
          timeouts.push(
            setTimeout(() => {
              stick()
              holdView = null
              paintPins()
            }, 200)
          )
        }
      }
    }
  }

  const onData = data => {
    if (disposed) return
    if (attracting) {
      attracting = false
      if (!pager && !running) {
        rewriteLine('')
        historyIndex = -1
        paintPins()
        return
      }
    }
    if (pager) {
      pager.handle(data)
      return
    }
    if (!running) revealInput()
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
        if (!pinOverlay) {
          term.write('\r\n')
          prompt()
        }
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
      if (!pinOverlay) term.write('\b \b')
      paintPins()
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
    if (!pinOverlay) term.write(data)
    paintPins()
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
        wipe()
        resetInput()
        if (cancelled()) break
        await delay(instant ? 200 : 400)
      }
    }
  }

  const stopAttract = () => {
    if (!attracting || pager || running) return
    attracting = false
    rewriteLine('')
    historyIndex = -1
    paintPins()
  }

  return {
    onData,
    stopAttract,
    async start () {
      if (attractCommands?.length && !prefersReducedMotion()) {
        await runAttract()
        return
      }
      prompt()
      if (!attractCommands?.length) term.focus()
    },
    dispose () {
      disposed = true
      attracting = false
      pager?.close()
      scrollDisp.dispose()
      timeouts.forEach(clearTimeout)
    }
  }
}
