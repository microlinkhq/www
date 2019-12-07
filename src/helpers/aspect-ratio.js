import { toPx, layout } from 'theme'

const getRatio = width => (width * 9) / 16

const aspectRatio = (ratios, base = layout.medium) => {
  const width = ratios.map(n => n * base)
  const height = width.map(getRatio)

  return {
    width: width.map(toPx),
    height: height.map(toPx)
  }
}

const ratios = [0.4, 0.6, 0.8, 1]
const { width, height } = aspectRatio(ratios)

aspectRatio.width = width
aspectRatio.height = height
aspectRatio.ratios = ratios

export default aspectRatio
