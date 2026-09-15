const TIMING_COLORS = ['green5', 'blue5', 'yellow5', 'pink5', 'grape5', 'teal5']

export const parseServerTimingEntries = raw => {
  if (!raw) return []
  return raw
    .split(',')
    .map(part => {
      const [name, ...rest] = part.split(';')
      const dur = rest.find(p => p.trim().startsWith('dur='))
      return {
        name: name.trim(),
        dur: dur ? parseFloat(dur.split('=')[1]) : null
      }
    })
    .filter(entry => entry.name)
}

export const parseServerTiming = raw => {
  if (!raw) return { bars: [], rows: [], totalMs: null }

  const entries = parseServerTimingEntries(raw).map(e => ({
    name: e.name,
    dur: e.dur ?? 0
  }))

  const total =
    entries.find(e => e.name === 'total')?.dur ??
    entries.reduce((sum, e) => sum + e.dur, 0)

  const pct = dur => (total ? (dur / total) * 100 : 0)

  const share = dur => {
    const value = Math.round(pct(dur) * 10) / 10
    return `${Number.isInteger(value) ? value : value.toFixed(1)}%`
  }

  const bars = entries.map((e, i) => ({
    name: e.name,
    dur: `${e.dur.toFixed(1)}ms`,
    share: share(e.dur),
    pct: `${Math.max(2, Math.round(pct(e.dur)))}%`,
    color: TIMING_COLORS[i % TIMING_COLORS.length]
  }))

  const rows = entries.map(e => ({
    name: e.name,
    dur: `${e.dur.toFixed(1)}ms`,
    pct: share(e.dur)
  }))

  return { bars, rows, totalMs: total }
}
