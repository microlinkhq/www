import { useEffect } from 'react'

import { prefersReducedMotion } from 'helpers/reduced-motion'
import { colors, fontSizes, toRaw } from 'theme'

import { createCliSession } from './session'
import { ATTRACT_COMMANDS } from './shared'

export const PLAYGROUND_HEIGHT = 360

const FONT_FAMILY = '"SF Mono", Menlo, Monaco, monospace'

const THEME = {
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
}

export const useCliTerminal = (
  containerRef,
  { attract = true, attractCommands = ATTRACT_COMMANDS } = {}
) => {
  const commands = attract ? attractCommands : null
  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined

    let disposed = false
    let term
    let fitAddon
    let resizeObserver
    let session
    ;(async () => {
      const [{ Terminal }, { FitAddon }, cli] = await Promise.all([
        import('@xterm/xterm'),
        import('@xterm/addon-fit'),
        import('microlink.io/cli')
      ])
      if (disposed || !containerRef.current) return
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
        theme: THEME
      })
      fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      term.open(containerRef.current)
      fitAddon.fit()
      session = createCliSession({
        term,
        run: cli.run ?? cli.default,
        attractCommands: commands
      })
      term.onData(session.onData)
      resizeObserver = new window.ResizeObserver(() => fitAddon?.fit())
      resizeObserver.observe(containerRef.current)
      await session.start()
    })()

    return () => {
      disposed = true
      session?.dispose()
      resizeObserver?.disconnect()
      term?.dispose()
    }
  }, [containerRef, commands])
}
