import {
  accentBand,
  accentBorder,
  accentBorderHover,
  accentTile,
  colors
} from 'theme'

const token = name => colors[name]

export const categoryWash = accent =>
  `linear-gradient(135deg, ${token(accentBand(accent))} 0%, ${token(
    accentBorder(accent)
  )} 100%)`

export const tileWash = accent =>
  `linear-gradient(145deg, ${token(accentTile(accent))} 0%, ${token(
    accentBorder(accent)
  )} 100%)`

export const cardWash = (accent, hover = false) => {
  const fill = `linear-gradient(165deg, ${colors.white} 0%, ${token(
    accentTile(accent)
  )} 100%)`
  const edge = `linear-gradient(145deg, ${token(
    hover ? accentBorder(accent) : accentTile(accent)
  )}, ${token(hover ? accentBorderHover(accent) : accentBorder(accent))})`

  return `${fill}, ${edge}`
}
