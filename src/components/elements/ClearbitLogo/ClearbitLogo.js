import React from 'react'
import { Image } from 'components/elements'

const Clearbit = ({ companyName, ...props }) => (
  <Image
    lazy={false}
    alt={`${companyName} logo`}
    src={`https://logo.clearbit.com/${companyName}`}
    {...props}
  />
)

export default Clearbit
