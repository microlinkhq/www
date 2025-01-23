const encode = ({ to, subject, body }) =>
  `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

const paymentError = ({ subject, error }) => {
  let body =
    "Hello,\n\nSomething didn't work while updating my payment details."

  if (error) {
    body += `\n\nThe error is:\n\n\`${error.stack}\``
    body += `\n\nMy browser is:\n\n\`${navigator.userAgent}\``
  }

  body += '\n\nCan you assist me?'

  return encode({
    to: 'hello@microlink.io',
    subject,
    body
  })
}

const emailUrl = {
  encode,
  paymentError
}

export default emailUrl
