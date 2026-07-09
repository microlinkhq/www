import analyticsData from '../../data/analytics.json'

const [{ cdn_edges: cdnEdges }] = analyticsData

export const CDN_EDGES = `+${Math.floor(cdnEdges / 10) * 10}`
