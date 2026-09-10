import { prefersReducedMotion } from 'helpers/reduced-motion'

import { createBrowserHost, createSilentHost } from './browser-host'
import { openPager } from './pager'
import { commandToTraceLine, hasTraceFlag, readSharedLine } from './share'
import { CLI_COMMAND, isCompactCli } from './shared'
import { parseCommand } from './tokenize'

const PROMPT = `${CLI_COMMAND} `
const ANSI = new RegExp(`${String.fromCharCode(27)}\\[[0-9;?]*[ -/]*[@-~]`, 'g')

const toPlain = value =>
  String(value).replace(ANSI, '').replace(/\r/g, '').trim()

export const createCliSession = ({
  term,
  run,
  attractCommands,
  onPin,
  surface,
  share = false
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
  let liveCommand = null
  const marks = []

  const commandAt = y => {
    let found = null
    for (const mark of marks) {
      if (mark.line <= y) found = mark
    }
    return found
  }

  const paintPins = viewLine => {
    const y = viewLine ?? term.buffer.active.viewportY
    const mark = commandAt(y)
    onPin?.({
      command: liveCommand || (mark ? mark.text : ''),
      output: mark ? mark.output || '' : '',
      prompt: pinOverlay && !running ? `${PROMPT}${buffer}` : '',
      viewLine
    })
  }

  let holdView = null

  const applyHold = () => {
    if (disposed) return
    if (holdView === 'bottom') term.scrollToBottom()
    else if (holdView != null) term.scrollToLine(holdView)
  }

  const scrollDisp = term.onScroll(() => {
    if (holdView != null) {
      applyHold()
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
    pinOverlay = false
    holdView = null
    resetInput()
    term.write('\x1b[?25h' + PROMPT, () => {
      if (disposed) return
      paintPins()
      revealInput()
    })
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

  const stopAttract = () => {
    if (!attracting) return
    attracting = false
    if (pager || running) return
    rewriteLine('')
    historyIndex = -1
    paintPins()
  }

  const execute = async (argv, { page = false } = {}) => {
    if (argv[0] === 'clear' && argv.length === 1) {
      marks.length = 0
      wipe()
      prompt()
      return
    }
    running = true
    const commandText = `${PROMPT}${history.at(-1) || ''}`
    const typedInTerm = !pinOverlay && !attracting
    try {
      if (!attracting) {
        liveCommand = commandText
        pinOverlay = true
        term.write('\x1b[?25l')
        paintPins()
      }
      await write(typedInTerm ? '\r\x1b[2K' : '\r\n')
      if (!attracting) term.write('\x1b[?25l')
      const commandLine = term.buffer.active.baseY + term.buffer.active.cursorY
      if (!typedInTerm && !attracting) await write(`${commandText}\r\n`)
      if (!attracting) {
        holdView = 'bottom'
        term.scrollToBottom()
      }
      const chunks = []
      try {
        await run(argv, createBrowserHost(term, chunks))
      } catch (error) {
        if (!disposed) chunks.push(`\n${error.message || error}\n`)
      }
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
          term.write('\x1b[?25l')
        }
      }
      if (!disposed && !attracting) {
        term.write('\x1b[?25l')
        liveCommand = null
        if (usedPager) prompt()
        else {
          pinOverlay = true
          resetInput()
          running = false
          marks.push({
            line: commandLine,
            text: commandText,
            output: toPlain(text)
          })
          holdView = 'bottom'
          paintPins()
          applyHold()
          window.requestAnimationFrame(applyHold)
          timeouts.push(setTimeout(applyHold, 50))
          timeouts.push(
            setTimeout(() => {
              holdView = null
            }, 200)
          )
        }
      }
    } finally {
      running = false
      liveCommand = null
    }
  }

  const onData = data => {
    if (disposed) return
    if (attracting) {
      stopAttract()
      if (!pager && !running) return
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

  const copyTrace = async () => {
    const mark = commandAt(term.buffer.active.viewportY)
    if (!mark) return ''
    if (mark.traceOutput) return mark.traceOutput
    if (mark.output && hasTraceFlag(mark.text)) {
      mark.traceOutput = mark.output
      return mark.output
    }
    const line = commandToTraceLine(mark.text)
    if (!line) return ''
    const { argv } = parseCommand(line)
    if (!argv.length) return ''
    const chunks = []
    try {
      await run(argv, createSilentHost(chunks))
    } catch (error) {
      if (!disposed) chunks.push(`\n${error.message || error}\n`)
    }
    mark.traceOutput = toPlain(chunks.join(''))
    return mark.traceOutput
  }

  return {
    onData,
    stopAttract,
    copyTrace,
    async start () {
      const shared = share ? readSharedLine() : ''
      if (shared) {
        resetInput()
        buffer = shared
        remember(shared)
        const parsed = parseCommand(shared)
        await execute(parsed.argv, { page: parsed.page })
        term.focus()
        return
      }
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
