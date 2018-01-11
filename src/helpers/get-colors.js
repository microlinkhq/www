const get = (from, selector) =>
  selector.split('.').reduce((prev, cur) => prev && prev[cur], from)

export default (data) => {
  const alternativeColor = get(data, 'image.alternative_color') ||
  get(data, 'logo.alternative_color')

  const color = get(data, 'image.color') || get(data, 'logo.color')

  return {alternativeColor, color}
}
