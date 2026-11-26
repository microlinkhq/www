export const STORED_API_KEY = 'mql-api-key'

export const clearStoredApiKey = win => {
  try {
    win.localStorage.removeItem(STORED_API_KEY)
  } catch {}
}
