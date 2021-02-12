export const PAYMENT_STATE = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

export const ERROR_MAIL_OPTS = {
  subject: 'Payment process error',
  body:
    'Hello,\n\nSomething bad happens trying to pay at microlink.io.\n\nCan you help me?'
}
