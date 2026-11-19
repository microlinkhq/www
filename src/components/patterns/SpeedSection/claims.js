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

export const speedRatio = (competitorMs, microlinkMs) =>
  (competitorMs / microlinkMs).toFixed(1)

export const relativeSpeed = (competitorMs, microlinkMs) =>
  competitorMs >= microlinkMs
    ? `${speedRatio(competitorMs, microlinkMs)}×${NBSP}slower`
    : `${speedRatio(microlinkMs, competitorMs)}×${NBSP}faster`

const benchmarkMonth = timestamp =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${timestamp.slice(0, 7)}-01`))

const widestGap = (microlinkRuns, competitorRuns) =>
  microlinkRuns
    .map(({ url, coldDuration }) => {
      const competitorMs = competitorRuns.find(
        run => run.url === url
      ).coldDuration
      return {
        host: hostnameOf(url),
        microlink: formatDuration(coldDuration),
        competitor: formatDuration(competitorMs),
        value: competitorMs / coldDuration,
        ratio: speedRatio(competitorMs, coldDuration)
      }
    })
    .reduce((widest, run) => (run.value > widest.value ? run : widest))

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
