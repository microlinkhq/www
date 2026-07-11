import analyticsData from '../../data/analytics.json'

const [{ cdn_edges: cdnEdges }] = analyticsData

if (typeof cdnEdges !== 'number' || Number.isNaN(cdnEdges)) {
  throw new TypeError(
    'cdn_edges missing from data/analytics.json — run `npm run clean:data && npm run build:data` to regenerate it'
  )
}

export const CDN_EDGES = `+${Math.floor(cdnEdges / 10) * 10}`
