export const urlVariations = url => {
  const www = `${url.replace('https://', 'https://www.')}`
  return [url, `${url}/`, www, `${www}/`]
}
