import { useEffect } from 'react'

import { prefersReducedMotion } from 'helpers/reduced-motion'
import { colors, fontSizes, toRaw } from 'theme'

import { createCliSession } from './session'
import { ATTRACT_COMMANDS, MIN_TERMINAL_COLS, isCompactCli } from './shared'

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
    let detachTouch
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
        fontSize: toRaw(
          window.matchMedia('(max-width: 768px)').matches
            ? fontSizes[0]
            : fontSizes[1]
        ),
        lineHeight: 1.2,
        letterSpacing: 0,
        scrollback: 4000,
        theme: THEME
      })
      fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      term.open(containerRef.current)
      const fit = () => {
        fitAddon.fit()
        if (isCompactCli() && term.cols < MIN_TERMINAL_COLS) {
          term.resize(MIN_TERMINAL_COLS, term.rows)
        }
      }
      fit()
      session = createCliSession({
        term,
        run: cli.run ?? cli.default,
        attractCommands: commands
      })
      term.onData(session.onData)
      let touchX = null
      let touchY = null
      const surface = containerRef.current
      const onTouchStart = e => {
        if (e.touches.length !== 1) return
        touchX = e.touches[0].clientX
        touchY = e.touches[0].clientY
      }
      const onTouchMove = e => {
        if (
          touchX == null ||
          touchY == null ||
          e.touches.length !== 1 ||
          !term.element
        ) {
          return
        }
        const x = e.touches[0].clientX
        const y = e.touches[0].clientY
        const dx = touchX - x
        const dy = touchY - y
        const rowHeight = term.rows ? term.element.clientHeight / term.rows : 20
        const lines = Math.round(dy / rowHeight)
        if (lines) {
          term.scrollLines(lines)
          touchY = y
        }
        if (dx) {
          surface.scrollLeft += dx
          touchX = x
        }
        if (lines || dx) e.preventDefault()
      }
      const onTouchEnd = () => {
        touchX = null
        touchY = null
      }
      const touchOpts = { capture: true }
      surface.addEventListener('touchstart', onTouchStart, {
        ...touchOpts,
        passive: true
      })
      surface.addEventListener('touchmove', onTouchMove, {
        ...touchOpts,
        passive: false
      })
      surface.addEventListener('touchend', onTouchEnd, touchOpts)
      const onViewportResize = () => fit()
      window.visualViewport?.addEventListener('resize', onViewportResize)
      resizeObserver = new window.ResizeObserver(() => fit())
      resizeObserver.observe(surface)
      detachTouch = () => {
        surface.removeEventListener('touchstart', onTouchStart, touchOpts)
        surface.removeEventListener('touchmove', onTouchMove, touchOpts)
        surface.removeEventListener('touchend', onTouchEnd, touchOpts)
        window.visualViewport?.removeEventListener('resize', onViewportResize)
      }
      await session.start()
    })()

    return () => {
      disposed = true
      detachTouch?.()
      session?.dispose()
      resizeObserver?.disconnect()
      term?.dispose()
    }
  }, [containerRef, commands])
}
