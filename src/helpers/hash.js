export default str => {
  let hash = 0

  if (str.length === 0) return hash.toString()

  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  return hash.toString()
}
