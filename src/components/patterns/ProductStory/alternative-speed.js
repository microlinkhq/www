import React from 'react'

import { Link } from 'components/elements/Link'
import SpeedSection from 'components/patterns/SpeedSection'

import { GradientText } from './section'

const BENCHMARK_PAGE = {
  timestamp: '2026-03',
  providers: 6,
  urls: 7
}

const runMonth = timestamp =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${timestamp.slice(0, 7)}-01`))

const BENCHMARK_PAGE_RUN = runMonth(BENCHMARK_PAGE.timestamp)

const isBenchmarkPageRun = (benchmark, speed) =>
  benchmark.timestamp.slice(0, 7) === BENCHMARK_PAGE.timestamp &&
  speed.urls === BENCHMARK_PAGE.urls

const BenchmarkPageLink = () => (
  <Link href='/benchmarks/screenshot-api'>
    Screenshot&nbsp;API&nbsp;Benchmark
  </Link>
)

const SameRunNote = speed => (
  <>
    See the full benchmark with all {BENCHMARK_PAGE.providers}&nbsp;providers
    and {speed.urls}&nbsp;URLs on the <BenchmarkPageLink /> page.
  </>
)

const SeparateRunNote = speed => (
  <>
    This comparison is a separate {speed.run} run with {speed.urls}
    &nbsp;URLs. The <BenchmarkPageLink /> page has the full {
      BENCHMARK_PAGE_RUN
    }{' '}
    run with {BENCHMARK_PAGE.providers}&nbsp;providers.
  </>
)

export const AlternativeSpeed = ({ benchmark, speed }) => (
  <SpeedSection
    benchmark={benchmark}
    title={
      <>
        <GradientText>{speed.averageRatio}&times;&nbsp;faster</GradientText> on
        average,
        <br />
        up&nbsp;to {speed.widestGap.ratio}&times; on&nbsp;{speed.widestGap.host}
        .
      </>
    }
    subtitle='Same request. Same URLs. Same output format.'
    description='We sent identical screenshot requests to each API from one server and measured cold starts: no cache.'
    note={
      isBenchmarkPageRun(benchmark, speed)
        ? SameRunNote(speed)
        : SeparateRunNote(speed)
    }
    footnote={
      <>
        Benchmark run: {speed.run}. Cold starts, no cache, {speed.urls}
        &nbsp;URLs, same server for every provider. The{' '}
        <Link href='https://github.com/microlinkhq/screenshot-benchmark'>
          benchmark&nbsp;repo
        </Link>{' '}
        is&nbsp;open.
      </>
    }
  />
)
