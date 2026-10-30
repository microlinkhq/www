const encoder = new TextEncoder()

export const toRawResponse = result => {
  const { body, headers } = result.response ?? result
  return {
    headers: Object.fromEntries(headers),
    body:
      body instanceof ArrayBuffer ? body : encoder.encode(JSON.stringify(body))
  }
}
