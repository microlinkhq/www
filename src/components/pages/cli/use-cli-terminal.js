import { useEffect } from 'react'

import { colors, fontSizes, toRaw } from 'theme'

import { createBrowserHost } from './browser-host'
import { openPager } from './pager'
import { ATTRACT_COMMANDS, CLI_COMMAND } from './shared'
import { toArgv } from './tokenize'

const PROMPT = `${CLI_COMMAND} `
export const PLAYGROUND_HEIGHT = 360

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const FONT_FAMILY = '"SF Mono", Menlo, Monaco, monospace'

const createTheme = () => ({
  background: colors.black,
  foreground: colors.white,
  cursor: colors.white,
  cursorAccent: colors.black,
  selectionBackground: colors.white20,
  black: colors.black,
  red: colors.red7,
  green: colors.green6,
  yellow: colors.yellow,
  blue: colors.blue5,
  magenta: colors.grape6,
  cyan: colors.cyan5,
  white: colors.white,
  brightBlack: colors.gray6,
  brightRed: colors.red5,
  brightGreen: colors.green5,
  brightYellow: colors.yellow,
  brightBlue: colors.blue4,
  brightMagenta: colors.grape5,
  brightCyan: colors.cyan4,
  brightWhite: colors.white
})

export const useCliTerminal = (containerRef, options) => {
  const attractCommands =
    options?.attract === false
      ? null
      : options?.attractCommands ?? ATTRACT_COMMANDS
  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined

    let disposed = false
    let term
    let fitAddon
    let resizeObserver
    let running = false
    let attracting = false
    let pager = null
    let buffer = ''
    let history = []
    let historyIndex = -1
    let run
    const timeouts = []

    const delay = ms =>
      new Promise(resolve => {
        timeouts.push(setTimeout(resolve, ms))
      })
    const cancelled = () => disposed || !attracting

    const prompt = () => {
      buffer = ''
      historyIndex = -1
      term.write(PROMPT)
    }

    const execute = async argv => {
      if (argv[0] === 'clear' && argv.length === 1) {
        term.clear()
        prompt()
        return
      }
      term.write('\r\n')
      running = true
      const collected = []
      try {
        await run(argv, createBrowserHost(term, collected))
      } catch (error) {
        if (!disposed) collected.push(`\n${error.message || error}\n`)
      } finally {
        running = false
        if (!disposed && collected.join('').trim()) {
          pager = openPager(term, collected.join(''))
          if (attracting) {
            await pager.autoScroll({
              delay,
              instant: prefersReducedMotion(),
              stop: () => disposed || !attracting
            })
          }
          if (!pager.closed) await pager.finished
          pager = null
        }
        if (!disposed && !attracting) prompt()
      }
    }

    const onData = data => {
      if (!term || disposed) return
      if (attracting) attracting = false
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
        term.write('\r\n')
        if (!line.trim()) {
          prompt()
          return
        }
        history = history.at(-1) === line ? history : [...history, line]
        execute(toArgv(line))
        return
      }
      if (data === '\x7f') {
        if (!buffer) return
        buffer = buffer.slice(0, -1)
        term.write('\b \b')
        return
      }
      if (data === '\x1b[A') {
        if (!history.length) return
        if (historyIndex < 0) historyIndex = history.length
        historyIndex = Math.max(0, historyIndex - 1)
        const next = history[historyIndex]
        term.write('\x1b[2K\r' + PROMPT + next)
        buffer = next
        return
      }
      if (data === '\x1b[B') {
        if (historyIndex < 0) return
        historyIndex += 1
        const next = historyIndex >= history.length ? '' : history[historyIndex]
        if (historyIndex >= history.length) historyIndex = -1
        term.write('\x1b[2K\r' + PROMPT + next)
        buffer = next
        return
      }
      if (data < '\x20' || data === '\x7f') return
      buffer += data
      term.write(data)
    }

    ;(async () => {
      const [{ Terminal }, { FitAddon }, cli] = await Promise.all([
        import('@xterm/xterm'),
        import('@xterm/addon-fit'),
        import('microlink.io/cli')
      ])
      if (disposed || !containerRef.current) return
      run = cli.run ?? cli.default
      term = new Terminal({
        convertEol: false,
        cursorBlink: !prefersReducedMotion(),
        cursorStyle: 'bar',
        disableStdin: false,
        fontFamily: FONT_FAMILY,
        fontSize: toRaw(fontSizes[1]),
        lineHeight: 1.2,
        letterSpacing: 0,
        scrollback: 4000,
        theme: createTheme()
      })
      fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      term.open(containerRef.current)
      fitAddon.fit()
      term.onData(onData)
      resizeObserver = new window.ResizeObserver(() => fitAddon?.fit())
      resizeObserver.observe(containerRef.current)
      if (attractCommands?.length) {
        const instant = prefersReducedMotion()
        const typeLine = async text => {
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
          history = history.at(-1) === text ? history : [...history, text]
          return true
        }
        attracting = true
        await delay(instant ? 0 : 400)
        while (!cancelled()) {
          for (const argv of attractCommands) {
            if (cancelled()) break
            const typed = await typeLine(
              `${CLI_COMMAND} ${argv.join(' ')} | less`
            )
            if (!typed || cancelled()) break
            await execute(argv)
            if (cancelled()) break
            await delay(instant ? 600 : 1800)
            if (cancelled()) break
            term.clear()
            buffer = ''
            historyIndex = -1
            if (cancelled()) break
            await delay(instant ? 200 : 400)
          }
        }
      } else {
        prompt()
        term.focus()
      }
    })()

    return () => {
      disposed = true
      attracting = false
      pager?.close()
      timeouts.forEach(clearTimeout)
      resizeObserver?.disconnect()
      term?.dispose()
    }
  }, [containerRef, attractCommands])
}
