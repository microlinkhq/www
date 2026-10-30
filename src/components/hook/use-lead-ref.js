import { useEffect, useState } from 'react'

const LEAD_REF_PATTERN = /^[a-z0-9-]{1,32}$/

export const toLeadRef = search => {
  const ref = new URLSearchParams(search).get('ref')?.trim().toLowerCase()
  return ref && LEAD_REF_PATTERN.test(ref) ? ref : undefined
}

export const useLeadRef = () => {
  const [leadRef, setLeadRef] = useState()
  useEffect(() => setLeadRef(toLeadRef(window.location.search)), [])
  return leadRef
}
