import { expect, describe, it } from 'vitest'

import emailUrl from '../../src/helpers/email-url.js'

describe('emailUrl', () => {
  describe('.paymentError', () => {
    it('with error', () => {
      const error = new Error('oh no')
      error.stack =
        'Error: oh no\n    at Context.<anonymous> (/path/to/test/helpers/email-url.js:10:19)\n    at processImmediate (internal/timers.js:456:21)'

      const url = emailUrl.paymentError({
        subject: 'Error during checkout',
        error
      })

      expect(url).toMatchSnapshot()
    })

    it('without error', () => {
      const url = emailUrl.paymentError({
        subject: 'Error during checkout'
      })

      expect(url).toMatchSnapshot()
    })
  })
})
