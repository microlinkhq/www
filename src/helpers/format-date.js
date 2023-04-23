const formatDate = timestamp => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export default formatDate
