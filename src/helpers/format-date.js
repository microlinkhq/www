const formatDate = timestamp => {
  return new Date(timestamp).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export default formatDate
