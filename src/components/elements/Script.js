import { useEffect } from 'react'

const Script = props => {
  useEffect(() => {
    const script = document.createElement('script')
    Object.keys(props).forEach(key => (script[key] = props[key]))
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [props])

  return null
}

export default Script
