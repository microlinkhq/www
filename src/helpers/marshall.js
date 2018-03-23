export default obj =>
  Object.keys(obj)
    .reduce((acc, key) => {
      acc.push(`${key}=${encodeURIComponent(obj[key])}`)
      return acc
    }, [])
    .join('&')
