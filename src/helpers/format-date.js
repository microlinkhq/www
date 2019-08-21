export default timestamp => {
  return new Date(timestamp).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
