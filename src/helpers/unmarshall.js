export default str =>
  str
    .substr(1)
    .split('&')
    .reduce((acc, item) => {
      acc[item.split('=')[0]] = item.split('=')[1]
      return acc
    }, {})
