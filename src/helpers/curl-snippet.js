export const toCurlSnippet = url => `curl -sL ${url}`

export const toCurlSnippetOrEmpty = url => (url ? toCurlSnippet(url) : '')
