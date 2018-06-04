export default timestamp =>
  timestamp.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
