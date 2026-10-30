import { trackEvent } from 'helpers/gtag'

export const BOOK_CALL_LABEL = 'Book a call'

export const BOOK_CALL_TITLE = 'Book a 15-minute call with an engineer'

const BOOK_CALL_BASE_URL = 'https://cal.com/microlink/15min'

export const bookCallUrl = (medium, content) => {
  const url = `${BOOK_CALL_BASE_URL}?utm_source=microlink&utm_medium=${medium}&utm_campaign=book_call`
  return content ? `${url}&utm_content=${encodeURIComponent(content)}` : url
}

export const trackBookCall = (location, ref) =>
  trackEvent('book call', { location, ref })
