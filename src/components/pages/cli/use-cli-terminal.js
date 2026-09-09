import { useEffect } from 'react'

import { prefersReducedMotion } from 'helpers/reduced-motion'
import { colors, fontSizes, toRaw } from 'theme'

import { createCliSession } from './session'
import { shareHref } from './share'
import { ATTRACT_COMMANDS, MIN_TERMINAL_COLS, isCompactCli } from './shared'

const ICON = {
  copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  check:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
}

const iconSlot = (name, svg) => {
  const span = document.createElement('span')
  span.dataset.cliIcon = name
  span.setAttribute('aria-hidden', 'true')
  span.innerHTML = svg
  return span
}

const attachPinButton = (parent, { name, label, icon, getText }) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset.cliAction = name
  button.setAttribute('aria-label', label)
  button.setAttribute('aria-live', 'polite')
  button.append(iconSlot('action', icon), iconSlot('done', ICON.check))
  let timer
  const onClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const text = getText()
    if (!text || typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        delete button.dataset.copied
        button.getBoundingClientRect()
        button.dataset.copied = 'true'
        button.setAttribute('aria-label', 'Copied')
        clearTimeout(timer)
        timer = setTimeout(() => {
          delete button.dataset.copied
          button.setAttribute('aria-label', label)
        }, 1500)
      })
      .catch(() => {})
  }
  button.addEventListener('click', onClick)
  parent.append(button)
  return () => {
    clearTimeout(timer)
    button.removeEventListener('click', onClick)
  }
}

const attachPinActions = (pin, { getCommand, getOutput }) => {
  const actions = document.createElement('span')
  actions.dataset.cliActions = ''
  const unbind = [
    attachPinButton(actions, {
      name: 'copy',
      label: 'Copy output',
      icon: ICON.copy,
      getText: getOutput
    }),
    attachPinButton(actions, {
      name: 'permalink',
      label: 'Copy permalink',
      icon: ICON.link,
      getText: () => shareHref(getCommand())
    })
  ]
  pin.append(actions)
  return () => unbind.forEach(fn => fn())
}

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

const bindTouchScroll = (surface, term) => {
  let touchX = null
  let touchY = null
  const onStart = e => {
    if (e.touches.length !== 1) return
    touchX = e.touches[0].clientX
    touchY = e.touches[0].clientY
  }
  const onMove = e => {
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
  const onEnd = () => {
    touchX = null
    touchY = null
  }
  const opts = { capture: true }
  surface.addEventListener('touchstart', onStart, { ...opts, passive: true })
  surface.addEventListener('touchmove', onMove, { ...opts, passive: false })
  surface.addEventListener('touchend', onEnd, opts)
  return () => {
    surface.removeEventListener('touchstart', onStart, opts)
    surface.removeEventListener('touchmove', onMove, opts)
    surface.removeEventListener('touchend', onEnd, opts)
  }
}

export const useCliTerminal = (
  containerRef,
  { attract = true, attractCommands = ATTRACT_COMMANDS, share = false } = {}
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
    let detachActions
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
        ariaLabel: 'Interactive Microlink CLI',
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
      const surface = containerRef.current
      const commandPin = document.createElement('div')
      const host = document.createElement('div')
      const promptPin = document.createElement('div')
      commandPin.dataset.cliPin = 'command'
      host.dataset.cliHost = ''
      promptPin.dataset.cliPin = 'prompt'
      commandPin.dataset.collapsed = 'true'
      promptPin.hidden = true
      const commandText = document.createElement('span')
      commandText.dataset.cliCmd = ''
      commandPin.append(commandText)
      let pinnedOutput = ''
      if (share) {
        detachActions = attachPinActions(commandPin, {
          getCommand: () => commandText.textContent,
          getOutput: () => pinnedOutput
        })
      }
      const pinFont = `${term.options.fontSize}px`
      commandPin.style.fontSize = pinFont
      promptPin.style.fontSize = pinFont
      surface.append(commandPin, host, promptPin)
      const focusTerm = e => {
        if (e.target.closest('[data-cli-actions]')) return
        e.preventDefault()
        term.focus()
      }
      commandPin.addEventListener('pointerdown', focusTerm)
      promptPin.addEventListener('pointerdown', focusTerm)
      term.open(host)
      const fit = () => {
        const y = term.buffer.active.viewportY
        fitAddon.fit()
        if (isCompactCli() && term.cols < MIN_TERMINAL_COLS) {
          term.resize(MIN_TERMINAL_COLS, term.rows)
        }
        term.scrollToLine(y)
      }
      fit()
      session = createCliSession({
        term,
        run: cli.run ?? cli.default,
        attractCommands: commands,
        share,
        surface,
        onPin: ({ command, output, prompt: promptText, viewLine }) => {
          const open = Boolean(command)
          if (command) {
            commandText.textContent = command
            pinnedOutput = output || ''
          }
          const wasOpen = commandPin.dataset.collapsed !== 'true'
          commandPin.dataset.collapsed = open ? 'false' : 'true'
          commandPin.inert = !open
          promptPin.textContent = promptText
          promptPin.hidden = !promptText
          if (viewLine != null) {
            term.scrollToLine(viewLine)
            window.requestAnimationFrame(() => {
              fit()
              term.scrollToLine(viewLine)
            })
          } else if (wasOpen !== open) {
            const keep = term.buffer.active.viewportY
            fit()
            term.scrollToLine(keep)
          }
        }
      })
      term.onData(session.onData)
      const unbindTouch = bindTouchScroll(surface, term)
      const onViewportResize = () => fit()
      window.visualViewport?.addEventListener('resize', onViewportResize)
      surface.addEventListener('pointerdown', session.stopAttract)
      surface.addEventListener('focusin', session.stopAttract)
      resizeObserver = new window.ResizeObserver(() => fit())
      resizeObserver.observe(host)
      detachTouch = () => {
        unbindTouch()
        surface.removeEventListener('pointerdown', session.stopAttract)
        surface.removeEventListener('focusin', session.stopAttract)
        window.visualViewport?.removeEventListener('resize', onViewportResize)
      }
      await session.start()
    })()

    return () => {
      disposed = true
      detachActions?.()
      detachTouch?.()
      session?.dispose()
      resizeObserver?.disconnect()
      term?.dispose()
    }
  }, [containerRef, commands, share])
}
