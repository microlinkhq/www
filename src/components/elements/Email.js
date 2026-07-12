import React from 'react'

const emailOff = email => `<!--email_off-->${email}<!--/email_off-->`

const Email = ({ as = 'span', children, ...props }) =>
  React.createElement(as, {
    ...props,
    dangerouslySetInnerHTML: { __html: emailOff(children) }
  })

export default Email
