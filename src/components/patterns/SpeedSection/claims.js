const PERCENT = 100
const NBSP = '\u00a0'

const hostnameOf = url => new URL(url).hostname.replace(/^www\./, '')

export const breakableName = name => name.replaceAll(NBSP, ' ')

export const formatDuration = ms =>
  `${Math.round(ms).toLocaleString('en-US')}${NBSP}ms`

export const displayedTotal = runs =>
  runs.reduce((total, { coldDuration }) => total + Math.round(coldDuration), 0)

export const percentSlower = (competitorMs, microlinkMs) =>
  Math.round(((competitorMs - microlinkMs) / microlinkMs) * PERCENT)

export const percentDifference = (ms, baselineMs) => {
  if (!(baselineMs > 0)) return null
  const percent = Math.round(((ms - baselineMs) / baselineMs) * PERCENT)
  return percent > 0 ? `+${percent}%` : `${percent}%`
}

export const microlinkDelta = (times, services) => {
  const index = services.indexOf('microlink')
  const others = times.filter((_, i) => i !== index)
  if (index === -1 || others.length === 0) return null
  return percentDifference(times[index], Math.min(...others))
}

export const speedRatio = (competitorMs, microlinkMs) =>
  (competitorMs / microlinkMs).toFixed(1)

export const relativeSpeed = (competitorMs, microlinkMs) =>
  competitorMs >= microlinkMs
    ? `${speedRatio(competitorMs, microlinkMs)}×${NBSP}slower`
    : `${speedRatio(microlinkMs, competitorMs)}×${NBSP}faster`

const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

const benchmarkMonth = timestamp =>
  MONTH_YEAR.format(new Date(`${timestamp.slice(0, 7)}-01`))

const widestGap = (microlinkRuns, competitorRuns) => {
  const gaps = microlinkRuns
    .map(({ url, coldDuration }) => {
      const competitor = competitorRuns.find(run => run.url === url)
      if (!competitor) return null
      const competitorMs = competitor.coldDuration
      return {
        host: hostnameOf(url),
        microlink: formatDuration(coldDuration),
        competitor: formatDuration(competitorMs),
        value: competitorMs / coldDuration,
        ratio: speedRatio(competitorMs, coldDuration)
      }
    })
    .filter(Boolean)
  if (gaps.length === 0) {
    return { host: '', microlink: '', competitor: '', value: 0, ratio: '0.0' }
  }
  return gaps.reduce((widest, run) => (run.value > widest.value ? run : widest))
}

export const benchmarkClaims = (benchmark, competitorKey) => {
  const microlink = benchmark.results.microlink
  const competitor = benchmark.results[competitorKey]
  const microlinkMs = microlink.summary.avgColdDuration
  const competitorMs = competitor.summary.avgColdDuration
  const { value, ...gap } = widestGap(microlink.perUrl, competitor.perUrl)
  return {
    run: benchmarkMonth(benchmark.timestamp),
    urls: microlink.perUrl.length,
    microlinkAverage: formatDuration(microlinkMs),
    competitorAverage: formatDuration(competitorMs),
    averageRatio: speedRatio(competitorMs, microlinkMs),
    percentSlower: percentSlower(competitorMs, microlinkMs),
    widestGap: gap
  }
}
