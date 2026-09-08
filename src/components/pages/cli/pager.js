import { speed } from 'theme'

const ESC = String.fromCharCode(27)
const SPINNER = new RegExp(`${ESC}\\[K|${ESC}\\[\\?25|[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏]`)

export const isSpinnerChunk = chunk => SPINNER.test(String(chunk))

export const toPagerLines = text => {
  const lines = String(text)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
  if (lines.at(-1) === '') lines.pop()
  return lines
}

export const openPager = (term, text) => {
  const lines = toPagerLines(text)
  let offset = 0
  let settle
  let closed = false
  const finished = new Promise(resolve => {
    settle = resolve
  })

  const pageSize = () => Math.max(1, term.rows - 1)
  const maxOffset = () => Math.max(0, lines.length - pageSize())

  const draw = () => {
    const size = pageSize()
    const view = lines.slice(offset, offset + size)
    const atEnd = offset >= maxOffset()
    const label = atEnd
      ? '(END)'
      : `${Math.round(
        ((offset + view.length) / Math.max(lines.length, 1)) * 100
      )}%`
    term.write('\x1b[?1049h\x1b[H\x1b[J')
    for (const line of view) term.write(`${line}\r\n`)
    term.write(`\x1b[${term.rows};1H\x1b[7m ${label} \x1b[0m`)
  }

  const close = () => {
    if (closed) return
    closed = true
    term.write('\x1b[?1049l')
    settle()
  }

  const handle = data => {
    if (closed) return
    if (data === 'q' || data === '\x1b' || data === '\x03') {
      close()
      return
    }
    if (data === 'j' || data === '\x1b[B' || data === ' ') {
      offset = Math.min(maxOffset(), offset + (data === ' ' ? pageSize() : 1))
      draw()
      return
    }
    if (data === 'k' || data === '\x1b[A') {
      offset = Math.max(0, offset - 1)
      draw()
    }
  }

  const autoScroll = async ({ delay, stop, instant }) => {
    if (instant) {
      offset = maxOffset()
      draw()
      await delay(400)
      if (!closed && !stop()) close()
      return
    }
    while (offset < maxOffset()) {
      if (closed || stop()) return
      await delay(speed.normal)
      if (closed || stop()) return
      offset += 1
      draw()
    }
    if (!closed && !stop()) {
      await delay(900)
      if (!closed && !stop()) close()
    }
  }

  draw()

  return {
    handle,
    close,
    finished,
    autoScroll,
    get closed () {
      return closed
    }
  }
}
