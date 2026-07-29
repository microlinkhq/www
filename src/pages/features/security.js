import { navigate } from 'gatsby'
import { useEffect } from 'react'

const SecurityRedirect = () => {
  useEffect(() => {
    navigate('/features/isolation', { replace: true })
  }, [])

  return null
}

export default SecurityRedirect
