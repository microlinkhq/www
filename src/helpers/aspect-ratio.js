import { toPx, layout } from 'theme'

const getRatio = width => (width * 9) / 16

const BASE = Number(layout.large.replace('px', ''))

export const aspectRatio = (ratios, base = BASE) => {
  const width = ratios.map(n => (typeof n === 'string' ? n : n * base))
  const height = width.map(n => (typeof n === 'string' ? n : getRatio(n)))

  return {
    width: width.map(n => (typeof n === 'string' ? n : toPx(n))),
    height: height.map(n => (typeof n === 'string' ? n : toPx(n)))
  }
}

const ratios = [0.3, 0.6, 0.8, 1]
const { width, height } = aspectRatio(ratios)

aspectRatio.width = width
aspectRatio.height = height
aspectRatio.ratios = ratios
