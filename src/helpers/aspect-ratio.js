import { toPx, layout } from 'theme'

const aspectRatio = width => (width * 9) / 16

const WIDTH = [0.4, 0.6, 0.8, 1].map(n => n * layout.medium)

const HEIGHT = WIDTH.map(aspectRatio)

aspectRatio.widths = WIDTH.map(toPx)
aspectRatio.heights = HEIGHT.map(toPx)

export default aspectRatio
