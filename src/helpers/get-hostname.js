import prependHttp from 'prepend-http'

export default url => {
  try {
    return new URL(prependHttp(url)).hostname
  } catch (error) {
    return null
  }
}
