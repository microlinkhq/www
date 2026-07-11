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
