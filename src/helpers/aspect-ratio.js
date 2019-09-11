import { layout } from 'theme'

const aspectRatio = width => (width * 9) / 16

const WIDTH = [0.4, 0.6, 0.8, 1].map(n => `${n * layout.medium}px`)
const HEIGHT = WIDTH.map(aspectRatio)

aspectRatio.widths = WIDTH
aspectRatio.heights = HEIGHT

export default aspectRatio
