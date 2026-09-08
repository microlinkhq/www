export const BOOK_CALL_LABEL = 'Book a call'

const BOOK_CALL_BASE_URL = 'https://cal.com/microlink/15min'

export const bookCallUrl = medium =>
  `${BOOK_CALL_BASE_URL}?utm_source=microlink&utm_medium=${medium}&utm_campaign=book_call`
